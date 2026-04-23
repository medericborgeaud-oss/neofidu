"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Check,
  Building2,
  Upload,
  FileText,
  X,
  Paperclip,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const cantons = [
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "GE", name: "Genève" },
  { code: "NE", name: "Neuchâtel" },
  { code: "JU", name: "Jura" },
  { code: "FR", name: "Fribourg" },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const documentCategories = [
  { id: "extract", name: "Extrait RC / IDE", description: "Registre du commerce" },
  { id: "accounting", name: "Comptabilité existante", description: "Fichiers Excel, PDF" },
  { id: "bank", name: "Relevés bancaires", description: "12 derniers mois" },
  { id: "invoices", name: "Factures", description: "Clients/fournisseurs" },
  { id: "contracts", name: "Contrats", description: "Bail, leasing, employés" },
  { id: "other", name: "Autres", description: "Tout document utile" },
];

export default function OnboardingComptabilitePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitReference, setSubmitReference] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    // Company info
    companyName: "",
    businessType: "sarl",
    activity: "",
    canton: "",
    street: "",
    npa: "",
    city: "",

    // Contact info
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",

    // Business details
    employeesCount: "",
    annualRevenue: "",
    isVatRegistered: false,
    currentAccountingSoftware: "",
    fiscalYearEnd: "31.12",

    // Additional info
    specificNeeds: "",
    urgentMatters: "",
  });

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(2, 11),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const canSubmit = () => {
    return (
      formData.companyName.trim() !== "" &&
      formData.contactFirstName.trim() !== "" &&
      formData.contactLastName.trim() !== "" &&
      formData.contactEmail.trim() !== "" &&
      formData.canton !== ""
    );
  };

  const handleSubmit = async () => {
    if (!canSubmit()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const submitFormData = new FormData();

      submitFormData.append("data", JSON.stringify({
        type: "onboarding",
        ...formData,
        cantonName: cantons.find(c => c.code === formData.canton)?.name || formData.canton,
        documentsCount: uploadedFiles.length,
      }));

      uploadedFiles.forEach((uploadedFile) => {
        submitFormData.append("files", uploadedFile.file);
      });

      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: submitFormData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitReference(data.reference);
        setIsSubmitted(true);
      } else {
        setSubmitError(data.error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success page
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                neo<span className="font-normal">fidu</span>
                <span className="text-sm text-gray-400">.ch</span>
              </span>
            </Link>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="p-8 md:p-12 text-center shadow-xl border-0">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Formulaire envoyé !
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Merci pour votre confiance. Nous avons bien reçu vos informations.
              Notre équipe analysera votre dossier et vous contactera.
            </p>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 mb-8 border border-teal-200">
              <p className="text-sm text-teal-700 mb-2 font-medium">Votre référence</p>
              <p className="font-mono text-3xl font-bold text-teal-700 tracking-wider">{submitReference}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Prochaines étapes</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-gray-700">Notre équipe analyse votre dossier</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-gray-700">Contact rapide pour finaliser</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-gray-700">Mise en place de votre comptabilité</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>Un email de confirmation a été envoyé à</p>
              <p className="font-medium text-gray-700 mt-1">{formData.contactEmail}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <Link
                href="/"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Retour au site NeoFidu
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Form page
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              neo<span className="font-normal">fidu</span>
              <span className="text-sm text-gray-400">.ch</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Formulaire sécurisé</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Onboarding Client Comptabilité
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bienvenue chez NeoFidu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remplissez ce formulaire pour nous transmettre les informations
            nécessaires à la gestion de votre comptabilité.
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-xl border-0 bg-white/80 backdrop-blur">
          {/* Section 1: Company Info */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Informations de l'entreprise
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => updateForm("companyName", e.target.value)}
                  placeholder="Ma Société Sàrl"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forme juridique <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => updateForm("businessType", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="sarl">Sàrl</option>
                  <option value="sa">SA</option>
                  <option value="independent">Indépendant / RI</option>
                  <option value="association">Association</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canton <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.canton}
                  onChange={(e) => updateForm("canton", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Sélectionner un canton</option>
                  {cantons.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activité principale
                </label>
                <Input
                  value={formData.activity}
                  onChange={(e) => updateForm("activity", e.target.value)}
                  placeholder="Ex: Consulting, commerce, services..."
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <Input
                  value={formData.street}
                  onChange={(e) => updateForm("street", e.target.value)}
                  placeholder="Rue du Commerce 10"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NPA
                </label>
                <Input
                  value={formData.npa}
                  onChange={(e) => updateForm("npa", e.target.value)}
                  placeholder="1003"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <Input
                  value={formData.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  placeholder="Lausanne"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-8"></div>

          {/* Section 2: Contact Info */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Personne de contact
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.contactFirstName}
                  onChange={(e) => updateForm("contactFirstName", e.target.value)}
                  placeholder="Jean"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.contactLastName}
                  onChange={(e) => updateForm("contactLastName", e.target.value)}
                  placeholder="Dupont"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateForm("contactEmail", e.target.value)}
                  placeholder="contact@entreprise.ch"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <Input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateForm("contactPhone", e.target.value)}
                  placeholder="+41 21 123 45 67"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-8"></div>

          {/* Section 3: Business Details */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Détails de l'activité
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'employés
                </label>
                <Input
                  type="number"
                  value={formData.employeesCount}
                  onChange={(e) => updateForm("employeesCount", e.target.value)}
                  placeholder="0"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chiffre d'affaires annuel estimé
                </label>
                <Input
                  value={formData.annualRevenue}
                  onChange={(e) => updateForm("annualRevenue", e.target.value)}
                  placeholder="CHF 100'000.-"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logiciel comptable actuel
                </label>
                <Input
                  value={formData.currentAccountingSoftware}
                  onChange={(e) => updateForm("currentAccountingSoftware", e.target.value)}
                  placeholder="Ex: Banana, Bexio, aucun..."
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fin de l'exercice fiscal
                </label>
                <select
                  value={formData.fiscalYearEnd}
                  onChange={(e) => updateForm("fiscalYearEnd", e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="31.12">31 décembre</option>
                  <option value="30.06">30 juin</option>
                  <option value="31.03">31 mars</option>
                  <option value="30.09">30 septembre</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.isVatRegistered}
                    onChange={(e) => updateForm("isVatRegistered", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    L'entreprise est assujettie à la TVA
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-8"></div>

          {/* Section 4: Documents */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Documents
              </h2>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">
                Téléchargez les documents nécessaires pour démarrer notre collaboration.
                Vous pouvez également nous les envoyer par email ultérieurement.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                {documentCategories.map((cat) => (
                  <div key={cat.id} className="p-3 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition-colors">
                    <p className="text-sm font-medium text-gray-700">{cat.name}</p>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center hover:border-teal-500 hover:bg-teal-50/50 transition-all mb-4 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,.gif,.bmp,.doc,.docx,.xls,.xlsx,.csv,.zip"
              />
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-teal-600" />
              </div>
              <p className="text-gray-600 mb-2">Glissez vos fichiers ici ou cliquez pour parcourir</p>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-teal-600 text-teal-600 hover:bg-teal-50"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <Paperclip className="w-4 h-4 mr-2" />
                Parcourir les fichiers
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Formats acceptés: PDF, images, Excel, Word (max 10 MB par fichier)
              </p>
            </div>

            {/* Uploaded files list */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Fichiers téléchargés
                  </h4>
                  <Badge className="bg-teal-600 hover:bg-teal-700">
                    {uploadedFiles.length} fichier(s)
                  </Badge>
                </div>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-teal-50 rounded-xl border border-teal-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-8"></div>

          {/* Section 5: Additional Info */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Informations complémentaires
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Besoins spécifiques ou questions
                </label>
                <Textarea
                  value={formData.specificNeeds}
                  onChange={(e) => updateForm("specificNeeds", e.target.value)}
                  placeholder="Décrivez vos besoins particuliers, questions ou attentes..."
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500 min-h-[100px]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points urgents à traiter
                </label>
                <Textarea
                  value={formData.urgentMatters}
                  onChange={(e) => updateForm("urgentMatters", e.target.value)}
                  placeholder="Y a-t-il des échéances ou des points urgents à traiter en priorité ?"
                  className="rounded-xl border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Error message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{submitError}</p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-100">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit() || isSubmitting}
              className="w-full md:w-auto px-12 py-6 text-lg rounded-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer le formulaire
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Champs obligatoires
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Ce formulaire est sécurisé et vos données sont protégées.</span>
          </div>
          <p className="mt-2">
            <span className="font-bold text-gray-700">neo</span>
            <span className="text-gray-700">fidu</span>
            <span className="text-gray-400">.ch</span>
            <span className="mx-2">|</span>
            <span>Fiduciaire digitale en Suisse romande</span>
          </p>
        </div>
      </div>
    </div>
  );
}
