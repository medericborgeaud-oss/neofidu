import { NextRequest, NextResponse } from "next/server";
import { sendCriticalAlertEmail } from "@/lib/email";
import { uploadToStorage, isStorageConfigured, type UploadResult } from "@/lib/cloudinary";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

export interface UploadedDocument {
  name: string;
  category: string;
  url: string;
  publicId: string;
  size: number;
  uploadedAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const categories = formData.getAll("categories") as string[];
    const reference = formData.get("reference") as string;
    const lastName = (formData.get("lastName") as string) || "";
    const firstName = (formData.get("firstName") as string) || "";

    // Vérifier si Supabase Storage est configuré
    if (!isStorageConfigured()) {
      console.error("❌ ERREUR CRITIQUE: Supabase Storage non configuré - documents perdus!");

      try {
        await sendCriticalAlertEmail({
          service: "Supabase Storage (stockage documents)",
          error: "Variables d'environnement manquantes",
          details: `Variables manquantes: NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY\n\nLe client a tenté d'uploader ${files.length} document(s) mais ils n'ont pas pu être sauvegardés.`,
          customerName: `${firstName} ${lastName}`.trim() || "Inconnu",
          reference: reference || "N/A",
        });
        console.log("🚨 Alerte critique envoyée à l'admin");
      } catch (alertError) {
        console.error("Impossible d'envoyer l'alerte:", alertError);
      }

      return NextResponse.json(
        {
          success: false,
          error: "Configuration stockage manquante",
          message:
            "Les documents ne peuvent pas être sauvegardés. Veuillez contacter le support technique.",
          configMissing: true,
        },
        { status: 503 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    if (!reference) {
      return NextResponse.json(
        { error: "Référence manquante" },
        { status: 400 }
      );
    }

    const uploadedDocuments: UploadedDocument[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const category = categories[i] || "other";

      try {
        const result = await uploadToStorage(
          file,
          reference,
          lastName,
          firstName
        );

        uploadedDocuments.push({
          name: file.name,
          category,
          url: result.secure_url,
          publicId: result.public_id,
          size: result.bytes,
          uploadedAt: result.created_at,
        });

        console.log(`✅ Document uploadé: ${file.name} -> Supabase Storage`);
      } catch (uploadError) {
        console.error(`❌ Erreur upload ${file.name}:`, uploadError);
        // Continuer avec les autres fichiers
      }
    }

    return NextResponse.json({
      success: true,
      documents: uploadedDocuments,
      totalUploaded: uploadedDocuments.length,
      totalRequested: files.length,
    });
  } catch (error) {
    console.error("Erreur upload documents:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload des documents" },
      { status: 500 }
    );
  }
}
