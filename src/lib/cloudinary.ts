import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  bytes: number;
  created_at: string;
}

/**
 * Generate a folder name with reference, date, and customer name
 * Format: reference_YYYY-MM-DD_lastName_firstName
 */
function getCustomerFolder(reference: string, lastName?: string, firstName?: string): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

  // Clean names for folder path (remove special characters, spaces -> underscores)
  const cleanName = (name: string | undefined) => {
    if (!name) return '';
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-zA-Z0-9]/g, '_')   // Replace special chars with underscore
      .replace(/_+/g, '_')              // Remove multiple underscores
      .replace(/^_|_$/g, '');           // Remove leading/trailing underscores
  };

  const cleanLastName = cleanName(lastName);
  const cleanFirstName = cleanName(firstName);

  // Build folder name: reference_date_lastName_firstName
  let folderName = reference;
  folderName += `_${dateStr}`;
  if (cleanLastName) {
    folderName += `_${cleanLastName}`;
  }
  if (cleanFirstName) {
    folderName += `_${cleanFirstName}`;
  }

  return `neofidu/documents/${folderName}`;
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  reference: string,
  lastName?: string,
  firstName?: string
): Promise<UploadResult> {
  // Convert File to base64
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const mimeType = file.type;
  const dataUri = `data:${mimeType};base64,${base64}`;

  // Determine resource type based on file type
  const isImage = mimeType.startsWith("image/");
  const resourceType = isImage ? "image" : "raw";

  // Get file extension
  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
  const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

  // Clean the original filename for use in public_id
  const cleanFileName = fileNameWithoutExt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-zA-Z0-9]/g, '_')   // Replace special chars with underscore
    .replace(/_+/g, '_')              // Remove multiple underscores
    .replace(/^_|_$/g, '');           // Remove leading/trailing underscores

  // Clean names for file naming
  const cleanName = (name: string | undefined) => {
    if (!name) return '';
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  };

  // Format date as YYYY-MM-DD
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  // Build file name: reference_date_lastName_firstName_originalFileName
  let filePrefix = reference;
  filePrefix += `_${dateStr}`;
  if (lastName) filePrefix += `_${cleanName(lastName)}`;
  if (firstName) filePrefix += `_${cleanName(firstName)}`;
  filePrefix += `_${cleanFileName}`;

  // For raw files (PDFs, docs, etc.), keep the extension in the public_id
  // This ensures the file can be properly downloaded with the correct format
  const publicId = isImage
    ? filePrefix
    : `${filePrefix}.${fileExtension}`;

  // Use customer folder naming: reference_date_lastName_firstName
  const folder = getCustomerFolder(reference, lastName, firstName);

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: folder,
    resource_type: resourceType,
    public_id: publicId,
    tags: ["neofidu", "document", reference],
    // For raw files, use attachment delivery to force download
    ...(resourceType === "raw" && {
      use_filename: true,
      unique_filename: false,
    }),
  });

  // For raw files, append fl_attachment to the URL to ensure proper download
  let secureUrl = result.secure_url;
  if (resourceType === "raw" && !secureUrl.includes("fl_attachment")) {
    // Modify URL to include attachment flag for proper PDF viewing/download
    secureUrl = secureUrl.replace("/upload/", "/upload/fl_attachment/");
  }

  return {
    public_id: result.public_id,
    secure_url: secureUrl,
    original_filename: file.name,
    format: result.format || fileExtension,
    bytes: result.bytes,
    created_at: result.created_at,
  };
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
}

/**
 * Get all documents for a reference
 */
export async function getDocumentsForReference(reference: string): Promise<UploadResult[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:neofidu/documents/${reference}`)
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    return result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      original_filename: resource.filename || resource.public_id.split("/").pop(),
      format: resource.format,
      bytes: resource.bytes,
      created_at: resource.created_at,
    }));
  } catch (error) {
    console.error("Error fetching documents from Cloudinary:", error);
    return [];
  }
}

/**
 * Upload PDF summary to Cloudinary
 */
export async function uploadPDFToCloudinary(
  pdfBuffer: Buffer,
  reference: string,
  lastName?: string,
  firstName?: string
): Promise<UploadResult | null> {
  try {
    // Convert buffer to base64
    const base64 = pdfBuffer.toString("base64");
    const dataUri = `data:application/pdf;base64,${base64}`;

    // Clean names for file naming
    const cleanName = (name: string | undefined) => {
      if (!name) return '';
      return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    };

    // Format date as YYYY-MM-DD
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    // Build file name: reference_date_lastName_firstName_Fiche_Recapitulative.pdf
    let filePrefix = reference;
    filePrefix += `_${dateStr}`;
    if (lastName) filePrefix += `_${cleanName(lastName)}`;
    if (firstName) filePrefix += `_${cleanName(firstName)}`;
    const publicId = `${filePrefix}_Fiche_Recapitulative.pdf`;

    // Use customer folder naming: reference_date_lastName_firstName
    const folder = getCustomerFolder(reference, lastName, firstName);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: "raw",
      public_id: publicId,
      tags: ["neofidu", "summary", "pdf", reference],
      use_filename: true,
      unique_filename: false,
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      original_filename: `${filePrefix}_Fiche_Recapitulative.pdf`,
      format: "pdf",
      bytes: result.bytes,
      created_at: result.created_at,
    };
  } catch (error) {
    console.error("Error uploading PDF to Cloudinary:", error);
    return null;
  }
}

/**
 * Upload text summary as a .txt file to Cloudinary (legacy)
 */
export async function uploadSummaryToCloudinary(
  textContent: string,
  reference: string,
  lastName?: string,
  firstName?: string
): Promise<UploadResult | null> {
  try {
    // Convert text to base64
    const buffer = Buffer.from(textContent, "utf-8");
    const base64 = buffer.toString("base64");
    const dataUri = `data:text/plain;base64,${base64}`;

    // Clean names for file naming
    const cleanName = (name: string | undefined) => {
      if (!name) return '';
      return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    };

    // Format date as YYYY-MM-DD
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    // Build file name: reference_date_lastName_firstName_Fiche_Recapitulative.txt
    let filePrefix = reference;
    filePrefix += `_${dateStr}`;
    if (lastName) filePrefix += `_${cleanName(lastName)}`;
    if (firstName) filePrefix += `_${cleanName(firstName)}`;
    const publicId = `${filePrefix}_Fiche_Recapitulative.txt`;

    // Use customer folder naming
    const folder = getCustomerFolder(reference, lastName, firstName);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: "raw",
      public_id: publicId,
      tags: ["neofidu", "summary", reference],
      use_filename: true,
      unique_filename: false,
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      original_filename: `${filePrefix}_Fiche_Recapitulative.txt`,
      format: "txt",
      bytes: result.bytes,
      created_at: result.created_at,
    };
  } catch (error) {
    console.error("Error uploading summary to Cloudinary:", error);
    return null;
  }
}

/**
 * Get folder URL for a reference (with customer name)
 */
export function getCloudinaryFolderUrl(reference: string, lastName?: string, firstName?: string): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

  // Clean names for folder path
  const cleanName = (name: string | undefined) => {
    if (!name) return '';
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  };

  let folderName = reference;
  folderName += `_${dateStr}`;
  if (lastName) folderName += `_${cleanName(lastName)}`;
  if (firstName) folderName += `_${cleanName(firstName)}`;

  return `https://console.cloudinary.com/console/${cloudName}/media_library/folders/neofidu/documents/${folderName}`;
}

export default cloudinary;
