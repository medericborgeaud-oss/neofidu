import { NextRequest, NextResponse } from "next/server";
import { findRequestByReference } from "@/lib/requests-store";
import { uploadToCloudinary, getDocumentsForReference, type UploadResult } from "@/lib/cloudinary";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Fallback in-memory storage (used when Cloudinary is not configured)
const uploadedDocumentsMemory: Map<string, { name: string; size: number; type: string; uploadedAt: Date; url?: string }[]> = new Map();

// Check if Cloudinary is configured
function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    // Verify the request exists
    const clientRequest = await findRequestByReference(reference);
    if (!clientRequest) {
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
          { error: `Le fichier "${file.name}" dépasse la taille maximale de 10 MB` },
          { status: 400 }
        );
      }

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Le type de fichier "${file.name}" n'est pas autorisé` },
          { status: 400 }
        );
      }
    }

    const uploadedFiles: { name: string; size: number; type: string; uploadedAt: Date; url?: string }[] = [];

    // Check if Cloudinary is configured
    if (isCloudinaryConfigured()) {
      // Upload to Cloudinary
      for (const file of files) {
        try {
          const result = await uploadToCloudinary(file, clientRequest.reference);
          uploadedFiles.push({
            name: result.original_filename,
            size: result.bytes,
            type: file.type,
            uploadedAt: new Date(result.created_at),
            url: result.secure_url,
          });
        } catch (uploadError) {
          console.error(`Error uploading ${file.name} to Cloudinary:`, uploadError);
          return NextResponse.json(
            { error: `Erreur lors du téléversement de "${file.name}"` },
            { status: 500 }
          );
        }
      }
    } else {
      // Fallback to in-memory storage (for development/demo)
      console.warn("Cloudinary not configured, using in-memory storage");
      for (const file of files) {
        uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
        });
      }

      // Store in memory
      const existing = uploadedDocumentsMemory.get(clientRequest.reference) || [];
      uploadedDocumentsMemory.set(clientRequest.reference, [...existing, ...uploadedFiles]);
    }

    // Update the request's document list
    if (!clientRequest.documents) {
      clientRequest.documents = [];
    }
    for (const doc of uploadedFiles) {
      clientRequest.documents.push({
        name: doc.name,
        uploadedAt: doc.uploadedAt,
      });
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} document(s) téléversé(s) avec succès`,
      documents: uploadedFiles,
      storage: isCloudinaryConfigured() ? "cloudinary" : "memory",
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

    const clientRequest = await findRequestByReference(reference);
    if (!clientRequest) {
      return NextResponse.json(
        { error: "Demande non trouvée" },
        { status: 404 }
      );
    }

    let documents: { name: string; size?: number; type?: string; uploadedAt: Date | string; url?: string }[] = [];

    // Check if Cloudinary is configured
    if (isCloudinaryConfigured()) {
      // Fetch from Cloudinary
      const cloudinaryDocs = await getDocumentsForReference(clientRequest.reference);
      documents = cloudinaryDocs.map((doc) => ({
        name: doc.original_filename,
        size: doc.bytes,
        type: doc.format,
        uploadedAt: doc.created_at,
        url: doc.secure_url,
      }));
    } else {
      // Fallback to in-memory storage
      const memoryDocs = uploadedDocumentsMemory.get(clientRequest.reference) || [];
      documents = memoryDocs;
    }

    // Also include documents from the request store
    const requestDocs = clientRequest.documents || [];

    return NextResponse.json({
      documents: [...documents, ...requestDocs.filter(
        (rd) => !documents.some((d) => d.name === rd.name)
      )],
      storage: isCloudinaryConfigured() ? "cloudinary" : "memory",
    });
  } catch (error) {
    console.error("Erreur récupération documents:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des documents" },
      { status: 500 }
    );
  }
}
