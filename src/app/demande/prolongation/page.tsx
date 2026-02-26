"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Upload,
  FileText,
  X,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";



const cantons = [
  { code: "VD", name: "Vaud", deadline: "15 mars 2026", extension1: "30 juin 2026", extension2: "30 septembre 2026" },
  { code: "VS", name: "Valais", deadline: "31 mars 2026", extension1: "30 juin 2026", extension2: "30 septembre 2026" },
  { code: "GE", name: "Genève", deadline: "31 mars 2026", extension1: "30 juin 2026", extension2: "30 septembre 2026" },
  { code: "NE", name: "Neuchâtel", deadline: "15 mars 2026", extension1: "30 juin 2026", extension2: "30 septembre 2026" },
  { code: "JU", name: "Jura", deadline: "31 mars 2026", extension1: "30 juin 2026", extension2: "30 septembre 2026" },
  { code: "FR", name: "Fribourg", deadline: "15 mars 2026", extension1: "30 juin 2026", extension2: "30 septembre 2026" },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  file: File;
  url?: string;
}

export default function ProlongationPage() {
  const { isEnglish } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    canton: "",
    extensionUntil: "extension1",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    npa: "",
    city: "",
    agreeTerms: false,
  });
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCanton = cantons.find((c) => c.code === formData.canton);

  const t = {
    backToServices: isEnglish ? "Back to services" : "Retour aux services",
    title: isEnglish ? "Deadline Extension" : "Prolongation de délai",
    subtitle: isEnglish
      ? "Request an extension for your tax declaration deadline"
      : "Demandez une prolongation pour votre déclaration d'impôts",
    price: "CHF 20.-",
    priceNote: isEnglish ? "incl. VAT" : "TTC",
    step1Title: isEnglish ? "Your canton" : "Votre canton",
    step2Title: isEnglish ? "Your information" : "Vos coordonnées",
    step3Title: isEnglish ? "Tax form" : "Formulaire fiscal",
    step4Title: isEnglish ? "Payment" : "Paiement",
    selectCanton: isEnglish ? "Select your canton of residence on December 31, 2025" : "Sélectionnez votre canton de résidence au 31 décembre 2025",
    currentDeadline: isEnglish ? "Current deadline" : "Délai actuel",
    extensionUntil: isEnglish ? "Extension until" : "Prolongation jusqu'au",
    extensionOption1: isEnglish ? "First extension" : "Première prolongation",
    extensionOption2: isEnglish ? "Second extension" : "Deuxième prolongation",
    firstName: isEnglish ? "First name" : "Prénom",
    lastName: isEnglish ? "Last name" : "Nom",
    email: "Email",
    phone: isEnglish ? "Phone" : "Téléphone",
    address: isEnglish ? "Address" : "Adresse",
    npa: isEnglish ? "Postal code" : "NPA",
    city: isEnglish ? "City" : "Localité",
    uploadTitle: isEnglish
      ? 'Upload the first page of your "Tax transmission form 2025"'
      : 'Téléchargez la première page de votre "Formulaire 2025 de transmission"',
    uploadDescription: isEnglish
      ? "You receive this document by mail between January and February"
      : "Vous recevez ce document par courrier entre janvier et février",
    uploadButton: isEnglish ? "Upload file" : "Télécharger le fichier",
    dragDrop: isEnglish ? "or drag and drop here" : "ou glissez-déposez ici",
    removeFile: isEnglish ? "Remove" : "Supprimer",
    agreeTerms: isEnglish
      ? "I agree to the general terms and conditions"
      : "J'accepte les conditions générales",
    continueBtn: isEnglish ? "Continue" : "Continuer",
    back: isEnglish ? "Back" : "Retour",
    payNow: isEnglish ? "Pay CHF 20.-" : "Payer CHF 20.-",
    processing: isEnglish ? "Processing..." : "Traitement...",
    requiredField: isEnglish ? "Required field" : "Champ obligatoire",
    whyExtension: isEnglish ? "Why request an extension?" : "Pourquoi demander une prolongation ?",
    whyExtensionText: isEnglish
      ? "If you cannot submit your tax declaration by the deadline, we handle all formalities with the tax authorities."
      : "Si vous ne pouvez pas déposer votre déclaration dans le délai, nous nous chargeons de toutes les démarches.",
  };

  const updateForm = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setError(isEnglish ? "Please upload a PDF or image file" : "Veuillez télécharger un PDF ou image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(isEnglish ? "File must be less than 10MB" : "Le fichier doit faire moins de 10 Mo");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("category", "tax-form");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      setUploadedFile({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        file: file,
        url: data.url,
      });
    } catch {
      setError(isEnglish ? "Upload failed. Please try again." : "Échec du téléchargement.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
      handleFileSelect({ target: { files: dt.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        if (!formData.canton) {
          setError(isEnglish ? "Please select a canton" : "Veuillez sélectionner un canton");
          return false;
        }
        return true;
      case 2:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.npa || !formData.city) {
          setError(t.requiredField);
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setError(isEnglish ? "Invalid email" : "Email invalide");
          return false;
        }
        return true;
      case 3:
        if (!uploadedFile) {
          setError(isEnglish ? "Please upload the tax form" : "Veuillez télécharger le formulaire");
          return false;
        }
        if (!formData.agreeTerms) {
          setError(isEnglish ? "Please accept the terms" : "Veuillez accepter les conditions");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setError(null);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const requestResponse = await fetch("/api/extension-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          canton: formData.canton,
          extensionUntil: formData.extensionUntil === "extension1" ? selectedCanton?.extension1 : selectedCanton?.extension2,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          npa: formData.npa,
          city: formData.city,
          documentUrl: uploadedFile?.url,
          amount: 20,
        }),
      });

      if (!requestResponse.ok) throw new Error("Failed to create request");

      const requestData = await requestResponse.json();

      const checkoutResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: requestData.id,
          requestType: "extension",
          amount: 20,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          description: `Prolongation de délai - ${selectedCanton?.name}`,
        }),
      });

      if (!checkoutResponse.ok) throw new Error("Failed to create checkout");

      const { url } = await checkoutResponse.json();

      if (url) { window.location.href = url; }
    } catch (err) {
      console.error("Payment error:", err);
      setError(isEnglish ? "Payment error. Please try again." : "Erreur de paiement.");
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/demande" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t.backToServices}
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">
                {t.price} <span className="text-sm font-normal ml-1">{t.priceNote}</span>
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-muted-foreground text-lg">{t.subtitle}</p>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${step >= s ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? "bg-primary" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span className={step >= 1 ? "text-primary font-medium" : ""}>{t.step1Title}</span>
              <span className={step >= 2 ? "text-primary font-medium" : ""}>{t.step2Title}</span>
              <span className={step >= 3 ? "text-primary font-medium" : ""}>{t.step3Title}</span>
              <span className={step >= 4 ? "text-primary font-medium" : ""}>{t.step4Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">{t.step1Title}</h2>
                    <p className="text-muted-foreground">{t.selectCanton}</p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {cantons.map((canton) => (
                        <div
                          key={canton.code}
                          onClick={() => updateForm("canton", canton.code)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${formData.canton === canton.code ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"}`}
                        >
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary mb-1">{canton.code}</p>
                            <p className="font-medium">{canton.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedCanton && (
                      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-amber-800">
                              {t.currentDeadline}: <span className="text-amber-900">{selectedCanton.deadline}</span>
                            </p>
                            <div className="mt-3 space-y-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="extension" checked={formData.extensionUntil === "extension1"} onChange={() => updateForm("extensionUntil", "extension1")} className="w-4 h-4 text-primary" />
                                <span><span className="font-medium">{t.extensionOption1}:</span> <span className="text-primary font-semibold">{selectedCanton.extension1}</span></span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="extension" checked={formData.extensionUntil === "extension2"} onChange={() => updateForm("extensionUntil", "extension2")} className="w-4 h-4 text-primary" />
                                <span><span className="font-medium">{t.extensionOption2}:</span> <span className="text-primary font-semibold">{selectedCanton.extension2}</span></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">{t.step2Title}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t.firstName} *</label>
                        <Input value={formData.firstName} onChange={(e) => updateForm("firstName", e.target.value)} placeholder="Jean" className="rounded-xl" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t.lastName} *</label>
                        <Input value={formData.lastName} onChange={(e) => updateForm("lastName", e.target.value)} placeholder="Dupont" className="rounded-xl" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t.email} *</label>
                        <Input type="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="jean.dupont@email.ch" className="rounded-xl" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t.phone}</label>
                        <Input type="tel" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+41 79 123 45 67" className="rounded-xl" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">{t.address} *</label>
                      <Input value={formData.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Rue de Lausanne 10" className="rounded-xl" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t.npa} *</label>
                        <Input value={formData.npa} onChange={(e) => updateForm("npa", e.target.value)} placeholder="1000" className="rounded-xl" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium mb-2 block">{t.city} *</label>
                        <Input value={formData.city} onChange={(e) => updateForm("city", e.target.value)} placeholder="Lausanne" className="rounded-xl" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">{t.step3Title}</h2>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">{t.uploadTitle}</p>
                          <p className="text-sm text-blue-700 mt-1">{t.uploadDescription}</p>
                        </div>
                      </div>
                    </div>

                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${uploadedFile ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"}`} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                          <p className="text-muted-foreground">Téléchargement...</p>
                        </div>
                      ) : uploadedFile ? (
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div className="flex items-center gap-3">
                            <FileText className="w-10 h-10 text-primary" />
                            <div className="text-left">
                              <p className="font-medium">{uploadedFile.name}</p>
                              <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={removeFile} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <X className="w-4 h-4 mr-1" />
                            {t.removeFile}
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={handleFileSelect} className="hidden" />
                          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-full mb-2">
                            <Upload className="w-4 h-4 mr-2" />
                            {t.uploadButton}
                          </Button>
                          <p className="text-sm text-muted-foreground">{t.dragDrop}</p>
                          <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG (max 10 MB)</p>
                        </>
                      )}
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.agreeTerms} onChange={(e) => updateForm("agreeTerms", e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-primary mt-0.5" />
                      <span className="text-sm">
                        {t.agreeTerms} <Link href="/conditions-generales" className="text-primary hover:underline">NeoFidu</Link>
                      </span>
                    </label>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">{t.step4Title}</h2>
                    <div className="p-6 bg-gray-50 rounded-xl space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Canton</span>
                        <span className="font-medium">{selectedCanton?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t.extensionUntil}</span>
                        <span className="font-medium text-primary">{formData.extensionUntil === "extension1" ? selectedCanton?.extension1 : selectedCanton?.extension2}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{isEnglish ? "Name" : "Nom"}</span>
                        <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">CHF 20.-</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>{isEnglish ? "Secure payment" : "Paiement sécurisé"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{isEnglish ? "Instant processing" : "Traitement immédiat"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prevStep} className="rounded-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t.back}
                    </Button>
                  ) : <div />}

                  {step < 4 ? (
                    <Button onClick={nextStep} className="rounded-full">
                      {t.continueBtn}
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  ) : (
                    <Button onClick={handlePayment} disabled={isLoading} className="rounded-full bg-primary hover:bg-primary/90">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t.processing}
                        </>
                      ) : t.payNow}
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  {isEnglish ? "Service includes" : "Le service comprend"}
                </h3>
                <ul className="space-y-3">
                  {[
                    isEnglish ? "Request processed within 24h" : "Demande traitée sous 24h",
                    isEnglish ? "Confirmation sent by email" : "Confirmation envoyée par email",
                    isEnglish ? "Administrative formalities handled" : "Démarches prises en charge",
                    isEnglish ? "Valid for 2025 tax year" : "Valable pour l'année fiscale 2025",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="font-bold mb-3">{t.whyExtension}</h3>
                <p className="text-sm text-muted-foreground">{t.whyExtensionText}</p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold mb-3">{isEnglish ? "Need help?" : "Besoin d'aide ?"}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isEnglish ? "Contact us for any questions." : "Contactez-nous pour toute question."}
                </p>
                <Link href="/#contact">
                  <Button variant="outline" className="w-full rounded-full">
                    {isEnglish ? "Contact us" : "Nous contacter"}
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
