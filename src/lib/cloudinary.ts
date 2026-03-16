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
 * Generate a signed URL for authenticated/private files
 * @param publicId - The public_id of the file
 * @param resourceType - 'image' or 'raw'
 * @param expiresInSeconds - URL expiration time (default: 1 hour)
 */
export function generateSignedUrl(
  publicId: string,
  resourceType: "image" | "raw" = "raw",
  expiresInSeconds: number = 3600
): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  return cloudinary.url(publicId, {
    resource_type: resourceType,
    type: "authenticated",
    sign_url: true,
    secure: true,
    expires_at: expiresAt,
  });
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
 * Upload a file to Cloudinary (PRIVATE/AUTHENTICATED mode)
 * Files are NOT publicly accessible - requires signed URL for access
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
  // PDFs need to be uploaded as "image" type for Cloudinary preview support
  const isImage = mimeType.startsWith("image/");
  const isPDF = mimeType === "application/pdf";
  const resourceType = (isImage || isPDF) ? "image" : "raw";

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
  const publicId = isImage
    ? filePrefix
    : `${filePrefix}.${fileExtension}`;

  // Use customer folder naming
  const folder = getCustomerFolder(reference, lastName, firstName);

  // Upload to Cloudinary with AUTHENTICATED type (PRIVATE)
  // Files will NOT be publicly accessible without a signed URL
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: folder,
    resource_type: resourceType,
    type: "authenticated", // 🔒 PRIVATE - requires signed URL to access
    public_id: publicId,
    tags: ["neofidu", "document", reference, "private"],
    ...(resourceType === "raw" && {
      use_filename: true,
      unique_filename: false,
    }),
  });

  // Generate a signed URL for admin access (valid for 1 hour)
  // This URL will expire and cannot be shared permanently
  const signedUrl = generateSignedUrl(
    result.public_id,
    resourceType as "image" | "raw",
    3600 // 1 hour expiration
  );

  console.log(`🔒 Document uploaded as PRIVATE: ${result.public_id}`);

  return {
    public_id: result.public_id,
    secure_url: signedUrl, // Return signed URL instead of public URL
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
    // Try deleting as authenticated first
    let result = await cloudinary.uploader.destroy(publicId, {
      type: "authenticated",
      invalidate: true,
    });

    // If not found, try as public (for old files)
    if (result.result !== "ok") {
      result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
      });
    }

    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
}

/**
 * Get all documents for a reference with fresh signed URLs
 */
export async function getDocumentsForReference(reference: string): Promise<UploadResult[]> {
  try {
    // Search in authenticated resources
    const result = await cloudinary.search
      .expression(`folder:neofidu/documents/${reference}* AND type:authenticated`)
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    return result.resources.map((resource: any) => {
      // PDFs are uploaded as "image" type for Cloudinary preview support
      const isPDF = /\.pdf$/i.test(resource.public_id);
      const resourceType = (resource.resource_type === "image" || isPDF) ? "image" : "raw";

      return {
        public_id: resource.public_id,
        // Generate fresh signed URL for each document
        secure_url: generateSignedUrl(resource.public_id, resourceType, 3600),
        original_filename: resource.filename || resource.public_id.split("/").pop(),
        format: resource.format,
        bytes: resource.bytes,
        created_at: resource.created_at,
      };
    });
  } catch (error) {
    console.error("Error fetching documents from Cloudinary:", error);
    return [];
  }
}

/**
 * Get a fresh signed URL for a specific document (for admin viewing)
 * @param publicId - The public_id of the document
 * @param expiresInSeconds - How long the URL should be valid (default: 2 hours)
 */
export function getSecureDocumentUrl(publicId: string, expiresInSeconds: number = 7200): string {
  // Determine resource type from public_id
  // PDFs are uploaded as "image" type for Cloudinary preview support
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(publicId);
  const isPDF = /\.pdf$/i.test(publicId);
  const resourceType = (isImage || isPDF) ? "image" : "raw";

  return generateSignedUrl(publicId, resourceType, expiresInSeconds);
}

/**
 * Upload PDF summary to Cloudinary (PRIVATE)
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

    // Build file name
    let filePrefix = reference;
    filePrefix += `_${dateStr}`;
    if (lastName) filePrefix += `_${cleanName(lastName)}`;
    if (firstName) filePrefix += `_${cleanName(firstName)}`;
    const publicId = `${filePrefix}_Fiche_Recapitulative.pdf`;

    const folder = getCustomerFolder(reference, lastName, firstName);

    // Upload as PRIVATE/AUTHENTICATED
    // Use "image" resource_type for PDFs to enable Cloudinary preview
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: "image",
      type: "authenticated", // 🔒 PRIVATE
      public_id: publicId,
      tags: ["neofidu", "summary", "pdf", reference, "private"],
      use_filename: true,
      unique_filename: false,
    });

    // Generate signed URL
    const signedUrl = generateSignedUrl(result.public_id, "image", 3600);

    return {
      public_id: result.public_id,
      secure_url: signedUrl,
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
 * Upload text summary as a .txt file to Cloudinary (PRIVATE)
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

    // Build file name
    let filePrefix = reference;
    filePrefix += `_${dateStr}`;
    if (lastName) filePrefix += `_${cleanName(lastName)}`;
    if (firstName) filePrefix += `_${cleanName(firstName)}`;
    const publicId = `${filePrefix}_Fiche_Recapitulative.txt`;

    const folder = getCustomerFolder(reference, lastName, firstName);

    // Upload as PRIVATE/AUTHENTICATED
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: "raw",
      type: "authenticated", // 🔒 PRIVATE
      public_id: publicId,
      tags: ["neofidu", "summary", reference, "private"],
      use_filename: true,
      unique_filename: false,
    });

    // Generate signed URL
    const signedUrl = generateSignedUrl(result.public_id, "raw", 3600);

    return {
      public_id: result.public_id,
      secure_url: signedUrl,
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
  const dateStr = now.toISOString().split('T')[0];

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
