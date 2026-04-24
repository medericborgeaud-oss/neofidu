import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference } from "@/lib/requests-store";
import {
  findTaxRequestByReference,
  findGenericRequestByReference,
  updateTaxRequestDocuments,
  supabase,
} from "@/lib/supabase";
import {
  uploadToCloudinary,
  getDocumentsForReference,
  isCloudinaryConfigured,
  type UploadResult,
} from "@/lib/cloudinary";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Fallback in-memory storage (used when Supabase Storage is not configured)
const uploadedDocumentsMemory: Map<
  string,
  { name: string; size: number; type: string; uploadedAt: Date; url?: string }[]
> = new Map();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    // Verify the request exists - check both tables
    // 1. Check generic requests (accounting, property)
    let clientRequest = await findRequestByReference(reference);
    let requestReference = clientRequest?.reference;
    let customerLastName = "";
    let customerFirstName = "";
    let taxRequestId: string | null = null;
    let genericRequestId: string | null = null;
    let existingTaxDocuments: {
      category: string;
      name: string;
      url?: string;
      uploadedAt?: string;
    }[] = [];
    let existingGenericDocuments: {
      name: string;
      uploadedAt?: string;
      url?: string;
    }[] = [];

    // 2. If not found, check tax_requests table
    if (!clientRequest) {
      const taxRequest = await findTaxRequestByReference(reference);
      if (taxRequest) {
        requestReference = taxRequest.reference;
        customerLastName = taxRequest.customer.lastName;
        customerFirstName = taxRequest.customer.firstName;
        taxRequestId = taxRequest.id;
        existingTaxDocuments = taxRequest.documents || [];
      } else {
        // 3. Also try generic requests in Supabase
        const genericRequest =
          await findGenericRequestByReference(reference);
        if (genericRequest) {
          requestReference = genericRequest.reference;
          customerLastName =
            genericRequest.customer_name?.split(" ").pop() || "";
          customerFirstName =
            genericRequest.customer_name?.split(" ")[0] || "";
          genericRequestId = genericRequest.id;
          existingGenericDocuments = genericRequest.documents || [];
        }
      }
    } else {
      customerLastName = clientRequest.customerName?.split(" ").pop() || "";
      customerFirstName = clientRequest.customerName?.split(" ")[0] || "";
    }

    if (!requestReference) {
      return NextResponse.json(
        { error: "Demande non trouvée" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    // Validate files
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          {
            error: `Le fichier "${file.name}" dépasse la taille maximale de 10 MB`,
          },
          { status: 400 }
        );
      }
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Le type de fichier "${file.name}" n'est pas autorisé`,
          },
          { status: 400 }
        );
      }
    }

    const uploadedFiles: {
      name: string;
      size: number;
      type: string;
      uploadedAt: Date;
      url?: string;
    }[] = [];

    // Check if Supabase Storage is configured
    if (isCloudinaryConfigured()) {
      // Upload to Supabase Storage
      for (const file of files) {
        try {
          const result = await uploadToCloudinary(
            file,
            requestReference,
            customerLastName,
            customerFirstName
          );
          uploadedFiles.push({
            name: result.original_filename,
            size: result.bytes,
            type: file.type,
            uploadedAt: new Date(result.created_at),
            url: result.secure_url,
          });
        } catch (uploadError) {
          console.error(
            `Error uploading ${file.name} to Supabase Storage:`,
            uploadError
          );
          return NextResponse.json(
            {
              error: `Erreur lors du téléversement de "${file.name}"`,
            },
            { status: 500 }
          );
        }
      }

      // ========================================
      // UPDATE DATABASE WITH NEW DOCUMENTS
      // ========================================

      // Update tax_requests table if this is a tax request
      if (taxRequestId) {
        try {
          // Merge existing documents with new ones
          const newDocuments = uploadedFiles.map((f) => ({
            category: "other",
            name: f.name,
            url: f.url,
            uploadedAt: f.uploadedAt.toISOString(),
          }));

          // Check for duplicates by name and merge
          const existingNames = new Set(
            existingTaxDocuments.map((d) => d.name)
          );
          const uniqueNewDocs = newDocuments.filter(
            (d) => !existingNames.has(d.name)
          );
          const allDocuments = [...existingTaxDocuments, ...uniqueNewDocs];

          await updateTaxRequestDocuments(taxRequestId, allDocuments);
          console.log(
            `📎 [SUIVI] Documents mis à jour dans tax_requests pour ${requestReference}: ${uniqueNewDocs.length} nouveaux, ${allDocuments.length} total`
          );
        } catch (dbError) {
          console.error(
            "Erreur mise à jour documents dans tax_requests:",
            dbError
          );
          // Continue - documents are in Storage even if DB update failed
        }
      }

      // Update generic requests table if this is a generic request
      if (genericRequestId && supabase) {
        try {
          // Merge existing documents with new ones
          const newDocuments = uploadedFiles.map((f) => ({
            name: f.name,
            url: f.url,
            uploadedAt: f.uploadedAt.toISOString(),
          }));

          // Check for duplicates by name and merge
          const existingNames = new Set(
            existingGenericDocuments.map((d) => d.name)
          );
          const uniqueNewDocs = newDocuments.filter(
            (d) => !existingNames.has(d.name)
          );
          const allDocuments = [...existingGenericDocuments, ...uniqueNewDocs];

          const { error } = await supabase
            .from("requests")
            .update({
              documents: allDocuments,
              updated_at: new Date().toISOString(),
            })
            .eq("id", genericRequestId);

          if (error) {
            console.error(
              "Erreur mise à jour documents dans requests:",
              error
            );
          } else {
            console.log(
              `📎 [SUIVI] Documents mis à jour dans requests pour ${requestReference}: ${uniqueNewDocs.length} nouveaux, ${allDocuments.length} total`
            );
          }
        } catch (dbError) {
          console.error(
            "Erreur mise à jour documents dans requests:",
            dbError
          );
          // Continue - documents are in Storage even if DB update failed
        }
      }
    } else {
      // Fallback to in-memory storage (for development/demo)
      console.warn("Supabase Storage not configured, using in-memory storage");
      for (const file of files) {
        uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
        });
      }

      // Store in memory
      const existing = uploadedDocumentsMemory.get(requestReference) || [];
      uploadedDocumentsMemory.set(requestReference, [
        ...existing,
        ...uploadedFiles,
      ]);
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} document(s) téléversé(s) avec succès`,
      documents: uploadedFiles,
      storage: isCloudinaryConfigured() ? "supabase" : "memory",
      databaseUpdated: !!(taxRequestId || genericRequestId),
    });
  } catch (error) {
    console.error("Erreur upload documents:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléversement" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    // Find the request in any table
    let requestReference: string | null = null;
    let requestDocs: { name: string; uploadedAt?: Date | string }[] = [];

    // 1. Check generic requests (memory)
    const clientRequest = await findRequestByReference(reference);
    if (clientRequest) {
      requestReference = clientRequest.reference;
      requestDocs = clientRequest.documents || [];
    }

    // 2. Check tax_requests table
    if (!requestReference) {
      const taxRequest = await findTaxRequestByReference(reference);
      if (taxRequest) {
        requestReference = taxRequest.reference;
        requestDocs = taxRequest.documents || [];
      }
    }

    // 3. Check generic requests in Supabase
    if (!requestReference) {
      const genericRequest = await findGenericRequestByReference(reference);
      if (genericRequest) {
        requestReference = genericRequest.reference;
        requestDocs = genericRequest.documents || [];
      }
    }

    if (!requestReference) {
      return NextResponse.json(
        { error: "Demande non trouvée" },
        { status: 404 }
      );
    }

    let documents: {
      name: string;
      size?: number;
      type?: string;
      uploadedAt: Date | string;
      url?: string;
    }[] = [];

    // Check if Supabase Storage is configured
    if (isCloudinaryConfigured()) {
      // Fetch from Supabase Storage
      const storageDocs = await getDocumentsForReference(requestReference);
      documents = storageDocs.map((doc) => ({
        name: doc.original_filename,
        size: doc.bytes,
        type: doc.format,
        uploadedAt: doc.created_at,
        url: doc.secure_url,
      }));
    } else {
      // Fallback to in-memory storage
      const memoryDocs =
        uploadedDocumentsMemory.get(requestReference) || [];
      documents = memoryDocs;
    }

    return NextResponse.json({
      documents: [
        ...documents,
        ...requestDocs.filter(
          (rd) => !documents.some((d) => d.name === rd.name)
        ),
      ],
      storage: isCloudinaryConfigured() ? "supabase" : "memory",
    });
  } catch (error) {
    console.error("Erreur récupération documents:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des documents" },
      { status: 500 }
    );
  }
}
