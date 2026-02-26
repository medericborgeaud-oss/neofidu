import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Vérifier si Cloudinary est configuré
function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

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
    // Vérifier si Cloudinary est configuré
    if (!isCloudinaryConfigured()) {
      console.warn("⚠️ Cloudinary non configuré - upload simulé");
      // En mode démo, on simule l'upload
      const formData = await request.formData();
      const files = formData.getAll("files") as File[];
      const categories = formData.getAll("categories") as string[];
      const reference = formData.get("reference") as string;

      const simulatedResults: UploadedDocument[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const category = categories[i] || "other";
        simulatedResults.push({
          name: file.name,
          category,
          url: `https://demo.cloudinary.com/neofidu/${reference}/${file.name}`,
          publicId: `neofidu/${reference}/${Date.now()}_${file.name}`,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        });
      }

      return NextResponse.json({
        success: true,
        documents: simulatedResults,
        demo: true,
        message: "Mode démo - documents non uploadés vers Cloudinary",
      });
    }

    // Parse FormData
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const categories = formData.getAll("categories") as string[];
    const reference = formData.get("reference") as string;
    const lastName = formData.get("lastName") as string || "";
    const firstName = formData.get("firstName") as string || "";

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

    // Generate folder name: reference_date_lastName_firstName
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

    // Clean names for folder path
    const cleanName = (name: string) => {
      if (!name) return '';
      return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-zA-Z0-9]/g, '_')   // Replace special chars
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    };

    let folderName = reference;
    folderName += `_${dateStr}`;
    if (lastName) folderName += `_${cleanName(lastName)}`;
    if (firstName) folderName += `_${cleanName(firstName)}`;

    const folder = `neofidu/documents/${folderName}`;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const category = categories[i] || "other";

      try {
        // Convertir le fichier en base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const mimeType = file.type;
        const dataUri = `data:${mimeType};base64,${base64}`;

        // Déterminer le type de ressource
        // PDFs need to be uploaded as "image" type for Cloudinary preview support
        const isImage = mimeType.startsWith("image/");
        const isPDF = mimeType === "application/pdf";
        const resourceType = (isImage || isPDF) ? "image" : "raw";

        // Générer un identifiant avec format: reference_date_nom_prenom_fichier
        const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

        // Nettoyer le nom du fichier original
        const cleanFileName = fileNameWithoutExt
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
          .replace(/[^a-zA-Z0-9]/g, '_')   // Remplacer caractères spéciaux
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '');

        // Construire le nom: reference_date_nom_prenom_fichier
        let filePrefix = reference;
        filePrefix += `_${dateStr}`;
        if (lastName) filePrefix += `_${cleanName(lastName)}`;
        if (firstName) filePrefix += `_${cleanName(firstName)}`;
        filePrefix += `_${cleanFileName}`;

        const publicId = `${filePrefix}${resourceType === "raw" ? `.${fileExtension}` : ""}`;

        // Upload vers Cloudinary with date-prefixed folder
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: folder,
          resource_type: resourceType,
          public_id: publicId,
          tags: ["neofidu", "document", reference, category],
        });

        // Utiliser l'URL sécurisée directe de Cloudinary
        // Note: fl_attachment cause des problèmes avec certains fichiers raw
        // L'URL directe fonctionne pour la visualisation et le téléchargement
        const secureUrl = result.secure_url;

        uploadedDocuments.push({
          name: file.name,
          category,
          url: secureUrl,
          publicId: result.public_id,
          size: result.bytes,
          uploadedAt: result.created_at,
        });

        console.log(`✅ Document uploadé: ${file.name} -> ${secureUrl}`);
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
