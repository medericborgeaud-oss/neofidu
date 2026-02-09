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
  Users,
  Briefcase,
  CreditCard,
  Lock,
  Upload,
  FileText,
  X,
  Paperclip,
  ShieldCheck,
  AlertTriangle,
  Smartphone,
  Plus,
  Trash2,
  Pencil,
  Info,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TaxIllustration,
  CantonIllustration,
  SuccessIllustration,
  PaymentIllustration,
} from "@/components/Illustrations";
import { StripePaymentForm } from "@/components/StripePaymentForm";

const cantons = [
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "GE", name: "Genève" },
  { code: "NE", name: "Neuchâtel" },
  { code: "JU", name: "Jura" },
  { code: "FR", name: "Fribourg" },
];

const clientTypes = [
  { id: "private", name: "Client privé", icon: User, description: "Salarié, retraité, étudiant" },
  { id: "independent", name: "Indépendant", icon: Briefcase, description: "Travailleur indépendant" },
  { id: "couple", name: "Couple", icon: Users, description: "Couple marié" },
];

const transportModes = [
  { id: "train", name: "Transports publics", description: "Train, bus, tram" },
  { id: "car", name: "Voiture", description: "Véhicule personnel" },
  { id: "bike", name: "Vélo / À pied", description: "Non déductible" },
  { id: "none", name: "Pas de trajet", description: "Télétravail complet" },
];

// Les statuts d'emploi pour les clients privés
const employmentStatuses = [
  { id: "employed", name: "Salarié(e)", description: "Employé à temps plein ou partiel" },
  { id: "retired", name: "Retraité(e)", description: "AVS, AI, ou autre rente" },
  { id: "unemployed", name: "Au chômage", description: "Inscrit au chômage" },
];

// Les catégories de documents avec tooltips explicatifs
const documentCategories = [
  { id: "salary", name: "Certificat(s) de salaire", description: "De tous les employeurs", tooltip: "Document fourni par votre employeur indiquant votre salaire brut, les cotisations sociales et les impôts prélevés à la source." },
  { id: "pension", name: "Attestation de rente", description: "AVS, AI, LPP, etc.", tooltip: "Attestations de toutes vos rentes : AVS, AI, 2ème pilier (LPP), rentes étrangères, etc." },
  { id: "unemployment", name: "Attestation de chômage", description: "Indemnités chômage reçues", tooltip: "Attestation de l'office régional de placement (ORP) indiquant les indemnités chômage perçues durant l'année." },
  { id: "business", name: "Comptes résultats et bilan", description: "Pour indépendants", tooltip: "États financiers complets de votre activité indépendante : compte de résultat, bilan, et annexes." },
  { id: "bank", name: "Relevés bancaires au 31.12", description: "Tous vos comptes", tooltip: "Relevés de tous vos comptes bancaires et postaux montrant le solde au 31 décembre et les intérêts perçus." },
  { id: "stocks", name: "Relevés de titres au 31.12", description: "Actions, fonds, obligations", tooltip: "Relevé de dépôt de votre banque indiquant la valeur fiscale de vos titres au 31 décembre." },
  { id: "insurance", name: "Attestation primes maladie", description: "Primes LAMal payées", tooltip: "Attestation de votre caisse maladie indiquant le total des primes d'assurance obligatoire (LAMal) payées." },
  { id: "pillar3a", name: "Attestation pilier 3a", description: "Versements effectués", tooltip: "Attestation de votre banque ou assurance confirmant les versements effectués sur votre compte 3ème pilier A." },
  { id: "guard", name: "Frais de garde d'enfants", description: "Crèche, UAPE, maman de jour, cantine, camps", tooltip: "Factures et attestations des frais de garde : crèche, UAPE, maman de jour, cantine scolaire, camps de vacances." },
  { id: "alimonyReceived", name: "Pensions alimentaires reçues", description: "Contributions d'entretien", tooltip: "Justificatifs des pensions alimentaires reçues pour vous-même ou vos enfants (extraits bancaires, jugement de divorce)." },
  { id: "alimonyPaid", name: "Pensions alimentaires versées", description: "Contributions versées", tooltip: "Justificatifs des pensions alimentaires versées à votre ex-conjoint ou pour vos enfants (extraits bancaires, jugement)." },
  { id: "debts", name: "Attestation de dettes", description: "Prêts personnels, leasing", tooltip: "Attestations de vos créanciers indiquant le solde de vos dettes au 31 décembre et les intérêts payés." },
  { id: "mortgage", name: "Attestation hypothécaire", description: "Intérêts, amortissements", tooltip: "Attestation de votre banque indiquant le solde de l'hypothèque, les intérêts payés et les amortissements." },
  { id: "renovations", name: "Factures gros travaux", description: "Rénovations, entretien", tooltip: "Factures des travaux d'entretien et de rénovation de votre bien immobilier (seuls les travaux d'entretien sont déductibles)." },
  { id: "property", name: "Documents immobiliers", description: "Charges, PPE, etc.", tooltip: "Décompte de charges de copropriété, attestations de frais d'entretien, etc." },
  { id: "donations", name: "Attestations de dons", description: "Organisations d'utilité publique", tooltip: "Attestations de dons à des organisations reconnues d'utilité publique (associations, fondations, églises, partis politiques)." },
  { id: "other", name: "Autres justificatifs", description: "Frais professionnels, etc.", tooltip: "Justificatifs de frais professionnels, cotisations syndicales, formations, etc." },
];

const steps = [
  "Canton",
  "Profil",
  "Coordonnées",
  "Situation",
  "Immobilier",
  "Options",
  "Documents",
  "Certification",
  "Paiement",
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  category: string;
  file: File; // Le fichier réel pour l'upload
  url?: string; // URL après upload vers Cloudinary
}

interface Workplace {
  id: string;
  employerName: string;
  transportMode: string;
  workplaceAddress: string;
  daysPerYear: string;
  distanceKm: string;
  employerReimbursement: boolean;
  reimbursementAmount: string;
  reimbursementType: "full" | "partial" | "none";
}

const createEmptyWorkplace = (): Workplace => ({
  id: Math.random().toString(36).substr(2, 9),
  employerName: "",
  transportMode: "",
  workplaceAddress: "",
  daysPerYear: "",
  distanceKm: "",
  employerReimbursement: false,
  reimbursementAmount: "",
  reimbursementType: "none",
});

// Clé pour localStorage
const STORAGE_KEY = "neofidu_tax_request_form";

// Fonction pour charger les données depuis localStorage
function loadFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Erreur chargement localStorage:", e);
  }
  return null;
}

// Fonction pour sauvegarder dans localStorage
function saveToStorage(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erreur sauvegarde localStorage:", e);
  }
}

// Fonction pour effacer localStorage
function clearStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Erreur suppression localStorage:", e);
  }
}

export function TaxRequestForm() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("bank");

  // Référence de la demande créée dans le backend
  const [taxRequestReference, setTaxRequestReference] = useState<string>("");
  const [isSavingRequest, setIsSavingRequest] = useState(false);

  // Workplaces for adult 1 and adult 2 (spouse)
  const [workplaces1, setWorkplaces1] = useState<Workplace[]>([createEmptyWorkplace()]);
  const [workplaces2, setWorkplaces2] = useState<Workplace[]>([createEmptyWorkplace()]);

  const [formData, setFormData] = useState({
    canton: "",
    clientType: "",
    // Statut d'emploi (pour clients privés non indépendants)
    employmentStatus: "" as "" | "employed" | "retired" | "unemployed",
    // Second adulte pour couple
    employmentStatus2: "" as "" | "employed" | "retired" | "unemployed",
    firstName: "",
    lastName: "",
    firstName2: "",
    lastName2: "",
    email: "",
    phone: "",
    // Numéros fiscaux (de la lettre de l'administration)
    taxYear: new Date().getFullYear() - 1, // Année fiscale (année précédente par défaut)
    taxpayerNumber: "",
    declarationCode: "",
    street: "",
    npa: "",
    city: "",
    hasMoved: false,
    hasChildren: false,
    childrenCount: 0,
    childrenInfo: "",
    // Frais de garde
    hasGuardCosts: false,
    guardCosts: "",
    // Pensions alimentaires
    hasAlimonyReceived: false,
    alimonyReceived: "",
    hasAlimonyPaid: false,
    alimonyPaid: "",
    monthlyRent: "",
    healthInsurance: "",
    // 3ème pilier
    hasPillar3a: false,
    pillar3aAmount: "",
    // Dons à des organisations d'utilité publique
    hasDonations: false,
    donationsAmount: "",
    // Dettes et prêts
    hasDebts: false,
    debtsAmount: "",
    // Removed commute1/2 fields, replaced by workplaces1/2 arrays
    hasProperty: false,
    propertyCount: 1,
    // Hypothèque (lié à la propriété)
    hasMortgage: false,
    mortgageAmount: "",
    // Gros travaux (pour propriétaires)
    hasRenovations: false,
    renovationsAmount: "",
    hasStocks: false,
    stocksCount: 1,
    deliveryMethod: "email",
    wantsReview: false,
    deadline: "standard",
    comments: "",
    certifyAccuracy: false,
    certifyResponsibility: false,
    paymentMethod: "card",
  });

  // Charger les données sauvegardées au montage du composant
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.currentStep) setCurrentStep(saved.currentStep);
      if (saved.formData) setFormData(prev => ({ ...prev, ...saved.formData }));
      if (saved.workplaces1) setWorkplaces1(saved.workplaces1);
      if (saved.workplaces2) setWorkplaces2(saved.workplaces2);
      if (saved.activeCategory) setActiveCategory(saved.activeCategory);
      if (saved.taxRequestReference) setTaxRequestReference(saved.taxRequestReference);
      // Note: Les fichiers uploadés ne peuvent pas être restaurés depuis localStorage
      // car les objets File ne sont pas sérialisables. Le client devra re-uploader.
      if (saved.uploadedFilesMetadata) {
        // On garde juste les métadonnées pour afficher ce qui a été uploadé
        console.log("Fichiers précédemment uploadés:", saved.uploadedFilesMetadata);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder les données à chaque changement
  useEffect(() => {
    if (!isLoaded) return; // Ne pas sauvegarder avant le chargement initial
    if (isSubmitted) {
      // Effacer le localStorage après soumission réussie
      clearStorage();
      return;
    }

    const dataToSave = {
      currentStep,
      formData,
      workplaces1,
      workplaces2,
      activeCategory,
      taxRequestReference,
      // Sauvegarder les métadonnées des fichiers (pas les fichiers eux-mêmes)
      uploadedFilesMetadata: uploadedFiles.map(f => ({
        id: f.id,
        name: f.name,
        size: f.size,
        category: f.category,
        url: f.url,
      })),
      savedAt: new Date().toISOString(),
    };

    saveToStorage(dataToSave);
  }, [currentStep, formData, workplaces1, workplaces2, activeCategory, taxRequestReference, uploadedFiles, isLoaded, isSubmitted]);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const updateForm = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Workplace management functions
  const addWorkplace = (adult: 1 | 2) => {
    if (adult === 1) {
      setWorkplaces1((prev) => [...prev, createEmptyWorkplace()]);
    } else {
      setWorkplaces2((prev) => [...prev, createEmptyWorkplace()]);
    }
  };

  const removeWorkplace = (adult: 1 | 2, workplaceId: string) => {
    if (adult === 1) {
      setWorkplaces1((prev) => prev.filter((w) => w.id !== workplaceId));
    } else {
      setWorkplaces2((prev) => prev.filter((w) => w.id !== workplaceId));
    }
  };

  const updateWorkplace = (adult: 1 | 2, workplaceId: string, field: keyof Workplace, value: string | boolean) => {
    const setter = adult === 1 ? setWorkplaces1 : setWorkplaces2;
    setter((prev) =>
      prev.map((w) =>
        w.id === workplaceId ? { ...w, [field]: value } : w
      )
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        category: activeCategory,
        file: file, // Stocker le fichier pour l'upload ultérieur
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

  const getFilesByCategory = (category: string) => {
    return uploadedFiles.filter((f) => f.category === category);
  };

  // Génère la liste des documents avec leur statut obligatoire basé sur le profil
  // Helper function to get tooltip from documentCategories
  const getDocumentTooltip = (docId: string): string => {
    const category = documentCategories.find(c => c.id === docId);
    return category?.tooltip || "";
  };

  const getDocumentsWithStatus = () => {
    const docs: { id: string; name: string; description: string; required: boolean; reason?: string; tooltip?: string }[] = [];

    // === DOCUMENTS LIÉS AU STATUT D'EMPLOI ===
    if (formData.clientType === "independent") {
      // Indépendants: comptes résultats et bilan obligatoires
      docs.push({
        id: "business",
        name: "Comptes résultats et bilan",
        description: "Pour indépendants",
        required: true,
        reason: "Obligatoire pour les indépendants",
        tooltip: getDocumentTooltip("business")
      });
    } else {
      // Clients privés ou couples - selon leur statut d'emploi
      const hasEmployed = formData.employmentStatus === "employed" ||
        (formData.clientType === "couple" && formData.employmentStatus2 === "employed");
      const hasRetired = formData.employmentStatus === "retired" ||
        (formData.clientType === "couple" && formData.employmentStatus2 === "retired");
      const hasUnemployed = formData.employmentStatus === "unemployed" ||
        (formData.clientType === "couple" && formData.employmentStatus2 === "unemployed");

      if (hasEmployed) {
        docs.push({
          id: "salary",
          name: "Certificat(s) de salaire",
          description: "De tous les employeurs",
          required: true,
          reason: "Obligatoire pour les salariés",
          tooltip: getDocumentTooltip("salary")
        });
      }
      if (hasRetired) {
        docs.push({
          id: "pension",
          name: "Attestation de rente",
          description: "AVS, AI, LPP, etc.",
          required: true,
          reason: "Obligatoire pour les retraités",
          tooltip: getDocumentTooltip("pension")
        });
      }
      if (hasUnemployed) {
        docs.push({
          id: "unemployment",
          name: "Attestation de chômage",
          description: "Indemnités chômage reçues",
          required: true,
          reason: "Obligatoire pour les chômeurs",
          tooltip: getDocumentTooltip("unemployment")
        });
      }
    }

    // === DOCUMENTS BANCAIRES (toujours obligatoires) ===
    docs.push({
      id: "bank",
      name: "Relevés bancaires au 31.12",
      description: "Tous vos comptes",
      required: true,
      reason: "Obligatoire pour tous",
      tooltip: getDocumentTooltip("bank")
    });

    // === ATTESTATION PRIMES MALADIE (toujours obligatoire) ===
    docs.push({
      id: "insurance",
      name: "Attestation primes maladie",
      description: "Primes LAMal payées",
      required: true,
      reason: "Obligatoire pour tous",
      tooltip: getDocumentTooltip("insurance")
    });

    // === RELEVÉS DE TITRES (si actions/fonds) ===
    if (formData.hasStocks) {
      docs.push({
        id: "stocks",
        name: "Relevés de titres au 31.12",
        description: "Actions, fonds, obligations",
        required: true,
        reason: "Obligatoire car vous avez déclaré des actions/fonds",
        tooltip: getDocumentTooltip("stocks")
      });
    }

    // === 3ÈME PILIER (si versements) ===
    if (formData.hasPillar3a) {
      docs.push({
        id: "pillar3a",
        name: "Attestation pilier 3a",
        description: "Versements effectués",
        required: true,
        reason: "Obligatoire car vous avez déclaré des versements",
        tooltip: getDocumentTooltip("pillar3a")
      });
    }

    // === FRAIS DE GARDE (si enfants + frais de garde) ===
    if (formData.hasChildren && formData.hasGuardCosts) {
      docs.push({
        id: "guard",
        name: "Frais de garde d'enfants",
        description: "Crèche, UAPE, maman de jour, cantine, camps",
        required: true,
        reason: "Obligatoire car vous avez déclaré des frais de garde",
        tooltip: getDocumentTooltip("guard")
      });
    }

    // === PENSIONS ALIMENTAIRES REÇUES ===
    if (formData.hasAlimonyReceived) {
      docs.push({
        id: "alimonyReceived",
        name: "Pensions alimentaires reçues",
        description: "Contributions d'entretien",
        required: true,
        reason: "Obligatoire car vous avez déclaré recevoir des pensions",
        tooltip: getDocumentTooltip("alimonyReceived")
      });
    }

    // === PENSIONS ALIMENTAIRES VERSÉES ===
    if (formData.hasAlimonyPaid) {
      docs.push({
        id: "alimonyPaid",
        name: "Pensions alimentaires versées",
        description: "Contributions versées",
        required: true,
        reason: "Obligatoire car vous avez déclaré verser des pensions",
        tooltip: getDocumentTooltip("alimonyPaid")
      });
    }

    // === DONS (si déclarés) ===
    if (formData.hasDonations) {
      docs.push({
        id: "donations",
        name: "Attestations de dons",
        description: "Organisations d'utilité publique",
        required: true,
        reason: "Obligatoire car vous avez déclaré des dons",
        tooltip: getDocumentTooltip("donations")
      });
    }

    // === DETTES (si déclarées) ===
    if (formData.hasDebts) {
      docs.push({
        id: "debts",
        name: "Attestation de dettes",
        description: "Prêts personnels, leasing",
        required: true,
        reason: "Obligatoire car vous avez déclaré des dettes",
        tooltip: getDocumentTooltip("debts")
      });
    }

    // === DOCUMENTS IMMOBILIERS ===
    if (formData.hasProperty) {
      // Hypothèque
      if (formData.hasMortgage) {
        docs.push({
          id: "mortgage",
          name: "Attestation hypothécaire",
          description: "Intérêts, amortissements",
          required: true,
          reason: "Obligatoire car vous avez déclaré une hypothèque",
          tooltip: getDocumentTooltip("mortgage")
        });
      }
      // Gros travaux
      if (formData.hasRenovations) {
        docs.push({
          id: "renovations",
          name: "Factures gros travaux",
          description: "Rénovations, entretien",
          required: true,
          reason: "Obligatoire car vous avez déclaré des travaux",
          tooltip: getDocumentTooltip("renovations")
        });
      }
      // Documents immobiliers généraux
      docs.push({
        id: "property",
        name: "Documents immobiliers",
        description: "Charges, PPE, etc.",
        required: false,
        reason: "Recommandé pour les propriétaires",
        tooltip: getDocumentTooltip("property")
      });
    }

    // === AUTRES DOCUMENTS (optionnels) ===
    docs.push({
      id: "other",
      name: "Autres justificatifs",
      description: "Dons, frais professionnels, etc.",
      required: false,
      tooltip: getDocumentTooltip("other")
    });

    return docs;
  };

  // Vérifie si tous les documents obligatoires ont été téléchargés
  const allRequiredDocumentsUploaded = () => {
    const requiredDocs = getDocumentsWithStatus().filter(d => d.required);
    return requiredDocs.every(doc => getFilesByCategory(doc.id).length > 0);
  };

  // Compte les documents obligatoires manquants
  const getMissingRequiredDocuments = () => {
    const requiredDocs = getDocumentsWithStatus().filter(d => d.required);
    return requiredDocs.filter(doc => getFilesByCategory(doc.id).length === 0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const TVA_RATE = 0.081; // TVA suisse 8.1%

  // Tous les prix sont TTC (chiffres ronds)
  const calculatePrice = () => {
    let price = 50; // Prix de base TTC
    if (formData.clientType === "couple") price += 20;
    if (formData.clientType === "independent") price += 40;
    if (formData.hasChildren) price += 10 * formData.childrenCount;
    if (formData.hasProperty) price += 50 * formData.propertyCount;
    if (formData.hasStocks && formData.stocksCount > 5) price += 20;
    if (formData.deliveryMethod === "post") price += 20;
    if (formData.wantsReview) price += 30;
    if (formData.deadline === "extended") price += 20;
    if (formData.deadline === "express") price += 120;
    return price;
  };

  // Calcul du HT à partir du TTC
  const calculatePriceHT = () => {
    return Math.round((calculatePrice() / (1 + TVA_RATE)) * 100) / 100;
  };

  const calculateTVA = () => {
    return Math.round((calculatePrice() - calculatePriceHT()) * 100) / 100;
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.canton !== "";
    if (currentStep === 2) return formData.clientType !== "";
    if (currentStep === 3) {
      const taxpayerNumberValid = /^[\d.\-]{5,20}$/.test(formData.taxpayerNumber);
      const declarationCodeValid = formData.declarationCode.length >= 4;
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.taxpayerNumber &&
        taxpayerNumberValid &&
        formData.declarationCode &&
        declarationCodeValid &&
        formData.street &&
        formData.npa &&
        formData.city
      );
    }
    if (currentStep === 4) {
      // Statut d'emploi obligatoire pour les non-indépendants
      if (formData.clientType !== "independent") {
        if (!formData.employmentStatus) return false;
        // Pour les couples, le second adulte doit aussi avoir un statut
        if (formData.clientType === "couple" && !formData.employmentStatus2) return false;
      }
      // At least one workplace for adult 1 must have a transport mode selected
      const adult1HasTransport = workplaces1.some((wp) => wp.transportMode !== "");
      // For couples, adult 2 must also have at least one transport mode selected
      if (formData.clientType === "couple") {
        const adult2HasTransport = workplaces2.some((wp) => wp.transportMode !== "");
        return adult1HasTransport && adult2HasTransport;
      }
      return adult1HasTransport;
    }
    if (currentStep === 7) {
      // Si envoi par courrier postal, pas besoin de documents uploadés
      if (formData.deliveryMethod === "post") {
        return true;
      }
      // Sinon, tous les documents obligatoires doivent être téléchargés
      return allRequiredDocumentsUploaded();
    }
    if (currentStep === 8)
      return formData.certifyAccuracy && formData.certifyResponsibility;
    return true;
  };

  // Sauvegarder la demande dans le backend avant paiement
  // NOTE: Les documents ne sont PAS uploadés ici - seulement après paiement réussi
  const saveTaxRequest = async () => {
    if (taxRequestReference) return taxRequestReference; // Déjà sauvegardée

    setIsSavingRequest(true);
    try {
      // Préparer la liste des documents (métadonnées seulement, pas d'upload)
      // L'upload vers Cloudinary se fera APRÈS le paiement réussi
      const pendingDocuments = uploadedFiles.map(f => ({
        category: f.category,
        name: f.name,
        // Pas d'URL - sera ajoutée après upload post-paiement
      }));

      // Préparer toutes les données du formulaire
      const allWorkplaces = [
        ...workplaces1.map(w => ({ ...w, adult: 1 })),
        ...(formData.clientType === "couple" ? workplaces2.map(w => ({ ...w, adult: 2 })) : []),
      ];

      const requestData = {
        // Paiement
        amount: calculatePrice(),
        currency: "CHF",
        paymentMethod: formData.paymentMethod,
        // Client
        firstName: formData.firstName,
        lastName: formData.lastName,
        firstName2: formData.clientType === "couple" ? formData.firstName2 : undefined,
        lastName2: formData.clientType === "couple" ? formData.lastName2 : undefined,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        npa: formData.npa,
        city: formData.city,
        // Fiscal
        canton: formData.canton,
        cantonName: cantons.find(c => c.code === formData.canton)?.name || formData.canton,
        cantonCode: formData.canton,
        taxYear: formData.taxYear,
        taxpayerNumber: formData.taxpayerNumber,
        declarationCode: formData.declarationCode,
        clientType: formData.clientType,
        employmentStatus: formData.employmentStatus,
        employmentStatus2: formData.clientType === "couple" ? formData.employmentStatus2 : undefined,
        // Situation
        hasMoved: formData.hasMoved,
        hasChildren: formData.hasChildren,
        childrenCount: formData.childrenCount,
        monthlyRent: formData.monthlyRent,
        // Financial
        hasPillar3a: formData.hasPillar3a,
        pillar3aAmount: formData.pillar3aAmount,
        hasStocks: formData.hasStocks,
        stocksCount: formData.stocksCount,
        hasGuardCosts: formData.hasGuardCosts,
        guardCosts: formData.guardCosts,
        hasAlimonyReceived: formData.hasAlimonyReceived,
        alimonyReceived: formData.alimonyReceived,
        hasAlimonyPaid: formData.hasAlimonyPaid,
        alimonyPaid: formData.alimonyPaid,
        hasDonations: formData.hasDonations,
        donationsAmount: formData.donationsAmount,
        hasDebts: formData.hasDebts,
        debtsAmount: formData.debtsAmount,
        // Property
        hasProperty: formData.hasProperty,
        propertyCount: formData.propertyCount,
        hasMortgage: formData.hasMortgage,
        mortgageAmount: formData.mortgageAmount,
        hasRenovations: formData.hasRenovations,
        renovationsAmount: formData.renovationsAmount,
        // Workplaces
        workplaces: allWorkplaces,
        // Options
        deliveryMethod: formData.deliveryMethod,
        wantsReview: formData.wantsReview,
        deadline: formData.deadline,
        comments: formData.comments,
        // Documents (métadonnées seulement - upload après paiement)
        documents: pendingDocuments,
      };

      // Sauvegarder la demande (documents seront uploadés après paiement)
      const response = await fetch("/api/tax-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success && data.reference) {
        setTaxRequestReference(data.reference);
        console.log("📋 Demande fiscale sauvegardée:", data.reference, "| Storage:", data.storage);
        if (data.warning) {
          console.warn("⚠️", data.warning);
        }
        return data.reference;
      } else {
        console.error("Erreur sauvegarde demande:", data.error);
        return null;
      }
    } catch (error) {
      console.error("Exception sauvegarde demande:", error);
      return null;
    } finally {
      setIsSavingRequest(false);
    }
  };

  const nextStep = async () => {
    if (currentStep < steps.length) {
      // Si on passe à l'étape de paiement (step 9), sauvegarder d'abord
      if (currentStep === 8) {
        await saveTaxRequest();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () =>
    currentStep > 1 && setCurrentStep(currentStep - 1);

  // État pour le traitement post-paiement
  const [isProcessingPostPayment, setIsProcessingPostPayment] = useState(false);
  const [postPaymentStatus, setPostPaymentStatus] = useState<string>("");

  // Fonction appelée APRÈS le paiement réussi
  // C'est ici que les documents sont uploadés vers Cloudinary
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log("✅ Paiement réussi:", paymentIntentId);
    setIsProcessingPostPayment(true);
    setPostPaymentStatus("Finalisation de votre demande...");

    try {
      // 1. Upload des documents vers Cloudinary (maintenant que le paiement est confirmé)
      if (uploadedFiles.length > 0 && taxRequestReference) {
        setPostPaymentStatus(`Upload de ${uploadedFiles.length} document(s)...`);
        console.log(`📤 Upload de ${uploadedFiles.length} document(s) vers Cloudinary...`);

        const formDataUpload = new FormData();
        formDataUpload.append("reference", taxRequestReference);
        formDataUpload.append("lastName", formData.lastName);
        formDataUpload.append("firstName", formData.firstName);

        uploadedFiles.forEach((file) => {
          formDataUpload.append("files", file.file);
          formDataUpload.append("categories", file.category);
        });

        try {
          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formDataUpload,
          });

          const uploadResult = await uploadResponse.json();

          if (uploadResult.success) {
            console.log(`✅ Documents uploadés avec succès`);
          } else {
            console.warn("⚠️ Upload partiel ou échoué:", uploadResult);
          }
        } catch (uploadError) {
          console.error("❌ Erreur upload documents:", uploadError);
          // Continue malgré l'erreur - le paiement est déjà confirmé
        }
      }

      // 2. Marquer la demande comme terminée
      setPostPaymentStatus("Envoi des confirmations...");

      // Effacer le localStorage après succès
      clearStorage();

      // 3. Afficher la confirmation
      setIsSubmitted(true);

    } catch (error) {
      console.error("Erreur post-paiement:", error);
      // Même en cas d'erreur, le paiement est fait, donc on affiche la confirmation
      setIsSubmitted(true);
    } finally {
      setIsProcessingPostPayment(false);
    }
  };

  // Note: handleSubmit is now only called after successful Stripe payment
  // The actual payment is handled by the StripePaymentForm component's onSuccess callback
  const handleSubmit = () => {
    // This function should not be called directly from UI
    // Payment must be completed through Stripe first
    console.warn("handleSubmit called - payment should be verified via Stripe");
  };

  // Écran de traitement post-paiement
  if (isProcessingPostPayment) {
    return (
      <Card className="p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Paiement confirmé !
        </h2>
        <p className="text-muted-foreground mb-4">
          {postPaymentStatus}
        </p>
        <p className="text-sm text-muted-foreground">
          Veuillez ne pas fermer cette page...
        </p>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="p-8 md:p-12 text-center">
        <SuccessIllustration className="w-40 h-40 mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Demande enregistrée !
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Merci pour votre confiance. Vous recevrez un email de confirmation sous peu.
        </p>
        <div className="bg-primary/5 rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <div className="text-sm text-muted-foreground mb-2">Montant payé (TTC)</div>
          <div className="text-4xl font-bold text-primary">
            CHF {calculatePrice()}.
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            dont CHF {calculateTVA().toFixed(2)} de TVA (8.1%)
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-mono text-lg text-primary font-bold">
            Référence: {taxRequestReference || "NF-XXXXXXXX"}
          </p>
          <p className="mt-4">
            Documents envoyés: {uploadedFiles.length} fichier(s)
          </p>
          <p className="mt-2">
            Un conseiller vous contactera dans les 24h ouvrables.
          </p>
        </div>
      </Card>
    );
  }

  // Afficher un loader pendant le chargement depuis localStorage
  if (!isLoaded) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </Card>
    );
  }

  // Fonction pour recommencer le formulaire
  const handleResetForm = () => {
    if (confirm("Êtes-vous sûr de vouloir recommencer ? Toutes vos données seront effacées.")) {
      clearStorage();
      setCurrentStep(1);
      setFormData({
        canton: "",
        clientType: "",
        employmentStatus: "",
        employmentStatus2: "",
        firstName: "",
        lastName: "",
        firstName2: "",
        lastName2: "",
        email: "",
        phone: "",
        taxYear: new Date().getFullYear() - 1,
        taxpayerNumber: "",
        declarationCode: "",
        street: "",
        npa: "",
        city: "",
        hasMoved: false,
        hasChildren: false,
        childrenCount: 0,
        childrenInfo: "",
        hasGuardCosts: false,
        guardCosts: "",
        hasAlimonyReceived: false,
        alimonyReceived: "",
        hasAlimonyPaid: false,
        alimonyPaid: "",
        monthlyRent: "",
        healthInsurance: "",
        hasPillar3a: false,
        pillar3aAmount: "",
        hasDonations: false,
        donationsAmount: "",
        hasDebts: false,
        debtsAmount: "",
        hasProperty: false,
        propertyCount: 1,
        hasMortgage: false,
        mortgageAmount: "",
        hasRenovations: false,
        renovationsAmount: "",
        hasStocks: false,
        stocksCount: 1,
        deliveryMethod: "email",
        wantsReview: false,
        deadline: "standard",
        comments: "",
        certifyAccuracy: false,
        certifyResponsibility: false,
        paymentMethod: "card",
      });
      setWorkplaces1([createEmptyWorkplace()]);
      setWorkplaces2([createEmptyWorkplace()]);
      setUploadedFiles([]);
      setTaxRequestReference("");
    }
  };

  return (
    <div>
      {currentStep > 1 && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Reprise de votre demande</p>
              <p className="text-xs text-muted-foreground">
                Vous avez repris là où vous en étiez. Vos données sont sauvegardées automatiquement.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetForm}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4 mr-1" />
            Recommencer
          </Button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold ${
                  currentStep > i + 1
                    ? "bg-primary text-white"
                    : currentStep === i + 1
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {currentStep > i + 1 ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden md:block w-4 lg:w-8 h-1 mx-1 rounded ${
                    currentStep > i + 1 ? "bg-primary" : "bg-secondary"
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
        <Badge variant="secondary" className="text-lg px-4 py-2">
          CHF {calculatePrice().toFixed(2)} TTC
        </Badge>
      </div>

      <Card className="p-6 md:p-8">
        {/* Step 1: Canton */}
        {currentStep === 1 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <CantonIllustration className="w-24 h-24 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Établissement de votre déclaration d'impôt
                </h2>
                <p className="text-muted-foreground">
                  Dans quel canton la déclaration doit-elle être établie ?
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
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="text-center font-semibold">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Client Type */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Quel type de client êtes-vous ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Sélectionnez votre situation personnelle.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {clientTypes.map((t) => (
                <div
                  key={t.id}
                  onClick={() => updateForm("clientType", t.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                    formData.clientType === t.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <t.icon className="w-8 h-8 text-primary" />
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
        {/* ... unchanged ... */}

        {/* Step 4: Situation */}
        {/* ... unchanged ... */}

        {/* Step 5: Property */}
        {/* ... unchanged ... */}

        {/* Step 6: Options */}
        {/* ... unchanged ... */}

        {/* Step 7: Documents */}
        {currentStep === 7 && (
          <div>
            {/* Mode courrier postal - Afficher l'adresse */}
            {formData.deliveryMethod === "post" ? (
              <div>
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-amber-500/10 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Envoi de vos documents par courrier
                    </h2>
                    <p className="text-muted-foreground">
                      Vous avez choisi l'envoi postal. Veuillez envoyer vos documents à l'adresse ci-dessous.
                    </p>
                  </div>
                </div>

                <div className="max-w-xl mx-auto">
                  {/* Adresse postale */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 mb-6">
                    <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                      Adresse d'envoi
                    </h3>
                    <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                      <p className="text-lg font-semibold text-gray-900">NeoFidu Sàrl</p>
                      <p className="text-gray-700">Crettaz 1</p>
                      <p className="text-gray-700">1854 Leysin</p>
                      <p className="text-gray-500 mt-2">Suisse</p>
                    </div>
                  </div>

                  {/* Liste des documents à envoyer */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
                      Documents à inclure
                    </h3>
                    <div className="space-y-3">
                      {getDocumentsWithStatus().filter(d => d.required).map((doc) => (
                        <div key={doc.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                          <div className="w-5 h-5 rounded border-2 border-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name} <span className="text-red-500">*</span></p>
                            <p className="text-sm text-gray-500">{doc.description}</p>
                          </div>
                        </div>
                      ))}
                      {getDocumentsWithStatus().filter(d => !d.required).length > 0 && (
                        <>
                          <p className="text-sm text-muted-foreground mt-4 mb-2 font-medium">Documents optionnels (si applicable) :</p>
                          {getDocumentsWithStatus().filter(d => !d.required).map((doc) => (
                            <div key={doc.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                              <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-gray-700">{doc.name}</p>
                                <p className="text-sm text-gray-500">{doc.description}</p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Instructions importantes */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Instructions importantes
                    </h3>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>Indiquez votre <strong>référence de demande</strong> sur l'enveloppe (elle vous sera communiquée après le paiement)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>Envoyez des <strong>copies</strong> de vos documents, pas les originaux</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>Nous vous retournerons les documents si vous le souhaitez</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>Le traitement commence dès réception de vos documents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* Mode électronique - Upload des documents */
              <div>
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Envoi de vos documents
                    </h2>
                    <p className="text-muted-foreground">
                      Téléchargez les justificatifs nécessaires. Les documents marqués <span className="text-red-500 font-medium">*</span> sont obligatoires.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                      Vos données sont stockées de manière sécurisée et confidentielle.
                    </p>
                  </div>
                </div>

                {/* Résumé des documents obligatoires manquants */}
                {getMissingRequiredDocuments().length > 0 && (
              <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-1">
                      Documents obligatoires manquants ({getMissingRequiredDocuments().length})
                    </h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      {getMissingRequiredDocuments().map(doc => (
                        <li key={doc.id} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                          {doc.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {/* Document categories */}
              <div className="md:col-span-1 space-y-2">
                {/* Documents obligatoires */}
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Documents obligatoires
                  </h4>
                  <TooltipProvider>
                  {getDocumentsWithStatus().filter(d => d.required).map((doc) => {
                    const filesCount = getFilesByCategory(doc.id).length;
                    const isComplete = filesCount > 0;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setActiveCategory(doc.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-2 ${
                          activeCategory === doc.id
                            ? "border-primary bg-primary/5"
                            : isComplete
                            ? "border-green-300 bg-green-50/50"
                            : "border-red-200 bg-red-50/30 hover:border-red-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isComplete ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <FileText className="w-5 h-5 text-red-500" />
                            )}
                            <div>
                              <div className="font-medium text-sm flex items-center gap-1">
                                {doc.name}
                                <span className="text-red-500">*</span>
                                {doc.tooltip && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        type="button"
                                        onClick={(e) => e.stopPropagation()}
                                        className="ml-1 text-muted-foreground hover:text-primary"
                                      >
                                        <HelpCircle className="w-3.5 h-3.5" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="max-w-xs">
                                      <p className="text-sm">{doc.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {doc.description}
                              </div>
                            </div>
                          </div>
                          {filesCount > 0 && (
                            <Badge variant="secondary" className="bg-green-600 text-white">
                              {filesCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  </TooltipProvider>
                </div>

                {/* Documents optionnels */}
                {getDocumentsWithStatus().filter(d => !d.required).length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      Documents optionnels
                    </h4>
                    <TooltipProvider>
                    {getDocumentsWithStatus().filter(d => !d.required).map((doc) => {
                      const filesCount = getFilesByCategory(doc.id).length;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => setActiveCategory(doc.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-2 ${
                            activeCategory === doc.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-primary" />
                              <div>
                                <div className="font-medium text-sm flex items-center gap-1">
                                  {doc.name}
                                  {doc.tooltip && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          type="button"
                                          onClick={(e) => e.stopPropagation()}
                                          className="ml-1 text-muted-foreground hover:text-primary"
                                        >
                                          <HelpCircle className="w-3.5 h-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right" className="max-w-xs">
                                        <p className="text-sm">{doc.tooltip}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {doc.description}
                                </div>
                              </div>
                            </div>
                            {filesCount > 0 && (
                              <Badge variant="secondary" className="bg-primary text-white">
                                {filesCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    </TooltipProvider>
                  </div>
                )}
              </div>

              {/* Upload area */}
              <div className="md:col-span-2">
                {/* Info sur le document sélectionné */}
                {(() => {
                  const currentDoc = getDocumentsWithStatus().find(d => d.id === activeCategory);
                  return currentDoc && (
                    <div className={`mb-4 p-3 rounded-xl ${
                      currentDoc.required
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        {currentDoc.required ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : (
                          <FileText className="w-4 h-4 text-gray-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          currentDoc.required ? "text-red-700" : "text-gray-700"
                        }`}>
                          {currentDoc.name}
                          {currentDoc.required && " (obligatoire)"}
                        </span>
                      </div>
                      {currentDoc.reason && (
                        <p className="text-xs text-muted-foreground mt-1 ml-6">
                          {currentDoc.reason}
                        </p>
                      )}
                    </div>
                  );
                })()}

                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center mb-4 hover:border-primary/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <Upload className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Glissez vos fichiers ici ou
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="rounded-full"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Parcourir les fichiers
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Formats acceptés: PDF, JPG, PNG, DOC (max 10 MB par fichier)
                  </p>
                </div>

                {/* Uploaded files for active category */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    Fichiers pour:{" "}
                    {getDocumentsWithStatus().find((d) => d.id === activeCategory)?.name}
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
                          <FileText className="w-5 h-5 text-primary" />
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

                {/* Total files et progression */}
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-primary/5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Progression</span>
                      <Badge className={allRequiredDocumentsUploaded() ? "bg-green-600" : "bg-amber-500"}>
                        {getDocumentsWithStatus().filter(d => d.required && getFilesByCategory(d.id).length > 0).length} / {getDocumentsWithStatus().filter(d => d.required).length} obligatoires
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          allRequiredDocumentsUploaded() ? "bg-green-600" : "bg-amber-500"
                        }`}
                        style={{
                          width: `${(getDocumentsWithStatus().filter(d => d.required && getFilesByCategory(d.id).length > 0).length / Math.max(1, getDocumentsWithStatus().filter(d => d.required).length)) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Total des documents</span>
                    <span className="font-medium">{uploadedFiles.length} fichier(s)</span>
                  </div>
                </div>
              </div>
            </div>
              </div>
            )}
          </div>
        )}

        {/* Step 8: Certification */}
        {/* ... unchanged ... */}

        {/* Step 9: Payment */}
        {/* ... unchanged ... */}

        {/* Validation message for step 4 */}
        {currentStep === 4 && !canProceed() && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Mode de transport requis</p>
              <p className="text-sm text-amber-700">
                Veuillez sélectionner un mode de transport pour chaque adulte de la déclaration avant de continuer.
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
          {/* On step 9 (Payment), the Stripe form handles submission - no Next button */}
          {currentStep < steps.length && (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="rounded-full"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {/* On the payment step, show info text instead of a button */}
          {currentStep === steps.length && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Utilisez le formulaire Stripe ci-dessus pour payer</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
