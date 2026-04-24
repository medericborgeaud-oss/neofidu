import { createClient } from "@supabase/supabase-js";

// ============================================================
// SUPABASE STORAGE - Remplacement de cloudinary.ts
// ============================================================
// Ce fichier remplace src/lib/cloudinary.ts
// Bucket privé "documents" dans Supabase Storage (Dublin EU)
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client avec service role pour les opérations storage côté serveur
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET_NAME = "documents";

export interface UploadResult {
  public_id: string; // chemin dans le bucket (rétro-compatible avec l'ancien champ)
  secure_url: string; // URL signée temporaire
  original_filename: string;
  format: string;
  bytes: number;
  created_at: string;
}

// -------------------------------------------------------
// Helpers
// -------------------------------------------------------

/**
 * Nettoie un nom (supprime accents, caractères spéciaux)
 */
function cleanName(name: string | undefined): string {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

/**
 * Génère le chemin du dossier client
 * Format: neofidu/documents/reference_YYYY-MM-DD_lastName_firstName
 */
function getCustomerFolder(
  reference: string,
  lastName?: string,
  firstName?: string
): string {
  const dateStr = new Date().toISOString().split("T")[0];
  let folderName = reference;
  folderName += `_${dateStr}`;
  if (lastName) folderName += `_${cleanName(lastName)}`;
  if (firstName) folderName += `_${cleanName(firstName)}`;
  return `neofidu/documents/${folderName}`;
}

// -------------------------------------------------------
// Génération d'URLs signées
// -------------------------------------------------------

/**
 * Génère une URL signée temporaire pour un fichier privé.
 *
 * ⚠️  CHANGEMENT vs Cloudinary : cette fonction est maintenant ASYNC.
 *     L'ancienne version Cloudinary était synchrone (HMAC local).
 *     Supabase nécessite un appel réseau pour signer l'URL.
 *
 * @param filePath - Le chemin du fichier dans le bucket
 * @param _resourceType - Ignoré (gardé pour rétro-compatibilité de la signature)
 * @param expiresInSeconds - Durée de validité (défaut: 1 heure)
 */
export async function generateSignedUrl(
  filePath: string,
  _resourceType: "image" | "raw" = "raw",
  expiresInSeconds: number = 3600
): Promise<string> {
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error) {
    console.error("Erreur génération URL signée:", error);
    throw error;
  }
  return data.signedUrl;
}

// -------------------------------------------------------
// Upload
// -------------------------------------------------------

/**
 * Upload un fichier vers Supabase Storage (bucket privé)
 * Remplace uploadToCloudinary()
 */
export async function uploadToStorage(
  file: File,
  reference: string,
  lastName?: string,
  firstName?: string
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Extension et nom nettoyé
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
  const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
  const cleanFileName = cleanName(fileNameWithoutExt);

  // Construire le chemin: folder/reference_date_nom_prenom_fichier.ext
  const dateStr = new Date().toISOString().split("T")[0];
  let filePrefix = reference;
  filePrefix += `_${dateStr}`;
  if (lastName) filePrefix += `_${cleanName(lastName)}`;
  if (firstName) filePrefix += `_${cleanName(firstName)}`;
  filePrefix += `_${cleanFileName}`;

  const folder = getCustomerFolder(reference, lastName, firstName);
  const filePath = `${folder}/${filePrefix}.${fileExtension}`;

  // Upload vers Supabase Storage
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true, // Écrase si le fichier existe déjà
    });

  if (error) {
    console.error("Erreur upload Supabase Storage:", error);
    throw error;
  }

  // Générer une URL signée (valide 1h)
  const signedUrl = await generateSignedUrl(filePath, "raw", 3600);

  console.log(`🔒 Document uploadé (Supabase Storage): ${filePath}`);

  return {
    public_id: filePath, // Le chemin sert d'identifiant
    secure_url: signedUrl,
    original_filename: file.name,
    format: fileExtension,
    bytes: buffer.length,
    created_at: new Date().toISOString(),
  };
}

// Alias rétro-compatible
export const uploadToCloudinary = uploadToStorage;

/**
 * Upload un buffer PDF vers Supabase Storage
 * Remplace uploadPDFToCloudinary()
 */
export async function uploadPDFToStorage(
  pdfBuffer: Buffer,
  reference: string,
  lastName?: string,
  firstName?: string
): Promise<UploadResult | null> {
  try {
    const dateStr = new Date().toISOString().split("T")[0];
    let filePrefix = reference;
    filePrefix += `_${dateStr}`;
    if (lastName) filePrefix += `_${cleanName(lastName)}`;
    if (firstName) filePrefix += `_${cleanName(firstName)}`;

    const fileName = `${filePrefix}_Fiche_Recapitulative.pdf`;
    const folder = getCustomerFolder(reference, lastName, firstName);
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      console.error("Erreur upload PDF:", error);
      return null;
    }

    const signedUrl = await generateSignedUrl(filePath, "image", 3600);

    return {
      public_id: filePath,
      secure_url: signedUrl,
      original_filename: fileName,
      format: "pdf",
      bytes: pdfBuffer.length,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Erreur upload PDF Supabase Storage:", error);
    return null;
  }
}

// Alias rétro-compatible
export const uploadPDFToCloudinary = uploadPDFToStorage;

/**
 * Upload un résumé texte vers Supabase Storage
 * Remplace uploadSummaryToCloudinary()
 */
export async function uploadSummaryToStorage(
  textContent: string,
  reference: string,
  lastName?: string,
  firstName?: string
): Promise<UploadResult | null> {
  try {
    const buffer = Buffer.from(textContent, "utf-8");
    const dateStr = new Date().toISOString().split("T")[0];

    let filePrefix = reference;
    filePrefix += `_${dateStr}`;
    if (lastName) filePrefix += `_${cleanName(lastName)}`;
    if (firstName) filePrefix += `_${cleanName(firstName)}`;

    const fileName = `${filePrefix}_Fiche_Recapitulative.txt`;
    const folder = getCustomerFolder(reference, lastName, firstName);
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: "text/plain",
        upsert: true,
      });

    if (error) {
      console.error("Erreur upload résumé:", error);
      return null;
    }

    const signedUrl = await generateSignedUrl(filePath, "raw", 3600);

    return {
      public_id: filePath,
      secure_url: signedUrl,
      original_filename: fileName,
      format: "txt",
      bytes: buffer.length,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Erreur upload résumé Supabase Storage:", error);
    return null;
  }
}

// Alias rétro-compatible
export const uploadSummaryToCloudinary = uploadSummaryToStorage;

// -------------------------------------------------------
// Suppression
// -------------------------------------------------------

/**
 * Supprime un fichier de Supabase Storage
 * Remplace deleteFromCloudinary()
 */
export async function deleteFromStorage(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("Erreur suppression:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erreur suppression Supabase Storage:", error);
    return false;
  }
}

// Alias rétro-compatible
export const deleteFromCloudinary = deleteFromStorage;

// -------------------------------------------------------
// Liste des documents
// -------------------------------------------------------

/**
 * Récupère tous les documents pour une référence avec des URLs signées fraîches
 * Remplace getDocumentsForReference()
 */
export async function getDocumentsForReference(
  reference: string
): Promise<UploadResult[]> {
  try {
    // Lister les dossiers qui correspondent à cette référence
    const { data: folders, error: listError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .list("neofidu/documents", {
        search: reference,
        limit: 1000,
      });

    if (listError || !folders) {
      console.error("Erreur listing dossiers:", listError);
      return [];
    }

    const results: UploadResult[] = [];

    // Pour chaque dossier correspondant, lister les fichiers
    for (const folder of folders) {
      if (!folder.name.startsWith(reference)) continue;

      const folderPath = `neofidu/documents/${folder.name}`;
      const { data: files, error: filesError } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .list(folderPath, { limit: 1000 });

      if (filesError || !files) continue;

      for (const file of files) {
        if (!file.name || file.id === null) continue; // skip .emptyFolderPlaceholder

        const filePath = `${folderPath}/${file.name}`;
        const format = file.name.split(".").pop() || "";

        try {
          const signedUrl = await generateSignedUrl(filePath, "raw", 3600);
          results.push({
            public_id: filePath,
            secure_url: signedUrl,
            original_filename: file.name,
            format,
            bytes: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
          });
        } catch {
          // Skip files that can't be signed
        }
      }
    }

    return results;
  } catch (error) {
    console.error("Erreur récupération documents:", error);
    return [];
  }
}

// -------------------------------------------------------
// URLs utilitaires
// -------------------------------------------------------

/**
 * Génère une URL signée pour un document spécifique (vue admin)
 *
 * ⚠️  CHANGEMENT vs Cloudinary : cette fonction est maintenant ASYNC.
 *     L'ancienne version Cloudinary était synchrone.
 *     Tous les appelants doivent utiliser \`await\`.
 *
 * Remplace getSecureDocumentUrl()
 */
export async function getSecureDocumentUrl(
  filePath: string,
  expiresInSeconds: number = 7200
): Promise<string> {
  return generateSignedUrl(filePath, "raw", expiresInSeconds);
}

/**
 * Génère l'URL du dashboard Supabase Storage pour un dossier
 * Remplace getCloudinaryFolderUrl()
 *
 * ✅ Reste synchrone (pas de changement pour les appelants)
 */
export function getStorageFolderUrl(
  reference: string,
  lastName?: string,
  firstName?: string
): string {
  const projectRef = supabaseUrl.replace("https://", "").split(".")[0];
  const folder = getCustomerFolder(reference, lastName, firstName);
  return `https://supabase.com/dashboard/project/${projectRef}/storage/buckets/${BUCKET_NAME}/${folder}`;
}

// Alias rétro-compatible
export const getCloudinaryFolderUrl = getStorageFolderUrl;

// -------------------------------------------------------
// Vérification de configuration
// -------------------------------------------------------

/**
 * Vérifie si Supabase Storage est configuré
 * Remplace isCloudinaryConfigured()
 *
 * ✅ Reste synchrone (pas de changement pour les appelants)
 */
export function isStorageConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// Alias rétro-compatible
export function isCloudinaryConfigured(): boolean {
  return isStorageConfigured();
}

// -------------------------------------------------------
// Export default (rétro-compatibilité)
// -------------------------------------------------------
// L'original exportait \`export default cloudinary\` (instance v2).
// Certains fichiers peuvent faire \`import cloudinary from "@/lib/cloudinary"\`.
// On exporte un objet utilitaire pour ne pas casser les imports.

const storageClient = {
  storage: supabaseAdmin.storage,
  bucket: BUCKET_NAME,
};

export default storageClient;
