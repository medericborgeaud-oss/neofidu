"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, FileText, Clock, CheckCircle2, AlertCircle, Loader2, Upload, X, File } from "lucide-react";

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

const statusLabels: Record<string, string> = {
  received: "Demande reçue",
  payment_pending: "En attente de paiement",
  in_review: "En cours d'analyse",
  documents_needed: "Documents requis",
  in_progress: "En traitement",
  completed: "Terminé",
  delivered: "Livré",
};

const statusColors: Record<string, string> = {
  received: "bg-blue-100 text-blue-800",
  payment_pending: "bg-yellow-100 text-yellow-800",
  in_review: "bg-purple-100 text-purple-800",
  documents_needed: "bg-orange-100 text-orange-800",
  in_progress: "bg-teal-100 text-teal-800",
  completed: "bg-green-100 text-green-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

const statusOrder = [
  "received",
  "payment_pending",
  "in_review",
  "documents_needed",
  "in_progress",
  "completed",
  "delivered",
];

function getStatusProgress(status: string): number {
  const index = statusOrder.indexOf(status);
  if (index === -1) return 0;
  return Math.round(((index + 1) / statusOrder.length) * 100);
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function SuiviPage() {
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) {
      setError("Veuillez entrer un numéro de référence");
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
        setError(data.error || "Demande non trouvée");
        setRequestData(null);
      } else {
        setRequestData(data);
        setError(null);
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
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
        setUploadError(`Type de fichier non autorisé: ${file.name}`);
        continue;
      }
      if (file.size > maxSize) {
        setUploadError(`Fichier trop volumineux (max 10 MB): ${file.name}`);
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
        setUploadError(data.error || "Erreur lors de l'upload");
      } else {
        setUploadSuccess(data.message || "Documents téléversés avec succès");
        setSelectedFiles([]);

        // Refresh the request data to show new documents
        const refreshRes = await fetch(`/api/requests/${encodeURIComponent(requestData.reference)}`);
        if (refreshRes.ok) {
          const refreshedData = await refreshRes.json();
          setRequestData(refreshedData);
        }
      }
    } catch {
      setUploadError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-teal-50 to-white">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Suivi de votre demande
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Entrez votre numéro de référence pour suivre l'avancement de votre dossier en temps réel
              </p>
            </div>

            {/* Search Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Ex: NF-A1B2C3D4"
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
                        Rechercher
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
                          Référence: {requestData.reference}
                        </CardTitle>
                        <CardDescription>
                          {requestData.type === "tax" ? "Déclaration fiscale" :
                           requestData.type === "accounting" ? "Comptabilité" : "Gestion immobilière"}
                          {" • "} Canton: {requestData.canton}
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
                        <span>Progression</span>
                        <span>{getStatusProgress(requestData.status)}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${getStatusProgress(requestData.status)}%` }}
                        />
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Créé le:</span>
                        <span className="font-medium">{formatDate(requestData.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Mis à jour:</span>
                        <span className="font-medium">{formatDate(requestData.updatedAt)}</span>
                      </div>
                      {requestData.estimatedCompletion && (
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-500" />
                          <span className="text-gray-600">Fin estimée:</span>
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
                          <strong>Note:</strong> {requestData.notes}
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
                      Ajouter des documents
                    </CardTitle>
                    <CardDescription>
                      Téléversez des documents supplémentaires pour votre dossier (PDF, images, Word, Excel - max 10 MB)
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
                        <span className="font-medium text-teal-600">Cliquez pour sélectionner</span> ou glissez-déposez vos fichiers
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, images, Word, Excel (max 10 MB par fichier)
                      </p>
                    </div>

                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Fichiers sélectionnés ({selectedFiles.length})
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
                              Téléversement...
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 mr-2" />
                              Téléverser {selectedFiles.length} fichier{selectedFiles.length > 1 ? "s" : ""}
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
                      <CardTitle className="text-lg">Historique</CardTitle>
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
                      <CardTitle className="text-lg">Documents fournis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {requestData.documents.map((doc, index) => (
                          <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-teal-500" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">
                                Ajouté le {formatDate(doc.uploadedAt)}
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
                <p className="text-lg mb-2">Vous avez déposé une demande ?</p>
                <p>Entrez votre numéro de référence ci-dessus pour voir son statut.</p>
                <p className="text-sm mt-4">
                  Le numéro de référence vous a été envoyé par email lors de votre demande.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
