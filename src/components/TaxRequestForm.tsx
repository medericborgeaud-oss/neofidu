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
  AlertCircle,
  Smartphone,
  Plus,
  Trash2,
  Pencil,
  Info,
  HelpCircle,
  Home,
  MapPin,
  Calculator,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle,
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
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector";
import { ChildrenSection, ChildData, createEmptyChild } from "@/components/ChildrenSection";
import { useLanguage } from "@/lib/language-context";

const cantons = [
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "GE", name: "Genève" },
  { code: "NE", name: "Neuchâtel" },
  { code: "JU", name: "Jura" },
  { code: "FR", name: "Fribourg" },
];

// Liste des pays les plus courants pour les Suisses de l'étranger
const countriesAbroad = [
  { code: "FR", name: "France" },
  { code: "DE", name: "Allemagne" },
  { code: "IT", name: "Italie" },
  { code: "AT", name: "Autriche" },
  { code: "US", name: "États-Unis" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "Royaume-Uni" },
  { code: "ES", name: "Espagne" },
  { code: "PT", name: "Portugal" },
  { code: "BE", name: "Belgique" },
  { code: "LU", name: "Luxembourg" },
  { code: "NL", name: "Pays-Bas" },
  { code: "AE", name: "Émirats Arabes Unis" },
  { code: "SG", name: "Singapour" },
  { code: "AU", name: "Australie" },
  { code: "NZ", name: "Nouvelle-Zélande" },
  { code: "JP", name: "Japon" },
  { code: "CN", name: "Chine" },
  { code: "HK", name: "Hong Kong" },
  { code: "BR", name: "Brésil" },
  { code: "MX", name: "Mexique" },
  { code: "TH", name: "Thaïlande" },
  { code: "IL", name: "Israël" },
  { code: "ZA", name: "Afrique du Sud" },
  { code: "OTHER", name: "Autre pays" },
];

// Information sur le code de contrôle/déclaration par canton
const cantonCodeInfo: Record<string, { label: string; labelEn: string; placeholder: string; source: string; sourceEn: string }> = {
  VD: {
    label: "Code de contrôle",
    labelEn: "Control code",
    placeholder: "Ex: 123456",
    source: "Trouvez ce numéro sur votre courrier fiscal",
    sourceEn: "Find this number on your tax letter",
  },
  VS: {
    label: "Numéro de contrôle",
    labelEn: "Control number",
    placeholder: "Ex: 123456789",
    source: "Reçu avec le courrier fiscal de début d'année",
    sourceEn: "Received with your annual tax letter",
  },
  GE: {
    label: "Code déclaration",
    labelEn: "Declaration code",
    placeholder: "Ex: ABCD1234",
    source: "Courrier \"Identifiants pour votre déclaration\"",
    sourceEn: "\"Identifiers for your declaration\" letter",
  },
  NE: {
    label: "Code de contrôle",
    labelEn: "Control code",
    placeholder: "Ex: 123456",
    source: "Courrier de déclaration (logiciel Clic & Tax)",
    sourceEn: "Declaration letter (Clic & Tax software)",
  },
  JU: {
    label: "Code de contrôle",
    labelEn: "Control code",
    placeholder: "Ex: 123456",
    source: "Formulaire reçu pour JuraTax",
    sourceEn: "Form received for JuraTax",
  },
  FR: {
    label: "Code d'accès + Code de contrôle",
    labelEn: "Access code + Control code",
    placeholder: "Ex: ABC123 / 456789",
    source: "Page de garde de la déclaration papier",
    sourceEn: "Cover page of the paper tax return",
  },
};

// Options pour la situation familiale (étape 2a)
const familyStatusOptions = [
  { id: "single", name: "Déclaration individuelle", nameEn: "Individual filing", icon: User, description: "Personne seule (célibataire, divorcé(e), veuf/veuve)", descriptionEn: "Single person (single, divorced, widowed)" },
  { id: "couple", name: "Déclaration commune", nameEn: "Joint filing", icon: Users, description: "Couple marié ou partenariat enregistré", descriptionEn: "Married couple or registered partnership" },
];

// Options pour la situation professionnelle (étape 2b)
// La description de "independent" dépend du familyStatus, elle sera générée dynamiquement
const professionalStatusOptions = [
  { id: "employee", name: "Salarié / Retraité", nameEn: "Employee / Retired", icon: User, description: "Employé, retraité, étudiant, chômeur", descriptionEn: "Employee, retired, student, unemployed" },
  { id: "independent", name: "Indépendant", nameEn: "Self-employed", icon: Briefcase, descriptionSingle: "Travailleur indépendant", descriptionSingleEn: "Self-employed worker", descriptionCouple: "Activité indépendante (au moins un conjoint)", descriptionCoupleEn: "Self-employed activity (at least one spouse)" },
];

// Ancien tableau conservé pour compatibilité avec le reste du code
const clientTypes = [
  { id: "private", name: "Client privé", icon: User, description: "Salarié, retraité, étudiant" },
  { id: "independent", name: "Indépendant", icon: Briefcase, description: "Travailleur indépendant" },
  { id: "couple", name: "Couple", icon: Users, description: "Couple marié / partenariat enregistré" },
];

const transportModes = [
  { id: "train", name: "Transports publics", nameEn: "Public transport", description: "Train, bus, tram" },
  { id: "car", name: "Voiture", nameEn: "Car", description: "Véhicule personnel", descriptionEn: "Personal vehicle" },
  { id: "bike", name: "Vélo / À pied", nameEn: "Bike / On foot", description: "Non déductible", descriptionEn: "Non-deductible" },
  { id: "none", name: "Pas de trajet", nameEn: "No commute", description: "Télétravail complet", descriptionEn: "Full remote work" },
];

const residenceStatuses = [
  { id: "swiss", name: "Suisse (citoyen/ne)", nameEn: "Swiss (citizen)" },
  { id: "permitB", name: "Permis B (séjour)", nameEn: "Permit B (residence)" },
  { id: "permitC", name: "Permis C (établissement)", nameEn: "Permit C (settlement)" },
  { id: "permitG", name: "Permis G (frontalier)", nameEn: "Permit G (cross-border)" },
  { id: "permitL", name: "Permis L (séjour court)", nameEn: "Permit L (short-stay)" },
  { id: "permitF", name: "Permis F (admis provisoire)", nameEn: "Permit F (provisional)" },
  { id: "other", name: "Autre", nameEn: "Other" },
];

const maritalStatuses = [
  { id: "single", name: "Célibataire", nameEn: "Single", description: "Jamais marié(e)" },
  { id: "married", name: "Marié(e)", nameEn: "Married", description: "Union légale" },
  { id: "divorced", name: "Divorcé(e)", nameEn: "Divorced", description: "Mariage dissous" },
  { id: "widowed", name: "Veuf/Veuve", nameEn: "Widowed", description: "Conjoint décédé" },
  { id: "separated", name: "Séparé(e)", nameEn: "Separated", description: "Séparation légale" },
  { id: "partnership", name: "Partenariat enregistré", nameEn: "Registered partnership", description: "Union civile" },
];

// Les statuts d'emploi pour les clients privés
const employmentStatuses = [
  { id: "employed", name: "Salarié(e)", nameEn: "Employee", description: "Employé à temps plein ou partiel", descriptionEn: "Full or part-time employee" },
  { id: "retired", name: "Retraité(e)", nameEn: "Retired", description: "AVS, AI, ou autre rente", descriptionEn: "AVS, AI, or other pension" },
  { id: "unemployed", name: "Au chômage", nameEn: "Unemployed", description: "Inscrit au chômage", descriptionEn: "Registered unemployed" },
  { id: "selfemployed", name: "Indépendant(e)", nameEn: "Self-employed", description: "Activité indépendante", descriptionEn: "Self-employed activity" },
];

// Les catégories de documents avec tooltips explicatifs
const documentCategories = [
  { id: "salary", name: "Certificat(s) de salaire", description: "De tous les employeurs", tooltip: "Document fourni par votre employeur indiquant votre salaire brut, les cotisations sociales et les impôts prélevés à la source." },
  { id: "pension", name: "Attestation de rente", description: "AVS, AI, LPP, etc.", tooltip: "Attestations de toutes vos rentes : AVS, AI, 2ème pilier (LPP), rentes étrangères, etc." },
  { id: "unemployment", name: "Attestation de chômage", description: "Indemnités chômage reçues", tooltip: "Attestation de l'office régional de placement (ORP) indiquant les indemnités chômage perçues durant l'année." },
  { id: "business", name: "Comptes résultats et bilan", description: "Pour indépendants", tooltip: "États financiers complets de votre activité indépendante : compte de résultat, bilan, et annexes. Document obligatoire pour les indépendants." },
  { id: "questionnaireIndependantVD", name: "Questionnaire général indépendant", description: "Canton de Vaud uniquement", tooltip: "Formulaire spécifique demandé par le canton de Vaud pour les indépendants. Contient des informations détaillées sur votre activité." },
  { id: "questionnaireIndependantFR", name: "Questionnaire pour indépendants", description: "Canton de Fribourg", tooltip: "Formulaire complémentaire demandé par le canton de Fribourg pour les personnes exerçant une activité lucrative indépendante." },
  { id: "questionnaireIndependantVS", name: "Formulaire activité indépendante", description: "Canton du Valais", tooltip: "Formulaire de renseignements complémentaires pour les contribuables exerçant une activité lucrative indépendante dans le canton du Valais." },
  { id: "questionnaireIndependantNE", name: "Annexe activité indépendante", description: "Canton de Neuchâtel", tooltip: "Formulaire annexe pour les contribuables indépendants utilisant Clic & Tax dans le canton de Neuchâtel." },
  { id: "avsIndependent", name: "Attestation AVS indépendant", description: "Cotisations personnelles", tooltip: "Attestation de votre caisse de compensation indiquant les cotisations AVS/AI/APG versées en tant qu'indépendant." },
  { id: "amortization", name: "Tableau des amortissements", description: "Actifs professionnels", tooltip: "Tableau détaillant les amortissements de vos actifs professionnels (véhicule, matériel, mobilier, etc.)." },
  { id: "businessBank", name: "Relevé compte professionnel", description: "Compte séparé", tooltip: "Relevé de votre compte bancaire professionnel (si séparé du compte privé) au 31 décembre." },
  { id: "bank", name: "Relevés bancaires au 31.12", description: "Tous vos comptes", tooltip: "Relevés de tous vos comptes bancaires et postaux montrant le solde au 31 décembre et les intérêts perçus." },
  { id: "stocks", name: "Relevés de titres au 31.12", description: "Actions, fonds, obligations", tooltip: "Relevé de dépôt de votre banque indiquant la valeur fiscale de vos titres au 31 décembre." },
  { id: "stocksSale", name: "Justificatifs ventes titres", description: "Relevés de transactions", tooltip: "Relevés de transactions de votre banque/courtier montrant les achats et ventes de titres durant l'année (prix d'achat, prix de vente, dates)." },
  { id: "insurance", name: "Attestation primes maladie", description: "Primes LAMal payées", tooltip: "Attestation de votre caisse maladie indiquant le total des primes d'assurance obligatoire (LAMal) payées." },
  { id: "pillar3a", name: "Attestation pilier 3a", description: "Versements effectués", tooltip: "Attestation de votre banque ou assurance confirmant les versements effectués sur votre compte 3ème pilier A." },
  { id: "guard", name: "Frais de garde d'enfants", description: "Crèche, UAPE, maman de jour, cantine, camps", tooltip: "Factures et attestations des frais de garde : crèche, UAPE, maman de jour, cantine scolaire, camps de vacances." },
  { id: "alimonyReceived", name: "Pensions alimentaires reçues", description: "Contributions d'entretien", tooltip: "Justificatifs des pensions alimentaires reçues pour vous-même ou vos enfants (extraits bancaires, jugement de divorce)." },
  { id: "alimonyPaid", name: "Pensions alimentaires versées", description: "Contributions versées", tooltip: "Justificatifs des pensions alimentaires versées à votre ex-conjoint ou pour vos enfants (extraits bancaires, jugement)." },
  { id: "debts", name: "Attestation de dettes", description: "Prêts personnels, leasing", tooltip: "Attestations de vos créanciers indiquant le solde de vos dettes au 31 décembre et les intérêts payés." },
  { id: "mortgage", name: "Attestation hypothécaire", description: "Intérêts, amortissements", tooltip: "Attestation de votre banque indiquant le solde de l'hypothèque, les intérêts payés et les amortissements." },
  { id: "renovations", name: "Factures gros travaux", description: "Rénovations, entretien", tooltip: "Factures des travaux d'entretien et de rénovation de votre bien immobilier (seuls les travaux d'entretien sont déductibles)." },
  { id: "property", name: "Documents immobiliers", description: "Charges, PPE, etc.", tooltip: "Décompte de charges de copropriété, attestations de frais d'entretien, etc." },
  { id: "propertySale", name: "Documents vente immobilière", description: "Acte de vente, IGI", tooltip: "Acte de vente notarié, bordereau de l'impôt sur les gains immobiliers, acte d'achat original, factures des travaux de plus-value effectués." },
  { id: "donations", name: "Attestations de dons", description: "Organisations d'utilité publique", tooltip: "Attestations de dons à des organisations reconnues d'utilité publique (associations, fondations, églises, partis politiques)." },
  { id: "other", name: "Autres justificatifs", description: "Frais professionnels, etc.", tooltip: "Justificatifs de frais professionnels, cotisations syndicales, formations, etc." },
];

// Documents spécifiques pour les Suisses de l'étranger
const abroadDocumentCategories = [
  { id: "taxResidenceCertificate", name: "Attestation de résidence fiscale", description: "Du pays de résidence", tooltip: "Certificat officiel de votre pays de résidence confirmant que vous y êtes domicilié fiscalement. Nécessaire pour appliquer la convention de double imposition.", required: true },
  { id: "foreignIncome", name: "Justificatifs revenus étrangers", description: "Salaire, pension, etc.", tooltip: "Documents attestant vos revenus dans votre pays de résidence : fiches de salaire, attestations de pension, etc. Nécessaires pour déterminer le taux d'imposition.", required: true },
  { id: "foreignTaxReturn", name: "Avis d'imposition étranger", description: "Dernière déclaration", tooltip: "Copie de votre dernière déclaration d'impôts ou avis d'imposition de votre pays de résidence.", required: false },
  { id: "da1Form", name: "Formulaire DA-1", description: "Récupération impôt anticipé", tooltip: "Formulaire pour demander le remboursement de l'impôt anticipé suisse (35%) sur les dividendes et intérêts de source suisse.", required: false },
  { id: "swissBankAbroad", name: "Relevés comptes suisses", description: "Banques en Suisse", tooltip: "Relevés de vos comptes bancaires suisses au 31 décembre, montrant le solde et les intérêts perçus.", required: false },
  { id: "swissProperty", name: "Documents bien immobilier CH", description: "Si propriétaire en Suisse", tooltip: "Documents relatifs à votre bien immobilier en Suisse : estimation fiscale, décompte de charges, attestation hypothécaire.", required: false },
];

const stepsEn = ["Canton", "Profile", "Details", "Situation", "Property", "Options", "Documents", "Certification", "Payment"];
const stepsFr = ["Canton", "Profil", "Coordonnées", "Situation", "Immobilier", "Options", "Documents", "Certification", "Paiement"];
const steps = stepsFr; // kept for backward compatibility

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  category: string;
  file: File; // Le fichier réel pour l'upload
  url?: string; // URL après upload vers Cloudinary
  uploadStatus: "pending" | "uploading" | "success" | "error"; // Statut de l'upload
  uploadError?: string; // Message d'erreur si échec
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
  carJustification: string; // Justification pour l'utilisation de la voiture
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
  carJustification: "",
});

// Types de biens immobiliers
const propertyTypes = [
  { id: "apartment", name: "Appartement", nameEn: "Apartment", description: "PPE ou copropriété", descriptionEn: "Co-ownership" },
  { id: "house", name: "Maison individuelle", nameEn: "Single-family house", description: "Villa, chalet", descriptionEn: "Villa, chalet" },
  { id: "building", name: "Immeuble de rapport", nameEn: "Rental building", description: "Plusieurs logements", descriptionEn: "Multiple units" },
  { id: "land", name: "Terrain", nameEn: "Land", description: "Non bâti", descriptionEn: "Undeveloped" },
  { id: "commercial", name: "Local commercial", nameEn: "Commercial space", description: "Bureau, commerce", descriptionEn: "Office, retail" },
  { id: "parking", name: "Place de parc", nameEn: "Parking space", description: "Garage, parking", descriptionEn: "Garage, parking" },
];

// Usages des biens immobiliers
const propertyUsages = [
  { id: "main_residence", name: "Résidence principale", nameEn: "Primary residence", description: "Vous y habitez", descriptionEn: "You live there" },
  { id: "secondary_residence", name: "Résidence secondaire", nameEn: "Secondary residence", description: "Vacances, week-end", descriptionEn: "Holidays, weekends" },
  { id: "rented", name: "Bien loué", nameEn: "Rented property", description: "Location à un tiers", descriptionEn: "Rented to a third party" },
  { id: "rented_furnished", name: "Location meublée", nameEn: "Furnished rental", description: "Airbnb, location saisonnière", descriptionEn: "Airbnb, seasonal rental" },
  { id: "vacant", name: "Vacant", nameEn: "Vacant", description: "Non occupé, non loué", descriptionEn: "Unoccupied, not rented" },
  { id: "free_use", name: "Usage gratuit", nameEn: "Free use", description: "Prêté à un proche", descriptionEn: "Lent to a relative" },
];

// Interface pour un bien immobilier
interface Property {
  id: string;
  // Identification
  street: string;
  npa: string;
  city: string;
  canton: string;
  parcelNumber: string; // Numéro de parcelle cadastrale
  // Caractéristiques
  propertyType: string;
  usage: string;
  ownershipShare: string; // en pourcentage (100, 50, etc.)
  acquisitionYear: string;
  constructionYear: string; // Année de construction du bâtiment
  // Valeurs fiscales
  fiscalValue: string; // Valeur fiscale/cadastrale
  rentalValue: string; // Valeur locative (si résidence)
  // Revenus locatifs (si loué)
  annualRent: string; // Loyers bruts annuels
  charges: string; // Charges locatives perçues
  // Hypothèque
  hasMortgage: boolean;
  mortgageBalance: string; // Solde de la dette
  mortgageInterest: string; // Intérêts annuels
  // Travaux
  maintenanceCosts: string; // Frais d'entretien (forfait ou effectifs)
  maintenanceType: "flat_rate" | "effective"; // Forfait ou frais effectifs
}

// Calcul du forfait d'entretien applicable selon l'âge du bâtiment
const getMaintenanceFlatRate = (constructionYear: string): { rate: number; label: string } => {
  if (!constructionYear) return { rate: 20, label: "20% (par défaut)" };
  const year = parseInt(constructionYear);
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  if (age <= 10) {
    return { rate: 10, label: "10% (bâtiment de moins de 10 ans)" };
  }
  return { rate: 20, label: "20% (bâtiment de plus de 10 ans)" };
};

const createEmptyProperty = (): Property => ({
  id: Math.random().toString(36).substr(2, 9),
  street: "",
  npa: "",
  city: "",
  canton: "",
  parcelNumber: "",
  propertyType: "",
  usage: "",
  ownershipShare: "100",
  acquisitionYear: "",
  constructionYear: "",
  fiscalValue: "",
  rentalValue: "",
  annualRent: "",
  charges: "",
  hasMortgage: false,
  mortgageBalance: "",
  mortgageInterest: "",
  maintenanceCosts: "",
  maintenanceType: "flat_rate",
});

// Validation d'un bien immobilier - retourne les erreurs
const validateProperty = (property: Property): string[] => {
  const errors: string[] = [];

  // Champs obligatoires
  if (!property.street.trim()) errors.push("Adresse (rue et numéro)");
  if (!property.npa.trim()) errors.push("NPA");
  if (!property.city.trim()) errors.push("Localité");
  if (!property.canton) errors.push("Canton du bien");
  if (!property.propertyType) errors.push("Type de bien");
  if (!property.usage) errors.push("Usage du bien");
  if (!property.fiscalValue.trim()) errors.push("Valeur fiscale");

  // Revenus locatifs obligatoires si bien loué
  if ((property.usage === "rented" || property.usage === "rented_furnished") && !property.annualRent.trim()) {
    errors.push("Loyers bruts annuels (obligatoire pour un bien loué)");
  }

  return errors;
};

// Vérifier si tous les biens sont valides
const areAllPropertiesValid = (props: Property[]): boolean => {
  return props.every(p => validateProperty(p).length === 0);
};

// === FONCTIONS DE VALIDATION ===

// Valider une date de naissance (doit être dans le passé, âge raisonnable 18-120 ans)
const validateBirthDate = (dateStr: string): { valid: boolean; error?: string } => {
  if (!dateStr || dateStr.trim() === "") {
    return { valid: false, error: "Date de naissance requise" };
  }

  // Vérifier le format de la date (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    return { valid: false, error: "Format de date invalide (JJ.MM.AAAA)" };
  }

  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Fin de la journée pour comparaison

  // Vérifier que la date est valide (pas de 31 février, etc.)
  if (isNaN(date.getTime())) {
    return { valid: false, error: "Date invalide" };
  }

  // Vérifier que les composants de la date correspondent (éviter les débordements de mois)
  const [year, month, day] = dateStr.split("-").map(Number);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return { valid: false, error: "Date invalide (jour inexistant)" };
  }

  // IMPORTANT: Pas dans le futur
  if (date > today) {
    return { valid: false, error: "La date de naissance ne peut pas être dans le futur" };
  }

  // Âge minimum 18 ans pour un contribuable
  const age = Math.floor((today.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  if (age < 18) {
    return { valid: false, error: "Le contribuable doit avoir au moins 18 ans" };
  }

  // Âge maximum raisonnable (120 ans)
  if (age > 120) {
    return { valid: false, error: "Invalid date of birth (age over 120 years)" };
  }

  // Année de naissance minimale raisonnable (1900)
  if (year < 1900) {
    return { valid: false, error: "Invalid birth year (before 1900)" };
  }

  return { valid: true };
};

// Valider un numéro de téléphone suisse
const validatePhone = (phone: string): { valid: boolean; error?: string } => {
  if (!phone || phone.trim() === "") {
    return { valid: true }; // Téléphone optionnel
  }

  // Nettoyer le numéro (enlever espaces, tirets, parenthèses, points)
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");

  // Vérifier la longueur minimale
  if (cleaned.length < 10) {
    return { valid: false, error: "Number too short. E.g.: +41 79 123 45 67" };
  }

  // Formats suisses acceptés:
  // +41791234567 (international avec +) - 12 caractères
  // 0041791234567 (international avec 00) - 13 caractères
  // 0791234567 (national) - 10 caractères
  const swissRegex = /^(\+41|0041|0)([1-9]\d{8})$/;

  if (!swissRegex.test(cleaned)) {
    return { valid: false, error: "Format suisse requis: +41 79 123 45 67 ou 079 123 45 67" };
  }

  // Vérifier que le préfixe est valide (mobile: 07x, fixe: 02x, 03x, 04x, etc.)
  let nationalPart = "";
  if (cleaned.startsWith("+41")) {
    nationalPart = cleaned.substring(3);
  } else if (cleaned.startsWith("0041")) {
    nationalPart = cleaned.substring(4);
  } else if (cleaned.startsWith("0")) {
    nationalPart = cleaned.substring(1);
  }

  // Préfixes valides en Suisse
  const validPrefixes = ["21", "22", "24", "26", "27", "31", "32", "33", "34", "41", "43", "44", "51", "52", "55", "56", "58", "61", "62", "71", "74", "76", "77", "78", "79", "81", "91"];
  const prefix = nationalPart.substring(0, 2);
  if (!validPrefixes.includes(prefix)) {
    return { valid: false, error: `Préfixe téléphonique invalide (${prefix})` };
  }

  // Vérifier que ce n'est pas un numéro répétitif invalide
  if (/^(\d)\1{8}$/.test(nationalPart)) {
    return { valid: false, error: "Numéro de téléphone invalide" };
  }

  return { valid: true };
};

// Valider un numéro de contribuable suisse
// Formats acceptés par canton:
// VD: 9 chiffres (ex: 123.456.789 ou 123456789)
// GE: 8-9 chiffres
// VS: 6-10 chiffres
// Etc.
const validateTaxpayerNumber = (number: string, canton: string): { valid: boolean; error?: string } => {
  if (!number || number.trim() === "") {
    return { valid: false, error: "Numéro de contribuable requis" };
  }

  // Extraire uniquement les chiffres
  const digitsOnly = number.replace(/[^\d]/g, "");

  // Vérifications de base
  if (digitsOnly.length < 6) {
    return { valid: false, error: "Numéro trop court (minimum 6 chiffres)" };
  }

  if (digitsOnly.length > 15) {
    return { valid: false, error: "Numéro trop long (maximum 15 chiffres)" };
  }

  // Vérifier que ce n'est pas une suite de chiffres identiques (ex: 111111, 000000)
  if (/^(\d)\1+$/.test(digitsOnly)) {
    return { valid: false, error: "Numéro invalide (chiffres tous identiques)" };
  }

  // Vérifier les patterns répétitifs (ex: 121212, 123123, 112233)
  const isRepeatingPattern = (str: string): boolean => {
    // Patterns de 2 chiffres répétés (121212, 131313)
    if (str.length >= 6) {
      const pattern2 = str.substring(0, 2);
      if (str === pattern2.repeat(Math.ceil(str.length / 2)).substring(0, str.length)) {
        return true;
      }
    }
    // Patterns de 3 chiffres répétés (123123123)
    if (str.length >= 6) {
      const pattern3 = str.substring(0, 3);
      if (str === pattern3.repeat(Math.ceil(str.length / 3)).substring(0, str.length)) {
        return true;
      }
    }
    return false;
  };

  if (isRepeatingPattern(digitsOnly)) {
    return { valid: false, error: "Numéro invalide (pattern répétitif)" };
  }

  // Vérifier que ce n'est pas une suite croissante/décroissante (123456789, 987654321)
  const isSequential = (str: string): boolean => {
    if (str.length < 5) return false; // Trop court pour être une suite significative
    const digits = str.split("").map(Number);
    let ascending = true;
    let descending = true;
    for (let i = 1; i < digits.length; i++) {
      if (digits[i] !== digits[i-1] + 1) ascending = false;
      if (digits[i] !== digits[i-1] - 1) descending = false;
    }
    return ascending || descending;
  };

  if (isSequential(digitsOnly)) {
    return { valid: false, error: "Numéro invalide (suite séquentielle comme 123456)" };
  }

  // Vérifier que ce n'est pas un numéro commençant par trop de zéros
  if (/^0{3,}/.test(digitsOnly)) {
    return { valid: false, error: "Numéro invalide (trop de zéros au début)" };
  }

  // Vérifier les numéros "test" évidents
  const invalidNumbers = [
    "123456", "1234567", "12345678", "123456789",
    "111111", "222222", "333333", "444444", "555555", "666666", "777777", "888888", "999999",
    "000000", "100000", "100000000",
    "112233", "112233445566",
    "101010", "10101010",
    "121212", "12121212",
    "987654", "9876543", "98765432", "987654321",
  ];
  if (invalidNumbers.includes(digitsOnly)) {
    return { valid: false, error: "Veuillez entrer votre vrai numéro de contribuable" };
  }

  // Validation spécifique par canton (longueur attendue)
  const cantonRules: Record<string, { min: number; max: number }> = {
    VD: { min: 8, max: 10 },
    GE: { min: 7, max: 10 },
    VS: { min: 6, max: 12 },
    FR: { min: 6, max: 12 },
    NE: { min: 6, max: 12 },
    JU: { min: 6, max: 12 },
  };

  const rules = cantonRules[canton];
  if (rules) {
    if (digitsOnly.length < rules.min) {
      return { valid: false, error: `Numéro trop court pour ${canton} (minimum ${rules.min} chiffres)` };
    }
    if (digitsOnly.length > rules.max) {
      return { valid: false, error: `Numéro trop long pour ${canton} (maximum ${rules.max} chiffres)` };
    }
  }

  return { valid: true };
};

// Valider un email
const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || email.trim() === "") {
    return { valid: false, error: "Email requis" };
  }

  // Regex email standard
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, error: "Format email invalide" };
  }

  return { valid: true };
};

// === FIN FONCTIONS DE VALIDATION ===

// Liste des cantons suisses pour les biens immobiliers
const allCantons = [
  { code: "AG", name: "Argovie" },
  { code: "AI", name: "Appenzell Rhodes-Intérieures" },
  { code: "AR", name: "Appenzell Rhodes-Extérieures" },
  { code: "BE", name: "Berne" },
  { code: "BL", name: "Bâle-Campagne" },
  { code: "BS", name: "Bâle-Ville" },
  { code: "FR", name: "Fribourg" },
  { code: "GE", name: "Genève" },
  { code: "GL", name: "Glaris" },
  { code: "GR", name: "Grisons" },
  { code: "JU", name: "Jura" },
  { code: "LU", name: "Lucerne" },
  { code: "NE", name: "Neuchâtel" },
  { code: "NW", name: "Nidwald" },
  { code: "OW", name: "Obwald" },
  { code: "SG", name: "Saint-Gall" },
  { code: "SH", name: "Schaffhouse" },
  { code: "SO", name: "Soleure" },
  { code: "SZ", name: "Schwytz" },
  { code: "TG", name: "Thurgovie" },
  { code: "TI", name: "Tessin" },
  { code: "UR", name: "Uri" },
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "ZG", name: "Zoug" },
  { code: "ZH", name: "Zurich" },
];

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
  const { isEnglish } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasResumedFromStorage, setHasResumedFromStorage] = useState(false);
  const [lostFilesFromPreviousSession, setLostFilesFromPreviousSession] = useState<{ name: string; category: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("bank");

  // Service health check - CRITICAL: blocks submission if Cloudinary is down
  const [servicesHealthy, setServicesHealthy] = useState<boolean | null>(null);
  const [healthError, setHealthError] = useState<string>("");

  // Anti-spam protection: form token generated on mount
  const [formToken, setFormToken] = useState<number>(0);

  // Référence de la demande créée dans le backend
  const [taxRequestReference, setTaxRequestReference] = useState<string>("");
  const [isSavingRequest, setIsSavingRequest] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<{ message: string; failedFiles: string[] } | null>(null);

  // Erreurs de validation des champs
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Référence temporaire stable pour éviter les dossiers Cloudinary dupliqués
  const tempReferenceRef = useRef<string>("");

  // Workplaces for adult 1 and adult 2 (spouse)
  const [workplaces1, setWorkplaces1] = useState<Workplace[]>([createEmptyWorkplace()]);
  const [workplaces2, setWorkplaces2] = useState<Workplace[]>([createEmptyWorkplace()]);

  // Properties (biens immobiliers)
  const [properties, setProperties] = useState<Property[]>([]);

  // Children (enfants à charge) - detailed info
  const [childrenData, setChildrenData] = useState<ChildData[]>([]);

  const [formData, setFormData] = useState({
    canton: "",
    residenceStatus: "",
    // Suisses de l'étranger
    livesAbroad: false,
    countryOfResidence: "",
    abroadAddress: "", // Adresse complète à l'étranger
    // Nouvelles questions séparées (étape 2)
    familyStatus: "" as "" | "single" | "couple",
    isIndependent: false,
    // clientType est calculé automatiquement à partir de familyStatus et isIndependent
    clientType: "",
    // Statut d'emploi (pour clients privés non indépendants)
    employmentStatus: "" as "" | "employed" | "retired" | "unemployed" | "selfemployed",
    // {isEnglish ? "Employment rate" : "Taux d'occupation"} en % (pour les salariés)
    occupationRate: "" as string,
    // Second adulte pour couple
    employmentStatus2: "" as "" | "employed" | "retired" | "unemployed" | "selfemployed",
    // {isEnglish ? "Employment rate" : "Taux d'occupation"} en % pour le conjoint
    occupationRate2: "" as string,
    residenceStatus2: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    maritalStatus: "",
    firstName2: "",
    lastName2: "",
    birthDate2: "",
    email: "",
    phone: "",
    // Numéros fiscaux (de la lettre de l'administration)
    taxYear: new Date().getFullYear() - 1, // {isEnglish ? "Tax year" : "Année fiscale"} (année précédente par défaut)
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
    // Repas hors domicile (jours de travail)
    hasMealsOutside: false,
    mealsOutsideDays: "",
    // Repas hors domicile - conjoint(e)
    hasMealsOutside2: false,
    mealsOutsideDays2: "",
    // Pensions alimentaires
    hasAlimonyReceived: false,
    alimonyReceived: "",
    hasAlimonyPaid: false,
    alimonyPaid: "",
    monthlyRent: "",
    // Identité du bailleur/gérance (exigence NE, FR, JU)
    landlordName: "",
    landlordAddress: "",
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
    // === SECTION INDÉPENDANTS - ADULTE 1 ===
    // Informations sur l'activité indépendante
    businessType: "", // Type d'activité (commerce, services, artisanat, etc.)
    businessStartDate: "", // {isEnglish ? "Activity start date" : "Date de début d'activité"}
    hasIDE: false, // {isEnglish ? "UID number" : "Numéro IDE"} (Identifiant des Entreprises)
    ideNumber: "",
    isRegisteredRC: false, // Inscrit au Registre du Commerce
    hasVAT: false, // Assujetti à la TVA
    vatNumber: "",
    // {isEnglish ? "Key figures" : "Chiffres clés"} de l'activité
    hasBusinessAccounts: false, // Dispose d'un bilan/compte de résultat préparé
    businessRevenue: "", // Chiffre d'affaires annuel (si pas de bilan)
    businessExpenses: "", // Charges annuelles (si pas de bilan)
    businessNetIncome: "", // Bénéfice net (calculé ou déclaré)
    // Cotisations sociales indépendant
    hasAVSIndependent: false, // {isEnglish ? "Self-employed AVS/AHV contributions" : "Cotisations AVS/AI/APG indépendant"}
    avsIndependentAmount: "",
    hasLPPVoluntary: false, // {isEnglish ? "Optional 2nd pillar" : "2ème pilier facultatif"}
    lppVoluntaryAmount: "",
    // Frais professionnels
    hasHomeOffice: false, // {isEnglish ? "Home office" : "Bureau à domicile"}
    homeOfficePercent: "", // % de la surface
    homeOfficeAmount: "", // Montant du loyer attribué
    hasBusinessVehicle: false, // {isEnglish ? "Business vehicle" : "Véhicule professionnel"}
    businessVehiclePercent: "", // % utilisation professionnelle
    businessVehicleExpenses: "", // Frais totaux véhicule
    // === FIN SECTION INDÉPENDANTS ADULTE 1 ===
    // === SECTION INDÉPENDANTS - ADULTE 2 (CONJOINT) ===
    isIndependent2: false, // Le conjoint a une activité indépendante
    businessType2: "",
    businessStartDate2: "",
    hasIDE2: false,
    ideNumber2: "",
    isRegisteredRC2: false,
    hasVAT2: false,
    vatNumber2: "",
    hasBusinessAccounts2: false,
    businessRevenue2: "",
    businessExpenses2: "",
    businessNetIncome2: "",
    hasAVSIndependent2: false,
    avsIndependentAmount2: "",
    hasLPPVoluntary2: false,
    lppVoluntaryAmount2: "",
    hasHomeOffice2: false,
    homeOfficePercent2: "",
    homeOfficeAmount2: "",
    hasBusinessVehicle2: false,
    businessVehiclePercent2: "",
    businessVehicleExpenses2: "",
    // === FIN SECTION INDÉPENDANTS ADULTE 2 ===
    // Removed commute1/2 fields, replaced by workplaces1/2 arrays
    hasProperty: false,
    propertyCount: 1,
    // Vente immobilière durant l'année
    hasSoldProperty: false,
    soldPropertyDetails: "",
    // Hypothèque (lié à la propriété)
    hasMortgage: false,
    mortgageAmount: "",
    // Gros travaux (pour propriétaires)
    hasRenovations: false,
    renovationsAmount: "",
    hasStocks: false,
    stocksCount: 1,
    hasSoldStocks: false,
    soldStocksDetails: "",
    deliveryMethod: "email",
    wantsReview: false,
    deadline: "standard",
    comments: "",
    certifyAccuracy: false,
    certifyResponsibility: false,
    paymentMethod: "card",
  });

  // Generate form token on mount (for spam protection)
  useEffect(() => {
    setFormToken(Date.now());
  }, []);

  // CRITICAL: Warn user before leaving the page if they have unsaved data
  // This prevents accidental loss of uploaded files (File objects can't be serialized to localStorage)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Don't warn if form is submitted
      if (isSubmitted) return;

      // Warn if user is past step 2 (has started filling out the form)
      const hasStartedForm = currentStep > 2;

      // Warn if user has uploaded files (these will be lost!)
      const hasUploadedFiles = uploadedFiles.length > 0;

      // Warn if user has files that are still uploading
      const hasFilesUploading = uploadedFiles.some(f => f.uploadStatus === "uploading");

      // Warn if user has entered significant data
      const hasFormData = formData.firstName !== "" || formData.lastName !== "" || formData.email !== "";

      // Check if user should be warned
      const shouldWarn = hasStartedForm || hasUploadedFiles || hasFilesUploading || hasFormData;

      if (shouldWarn) {
        // Standard way to trigger browser's "leave page?" dialog
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = "";
        return "";
      }
    };

    // Add event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentStep, uploadedFiles, formData.firstName, formData.lastName, formData.email, isSubmitted]);

  // CRITICAL: Check if services are healthy on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("/api/health");
        const health = await response.json();

        if (!health.services?.cloudinary) {
          setServicesHealthy(false);
          setHealthError("The document storage service is unavailable. Please try again later or contacter contact@neofidu.ch");
          console.error("❌ CRITICAL: Cloudinary not configured!", health);
        } else {
          setServicesHealthy(true);
          setHealthError("");
        }
      } catch (error) {
        console.error("Health check failed:", error);
        // Don't block on health check failure - let upload endpoint handle it
        setServicesHealthy(true);
      }
    };

    checkHealth();
    // Re-check every 5 minutes in case services come back online
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Charger les données sauvegardées au montage du composant
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      // Marquer comme "reprise" seulement si des données significatives ont été chargées
      if (saved.currentStep && saved.currentStep > 1) {
        setHasResumedFromStorage(true);
      }
      if (saved.currentStep) setCurrentStep(saved.currentStep);
      if (saved.formData) setFormData(prev => ({ ...prev, ...saved.formData }));
      if (saved.workplaces1) setWorkplaces1(saved.workplaces1);
      if (saved.workplaces2) setWorkplaces2(saved.workplaces2);
      if (saved.properties) setProperties(saved.properties);
      if (saved.childrenData) setChildrenData(saved.childrenData);
      if (saved.activeCategory) setActiveCategory(saved.activeCategory);
      if (saved.taxRequestReference) setTaxRequestReference(saved.taxRequestReference);
      // Note: Les fichiers uploadés ne peuvent pas être restaurés depuis localStorage
      // car les objets File ne sont pas sérialisables. Le client devra re-uploader.
      if (saved.uploadedFilesMetadata && saved.uploadedFilesMetadata.length > 0) {
        // Sauvegarder les métadonnées des fichiers perdus pour avertir l'utilisateur
        const lostFiles = saved.uploadedFilesMetadata.map((f: { name: string; category: string }) => ({
          name: f.name,
          category: f.category,
        }));
        setLostFilesFromPreviousSession(lostFiles);
        console.log("⚠️ Fichiers précédemment uploadés (à re-uploader):", lostFiles);
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
      properties,
      childrenData,
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
  }, [currentStep, formData, workplaces1, workplaces2, properties, childrenData, activeCategory, taxRequestReference, uploadedFiles, isLoaded, isSubmitted]);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Calculer automatiquement clientType à partir de familyStatus et isIndependent
  useEffect(() => {
    let newClientType = "";
    if (formData.familyStatus === "single") {
      newClientType = formData.isIndependent ? "independent" : "private";
    } else if (formData.familyStatus === "couple") {
      // Pour les couples, on garde toujours "couple" comme clientType
      // L'info "indépendant" est stockée séparément dans isIndependent
      newClientType = "couple";
    }
    if (newClientType !== formData.clientType) {
      setFormData((prev) => ({ ...prev, clientType: newClientType }));
    }
  }, [formData.familyStatus, formData.isIndependent, formData.clientType]);

  // Réinitialiser l'état civil si l'utilisateur change de situation familiale
  // et que l'état civil actuel n'est plus valide
  useEffect(() => {
    if (formData.familyStatus === "single") {
      // Pour les déclarations individuelles, "married" et "partnership" ne sont pas valides
      if (formData.maritalStatus === "married" || formData.maritalStatus === "partnership") {
        setFormData((prev) => ({ ...prev, maritalStatus: "" }));
      }
    }
    if (formData.familyStatus === "couple") {
      // Pour les déclarations communes, seuls "married" et "partnership" sont valides
      if (formData.maritalStatus && formData.maritalStatus !== "married" && formData.maritalStatus !== "partnership") {
        setFormData((prev) => ({ ...prev, maritalStatus: "" }));
      }
    }
  }, [formData.familyStatus, formData.maritalStatus]);

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

  // Property management functions
  const addProperty = () => {
    setProperties((prev) => [...prev, createEmptyProperty()]);
  };

  const removeProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const updateProperty = (propertyId: string, field: keyof Property, value: string | boolean) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId ? { ...p, [field]: value } : p
      )
    );
  };

  // Upload immédiat d'un fichier vers Cloudinary
  const uploadFileToCloudinary = async (fileToUpload: UploadedFile): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
      // Générer une référence temporaire si nécessaire
      if (!taxRequestReference && !tempReferenceRef.current) {
        tempReferenceRef.current = `TEMP-${Date.now()}`;
      }
      const refToUse = taxRequestReference || tempReferenceRef.current;

      const formDataUpload = new FormData();
      formDataUpload.append("reference", refToUse);
      formDataUpload.append("lastName", formData.lastName || "DRAFT");
      formDataUpload.append("firstName", formData.firstName || "USER");
      formDataUpload.append("files", fileToUpload.file);
      formDataUpload.append("categories", fileToUpload.category);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const result = await response.json();

      if (result.success && result.documents && result.documents.length > 0) {
        const uploadedDoc = result.documents[0];
        if (uploadedDoc.url) {
          return { success: true, url: uploadedDoc.url };
        }
      }

      if (result.configMissing) {
        return { success: false, error: "Storage not configured" };
      }

      return { success: false, error: result.error || (isEnglish ? "Upload failed" : "Échec de l'upload") };
    } catch (error) {
      console.error("Erreur upload fichier:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Créer les nouveaux fichiers avec statut "uploading"
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      category: activeCategory,
      file: file,
      uploadStatus: "uploading" as const,
    }));

    // Ajouter immédiatement à la liste avec statut "uploading"
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Réinitialiser l'input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Uploader chaque fichier immédiatement
    for (const newFile of newFiles) {
      const result = await uploadFileToCloudinary(newFile);

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id
            ? {
                ...f,
                uploadStatus: result.success ? "success" : "error",
                url: result.url,
                uploadError: result.error,
              }
            : f
        )
      );
    }
  };

  // {isEnglish ? "Retry" : "Réessayer"} d'un fichier
  const retryFileUpload = async (fileId: string) => {
    const fileToRetry = uploadedFiles.find((f) => f.id === fileId);
    if (!fileToRetry) return;

    // Mettre à jour le statut à "uploading"
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, uploadStatus: "uploading" as const, uploadError: undefined } : f
      )
    );

    const result = await uploadFileToCloudinary(fileToRetry);

    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId
          ? {
              ...f,
              uploadStatus: result.success ? "success" : "error",
              url: result.url,
              uploadError: result.error,
            }
          : f
      )
    );
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const getFilesByCategory = (category: string) => {
    return uploadedFiles.filter((f) => f.category === category);
  };

  // Récupère uniquement les fichiers RÉELLEMENT uploadés (avec URL)
  const getSuccessfullyUploadedFilesByCategory = (category: string) => {
    return uploadedFiles.filter(
      (f) => f.category === category && f.uploadStatus === "success" && f.url
    );
  };

  // Vérifie s'il y a des fichiers en cours d'upload
  const hasFilesUploading = () => {
    return uploadedFiles.some((f) => f.uploadStatus === "uploading");
  };

  // Vérifie s'il y a des fichiers en erreur
  const hasFilesWithError = () => {
    return uploadedFiles.some((f) => f.uploadStatus === "error");
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
    // Vérifier si quelqu'un est indépendant (personne seule ou l'un des conjoints)
    const hasIndependentActivity = formData.isIndependent ||
      formData.employmentStatus === "selfemployed" ||
      formData.employmentStatus2 === "selfemployed" ||
      (formData.familyStatus === "couple" && formData.isIndependent2);

    if (hasIndependentActivity) {
      // Indépendants: comptes résultats et bilan obligatoires
      docs.push({
        id: "business",
        name: isEnglish ? "Profit & Loss and Balance Sheet" : "Comptes résultats et bilan",
        description: isEnglish ? "For self-employed" : "Pour indépendants",
        required: true,
        reason: isEnglish ? "Required for self-employed - contains your income and expenses" : "Obligatoire pour les indépendants - contient vos revenus et charges",
        tooltip: getDocumentTooltip("business")
      });

      // Questionnaires spécifiques par canton pour les indépendants
      if (formData.canton === "VD") {
        docs.push({
          id: "questionnaireIndependantVD",
          name: isEnglish ? "General self-employed questionnaire" : "Questionnaire général indépendant",
          description: isEnglish ? "Canton of Vaud only" : "Canton de Vaud uniquement",
          required: true,
          reason: isEnglish ? "Document required by the canton of Vaud for self-employed" : "Document obligatoire exigé par le canton de Vaud pour les indépendants",
          tooltip: getDocumentTooltip("questionnaireIndependantVD")
        });
      }
      if (formData.canton === "FR") {
        docs.push({
          id: "questionnaireIndependantFR",
          name: isEnglish ? "Self-employed questionnaire" : "Questionnaire pour indépendants",
          description: isEnglish ? "Canton of Fribourg" : "Canton de Fribourg",
          required: true,
          reason: isEnglish ? "Form required by the canton of Fribourg for self-employed activities" : "Formulaire requis par le canton de Fribourg pour les activités indépendantes",
          tooltip: getDocumentTooltip("questionnaireIndependantFR")
        });
      }
      if (formData.canton === "VS") {
        docs.push({
          id: "questionnaireIndependantVS",
          name: isEnglish ? "Self-employed activity form" : "Formulaire activité indépendante",
          description: isEnglish ? "Canton of Valais" : "Canton du Valais",
          required: true,
          reason: isEnglish ? "Information form required by the canton of Valais" : "Formulaire de renseignements exigé par le canton du Valais",
          tooltip: getDocumentTooltip("questionnaireIndependantVS")
        });
      }
      if (formData.canton === "NE") {
        docs.push({
          id: "questionnaireIndependantNE",
          name: isEnglish ? "Self-employed activity annex" : "Annexe activité indépendante",
          description: isEnglish ? "Canton of Neuchâtel" : "Canton de Neuchâtel",
          required: true,
          reason: isEnglish ? "Required annex for Clic & Tax (canton of Neuchâtel)" : "Annexe obligatoire pour Clic & Tax (canton de Neuchâtel)",
          tooltip: getDocumentTooltip("questionnaireIndependantNE")
        });
      }

      // Attestation {isEnglish ? "Self-employed AVS" : "AVS indépendant"} (recommandé)
      if (formData.hasAVSIndependent || (formData.familyStatus === "couple" && formData.hasAVSIndependent2)) {
        docs.push({
          id: "avsIndependent",
          name: isEnglish ? "AVS/AHV self-employed certificate" : "Attestation AVS indépendant",
          description: "Cotisations personnelles",
          required: true,
          reason: isEnglish ? "Declared self-employed AVS/AHV contributions" : "Cotisations AVS indépendant déclarées",
          tooltip: getDocumentTooltip("avsIndependent")
        });
      }
      // Tableau des amortissements (recommandé si actifs)
      docs.push({
        id: "amortization",
        name: "Tableau des amortissements",
        description: "Actifs professionnels",
        required: false,
        reason: isEnglish ? "Recommended if you have business assets" : "Recommandé si vous avez des actifs professionnels",
        tooltip: getDocumentTooltip("amortization")
      });
      // Relevé compte professionnel (recommandé)
      docs.push({
        id: "businessBank",
        name: isEnglish ? "Professional account statement" : "Relevé compte professionnel",
        description: isEnglish ? "Separate account" : "Compte séparé",
        required: false,
        reason: isEnglish ? "Recommended if you have a separate business account" : "Recommandé si vous avez un compte professionnel séparé",
        tooltip: getDocumentTooltip("businessBank")
      });
    }

    if (formData.clientType !== "independent") {
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
          reason: isEnglish ? "Required for employees" : "Obligatoire pour les salariés",
          tooltip: getDocumentTooltip("salary")
        });
      }
      if (hasRetired) {
        docs.push({
          id: "pension",
          name: "Attestation de rente",
          description: "AVS, AI, LPP, etc.",
          required: true,
          reason: isEnglish ? "Required for retirees" : "Obligatoire pour les retraités",
          tooltip: getDocumentTooltip("pension")
        });
      }
      if (hasUnemployed) {
        docs.push({
          id: "unemployment",
          name: isEnglish ? "Unemployment benefit certificate" : "Attestation de chômage",
          description: isEnglish ? "Unemployment benefits received" : "Indemnités chômage reçues",
          required: true,
          reason: isEnglish ? "Required for unemployed individuals" : "Obligatoire pour les chômeurs",
          tooltip: getDocumentTooltip("unemployment")
        });
      }
    }

    // === DOCUMENTS BANCAIRES (toujours obligatoires) ===
    docs.push({
      id: "bank",
      name: isEnglish ? "Bank statements as of 31.12" : "Relevés bancaires au 31.12",
      description: "Tous vos comptes",
      required: true,
      reason: "Obligatoire pour tous",
      tooltip: getDocumentTooltip("bank")
    });

    // === ATTESTATION PRIMES MALADIE (toujours obligatoire) ===
    docs.push({
      id: "insurance",
      name: "Attestation primes maladie",
      description: isEnglish ? "LAMal premiums paid" : "Primes LAMal payées",
      required: true,
      reason: "Obligatoire pour tous",
      tooltip: getDocumentTooltip("insurance")
    });

    // === RELEVÉS DE TITRES (si actions/fonds) ===
    if (formData.hasStocks) {
      docs.push({
        id: "stocks",
        name: isEnglish ? "Securities statements as of 31.12" : "Relevés de titres au 31.12",
        description: "Actions, fonds, obligations",
        required: true,
        reason: isEnglish ? "Required because you declared shares/funds" : "Obligatoire car vous avez déclaré des actions/fonds",
        tooltip: getDocumentTooltip("stocks")
      });
    }

    // === VENTES DE TITRES ===
    if (formData.hasSoldStocks) {
      docs.push({
        id: "stocksSale",
        name: "Justificatifs ventes titres",
        description: isEnglish ? "Transaction statements" : "Relevés de transactions",
        required: true,
        reason: `Obligatoire car vous avez vendu des titres en ${formData.taxYear}`,
        tooltip: getDocumentTooltip("stocksSale")
      });
    }

    // === 3ÈME PILIER (si versements) ===
    if (formData.hasPillar3a) {
      docs.push({
        id: "pillar3a",
        name: "Attestation pilier 3a",
        description: isEnglish ? "Payments made" : "Versements effectués",
        required: true,
        reason: isEnglish ? "Required because you declared payments" : "Obligatoire car vous avez déclaré des versements",
        tooltip: getDocumentTooltip("pillar3a")
      });
    }

    // === FRAIS DE GARDE (si enfants + frais de garde) ===
    if (formData.hasChildren && formData.hasGuardCosts) {
      docs.push({
        id: "guard",
        name: "Frais de garde d'enfants",
        description: isEnglish ? "Childcare, UAPE, childminder, cafeteria, camps" : "Crèche, UAPE, maman de jour, cantine, camps",
        required: true,
        reason: isEnglish ? "Required because you declared childcare costs" : "Obligatoire car vous avez déclaré des frais de garde",
        tooltip: getDocumentTooltip("guard")
      });
    }

    // === PENSIONS ALIMENTAIRES REÇUES ===
    if (formData.hasAlimonyReceived) {
      docs.push({
        id: "alimonyReceived",
        name: isEnglish ? "Alimony received" : "Pensions alimentaires reçues",
        description: "Contributions d'entretien",
        required: true,
        reason: isEnglish ? "Required because you declared receiving alimony" : "Obligatoire car vous avez déclaré recevoir des pensions",
        tooltip: getDocumentTooltip("alimonyReceived")
      });
    }

    // === PENSIONS ALIMENTAIRES VERSÉES ===
    if (formData.hasAlimonyPaid) {
      docs.push({
        id: "alimonyPaid",
        name: isEnglish ? "Alimony paid" : "Pensions alimentaires versées",
        description: isEnglish ? "Contributions paid" : "Contributions versées",
        required: true,
        reason: isEnglish ? "Required because you declared paying alimony" : "Obligatoire car vous avez déclaré verser des pensions",
        tooltip: getDocumentTooltip("alimonyPaid")
      });
    }

    // === DONS (si déclarés) ===
    if (formData.hasDonations) {
      docs.push({
        id: "donations",
        name: "Attestations de dons",
        description: isEnglish ? "Charitable organizations" : "Organisations d'utilité publique",
        required: true,
        reason: isEnglish ? "Required because you declared donations" : "Obligatoire car vous avez déclaré des dons",
        tooltip: getDocumentTooltip("donations")
      });
    }

    // === DETTES (si déclarées) ===
    if (formData.hasDebts) {
      docs.push({
        id: "debts",
        name: "Attestation de dettes",
        description: isEnglish ? "Personal loans, leasing" : "Prêts personnels, leasing",
        required: true,
        reason: isEnglish ? "Required because you declared debts" : "Obligatoire car vous avez déclaré des dettes",
        tooltip: getDocumentTooltip("debts")
      });
    }

    // === DOCUMENTS IMMOBILIERS ===
    if (formData.hasProperty) {
      // Hypothèque
      if (formData.hasMortgage) {
        docs.push({
          id: "mortgage",
          name: isEnglish ? "Mortgage certificate" : "Attestation hypothécaire",
          description: isEnglish ? "Interest, amortization" : "Intérêts, amortissements",
          required: true,
          reason: isEnglish ? "Required because you declared a mortgage" : "Obligatoire car vous avez déclaré une hypothèque",
          tooltip: getDocumentTooltip("mortgage")
        });
      }
      // Gros travaux
      if (formData.hasRenovations) {
        docs.push({
          id: "renovations",
          name: "Factures gros travaux",
          description: isEnglish ? "Renovations, maintenance" : "Rénovations, entretien",
          required: true,
          reason: isEnglish ? "Required because you declared renovation work" : "Obligatoire car vous avez déclaré des travaux",
          tooltip: getDocumentTooltip("renovations")
        });
      }
      // Documents immobiliers généraux
      docs.push({
        id: "property",
        name: "Documents immobiliers",
        description: "Charges, PPE, etc.",
        required: false,
        reason: isEnglish ? "Recommended for property owners" : "Recommandé pour les propriétaires",
        tooltip: getDocumentTooltip("property")
      });
    }

    // === VENTE IMMOBILIÈRE ===
    if (formData.hasSoldProperty) {
      docs.push({
        id: "propertySale",
        name: isEnglish ? "Real estate sale documents" : "Documents vente immobilière",
        description: "Acte de vente, IGI",
        required: true,
        reason: `Obligatoire car vous avez vendu un bien en ${formData.taxYear}`,
        tooltip: getDocumentTooltip("propertySale")
      });
    }

    // === DOCUMENTS SUISSES DE L'ÉTRANGER ===
    if (formData.livesAbroad) {
      // Attestation de résidence fiscale (obligatoire)
      docs.push({
        id: "taxResidenceCertificate",
        name: isEnglish ? "Tax residence certificate" : "Attestation de résidence fiscale",
        description: isEnglish ? "From the country of residence" : "Du pays de résidence",
        required: true,
        reason: isEnglish ? "Required for Swiss abroad (double taxation agreement)" : "Obligatoire pour les Suisses de l'étranger (convention de double imposition)",
        tooltip: abroadDocumentCategories.find(d => d.id === "taxResidenceCertificate")?.tooltip
      });
      // Justificatifs revenus étrangers (obligatoire)
      docs.push({
        id: "foreignIncome",
        name: isEnglish ? "Foreign income documents" : "Justificatifs revenus étrangers",
        description: "Salaire, pension, etc.",
        required: true,
        reason: isEnglish ? "Required to determine the applicable tax rate" : "Obligatoire pour déterminer le taux d'imposition applicable",
        tooltip: abroadDocumentCategories.find(d => d.id === "foreignIncome")?.tooltip
      });
      // Avis d'imposition étranger (recommandé)
      docs.push({
        id: "foreignTaxReturn",
        name: isEnglish ? "Foreign tax assessment" : "Avis d'imposition étranger",
        description: isEnglish ? "Last tax return" : "Dernière déclaration",
        required: false,
        reason: isEnglish ? "Recommended to justify taxes paid abroad" : "Recommandé pour justifier les impôts payés à l'étranger",
        tooltip: abroadDocumentCategories.find(d => d.id === "foreignTaxReturn")?.tooltip
      });
      // Formulaire DA-1 (si dividendes/intérêts suisses)
      docs.push({
        id: "da1Form",
        name: "Formulaire DA-1",
        description: isEnglish ? "Recovery of withholding tax" : "Récupération impôt anticipé",
        required: false,
        reason: isEnglish ? "If you want to recover Swiss withholding tax (35%)" : "Si vous souhaitez récupérer l'impôt anticipé suisse (35%)",
        tooltip: abroadDocumentCategories.find(d => d.id === "da1Form")?.tooltip
      });
    }

    // === AUTRES DOCUMENTS (optionnels) ===
    docs.push({
      id: "other",
      name: isEnglish ? "Other supporting documents" : "Autres justificatifs",
      description: isEnglish ? "Donations, professional expenses, etc." : "Dons, frais professionnels, etc.",
      required: false,
      tooltip: getDocumentTooltip("other")
    });

    return docs;
  };

  // Vérifie si tous les documents obligatoires ont été téléchargés ET uploadés avec succès
  const allRequiredDocumentsUploaded = () => {
    const requiredDocs = getDocumentsWithStatus().filter(d => d.required);
    // Vérifier que chaque document obligatoire a au moins un fichier RÉELLEMENT uploadé
    return requiredDocs.every(doc => getSuccessfullyUploadedFilesByCategory(doc.id).length > 0);
  };

  // Compte les documents obligatoires manquants (pas de fichier OU upload échoué)
  const getMissingRequiredDocuments = () => {
    const requiredDocs = getDocumentsWithStatus().filter(d => d.required);
    return requiredDocs.filter(doc => getSuccessfullyUploadedFilesByCategory(doc.id).length === 0);
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
    // {isEnglish ? "Swiss abroad supplement" : "Supplément Suisse de l'étranger"} (complexité accrue : double imposition, etc.)
    if (formData.livesAbroad) price += 50;
    // {isEnglish ? "Couple supplement" : "Supplément couple"}
    if (formData.familyStatus === "couple") price += 20;
    // Supplément indépendant adulte 1
    if (formData.isIndependent) price += 40;
    // Supplément indépendant adulte 2 (conjoint)
    if (formData.familyStatus === "couple" && formData.isIndependent2) price += 40;
    if (formData.hasChildren) price += 10 * formData.childrenCount;
    if (formData.hasProperty && properties.length > 0) price += 50 * properties.length;
    if (formData.hasStocks && formData.stocksCount >= 3) price += 20;
    if (formData.deliveryMethod === "post") price += 20;
    // Option téléphone supprimée
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

  // Animated price counter

  const canProceed = () => {
    if (currentStep === 1) {
      // Canton obligatoire
      if (!formData.canton) return false;
      // Si réside à l'étranger, le pays doit être sélectionné
      if (formData.livesAbroad && !formData.countryOfResidence) return false;
      return true;
    }
    // L'étape 2 nécessite que les 2 questions soient répondues
    if (currentStep === 2) return formData.familyStatus !== "";
    if (currentStep === 3) {
      // Simple validation without setState (validation errors are set via onBlur/onChange handlers)
      // Validation du numéro de contribuable
      const taxpayerValidation = validateTaxpayerNumber(formData.taxpayerNumber, formData.canton);
      if (!taxpayerValidation.valid) return false;

      // Validation du code de déclaration
      if (!formData.declarationCode || formData.declarationCode.length < 4) return false;

      // Validation de la date de naissance
      const birthDateValidation = validateBirthDate(formData.birthDate);
      if (!birthDateValidation.valid) return false;

      // Validation de l'état civil
      if (!formData.maritalStatus) return false;

      // Validation du conjoint pour les couples
      if (formData.clientType === "couple") {
        if (!formData.firstName2) return false;
        if (!formData.lastName2) return false;

        const birthDate2Validation = validateBirthDate(formData.birthDate2);
        if (!birthDate2Validation.valid) return false;
      }

      // Validation de l'email
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.valid) return false;

      // Validation du téléphone (optionnel mais doit être valide si renseigné)
      if (formData.phone) {
        const phoneValidation = validatePhone(formData.phone);
        if (!phoneValidation.valid) return false;
      }

      // Validation des champs obligatoires
      if (!formData.firstName) return false;
      if (!formData.lastName) return false;
      if (!formData.street) return false;
      if (!formData.npa) return false;
      if (!formData.city) return false;

      return true;
    }
    if (currentStep === 4) {
      // Statut d'emploi obligatoire pour les non-indépendants
      if (formData.clientType !== "independent") {
        if (!formData.employmentStatus) return false;
        // {isEnglish ? "Employment rate" : "Taux d'occupation"} obligatoire pour les salariés
        if (formData.employmentStatus === "employed" && !formData.occupationRate) return false;
        // Pour les couples, le second adulte doit aussi avoir un statut
        if (formData.clientType === "couple" && !formData.employmentStatus2) return false;
        // {isEnglish ? "Employment rate" : "Taux d'occupation"} obligatoire pour le conjoint salarié
        if (formData.clientType === "couple" && formData.employmentStatus2 === "employed" && !formData.occupationRate2) return false;
      }

      // Validation pour les indépendants adulte 1: ils doivent avoir soit un bilan, soit le CA/charges
      if (formData.isIndependent) {
        // Le type d'activité est obligatoire
        if (!formData.businessType.trim()) return false;
        // Il faut soit avoir un bilan préparé, soit avoir rempli le CA et les charges
        const hasBusinessFinancials = formData.hasBusinessAccounts ||
          (formData.businessRevenue.trim() !== "" && formData.businessExpenses.trim() !== "");
        if (!hasBusinessFinancials) return false;
      }

      // Validation pour les indépendants adulte 2 (conjoint)
      if (formData.familyStatus === "couple" && formData.isIndependent2) {
        // Le type d'activité est obligatoire
        if (!formData.businessType2.trim()) return false;
        // Il faut soit avoir un bilan préparé, soit avoir rempli le CA et les charges
        const hasBusinessFinancials2 = formData.hasBusinessAccounts2 ||
          (formData.businessRevenue2.trim() !== "" && formData.businessExpenses2.trim() !== "");
        if (!hasBusinessFinancials2) return false;
      }

      // At least one workplace for adult 1 must have a transport mode selected
      const adult1HasTransport = workplaces1.some((wp) => wp.transportMode !== "");
      // For car transport, justification is required
      const adult1CarJustificationOk = workplaces1.every((wp) =>
        wp.transportMode !== "car" || (wp.transportMode === "car" && wp.carJustification.trim().length > 0)
      );
      // For couples, adult 2 must also have at least one transport mode selected
      if (formData.clientType === "couple") {
        const adult2HasTransport = workplaces2.some((wp) => wp.transportMode !== "");
        const adult2CarJustificationOk = workplaces2.every((wp) =>
          wp.transportMode !== "car" || (wp.transportMode === "car" && wp.carJustification.trim().length > 0)
        );
        return adult1HasTransport && adult2HasTransport && adult1CarJustificationOk && adult2CarJustificationOk;
      }
      return adult1HasTransport && adult1CarJustificationOk;
    }
    if (currentStep === 5) {
      // Si pas de propriété, on peut passer
      if (!formData.hasProperty) return true;
      // Si propriété déclarée, au moins un bien doit exister et tous doivent être valides
      if (properties.length === 0) return false;
      return areAllPropertiesValid(properties);
    }
    if (currentStep === 7) {
      // Si envoi par courrier postal, pas besoin de documents uploadés
      if (formData.deliveryMethod === "post") {
        return true;
      }
      // Bloquer si des fichiers sont en cours d'upload
      if (hasFilesUploading()) {
        return false;
      }
      // Bloquer si des fichiers ont échoué (l'utilisateur doit réessayer ou les supprimer)
      if (hasFilesWithError()) {
        return false;
      }
      // Sinon, tous les documents obligatoires doivent être uploadés avec succès
      return allRequiredDocumentsUploaded();
    }
    if (currentStep === 8)
      return formData.certifyAccuracy && formData.certifyResponsibility;
    return true;
  };

  // Sauvegarder la demande dans le backend avant paiement
  // NOTE: Les documents sont maintenant uploadés IMMÉDIATEMENT à l'étape 7 (Documents)
  // pour éviter la perte des objets File si l'utilisateur ferme l'onglet
  const saveTaxRequest = async () => {
    setIsSavingRequest(true);
    try {
      // Vérifier qu'il n'y a pas de fichiers en cours d'upload ou en erreur
      const filesUploading = uploadedFiles.filter(f => f.uploadStatus === "uploading");
      const filesWithError = uploadedFiles.filter(f => f.uploadStatus === "error");

      if (filesUploading.length > 0) {
        console.error("❌ Des fichiers sont encore en cours d'upload");
        setSaveError("Please wait for all files to be uploaded.");
        setIsSavingRequest(false);
        return null;
      }

      if (filesWithError.length > 0) {
        console.error("❌ Des fichiers ont échoué à l'upload:", filesWithError.map(f => f.name));
        setUploadError({
          message: `${filesWithError.length} fichier(s) n'ont pas pu être uploadés. Veuillez réessayer ou les supprimer.`,
          failedFiles: filesWithError.map(f => f.name),
        });
        setIsSavingRequest(false);
        return null;
      }

      // Récupérer tous les fichiers uploadés avec succès
      const successfullyUploadedFiles = uploadedFiles.filter(
        f => f.uploadStatus === "success" && f.url
      );

      const uploadedDocuments = successfullyUploadedFiles.map(f => ({
        category: f.category,
        name: f.name,
        url: f.url,
      }));

      console.log(`📎 ${uploadedDocuments.length} documents déjà uploadés inclus dans la demande`);

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
        birthDate: formData.birthDate,
        maritalStatus: formData.maritalStatus,
        firstName2: formData.clientType === "couple" ? formData.firstName2 : undefined,
        lastName2: formData.clientType === "couple" ? formData.lastName2 : undefined,
        birthDate2: formData.clientType === "couple" ? formData.birthDate2 : undefined,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        npa: formData.npa,
        city: formData.city,
        // Fiscal
        canton: formData.canton,
        cantonName: cantons.find(c => c.code === formData.canton)?.name || formData.canton,
        cantonCode: formData.canton,
        // Suisse de l'étranger
        livesAbroad: formData.livesAbroad,
        countryOfResidence: formData.livesAbroad ? formData.countryOfResidence : undefined,
        countryOfResidenceName: formData.livesAbroad ? countriesAbroad.find(c => c.code === formData.countryOfResidence)?.name : undefined,
        abroadAddress: formData.livesAbroad ? formData.abroadAddress : undefined,
        taxYear: formData.taxYear,
        taxpayerNumber: formData.taxpayerNumber,
        declarationCode: formData.declarationCode,
        clientType: formData.clientType,
        familyStatus: formData.familyStatus,
        isIndependent: formData.isIndependent,
        employmentStatus: formData.employmentStatus,
        occupationRate: formData.occupationRate,
        employmentStatus2: formData.clientType === "couple" ? formData.employmentStatus2 : undefined,
        occupationRate2: formData.clientType === "couple" ? formData.occupationRate2 : undefined,
        // Situation
        hasMoved: formData.hasMoved,
        hasChildren: formData.hasChildren,
        childrenCount: formData.childrenCount,
        // Detailed children data
        children: childrenData.map(c => ({
          firstName: c.firstName,
          lastName: c.lastName,
          birthDate: c.birthDate,
          activity: c.activity,
          isDependent: c.isDependent,
          dependentPercentage: c.dependentPercentage,
          custodyType: c.custodyType,
          hasGuardCosts: c.hasGuardCosts,
          guardCostsAmount: c.guardCostsAmount,
          guardCostsDescription: c.guardCostsDescription,
        })),
        monthlyRent: formData.monthlyRent,
        // Identité bailleur (exigence NE, FR, JU)
        landlordName: formData.landlordName,
        landlordAddress: formData.landlordAddress,
        // Financial
        hasPillar3a: formData.hasPillar3a,
        pillar3aAmount: formData.pillar3aAmount,
        hasStocks: formData.hasStocks,
        stocksCount: formData.stocksCount,
        hasSoldStocks: formData.hasSoldStocks,
        soldStocksDetails: formData.hasSoldStocks ? formData.soldStocksDetails : undefined,
        hasGuardCosts: formData.hasGuardCosts,
        guardCosts: formData.guardCosts,
        hasMealsOutside: formData.hasMealsOutside,
        mealsOutsideDays: formData.mealsOutsideDays,
        hasMealsOutside2: formData.clientType === "couple" ? formData.hasMealsOutside2 : undefined,
        mealsOutsideDays2: formData.clientType === "couple" ? formData.mealsOutsideDays2 : undefined,
        hasAlimonyReceived: formData.hasAlimonyReceived,
        alimonyReceived: formData.alimonyReceived,
        hasAlimonyPaid: formData.hasAlimonyPaid,
        alimonyPaid: formData.alimonyPaid,
        hasDonations: formData.hasDonations,
        donationsAmount: formData.donationsAmount,
        hasDebts: formData.hasDebts,
        debtsAmount: formData.debtsAmount,
        // Independent business info
        businessType: formData.isIndependent ? formData.businessType : undefined,
        businessStartDate: formData.isIndependent ? formData.businessStartDate : undefined,
        hasIDE: formData.isIndependent ? formData.hasIDE : undefined,
        ideNumber: formData.isIndependent && formData.hasIDE ? formData.ideNumber : undefined,
        isRegisteredRC: formData.isIndependent ? formData.isRegisteredRC : undefined,
        hasVAT: formData.isIndependent ? formData.hasVAT : undefined,
        vatNumber: formData.isIndependent && formData.hasVAT ? formData.vatNumber : undefined,
        // Business finances
        hasBusinessAccounts: formData.isIndependent ? formData.hasBusinessAccounts : undefined,
        businessRevenue: formData.isIndependent && !formData.hasBusinessAccounts ? formData.businessRevenue : undefined,
        businessExpenses: formData.isIndependent && !formData.hasBusinessAccounts ? formData.businessExpenses : undefined,
        businessNetIncome: formData.isIndependent && !formData.hasBusinessAccounts && formData.businessRevenue && formData.businessExpenses
          ? String(Number(formData.businessRevenue) - Number(formData.businessExpenses))
          : undefined,
        // Social contributions
        hasAVSIndependent: formData.isIndependent ? formData.hasAVSIndependent : undefined,
        avsIndependentAmount: formData.isIndependent && formData.hasAVSIndependent ? formData.avsIndependentAmount : undefined,
        hasLPPVoluntary: formData.isIndependent ? formData.hasLPPVoluntary : undefined,
        lppVoluntaryAmount: formData.isIndependent && formData.hasLPPVoluntary ? formData.lppVoluntaryAmount : undefined,
        hasHomeOffice: formData.isIndependent ? formData.hasHomeOffice : undefined,
        homeOfficePercent: formData.isIndependent && formData.hasHomeOffice ? formData.homeOfficePercent : undefined,
        homeOfficeAmount: formData.isIndependent && formData.hasHomeOffice ? formData.homeOfficeAmount : undefined,
        hasBusinessVehicle: formData.isIndependent ? formData.hasBusinessVehicle : undefined,
        businessVehiclePercent: formData.isIndependent && formData.hasBusinessVehicle ? formData.businessVehiclePercent : undefined,
        businessVehicleExpenses: formData.isIndependent && formData.hasBusinessVehicle ? formData.businessVehicleExpenses : undefined,
        // Independent business info - Spouse (Adult 2)
        isIndependent2: formData.familyStatus === "couple" ? formData.isIndependent2 : undefined,
        businessType2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.businessType2 : undefined,
        businessStartDate2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.businessStartDate2 : undefined,
        hasIDE2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasIDE2 : undefined,
        ideNumber2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasIDE2 ? formData.ideNumber2 : undefined,
        isRegisteredRC2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.isRegisteredRC2 : undefined,
        hasVAT2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasVAT2 : undefined,
        vatNumber2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasVAT2 ? formData.vatNumber2 : undefined,
        hasBusinessAccounts2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasBusinessAccounts2 : undefined,
        businessRevenue2: formData.familyStatus === "couple" && formData.isIndependent2 && !formData.hasBusinessAccounts2 ? formData.businessRevenue2 : undefined,
        businessExpenses2: formData.familyStatus === "couple" && formData.isIndependent2 && !formData.hasBusinessAccounts2 ? formData.businessExpenses2 : undefined,
        businessNetIncome2: formData.familyStatus === "couple" && formData.isIndependent2 && !formData.hasBusinessAccounts2 && formData.businessRevenue2 && formData.businessExpenses2
          ? String(Number(formData.businessRevenue2) - Number(formData.businessExpenses2))
          : undefined,
        hasAVSIndependent2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasAVSIndependent2 : undefined,
        avsIndependentAmount2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasAVSIndependent2 ? formData.avsIndependentAmount2 : undefined,
        hasLPPVoluntary2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasLPPVoluntary2 : undefined,
        lppVoluntaryAmount2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasLPPVoluntary2 ? formData.lppVoluntaryAmount2 : undefined,
        hasHomeOffice2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasHomeOffice2 : undefined,
        homeOfficePercent2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasHomeOffice2 ? formData.homeOfficePercent2 : undefined,
        homeOfficeAmount2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasHomeOffice2 ? formData.homeOfficeAmount2 : undefined,
        hasBusinessVehicle2: formData.familyStatus === "couple" && formData.isIndependent2 ? formData.hasBusinessVehicle2 : undefined,
        businessVehiclePercent2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasBusinessVehicle2 ? formData.businessVehiclePercent2 : undefined,
        businessVehicleExpenses2: formData.familyStatus === "couple" && formData.isIndependent2 && formData.hasBusinessVehicle2 ? formData.businessVehicleExpenses2 : undefined,
        // Property
        hasProperty: formData.hasProperty,
        propertyCount: properties.length,
        hasSoldProperty: formData.hasSoldProperty,
        soldPropertyDetails: formData.hasSoldProperty ? formData.soldPropertyDetails : undefined,
        properties: properties.map(p => ({
          street: p.street,
          npa: p.npa,
          city: p.city,
          canton: p.canton,
          cantonName: allCantons.find(c => c.code === p.canton)?.name,
          parcelNumber: p.parcelNumber,
          propertyType: p.propertyType,
          propertyTypeName: propertyTypes.find(t => t.id === p.propertyType)?.name,
          usage: p.usage,
          usageName: propertyUsages.find(u => u.id === p.usage)?.name,
          ownershipShare: p.ownershipShare,
          acquisitionYear: p.acquisitionYear,
          constructionYear: p.constructionYear,
          maintenanceFlatRate: getMaintenanceFlatRate(p.constructionYear).rate,
          fiscalValue: p.fiscalValue,
          rentalValue: p.rentalValue,
          annualRent: p.annualRent,
          charges: p.charges,
          hasMortgage: p.hasMortgage,
          mortgageBalance: p.mortgageBalance,
          mortgageInterest: p.mortgageInterest,
          maintenanceCosts: p.maintenanceCosts,
          maintenanceType: p.maintenanceType,
        })),
        // Legacy fields (kept for backward compatibility)
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
        // Documents (déjà uploadés vers Cloudinary avant paiement)
        documents: uploadedDocuments,
      };

      // Sauvegarder la demande (documents seront uploadés après paiement)
      // Si une référence existe déjà, on met à jour la demande existante
      const response = await fetch("/api/tax-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...requestData,
          existingReference: taxRequestReference || undefined, // Envoyer la référence existante si elle existe
          _formToken: formToken, // Anti-spam protection
        }),
      });

      const data = await response.json();

      if (data.success && data.reference) {
        setTaxRequestReference(data.reference);
        if (data.existing) {
          console.log("📋 Demande existante récupérée:", data.reference, "| Message:", data.message);
        } else {
          console.log("📋 Demande fiscale sauvegardée:", data.reference, "| Storage:", data.storage);
        }
        if (data.warning) {
          console.warn("⚠️", data.warning);
        }
        return data.reference;
      } else {
        console.error("Erreur sauvegarde demande:", data.error);
        setSaveError(
          data.error || "Une erreur est survenue lors de l'enregistrement de votre demande. " +
          "Please try again. If the problem persists, contact us at contact@neofidu.ch"
        );
        return null;
      }
    } catch (error) {
      console.error("Exception sauvegarde demande:", error);
      setSaveError(
        "Connection error while saving. Check your internet connection and try again."
      );
      return null;
    } finally {
      setIsSavingRequest(false);
    }
  };

  const nextStep = async () => {
    // Protection contre les doubles clics
    if (isSavingRequest) {
      console.log("⏳ Sauvegarde déjà en cours, ignoré");
      return;
    }

    // Réinitialiser les erreurs avant de réessayer
    setSaveError(null);
    setUploadError(null);

    if (currentStep < steps.length) {
      // Si on passe à l'étape de paiement (step 9), sauvegarder d'abord
      if (currentStep === 8) {
        const reference = await saveTaxRequest();

        // CRITIQUE: Si la sauvegarde a échoué, bloquer la navigation vers le paiement
        // Les erreurs (uploadError ou saveError) sont déjà définies dans saveTaxRequest
        if (!reference) {
          console.error("❌ BLOQUÉ: Navigation vers paiement impossible - demande non sauvegardée");
          return; // Ne pas passer à l'étape suivante
        }

        console.log("✅ Demande sauvegardée avec succès, passage au paiement");
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
  // C'est ici que les documents sont uploadés vers Cloudinary ET les emails envoyés
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log("✅ Paiement réussi:", paymentIntentId);
    setIsProcessingPostPayment(true);
    setPostPaymentStatus("Finalisation de votre demande...");

    try {
      // 1. Les documents sont déjà uploadés AVANT le paiement (dans saveTaxRequest)
      // Car les objets File ne survivent pas à la redirection Stripe
      console.log("📄 Documents déjà uploadés avant paiement - pas de nouvel upload nécessaire");

      // 2. Les emails sont envoyés via le webhook Stripe (pas d'envoi direct pour éviter les doublons)
      setPostPaymentStatus("Finalisation...");
      console.log("📧 Emails seront envoyés via le webhook Stripe");

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
          {isEnglish ? "Payment confirmed!" : "Paiement confirmé !"}
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
          {isEnglish ? "Request saved!" : "Demande enregistrée !"}
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          Merci pour votre confiance. Vous recevrez un email de confirmation sous peu.
        </p>
        <div className="bg-primary/5 rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <div className="text-sm text-muted-foreground mb-2">{isEnglish ? "Amount paid (incl. tax)" : "Montant payé (TTC)"}</div>
          <div className="text-4xl font-bold text-primary">
            CHF {calculatePrice()}.
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {isEnglish ? "of which" : "dont"} CHF {calculateTVA().toFixed(2)} {isEnglish ? "VAT (8.1%)" : "de TVA (8.1%)"}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-mono text-lg text-primary font-bold">
            {isEnglish ? "Reference:" : "Référence:"} {taxRequestReference || "NF-XXXXXXXX"}
          </p>
          <p className="mt-4">
            {isEnglish ? "Documents sent:" : "Documents envoyés:"} {uploadedFiles.length} {isEnglish ? "file(s)" : "fichier(s)"}
          </p>
          <p className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            <strong>Important:</strong> {isEnglish ? "Please verify the receipt you received by email. This receipt confirms the" : "Veuillez bien vérifier la quittance que vous avez reçue par email. Cette quittance confirme le"} bon enregistrement de votre demande.
          </p>
        </div>

        {/* {isEnglish ? "Next steps" : "Prochaines étapes"} */}
        <div className="mt-8 text-left max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            {isEnglish ? "Next steps" : "Prochaines étapes"}
          </h3>

          {/* Notre travail */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700">Ce que fait NeoFidu</span>
            </div>
            <div className="space-y-3 ml-8">
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <p className="font-medium text-gray-900">{isEnglish ? "Document verification" : "Vérification des documents"}</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "Within 24-48h, we verify your documents and contact you if needed." : "Sous 24-48h, nous vérifions vos pièces et vous contactons si besoin."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">2</div>
                <div>
                  <p className="font-medium text-gray-900">{isEnglish ? "Completing your tax return" : "Remplissage de votre déclaration"}</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "Our experts complete your tax return (turnaround: 10 business days)." : "Nos experts complètent votre déclaration fiscale (délai: 10 jours ouvrables)."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">3</div>
                <div>
                  <p className="font-medium text-gray-900">{isEnglish ? "Submission to the tax authority" : "Envoi à l'administration fiscale"}</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "We submit your tax return directly to your canton's tax authority." : "Nous transmettons votre déclaration directement aux impôts de votre canton."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">4</div>
                <div>
                  <p className="font-medium text-gray-900">{isEnglish ? "Email confirmation" : "Confirmation par email"}</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "You receive the filing receipt confirming your return was successfully submitted." : "Vous recevez la quittance de dépôt confirmant que votre déclaration a bien été envoyée."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* {isEnglish ? "What the tax authority does" : "Ce que font les impôts"} */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700">{isEnglish ? "What the tax authority does" : "Ce que font les impôts"}</span>
            </div>
            <div className="space-y-3 ml-8">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">5</div>
                <div>
                  <p className="font-medium text-gray-900">{isEnglish ? "Processing your tax return" : "Traitement de votre déclaration"}</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "The tax authority reviews your return (turnaround: 2 to 6 months depending on the" : "L'administration fiscale analyse votre déclaration (délai: 2 à 6 mois selon le ca"}nton).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">6</div>
                <div>
                  <p className="font-medium text-gray-900">{isEnglish ? "Tax assessment decision" : "Décision de taxation"}</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "You receive a tax assessment notice with the final tax amount to pay (or" : "Vous recevez un avis de taxation avec le montant d'impôt définitif à payer (ou à"} récupérer).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">7</div>
                <div>
                  <p className="font-medium text-gray-900">Paiement ou remboursement</p>
                  <p className="text-sm text-gray-600">{isEnglish ? "You pay the remaining tax balance or receive a refund if you overpaid" : "Vous réglez le solde d'impôt ou recevez un remboursement si vous avez trop payé d"}'acomptes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Suivi */}
          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{isEnglish ? "Track your request at any time:" : "Suivez votre demande à tout moment :"}</span>{" "}
              <a href="/suivi" className="text-primary font-semibold hover:underline">
                {isEnglish ? "Tracking page →" : "Page de suivi →"}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isEnglish ? "A question? Contact us at" : "Une question ? Contactez-nous à"}{" "}
          <a href="mailto:contact@neofidu.ch" className="text-primary font-medium hover:underline">
            contact@neofidu.ch
          </a>
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
    if (confirm(isEnglish ? "Are you sure you want to start over? All your data will be deleted." : "Êtes-vous sûr de vouloir recommencer ? Toutes vos données seront effacées.")) {
      clearStorage();
      setCurrentStep(1);
      setFormData({
        canton: "",
        livesAbroad: false,
        countryOfResidence: "",
        abroadAddress: "",
        familyStatus: "",
        isIndependent: false,
        clientType: "",
        employmentStatus: "",
        occupationRate: "",
        employmentStatus2: "",
        occupationRate2: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        maritalStatus: "",
        firstName2: "",
        lastName2: "",
        birthDate2: "",
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
        hasMealsOutside: false,
        mealsOutsideDays: "",
        hasMealsOutside2: false,
        mealsOutsideDays2: "",
        hasAlimonyReceived: false,
        alimonyReceived: "",
        hasAlimonyPaid: false,
        alimonyPaid: "",
        monthlyRent: "",
        landlordName: "",
        landlordAddress: "",
        healthInsurance: "",
        hasPillar3a: false,
        pillar3aAmount: "",
        hasDonations: false,
        donationsAmount: "",
        hasDebts: false,
        debtsAmount: "",
        // Indépendants
        businessType: "",
        businessStartDate: "",
        hasIDE: false,
        ideNumber: "",
        isRegisteredRC: false,
        hasVAT: false,
        vatNumber: "",
        hasBusinessAccounts: false,
        businessRevenue: "",
        businessExpenses: "",
        businessNetIncome: "",
        hasAVSIndependent: false,
        avsIndependentAmount: "",
        hasLPPVoluntary: false,
        lppVoluntaryAmount: "",
        hasHomeOffice: false,
        homeOfficePercent: "",
        homeOfficeAmount: "",
        hasBusinessVehicle: false,
        businessVehiclePercent: "",
        businessVehicleExpenses: "",
        // Indépendants - Conjoint (Adulte 2)
        isIndependent2: false,
        businessType2: "",
        businessStartDate2: "",
        hasIDE2: false,
        ideNumber2: "",
        isRegisteredRC2: false,
        hasVAT2: false,
        vatNumber2: "",
        hasBusinessAccounts2: false,
        businessRevenue2: "",
        businessExpenses2: "",
        businessNetIncome2: "",
        hasAVSIndependent2: false,
        avsIndependentAmount2: "",
        hasLPPVoluntary2: false,
        lppVoluntaryAmount2: "",
        hasHomeOffice2: false,
        homeOfficePercent2: "",
        homeOfficeAmount2: "",
        hasBusinessVehicle2: false,
        businessVehiclePercent2: "",
        businessVehicleExpenses2: "",
        hasProperty: false,
        propertyCount: 1,
        hasMortgage: false,
        mortgageAmount: "",
        hasRenovations: false,
        renovationsAmount: "",
        hasStocks: false,
        stocksCount: 1,
        hasSoldProperty: false,
        soldPropertyDetails: "",
        hasSoldStocks: false,
        soldStocksDetails: "",
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
      setProperties([]);
      setUploadedFiles([]);
      setChildrenData([]);
      setTaxRequestReference("");
      setHasResumedFromStorage(false);
      setLostFilesFromPreviousSession([]);
    }
  };

  return (
    <div>
      {hasResumedFromStorage && (
        <div className="mb-6 space-y-3">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Reprise de votre demande</p>
                <p className="text-xs text-muted-foreground">
                  {isEnglish ? "You resumed where you left off. Your data is saved automatically." : "Vous avez repris là où vous en étiez. Vos données sont sauvegardées automatiquement."}
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

          {/* Avertissement fichiers perdus */}
          {lostFilesFromPreviousSession.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-amber-800">
                    {isEnglish ? "Documents to re-upload" : "Documents à re-uploader"}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    {isEnglish ? `${lostFilesFromPreviousSession.length} file(s) uploaded in your previous session must be re-uploa` : `${lostFilesFromPreviousSession.length} fichier(s) uploadé(s) lors de votre précédente session doivent être re-uploa`}dés à l'étape 7 (Documents) :
                  </p>
                  <ul className="mt-2 text-xs text-amber-700 list-disc list-inside">
                    {lostFilesFromPreviousSession.slice(0, 3).map((f, i) => (
                      <li key={i}>{f.name}</li>
                    ))}
                    {lostFilesFromPreviousSession.length > 3 && (
                      <li>... et {lostFilesFromPreviousSession.length - 3} autre(s)</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
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
          <span className="text-muted-foreground">{isEnglish ? "Step" : "Étape"} {currentStep}:</span>{" "}
          <span className="font-medium">{isEnglish ? stepsEn[currentStep - 1] : steps[currentStep - 1]}</span>
        </div>
        <div className="text-center text-xs mt-1.5">
          {currentStep === 1 ? <span className="text-emerald-600 font-medium">🚀 {isEnglish ? "Let's go!" : "C'est parti !"}</span> : currentStep <= 3 ? <span className="text-emerald-600 font-medium">👍 {isEnglish ? "Good start!" : "Bon début !"}</span> : currentStep === 4 ? <span className="text-emerald-600 font-medium">🌗 {isEnglish ? "Almost halfway!" : "Presque la moitié !"}</span> : currentStep <= 6 ? <span className="text-blue-600 font-medium">💪 {isEnglish ? "More than halfway!" : "Plus de la moitié !"}</span> : currentStep <= 8 ? <span className="text-amber-600 font-medium">✨ {isEnglish ? "Almost done!" : "Presque fini !"}</span> : <span className="text-primary font-medium">🎉 {isEnglish ? "Final stretch!" : "Dernière ligne droite !"}</span>}
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-emerald-500/50 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative flex items-center gap-3 bg-white dark:bg-gray-900 border border-primary/20 rounded-2xl px-5 py-3 shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{isEnglish ? "Estimated fee" : isEnglish ? "Estimated fee" : "Tarif estimé"}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">CHF {calculatePrice()}</span>
                <span className="text-sm text-muted-foreground">.-</span>
                <span className="text-xs text-muted-foreground ml-1">TTC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-6 md:p-8">
        {/* Step 1: Canton */}
        {currentStep === 1 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <CantonIllustration className="w-24 h-24 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {isEnglish ? "Tax Return Preparation" : "Établissement de votre déclaration d'impôt"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish ? "In which canton should the tax return be filed?" : "Dans quel canton la déclaration doit-elle être établie ?"}
                </p>
              </div>
            </div>
            {/* Afficher les cantons SEULEMENT si pas de résidence à l'étranger */}
            {!formData.livesAbroad && (
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
            )}

            {/* Section Suisses de l'étranger */}
            <div className={`mt-8 p-5 bg-gradient-to-r from-blue-50 to-teal-50 border-2 ${formData.livesAbroad ? 'border-primary' : 'border-blue-200'} rounded-xl`}>
              <div className="flex items-start gap-4">
                <div
                  onClick={() => {
                    const newValue = !formData.livesAbroad;
                    updateForm("livesAbroad", newValue);
                    if (!newValue) {
                      updateForm("countryOfResidence", "");
                    } else {
                      // Effacer le canton quand on sélectionne "résidence à l'étranger"
                      updateForm("canton", "");
                    }
                  }}
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all flex-shrink-0 mt-0.5 ${
                    formData.livesAbroad
                      ? "bg-primary border-primary"
                      : "border-gray-300 hover:border-primary/50"
                  }`}
                >
                  {formData.livesAbroad && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className="font-semibold text-gray-800 cursor-pointer"
                    onClick={() => {
                      const newValue = !formData.livesAbroad;
                      updateForm("livesAbroad", newValue);
                      if (!newValue) {
                        updateForm("countryOfResidence", "");
                      } else {
                        updateForm("canton", "");
                      }
                    }}
                  >
                    {isEnglish ? "I currently reside abroad" : "Je réside actuellement à l'étranger"}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {isEnglish ? "Swiss living abroad with tax obligations in Switzerland (real estate, Swiss-source income, etc.)" : "Suisse de l'étranger avec obligations fiscales en Suisse (propriété immobilière, revenus de source suisse, etc.)"}
                  </p>
                </div>
              </div>

              {/* Options si réside à l'étranger */}
              {formData.livesAbroad && (
                <div className="mt-4 pt-4 border-t border-blue-200 space-y-4">
                  {/* Canton où se trouve le bien/revenu suisse */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dans quel canton se trouve votre bien immobilier ou source de revenu en Suisse ? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {cantons.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => updateForm("canton", c.code)}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                            formData.canton === c.code
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-primary/30"
                          }`}
                        >
                          <div className="text-center font-semibold text-sm">{c.name}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {isEnglish ? "The return will be filed in the canton where your property is located or from which your income" : "La déclaration sera établie dans le canton où se situe votre bien immobilier ou d'où provi"}ent votre revenu de source suisse.
                    </p>
                  </div>

                  {/* Pays de résidence */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isEnglish ? "In which country do you currently reside?" : "Dans quel pays résidez-vous actuellement ?"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.countryOfResidence}
                      onChange={(e) => updateForm("countryOfResidence", e.target.value)}
                      className="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">{isEnglish ? "Select your country of residence" : "Sélectionnez votre pays de résidence"}</option>
                      {countriesAbroad.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Adresse complète à l'étranger */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isEnglish ? "Your full address abroad" : "Votre adresse complète à l'étranger"}
                    </label>
                    <Textarea
                      value={formData.abroadAddress}
                      onChange={(e) => updateForm("abroadAddress", e.target.value)}
                      placeholder={isEnglish ? "Street, number, postal code, city, region/state..." : "Rue, numéro, code postal, ville, région/état..."}
                      className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary min-h-[80px]"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {isEnglish ? "Enter your full residence address abroad (street, number, postal code, city" : "Indiquez votre adresse complète de résidence à l'étranger (rue, numéro, code postal, ville"}).
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800 flex items-start gap-2">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        {isEnglish ? "A supplement of <strong>CHF 50.-</strong> applies to returns for Swiss abroad (management of con" : "Un supplément de <strong>CHF 50.-</strong> s'applique pour les déclarations des Suisses de l'étranger (gestion des con"}ventions de double imposition, complexité accrue).
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Note quasi-résident / TOU */}
            <div className="mt-8 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 mb-1">
                    {isEnglish ? "Source tax / Quasi-resident?" : "Impôt à la source / Quasi-résident ?"}
                  </p>
                  <p className="text-sm text-purple-700">
                    {isEnglish
                      ? "If you are subject to withholding tax (Quellensteuer) and wish to request ordinary taxation (TOU) or quasi-resident status, please "
                      : "Si vous êtes imposé à la source et souhaitez faire une demande de taxation ordinaire (TOU) ou de statut quasi-résident, veuillez "}
                    <a href="/#contact" className="text-purple-900 hover:underline font-bold">
                      {isEnglish ? "contact us for a personalized quote" : "nous contacter pour un devis personnalisé"}
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Message d'aide si champs manquants */}
            {!canProceed() && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">{isEnglish ? "Required information" : "Informations requises"}</p>
                  <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc list-inside">
                    {!formData.canton && !formData.livesAbroad && (
                      <li>{isEnglish ? "Please select your canton" : "Sélectionnez le canton de votre déclaration"}</li>
                    )}
                    {!formData.canton && formData.livesAbroad && (
                      <li>{isEnglish ? "Select the canton where your property/income is in Switzerland" : "Sélectionnez le canton où se trouve votre bien/revenu en Suisse"}</li>
                    )}
                    {formData.livesAbroad && !formData.countryOfResidence && (
                      <li>{isEnglish ? "Select your current country of residence" : "Sélectionnez votre pays de résidence actuel"}</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Type de déclaration (2 questions) */}
        {currentStep === 2 && (
          <div className="space-y-10">
            {/* Question 1: Situation familiale */}
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {isEnglish ? "Are you single or in a couple?" : "Êtes-vous seul(e) ou en couple ?"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isEnglish ? "Choose according to your tax situation." : "Choisissez selon votre situation fiscale."}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {familyStatusOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => updateForm("familyStatus", option.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                      formData.familyStatus === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <option.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1">{isEnglish ? (option.nameEn || option.name) : option.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {isEnglish ? (option.descriptionEn || option.description) : option.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 2: Situation professionnelle (affiché seulement si familyStatus sélectionné) */}
            {formData.familyStatus && (
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-2">
                  {isEnglish ? "What is your professional situation?" : "Quelle est votre situation professionnelle ?"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {formData.familyStatus === "couple"
                    ? isEnglish ? "Indicate if one of the spouses is self-employed." : "Indiquez si l'un des conjoints exerce une activité indépendante."
                    : isEnglish ? "Indicate if you are self-employed." : "Indiquez si vous exercez une activité indépendante."}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {professionalStatusOptions.map((option) => {
                    const isSelected = option.id === "independent" ? formData.isIndependent : !formData.isIndependent;
                    return (
                      <div
                        key={option.id}
                        onClick={() => updateForm("isIndependent", option.id === "independent")}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                          <option.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold mb-1">{isEnglish ? (option.nameEn || option.name) : option.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {option.id === "independent"
                              ? (formData.familyStatus === "couple" ? (isEnglish ? (option.descriptionCoupleEn || option.descriptionCouple) : option.descriptionCouple) : (isEnglish ? (option.descriptionSingleEn || option.descriptionSingle) : option.descriptionSingle))
                              : (isEnglish ? (option.descriptionEn || option.description) : option.description)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Coordonnées */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isEnglish ? "Your contact details" : "Vos coordonnées"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isEnglish ? "This information is required to prepare your tax return." : "Ces informations sont nécessaires pour établir votre déclaration."}
            </p>

            {/* {isEnglish ? "Tax year" : "Année fiscale"} et numéros fiscaux */}
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {isEnglish ? "Information from your tax letter" : "Informations de votre lettre d'impôts"}
              </h3>
              <p className="text-sm text-amber-700 mb-4">
                {isEnglish ? "You will find this information on the letter from the tax administration." : "Vous trouverez ces informations sur la lettre de l'administration fiscale."}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEnglish ? "Tax year" : "Année fiscale"}
                  </label>
                  <select
                    value={formData.taxYear}
                    onChange={(e) => updateForm("taxYear", Number.parseInt(e.target.value))}
                    className="w-full p-3 rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {[...Array(5)].map((_, i) => {
                      const year = new Date().getFullYear() - 1 - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <TooltipProvider>
                   <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
                     {isEnglish ? "Taxpayer No. " : "Nº contribuable "}<span className="text-red-500">*</span>
                     <Tooltip>
                       <TooltipTrigger asChild>
                         <button type="button" className="text-muted-foreground hover:text-primary transition-colors">
                           <HelpCircle className="w-4 h-4" />
                         </button>
                       </TooltipTrigger>
                       <TooltipContent side="top" className="max-w-xs">
                         <p className="text-sm font-medium">{isEnglish ? "📄 Where to find this number ?" : "📄 Où trouver ce numéro ?"}</p>
                         <p className="text-xs mt-1">{isEnglish ? "On your tax letter, top right. Format: " : "Sur votre courrier fiscal, en haut à droite. Format : "}<strong>123.456.789</strong></p>
                       </TooltipContent>
                     </Tooltip>
                   </label>
                 </TooltipProvider>
                  <Input
                    placeholder="Ex: 123.456.789"
                    value={formData.taxpayerNumber}
                    onChange={(e) => {
                      updateForm("taxpayerNumber", e.target.value);
                    }}
                    onBlur={(e) => {
                      // Valider à la perte de focus
                      if (e.target.value.trim() !== "") {
                        const validation = validateTaxpayerNumber(e.target.value, formData.canton);
                        if (!validation.valid) {
                          setValidationErrors(prev => ({ ...prev, taxpayerNumber: validation.error || isEnglish ? "Invalid number" : "Numéro invalide" }));
                        } else {
                          setValidationErrors(prev => ({ ...prev, taxpayerNumber: "" }));
                        }
                      }
                    }}
                    className={`rounded-xl ${validationErrors.taxpayerNumber ? "border-red-500 focus:ring-red-500" : "border-amber-300"}`}
                  />
                  {validationErrors.taxpayerNumber ? (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {validationErrors.taxpayerNumber}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      {isEnglish ? "Find this number on your tax letter" : "Trouvez ce numéro sur votre courrier fiscal"}
                    </p>
                  )}
                </div>
                <div>
                  <TooltipProvider>
                    <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      {formData.canton && cantonCodeInfo[formData.canton]
                        ? (isEnglish ? cantonCodeInfo[formData.canton].labelEn : cantonCodeInfo[formData.canton].label)
                        : (isEnglish ? "Control code" : "Code de contrôle")} <span className="text-red-500">*</span>
                      {formData.canton && cantonCodeInfo[formData.canton] && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-amber-600 hover:text-amber-800">
                              <HelpCircle className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                         <p className="text-sm font-medium">{isEnglish ? "📄 Where to find this code ?" : "📄 Où trouver ce code ?"}</p>
                         <p className="text-xs mt-1">{isEnglish ? "On your tax letter (same document as the taxpayer number). The code var" : "Sur votre courrier fiscal (même fiche que le N° contribuable). Le code var"}ie selon votre canton.</p>
                       </TooltipContent>
                        </Tooltip>
                      )}
                    </label>
                  </TooltipProvider>
                  <Input
                    placeholder={formData.canton && cantonCodeInfo[formData.canton]
                      ? cantonCodeInfo[formData.canton].placeholder
                      : "Ex: ABCD1234"}
                    value={formData.declarationCode}
                    onChange={(e) => updateForm("declarationCode", e.target.value)}
                    className="rounded-xl border-amber-300"
                  />
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {formData.canton && cantonCodeInfo[formData.canton]
                      ? (isEnglish ? cantonCodeInfo[formData.canton].sourceEn : cantonCodeInfo[formData.canton].source)
                      : isEnglish ? "Unique code for your tax return" : "Code unique de votre déclaration"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? "First name" : "Prénom"} <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder={isEnglish ? "Your first name" : "Votre prénom"}
                  value={formData.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? "Last name" : "Nom"} <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder={isEnglish ? "Your last name" : "Votre nom"}
                  value={formData.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* {isEnglish ? "Date of birth" : "Date de naissance"} */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? "Date of birth" : "Date de naissance"} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => {
                    updateForm("birthDate", e.target.value);
                    // Valider immédiatement à chaque changement
                    const validation = validateBirthDate(e.target.value);
                    if (!validation.valid) {
                      setValidationErrors(prev => ({ ...prev, birthDate: validation.error || "Date invalide" }));
                    } else {
                      setValidationErrors(prev => ({ ...prev, birthDate: "" }));
                    }
                  }}
                  onBlur={(e) => {
                    // Re-valider à la perte de focus
                    const validation = validateBirthDate(e.target.value);
                    if (!validation.valid) {
                      setValidationErrors(prev => ({ ...prev, birthDate: validation.error || "Date invalide" }));
                    }
                  }}
                  className={`rounded-xl ${validationErrors.birthDate ? "border-red-500 focus:ring-red-500" : ""}`}
                  max={new Date().toISOString().split('T')[0]}
                  min="1900-01-01"
                />
                {validationErrors.birthDate && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {validationErrors.birthDate}
                  </p>
                )}
              </div>

                            {/* {isEnglish ? "Residence status" : "Statut de résidence"} */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? "Residence status" : "Statut de résidence"}
                </label>
                <select
                  value={formData.residenceStatus}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateForm('residenceStatus', value);
                  }}
                  className="w-full p-3 rounded-xl border border-input bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">{isEnglish ? "Select residence status" : "Sélectionner statut de résidence"}</option>
                  {residenceStatuses.map(s => (
                    <option key={s.id} value={s.id}>{isEnglish ? (s.nameEn || s.name) : s.name}</option>
                  ))}
                </select>
              </div>

{/* État civil */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? "Marital status" : "État civil"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => updateForm("maritalStatus", e.target.value)}
                  className="w-full p-3 rounded-xl border border-input bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">{isEnglish ? "Select..." : "Sélectionnez..."}</option>
                  {maritalStatuses
                    // Filtrer les états civils selon la situation familiale
                    .filter((status) => {
                      if (formData.familyStatus === "single") {
                        // Pour les déclarations individuelles, exclure isEnglish ? "Married" : "Marié(e)" et isEnglish ? "Registered partnership" : "Partenariat enregistré"
                        return status.id !== "married" && status.id !== "partnership";
                      }
                      if (formData.familyStatus === "couple") {
                        // Pour les déclarations communes, seuls isEnglish ? "Married" : "Marié(e)" et isEnglish ? "Registered partnership" : "Partenariat enregistré" sont valides
                        return status.id === "married" || status.id === "partnership";
                      }
                      return true;
                    })
                    .map((status) => (
                      <option key={status.id} value={status.id}>
                        {isEnglish ? (status.nameEn || status.name) : status.name}
                      </option>
                    ))}
                </select>
                {formData.familyStatus === "single" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Si vous êtes marié(e) ou en partenariat enregistré, veuillez sélectionner isEnglish ? "Joint return" : "Déclaration commune" à l'étape précédente.
                  </p>
                )}
              </div>

              {/* Second adulte pour les couples */}
              {formData.clientType === "couple" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Partner's first name" : "Prénom du conjoint"} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder={isEnglish ? "Partner's first name" : "Prénom du conjoint"}
                      value={formData.firstName2}
                      onChange={(e) => updateForm("firstName2", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom du conjoint <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Nom du conjoint"
                      value={formData.lastName2}
                      onChange={(e) => updateForm("lastName2", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Date of birth" : "Date de naissance"} du conjoint <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.birthDate2}
                      onChange={(e) => {
                        updateForm("birthDate2", e.target.value);
                        // Valider immédiatement à chaque changement
                        const validation = validateBirthDate(e.target.value);
                        if (!validation.valid) {
                          setValidationErrors(prev => ({ ...prev, birthDate2: validation.error || "Date invalide" }));
                        } else {
                          setValidationErrors(prev => ({ ...prev, birthDate2: "" }));
                        }
                      }}
                      onBlur={(e) => {
                        // Re-valider à la perte de focus
                        const validation = validateBirthDate(e.target.value);
                        if (!validation.valid) {
                          setValidationErrors(prev => ({ ...prev, birthDate2: validation.error || "Date invalide" }));
                        }
                      }}
                      className={`rounded-xl ${validationErrors.birthDate2 ? "border-red-500 focus:ring-red-500" : ""}`}
                      max={new Date().toISOString().split('T')[0]}
                      min="1900-01-01"
                    />
                    {validationErrors.birthDate2 && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {validationErrors.birthDate2}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Residence status" : "Statut de résidence"} du conjoint
                    </label>
                    <select
                      value={formData.residenceStatus2}
                      onChange={(e) => {
                        const value = e.target.value;
                        updateForm('residenceStatus2', value);
                      }}
                      className="w-full p-3 rounded-xl border border-input bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="">{isEnglish ? "Select residence status" : "Sélectionner statut de résidence"}</option>
                      {residenceStatuses.map(s => (
                        <option key={s.id} value={s.id}>{isEnglish ? (s.nameEn || s.name) : s.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="md:col-start-1">
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="votre@email.ch"
                  value={formData.email}
                  onChange={(e) => {
                    updateForm("email", e.target.value);
                  }}
                  onBlur={(e) => {
                    // Valider à la perte de focus
                    if (e.target.value.trim() !== "") {
                      const validation = validateEmail(e.target.value);
                      if (!validation.valid) {
                        setValidationErrors(prev => ({ ...prev, email: validation.error || "Email invalide" }));
                      } else {
                        setValidationErrors(prev => ({ ...prev, email: "" }));
                      }
                    }
                  }}
                  className={`rounded-xl ${validationErrors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? "Phone" : "Téléphone"}
                </label>
                <Input
                  type="tel"
                  placeholder="+41 79 123 45 67"
                  value={formData.phone}
                  onChange={(e) => {
                    updateForm("phone", e.target.value);
                    // Ne pas effacer l'erreur pendant la saisie si le champ est non-vide
                    if (e.target.value.trim() === "") {
                      setValidationErrors(prev => ({ ...prev, phone: "" }));
                    }
                  }}
                  onBlur={(e) => {
                    // Valider à la perte de focus si le champ n'est pas vide
                    if (e.target.value.trim() !== "") {
                      const validation = validatePhone(e.target.value);
                      if (!validation.valid) {
                        setValidationErrors(prev => ({ ...prev, phone: validation.error || (isEnglish ? "Phone invalid" : "Téléphone invalide") }));
                      } else {
                        setValidationErrors(prev => ({ ...prev, phone: "" }));
                      }
                    }
                  }}
                  className={`rounded-xl ${validationErrors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {validationErrors.phone ? (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {validationErrors.phone}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    Format suisse: +41 79 123 45 67 ou 079 123 45 67
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Adresse actuelle</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEnglish ? "Street and number" : "Rue et numéro"} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Rue de l'exemple 123"
                    value={formData.street}
                    onChange={(e) => updateForm("street", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      NPA <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="1000"
                      value={formData.npa}
                      onChange={(e) => updateForm("npa", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "City" : "Localité"} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Lausanne"
                      value={formData.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasMoved}
                  onChange={(e) => updateForm("hasMoved", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? `I moved during tax year ${formData.taxYear}` : `J'ai déménagé durant l'année fiscale ${formData.taxYear}`}</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Situation */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Votre situation
            </h2>
            <p className="text-muted-foreground mb-8">
              {isEnglish ? "This information allows us to tailor your tax return." : "Ces informations nous permettent d'adapter votre déclaration."}
            </p>

            {/* Statut d'emploi (pour non-indépendants ou couples avec indépendant) */}
            {formData.clientType !== "independent" && (
              <div className="mb-8">
                <h3 className="font-semibold mb-4">
                  Votre statut d'emploi {formData.firstName && `(${formData.firstName})`}
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {employmentStatuses
                    .filter((status) => {
                      // Montrer "Indépendant(e)" seulement pour les couples qui ont coché indépendant
                      if (status.id === "selfemployed") {
                        return formData.familyStatus === "couple" && formData.isIndependent;
                      }
                      return true;
                    })
                    .map((status) => (
                    <div
                      key={status.id}
                      onClick={() => updateForm("employmentStatus", status.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.employmentStatus === status.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="font-medium">{isEnglish ? (status.nameEn || status.name) : status.name}</div>
                      <div className="text-sm text-muted-foreground">{isEnglish ? (status.descriptionEn || status.description) : status.description}</div>
                    </div>
                  ))}
                </div>

                {/* {isEnglish ? "Employment rate" : "Taux d'occupation"} pour les salariés */}
                {formData.employmentStatus === "employed" && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <label className="block text-sm font-medium mb-2 text-blue-800">
                      {isEnglish ? "Employment rate" : "Taux d'occupation"} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Ex: 80"
                        value={formData.occupationRate}
                        onChange={(e) => updateForm("occupationRate", e.target.value)}
                        className="w-32 rounded-xl"
                      />
                      <span className="text-blue-800 font-medium">%</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                      Indiquez votre pourcentage de travail (ex: 100% pour temps plein, 80% pour 4 jours/semaine)
                    </p>
                  </div>
                )}

                {/* Statut du conjoint pour les couples */}
                {formData.clientType === "couple" && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">
                      Statut de votre conjoint {formData.firstName2 && `(${formData.firstName2})`}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-3">
                      {employmentStatuses
                        .filter((status) => {
                          // Montrer "Indépendant(e)" seulement si le conjoint a coché indépendant
                          if (status.id === "selfemployed") {
                            return formData.isIndependent2;
                          }
                          return true;
                        })
                        .map((status) => (
                        <div
                          key={status.id}
                          onClick={() => updateForm("employmentStatus2", status.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.employmentStatus2 === status.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="font-medium">{isEnglish ? (status.nameEn || status.name) : status.name}</div>
                          <div className="text-sm text-muted-foreground">{isEnglish ? (status.descriptionEn || status.description) : status.description}</div>
                        </div>
                      ))}
                    </div>

                    {/* {isEnglish ? "Employment rate" : "Taux d'occupation"} pour le conjoint salarié */}
                    {formData.employmentStatus2 === "employed" && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <label className="block text-sm font-medium mb-2 text-blue-800">
                          {isEnglish ? "Employment rate" : "Taux d'occupation"} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="Ex: 80"
                            value={formData.occupationRate2}
                            onChange={(e) => updateForm("occupationRate2", e.target.value)}
                            className="w-32 rounded-xl"
                          />
                          <span className="text-blue-800 font-medium">%</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          Indiquez le pourcentage de travail du conjoint
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Section trajets professionnels - Adulte 1 */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">
                Trajets professionnels {formData.firstName && `(${formData.firstName})`}
              </h3>
              {workplaces1.map((workplace, index) => (
                <div key={workplace.id} className="mb-4 p-4 border rounded-xl bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">Lieu de travail {index + 1}</span>
                    {workplaces1.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWorkplace(1, workplace.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <Input
                      placeholder="Nom de l'employeur"
                      value={workplace.employerName}
                      onChange={(e) => updateWorkplace(1, workplace.id, "employerName", e.target.value)}
                      className="rounded-xl"
                    />
                    <Input
                      placeholder="Adresse du lieu de travail"
                      value={workplace.workplaceAddress}
                      onChange={(e) => updateWorkplace(1, workplace.id, "workplaceAddress", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    {transportModes.map((mode) => (
                      <div
                        key={mode.id}
                        onClick={() => updateWorkplace(1, workplace.id, "transportMode", mode.id)}
                        className={`p-2 rounded-lg border text-center cursor-pointer transition-all text-sm ${
                          workplace.transportMode === mode.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        {isEnglish ? (mode.nameEn || mode.name) : mode.name}
                      </div>
                    ))}
                  </div>
                  {(workplace.transportMode === "train" || workplace.transportMode === "car") && (
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        type="number"
                        placeholder={isEnglish ? "Working days/year" : "Jours de travail/an"}
                        value={workplace.daysPerYear}
                        onChange={(e) => updateWorkplace(1, workplace.id, "daysPerYear", e.target.value)}
                        className="rounded-xl"
                      />
                      <Input
                        type="number"
                        placeholder="Distance aller (km)"
                        value={workplace.distanceKm}
                        onChange={(e) => updateWorkplace(1, workplace.id, "distanceKm", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                  {workplace.transportMode === "car" && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <label className="block text-sm font-medium text-amber-800 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {isEnglish ? "Vehicle use justification" : "Justification de l'utilisation du véhicule"} <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder={isEnglish ? "E.g.: No public transport available, irregular hours, professional equipment transport, physical disability, unserved workplace..." : "Ex: Pas de transports publics disponibles, horaires irréguliers, transport de matériel professionnel, handicap physique, lieu de travail non desservi..."}
                        value={workplace.carJustification}
                        onChange={(e) => updateWorkplace(1, workplace.id, "carJustification", e.target.value)}
                        className="rounded-xl min-h-[80px] bg-white"
                      />
                      <p className="text-xs text-amber-700 mt-2">
                        {isEnglish ? "The tax authority requires justification for vehicle cost deductions. Examples: no public transport, irregular hours, tool transport, disability." : "L'administration fiscale exige une justification pour la déduction des frais de véhicule. Exemples : absence de transports publics, horaires décalés, transport d'outils, handicap."}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addWorkplace(1)}
                className="rounded-full"
              >
                <Plus className="w-4 h-4 mr-1" />
                {isEnglish ? "Add a workplace" : "Ajouter un lieu de travail"}
              </Button>
            </div>

            {/* Section trajets professionnels - Adulte 2 (couple) */}
            {formData.clientType === "couple" && (
              <div className="mb-8">
                <h3 className="font-semibold mb-4">
                  Trajets professionnels {formData.firstName2 ? `(${formData.firstName2})` : "(conjoint)"}
                </h3>
                {workplaces2.map((workplace, index) => (
                  <div key={workplace.id} className="mb-4 p-4 border rounded-xl bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">Lieu de travail {index + 1}</span>
                      {workplaces2.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkplace(2, workplace.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <Input
                        placeholder="Nom de l'employeur"
                        value={workplace.employerName}
                        onChange={(e) => updateWorkplace(2, workplace.id, "employerName", e.target.value)}
                        className="rounded-xl"
                      />
                      <Input
                        placeholder="Adresse du lieu de travail"
                        value={workplace.workplaceAddress}
                        onChange={(e) => updateWorkplace(2, workplace.id, "workplaceAddress", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                      {transportModes.map((mode) => (
                        <div
                          key={mode.id}
                          onClick={() => updateWorkplace(2, workplace.id, "transportMode", mode.id)}
                          className={`p-2 rounded-lg border text-center cursor-pointer transition-all text-sm ${
                            workplace.transportMode === mode.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          {isEnglish ? (mode.nameEn || mode.name) : mode.name}
                        </div>
                      ))}
                    </div>
                    {(workplace.transportMode === "train" || workplace.transportMode === "car") && (
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input
                          type="number"
                          placeholder={isEnglish ? "Working days/year" : "Jours de travail/an"}
                          value={workplace.daysPerYear}
                          onChange={(e) => updateWorkplace(2, workplace.id, "daysPerYear", e.target.value)}
                          className="rounded-xl"
                        />
                        <Input
                          type="number"
                          placeholder="Distance aller (km)"
                          value={workplace.distanceKm}
                          onChange={(e) => updateWorkplace(2, workplace.id, "distanceKm", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    )}
                    {workplace.transportMode === "car" && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <label className="block text-sm font-medium text-amber-800 mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          {isEnglish ? "Vehicle use justification" : "Justification de l'utilisation du véhicule"} <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          placeholder={isEnglish ? "E.g.: No public transport available, irregular hours, professional equipment transport, physical disability, unserved workplace..." : "Ex: Pas de transports publics disponibles, horaires irréguliers, transport de matériel professionnel, handicap physique, lieu de travail non desservi..."}
                          value={workplace.carJustification}
                          onChange={(e) => updateWorkplace(2, workplace.id, "carJustification", e.target.value)}
                          className="rounded-xl min-h-[80px] bg-white"
                        />
                        <p className="text-xs text-amber-700 mt-2">
                          {isEnglish ? "The tax authority requires justification for vehicle cost deductions. Examples: no public transport, irregular hours, tool transport, disability." : "L'administration fiscale exige une justification pour la déduction des frais de véhicule. Exemples : absence de transports publics, horaires décalés, transport d'outils, handicap."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addWorkplace(2)}
                  className="rounded-full"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {isEnglish ? "Add a workplace" : "Ajouter un lieu de travail"}
                </Button>
              </div>
            )}

            {/* Repas hors domicile */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              {/* Contribuable 1 */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasMealsOutside}
                  onChange={(e) => updateForm("hasMealsOutside", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-medium">
                    {formData.clientType === "couple"
                      ? `${formData.firstName || "Contribuable 1"} — ${isEnglish ? "I eat outside home most" : "je mange hors du domicile la majorité"}  des jours de travail`
                      : "Je mange hors du domicile lors de mes jours de travail"}
                  </span>
                  <p className="text-sm text-blue-600 mt-1">
                    {isEnglish ? "Deductible if you cannot go home during the lunch break" : "Déductible si vous ne pouvez pas rentrer chez vous pendant la pause de midi"}
                  </p>
                </div>
              </label>
              {formData.hasMealsOutside && (
                <div className="mt-4 ml-8">
                  <label className="block text-sm font-medium mb-2">
                    {isEnglish ? "Number of days per year eating outside" : "Nombre de jours par année où vous mangez à l’extérieur"}
                    {formData.clientType === "couple" && ` (${formData.firstName || "Contribuable 1"})`}
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="260"
                    placeholder="Ex: 220"
                    value={formData.mealsOutsideDays}
                    onChange={(e) => updateForm("mealsOutsideDays", e.target.value)}
                    className="w-32 rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isEnglish ? "About 220 days for full-time employment" : "Environ 220 jours pour un emploi à 100%"}
                  </p>
                </div>
              )}
              {/* Conjoint(e) — affiché uniquement pour un couple */}
              {formData.clientType === "couple" && (
                <div className="border-t border-blue-200 mt-4 pt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasMealsOutside2}
                      onChange={(e) => updateForm("hasMealsOutside2", e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-medium">
                        {formData.firstName2 || "Conjoint(e)"} — {isEnglish ? "eats outside home most" : "mange hors du domicile la majorité des"} jours de travail
                      </span>
                      <p className="text-sm text-blue-600 mt-1">
                        {isEnglish ? "Deductible if the partner cannot go home during the lunch break" : "Déductible si le/la conjoint(e) ne peut pas rentrer chez lui/elle pendant la pau"}se de midi
                      </p>
                    </div>
                  </label>
                  {formData.hasMealsOutside2 && (
                    <div className="mt-4 ml-8">
                      <label className="block text-sm font-medium mb-2">
                        {isEnglish ? `Number of days per year ${formData.firstName2 || "the partner"} eats` : `Nombre de jours par année où ${formData.firstName2 || "le/la conjoint(e)"} mange`} à l’extérieur
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="260"
                        placeholder="Ex: 220"
                        value={formData.mealsOutsideDays2}
                        onChange={(e) => updateForm("mealsOutsideDays2", e.target.value)}
                        className="w-32 rounded-xl"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {isEnglish ? "About 220 days for full-time employment" : "Environ 220 jours pour un emploi à 100%"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enfants à charge */}
            <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => {
                    const hasKids = e.target.checked;
                    updateForm("hasChildren", hasKids);
                    // Initialize with one child if checking and no children exist
                    if (hasKids && childrenData.length === 0) {
                      setChildrenData([createEmptyChild()]);
                    }
                    // Clear children data if unchecking
                    if (!hasKids) {
                      setChildrenData([]);
                      updateForm("childrenCount", 0);
                    }
                  }}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <span className="font-semibold text-gray-800">{isEnglish ? "I have dependent children" : "J'ai des enfants à charge"}</span>
                  <p className="text-sm text-gray-600">{isEnglish ? "Minors or adults in education up to age 25" : "Mineurs ou majeurs en formation jusqu'à 25"} ans</p>
                </div>
              </label>

              {formData.hasChildren && (
                <div className="mt-4">
                  <ChildrenSection
                    children={childrenData}
                    onChildrenChange={(newChildren) => {
                      setChildrenData(newChildren);
                      // Keep childrenCount in sync
                      updateForm("childrenCount", newChildren.length);
                    }}
                    maritalStatus={formData.maritalStatus}
                    hasGuardCosts={formData.hasGuardCosts}
                    onHasGuardCostsChange={(value) => updateForm("hasGuardCosts", value)}
                  />
                </div>
              )}
            </div>

            {/* 3ème pilier */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasPillar3a}
                  onChange={(e) => updateForm("hasPillar3a", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? "I made contributions to pillar 3a" : "J'ai effectué des versements au 3ème pilier A"}</span>
              </label>
            </div>

            {/* Pensions alimentaires */}
            <div className="mb-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasAlimonyReceived}
                  onChange={(e) => updateForm("hasAlimonyReceived", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? "I receive alimony payments" : "Je reçois des pensions alimentaires"}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasAlimonyPaid}
                  onChange={(e) => updateForm("hasAlimonyPaid", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>Je verse des pensions alimentaires</span>
              </label>
            </div>

            {/* Dons */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasDonations}
                  onChange={(e) => updateForm("hasDonations", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? "I made donations to charitable organizations" : "J'ai fait des dons à des organisations d'utilité publique"}</span>
              </label>
            </div>

            {/* Dettes */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasDebts}
                  onChange={(e) => updateForm("hasDebts", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? "I have debts (personal loans, leasing, etc.)" : "J'ai des dettes (prêts personnels, leasing, etc.)"}</span>
              </label>
            </div>

            {/* Actions/titres */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasStocks}
                  onChange={(e) => updateForm("hasStocks", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? "I own shares, funds or bonds" : "Je possède des actions, fonds ou obligations"}</span>
              </label>
              {formData.hasStocks && (
                <div className="mt-4 ml-8">
                  <label className="block text-sm font-medium mb-2">
                    Nombre de positions (lignes de titres)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.stocksCount || ""}
                    onChange={(e) => updateForm("stocksCount", Number.parseInt(e.target.value) || 1)}
                    className="w-24 rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isEnglish ? "CHF 20 supplement from 3 positions" : "Supplément de CHF 20 dès 3 positions"}
                  </p>
                </div>
              )}
            </div>

            {/* Vente de titres durant l'année */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasSoldStocks}
                  onChange={(e) => updateForm("hasSoldStocks", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-blue-400 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium">{isEnglish ? "I sold shares, funds or bonds during the year" : "J'ai vendu des actions, fonds ou obligations durant l'année"} {formData.taxYear}</span>
                  <p className="text-sm text-blue-700 mt-1">
                    {isEnglish ? "Gains/losses must be documented" : "Les gains/pertes doivent être documentés"}
                  </p>
                </div>
              </label>

              {formData.hasSoldStocks && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Sale details (securities sold, approximate amounts)" : "Détails des ventes (titres vendus, montants approximatifs)"}
                    </label>
                    <textarea
                      value={formData.soldStocksDetails}
                      onChange={(e) => updateForm("soldStocksDetails", e.target.value)}
                      placeholder={`${isEnglish ? "E.g.: Sale of 50 Nestlé shares in March" : "Ex: Vente de 50 actions Nestlé en mars"} ${formData.taxYear}, vente de parts de fonds UBS en octobre...`}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary min-h-[80px]"
                    />
                  </div>
                  <div className="p-3 bg-white border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>{isEnglish ? "Documents required:" : "Documents à fournir :"}</strong> {isEnglish ? "Transaction statements from your bank/broker" : "Relevés de transactions de votre banque/courtier"} (Swissquote, PostFinance, UBS, etc.) montrant les achats et ventes effectués.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      {isEnglish ? "Note: In Switzerland, capital gains on securities are generally tax-exempt for" : "Note : En Suisse, les gains en capital sur titres sont généralement exonérés pour les"} investisseurs privés, mais doivent quand même être documentés.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* === SECTION ACTIVITÉ INDÉPENDANTE === */}
            {formData.isIndependent && (
              <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-300 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-800">
                  <Briefcase className="w-6 h-6" />
                  {isEnglish ? "Self-employed activity" : "Activité indépendante"}
                </h3>
                <p className="text-sm text-amber-700 mb-6">
                  {isEnglish ? "This information is essential for correctly preparing your tax return as" : "Ces informations sont essentielles pour établir correctement votre déclaration en tan"}t qu'indépendant.
                </p>

                {/* Type d'activité */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Type of activity" : "Type d'activité"} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder={isEnglish ? "E.g.: Consultant, craftsman, trader..." : "Ex: Consultant, artisan, commerçant..."}
                      value={formData.businessType}
                      onChange={(e) => updateForm("businessType", e.target.value)}
                      className="rounded-xl bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Activity start date" : "Date de début d'activité"}
                    </label>
                    <Input
                      type="date"
                      value={formData.businessStartDate}
                      onChange={(e) => updateForm("businessStartDate", e.target.value)}
                      className="rounded-xl bg-white"
                    />
                  </div>
                </div>

                {/* Numéros officiels */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasIDE}
                        onChange={(e) => updateForm("hasIDE", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "I have a UID number (Company Identification)" : "J'ai un numéro IDE (Identifiant des Entreprises)"}</span>
                        <p className="text-xs text-muted-foreground">Format: CHE-123.456.789</p>
                      </div>
                    </label>
                    {formData.hasIDE && (
                      <div className="mt-3 ml-8">
                        <Input
                          placeholder="CHE-123.456.789"
                          value={formData.ideNumber}
                          onChange={(e) => updateForm("ideNumber", e.target.value)}
                          className="rounded-xl w-48"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isRegisteredRC}
                        onChange={(e) => updateForm("isRegisteredRC", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">Je suis inscrit au Registre du Commerce</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Required from CHF 100'000 in turnover" : "Obligatoire dès CHF 100'000 de chiffre d'affaires"}</p>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasVAT}
                        onChange={(e) => updateForm("hasVAT", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "I am subject to VAT" : "Je suis assujetti à la TVA"}</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Required from CHF 100'000 in annual turnover" : "Obligatoire dès CHF 100'000 de chiffre d'affaires annuel"}</p>
                      </div>
                    </label>
                    {formData.hasVAT && (
                      <div className="mt-3 ml-8">
                        <Input
                          placeholder={isEnglish ? "VAT number (CHE-...VAT)" : "Numéro TVA (CHE-...TVA)"}
                          value={formData.vatNumber}
                          onChange={(e) => updateForm("vatNumber", e.target.value)}
                          className="rounded-xl w-48"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Cotisations sociales */}
                <h4 className="font-semibold mb-3 text-amber-800">Cotisations sociales</h4>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasAVSIndependent}
                        onChange={(e) => updateForm("hasAVSIndependent", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "Self-employed AVS/AHV contributions" : "Cotisations AVS/AI/APG indépendant"}</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Personal contributions paid to the compensation fund" : "Cotisations personnelles versées à la caisse de compensation"}</p>
                      </div>
                    </label>
                    {formData.hasAVSIndependent && (
                      <div className="mt-3 ml-8 flex items-center gap-2">
                        <span className="text-sm">CHF</span>
                        <Input
                          type="number"
                          placeholder="Montant annuel"
                          value={formData.avsIndependentAmount}
                          onChange={(e) => updateForm("avsIndependentAmount", e.target.value)}
                          className="rounded-xl w-32"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasLPPVoluntary}
                        onChange={(e) => updateForm("hasLPPVoluntary", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "Optional 2nd pillar (BVG)" : "2ème pilier facultatif (LPP)"}</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Voluntary contributions to the 2nd pillar - deductible!" : "Cotisations volontaires au 2ème pilier - déductibles!"}</p>
                      </div>
                    </label>
                    {formData.hasLPPVoluntary && (
                      <div className="mt-3 ml-8 flex items-center gap-2">
                        <span className="text-sm">CHF</span>
                        <Input
                          type="number"
                          placeholder="Montant annuel"
                          value={formData.lppVoluntaryAmount}
                          onChange={(e) => updateForm("lppVoluntaryAmount", e.target.value)}
                          className="rounded-xl w-32"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Chiffres de l'activité - IMPORTANT */}
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl mb-6">
                  <h4 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {isEnglish ? "Your business result" : "Résultat de votre activité"} <span className="text-red-500">*</span>
                  </h4>
                  <p className="text-sm text-red-700 mb-4">
                    {isEnglish ? "To prepare your tax return, we need to know your business result (profit or" : "Pour établir votre déclaration, nous avons besoin de connaître le résultat de votre activi"}té indépendante.
                    {formData.canton === "VD" && (
                      <span className="block mt-1 font-medium">
                        ⚠️ Le canton de Vaud exige également le isEnglish ? "General self-employed questionnaire" : "Questionnaire général indépendant" à joindre à vos documents.
                      </span>
                    )}
                  </p>

                  <div className="p-4 bg-white rounded-xl border mb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasBusinessAccounts}
                        onChange={(e) => updateForm("hasBusinessAccounts", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "I have prepared accounts and profit/loss statement" : "Je dispose d'un bilan et compte de résultat préparés"}</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Document to attach in the Documents step" : "Document à joindre à l'étape Documents"}</p>
                      </div>
                    </label>
                  </div>

                  {!formData.hasBusinessAccounts && (
                    <div className="space-y-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="text-sm text-amber-800 font-medium">
                        {isEnglish ? "If you don't have prepared accounts, enter at minimum your key figures:" : "Si vous n'avez pas de comptabilité préparée, indiquez au minimum vos chiffres clés :"}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Chiffre d'affaires annuel <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">CHF</span>
                            <Input
                              type="number"
                              placeholder="Total des recettes"
                              value={formData.businessRevenue}
                              onChange={(e) => updateForm("businessRevenue", e.target.value)}
                              className="rounded-xl bg-white"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{isEnglish ? "Total revenue from your activity" : "Total des revenus de votre activité"}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Total des charges annuelles <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">CHF</span>
                            <Input
                              type="number"
                              placeholder="Total des charges"
                              value={formData.businessExpenses}
                              onChange={(e) => updateForm("businessExpenses", e.target.value)}
                              className="rounded-xl bg-white"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{isEnglish ? "Rent, equipment, insurance, etc." : "Loyer, matériel, assurances, etc."}</p>
                        </div>
                      </div>
                      {formData.businessRevenue && formData.businessExpenses && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-medium text-green-800">
                            {`${isEnglish ? "Estimated net profit" : "Bénéfice net estimé"} : CHF ${(Number(formData.businessRevenue) - Number(formData.businessExpenses)).toLocaleString('fr-CH')}.-`}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Frais professionnels */}
                <h4 className="font-semibold mb-3 text-amber-800">Frais professionnels</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasHomeOffice}
                        onChange={(e) => updateForm("hasHomeOffice", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "Home office" : "Bureau à domicile"}</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Share of rent allocated to professional activity" : "Part du loyer attribuée à l'activité professi"}onnelle</p>
                      </div>
                    </label>
                    {formData.hasHomeOffice && (
                      <div className="mt-3 ml-8 grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            max="50"
                            placeholder="%"
                            value={formData.homeOfficePercent}
                            onChange={(e) => updateForm("homeOfficePercent", e.target.value)}
                            className="rounded-xl w-20"
                          />
                          <span className="text-sm">% de la surface</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">CHF</span>
                          <Input
                            type="number"
                            placeholder="Montant annuel"
                            value={formData.homeOfficeAmount}
                            onChange={(e) => updateForm("homeOfficeAmount", e.target.value)}
                            className="rounded-xl w-32"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-white rounded-xl border">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasBusinessVehicle}
                        onChange={(e) => updateForm("hasBusinessVehicle", e.target.checked)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="font-medium">{isEnglish ? "Business vehicle" : "Véhicule professionnel"}</span>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Share of vehicle costs allocated to professional activity" : "Part des frais de véhicule attribuée à l'acti"}vité</p>
                      </div>
                    </label>
                    {formData.hasBusinessVehicle && (
                      <div className="mt-3 ml-8 grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="%"
                            value={formData.businessVehiclePercent}
                            onChange={(e) => updateForm("businessVehiclePercent", e.target.value)}
                            className="rounded-xl w-20"
                          />
                          <span className="text-sm">% utilisation pro</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">CHF</span>
                          <Input
                            type="number"
                            placeholder={isEnglish ? "Total vehicle costs" : "Frais totaux véhicule"}
                            value={formData.businessVehicleExpenses}
                            onChange={(e) => updateForm("businessVehicleExpenses", e.target.value)}
                            className="rounded-xl w-32"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-3 bg-amber-100 rounded-xl text-sm text-amber-800">
                  <strong>{isEnglish ? "Reminder:" : "Rappel :"}</strong> {isEnglish ? "Don't forget to upload your annual accounts (balance sheet + profit" : "N'oubliez pas de télécharger vos comptes annuels (bilan + compte"} de résultat) à l'étape Documents.
                </div>
              </div>
            )}

            {/* === SECTION ACTIVITÉ INDÉPENDANTE CONJOINT (ADULTE 2) === */}
            {formData.familyStatus === "couple" && (
              <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-800">
                  <Users className="w-5 h-5" />
                  {isEnglish ? "Self-employed activity" : "Activité indépendante"} du conjoint
                </h3>
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={formData.isIndependent2}
                    onChange={(e) => updateForm("isIndependent2", e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-blue-400 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">{isEnglish ? `${formData.firstName2 || "The partner"} has a self-employed activity` : `${formData.firstName2 || "Le conjoint"} a une activité indépendante`}</span>
                    <p className="text-sm text-blue-700">{isEnglish ? "Check if your partner is self-employed" : "Cochez si votre conjoint exerce une activité lucrative indépendante"}</p>
                  </div>
                </label>

                {formData.isIndependent2 && (
                  <div className="mt-4 p-4 bg-white border border-blue-200 rounded-xl">
                    <h4 className="font-semibold mb-4 text-blue-800">
                      {isEnglish ? "Self-employed activity" : "Activité indépendante"} de {formData.firstName2 || "votre conjoint"}
                    </h4>

                    {/* Type d'activité */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {isEnglish ? "Type of activity" : "Type d'activité"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder={isEnglish ? "E.g.: Consultant, craftsman, trader..." : "Ex: Consultant, artisan, commerçant..."}
                          value={formData.businessType2}
                          onChange={(e) => updateForm("businessType2", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {isEnglish ? "Activity start date" : "Date de début d'activité"}
                        </label>
                        <Input
                          type="date"
                          value={formData.businessStartDate2}
                          onChange={(e) => updateForm("businessStartDate2", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Numéros officiels */}
                    <div className="space-y-4 mb-6">
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.hasIDE2}
                            onChange={(e) => updateForm("hasIDE2", e.target.checked)}
                            className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <span className="font-medium text-sm">{isEnglish ? "UID number" : "Numéro IDE"}</span>
                            <span className="text-xs text-muted-foreground ml-2">(CHE-123.456.789)</span>
                          </div>
                        </label>
                        {formData.hasIDE2 && (
                          <div className="mt-2 ml-7">
                            <Input
                              placeholder="CHE-123.456.789"
                              value={formData.ideNumber2}
                              onChange={(e) => updateForm("ideNumber2", e.target.value)}
                              className="rounded-lg w-48 text-sm"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isRegisteredRC2}
                            onChange={(e) => updateForm("isRegisteredRC2", e.target.checked)}
                            className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">Inscrit au RC</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.hasVAT2}
                            onChange={(e) => updateForm("hasVAT2", e.target.checked)}
                            className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">Assujetti TVA</span>
                        </label>
                      </div>
                      {formData.hasVAT2 && (
                        <Input
                          placeholder={isEnglish ? "VAT number" : "Numéro TVA"}
                          value={formData.vatNumber2}
                          onChange={(e) => updateForm("vatNumber2", e.target.value)}
                          className="rounded-lg w-48 text-sm"
                        />
                      )}
                    </div>

                    {/* {isEnglish ? "Key figures" : "Chiffres clés"} */}
                    <h5 className="font-medium mb-3 text-blue-800">{isEnglish ? "Key figures" : "Chiffres clés"}</h5>
                    <div className="space-y-4 mb-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.hasBusinessAccounts2}
                          onChange={(e) => updateForm("hasBusinessAccounts2", e.target.checked)}
                          className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">{isEnglish ? "Has prepared accounts and profit/loss statement" : "Dispose d'un bilan et compte de résultat"}</span>
                      </label>

                      {!formData.hasBusinessAccounts2 && (
                        <div className="grid md:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-xs font-medium mb-1">Chiffre d'affaires annuel *</label>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">CHF</span>
                              <Input
                                type="number"
                                placeholder="CA annuel"
                                value={formData.businessRevenue2}
                                onChange={(e) => updateForm("businessRevenue2", e.target.value)}
                                className="rounded-lg text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">Charges annuelles *</label>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">CHF</span>
                              <Input
                                type="number"
                                placeholder="Charges"
                                value={formData.businessExpenses2}
                                onChange={(e) => updateForm("businessExpenses2", e.target.value)}
                                className="rounded-lg text-sm"
                              />
                            </div>
                          </div>
                          {formData.businessRevenue2 && formData.businessExpenses2 && (
                            <div className="md:col-span-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                              {`${isEnglish ? "Estimated net profit" : "Bénéfice net estimé"} : CHF ${(Number(formData.businessRevenue2) - Number(formData.businessExpenses2)).toLocaleString('fr-CH')}.-`}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Cotisations sociales */}
                    <h5 className="font-medium mb-3 text-blue-800">Cotisations sociales</h5>
                    <div className="space-y-3 mb-6">
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.hasAVSIndependent2}
                            onChange={(e) => updateForm("hasAVSIndependent2", e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm">{isEnglish ? "Self-employed AVS" : "AVS indépendant"}</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.hasLPPVoluntary2}
                            onChange={(e) => updateForm("hasLPPVoluntary2", e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm">{isEnglish ? "Optional 2nd pillar" : "2ème pilier facultatif"}</span>
                        </label>
                      </div>
                      {formData.hasAVSIndependent2 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Cotisations AVS : CHF</span>
                          <Input
                            type="number"
                            value={formData.avsIndependentAmount2}
                            onChange={(e) => updateForm("avsIndependentAmount2", e.target.value)}
                            className="rounded-lg w-28 text-sm"
                          />
                        </div>
                      )}
                      {formData.hasLPPVoluntary2 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Cotisations LPP : CHF</span>
                          <Input
                            type="number"
                            value={formData.lppVoluntaryAmount2}
                            onChange={(e) => updateForm("lppVoluntaryAmount2", e.target.value)}
                            className="rounded-lg w-28 text-sm"
                          />
                        </div>
                      )}
                    </div>

                    {/* Frais professionnels */}
                    <h5 className="font-medium mb-3 text-blue-800">Frais professionnels</h5>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.hasHomeOffice2}
                          onChange={(e) => updateForm("hasHomeOffice2", e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm">{isEnglish ? "Home office" : "Bureau à domicile"}</span>
                      </label>
                      {formData.hasHomeOffice2 && (
                        <div className="flex items-center gap-3 ml-6">
                          <Input
                            type="number"
                            placeholder="%"
                            value={formData.homeOfficePercent2}
                            onChange={(e) => updateForm("homeOfficePercent2", e.target.value)}
                            className="rounded-lg w-16 text-sm"
                          />
                          <span className="text-xs">% surface</span>
                          <span className="text-sm">CHF</span>
                          <Input
                            type="number"
                            placeholder="Montant"
                            value={formData.homeOfficeAmount2}
                            onChange={(e) => updateForm("homeOfficeAmount2", e.target.value)}
                            className="rounded-lg w-24 text-sm"
                          />
                        </div>
                      )}

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.hasBusinessVehicle2}
                          onChange={(e) => updateForm("hasBusinessVehicle2", e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-sm">{isEnglish ? "Business vehicle" : "Véhicule professionnel"}</span>
                      </label>
                      {formData.hasBusinessVehicle2 && (
                        <div className="flex items-center gap-3 ml-6">
                          <Input
                            type="number"
                            placeholder="%"
                            value={formData.businessVehiclePercent2}
                            onChange={(e) => updateForm("businessVehiclePercent2", e.target.value)}
                            className="rounded-lg w-16 text-sm"
                          />
                          <span className="text-xs">% pro</span>
                          <span className="text-sm">CHF</span>
                          <Input
                            type="number"
                            placeholder="Frais"
                            value={formData.businessVehicleExpenses2}
                            onChange={(e) => updateForm("businessVehicleExpenses2", e.target.value)}
                            className="rounded-lg w-24 text-sm"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-4 p-2 bg-blue-100 rounded-lg text-xs text-blue-800">
                      <strong>{isEnglish ? "Reminder:" : "Rappel :"}</strong> {isEnglish ? "Upload your partner's annual accounts in the Documents step." : "Téléchargez les comptes annuels du conjoint à l'étape Documents."}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Immobilier */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Biens immobiliers
            </h2>
            <p className="text-muted-foreground mb-8">
              {isEnglish ? "Indicate if you own real estate properties." : "Indiquez si vous êtes propriétaire de biens immobiliers."}
            </p>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasProperty}
                  onChange={(e) => {
                    updateForm("hasProperty", e.target.checked);
                    // Si on coche et qu'il n'y a pas de propriété, en ajouter une
                    if (e.target.checked && properties.length === 0) {
                      addProperty();
                    }
                    // Si on décoche, vider le tableau
                    if (!e.target.checked) {
                      setProperties([]);
                    }
                  }}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                />
                <span>{isEnglish ? "I own one or more real estate properties" : "Je suis propriétaire d'un ou plusieurs biens immobiliers"}</span>
              </label>
            </div>

            {/* Vente immobilière durant l'année */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasSoldProperty}
                  onChange={(e) => updateForm("hasSoldProperty", e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-amber-400 text-amber-600 focus:ring-amber-500"
                />
                <div>
                  <span className="font-medium">{isEnglish ? `I sold a real estate property during the year ${formData.taxYear}` : `J'ai vendu un bien immobilier durant l'année ${formData.taxYear}`}</span>
                  <p className="text-sm text-amber-700 mt-1">
                    {isEnglish ? "Important for the real estate gains tax (IGT)" : "Important pour l'impôt sur les gains immobiliers (IGI)"}
                  </p>
                </div>
              </label>

              {formData.hasSoldProperty && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEnglish ? "Sale details (address, date, approximate price)" : "Détails de la vente (adresse, date, prix approximatif)"}
                    </label>
                    <textarea
                      value={formData.soldPropertyDetails}
                      onChange={(e) => updateForm("soldPropertyDetails", e.target.value)}
                      placeholder={`${isEnglish ? "E.g.: Apartment in Lausanne sold in June" : "Ex: Appartement à Lausanne vendu en juin"} ${formData.taxYear} pour CHF 850'000.-`}
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary min-h-[80px]"
                    />
                  </div>
                  <div className="p-3 bg-white border border-amber-300 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>{isEnglish ? "Documents required:" : "Documents à fournir :"}</strong> {isEnglish ? "Notarized deed of sale, real estate tax on capital gains (if received), original deed of purchase, invoices for value-added work." : "Acte de vente notarié, bordereau de l'impôt sur les gains immobiliers (si reçu), acte d'achat original, factures des travaux de plus-value."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {formData.hasProperty && (
              <div className="space-y-6">
                {/* Liste des biens */}
                {properties.map((property, index) => (
                  <Card key={property.id} className="p-6 border-2 border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Home className="w-5 h-5 text-primary" />
                        {isEnglish ? "Property No." : "Bien n°"}{index + 1}
                      </h3>
                      {properties.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProperty(property.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
                        </Button>
                      )}
                    </div>

                    <div className="space-y-6">
                      {/* Affichage des erreurs de validation */}
                      {validateProperty(property).length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800">Champs obligatoires manquants :</p>
                              <ul className="text-xs text-red-700 mt-1 list-disc pl-4">
                                {validateProperty(property).map((error, i) => (
                                  <li key={i}>{error}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Adresse du bien */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          Adresse du bien
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                              {isEnglish ? "Street and number" : "Rue et numéro"} <span className="text-red-500">*</span>
                            </label>
                            <Input
                              placeholder="Ex: Rue de la Gare 15"
                              value={property.street}
                              onChange={(e) => updateProperty(property.id, "street", e.target.value)}
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              NPA <span className="text-red-500">*</span>
                            </label>
                            <Input
                              placeholder="Ex: 1000"
                              value={property.npa}
                              onChange={(e) => updateProperty(property.id, "npa", e.target.value)}
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {isEnglish ? "City" : "Localité"} <span className="text-red-500">*</span>
                            </label>
                            <Input
                              placeholder="Ex: Lausanne"
                              value={property.city}
                              onChange={(e) => updateProperty(property.id, "city", e.target.value)}
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Canton du bien <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={property.canton}
                              onChange={(e) => updateProperty(property.id, "canton", e.target.value)}
                              className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                            >
                              <option value="">{isEnglish ? "Select the canton" : "Sélectionnez le canton"}</option>
                              {allCantons.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                              {isEnglish ? "Cadastral parcel number" : "N° de parcelle cadastrale"}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{isEnglish ? "The parcel number can be found on the deed of sale, tax estimate, or land" : "Le numéro de parcelle figure sur l'acte de vente, l'estimation fiscale, ou le regi"}stre foncier. Il permet d'identifier précisément votre bien.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </label>
                            <Input
                              placeholder="Ex: 1234 ou RF-VD-12345"
                              value={property.parcelNumber}
                              onChange={(e) => updateProperty(property.id, "parcelNumber", e.target.value)}
                              className="rounded-xl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Type et usage */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {isEnglish ? "Property type" : "Type de bien"} <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={property.propertyType}
                            onChange={(e) => updateProperty(property.id, "propertyType", e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">{isEnglish ? "Select the type" : "Sélectionnez le type"}</option>
                            {propertyTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {isEnglish ? (type.nameEn || type.name) : type.name} - {isEnglish ? (type.descriptionEn || type.description) : type.description}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {isEnglish ? "Property usage" : "Usage du bien"} <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={property.usage}
                            onChange={(e) => updateProperty(property.id, "usage", e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">{isEnglish ? "Select the usage" : "Sélectionnez l'usage"}</option>
                            {propertyUsages.map((usage) => (
                              <option key={usage.id} value={usage.id}>
                                {isEnglish ? (usage.nameEn || usage.name) : usage.name} - {isEnglish ? (usage.descriptionEn || usage.description) : usage.description}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Part de propriété et années */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            {isEnglish ? "Your ownership share (%)" : "Votre quote-part (%)"}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p><strong>{isEnglish ? "Married couple:" : "Couple marié :"}</strong> {isEnglish ? "Enter 100% (you file jointly)." : "Indiquez 100% (vous déclarez ensemble)."}</p>
                                  <p className="mt-1"><strong>{isEnglish ? "Co-ownership with a third party:" : "Copropriété avec un tiers :"}</strong> {isEnglish ? "Enter your actual share (e.g. 50% if you share with a relative)." : "Indiquez votre part réelle (ex: 50% si vous partagez avec un parent)."}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="100"
                            value={property.ownershipShare}
                            onChange={(e) => updateProperty(property.id, "ownershipShare", e.target.value)}
                            className="rounded-xl"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {isEnglish ? "Married couple = 100% • Co-ownership with third party = your share" : "Couple marié = 100% • Copropriété avec tiers = votre part"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {isEnglish ? "Year of acquisition" : "Année d'acquisition"}
                          </label>
                          <Input
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            placeholder="Ex: 2015"
                            value={property.acquisitionYear}
                            onChange={(e) => updateProperty(property.id, "acquisitionYear", e.target.value)}
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            {isEnglish ? "Year of construction" : "Année de construction"}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{isEnglish ? "The year of construction determines the flat-rate deductible maintenance costs: 10% if less than 10 years old, 20% if more than 10 years old." : "L'année de construction détermine le forfait de frais d'entretien déductible : 10% si moins de 10 ans, 20% si plus de 10 ans."}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </label>
                          <Input
                            type="number"
                            min="1800"
                            max={new Date().getFullYear()}
                            placeholder="Ex: 1985"
                            value={property.constructionYear}
                            onChange={(e) => updateProperty(property.id, "constructionYear", e.target.value)}
                            className="rounded-xl"
                          />
                          {property.constructionYear && (
                            <p className="text-xs text-primary font-medium mt-1">
                              {isEnglish ? "Flat rate: " : "Forfait : "}{getMaintenanceFlatRate(property.constructionYear).label}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Aide forfait vs frais effectifs */}
                      {property.constructionYear && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-amber-800">
                              <p className="font-medium mb-1">{isEnglish ? "Flat rate or actual costs?" : "Forfait ou frais effectifs ?"}</p>
                              <p className="mb-2">
                                {isEnglish ? `For this property (${new Date().getFullYear() - parseInt(property.constructionYear)} years), you can deduct:` : `Pour ce bien (${new Date().getFullYear() - parseInt(property.constructionYear)} ans), vous pouvez déduire :`}
                              </p>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>
                                  <strong>{isEnglish ? "Flat rate" : "Forfait"} {getMaintenanceFlatRate(property.constructionYear).rate}%</strong> {isEnglish ? "of the rental value" : "de la valeur locative"}
                                  {property.rentalValue && (
                                    <span className="text-amber-600"> = CHF {Math.round(parseInt(property.rentalValue) * getMaintenanceFlatRate(property.constructionYear).rate / 100)}.-</span>
                                  )}
                                </li>
                                <li><strong>{isEnglish ? "Actual costs" : "Frais effectifs"}</strong>: {isEnglish ? "Total maintenance invoices (paint, repairs, garden...)" : "Total de vos factures d'entretien (peinture, réparations, jardin...)"}</li>
                              </ul>
                              <p className="mt-2 font-medium">
                                {isEnglish ? "Tip: Choose the higher option. If your invoices exceed the flat rate, opt for actual costs." : "Conseil : Choisissez l'option la plus élevée. Si vos factures dépassent le forfait, optez pour les frais effectifs."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Valeurs fiscales */}
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Calculator className="w-4 h-4 text-blue-600" />
                          {isEnglish ? "Tax values" : "Valeurs fiscales"}
                        </h4>

                        {/* Aide contextuelle détaillée */}
                        <div className="mb-4 p-3 bg-blue-100/50 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-blue-800">
                              <p className="font-medium mb-1">{isEnglish ? "Where to find this information?" : "Où trouver ces informations ?"}</p>
                              <ul className="list-disc pl-4 space-y-0.5">
                                <li><strong>{isEnglish ? "Cantonal tax estimate" : "Estimation fiscale cantonale"}</strong>: {isEnglish ? "Official document received at purchase or during a reassessment" : "Document officiel reçu lors de l'achat ou lors d'une réévaluation"}</li>
                                <li><strong>{isEnglish ? "Tax assessment notice" : "Avis de taxation"}</strong> : {isEnglish ? "Your last processed tax return (real estate annex)" : "Votre dernière déclaration d'impôts traitée (annexe immobilière)"}</li>
                                <li><strong>{isEnglish ? "Land register" : "Registre foncier"}</strong> : {isEnglish ? "Extract from your municipality's land register" : "Extrait du registre foncier de votre commune"}</li>
                                {property.canton === "VD" && <li><strong>Canton de Vaud</strong> : {isEnglish ? "Cantonal portal www.vd.ch/impots - section \"My property\"" : "Portail cantonal www.vd.ch/impots - rubrique \"Mon bien immobilier\""}</li>}
                                {property.canton === "GE" && <li><strong>{isEnglish ? "Canton of Geneva" : "Canton de Genève"}</strong> : e-démarches.ge.ch - {isEnglish ? "Fiscal value of your property" : "Valeur fiscale de votre bien"}</li>}
                                {property.canton === "VS" && <li><strong>{isEnglish ? "Canton of Valais" : "Canton du Valais"}</strong> : {isEnglish ? "Estimate on the municipal property tax assessment" : "Estimation sur l'avis d'impôt foncier communal"}</li>}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                              {isEnglish ? "Tax value (CHF)" : "Valeur fiscale (CHF)"} <span className="text-red-500">*</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{isEnglish ? "The tax value is used to calculate wealth tax. It is generally lower than market value (60-80% depending on canton)." : "La valeur fiscale sert à calculer l'impôt sur la fortune. Elle est généralement inférieure à la valeur de marché (60-80% selon les cantons)."}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </label>
                            <Input
                              type="number"
                              placeholder="Ex: 500000"
                              value={property.fiscalValue}
                              onChange={(e) => updateProperty(property.id, "fiscalValue", e.target.value)}
                              className="rounded-xl"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {isEnglish ? "Cadastral value / tax estimate" : "Valeur cadastrale / estimation fiscale"}
                            </p>
                          </div>
                          {(property.usage === "main_residence" || property.usage === "secondary_residence" || property.usage === "free_use") && (
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {isEnglish ? "Annual rental value (CHF)" : "Valeur locative annuelle (CHF)"}
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 18000"
                                value={property.rentalValue}
                                onChange={(e) => updateProperty(property.id, "rentalValue", e.target.value)}
                                className="rounded-xl"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                {isEnglish ? "Shown on the tax estimate" : "Figure sur l'estimation fiscale"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Revenus locatifs (si loué) */}
                      {(property.usage === "rented" || property.usage === "rented_furnished") && (
                        <div className="p-4 bg-green-50 rounded-xl">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-green-600" />
                            {isEnglish ? "Rental income" : "Revenus locatifs"}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {isEnglish ? "Annual gross rents (CHF)" : "Loyers bruts annuels (CHF)"} <span className="text-red-500">*</span>
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 24000"
                                value={property.annualRent}
                                onChange={(e) => updateProperty(property.id, "annualRent", e.target.value)}
                                className="rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {isEnglish ? "Rental charges received (CHF)" : "Charges locatives perçues (CHF)"}
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 2400"
                                value={property.charges}
                                onChange={(e) => updateProperty(property.id, "charges", e.target.value)}
                                className="rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hypothèque */}
                      <div className="p-4 bg-amber-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <input
                            type="checkbox"
                            checked={property.hasMortgage}
                            onChange={(e) => updateProperty(property.id, "hasMortgage", e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                          />
                          <h4 className="font-medium">{isEnglish ? "This property has a mortgage" : "Ce bien est hypothéqué"}</h4>
                        </div>
                        {property.hasMortgage && (
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {isEnglish ? "Debt balance as of 31.12 (CHF)" : "Solde de la dette au 31.12 (CHF)"}
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 350000"
                                value={property.mortgageBalance}
                                onChange={(e) => updateProperty(property.id, "mortgageBalance", e.target.value)}
                                className="rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                {isEnglish ? "Interest paid during the year (CHF)" : "Intérêts payés dans l'année (CHF)"}
                              </label>
                              <Input
                                type="number"
                                placeholder="Ex: 5250"
                                value={property.mortgageInterest}
                                onChange={(e) => updateProperty(property.id, "mortgageInterest", e.target.value)}
                                className="rounded-xl"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Frais d'entretien */}
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium mb-3">{isEnglish ? "Maintenance costs" : "Frais d'entretien"}</h4>
                        <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`maintenance-${property.id}`}
                              checked={property.maintenanceType === "flat_rate"}
                              onChange={() => updateProperty(property.id, "maintenanceType", "flat_rate")}
                              className="w-4 h-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm">{isEnglish ? "Flat rate (10-20% depending on canton)" : "Forfait (10-20% selon canton)"}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`maintenance-${property.id}`}
                              checked={property.maintenanceType === "effective"}
                              onChange={() => updateProperty(property.id, "maintenanceType", "effective")}
                              className="w-4 h-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm">{isEnglish ? "Actual costs" : "Frais effectifs"}</span>
                          </label>
                        </div>
                        {property.maintenanceType === "effective" && (
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {isEnglish ? "Maintenance costs amount (CHF)" : "Montant des frais d'entretien (CHF)"}
                            </label>
                            <Input
                              type="number"
                              placeholder="Ex: 5000"
                              value={property.maintenanceCosts}
                              onChange={(e) => updateProperty(property.id, "maintenanceCosts", e.target.value)}
                              className="rounded-xl"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {isEnglish ? "Maintenance work only, not value-adding improvements" : "Uniquement les travaux d'entretien, pas les travaux à plus-value"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Bouton ajouter un bien */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addProperty}
                  className="w-full rounded-xl border-dashed border-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isEnglish ? "Add another property" : "Ajouter un autre bien immobilier"}
                </Button>

                {/* Info supplément */}
                <div className="p-3 bg-primary/5 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground">
                    {isEnglish ? "Supplement of <strong>CHF 50.-</strong> per property" : "Supplément de <strong>CHF 50.-</strong> par bien immobilier"}
                  </p>
                </div>
              </div>
            )}

            {!formData.hasProperty && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEnglish ? "Monthly rent (if tenant)" : "Loyer mensuel (si locataire)"}
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 1500"
                    value={formData.monthlyRent}
                    onChange={(e) => updateForm("monthlyRent", e.target.value)}
                    className="w-40 rounded-xl"
                  />
                </div>

                {/* Identité du bailleur - Exigence cantonale NE, FR, JU */}
                {(formData.canton === "NE" || formData.canton === "FR" || formData.canton === "JU") && formData.monthlyRent && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start gap-2 mb-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">{isEnglish ? "Cantonal requirement" : "Exigence cantonale"}</p>
                        <p className="text-sm text-amber-700">
                          {isEnglish ? "The canton of " : "Le canton de "}{formData.canton === "NE" ? "Neuchâtel" : formData.canton === "FR" ? "Fribourg" : "Jura"} {isEnglish ? "requires the identity of the landlord or property management company." : "exige l'identité du bailleur ou de la gérance immobilière."}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {isEnglish ? "Landlord / property manager name" : "Nom du bailleur / gérance"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder={isEnglish ? "E.g.: Dupont Real Estate SA or Mr. Jean Dupont" : "Ex: Régie Dupont SA ou M. Jean Dupont"}
                          value={formData.landlordName}
                          onChange={(e) => updateForm("landlordName", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {isEnglish ? "Landlord / property manager address" : "Adresse du bailleur / gérance"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder={isEnglish ? "E.g.: Rue de la Paix 10, 2000 Neuchâtel" : "Ex: Rue de la Paix 10, 2000 Neuchâtel"}
                          value={formData.landlordAddress}
                          onChange={(e) => updateForm("landlordAddress", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 6: Options */}
        {currentStep === 6 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isEnglish ? "Delivery options" : "Options de livraison"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isEnglish ? "Customize your request according to your needs." : "Personnalisez votre demande selon vos besoins."}
            </p>

            {/* Méthode de livraison */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">{isEnglish ? "Tax return delivery method" : "Mode de réception de la déclaration"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  onClick={() => updateForm("deliveryMethod", "email")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.deliveryMethod === "email"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="font-semibold">{isEnglish ? "By email" : "Par email"}</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Email delivery (included)" : "Réception par email (inclus)"}
                  </div>
                </div>
                <div
                  onClick={() => updateForm("deliveryMethod", "post")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.deliveryMethod === "post"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="font-semibold">{isEnglish ? "By post" : "Par courrier postal"}</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Postal delivery (+CHF 20)" : "Envoi postal (+CHF 20)"}
                  </div>
                </div>
              </div>
            </div>

            {/* {isEnglish ? "Processing time" : "Délai de traitement"} */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">{isEnglish ? "Processing time" : "Délai de traitement"}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  onClick={() => updateForm("deadline", "standard")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.deadline === "standard"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="font-semibold">Standard</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Within 10 business days (included)" : "Sous 10 jours ouvrables (inclus)"}
                  </div>
                </div>
                <div
                  onClick={() => updateForm("deadline", "extended")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.deadline === "extended"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="font-semibold">{isEnglish ? "Priority" : "Prioritaire"}</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Within 7 days (+CHF 20)" : "Sous 7 jours (+CHF 20)"}
                  </div>
                </div>
                <div
                  onClick={() => updateForm("deadline", "express")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.deadline === "express"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="font-semibold">Express</div>
                  <div className="text-sm text-muted-foreground">
                    {isEnglish ? "Within 48h (+CHF 120)" : "Sous 48h (+CHF 120)"}
                  </div>
                </div>
              </div>
            </div>

            {/* Commentaires */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {isEnglish ? "Comments or special instructions" : "Commentaires ou instructions particulières"}
              </label>
              <Textarea
                placeholder={isEnglish ? "Additional information for our team..." : "Informations complémentaires pour notre équipe..."}
                value={formData.comments}
                onChange={(e) => updateForm("comments", e.target.value)}
                className="rounded-xl min-h-[100px]"
              />
            </div>
          </div>
        )}

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
                      {isEnglish ? "Sending your documents by post" : "Envoi de vos documents par courrier"}
                    </h2>
                    <p className="text-muted-foreground">
                      {isEnglish ? "You chose postal delivery. Please send your documents to the address below." : "Vous avez choisi l'envoi postal. Veuillez envoyer vos documents à l'adresse ci-dessous."}
                    </p>
                  </div>
                </div>

                <div className="max-w-xl mx-auto">
                  {/* Adresse postale */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 mb-6">
                    <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                      {isEnglish ? "Sending address" : "Adresse d'envoi"}
                    </h3>
                    <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                      <p className="text-lg font-semibold text-gray-900">NeoFidu Sàrl</p>
                      <p className="text-gray-700">Crettaz 1</p>
                      <p className="text-gray-700">1854 Leysin</p>
                      <p className="text-gray-500 mt-2">{isEnglish ? "Switzerland" : "Suisse"}</p>
                    </div>
                  </div>

                  {/* Liste des documents à envoyer */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
                      {isEnglish ? "Documents to include" : "Documents à inclure"}
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
                          <p className="text-sm text-muted-foreground mt-4 mb-2 font-medium">{isEnglish ? "Optional documents (if applicable):" : "Documents optionnels (si applicable) :"}</p>
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
                      {isEnglish ? "Important instructions" : "Instructions importantes"}
                    </h3>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{isEnglish ? "Include your request reference on the envelope (it will be provided after payment)" : "Indiquez votre référence de demande sur l'enveloppe (elle vous sera communiquée après le paiement)"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{isEnglish ? "Send " : "Envoyez des "}<strong>copies</strong>{isEnglish ? " of your documents, not originals" : " de vos documents, pas les originaux"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{isEnglish ? "We will return your documents if you wish" : "Nous vous retournerons les documents si vous le souhaitez"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{isEnglish ? "Processing begins upon receipt of your documents" : "Le traitement commence dès réception de vos documents"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* Mode électronique - Upload des documents */
              <div>
                {/* CRITICAL: Alert if services are down */}
                {servicesHealthy === false && (
                  <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-red-800">{isEnglish ? "Service temporarily unavailable" : "Service temporairement indisponible"}</h3>
                        <p className="text-sm text-red-700 mt-1">{healthError}</p>
                        <p className="text-xs text-red-600 mt-2">
                          {isEnglish ? "Please wait a few minutes and refresh the page, or choose postal delivery." : "Veuillez patienter quelques minutes et rafraichir la page, ou choisir l'envoi postal."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* En-tête compact */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {isEnglish ? "Send your documents" : "Envoi de vos documents"}
                    </h2>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      {isEnglish ? "Secure storage" : "Stockage sécurisé"} • <span className="text-red-400">*</span> = {isEnglish ? "required" : "obligatoire"}
                    </p>
                  </div>
                </div>

                {/* Avertissement: fichiers de session précédente à re-uploader */}
                {lostFilesFromPreviousSession.length > 0 && (
                  <div className="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-amber-800 font-medium">
                          {isEnglish ? "Files from your previous session to re-upload:" : "Fichiers de votre session précédente à re-uploader :"}
                        </p>
                        <ul className="text-xs text-amber-700 mt-1 list-disc list-inside">
                          {lostFilesFromPreviousSession.map((f, i) => (
                            <li key={i}>{f.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Avertissement: fichiers en cours d'upload */}
                {hasFilesUploading() && (
                  <div className="mb-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-500 flex-shrink-0 animate-spin" />
                    <p className="text-xs text-blue-700">
                      <span className="font-medium">{isEnglish ? "Upload in progress..." : "Upload en cours..."}</span>
                      <span className="text-blue-600 ml-1">
                        {isEnglish ? "Please wait for all files to be uploaded before continuing." : "Veuillez attendre que tous les fichiers soient uploadés avant de continuer."}
                      </span>
                    </p>
                  </div>
                )}

                {/* Avertissement: fichiers en erreur */}
                {hasFilesWithError() && (
                  <div className="mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-700">
                      <span className="font-medium">
                        {uploadedFiles.filter(f => f.uploadStatus === "error").length} {isEnglish ? "file(s) with error" : "fichier(s) en erreur"}
                      </span>
                      <span className="text-red-600 ml-1">
                        - {isEnglish ? "Click the retry button or remove the affected files." : "Cliquez sur le bouton de réessai ou supprimez les fichiers concernés."}
                      </span>
                    </p>
                  </div>
                )}

                {getMissingRequiredDocuments().length > 0 && (
              <div className="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700">
                  <span className="font-medium">{getMissingRequiredDocuments().length} {isEnglish ? "required document(s)" : "document(s) requis"}</span>
                  <span className="text-amber-600 ml-1">
                    : {getMissingRequiredDocuments().slice(0, 2).map(d => d.name).join(", ")}
                    {getMissingRequiredDocuments().length > 2 && ` +${getMissingRequiredDocuments().length - 2}`}
                  </span>
                </p>
              </div>
            )}

            {/* === ÉTAPE 1: Sélecteur de catégorie - CARDS COMPACTES === */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                    <label className="text-sm font-semibold text-gray-700">
                      {isEnglish ? "Select the document type" : "Sélectionnez le type de document"}
                    </label>
                  </div>

                  {/* Cards cliquables - Documents obligatoires */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-2">
                    {getDocumentsWithStatus().filter(d => d.required).map((doc) => {
                      const filesCount = getFilesByCategory(doc.id).length;
                      const isActive = activeCategory === doc.id;
                      const isComplete = filesCount > 0;
                      return (
                        <div
                          key={doc.id}
                          onClick={() => setActiveCategory(doc.id)}
                          className={`relative p-2.5 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                            isActive
                              ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/30"
                              : isComplete
                                ? "border-green-300 bg-green-50/50 hover:border-green-400"
                                : "border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                              isComplete ? "bg-green-500" : isActive ? "bg-primary" : "bg-gray-200"
                            }`}>
                              {isComplete ? (
                                <Check className="w-3 h-3 text-white" />
                              ) : (
                                <FileText className={`w-3 h-3 ${isActive ? "text-white" : "text-gray-500"}`} />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`text-xs font-medium leading-tight truncate ${
                                isActive ? "text-primary" : isComplete ? "text-green-700" : "text-gray-700"
                              }`}>
                                {doc.name}
                              </p>
                            </div>
                          </div>
                          {filesCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                              {filesCount}
                            </div>
                          )}
                          {!isComplete && (
                            <span className="absolute top-1 right-1 text-red-400 text-[10px]">*</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Cards optionnelles - collapsible */}
                  {getDocumentsWithStatus().filter(d => !d.required).length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {getDocumentsWithStatus().filter(d => !d.required).map((doc) => {
                        const filesCount = getFilesByCategory(doc.id).length;
                        const isActive = activeCategory === doc.id;
                        return (
                          <div
                            key={doc.id}
                            onClick={() => setActiveCategory(doc.id)}
                            className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                              isActive
                                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                                : "border-dashed border-gray-300 bg-gray-50/50 hover:border-gray-400"
                            }`}
                          >
                            <p className={`text-xs truncate ${isActive ? "text-primary font-medium" : "text-gray-500"}`}>
                              {doc.name}
                              {filesCount > 0 && <span className="ml-1 text-green-600">({filesCount})</span>}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* === ÉTAPE 2: Zone d'upload MODERNE === */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                    <label className="text-sm font-semibold text-gray-700">
                      Ajoutez votre fichier
                    </label>
                  </div>

                  {/* Zone de dépôt moderne */}
                  <div
                    className={`group relative border border-dashed rounded-xl p-4 text-center transition-all duration-300 ${
                      servicesHealthy === false
                        ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                        : "border-gray-300 bg-gradient-to-b from-gray-50 to-white hover:border-primary hover:from-primary/5 hover:to-white cursor-pointer"
                    }`}
                    onClick={() => servicesHealthy !== false && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,.gif,.bmp,.doc,.docx"
                      disabled={servicesHealthy === false}
                    />

                    {/* Icône animée */}
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Upload className="w-5 h-5 text-primary group-hover:animate-bounce" />
                    </div>

                    {/* Texte compact */}
                    <p className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">
                      Cliquez ou glissez votre fichier
                    </p>
                    <p className="text-xs text-primary/70 font-medium mt-1 truncate px-2">
                      {getDocumentsWithStatus().find((d) => d.id === activeCategory)?.name}
                    </p>

                    {/* Bouton subtil */}
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      <Paperclip className="w-3 h-3" />
                      Parcourir
                    </div>

                    <p className="text-[10px] text-gray-400 mt-2">
                      PDF, JPG, PNG, DOC • Max 10 MB
                    </p>

                    {/* Effet de bordure animé au hover */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* === Fichiers uploadés - COMPACT === */}
                {getFilesByCategory(activeCategory).length > 0 && (
                  <div className="mb-3 p-2.5 bg-green-50/80 border border-green-200 rounded-lg">
                    <div className="space-y-1.5">
                      {getFilesByCategory(activeCategory).map((file) => (
                        <div
                          key={file.id}
                          className={`flex items-center justify-between p-2 bg-white border rounded-md group transition-colors ${
                            file.uploadStatus === "error"
                              ? "border-red-200 bg-red-50/50"
                              : file.uploadStatus === "uploading"
                              ? "border-blue-200 bg-blue-50/50"
                              : "border-green-100 hover:border-green-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Icône de statut */}
                            <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${
                              file.uploadStatus === "error"
                                ? "bg-red-100"
                                : file.uploadStatus === "uploading"
                                ? "bg-blue-100"
                                : "bg-green-100"
                            }`}>
                              {file.uploadStatus === "uploading" ? (
                                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                              ) : file.uploadStatus === "error" ? (
                                <XCircle className="w-3.5 h-3.5 text-red-600" />
                              ) : file.uploadStatus === "success" ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                              ) : (
                                <FileText className="w-3.5 h-3.5 text-gray-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-medium truncate text-gray-700">
                                {file.name}
                              </div>
                              <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                {formatFileSize(file.size)}
                                {file.uploadStatus === "uploading" && (
                                  <span className="text-blue-500">{isEnglish ? "• Uploading..." : "• Upload en cours..."}</span>
                                )}
                                {file.uploadStatus === "success" && file.url && (
                                  <span className="text-green-600">• {isEnglish ? "Saved" : "Sauvegardé"}</span>
                                )}
                                {file.uploadStatus === "error" && (
                                  <span className="text-red-500">• {file.uploadError || (isEnglish ? "Failed" : "Échec")}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* Bouton réessayer si erreur */}
                            {file.uploadStatus === "error" && (
                              <button
                                type="button"
                                onClick={() => retryFileUpload(file.id)}
                                className="w-6 h-6 flex items-center justify-center text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                                title={isEnglish ? "Retry upload" : "Réessayer l'upload"}
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {/* Bouton supprimer */}
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              disabled={file.uploadStatus === "uploading"}
                              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                                file.uploadStatus === "uploading"
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* === PROGRESSION COMPACTE === */}
                <div className="p-3 bg-gray-50/80 rounded-lg border border-gray-200">
                  {/* Barre de progression fine */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          allRequiredDocumentsUploaded() ? "bg-green-500" : "bg-primary"
                        }`}
                        style={{
                          width: `${(getDocumentsWithStatus().filter(d => d.required && getSuccessfullyUploadedFilesByCategory(d.id).length > 0).length / Math.max(1, getDocumentsWithStatus().filter(d => d.required).length)) * 100}%`
                        }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${allRequiredDocumentsUploaded() ? "text-green-600" : "text-gray-600"}`}>
                      {getDocumentsWithStatus().filter(d => d.required && getSuccessfullyUploadedFilesByCategory(d.id).length > 0).length}/{getDocumentsWithStatus().filter(d => d.required).length}
                    </span>
                  </div>

                  {/* Message succès compact */}
                  {allRequiredDocumentsUploaded() && (
                    <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isEnglish ? "All required documents have been successfully uploaded" : "Tous les documents requis sont uploadés avec succès"}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 8: Certification */}
        {currentStep === 8 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {isEnglish ? "Request certification" : "Certification de la demande"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish ? "Please confirm the accuracy of the information provided." : "Veuillez confirmer l'exactitude des informations fournies."}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl border">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.certifyAccuracy}
                    onChange={(e) => updateForm("certifyAccuracy", e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-medium">{isEnglish ? "I certify the accuracy of the information" : "Je certifie l'exactitude des informations"}</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isEnglish ? "I confirm that all information provided is complete and accurate to the best of my knowledge." : "Je confirme que toutes les informations fournies sont complètes et exactes au meilleur de ma connaissance."}
                    </p>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.certifyResponsibility}
                    onChange={(e) => updateForm("certifyResponsibility", e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-medium">{isEnglish ? "I understand my responsibility" : "Je comprends ma responsabilité"}</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isEnglish ? "I understand that I remain responsible for the accuracy of my final tax return with the tax administration." : "Je comprends que je reste responsable de l'exactitude de ma déclaration d'impôts finale auprès de l'administration fiscale."}
                    </p>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Important</p>
                    <p className="text-sm text-amber-700 mt-1">
                      {isEnglish ? "NeoFidu is committed to processing your tax return with the utmost care. However, the final responsibility towards the tax administration lies with you. We recommend reviewing the return before signing and submitting it." : "NeoFidu s'engage à traiter votre déclaration avec le plus grand soin. Cependant, la responsabilité finale envers l'administration fiscale vous incombe. Nous vous recommandons de vérifier la déclaration avant de la signer et de la soumettre."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé du prix */}
            <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/20">
              <h3 className="font-bold text-lg mb-4">{isEnglish ? "Summary" : "Récapitulatif"}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{isEnglish ? "Declaration" : "Déclaration"} {formData.familyStatus === "couple" ? (isEnglish ? "joint" : "commune") : (isEnglish ? "individual" : "individuelle")}</span>
                  <span>CHF 50.-</span>
                </div>
                {formData.livesAbroad && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Swiss abroad supplement" : "Supplément Suisse de l'étranger"}</span>
                    <span>CHF 50.-</span>
                  </div>
                )}
                {formData.familyStatus === "couple" && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Couple supplement" : "Supplément couple"}</span>
                    <span>CHF 20.-</span>
                  </div>
                )}
                {formData.isIndependent && (
                  <div className="flex justify-between">
                    <span>{(isEnglish ? "Self-employed supplement" : "Supplément indépendant") + (formData.familyStatus === "couple" ? ` (${formData.firstName || "Adulte 1"})` : "")}</span>
                    <span>CHF 40.-</span>
                  </div>
                )}
                {formData.familyStatus === "couple" && formData.isIndependent2 && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Self-employed supplement" : "Supplément indépendant"} ({formData.firstName2 || (isEnglish ? "Adult 2" : "Adulte 2")})</span>
                    <span>CHF 40.-</span>
                  </div>
                )}
                {formData.hasChildren && formData.childrenCount > 0 && (
                  <div className="flex justify-between">
                    <span>{formData.childrenCount} {isEnglish ? "child(ren)" : "enfant(s)"}</span>
                    <span>CHF {10 * formData.childrenCount}.-</span>
                  </div>
                )}
                {formData.hasProperty && properties.length > 0 && (
                  <div className="flex justify-between">
                    <span>{properties.length} {isEnglish ? "propert(ies)" : "bien(s) immobilier(s)"}</span>
                    <span>CHF {50 * properties.length}.-</span>
                  </div>
                )}
                {formData.hasStocks && formData.stocksCount > 2 && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Securities" : "Titres"} ({formData.stocksCount} {isEnglish ? "positions" : "positions"})</span>
                    <span>CHF 20.-</span>
                  </div>
                )}
                {formData.deliveryMethod === "post" && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Postal delivery" : "Envoi postal"}</span>
                    <span>CHF 20.-</span>
                  </div>
                )}
                {formData.deadline === "extended" && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Priority processing" : "Délai prioritaire"}</span>
                    <span>CHF 20.-</span>
                  </div>
                )}
                {formData.deadline === "express" && (
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Express processing (48h)" : "Délai express (48h)"}</span>
                    <span>CHF 120.-</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{isEnglish ? "Amount excl. VAT" : "Montant HT"}</span>
                    <span>CHF {calculatePriceHT().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{isEnglish ? "VAT (8.1%)" : "TVA (8.1%)"}</span>
                    <span>CHF {calculateTVA().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>{isEnglish ? "Total incl. VAT" : "Total TTC"}</span>
                    <span className="text-primary">CHF {calculatePrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Paiement */}
        {currentStep === 9 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <PaymentIllustration className="w-24 h-24 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {isEnglish ? "Secure payment" : "Paiement sécurisé"}
                </h2>
                <p className="text-muted-foreground">
                  {isEnglish ? "Finalize your request securely." : "Finalisez votre demande en toute sécurité."}
                </p>
              </div>
            </div>

            {/* {isEnglish ? "Summary" : "Récapitulatif"} compact */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isEnglish ? `Tax return ${formData.taxYear}` : `Déclaration d'impôts ${formData.taxYear}`}</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.lastName}
                    {formData.clientType === "couple" && formData.firstName2 && ` & ${formData.firstName2} ${formData.lastName2}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">CHF {calculatePrice().toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{isEnglish ? "incl. VAT" : "TTC"}</p>
                </div>
              </div>
            </div>

            {/* Référence de la demande */}
            {taxRequestReference && (
              <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="font-medium">{isEnglish ? "Request saved" : "Demande enregistrée"}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {isEnglish ? "Reference:" : "Référence:"} <span className="font-mono font-medium">{taxRequestReference}</span>
                </p>
              </div>
            )}

            {/* Sécurité */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span>{isEnglish ? "Secure SSL payment" : "Paiement sécurisé SSL"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Stripe PCI-DSS</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>{isEnglish ? "Protected data" : "Données protégées"}</span>
              </div>
            </div>

            {/* Payment via Stripe */}
            {isSavingRequest ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">{isEnglish ? "Preparing payment..." : "Préparation du paiement..."}</p>
              </div>
            ) : (
              <PaymentMethodSelector
                amount={calculatePrice()}
                onSuccess={handlePaymentSuccess}
                onError={(error) => console.error("Erreur de paiement:", error)}
                customerEmail={formData.email}
                customerName={`${formData.firstName} ${formData.lastName}`}
                description={`${isEnglish ? `Tax return ${formData.taxYear}` : `Déclaration fiscale ${formData.taxYear}`} - ${formData.canton}`}
                taxRequestReference={taxRequestReference}
                metadata={{
                  taxRequestReference: taxRequestReference,
                  service: "tax",
                  canton: formData.canton,
                  taxYear: String(formData.taxYear),
                  clientType: formData.clientType,
                  taxpayerNumber: formData.taxpayerNumber || "",
                  language: isEnglish ? "en" : "fr",
                }}
              />
            )}

            {/* Info: Documents uploadés après paiement */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">
                      {isEnglish ? `${uploadedFiles.length} document(s) ready to be sent` : `${uploadedFiles.length} document(s) prêt(s) à être envoyé(s)`}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {isEnglish ? "Your documents will be sent automatically after payment confirmation" : "Vos documents seront transmis automatiquement après la confirmation de votre paiement"}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Validation message for step 4 */}
        {currentStep === 4 && !canProceed() && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">{isEnglish ? "Required information" : "Informations requises"}</p>
              <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc list-inside">
                {/* Statut d'emploi manquant */}
                {formData.clientType !== "independent" && !formData.employmentStatus && (
                  <li>{isEnglish ? "Select your employment status (employee, retiree, etc.)" : "Sélectionnez votre statut d'emploi (salarié, retraité, etc.)"}</li>
                )}
                {/* {isEnglish ? "Employment rate" : "Taux d'occupation"} manquant pour salarié */}
                {formData.clientType !== "independent" && formData.employmentStatus === "employed" && !formData.occupationRate && (
                  <li>{isEnglish ? "Indicate your employment rate (%)" : "Indiquez votre taux d'occupation (%)"}</li>
                )}
                {/* Statut d'emploi manquant pour le conjoint */}
                {formData.clientType === "couple" && !formData.employmentStatus2 && (
                  <li>{isEnglish ? "Select your partner's employment status" : "Sélectionnez le statut d'emploi de votre conjoint"}</li>
                )}
                {/* {isEnglish ? "Employment rate" : "Taux d'occupation"} manquant pour conjoint salarié */}
                {formData.clientType === "couple" && formData.employmentStatus2 === "employed" && !formData.occupationRate2 && (
                  <li>{isEnglish ? "Indicate your partner's employment rate (%)" : "Indiquez le taux d'occupation de votre conjoint (%)"}</li>
                )}
                {/* Mode de transport manquant */}
                {!workplaces1.some((wp) => wp.transportMode !== "") && (
                  <li>{isEnglish ? "Select a transport mode for your professional commute" : "Sélectionnez un mode de transport pour vos trajets professionnels"}</li>
                )}
                {/* Justification voiture manquante */}
                {workplaces1.some((wp) => wp.transportMode === "car" && !wp.carJustification.trim()) && (
                  <li>{isEnglish ? "Justify the use of the car (required by the tax administration)" : "Justifiez l'utilisation de la voiture (obligatoire pour l'administration fiscale)"}</li>
                )}
                {/* Mode de transport manquant pour le conjoint */}
                {formData.clientType === "couple" && !workplaces2.some((wp) => wp.transportMode !== "") && (
                  <li>{isEnglish ? "Select a transport mode for your partner" : "Sélectionnez un mode de transport pour le conjoint"}</li>
                )}
                {/* Justification voiture manquante pour le conjoint */}
                {formData.clientType === "couple" && workplaces2.some((wp) => wp.transportMode === "car" && !wp.carJustification.trim()) && (
                  <li>{isEnglish ? "Justify the car use by your partner" : "Justifiez l'utilisation de la voiture par le conjoint"}</li>
                )}
                {/* Informations indépendant manquantes */}
                {formData.isIndependent && !formData.businessType.trim() && (
                  <li>{isEnglish ? "Indicate the type of self-employed activity" : "Indiquez le type d'activité indépendante"}</li>
                )}
                {formData.isIndependent && !formData.hasBusinessAccounts && (!formData.businessRevenue.trim() || !formData.businessExpenses.trim()) && (
                  <li>{isEnglish ? "Fill in either the balance sheet/P&L, or the revenue and expenses" : "Remplissez soit le bilan/compte de résultat, soit le chiffre d'affaires et les charges"}</li>
                )}
                {/* Informations indépendant manquantes pour le conjoint */}
                {formData.familyStatus === "couple" && formData.isIndependent2 && !formData.businessType2.trim() && (
                  <li>{isEnglish ? "Indicate the type of self-employed activity for your partner" : "Indiquez le type d'activité indépendante du conjoint"}</li>
                )}
                {formData.familyStatus === "couple" && formData.isIndependent2 && !formData.hasBusinessAccounts2 && (!formData.businessRevenue2.trim() || !formData.businessExpenses2.trim()) && (
                  <li>{isEnglish ? "Fill in the financial information for your partner's self-employed activity" : "Remplissez les informations financières de l'activité indépendante du conjoint"}</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Navigation */}
        {/* Erreur d'upload de documents - bloque le passage au paiement */}
        {uploadError && currentStep === 8 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-800">{isEnglish ? "Document upload error" : "Erreur d'upload des documents"}</p>
                <p className="text-sm text-red-700 mt-1">
                  {uploadError.message}
                </p>
                {uploadError.failedFiles.length > 0 && (
                  <div className="mt-2 text-sm text-red-600">
                    <p className="font-medium">{isEnglish ? "Affected files:" : "Fichiers concernés :"}</p>
                    <ul className="list-disc list-inside mt-1">
                      {uploadError.failedFiles.map((file, idx) => (
                        <li key={idx} className="truncate">{file}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUploadError(null);
                      nextStep();
                    }}
                    className="text-red-700 border-red-300 hover:bg-red-100"
                  >
                    {isEnglish ? "Retry upload" : "Réessayer l'upload"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(7)}
                    className="text-red-600 hover:bg-red-100"
                  >
                    {isEnglish ? "Edit documents" : "Modifier les documents"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Erreur de sauvegarde - bloque le passage au paiement */}
        {saveError && currentStep === 8 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">{isEnglish ? "Save error" : "Erreur d'enregistrement"}</p>
                <p className="text-sm text-red-700 mt-1">
                  {saveError}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSaveError(null);
                    nextStep();
                  }}
                  className="mt-3 text-red-700 border-red-300 hover:bg-red-100"
                >
                  {isEnglish ? "Retry" : "Réessayer"}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isEnglish ? "Back" : "Retour"}
          </Button>
          {/* On step 9 (Payment), the Stripe form handles submission - no Next button */}
          {currentStep < steps.length && (
            <Button
              onClick={nextStep}
              disabled={!canProceed() || isSavingRequest}
              className="rounded-full"
            >
              {isSavingRequest ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {isEnglish ? "Saving..." : "Enregistrement..."}
                </>
              ) : (
                <>
                  {isEnglish ? "Next" : "Suivant"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
          {/* On the payment step, show info text instead of a button */}
          {currentStep === steps.length && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>{isEnglish ? "Use the Stripe form above to pay" : "Utilisez le formulaire Stripe ci-dessus pour payer"}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
