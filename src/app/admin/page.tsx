"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Search,
  CreditCard,
  Smartphone,
  Eye,
  EyeOff,
  LogOut,
  AlertCircle,
  Download,
  FileText,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Briefcase,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  FileCheck,
  Package,
  Edit3,
  Send,
  Bell,
  Check,
  ExternalLink,
  FolderOpen,
  History,
  BarChart3,
  ArrowRight,
  ClipboardCopy,
  Globe,
  Building2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { generatePDFPreview, downloadPDF, getPDFFileName } from "@/lib/pdf-export";

interface TaxRequest {
  id: string;
  reference: string;
  requestType?: "tax" | "accounting" | "property" | "creation";
  status: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  // Extra fields for accounting/property
  companyName?: string;
  propertyAddress?: string;
  selectedServices?: string[];
  // Accounting-specific fields
  billingFrequency?: string;
  activity?: string;
  employeesCount?: number;
  annualRevenue?: string;
  monthlyTransactions?: string;
  isVatRegistered?: boolean;
  currentAccountingSoftware?: string;
  businessType?: string;
  // Creation-specific fields
  companyType?: string;
  companyTypeName?: string;
  projectDescription?: string;
  payment: {
    amount: number;
    currency: string;
    method?: string;
    stripePaymentIntentId?: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    birthDate?: string;
    maritalStatus?: string;
    residenceStatus?: string;
    firstName2?: string;
    lastName2?: string;
    birthDate2?: string;
    residenceStatus2?: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      npa: string;
      city: string;
    };
  };
  fiscal: {
    canton: string;
    cantonCode: string;
    taxYear: number;
    taxpayerNumber?: string;
    declarationCode?: string;
    clientType: string;
    familyStatus?: string;
    isIndependent?: boolean;
    employmentStatus?: string;
    occupationRate?: string;
    employmentStatus2?: string;
    occupationRate2?: string;
    // Suisses de l'étranger
    livesAbroad?: boolean;
    countryOfResidence?: string;
    countryOfResidenceName?: string;
    abroadAddress?: string;
  };
  situation: {
    hasMoved?: boolean;
    hasChildren?: boolean;
    childrenCount?: number;
    // Detailed children data
    children?: Array<{
      firstName: string;
      lastName: string;
      birthDate: string;
      activity: string;
      isDependent: boolean;
      dependentPercentage: string;
      custodyType: string;
      hasGuardCosts: boolean;
      guardCostsAmount: string;
      guardCostsDescription: string;
    }>;
    monthlyRent?: string;
    landlordName?: string;
    landlordAddress?: string;
  };
  financial: {
    hasPillar3a?: boolean;
    pillar3aAmount?: string;
    hasStocks?: boolean;
    stocksCount?: number;
    hasSoldStocks?: boolean;
    soldStocksDetails?: string;
    hasGuardCosts?: boolean;
    guardCosts?: string;
    hasMealsOutside?: boolean;
    mealsOutsideDays?: string;
    hasAlimonyReceived?: boolean;
    alimonyReceived?: string;
    hasAlimonyPaid?: boolean;
    alimonyPaid?: string;
    hasDonations?: boolean;
    donationsAmount?: string;
    hasDebts?: boolean;
    debtsAmount?: string;
  };
  business?: {
    // Adulte 1
    businessType?: string;
    businessStartDate?: string;
    hasIDE?: boolean;
    ideNumber?: string;
    isRegisteredRC?: boolean;
    hasVAT?: boolean;
    vatNumber?: string;
    hasBusinessAccounts?: boolean;
    businessRevenue?: string;
    businessExpenses?: string;
    businessNetIncome?: string;
    hasAVSIndependent?: boolean;
    avsIndependentAmount?: string;
    hasLPPVoluntary?: boolean;
    lppVoluntaryAmount?: string;
    hasHomeOffice?: boolean;
    homeOfficePercent?: string;
    homeOfficeAmount?: string;
    hasBusinessVehicle?: boolean;
    businessVehiclePercent?: string;
    businessVehicleExpenses?: string;
    // Adulte 2 (Conjoint)
    isIndependent2?: boolean;
    businessType2?: string;
    businessStartDate2?: string;
    hasIDE2?: boolean;
    ideNumber2?: string;
    isRegisteredRC2?: boolean;
    hasVAT2?: boolean;
    vatNumber2?: string;
    hasBusinessAccounts2?: boolean;
    businessRevenue2?: string;
    businessExpenses2?: string;
    businessNetIncome2?: string;
    hasAVSIndependent2?: boolean;
    avsIndependentAmount2?: string;
    hasLPPVoluntary2?: boolean;
    lppVoluntaryAmount2?: string;
    hasHomeOffice2?: boolean;
    homeOfficePercent2?: string;
    homeOfficeAmount2?: string;
    hasBusinessVehicle2?: boolean;
    businessVehiclePercent2?: string;
    businessVehicleExpenses2?: string;
  };
  property: {
    hasProperty?: boolean;
    propertyCount?: number;
    hasSoldProperty?: boolean;
    soldPropertyDetails?: string;
    hasMortgage?: boolean;
    mortgageAmount?: string;
    hasRenovations?: boolean;
    renovationsAmount?: string;
    // Détails des biens immobiliers
    properties?: PropertyDetail[];
  };
  workplaces: {
    adult: number;
    employerName: string;
    transportMode: string;
    workplaceAddress: string;
    daysPerYear: string;
    distanceKm: string;
    employerReimbursement: boolean;
    reimbursementType: string;
    reimbursementAmount: string;
    carJustification?: string;
  }[];
  options: {
    deliveryMethod?: string;
    wantsReview?: boolean;
    deadline?: string;
    comments?: string;
  };
  documents: {
    category: string;
    name: string;
    url?: string;
    uploadedAt: string;
  }[];
}

// Interface pour les détails d'un bien immobilier
interface PropertyDetail {
  street?: string;
  npa?: string;
  city?: string;
  canton?: string;
  cantonName?: string;
  parcelNumber?: string;
  surfaceM2?: string;
   country?: string;
    location?: string;
  propertyType?: string;
  propertyTypeName?: string;
  usage?: string;
  usageName?: string;
  ownershipShare?: string;
  acquisitionYear?: string;
  constructionYear?: string;
  maintenanceFlatRate?: number; // 10% ou 20% selon l'âge du bâtiment
  fiscalValue?: string;
  rentalValue?: string;
  annualRent?: string;
  charges?: string;
  hasMortgage?: boolean;
  mortgageBalance?: string;
  mortgageInterest?: string;
  maintenanceCosts?: string;
  maintenanceType?: "flat_rate" | "effective";
}

interface Stats {
  total: number;
  paid: number;
  pending: number;
  inProgress: number;
  completed: number;
  totalRevenue: number;
}

interface StatusHistoryEntry {
  id: string;
  request_id: string;
  request_reference: string;
  old_status: string;
  new_status: string;
  changed_at: string;
  changed_by: string;
  notification_sent: boolean;
}

interface ChartData {
  daily: { date: string; count: number; revenue: number }[];
  byCanton: { canton: string; count: number; revenue: number }[];
}

// Couleurs pour les graphiques
const CHART_COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

// Check if Storage is configured
const isStorageConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseProjectRef = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_CLOUD_NAME";

// Helper function to generate Supabase Storage URL
// Navigate directly to the folder containing the documents
function getStorageFolderUrl(reference: string, createdAt: string, lastName: string, firstName: string): string {
  const cloudName = supabaseProjectRef;

  // Build folder path (same logic as upload)
  const folderPath = getStorageFolderPath(reference, createdAt, lastName, firstName);

  // New Supabase dashboard URL format (2024+)
  // Goes to Media Library with folder filter
  // Format: https://supabase.com/dashboard/pm/c-CLOUD_NAME/media-explorer/folders/FOLDER_PATH
  // Or simpler: direct link to search by folder
  return `https://supabase.com/dashboard/pm/${cloudName}/media-explorer?assetId=&q=folder%3A${encodeURIComponent(folderPath)}*`;
}

// Fix broken Storage URLs (remove fl_attachment which causes ERR_INVALID_RESPONSE)
function fixStorageUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  // Remove fl_attachment from the URL as it causes issues with raw files
  return url.replace("/upload/fl_attachment/", "/upload/");
}

// Check if a document URL is a demo/simulated URL (not real)
function isSimulatedUrl(url: string | undefined): boolean {
  if (!url) return true; // No URL = simulated
  return url.includes("supabase.co/storage") || url.includes("demo/");
}

// Check if a request has missing/simulated documents
function hasMissingDocuments(request: TaxRequest): boolean {
  if (!request.documents || request.documents.length === 0) return false;
  return request.documents.some(doc => isSimulatedUrl(doc.url));
}

// Alternative: Generate the folder path for reference
function getStorageFolderPath(reference: string, createdAt: string, lastName: string, firstName: string): string {
  const date = new Date(createdAt);
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

  const cleanName = (name: string) => {
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

  return `/documents/${folderName}`;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState<TaxRequest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TaxRequest | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Date filters
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // États pour la modification de statut
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [sendNotification, setSendNotification] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // État pour le changement de statut inline (dans le tableau)
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);

  // États pour les graphiques et l'historique
  const [statusHistory, setStatusHistory] = useState<StatusHistoryEntry[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  // États pour l'aperçu PDF
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [pdfPreviewRequest, setPdfPreviewRequest] = useState<TaxRequest | null>(null);
  const [showCharts, setShowCharts] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  // État pour le modèle d'email de livraison
  const [emailTemplateModal, setEmailTemplateModal] = useState<{
    show: boolean;
    request: TaxRequest | null;
    copied: boolean;
  }>({ show: false, request: null, copied: false });

  // État pour le renvoi d'email de confirmation
  const [resendingEmailFor, setResendingEmailFor] = useState<string | null>(null);
  const [resendEmailResult, setResendEmailResult] = useState<{
    reference: string;
    success: boolean;
    message: string;
  } | null>(null);

  // État pour la newsletter
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<{
    id: string;
    email: string;
    first_name?: string;
    status: string;
    source?: string;
    subscribed_at: string;
  }[]>([]);
  const [newsletterTotal, setNewsletterTotal] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterTableExists, setNewsletterTableExists] = useState(true);
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);

  // Fonction pour renvoyer l'email de confirmation
  const resendConfirmationEmail = async (reference: string) => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    setResendingEmailFor(reference);
    setResendEmailResult(null);

    try {
      const response = await fetch("/api/admin/resend-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({ reference }),
      });

      const data = await response.json();

      setResendEmailResult({
        reference,
        success: data.success,
        message: data.success
          ? `✅ Email envoyé à ${data.customerEmail}`
          : `❌ ${data.error || data.message}`,
      });

      // Clear result after 5 seconds
      setTimeout(() => setResendEmailResult(null), 5000);
    } catch (err) {
      setResendEmailResult({
        reference,
        success: false,
        message: "❌ Erreur de connexion",
      });
    } finally {
      setResendingEmailFor(null);
    }
  };

  // Fonction pour charger les abonnés newsletter
  const fetchNewsletterSubscribers = async () => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    setNewsletterLoading(true);
    try {
      const response = await fetch("/api/admin/newsletter", {
        headers: {
          "x-admin-password": savedPassword,
        },
      });
      const data = await response.json();
      setNewsletterSubscribers(data.subscribers || []);
      setNewsletterTotal(data.total || 0);
      setNewsletterTableExists(data.tableExists !== false);
      setNewsletterMessage(data.message || null);
    } catch (err) {
      console.error("Error fetching newsletter subscribers:", err);
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Fonction pour supprimer un abonné newsletter
  const deleteNewsletterSubscriber = async (id: string, email: string) => {
    if (!confirm(`Supprimer l'abonné ${email} ?`)) return;

    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    try {
      const response = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": savedPassword,
        },
      });
      if (response.ok) {
        setNewsletterSubscribers(prev => prev.filter(s => s.id !== id));
        setNewsletterTotal(prev => prev - 1);
      }
    } catch (err) {
      console.error("Error deleting subscriber:", err);
    }
  };

  // Générer le modèle d'email pour la livraison de la déclaration
  const generateDeliveryEmailTemplate = (request: TaxRequest): string => {
    const fullName = request.customer.firstName2
      ? `${request.customer.firstName} ${request.customer.lastName} et ${request.customer.firstName2} ${request.customer.lastName2}`
      : `${request.customer.firstName} ${request.customer.lastName}`;

    const greeting = request.customer.firstName2
      ? `Madame, Monsieur ${request.customer.lastName}`
      : `${request.fiscal.clientType === 'couple' ? 'Madame, Monsieur' : ''} ${request.customer.lastName}`;

    return `Objet : Votre déclaration d'impôts ${request.fiscal.taxYear} est prête - Réf. ${request.reference}

Bonjour ${greeting},

Nous avons le plaisir de vous informer que votre déclaration d'impôts ${request.fiscal.taxYear} pour le canton de ${request.fiscal.canton} est maintenant terminée.

Vous trouverez ci-joint :
- La quittance de dépôt de votre déclaration
- Un récapitulatif des éléments déclarés

Prochaines étapes :
1. Conservez précieusement la quittance jointe
2. L'administration fiscale vous enverra votre avis de taxation dans les prochains mois
3. Si vous avez des questions sur votre avis de taxation, n'hésitez pas à nous contacter

Informations de votre dossier :
- Référence : ${request.reference}
- Canton : ${request.fiscal.canton}
- Année fiscale : ${request.fiscal.taxYear}
- Type : ${request.fiscal.clientType === 'couple' ? 'Couple' : request.fiscal.clientType === 'independent' ? 'Indépendant' : 'Particulier'}

Nous vous remercions de votre confiance et restons à votre disposition pour toute question.

Cordialement,

L'équipe 
---
NeoFidu
Fiduciaire digitale en Suisse romande
www.neofidu.ch
`;
  };

  // Copier l'email dans le presse-papier
  const copyEmailToClipboard = async () => {
    if (!emailTemplateModal.request) return;

    const emailText = generateDeliveryEmailTemplate(emailTemplateModal.request);

    try {
      await navigator.clipboard.writeText(emailText);
      setEmailTemplateModal(prev => ({ ...prev, copied: true }));
      setTimeout(() => {
        setEmailTemplateModal(prev => ({ ...prev, copied: false }));
      }, 2000);
    } catch (err) {
      console.error("Erreur copie:", err);
    }
  };

  // État pour le diagnostic de configuration
  const [configDiagnostic, setConfigDiagnostic] = useState<{
    show: boolean;
    loading: boolean;
    data: Record<string, unknown> | null;
    error: string | null;
  }>({ show: false, loading: false, data: null, error: null });

  // Fonction pour vérifier la configuration
  const checkConfiguration = async () => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    setConfigDiagnostic({ show: true, loading: true, data: null, error: null });

    try {
      const response = await fetch("/api/debug/config", {
        headers: {
          "x-admin-password": savedPassword,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConfigDiagnostic({ show: true, loading: false, data, error: null });
      } else {
        setConfigDiagnostic({ show: true, loading: false, data: null, error: "Erreur lors du diagnostic" });
      }
    } catch (err) {
      setConfigDiagnostic({ show: true, loading: false, data: null, error: "Erreur de connexion" });
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/requests", {
        headers: {
          "x-admin-password": password,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
        setStats(data.stats);
        setStatusHistory(data.statusHistory || []);
        setChartData(data.chartData || null);
        setIsDemo(data.demo || false);
        setIsAuthenticated(true);
        sessionStorage.setItem("adminPassword", password);
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setRequests([]);
    setStats(null);
    setStatusHistory([]);
    setChartData(null);
    sessionStorage.removeItem("adminPassword");
  };

  const refreshRequests = async () => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/requests", {
        headers: {
          "x-admin-password": savedPassword,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
        setStats(data.stats);
        setStatusHistory(data.statusHistory || []);
        setChartData(data.chartData || null);
        setIsDemo(data.demo || false);
      }
    } catch (err) {
      console.error("Erreur rafraîchissement:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Modifier le statut d'une demande
  const updateRequestStatus = async (requestId: string, status: string, oldStatus?: string, requestType?: string) => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    // Récupérer l'ancien statut et le type si non fournis
    const currentRequest = requests.find(r => r.id === requestId);
    const previousStatus = oldStatus || currentRequest?.status || "";
    const reqType = requestType || currentRequest?.requestType || "tax";

    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      const response = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({
          id: requestId,
          status,
          oldStatus: previousStatus,
          sendNotification,
          requestType: reqType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Mettre à jour localement
        setRequests(prev => prev.map(r =>
          r.id === requestId ? { ...r, status } : r
        ));

        if (selectedRequest?.id === requestId) {
          setSelectedRequest(prev => prev ? { ...prev, status } : null);
        }

        setUpdateMessage({
          type: "success",
          text: data.demo
            ? "Mode démo - statut mis à jour visuellement"
            : `Statut mis à jour${data.notificationSent ? " et notification envoyée" : ""}`,
        });

        setEditingStatus(null);
        setInlineEditingId(null);

        // Afficher le modèle d'email si le statut devient "completed" ou "done"
        if (
          (status === "completed" || status === "done") &&
          currentRequest &&
          previousStatus !== status
        ) {
          setEmailTemplateModal({
            show: true,
            request: { ...currentRequest, status }, // status mis à jour
            copied: false,
          });
        }

        // Rafraîchir les stats
        refreshRequests();
      } else {
        setUpdateMessage({
          type: "error",
          text: data.error || "Erreur lors de la mise à jour",
        });
      }
    } catch (err) {
      setUpdateMessage({
        type: "error",
        text: "Erreur de connexion",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Vérifier si déjà connecté au chargement
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (savedPassword) {
      setPassword(savedPassword);
      fetch("/api/admin/requests", {
        headers: {
          "x-admin-password": savedPassword,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.requests) {
            setRequests(data.requests);
            setStats(data.stats);
            setStatusHistory(data.statusHistory || []);
            setChartData(data.chartData || null);
            setIsDemo(data.demo || false);
            setIsAuthenticated(true);
          }
        })
        .catch(() => {
          sessionStorage.removeItem("adminPassword");
        });
    }
  }, []);

  // Export CSV
  const exportToCSV = () => {
    const headers = [
      "Référence", "Statut", "Date création", "Date paiement", "Montant (CHF)",
      "Méthode paiement", "Prénom", "Nom", "Email", "Téléphone", "Adresse",
      "NPA", "Ville", "Canton", "Année fiscale", "N° contribuable",
      "Type client", "Statut emploi", "Enfants", "Documents", "Commentaires"
    ];

    const rows = requests.map((r) => [
      r.reference,
      getStatusLabel(r.status),
      new Date(r.createdAt).toLocaleDateString("fr-CH"),
      r.paidAt ? new Date(r.paidAt).toLocaleDateString("fr-CH") : "",
      r.payment.amount.toString(),
      r.payment.method || "",
      r.customer.firstName,
      r.customer.lastName,
      r.customer.email,
      r.customer.phone || "",
      r.customer.address.street,
      r.customer.address.npa,
      r.customer.address.city,
      r.fiscal.canton,
      r.fiscal.taxYear.toString(),
      r.fiscal.taxpayerNumber || "",
      getClientTypeLabel(r.fiscal.clientType),
      getEmploymentLabel(r.fiscal.employmentStatus),
      r.situation.hasChildren ? (r.situation.childrenCount?.toString() || "Oui") : "Non",
      r.documents.length.toString(),
      `"${(r.options.comments || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.join(";")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `neofidu-demandes-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Date filter logic
  function isWithinDateRange(dateStr: string, from: string, to: string) {
    if (!from && !to) return true;
    const date = new Date(dateStr);
    if (from && date < new Date(from)) return false;
    if (to && date > new Date(to)) return false;
    return true;
  }

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;

    const matchesType = typeFilter === "all" || r.requestType === typeFilter;

    const matchesDate = isWithinDateRange(r.createdAt, dateFrom, dateTo);

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Nouveau",
      paid: "Payé",
      in_progress: "En cours",
      completed: "Terminé",
    };
    return labels[status] || status;
  };

  const getClientTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      private: "Particulier",
      couple: "Couple",
      independent: "Indépendant",
    };
    return labels[type] || type;
  };

  const getEmploymentLabel = (status?: string) => {
    if (!status) return "";
    const labels: Record<string, string> = {
      employed: "Salarié",
      retired: "Retraité",
      unemployed: "Chômeur",
      selfemployed: "Indépendant",
    };
    return labels[status] || status;
  };

  const getMaritalStatusLabel = (status?: string) => {
    if (!status) return "Non spécifié";
    const labels: Record<string, string> = {
      single: "Célibataire",
      married: "Marié(e)",
      divorced: "Divorcé(e)",
      widowed: "Veuf/Veuve",
      separated: "Séparé(e)",
      partnership: "Partenariat enregistré",
    };
    return labels[status] || status;
  };

  const getResidenceStatusLabel = (status?: string) => {
    if (!status) return "Non spécifié";
    const labels: Record<string, string> = {
      swiss: "Suisse (citoyen/ne)",
      permitB: "Permis B (séjour)",
      permitC: "Permis C (établissement)",
      permitG: "Permis G (frontalier)",
      permitL: "Permis L (séjour court)",
      permitF: "Permis F (admis provisoire)",
      other: "Autre",
    };
    return labels[status] || status;
  };

  const getTransportModeLabel = (mode?: string) => {
    if (!mode) return "Non spécifié";
    const labels: Record<string, string> = {
      train: "Transports publics",
      car: "Voiture",
      bike: "Vélo / À pied",
      none: "Télétravail",
    };
    return labels[mode] || mode;
  };

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Non spécifié";
    try {
      // Handle DD.MM.YYYY Swiss format (stored as-is in some records)
      const dotMatch = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
      if (dotMatch) {
        const [, day, month, year] = dotMatch;
        return new Date(+year, +month - 1, +day).toLocaleDateString("fr-CH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }
      return new Date(dateStr).toLocaleDateString("fr-CH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status: string, requestType?: string) => {
    switch (status) {
      // Statuts fiscaux
      case "pending":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Clock className="w-3 h-3 mr-1" />
            Nouveau
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Payé
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
            <FileCheck className="w-3 h-3 mr-1" />
            Terminé
          </Badge>
        );
      // Statuts comptabilité / gérance immobilière
      case "received":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Clock className="w-3 h-3 mr-1" />
            Reçu
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
            <RefreshCw className="w-3 h-3 mr-1" />
            En traitement
          </Badge>
        );
      case "done":
        return (
          <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
            <FileCheck className="w-3 h-3 mr-1" />
            Terminé
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    // Returns icon based on payment method, defaults to credit card
    return <CreditCard className="w-4 h-4" />;
  };

  // Écran de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Administration NeoFidu</h1>
            <p className="text-muted-foreground mt-2">
              Connectez-vous pour accéder au tableau de bord
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button
              onClick={handleLogin}
              disabled={isLoading || !password}
              className="w-full rounded-xl"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              Se connecter
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <div>
              <h1 className="font-bold">NeoFidu Admin</h1>
              <p className="text-xs text-muted-foreground">Tableau de bord</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isDemo && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                Mode Démo
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="rounded-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshRequests}
              disabled={isLoading}
              className="rounded-full"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className={`rounded-full ${!isStorageConfigured ? "border-amber-300 text-amber-600" : ""}`}
            >
              <a
                href={`https://supabase.com/dashboard/pm/${supabaseProjectRef}/media-explorer?q=folder%3Aneofidu*`}
                target="_blank"
                rel="noopener noreferrer"
                title={isStorageConfigured ? "Ouvrir les documents NeoFidu" : "Storage non configuré - Ajoutez NEXT_PUBLIC_SUPABASE_URL"}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Supabase Storage
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={checkConfiguration}
              className="rounded-full border-amber-300 text-amber-600 hover:bg-amber-50"
              title="Vérifier la configuration (Supabase Storage, Resend, Stripe)"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Diagnostic
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Modal de diagnostic */}
      {configDiagnostic.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                Diagnostic de Configuration
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfigDiagnostic({ ...configDiagnostic, show: false })}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {configDiagnostic.loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Vérification en cours...</p>
              </div>
            ) : configDiagnostic.error ? (
              <div className="text-center py-8 text-red-600">
                <XCircle className="w-8 h-8 mx-auto" />
                <p className="mt-4">{configDiagnostic.error}</p>
              </div>
            ) : configDiagnostic.data ? (
              <div className="space-y-4">
                {/* Issues */}
                {(configDiagnostic.data.issues as string[])?.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h3 className="font-semibold text-red-800 mb-2">⚠️ Problèmes détectés</h3>
                    <ul className="space-y-1">
                      {(configDiagnostic.data.issues as string[]).map((issue, i) => (
                        <li key={i} className="text-red-700 text-sm">{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Supabase Storage */}
                <div className={`p-4 rounded-xl border ${(configDiagnostic.data.storage as any)?.status?.includes("✅") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <h3 className="font-semibold mb-2">📁 Storage (Documents)</h3>
                  <p className={`${(configDiagnostic.data.storage as any)?.status?.includes("✅") ? "text-green-700" : "text-red-700"}`}>
                    {(configDiagnostic.data.storage as any)?.status}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cloud Name: {(configDiagnostic.data.storage as any)?.cloudNameValue}
                  </p>
                </div>

                {/* Email */}
                <div className={`p-4 rounded-xl border ${(configDiagnostic.data.email as any)?.status?.includes("✅") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <h3 className="font-semibold mb-2">📧 Resend (Emails)</h3>
                  <p className={`${(configDiagnostic.data.email as any)?.status?.includes("✅") ? "text-green-700" : "text-red-700"}`}>
                    {(configDiagnostic.data.email as any)?.status}
                  </p>
                </div>

                {/* Stripe */}
                <div className={`p-4 rounded-xl border ${(configDiagnostic.data.stripe as any)?.status?.includes("✅") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <h3 className="font-semibold mb-2">💳 Stripe (Paiements)</h3>
                  <p className={`${(configDiagnostic.data.stripe as any)?.status?.includes("✅") ? "text-green-700" : "text-red-700"}`}>
                    {(configDiagnostic.data.stripe as any)?.status}
                  </p>
                </div>

                {/* Supabase */}
                <div className={`p-4 rounded-xl border ${(configDiagnostic.data.supabase as any)?.status?.includes("✅") ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
                  <h3 className="font-semibold mb-2">🗄️ Supabase (Base de données)</h3>
                  <p className={`${(configDiagnostic.data.supabase as any)?.status?.includes("✅") ? "text-green-700" : "text-amber-700"}`}>
                    {(configDiagnostic.data.supabase as any)?.status}
                  </p>
                </div>

                {/* Instructions */}
                {(configDiagnostic.data.issues as string[])?.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                    <h3 className="font-semibold text-blue-800 mb-2">📋 Comment corriger</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Ajoutez les variables d'environnement manquantes dans GitHub :
                    </p>
                    <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                      <li>Allez dans <strong>GitHub &gt; Repository &gt; Settings &gt; Secrets and variables &gt; Actions</strong></li>
                      <li>Ajoutez les variables manquantes (voir .env.example)</li>
                      <li>Redéployez le projet via GitHub Actions</li>
                    </ol>
                    <p className="text-sm text-blue-700 mt-3">
                      <strong>Webhook Stripe :</strong> Configurez-le dans Stripe Dashboard &gt; Developers &gt; Webhooks
                      avec l'URL : <code className="bg-blue-100 px-1 rounded">https://neofidu.ch/api/webhooks/stripe</code>
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </Card>
        </div>
      )}

      {/* Modal modèle d'email de livraison */}
      {emailTemplateModal.show && emailTemplateModal.request && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Modèle d'email de livraison
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEmailTemplateModal({ show: false, request: null, copied: false })}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="mb-4">
              <p className="text-muted-foreground mb-2">
                Copiez ce modèle d'email pour informer le client que sa déclaration est prête.
              </p>
              <textarea
                className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-secondary/10"
                value={generateDeliveryEmailTemplate(emailTemplateModal.request)}
                readOnly
                style={{ resize: "vertical" }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={copyEmailToClipboard}
                className="rounded-xl"
                variant="default"
              >
                {emailTemplateModal.copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copié !
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-4 h-4 mr-2" />
                    Copier le texte
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                asChild
                title="Ouvrir le client email"
              >
                <a
                  href={`mailto:${emailTemplateModal.request.customer.email}?subject=Votre déclaration d'impôts ${emailTemplateModal.request.fiscal.taxYear} est prête - Réf. ${emailTemplateModal.request.reference}&body=${encodeURIComponent(generateDeliveryEmailTemplate(emailTemplateModal.request))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Ouvrir dans l'email
                </a>
              </Button>
            </div>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenus</p>
                  <p className="text-xl font-bold">CHF {stats.totalRevenue}.-</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total demandes</p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">En cours</p>
                  <p className="text-xl font-bold">{stats.inProgress}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Terminées</p>
                  <p className="text-xl font-bold">{stats.completed}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">En attente</p>
                  <p className="text-xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        {chartData && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Statistiques
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCharts(!showCharts)}
                className="text-muted-foreground"
              >
                {showCharts ? "Masquer" : "Afficher"}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showCharts ? "rotate-180" : ""}`} />
              </Button>
            </div>

            {showCharts && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Graphique des demandes par jour */}
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Demandes des 30 derniers jours</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.daily}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => new Date(value).toLocaleDateString("fr-CH", { day: "2-digit", month: "2-digit" })}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "count" ? `${value} demande(s)` : `CHF ${value}.-`,
                            name === "count" ? "Demandes" : "Revenus"
                          ]}
                          labelFormatter={(label) => new Date(String(label)).toLocaleDateString("fr-CH")}
                        />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="#10B981"
                          fill="#10B98133"
                          name="count"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Graphique par canton */}
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Répartition par canton</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.byCanton}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="canton" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "count" ? `${value} demande(s)` : `CHF ${value}.-`,
                            name === "count" ? "Demandes" : "Revenus"
                          ]}
                        />
                        <Bar dataKey="count" name="count">
                          {chartData.byCanton.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Status History Section */}
        {statusHistory.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Historique des modifications
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="text-muted-foreground"
              >
                {showHistory ? "Masquer" : "Afficher"}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showHistory ? "rotate-180" : ""}`} />
              </Button>
            </div>

            {showHistory && (
              <Card className="overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50 sticky top-0">
                      <tr>
                        <th className="text-left p-3 font-medium text-sm">Référence</th>
                        <th className="text-left p-3 font-medium text-sm">Changement</th>
                        <th className="text-left p-3 font-medium text-sm">Date</th>
                        <th className="text-left p-3 font-medium text-sm">Notification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statusHistory.slice(0, 20).map((entry) => (
                        <tr key={entry.id} className="border-t hover:bg-secondary/20">
                          <td className="p-3">
                            <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                              {entry.request_reference}
                            </code>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2 text-sm">
                              {getStatusBadge(entry.old_status)}
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              {getStatusBadge(entry.new_status)}
                            </div>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {new Date(entry.changed_at).toLocaleDateString("fr-CH", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="p-3">
                            {entry.notification_sent ? (
                              <Badge className="bg-green-100 text-green-700">
                                <Mail className="w-3 h-3 mr-1" />
                                Envoyée
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                                Non envoyée
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Newsletter Subscribers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Newsletter ({newsletterTotal} abonné{newsletterTotal > 1 ? "s" : ""})
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchNewsletterSubscribers}
                disabled={newsletterLoading}
                className="text-muted-foreground"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${newsletterLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowNewsletter(!showNewsletter);
                  if (!showNewsletter && newsletterSubscribers.length === 0) {
                    fetchNewsletterSubscribers();
                  }
                }}
                className="text-muted-foreground"
              >
                {showNewsletter ? "Masquer" : "Afficher"}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showNewsletter ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>

          {showNewsletter && (
            <Card className="p-6">
              {!newsletterTableExists ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Table non créée</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    La table `newsletter_subscribers` n'existe pas dans Supabase.
                  </p>
                  <div className="bg-muted p-4 rounded-lg text-left max-w-xl mx-auto">
                    <p className="text-xs font-mono mb-2">SQL à exécuter dans Supabase :</p>
                    <pre className="text-xs overflow-x-auto bg-black text-green-400 p-3 rounded">
{`CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  source VARCHAR(50) DEFAULT 'blog',
  ip_address VARCHAR(50),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  resubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);`}
                    </pre>
                  </div>
                </div>
              ) : newsletterLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground mt-2">Chargement...</p>
                </div>
              ) : newsletterSubscribers.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {newsletterMessage || "Aucun abonné pour le moment"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Email</th>
                        <th className="text-left py-3 px-2 font-medium">Prénom</th>
                        <th className="text-left py-3 px-2 font-medium">Statut</th>
                        <th className="text-left py-3 px-2 font-medium">Source</th>
                        <th className="text-left py-3 px-2 font-medium">Inscrit le</th>
                        <th className="text-right py-3 px-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsletterSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2 font-medium">{subscriber.email}</td>
                          <td className="py-3 px-2">{subscriber.first_name || "-"}</td>
                          <td className="py-3 px-2">
                            <Badge className={subscriber.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
                              {subscriber.status === "active" ? "Actif" : subscriber.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">{subscriber.source || "-"}</td>
                          <td className="py-3 px-2 text-muted-foreground">
                            {new Date(subscriber.subscribed_at).toLocaleDateString("fr-CH")}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNewsletterSubscriber(subscriber.id, subscriber.email)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email ou référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white text-sm"
          >
            <option value="all">Tous les types</option>
            <option value="tax">Fiscal</option>
            <option value="accounting">Comptabilité</option>
            <option value="property">Gérance immo</option>
            <option value="creation">Création entreprise</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">Nouveau</option>
            <option value="paid">Payé</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
          </select>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">Du</span>
            <Input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="rounded-xl text-sm w-40"
              title="Date de début"
            />
            <span className="text-sm text-muted-foreground">au</span>
            <Input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="rounded-xl text-sm w-40"
              title="Date de fin"
            />
          </div>
          {(searchTerm || statusFilter !== "all" || typeFilter !== "all" || dateFrom || dateTo) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setTypeFilter("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4 mr-1" />
              Effacer les filtres
            </Button>
          )}
        </div>

        {/* Requests table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left p-4 font-medium w-8"></th>
                  <th className="text-left p-4 font-medium">Référence</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Client</th>
                  <th className="text-left p-4 font-medium">Canton</th>
                  <th className="text-left p-4 font-medium">Année</th>
                  <th className="text-left p-4 font-medium">Montant</th>
                  <th className="text-left p-4 font-medium">Docs</th>
                  <th className="text-left p-4 font-medium">Statut</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Voir</th>
                  <th className="text-left p-4 font-medium">Supabase Storage</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-muted-foreground">
                      Aucune demande trouvée
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <React.Fragment key={request.id}>
                      <tr
                        className="border-t hover:bg-secondary/30 transition-colors cursor-pointer"
                        onClick={() => toggleRow(request.id)}
                      >
                        <td className="p-4">
                          <button className="text-muted-foreground hover:text-foreground">
                            {expandedRows.has(request.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="p-4">
                          <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                            {request.reference}
                          </code>
                        </td>
                        <td className="p-4">
                          {request.requestType === "accounting" ? (
                            <Badge className="bg-purple-100 text-purple-700">Compta</Badge>
                          ) : request.requestType === "property" ? (
                            <Badge className="bg-orange-100 text-orange-700">Immo</Badge>
                          ) : request.requestType === "creation" ? (
                            <Badge className="bg-violet-100 text-violet-700">Création</Badge>
                          ) : (
                            <Badge className="bg-teal-100 text-teal-700">Fiscal</Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              {request.customer.firstName} {request.customer.lastName}
                              {request.companyName && <span className="text-muted-foreground ml-1">({request.companyName})</span>}
                            </p>
                            <p className="text-sm text-muted-foreground">{request.customer.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{request.fiscal.cantonCode}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold">{request.fiscal.taxYear}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(request.payment.method)}
                            <span className="font-semibold">
                              CHF {request.payment.amount}.-
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {hasMissingDocuments(request) ? (
                            <Badge className="bg-red-100 text-red-700" title="Documents non uploadés - Storage non configuré lors de l'upload">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {request.documents.length} ⚠️
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100">
                              <FileText className="w-3 h-3 mr-1" />
                              {request.documents.length}
                            </Badge>
                          )}
                        </td>
                        <td className="p-4">
                          {inlineEditingId === request.id ? (
                            <div className="flex items-center gap-2">
                              <select
                                value={newStatus || request.status}
                                onChange={e => setNewStatus(e.target.value)}
                                className="px-2 py-1 border rounded-lg bg-white text-sm"
                                onClick={e => e.stopPropagation()}
                              >
                                {request.requestType === "accounting" || request.requestType === "property" ? (
                                  <>
                                    <option value="received">Reçu</option>
                                    <option value="processing">En traitement</option>
                                    <option value="done">Terminé</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="paid">Payé</option>
                                    <option value="in_progress">En cours</option>
                                    <option value="completed">Terminé</option>
                                  </>
                                )}
                              </select>
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-primary text-white hover:bg-primary/90"
                                onClick={e => {
                                  e.stopPropagation();
                                  updateRequestStatus(request.id, newStatus || request.status, request.status, request.requestType);
                                }}
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Send className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={e => {
                                  e.stopPropagation();
                                  setInlineEditingId(null);
                                  setNewStatus("");
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {getStatusBadge(request.status, request.requestType)}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-muted-foreground hover:text-primary"
                                onClick={e => {
                                  e.stopPropagation();
                                  setInlineEditingId(request.id);
                                  setNewStatus(request.status);
                                }}
                                title="Modifier le statut"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString("fr-CH", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRequest(request);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            title="Ouvrir le dossier Supabase"
                            onClick={e => e.stopPropagation()}
                          >
                            <a
                              href={getStorageFolderUrl(
                                request.reference,
                                request.createdAt,
                                request.customer.lastName,
                                request.customer.firstName
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FolderOpen className="w-4 h-4 mr-1" />
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </td>
                      </tr>
                      {expandedRows.has(request.id) && (
                        <tr className="bg-secondary/20">
                          <td colSpan={12} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <User className="w-4 h-4" /> Coordonnées
                                </h4>
                                <div className="text-sm space-y-1 pl-6">
                                  <p>{request.customer.address.street}</p>
                                  <p>{request.customer.address.npa} {request.customer.address.city}</p>
                                  {request.customer.phone && <p>{request.customer.phone}</p>}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <Briefcase className="w-4 h-4" /> Infos fiscales
                                </h4>
                                <div className="text-sm space-y-1 pl-6">
                                  <p>Type: {getClientTypeLabel(request.fiscal.clientType)}{request.fiscal.isIndependent && request.fiscal.clientType === "couple" ? " + Indépendant" : ""}</p>
                                  {request.fiscal.taxpayerNumber && (
                                    <p>N° contribuable: {request.fiscal.taxpayerNumber}</p>
                                  )}
                                  <p>Statut: {getEmploymentLabel(request.fiscal.employmentStatus) || "Non spécifié"}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm flex items-center gap-2">
                                  <FileText className="w-4 h-4" /> Documents ({request.documents.length})
                                </h4>
                                <div className="text-sm space-y-1 pl-6 max-h-24 overflow-y-auto">
                                  {request.documents.slice(0, 4).map((doc, i) => (
                                    <p key={i} className="truncate text-muted-foreground">
                                      {doc.url ? (
                                        <a
                                          href={fixStorageUrl(doc.url)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="hover:text-primary hover:underline"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          {doc.name}
                                        </a>
                                      ) : (
                                        doc.name
                                      )}
                                    </p>
                                  ))}
                                  {request.documents.length > 4 && (
                                    <p className="text-muted-foreground">
                                      +{request.documents.length - 4} autres...
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* Actions rapides */}
                            <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                disabled={resendingEmailFor === request.reference}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resendConfirmationEmail(request.reference);
                                }}
                                title="Renvoyer l'email de confirmation au client"
                              >
                                {resendingEmailFor === request.reference ? (
                                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                                ) : (
                                  <Mail className="w-4 h-4 mr-1" />
                                )}
                                Renvoyer email confirmation
                              </Button>
                              {resendEmailResult?.reference === request.reference && (
                                <span className={`text-sm px-2 py-1 rounded ${resendEmailResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                  {resendEmailResult.message}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Footer info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            {filteredRequests.length} demande(s) affichée(s)
            {isDemo && " (Mode démonstration)"}
          </p>
        </div>
      </main>

      {/* Modal détails */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Demande {selectedRequest.reference}</h2>
                <p className="text-sm text-muted-foreground">
                  Créée le {new Date(selectedRequest.createdAt).toLocaleDateString("fr-CH")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Bouton Aperçu PDF */}
                {selectedRequest.requestType !== "accounting" && selectedRequest.requestType !== "property" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const url = generatePDFPreview(selectedRequest);
                      setPdfPreviewUrl(url);
                      setPdfPreviewRequest(selectedRequest);
                    }}
                    className="text-primary border-primary hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Aperçu PDF
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Message de mise à jour */}
              {updateMessage && (
                <div className={`p-3 rounded-lg flex items-center gap-2 ${
                  updateMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {updateMessage.type === "success" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {updateMessage.text}
                </div>
              )}

              {/* En-tête avec statut et paiement */}
              <div className="bg-secondary/30 p-4 rounded-xl space-y-4">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    {editingStatus === selectedRequest.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={newStatus || selectedRequest.status}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="px-3 py-2 border rounded-lg bg-white text-sm"
                        >
                          {selectedRequest.requestType === "accounting" || selectedRequest.requestType === "property" ? (
                            <>
                              <option value="received">Reçu</option>
                              <option value="processing">En traitement</option>
                              <option value="done">Terminé</option>
                            </>
                          ) : (
                            <>
                              <option value="paid">Payé</option>
                              <option value="in_progress">En cours</option>
                              <option value="completed">Terminé</option>
                            </>
                          )}
                        </select>
                      </div>
                    ) : (
                      <>
                        {getStatusBadge(selectedRequest.status, selectedRequest.requestType)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingStatus(selectedRequest.id);
                            setNewStatus(selectedRequest.status);
                            setUpdateMessage(null);
                          }}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Modifier
                        </Button>
                      </>
                    )}
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {selectedRequest.fiscal.cantonCode} - {selectedRequest.fiscal.taxYear}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-bold">
                    {getPaymentMethodIcon(selectedRequest.payment.method)}
                    CHF {selectedRequest.payment.amount}.-
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    title="Ouvrir le dossier Supabase"
                  >
                    <a
                      href={getStorageFolderUrl(
                        selectedRequest.reference,
                        selectedRequest.createdAt,
                        selectedRequest.customer.lastName,
                        selectedRequest.customer.firstName
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FolderOpen className="w-4 h-4 mr-1" />
                      Supabase Storage
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  {/* Bouton modèle d'email pour demandes terminées */}
                  {(selectedRequest.status === "completed" || selectedRequest.status === "done") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEmailTemplateModal({
                        show: true,
                        request: selectedRequest,
                        copied: false,
                      })}
                      title="Modèle d'email de livraison"
                      className="text-primary border-primary/30 hover:bg-primary/10"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email livraison
                    </Button>
                  )}
                </div>

                {/* Options de modification */}
                {editingStatus === selectedRequest.id && (
                  <div className="pt-3 border-t border-secondary flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendNotification}
                        onChange={(e) => setSendNotification(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <Bell className="w-4 h-4" />
                      Envoyer une notification au client
                    </label>
                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingStatus(null);
                          setUpdateMessage(null);
                        }}
                      >
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateRequestStatus(selectedRequest.id, newStatus || selectedRequest.status, selectedRequest.status, selectedRequest.requestType)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-1" />
                        )}
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Grille d'informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-primary">
                    <User className="w-5 h-5" /> Client
                  </h3>
                  <div className="bg-secondary/20 p-4 rounded-xl space-y-2">
                    <p className="font-medium text-lg">
                      {selectedRequest.customer.firstName} {selectedRequest.customer.lastName}
                      {selectedRequest.customer.firstName2 && (
                        <span> & {selectedRequest.customer.firstName2} {selectedRequest.customer.lastName2}</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${selectedRequest.customer.email}`} className="hover:text-primary">
                        {selectedRequest.customer.email}
                      </a>
                    </div>
                    {selectedRequest.customer.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${selectedRequest.customer.phone}`} className="hover:text-primary">
                          {selectedRequest.customer.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-sm">
                      <Home className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{selectedRequest.customer.address.street}</p>
                        <p>{selectedRequest.customer.address.npa} {selectedRequest.customer.address.city}</p>
                      </div>
                    </div>
                    {/* Date de naissance et état civil */}
                    <div className="border-t pt-2 mt-2 grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Date de naissance</p>
                      <p className="font-medium">{formatDate(selectedRequest.customer.birthDate)}</p>
                      <p className="text-muted-foreground">État civil</p>
                      <p className="font-medium">{getMaritalStatusLabel(selectedRequest.customer.maritalStatus)}</p>
                      <p className="text-muted-foreground">Statut de résidence</p>
                      <p className="font-medium">{getResidenceStatusLabel(selectedRequest.customer.residenceStatus)}</p>
                      {selectedRequest.customer.birthDate2 && (
                        <>
                          <p className="text-muted-foreground">Naissance conjoint</p>
                          <p className="font-medium">{formatDate(selectedRequest.customer.birthDate2)}</p>
                          <p className="text-muted-foreground">Statut de résidence (conjoint)</p>
                          <p className="font-medium">{getResidenceStatusLabel(selectedRequest.customer.residenceStatus2)}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section spécifique Comptabilité */}
                {selectedRequest.requestType === "accounting" && (
                  <div className="space-y-3 md:col-span-2">
                    <h3 className="font-semibold flex items-center gap-2 text-purple-600">
                      <Briefcase className="w-5 h-5" /> Informations Comptabilité
                    </h3>
                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Colonne 1: Entreprise */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-purple-800 text-sm">Entreprise</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {selectedRequest.companyName && (
                              <>
                                <p className="text-purple-700">Raison sociale</p>
                                <p className="font-medium text-purple-900">{selectedRequest.companyName}</p>
                              </>
                            )}
                            {selectedRequest.businessType && (
                              <>
                                <p className="text-purple-700">Forme juridique</p>
                                <p className="font-medium text-purple-900">
                                  {selectedRequest.businessType === "sarl" ? "Sàrl" :
                                   selectedRequest.businessType === "sa" ? "SA" :
                                   selectedRequest.businessType === "independent" ? "Indépendant" :
                                   selectedRequest.businessType === "individual" ? "Raison individuelle" :
                                   selectedRequest.businessType === "other" ? "Autre" :
                                   selectedRequest.businessType || "Non précisé"}
                                </p>
                              </>
                            )}
                            {selectedRequest.fiscal.canton && (
                              <>
                                <p className="text-purple-700">Canton</p>
                                <p className="font-medium text-purple-900">{selectedRequest.fiscal.canton}</p>
                              </>
                            )}
                            {selectedRequest.activity && (
                              <>
                                <p className="text-purple-700">Activité</p>
                                <p className="font-medium text-purple-900">{selectedRequest.activity}</p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Colonne 2: Données financières */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-purple-800 text-sm">Données financières</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {selectedRequest.employeesCount !== undefined && (
                              <>
                                <p className="text-purple-700">Employés</p>
                                <p className="font-medium text-purple-900">{selectedRequest.employeesCount}</p>
                              </>
                            )}
                            {selectedRequest.annualRevenue && (
                              <>
                                <p className="text-purple-700">CA annuel</p>
                                <p className="font-medium text-purple-900">{selectedRequest.annualRevenue}</p>
                              </>
                            )}
                            {selectedRequest.monthlyTransactions && (
                              <>
                                <p className="text-purple-700">Transactions/mois</p>
                                <p className="font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{selectedRequest.monthlyTransactions}</p>
                              </>
                            )}
                            <p className="text-purple-700">Assujetti TVA</p>
                            <p className="font-medium text-purple-900">{selectedRequest.isVatRegistered ? "✅ Oui" : "Non"}</p>
                          </div>
                        </div>

                        {/* Colonne 3: Services et facturation */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-purple-800 text-sm">Services demandés</h4>
                          {selectedRequest.selectedServices && selectedRequest.selectedServices.length > 0 ? (
                            <ul className="text-sm space-y-1 text-purple-900">
                              {selectedRequest.selectedServices.map((service, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                                  {service}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-purple-700 italic">Aucun service spécifié</p>
                          )}

                          {selectedRequest.billingFrequency && (
                            <div className="mt-3 pt-3 border-t border-purple-200">
                              <p className="text-purple-700 text-sm">Fréquence</p>
                              <p className="font-medium text-purple-900">
                                {selectedRequest.billingFrequency === "monthly" ? "Mensuelle" : "Annuelle (-10%)"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Commentaires spécifiques comptabilité */}
                      {selectedRequest.options.comments && (
                        <div className="mt-4 pt-4 border-t border-purple-200">
                          <h4 className="font-medium text-purple-800 text-sm mb-2">Commentaires / Besoins spécifiques</h4>
                          <p className="text-sm text-purple-900 bg-white p-3 rounded-lg border border-purple-100">
                            {selectedRequest.options.comments}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Section spécifique Gérance immobilière */}
                {selectedRequest.requestType === "property" && selectedRequest.propertyAddress && (
                  <div className="space-y-3 md:col-span-2">
                    <h3 className="font-semibold flex items-center gap-2 text-orange-600">
                      <Home className="w-5 h-5" /> Gérance immobilière
                    </h3>
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-orange-700">Adresse du bien</p>
                        <p className="font-medium text-orange-900">{selectedRequest.propertyAddress}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section spécifique Création d'entreprise */}
                {selectedRequest.requestType === "creation" && (
                  <div className="space-y-3 md:col-span-2">
                    <h3 className="font-semibold flex items-center gap-2 text-violet-600">
                      <Building2 className="w-5 h-5" /> Création d'entreprise
                    </h3>
                    <div className="bg-violet-50 border border-violet-200 p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-violet-700 mb-1">Type d'entreprise</p>
                          <p className="font-semibold text-violet-900">
                            {selectedRequest.companyTypeName || selectedRequest.companyType || "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-violet-700 mb-1">Canton</p>
                          <p className="font-medium text-violet-900">
                            {selectedRequest.fiscal?.canton || "Non spécifié"}
                          </p>
                        </div>
                      </div>
                      {selectedRequest.projectDescription && (
                        <div className="mt-4 pt-4 border-t border-violet-200">
                          <p className="text-violet-700 mb-2">Description du projet</p>
                          <p className="text-sm text-violet-900 bg-white p-3 rounded-lg border border-violet-100">
                            {selectedRequest.projectDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Fiscal */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-primary">
                    <Briefcase className="w-5 h-5" /> Informations fiscales
                  </h3>
                  <div className="bg-secondary/20 p-4 rounded-xl space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Canton</p>
                      <p className="font-medium">{selectedRequest.fiscal.canton}</p>

                      <p className="text-muted-foreground">Année fiscale</p>
                      <p className="font-medium">{selectedRequest.fiscal.taxYear}</p>

                      <p className="text-muted-foreground">Type de client</p>
                      <p className="font-medium">{getClientTypeLabel(selectedRequest.fiscal.clientType)}{selectedRequest.fiscal.isIndependent && selectedRequest.fiscal.clientType === "couple" ? " + Indépendant" : ""}</p>

                      {selectedRequest.fiscal.taxpayerNumber && (
                        <>
                          <p className="text-muted-foreground">N° contribuable</p>
                          <p className="font-medium font-mono">{selectedRequest.fiscal.taxpayerNumber}</p>
                        </>
                      )}

                      {selectedRequest.fiscal.declarationCode && (
                        <>
                          <p className="text-muted-foreground">Code déclaration</p>
                          <p className="font-medium font-mono">{selectedRequest.fiscal.declarationCode}</p>
                        </>
                      )}

                      {/* Suisse de l'étranger */}
                      {selectedRequest.fiscal.livesAbroad && (
                        <div className="col-span-2 my-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-amber-600" />
                            <span className="font-semibold text-amber-800">Suisse de l'étranger</span>
                            <Badge className="bg-amber-100 text-amber-700 text-xs">+CHF 50.-</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <p className="text-amber-700">Pays de résidence</p>
                            <p className="font-medium text-amber-900">
                              {selectedRequest.fiscal.countryOfResidenceName || selectedRequest.fiscal.countryOfResidence || "Non précisé"}
                            </p>
                            {selectedRequest.fiscal.abroadAddress && (
                              <>
                                <p className="text-amber-700">Adresse à l'étranger</p>
                                <p className="font-medium text-amber-900 whitespace-pre-line">{selectedRequest.fiscal.abroadAddress}</p>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      <p className="text-muted-foreground">Statut emploi</p>
                      <p className="font-medium">
                        {getEmploymentLabel(selectedRequest.fiscal.employmentStatus) || "Non spécifié"}
                        {selectedRequest.fiscal.occupationRate && ` (${selectedRequest.fiscal.occupationRate}%)`}
                      </p>

                      {selectedRequest.fiscal.employmentStatus2 && (
                        <>
                          <p className="text-muted-foreground">Statut conjoint</p>
                          <p className="font-medium">
                            {getEmploymentLabel(selectedRequest.fiscal.employmentStatus2) || "Non spécifié"}
                            {selectedRequest.fiscal.occupationRate2 && ` (${selectedRequest.fiscal.occupationRate2}%)`}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Activité indépendante - Adulte 1 */}
                {selectedRequest.fiscal.isIndependent && selectedRequest.business && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-amber-600">
                      <Briefcase className="w-5 h-5" />
                      Activité indépendante
                      {selectedRequest.fiscal.clientType === "couple" && ` - ${selectedRequest.customer.firstName}`}
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-amber-700">Type d'activité</p>
                        <p className="font-medium text-amber-900">{selectedRequest.business.businessType || "Non précisé"}</p>

                        {selectedRequest.business.businessStartDate && (
                          <>
                            <p className="text-amber-700">Début activité</p>
                            <p className="font-medium text-amber-900">{formatDate(selectedRequest.business.businessStartDate)}</p>
                          </>
                        )}

                        {selectedRequest.business.hasIDE && (
                          <>
                            <p className="text-amber-700">N° IDE</p>
                            <p className="font-medium text-amber-900 font-mono">{selectedRequest.business.ideNumber}</p>
                          </>
                        )}

                        <p className="text-amber-700">Registre du commerce</p>
                        <p className="font-medium text-amber-900">{selectedRequest.business.isRegisteredRC ? "Oui" : "Non"}</p>

                        {selectedRequest.business.hasVAT && (
                          <>
                            <p className="text-amber-700">N° TVA</p>
                            <p className="font-medium text-amber-900 font-mono">{selectedRequest.business.vatNumber}</p>
                          </>
                        )}

                        {selectedRequest.business.hasBusinessAccounts ? (
                          <>
                            <p className="text-amber-700">Comptabilité</p>
                            <p className="font-medium text-amber-900">Bilan & compte de résultat fournis</p>
                          </>
                        ) : (
                          <>
                            {selectedRequest.business.businessRevenue && (
                              <>
                                <p className="text-amber-700">Chiffre d'affaires</p>
                                <p className="font-medium text-amber-900">CHF {selectedRequest.business.businessRevenue}.-</p>
                              </>
                            )}
                            {selectedRequest.business.businessExpenses && (
                              <>
                                <p className="text-amber-700">Charges</p>
                                <p className="font-medium text-amber-900">CHF {selectedRequest.business.businessExpenses}.-</p>
                              </>
                            )}
                            {selectedRequest.business.businessNetIncome && (
                              <>
                                <p className="text-amber-700">Bénéfice net</p>
                                <p className="font-bold text-amber-900">CHF {selectedRequest.business.businessNetIncome}.-</p>
                              </>
                            )}
                          </>
                        )}

                        {selectedRequest.business.hasAVSIndependent && (
                          <>
                            <p className="text-amber-700">Cotisations AVS</p>
                            <p className="font-medium text-amber-900">CHF {selectedRequest.business.avsIndependentAmount || 0}.-</p>
                          </>
                        )}

                      {selectedRequest.business.hasLPPVoluntary && (
                  <>
                    <p className="text-amber-700">LPP facultative</p>
                    <p className="font-medium text-amber-900">CHF {selectedRequest.business.lppVoluntaryAmount || 0}.-</p>
                  </>
                )}

                {selectedRequest.business.hasHomeOffice && (
                  <>
                    <p className="text-amber-700">Home office</p>
                    <p className="font-medium text-amber-900">{selectedRequest.business.homeOfficePercent}% — CHF {selectedRequest.business.homeOfficeAmount || 0}.-</p>
                  </>
                )}

                {selectedRequest.business.hasBusinessVehicle && (
                  <>
                    <p className="text-amber-700">Véhicule professionnel</p>
                    <p className="font-medium text-amber-900">{selectedRequest.business.businessVehiclePercent}% pro — CHF {selectedRequest.business.businessVehicleExpenses || 0}.-</p>
                  </>
                )}
              </div>
                    </div>
                  </div>
                )}

                {/* Activité indépendante - Adulte 2 (Conjoint) */}
                {selectedRequest.fiscal.clientType === "couple" && selectedRequest.business?.isIndependent2 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-blue-600">
                      <Briefcase className="w-5 h-5" />
                      Activité indépendante - {selectedRequest.customer.firstName2 || "Conjoint"}
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-blue-700">Type d'activité</p>
                        <p className="font-medium text-blue-900">{selectedRequest.business.businessType2 || "Non précisé"}</p>

                        {selectedRequest.business.businessStartDate2 && (
                          <>
                            <p className="text-blue-700">Début activité</p>
                            <p className="font-medium text-blue-900">{formatDate(selectedRequest.business.businessStartDate2)}</p>
                          </>
                        )}

                        {selectedRequest.business.hasIDE2 && (
                          <>
                            <p className="text-blue-700">N° IDE</p>
                            <p className="font-medium text-blue-900 font-mono">{selectedRequest.business.ideNumber2}</p>
                          </>
                        )}

                        <p className="text-blue-700">Registre du commerce</p>
                        <p className="font-medium text-blue-900">{selectedRequest.business.isRegisteredRC2 ? "Oui" : "Non"}</p>

                        {selectedRequest.business.hasVAT2 && (
                          <>
                            <p className="text-blue-700">N° TVA</p>
                            <p className="font-medium text-blue-900 font-mono">{selectedRequest.business.vatNumber2}</p>
                          </>
                        )}

                        {selectedRequest.business.hasBusinessAccounts2 ? (
                          <>
                            <p className="text-blue-700">Comptabilité</p>
                            <p className="font-medium text-blue-900">Bilan & compte de résultat fournis</p>
                          </>
                        ) : (
                          <>
                            {selectedRequest.business.businessRevenue2 && (
                              <>
                                <p className="text-blue-700">Chiffre d'affaires</p>
                                <p className="font-medium text-blue-900">CHF {selectedRequest.business.businessRevenue2}.-</p>
                              </>
                            )}
                            {selectedRequest.business.businessExpenses2 && (
                              <>
                                <p className="text-blue-700">Charges</p>
                                <p className="font-medium text-blue-900">CHF {selectedRequest.business.businessExpenses2}.-</p>
                              </>
                            )}
                            {(selectedRequest.business.businessRevenue2 && selectedRequest.business.businessExpenses2) && (
                              <>
                                <p className="text-blue-700">Bénéfice net</p>
                                <p className="font-bold text-blue-900">
                                  CHF {Number(selectedRequest.business.businessRevenue2) - Number(selectedRequest.business.businessExpenses2)}.-
                                </p>
                              </>
                            )}
                          </>
                        )}

                        {selectedRequest.business.hasAVSIndependent2 && (
                          <>
                            <p className="text-blue-700">Cotisations AVS</p>
                            <p className="font-medium text-blue-900">CHF {selectedRequest.business.avsIndependentAmount2 || 0}.-</p>
                          </>
                        )}

                       {selectedRequest.business.hasLPPVoluntary2 && (
                  <>
                    <p className="text-blue-700">LPP facultative</p>
                    <p className="font-medium text-blue-900">CHF {selectedRequest.business.lppVoluntaryAmount2 || 0}.-</p>
                  </>
                )}

                {selectedRequest.business.hasHomeOffice2 && (
                  <>
                    <p className="text-blue-700">Home office</p>
                    <p className="font-medium text-blue-900">{selectedRequest.business.homeOfficePercent2}% — CHF {selectedRequest.business.homeOfficeAmount2 || 0}.-</p>
                  </>
                )}

                {selectedRequest.business.hasBusinessVehicle2 && (
                  <>
                    <p className="text-blue-700">Véhicule professionnel</p>
                    <p className="font-medium text-blue-900">{selectedRequest.business.businessVehiclePercent2}% pro — CHF {selectedRequest.business.businessVehicleExpenses2 || 0}.-</p>
                  </>
                )}
              </div>
                    </div>
                  </div>
                )}

                {/* Situation */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" /> Situation personnelle
                  </h3>
                  <div className="bg-secondary/20 p-4 rounded-xl space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Déménagement</p>
                      <p className="font-medium">{selectedRequest.situation.hasMoved ? "Oui" : "Non"}</p>

                      <p className="text-muted-foreground">Enfants à charge</p>
                      <p className="font-medium">
                        {selectedRequest.situation.hasChildren
                          ? `Oui (${selectedRequest.situation.childrenCount || 0})`
                          : "Non"}
                      </p>
                    </div>

                    {/* Détail des enfants */}
                    {selectedRequest.situation.children && selectedRequest.situation.children.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <p className="text-sm font-semibold text-primary">Détail des enfants :</p>
                        {selectedRequest.situation.children.map((child, idx) => {
                          // Calculate age
                          const birthDate = child.birthDate ? new Date(child.birthDate) : null;
                          const age = birthDate ? Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null;

                          // Activity labels
                          const activityLabels: Record<string, string> = {
                            student_primary: "Écolier/ère",
                            student_high: "Gymnase/collège",
                            student_university: "Étudiant/e",
                            apprentice: "Apprenti/e",
                            employed: "Employé/e",
                            unemployed: "Sans activité",
                            other: "Autre",
                          };

                          // Custody labels
                          const custodyLabels: Record<string, string> = {
                            full: "Garde exclusive",
                            shared_main: "Garde partagée (principal)",
                            shared_equal: "Garde alternée 50/50",
                            shared_secondary: "Garde partagée (secondaire)",
                          };

                          return (
                            <div key={idx} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-blue-800">
                                  {child.firstName} {child.lastName}
                                  {age !== null && <span className="ml-2 text-xs bg-blue-200 px-2 py-0.5 rounded-full">{age} ans</span>}
                                </p>
                                {child.isDependent && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    À charge {child.dependentPercentage}%
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-muted-foreground">Né(e) le :</span>
                                <span>{child.birthDate ? new Date(child.birthDate).toLocaleDateString('fr-CH') : '-'}</span>

                                <span className="text-muted-foreground">Activité :</span>
                                <span>{activityLabels[child.activity] || child.activity || '-'}</span>

                                {child.custodyType && child.custodyType !== 'full' && (
                                  <>
                                    <span className="text-muted-foreground">Garde :</span>
                                    <span className="text-amber-700">{custodyLabels[child.custodyType] || child.custodyType}</span>
                                  </>
                                )}

                                {child.hasGuardCosts && (
                                  <>
                                    <span className="text-muted-foreground">Frais de garde :</span>
                                    <span>CHF {child.guardCostsAmount || '0'}.- ({child.guardCostsDescription || 'non précisé'})</span>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-sm">

                      {selectedRequest.situation.monthlyRent && (
                        <>
                          <p className="text-muted-foreground">Loyer mensuel</p>
                          <p className="font-medium">CHF {selectedRequest.situation.monthlyRent}.-</p>
                        </>
                      )}

                      {/* Identité bailleur (NE, FR, JU) */}
                      {selectedRequest.situation.landlordName && (
                        <>
                          <p className="text-muted-foreground">Bailleur / Gérance</p>
                          <p className="font-medium">{selectedRequest.situation.landlordName}</p>
                        </>
                      )}

                      {selectedRequest.situation.landlordAddress && (
                        <>
                          <p className="text-muted-foreground">Adresse bailleur</p>
                          <p className="font-medium">{selectedRequest.situation.landlordAddress}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Activité indépendante */}
                {selectedRequest.business && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-amber-600">
                      <Briefcase className="w-5 h-5" /> Activité indépendante
                    </h3>
                    <div className="bg-amber-50 p-4 rounded-xl space-y-2 border border-amber-200">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {selectedRequest.business.businessType && (
                          <>
                            <p className="text-muted-foreground">Type d'activité</p>
                            <p className="font-medium">{selectedRequest.business.businessType}</p>
                          </>
                        )}

                        {selectedRequest.business.businessStartDate && (
                          <>
                            <p className="text-muted-foreground">Début d'activité</p>
                            <p className="font-medium">{formatDate(selectedRequest.business.businessStartDate)}</p>
                          </>
                        )}

                        {selectedRequest.business.hasIDE && (
                          <>
                            <p className="text-muted-foreground">Numéro IDE</p>
                            <p className="font-medium font-mono">{selectedRequest.business.ideNumber || "Oui"}</p>
                          </>
                        )}

                        <p className="text-muted-foreground">Registre du Commerce</p>
                        <p className="font-medium">{selectedRequest.business.isRegisteredRC ? "Oui" : "Non"}</p>

                        {selectedRequest.business.hasVAT && (
                          <>
                            <p className="text-muted-foreground">Assujetti TVA</p>
                            <p className="font-medium font-mono">{selectedRequest.business.vatNumber || "Oui"}</p>
                          </>
                        )}
                      </div>

                      {/* Données financières de l'activité */}
                      <div className="mt-3 pt-3 border-t border-amber-200">
                        <p className="text-xs font-semibold text-amber-700 mb-2">Données financières</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {selectedRequest.business.hasBusinessAccounts ? (
                            <>
                              <p className="text-muted-foreground">Comptabilité</p>
                              <p className="font-medium text-green-600">Bilan & compte de résultat fournis</p>
                            </>
                          ) : (
                            <>
                              {selectedRequest.business.businessRevenue && (
                                <>
                                  <p className="text-muted-foreground">Chiffre d'affaires</p>
                                  <p className="font-medium">CHF {selectedRequest.business.businessRevenue}.-</p>
                                </>
                              )}
                              {selectedRequest.business.businessExpenses && (
                                <>
                                  <p className="text-muted-foreground">Charges</p>
                                  <p className="font-medium">CHF {selectedRequest.business.businessExpenses}.-</p>
                                </>
                              )}
                              {selectedRequest.business.businessNetIncome && (
                                <>
                                  <p className="text-muted-foreground">Bénéfice net</p>
                                  <p className="font-medium text-green-600">CHF {selectedRequest.business.businessNetIncome}.-</p>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Cotisations sociales */}
                      {(selectedRequest.business.hasAVSIndependent || selectedRequest.business.hasLPPVoluntary) && (
                        <div className="mt-3 pt-3 border-t border-amber-200">
                          <p className="text-xs font-semibold text-amber-700 mb-2">Cotisations sociales</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {selectedRequest.business.hasAVSIndependent && (
                              <>
                                <p className="text-muted-foreground">AVS/AI/APG indépendant</p>
                                <p className="font-medium">CHF {selectedRequest.business.avsIndependentAmount || "—"}.-</p>
                              </>
                            )}
                            {selectedRequest.business.hasLPPVoluntary && (
                              <>
                                <p className="text-muted-foreground">2ème pilier facultatif</p>
                                <p className="font-medium">CHF {selectedRequest.business.lppVoluntaryAmount || "—"}.-</p>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Frais professionnels */}
                      {(selectedRequest.business.hasHomeOffice || selectedRequest.business.hasBusinessVehicle) && (
                        <div className="mt-3 pt-3 border-t border-amber-200">
                          <p className="text-xs font-semibold text-amber-700 mb-2">Frais professionnels</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {selectedRequest.business.hasHomeOffice && (
                              <>
                                <p className="text-muted-foreground">Bureau à domicile</p>
                                <p className="font-medium">
                                  {selectedRequest.business.homeOfficePercent}% - CHF {selectedRequest.business.homeOfficeAmount || "—"}.-
                                </p>
                              </>
                            )}
                            {selectedRequest.business.hasBusinessVehicle && (
                              <>
                                <p className="text-muted-foreground">Véhicule professionnel</p>
                                <p className="font-medium">
                                  {selectedRequest.business.businessVehiclePercent}% - CHF {selectedRequest.business.businessVehicleExpenses || "—"}.-
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Finances */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-primary">
                    <DollarSign className="w-5 h-5" /> Situation financière
                  </h3>
                  <div className="bg-secondary/20 p-4 rounded-xl space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedRequest.financial.hasPillar3a && (
                        <>
                          <p className="text-muted-foreground">3ème pilier</p>
                          <p className="font-medium">CHF {selectedRequest.financial.pillar3aAmount}.-</p>
                        </>
                      )}

                      {selectedRequest.financial.hasStocks && (
                        <>
                          <p className="text-muted-foreground">Actions/Titres</p>
                          <p className="font-medium">{selectedRequest.financial.stocksCount} position(s)</p>
                        </>
                      )}

                      {selectedRequest.financial.hasSoldStocks && (
                        <>
                          <p className="text-muted-foreground">Vente de titres</p>
                          <p className="font-medium text-amber-600">
                            {selectedRequest.financial.soldStocksDetails || "Oui - détails à fournir"}
                          </p>
                        </>
                      )}

                      {selectedRequest.financial.hasGuardCosts && (
                        <>
                          <p className="text-muted-foreground">Frais de garde</p>
                          <p className="font-medium">CHF {selectedRequest.financial.guardCosts}.-</p>
                        </>
                      )}

                      {selectedRequest.financial.hasMealsOutside && (
                        <>
                          <p className="text-muted-foreground">Repas hors domicile</p>
                          <p className="font-medium">{selectedRequest.financial.mealsOutsideDays} jours/an</p>
                        </>
                      )}

                      {selectedRequest.financial.hasAlimonyReceived && (
                        <>
                          <p className="text-muted-foreground">Pension reçue</p>
                          <p className="font-medium">CHF {selectedRequest.financial.alimonyReceived}.-</p>
                        </>
                      )}

                      {selectedRequest.financial.hasAlimonyPaid && (
                        <>
                          <p className="text-muted-foreground">Pension versée</p>
                          <p className="font-medium">CHF {selectedRequest.financial.alimonyPaid}.-</p>
                        </>
                      )}

                      {selectedRequest.financial.hasDonations && (
                        <>
                          <p className="text-muted-foreground">Dons</p>
                          <p className="font-medium">CHF {selectedRequest.financial.donationsAmount}.-</p>
                        </>
                      )}

                      {selectedRequest.financial.hasDebts && (
                        <>
                          <p className="text-muted-foreground">Dettes</p>
                          <p className="font-medium">CHF {selectedRequest.financial.debtsAmount}.-</p>
                        </>
                      )}

                      {!selectedRequest.financial.hasPillar3a &&
                       !selectedRequest.financial.hasStocks &&
                       !selectedRequest.financial.hasGuardCosts &&
                       !selectedRequest.financial.hasMealsOutside &&
                       !selectedRequest.financial.hasAlimonyReceived &&
                       !selectedRequest.financial.hasAlimonyPaid &&
                       !selectedRequest.financial.hasDonations &&
                       !selectedRequest.financial.hasDebts && (
                        <p className="col-span-2 text-muted-foreground italic">Aucune information spécifique</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Immobilier */}
                {selectedRequest.property && (
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-primary">
                      <Home className="w-5 h-5" /> Immobilier
                    </h3>
                    <div className="bg-secondary/20 p-4 rounded-xl space-y-4">
                      {/* Résumé général */}
                      <div className="grid grid-cols-2 gap-2 text-sm border-b pb-3">
                        <p className="text-muted-foreground">Propriétaire</p>
                        <p className="font-medium">{selectedRequest.property.hasProperty ? "Oui" : "Non"}</p>

                        {selectedRequest.property.hasProperty && selectedRequest.property.propertyCount && (
                          <>
                            <p className="text-muted-foreground">Nombre de biens</p>
                            <p className="font-medium">{selectedRequest.property.propertyCount}</p>
                          </>
                        )}

                        {selectedRequest.property.hasSoldProperty && (
                          <>
                            <p className="text-muted-foreground">Vente immobilière</p>
                            <p className="font-medium text-amber-600">
                              {selectedRequest.property.soldPropertyDetails || "Oui - détails à fournir"}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Liste détaillée des biens */}
                      {selectedRequest.property.properties && selectedRequest.property.properties.length > 0 ? (
                        <div className="space-y-4">
                          {selectedRequest.property.properties.map((prop, index) => (
                            <div key={index} className="p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-sm text-primary">
                                  Bien {index + 1}: {prop.propertyTypeName || prop.propertyType || "Bien immobilier"}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {prop.usageName || prop.usage || "Usage non précisé"}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {/* Adresse */}
                                {prop.street && (
                                  <>
                                    <p className="text-muted-foreground">Adresse</p>
                                    <p className="font-medium">
                                      {prop.street}{prop.npa || prop.city ? `, ${prop.npa} ${prop.city}` : ""}
                                    </p>
                                  </>
                                )}
                                {/* Canton */}
                                {(prop.cantonName || prop.canton) && (
                                  <>
                                    <p className="text-muted-foreground">Canton</p>
                                    <p className="font-medium">{prop.cantonName || prop.canton}</p>
                                  </>
                                )}
                               {/* Numéro parcelle */}
                                {prop.parcelNumber && (
                                  <>
                                    <p className="text-muted-foreground">N° parcelle</p>
                                    <p className="font-medium">{prop.parcelNumber}</p>
                                  </>
                                )}
                                {/* Surface en m² */}
                                {prop.surfaceM2 && (
                                  <>
                                    <p className="text-muted-foreground">Surface</p>
                                    <p className="font-medium">{prop.surfaceM2} m²</p>
                                  </>
                                )}
                                {/* Localisation (Suisse/Étranger) */}
                                {prop.location === "abroad" && prop.country && (
                                  <>
                                    <p className="text-muted-foreground">Pays</p>
                                    <p className="font-medium">{prop.country}</p>
                                  </>
                                )}
                                {/* Quotité */}
                                {prop.ownershipShare && (
                                  <>
                                    <p className="text-muted-foreground">Quote-part</p>
                                    <p className="font-medium">{prop.ownershipShare}%</p>
                                  </>
                                )}
                                {/* Année acquisition */}
                                {prop.acquisitionYear && (
                                  <>
                                    <p className="text-muted-foreground">Année d'acquisition</p>
                                    <p className="font-medium">{prop.acquisitionYear}</p>
                                  </>
                                )}
                                {/* Année construction + forfait */}
                                {prop.constructionYear && (
                                  <>
                                    <p className="text-muted-foreground">Année de construction</p>
                                    <p className="font-medium">{prop.constructionYear}</p>
                                    <p className="text-muted-foreground">Forfait entretien</p>
                                    <p className="font-medium text-primary">
                                      {prop.maintenanceFlatRate || (new Date().getFullYear() - parseInt(prop.constructionYear) <= 10 ? 10 : 20)}%
                                      <span className="text-xs text-muted-foreground ml-1">
                                        ({new Date().getFullYear() - parseInt(prop.constructionYear)} ans)
                                      </span>
                                    </p>
                                  </>
                                )}
                                {/* Valeur fiscale */}
                                {prop.fiscalValue && (
                                  <>
                                    <p className="text-muted-foreground">Valeur fiscale</p>
                                    <p className="font-medium">CHF {prop.fiscalValue}.-</p>
                                  </>
                                )}
                                {/* Valeur locative */}
                                {prop.rentalValue && (
                                  <>
                                    <p className="text-muted-foreground">Valeur locative</p>
                                    <p className="font-medium">CHF {prop.rentalValue}.-</p>
                                  </>
                                )}
                                {/* Loyers bruts (si loué) */}
                                {prop.annualRent && (
                                  <>
                                    <p className="text-muted-foreground">Loyers bruts annuels</p>
                                    <p className="font-medium">CHF {prop.annualRent}.-</p>
                                  </>
                                )}
                                {/* Charges locatives */}
                                {prop.charges && (
                                  <>
                                    <p className="text-muted-foreground">Charges locatives</p>
                                    <p className="font-medium">CHF {prop.charges}.-</p>
                                  </>
                                )}
                                {/* Hypothèque */}
                                {prop.hasMortgage && (
                                  <>
                                    <p className="text-muted-foreground">Hypothèque</p>
                                    <p className="font-medium">Oui</p>
                                    {prop.mortgageBalance && (
                                      <>
                                        <p className="text-muted-foreground pl-3">- Solde dette</p>
                                        <p className="font-medium">CHF {prop.mortgageBalance}.-</p>
                                      </>
                                    )}
                                    {prop.mortgageInterest && (
                                      <>
                                        <p className="text-muted-foreground pl-3">- Intérêts annuels</p>
                                        <p className="font-medium">CHF {prop.mortgageInterest}.-</p>
                                      </>
                                    )}
                                  </>
                                )}
                                {/* Frais d'entretien */}
                                {prop.maintenanceCosts && (
                                  <>
                                    <p className="text-muted-foreground">Frais d'entretien</p>
                                    <p className="font-medium">
                                      CHF {prop.maintenanceCosts}.-
                                      {prop.maintenanceType === "flat_rate" ? " (forfait)" : " (effectifs)"}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Fallback vers l'ancienne structure si pas de détails
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {selectedRequest.property.hasMortgage && (
                            <>
                              <p className="text-muted-foreground">Hypothèque</p>
                              <p className="font-medium">
                                {selectedRequest.property.mortgageAmount
                                  ? `CHF ${selectedRequest.property.mortgageAmount}.-`
                                  : "Oui"}
                              </p>
                            </>
                          )}

                          {selectedRequest.property.hasRenovations && (
                            <>
                              <p className="text-muted-foreground">Travaux/Rénovations</p>
                              <p className="font-medium">
                                {selectedRequest.property.renovationsAmount
                                  ? `CHF ${selectedRequest.property.renovationsAmount}.-`
                                  : "Oui"}
                              </p>
                            </>
                          )}

                          {!selectedRequest.property.hasProperty &&
                           !selectedRequest.property.hasMortgage &&
                           !selectedRequest.property.hasRenovations && (
                            <p className="col-span-2 text-muted-foreground italic">Pas de bien immobilier</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Trajets professionnels */}
              {selectedRequest.workplaces && selectedRequest.workplaces.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-primary">
                    <MapPin className="w-5 h-5" /> Trajets professionnels
                  </h3>
                  <div className="bg-secondary/20 p-4 rounded-xl">
                    <div className="space-y-4">
                      {selectedRequest.workplaces.map((wp, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">
                              {wp.adult === 1
                                ? `${selectedRequest.customer.firstName} ${selectedRequest.customer.lastName}`
                                : `${selectedRequest.customer.firstName2 || "Conjoint"} ${selectedRequest.customer.lastName2 || ""}`}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {getTransportModeLabel(wp.transportMode)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {wp.employerName && (
                              <>
                                <p className="text-muted-foreground">Employeur</p>
                                <p className="font-medium">{wp.employerName}</p>
                              </>
                            )}
                            {wp.workplaceAddress && (
                              <>
                                <p className="text-muted-foreground">Adresse travail</p>
                                <p className="font-medium">{wp.workplaceAddress}</p>
                              </>
                            )}
                            {wp.daysPerYear && (
                              <>
                                <p className="text-muted-foreground">Jours/an</p>
                                <p className="font-medium">{wp.daysPerYear}</p>
                              </>
                            )}
                            {wp.distanceKm && (
                              <>
                                <p className="text-muted-foreground">Distance aller</p>
                                <p className="font-medium">{wp.distanceKm} km</p>
                              </>
                            )}
                            {wp.carJustification && (
                              <>
                                <p className="text-muted-foreground">Justification voiture</p>
                                <p className="font-medium text-amber-700">{wp.carJustification}</p>
                              </>
                            )}
                            {wp.employerReimbursement && (
                              <>
                                <p className="text-muted-foreground">Remboursement employeur</p>
                                <p className="font-medium text-blue-600">
                                  {wp.reimbursementType === "full" ? "Total" : "Partiel"}
                                  {wp.reimbursementAmount && ` - CHF ${wp.reimbursementAmount}.-`}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-primary">
                  <Calendar className="w-5 h-5" /> Options de livraison
                </h3>
                <div className="bg-secondary/20 p-4 rounded-xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mode de livraison</p>
                      <p className="font-medium capitalize">{selectedRequest.options.deliveryMethod === "email" ? "Électronique" : selectedRequest.options.deliveryMethod === "post" ? "Courrier postal" : "Électronique"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Révision souhaitée</p>
                      <p className="font-medium">{selectedRequest.options.wantsReview ? "Oui" : "Non"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Délai</p>
                      <p className="font-medium capitalize">{selectedRequest.options.deadline || "Normal"}</p>
                    </div>
                    {selectedRequest.options.comments && (
                      <div className="col-span-2 md:col-span-4">
                        <p className="text-muted-foreground">Commentaires</p>
                        <p className="font-medium">{selectedRequest.options.comments}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-primary">
                  <FileText className="w-5 h-5" /> Documents ({selectedRequest.documents.length})
                  {hasMissingDocuments(selectedRequest) && (
                    <Badge className="bg-red-100 text-red-700 ml-2">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Documents manquants
                    </Badge>
                  )}
                </h3>

                {/* Warning for missing documents */}
                {hasMissingDocuments(selectedRequest) && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Documents non sauvegardés</p>
                        <p className="text-sm text-red-700 mt-1">
                          Les documents ont été uploadés alors que Storage n'était pas configuré.
                          Les fichiers n'ont pas été sauvegardés et doivent être re-uploadés par le client.
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-700 border-red-300 hover:bg-red-100"
                            asChild
                          >
                            <a
                              href={`mailto:${selectedRequest.customer.email}?subject=Documents manquants - ${selectedRequest.reference}&body=Bonjour ${selectedRequest.customer.firstName},%0A%0ANous avons bien reçu votre demande de déclaration fiscale (référence: ${selectedRequest.reference}).%0A%0AMalheureusement, vos documents n'ont pas été correctement sauvegardés lors de votre envoi.%0A%0APourriez-vous nous renvoyer vos documents par email ou via notre formulaire ?%0A%0ADocuments manquants:%0A${selectedRequest.documents.map(d => `- ${d.name}`).join('%0A')}%0A%0AMerci de votre compréhension.%0A%0ACordialement,%0ANeoFidu`}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Contacter le client
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-secondary/20 p-4 rounded-xl">
                  {selectedRequest.documents.length === 0 ? (
                    <p className="text-muted-foreground italic">Aucun document</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedRequest.documents.map((doc, i) => {
                        const isMissing = isSimulatedUrl(doc.url);
                        const isUploaded = !isMissing && doc.url;
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                              isMissing
                                ? 'bg-red-50 border border-red-200'
                                : 'bg-green-50 border border-green-200'
                            }`}
                          >
                            <FileText className={`w-4 h-4 flex-shrink-0 ${isMissing ? 'text-red-500' : 'text-green-600'}`} />
                            {isUploaded ? (
                              <a
                                href={fixStorageUrl(doc.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate hover:text-green-700 hover:underline text-green-800"
                              >
                                {doc.name}
                              </a>
                            ) : (
                              <span className="truncate text-red-700">
                                {doc.name} (manquant)
                              </span>
                            )}
                            <Badge
                              variant="outline"
                              className={`ml-auto text-xs flex-shrink-0 ${
                                isMissing
                                  ? 'border-red-300 text-red-600 bg-red-100'
                                  : 'border-green-400 text-green-700 bg-green-100'
                              }`}
                            >
                              {doc.category}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Modal Aperçu PDF */}
      {pdfPreviewUrl && pdfPreviewRequest && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Aperçu PDF</h3>
                  <p className="text-sm text-muted-foreground">
                    {getPDFFileName(pdfPreviewRequest)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    downloadPDF(pdfPreviewRequest);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // Revoke the blob URL to free memory
                    URL.revokeObjectURL(pdfPreviewUrl);
                    setPdfPreviewUrl(null);
                    setPdfPreviewRequest(null);
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="flex-1 p-4 bg-gray-100">
              <iframe
                src={pdfPreviewUrl}
                className="w-full h-full rounded-lg border shadow-inner bg-white"
                title="Aperçu PDF"
              />
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-gray-50 rounded-b-xl flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Fiche récapitulative - {pdfPreviewRequest.reference}
              </span>
              <span>
                CHF {pdfPreviewRequest.payment.amount}.- TTC
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
