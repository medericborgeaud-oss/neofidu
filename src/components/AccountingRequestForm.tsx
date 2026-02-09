"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Building2,
  Lock,
  Upload,
  FileText,
  X,
  Paperclip,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import {
  AccountingIllustration,
  SuccessIllustration,
  PaymentIllustration,
} from "@/components/Illustrations";
// Drapeaux retirés pour gagner de la place

const cantons = [
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "GE", name: "Genève" },
  { code: "NE", name: "Neuchâtel" },
  { code: "JU", name: "Jura" },
  { code: "FR", name: "Fribourg" },
];

const businessTypes = [
  {
    id: "independent",
    name: "Indépendant",
    icon: User,
    description: "Travailleur indépendant, profession libérale",
  },
  {
    id: "sarl",
    name: "Sàrl",
    icon: Building2,
    description: "Société à responsabilité limitée",
  },
  {
    id: "sa",
    name: "SA",
    icon: Building2,
    description: "Société anonyme",
  },
  {
    id: "other",
    name: "Autre",
    icon: Building2,
    description: "Association, fondation, etc.",
  },
];

const services = [
  {
    id: "bookkeeping",
    name: "Tenue de comptabilité",
    price: 150,
    description: "Saisie des écritures mensuelles",
  },
  {
    id: "annual",
    name: "Bilan annuel",
    price: 500,
    description: "Établissement du bilan et compte de résultat",
  },
  {
    id: "vat",
    name: "Déclarations TVA",
    price: 100,
    description: "Établissement et envoi des déclarations TVA",
  },
  {
    id: "payroll",
    name: "Gestion des salaires",
    price: 50,
    description: "Fiches de salaire et déclarations sociales",
  },
  {
    id: "consulting",
    name: "Conseil fiscal",
    price: 150,
    description: "Optimisation fiscale et conseils",
  },
];

const requiredDocuments = [
  { id: "extract", name: "Extrait RC / IDE", description: "Registre du commerce" },
  { id: "accounting", name: "Comptabilité existante", description: "Fichiers Excel, PDF, etc." },
  { id: "bank", name: "Relevés bancaires", description: "Des 12 derniers mois" },
  { id: "invoices", name: "Factures clients/fournisseurs", description: "À traiter" },
  { id: "contracts", name: "Contrats", description: "Bail, leasing, employés" },
  { id: "other", name: "Autres documents", description: "Tout document utile" },
];

const steps = [
  "Canton",
  "Entreprise",
  "Coordonnées",
  "Services",
  "Documents",
  "Certification",
  "Récapitulatif",
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  category: string;
}

export function AccountingRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("extract");

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const [formData, setFormData] = useState({
    canton: "",
    businessType: "",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    npa: "",
    city: "",
    activity: "",
    employeesCount: 0,
    annualRevenue: "",
    isVatRegistered: false,
    selectedServices: [] as string[],
    frequency: "monthly",
    comments: "",
    certifyAccuracy: false,
    certifyResponsibility: false,
  });

  const updateForm = (
    field: string,
    value: string | boolean | number | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    const current = formData.selectedServices;
    if (current.includes(serviceId)) {
      updateForm(
        "selectedServices",
        current.filter((s) => s !== serviceId)
      );
    } else {
      updateForm("selectedServices", [...current, serviceId]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUploadWithStorage(e);
  };

  const removeFile = (fileId: string) => {
    removeFileWithStorage(fileId);
  };

  const getFilesByCategory = (category: string) => {
    return uploadedFiles.filter((f) => f.category === category);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const calculatePrice = () => {
    let price = 0;
    formData.selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (service) price += service.price;
    });
    if (formData.employeesCount > 5) price += 50;
    if (formData.frequency === "annual") price = Math.round(price * 0.9);
    return price;
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.canton !== "";
    if (currentStep === 2) return formData.businessType !== "";
    if (currentStep === 3)
      return (
        formData.companyName &&
        formData.firstName &&
        formData.lastName &&
        formData.email
      );
    if (currentStep === 4) return formData.selectedServices.length > 0;
    if (currentStep === 6)
      return formData.certifyAccuracy && formData.certifyResponsibility;
    return true;
  };

  const nextStep = () =>
    currentStep < steps.length && setCurrentStep(currentStep + 1);
  const prevStep = () =>
    currentStep > 1 && setCurrentStep(currentStep - 1);

  const [submitReference, setSubmitReference] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  // Store actual File objects for upload
  const [actualFiles, setActualFiles] = useState<File[]>([]);

  const handleFileUploadWithStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUploadedFiles: UploadedFile[] = [];
      const newActualFiles: File[] = [];

      Array.from(files).forEach((file) => {
        newUploadedFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          category: activeCategory,
        });
        newActualFiles.push(file);
      });

      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
      setActualFiles((prev) => [...prev, ...newActualFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFileWithStorage = (fileId: string) => {
    const fileIndex = uploadedFiles.findIndex((f) => f.id === fileId);
    if (fileIndex !== -1) {
      setActualFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    }
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Get canton name from code
      const cantonData = cantons.find(c => c.code === formData.canton);

      // Get selected service names
      const selectedServiceNames = formData.selectedServices.map(id => {
        const service = services.find(s => s.id === id);
        return service ? service.name : id;
      });

      // Create FormData to send files
      const submitFormData = new FormData();

      // Add JSON data
      submitFormData.append("data", JSON.stringify({
        canton: cantonData?.name || formData.canton,
        cantonCode: formData.canton,
        businessType: formData.businessType,
        companyName: formData.companyName,
        activity: formData.activity,
        employeesCount: formData.employeesCount,
        annualRevenue: formData.annualRevenue,
        currentAccountingSoftware: "",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        npa: formData.npa,
        city: formData.city,
        selectedServices: selectedServiceNames,
        billingFrequency: formData.frequency,
        comments: formData.comments,
        documentsCount: actualFiles.length,
      }));

      // Add files
      actualFiles.forEach((file) => {
        submitFormData.append("files", file);
      });

      const response = await fetch("/api/accounting-requests", {
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

  if (isSubmitted) {
    return (
      <Card className="p-8 md:p-12 text-center">
        <SuccessIllustration className="w-40 h-40 mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Merci pour votre intérêt. Un conseiller analysera votre dossier et vous contactera sous 24h
          avec un devis personnalisé. <strong>Un email de confirmation vous a été envoyé.</strong>
        </p>
        <div className="bg-teal-50 rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <div className="text-sm text-muted-foreground mb-2">
            Prochaine étape
          </div>
          <div className="text-xl font-bold text-teal-600">
            Devis personnalisé par email
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Après analyse de votre dossier
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            Référence: <span className="font-mono font-semibold">{submitReference}</span>
          </p>
          <p className="mt-2">
            Documents reçus: {uploadedFiles.length} fichier(s)
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep > i + 1
                    ? "bg-teal-600 text-white"
                    : currentStep === i + 1
                    ? "bg-teal-600 text-white ring-4 ring-teal-200"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {currentStep > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden md:block w-12 lg:w-20 h-1 mx-2 rounded ${
                    currentStep > i + 1 ? "bg-teal-600" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Étape {currentStep}:</span>{" "}
          <span className="font-medium">{steps[currentStep - 1]}</span>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Badge className="text-lg px-4 py-2 bg-teal-600">
          Demande gratuite
        </Badge>
      </div>

      <Card className="p-6 md:p-8">
        {/* Step 1: Canton */}
        {currentStep === 1 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <AccountingIllustration className="w-32 h-32 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Comptabilité pour votre entreprise
                </h2>
                <p className="text-muted-foreground">
                  Dans quel canton votre entreprise est-elle située ?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cantons.map((c) => (
                <div
                  key={c.code}
                  onClick={() => updateForm("canton", c.code)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    formData.canton === c.code
                      ? "border-teal-600 bg-teal-50"
                      : "border-border hover:border-teal-300"
                  }`}
                >
                  <div className="text-center font-semibold">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Business Type */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Type d'entreprise</h2>
            <p className="text-muted-foreground mb-8">
              Quelle est la forme juridique de votre entreprise ?
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {businessTypes.map((t) => (
                <div
                  key={t.id}
                  onClick={() => updateForm("businessType", t.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                    formData.businessType === t.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-border hover:border-teal-300"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mb-4 mx-auto">
                    <t.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold mb-1">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Coordonnées de l'entreprise
            </h2>
            <p className="text-muted-foreground mb-8">
              Informations sur votre entreprise et personne de contact.
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Nom de l'entreprise *
                </label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => updateForm("companyName", e.target.value)}
                  placeholder="Ma Société Sàrl"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Activité principale
                </label>
                <Input
                  value={formData.activity}
                  onChange={(e) => updateForm("activity", e.target.value)}
                  placeholder="Consulting, commerce, services..."
                  className="rounded-xl"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Prénom du contact *
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    placeholder="Jean"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Nom du contact *
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    placeholder="Dupont"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="contact@entreprise.ch"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="+41 21 123 45 67"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Adresse
                </label>
                <Input
                  value={formData.street}
                  onChange={(e) => updateForm("street", e.target.value)}
                  placeholder="Rue du Commerce 10"
                  className="rounded-xl"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    NPA
                  </label>
                  <Input
                    value={formData.npa}
                    onChange={(e) => updateForm("npa", e.target.value)}
                    placeholder="1003"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Ville
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    placeholder="Lausanne"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Nombre d'employés
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.employeesCount || ""}
                    onChange={(e) =>
                      updateForm(
                        "employeesCount",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Chiffre d'affaires annuel estimé
                  </label>
                  <Input
                    value={formData.annualRevenue}
                    onChange={(e) =>
                      updateForm("annualRevenue", e.target.value)
                    }
                    placeholder="CHF 100'000.-"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                <input
                  type="checkbox"
                  id="isVatRegistered"
                  checked={formData.isVatRegistered}
                  onChange={(e) =>
                    updateForm("isVatRegistered", e.target.checked)
                  }
                  className="w-5 h-5"
                />
                <label htmlFor="isVatRegistered" className="cursor-pointer">
                  L'entreprise est assujettie à la TVA
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Services */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Services souhaités</h2>
            <p className="text-muted-foreground mb-8">
              Sélectionnez les services dont vous avez besoin.
            </p>
            <div className="space-y-4 mb-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.selectedServices.includes(service.id)
                      ? "border-teal-600 bg-teal-50"
                      : "border-border hover:border-teal-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.selectedServices.includes(service.id)
                          ? "bg-teal-600 border-teal-600"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.selectedServices.includes(service.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {service.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                Fréquence de facturation
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  onClick={() => updateForm("frequency", "monthly")}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${
                    formData.frequency === "monthly"
                      ? "border-teal-600 bg-teal-50"
                      : "border-border"
                  }`}
                >
                  <div className="font-medium">Mensuelle</div>
                  <div className="text-sm text-muted-foreground">
                    Facturation chaque mois
                  </div>
                </div>
                <div
                  onClick={() => updateForm("frequency", "annual")}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${
                    formData.frequency === "annual"
                      ? "border-teal-600 bg-teal-50"
                      : "border-border"
                  }`}
                >
                  <div className="font-medium">Annuelle (-10%)</div>
                  <div className="text-sm text-muted-foreground">
                    Facturation une fois par an
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-medium mb-2 block">
                Commentaires ou besoins spécifiques
              </label>
              <Textarea
                value={formData.comments}
                onChange={(e) => updateForm("comments", e.target.value)}
                className="rounded-xl"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 5: Documents */}
        {currentStep === 5 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-teal-100 flex items-center justify-center">
                <Upload className="w-12 h-12 text-teal-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Envoi de vos documents
                </h2>
                <p className="text-muted-foreground">
                  Téléchargez les documents nécessaires pour démarrer notre
                  collaboration.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Document categories */}
              <div className="md:col-span-1 space-y-2">
                {requiredDocuments.map((doc) => {
                  const filesCount = getFilesByCategory(doc.id).length;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setActiveCategory(doc.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        activeCategory === doc.id
                          ? "border-teal-600 bg-teal-50"
                          : "border-border hover:border-teal-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-teal-600" />
                          <div>
                            <div className="font-medium text-sm">
                              {doc.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {doc.description}
                            </div>
                          </div>
                        </div>
                        {filesCount > 0 && (
                          <Badge variant="secondary" className="bg-teal-600 text-white">
                            {filesCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upload area */}
              <div className="md:col-span-2">
                <div className="border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center mb-4 hover:border-teal-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  />
                  <Upload className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Glissez vos fichiers ici ou
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="rounded-full border-teal-600 text-teal-600 hover:bg-teal-50"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Parcourir les fichiers
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Formats acceptés: PDF, JPG, PNG, DOC, XLS (max 10 MB par
                    fichier)
                  </p>
                </div>

                {/* Uploaded files for active category */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Fichiers pour:{" "}
                    {requiredDocuments.find((d) => d.id === activeCategory)?.name}
                  </h4>
                  {getFilesByCategory(activeCategory).length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                      Aucun fichier téléchargé
                    </p>
                  ) : (
                    getFilesByCategory(activeCategory).map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-teal-600" />
                          <div>
                            <div className="font-medium text-sm">
                              {file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                {/* Total files */}
                <div className="mt-6 p-4 bg-teal-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total des documents</span>
                    <Badge className="bg-teal-600">
                      {uploadedFiles.length} fichier(s)
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4 italic">
                  Vous pourrez envoyer des documents supplémentaires par email
                  après validation de votre demande.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Certification */}
        {currentStep === 6 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-amber-500/10 flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Certification et responsabilité
                </h2>
                <p className="text-muted-foreground">
                  Veuillez lire attentivement et accepter les conditions
                  suivantes avant de finaliser votre demande.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Warning notice */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">
                      Information importante
                    </h3>
                    <p className="text-sm text-amber-700">
                      NeoFidu établit votre comptabilité sur la base des
                      informations et documents que vous nous transmettez.
                      Il est de votre responsabilité de vous assurer que ces
                      éléments sont complets, exacts et conformes à la réalité
                      de votre activité.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certification checkboxes */}
              <div className="space-y-4">
                <div
                  className={`p-6 border-2 rounded-2xl transition-all ${
                    formData.certifyAccuracy
                      ? "border-teal-600 bg-teal-50"
                      : "border-border"
                  }`}
                >
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.certifyAccuracy}
                      onChange={(e) =>
                        updateForm("certifyAccuracy", e.target.checked)
                      }
                      className="w-6 h-6 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold mb-2">
                        Exactitude des informations
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Je certifie que toutes les informations et documents que
                        j'ai transmis à NeoFidu sont exacts, complets et
                        reflètent fidèlement la situation financière de mon
                        entreprise. Je comprends que NeoFidu ne peut vérifier
                        l'authenticité ni l'exhaustivité des documents fournis.
                      </p>
                    </div>
                  </label>
                </div>

                <div
                  className={`p-6 border-2 rounded-2xl transition-all ${
                    formData.certifyResponsibility
                      ? "border-teal-600 bg-teal-50"
                      : "border-border"
                  }`}
                >
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.certifyResponsibility}
                      onChange={(e) =>
                        updateForm("certifyResponsibility", e.target.checked)
                      }
                      className="w-6 h-6 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold mb-2">
                        Clause de responsabilité
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Je reconnais et accepte que NeoFidu ne pourra en aucun
                        cas être tenu responsable de toute conséquence juridique,
                        administrative ou pénale résultant d'informations
                        inexactes, incomplètes ou frauduleuses que j'aurais
                        transmises. En cas de litige avec les autorités fiscales
                        ou judiciaires découlant de telles informations,
                        j'assume l'entière responsabilité.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Legal summary */}
              <div className="bg-secondary/50 rounded-2xl p-6">
                <h4 className="font-semibold mb-3">
                  Résumé de vos engagements
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        formData.certifyAccuracy
                          ? "text-teal-600"
                          : "text-gray-300"
                      }`}
                    />
                    <span>
                      Mes documents et informations sont exacts et complets
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        formData.certifyResponsibility
                          ? "text-teal-600"
                          : "text-gray-300"
                      }`}
                    />
                    <span>
                      J'assume la responsabilité en cas d'informations erronées
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        formData.certifyAccuracy && formData.certifyResponsibility
                          ? "text-teal-600"
                          : "text-gray-300"
                      }`}
                    />
                    <span>
                      NeoFidu est dégagé de toute responsabilité juridique liée à
                      mes données
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Summary & Contact */}
        {currentStep === 7 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <PaymentIllustration className="w-32 h-32 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Récapitulatif et envoi
                </h2>
                <p className="text-muted-foreground">
                  Vérifiez votre demande avant de l'envoyer.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Canton</div>
                  <div className="font-semibold">
                    {cantons.find((c) => c.code === formData.canton)?.name}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-semibold">
                    {businessTypes.find((t) => t.id === formData.businessType)
                      ?.name}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">
                    Entreprise
                  </div>
                  <div className="font-semibold">{formData.companyName}</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Contact</div>
                  <div className="font-semibold">
                    {formData.firstName} {formData.lastName}
                  </div>
                  <div className="text-sm">{formData.email}</div>
                </div>
              </div>
              <div>
                <div className="p-4 bg-secondary/50 rounded-xl mb-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Services sélectionnés
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedServices.map((id) => {
                      const s = services.find((sv) => sv.id === id);
                      return s ? (
                        <Badge key={id} variant="secondary">
                          {s.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl mb-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    Documents envoyés
                  </div>
                  <div className="font-semibold">
                    {uploadedFiles.length} fichier(s)
                  </div>
                </div>
                <div className="p-6 bg-teal-50 border-2 border-teal-200 rounded-2xl text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    Tarification
                  </div>
                  <div className="text-xl font-bold text-teal-600">
                    Devis personnalisé
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Le prix sera communiqué par email après analyse de votre dossier
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 bg-secondary/20">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-teal-600" />
                <span className="font-semibold">
                  Cette demande est gratuite et sans engagement
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Nous vous enverrons un devis détaillé sous 24h. Le paiement ne
                sera demandé qu'après validation de votre part.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="rounded-full bg-teal-600 hover:bg-teal-700"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-full bg-teal-600 hover:bg-teal-700"
            >
              {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
              <Check className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
