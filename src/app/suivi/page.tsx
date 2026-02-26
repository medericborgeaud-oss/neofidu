"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, FileText, Clock, CheckCircle2, AlertCircle, Loader2, Upload, X, File } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface StatusHistoryItem {
  status: string;
  date: string;
  note?: string;
}

interface RequestData {
  reference: string;
  type: string;
  customerName: string;
  canton: string;
  status: string;
  statusLabel: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  estimatedCompletion?: string;
  statusHistory: StatusHistoryItem[];
  documents?: { name: string; uploadedAt: string }[];
  notes?: string;
}

const statusColors: Record<string, string> = {
  // Statuts génériques (comptabilité, gérance)
  received: "bg-blue-100 text-blue-800",
  processing: "bg-amber-100 text-amber-800",
  done: "bg-green-100 text-green-800",
  // Statuts fiscaux
  pending: "bg-gray-100 text-gray-800",
  paid: "bg-blue-100 text-blue-800",
  payment_pending: "bg-yellow-100 text-yellow-800",
  in_review: "bg-purple-100 text-purple-800",
  documents_needed: "bg-orange-100 text-orange-800",
  in_progress: "bg-teal-100 text-teal-800",
  completed: "bg-green-100 text-green-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

// Ordre des statuts pour les demandes fiscales
const taxStatusOrder = [
  "pending",
  "paid",
  "in_progress",
  "completed",
  "delivered",
];

// Ordre des statuts pour les demandes comptabilité/gérance
const genericStatusOrder = [
  "received",
  "processing",
  "done",
];

function getStatusProgress(status: string, requestType?: string): number {
  // Déterminer quel ordre de statuts utiliser
  if (requestType === "accounting" || requestType === "property") {
    const index = genericStatusOrder.indexOf(status);
    if (index === -1) return 0;
    return Math.round(((index + 1) / genericStatusOrder.length) * 100);
  }

  // Par défaut, utiliser les statuts fiscaux
  const index = taxStatusOrder.indexOf(status);
  if (index === -1) {
    // Fallback: essayer les statuts génériques
    const genericIndex = genericStatusOrder.indexOf(status);
    if (genericIndex !== -1) {
      return Math.round(((genericIndex + 1) / genericStatusOrder.length) * 100);
    }
    return 0;
  }
  return Math.round(((index + 1) / taxStatusOrder.length) * 100);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function SuiviPage() {
  const { isEnglish } = useLanguage();
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<RequestData | null>(null);

  // Upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Translations
  const statusLabels: Record<string, string> = isEnglish
    ? {
        // Generic request statuses (accounting, property)
        received: "Request received",
        processing: "In progress",
        done: "Completed",
        // Tax request statuses
        pending: "Awaiting payment",
        paid: "Paid",
        payment_pending: "Awaiting payment",
        in_review: "Under review",
        documents_needed: "Documents required",
        in_progress: "In progress",
        completed: "Completed",
        delivered: "Delivered",
      }
    : {
        // Statuts demandes génériques (comptabilité, gérance)
        received: "Demande reçue",
        processing: "En traitement",
        done: "Terminé",
        // Statuts demandes fiscales
        pending: "En attente de paiement",
        paid: "Payé",
        payment_pending: "En attente de paiement",
        in_review: "En cours d'analyse",
        documents_needed: "Documents requis",
        in_progress: "En cours de traitement",
        completed: "Terminé",
        delivered: "Livré",
      };

  const t = {
    // Page header
    pageTitle: isEnglish ? "Track your request" : "Suivi de votre demande",
    pageSubtitle: isEnglish
      ? "Enter your reference number to track the progress of your file in real time"
      : "Entrez votre numéro de référence pour suivre l'avancement de votre dossier en temps réel",

    // Search
    searchPlaceholder: isEnglish ? "Ex: NF-A1B2C3D4" : "Ex: NF-A1B2C3D4",
    searchButton: isEnglish ? "Search" : "Rechercher",
    errorEmptyRef: isEnglish ? "Please enter a reference number" : "Veuillez entrer un numéro de référence",
    errorNotFound: isEnglish ? "Request not found" : "Demande non trouvée",
    errorConnection: isEnglish ? "Connection error. Please try again." : "Erreur de connexion. Veuillez réessayer.",

    // Results
    reference: isEnglish ? "Reference" : "Référence",
    taxDeclaration: isEnglish ? "Tax declaration" : "Déclaration fiscale",
    accounting: isEnglish ? "Accounting" : "Comptabilité",
    propertyManagement: isEnglish ? "Property management" : "Gestion immobilière",
    canton: isEnglish ? "Canton" : "Canton",
    progress: isEnglish ? "Progress" : "Progression",
    createdOn: isEnglish ? "Created on:" : "Créé le:",
    updatedOn: isEnglish ? "Updated on:" : "Mis à jour:",
    estimatedCompletion: isEnglish ? "Estimated completion:" : "Fin estimée:",
    note: isEnglish ? "Note:" : "Note:",

    // Document upload
    addDocuments: isEnglish ? "Add documents" : "Ajouter des documents",
    uploadDescription: isEnglish
      ? "Upload additional documents for your file (PDF, images, Word, Excel - max 10 MB)"
      : "Téléversez des documents supplémentaires pour votre dossier (PDF, images, Word, Excel - max 10 MB)",
    clickToSelect: isEnglish ? "Click to select" : "Cliquez pour sélectionner",
    orDragDrop: isEnglish ? "or drag and drop your files" : "ou glissez-déposez vos fichiers",
    fileTypes: isEnglish ? "PDF, images, Word, Excel (max 10 MB per file)" : "PDF, images, Word, Excel (max 10 MB par fichier)",
    selectedFiles: isEnglish ? "Selected files" : "Fichiers sélectionnés",
    uploadButton: isEnglish ? "Upload" : "Téléverser",
    uploadButtonFile: isEnglish ? "file" : "fichier",
    uploadButtonFiles: isEnglish ? "files" : "fichiers",
    uploading: isEnglish ? "Uploading..." : "Téléversement...",
    uploadSuccess: isEnglish ? "Documents uploaded successfully" : "Documents téléversés avec succès",
    uploadErrorType: isEnglish ? "File type not allowed:" : "Type de fichier non autorisé:",
    uploadErrorSize: isEnglish ? "File too large (max 10 MB):" : "Fichier trop volumineux (max 10 MB):",
    uploadErrorGeneric: isEnglish ? "Error uploading files" : "Erreur lors de l'upload",

    // History
    history: isEnglish ? "History" : "Historique",

    // Documents
    documentsProvided: isEnglish ? "Documents provided" : "Documents fournis",
    addedOn: isEnglish ? "Added on" : "Ajouté le",

    // Help text
    helpTitle: isEnglish ? "Have you submitted a request?" : "Vous avez déposé une demande ?",
    helpText: isEnglish
      ? "Enter your reference number above to see its status."
      : "Entrez votre numéro de référence ci-dessus pour voir son statut.",
    helpNote: isEnglish
      ? "The reference number was sent to you by email when you submitted your request."
      : "Le numéro de référence vous a été envoyé par email lors de votre demande.",
  };

  function formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleDateString(isEnglish ? "en-GB" : "fr-CH", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) {
      setError(t.errorEmptyRef);
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedFiles([]);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const res = await fetch(`/api/requests/${encodeURIComponent(reference.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.errorNotFound);
        setRequestData(null);
      } else {
        setRequestData(data);
        setError(null);
      }
    } catch {
      setError(t.errorConnection);
      setRequestData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
  };

  const addFiles = (newFiles: File[]) => {
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
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles: File[] = [];
    for (const file of newFiles) {
      if (!allowedTypes.includes(file.type)) {
        setUploadError(`${t.uploadErrorType} ${file.name}`);
        continue;
      }
      if (file.size > maxSize) {
        setUploadError(`${t.uploadErrorSize} ${file.name}`);
        continue;
      }
      // Avoid duplicates
      if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setUploadError(null);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      addFiles(Array.from(files));
    }
  };

  const handleUpload = async () => {
    if (!requestData || selectedFiles.length === 0) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }

      const res = await fetch(`/api/requests/${encodeURIComponent(requestData.reference)}/documents`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || t.uploadErrorGeneric);
      } else {
        setUploadSuccess(data.message || t.uploadSuccess);
        setSelectedFiles([]);

        // Refresh the request data to show new documents
        const refreshRes = await fetch(`/api/requests/${encodeURIComponent(requestData.reference)}`);
        if (refreshRes.ok) {
          const refreshedData = await refreshRes.json();
          setRequestData(refreshedData);
        }
      }
    } catch {
      setUploadError(t.errorConnection);
    } finally {
      setUploading(false);
    }
  };

  const getTypeLabel = (type: string) => {
    if (type === "tax") return t.taxDeclaration;
    if (type === "accounting") return t.accounting;
    return t.propertyManagement;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-teal-50 to-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb */}
            <BreadcrumbLight
              items={[
                { label: isEnglish ? "Track my request" : "Suivre ma demande" },
              ]}
              className="mb-8"
            />
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.pageTitle}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t.pageSubtitle}
              </p>
            </div>

            {/* Search Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-8 bg-teal-500 hover:bg-teal-600"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        {t.searchButton}
                      </>
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {requestData && (
              <div className="space-y-6">
                {/* Status Card */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">
                          {t.reference}: {requestData.reference}
                        </CardTitle>
                        <CardDescription>
                          {getTypeLabel(requestData.type)}
                          {" • "} {t.canton}: {requestData.canton}
                        </CardDescription>
                      </div>
                      <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${statusColors[requestData.status] || "bg-gray-100 text-gray-800"}`}>
                        {statusLabels[requestData.status] || requestData.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{t.progress}</span>
                        <span>{getStatusProgress(requestData.status, requestData.type)}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${getStatusProgress(requestData.status, requestData.type)}%` }}
                        />
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{t.createdOn}</span>
                        <span className="font-medium">{formatDate(requestData.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{t.updatedOn}</span>
                        <span className="font-medium">{formatDate(requestData.updatedAt)}</span>
                      </div>
                      {requestData.estimatedCompletion && (
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500" />
                          <span className="text-gray-600">{t.estimatedCompletion}</span>
                          <span className="font-medium text-teal-600">
                            {formatDate(requestData.estimatedCompletion)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {requestData.notes && (
                      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800">
                          <strong>{t.note}</strong> {requestData.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Document Upload Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Upload className="w-5 h-5 text-teal-500" />
                      {t.addDocuments}
                    </CardTitle>
                    <CardDescription>
                      {t.uploadDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                        isDragging
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? "text-teal-500" : "text-gray-400"}`} />
                      <p className="text-gray-600 mb-1">
                        <span className="font-medium text-teal-600">{t.clickToSelect}</span> {t.orDragDrop}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t.fileTypes}
                      </p>
                    </div>

                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          {t.selectedFiles} ({selectedFiles.length})
                        </p>
                        {selectedFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <File className="w-5 h-5 text-teal-500 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ))}

                        <Button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="w-full mt-4 bg-teal-500 hover:bg-teal-600"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              {t.uploading}
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 mr-2" />
                              {t.uploadButton} {selectedFiles.length} {selectedFiles.length > 1 ? t.uploadButtonFiles : t.uploadButtonFile}
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {/* Upload Messages */}
                    {uploadError && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700">{uploadError}</p>
                      </div>
                    )}

                    {uploadSuccess && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-green-700">{uploadSuccess}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Timeline */}
                {requestData.statusHistory && requestData.statusHistory.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t.history}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {requestData.statusHistory.slice().reverse().map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-teal-500" : "bg-gray-300"}`} />
                              {index < requestData.statusHistory.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-200 my-1" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium text-gray-900">
                                {statusLabels[item.status] || item.status}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(item.date)}
                              </p>
                              {item.note && (
                                <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Documents */}
                {requestData.documents && requestData.documents.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t.documentsProvided}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {requestData.documents.map((doc, index) => (
                          <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-teal-500" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">
                                {t.addedOn} {formatDate(doc.uploadedAt)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Help Text */}
            {!requestData && !error && (
              <div className="text-center text-gray-500 py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">{t.helpTitle}</p>
                <p>{t.helpText}</p>
                <p className="text-sm mt-4">
                  {t.helpNote}
                </p>

                {/* Internal links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    {isEnglish ? "Useful links" : "Liens utiles"}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <a href="/demande" className="text-teal-600 hover:text-teal-700 hover:underline">
                      {isEnglish ? "Submit a new request" : "Déposer une nouvelle demande"}
                    </a>
                    <span className="text-gray-300">|</span>
                    <a href="/faq" className="text-teal-600 hover:text-teal-700 hover:underline">
                      {isEnglish ? "FAQ" : "Questions fréquentes"}
                    </a>
                    <span className="text-gray-300">|</span>
                    <a href="/#contact" className="text-teal-600 hover:text-teal-700 hover:underline">
                      {isEnglish ? "Contact us" : "Nous contacter"}
                    </a>
                    <span className="text-gray-300">|</span>
                    <a href="/blog" className="text-teal-600 hover:text-teal-700 hover:underline">
                      {isEnglish ? "Fiscal news" : "Actualités fiscales"}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
