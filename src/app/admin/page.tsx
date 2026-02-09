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

interface TaxRequest {
  id: string;
  reference: string;
  requestType?: "tax" | "accounting" | "property";
  status: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  // Extra fields for accounting/property
  companyName?: string;
  propertyAddress?: string;
  selectedServices?: string[];
  payment: {
    amount: number;
    currency: string;
    method?: string;
    stripePaymentIntentId?: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    firstName2?: string;
    lastName2?: string;
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
    employmentStatus?: string;
    employmentStatus2?: string;
  };
  situation: {
    hasMoved?: boolean;
    hasChildren?: boolean;
    childrenCount?: number;
    monthlyRent?: string;
  };
  financial: {
    hasPillar3a?: boolean;
    pillar3aAmount?: string;
    hasStocks?: boolean;
    stocksCount?: number;
    hasGuardCosts?: boolean;
    guardCosts?: string;
    hasAlimonyReceived?: boolean;
    alimonyReceived?: string;
    hasAlimonyPaid?: boolean;
    alimonyPaid?: string;
    hasDonations?: boolean;
    donationsAmount?: string;
    hasDebts?: boolean;
    debtsAmount?: string;
  };
  property: {
    hasProperty?: boolean;
    propertyCount?: number;
    hasMortgage?: boolean;
    mortgageAmount?: string;
    hasRenovations?: boolean;
    renovationsAmount?: string;
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

// Check if Cloudinary is configured
const isCloudinaryConfigured = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME";

// Helper function to generate Cloudinary search URL
// Uses tag-based search which is more reliable than folder navigation
function getCloudinaryFolderUrl(reference: string, createdAt: string, lastName: string, firstName: string): string {
  const cloudName = cloudinaryCloudName;

  // Search by reference tag - this is set when files are uploaded
  // Format: https://console.cloudinary.com/console/CLOUD_NAME/media_library/search?q=tags:REFERENCE
  return `https://console.cloudinary.com/console/${cloudName}/media_library/search?q=tags%3A${encodeURIComponent(reference)}`;
}

// Alternative: Generate the folder path for reference
function getCloudinaryFolderPath(reference: string, createdAt: string, lastName: string, firstName: string): string {
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

  return `neofidu/documents/${folderName}`;
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
  const [showCharts, setShowCharts] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

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
  const updateRequestStatus = async (requestId: string, status: string, oldStatus?: string) => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    // Récupérer l'ancien statut si non fourni
    const currentRequest = requests.find(r => r.id === requestId);
    const previousStatus = oldStatus || currentRequest?.status || "";

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

    const matchesDate = isWithinDateRange(r.createdAt, dateFrom, dateTo);

    return matchesSearch && matchesStatus && matchesDate;
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
      paid: "Payé",
      in_progress: "En cours",
      completed: "Terminé",
      delivered: "Livré",
      pending: "En attente",
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
    };
    return labels[status] || status;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
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
      case "delivered":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
            <Package className="w-3 h-3 mr-1" />
            Livré
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status}
          </Badge>
        );
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    if (method === "twint") {
      return <Smartphone className="w-4 h-4" />;
    }
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
              className={`rounded-full ${!isCloudinaryConfigured ? "border-amber-300 text-amber-600" : ""}`}
            >
              <a
                href={`https://console.cloudinary.com/console/${cloudinaryCloudName}/media_library/search?q=folder%3Aneofidu*`}
                target="_blank"
                rel="noopener noreferrer"
                title={isCloudinaryConfigured ? "Ouvrir les documents NeoFidu" : "Cloudinary non configuré - Ajoutez NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Cloudinary
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="paid">Payé</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
            <option value="delivered">Livré</option>
            <option value="pending">En attente</option>
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
          {(searchTerm || statusFilter !== "all" || dateFrom || dateTo) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
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
                  <th className="text-left p-4 font-medium">Cloudinary</th>
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
                          <Badge variant="secondary" className="bg-gray-100">
                            <FileText className="w-3 h-3 mr-1" />
                            {request.documents.length}
                          </Badge>
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
                                <option value="paid">Payé</option>
                                <option value="in_progress">En cours</option>
                                <option value="completed">Terminé</option>
                                <option value="delivered">Livré</option>
                                <option value="pending">En attente</option>
                              </select>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={e => {
                                  e.stopPropagation();
                                  updateRequestStatus(request.id, newStatus || request.status);
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
                              {getStatusBadge(request.status)}
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
                            title="Ouvrir le dossier Cloudinary"
                            onClick={e => e.stopPropagation()}
                          >
                            <a
                              href={getCloudinaryFolderUrl(
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
                                  <p>Type: {getClientTypeLabel(request.fiscal.clientType)}</p>
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
                                          href={doc.url}
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
              <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(null)}>
                <X className="w-5 h-5" />
              </Button>
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
                          <option value="paid">Payé</option>
                          <option value="in_progress">En cours</option>
                          <option value="completed">Terminé</option>
                          <option value="delivered">Livré</option>
                        </select>
                      </div>
                    ) : (
                      <>
                        {getStatusBadge(selectedRequest.status)}
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
                    title="Ouvrir le dossier Cloudinary"
                  >
                    <a
                      href={getCloudinaryFolderUrl(
                        selectedRequest.reference,
                        selectedRequest.createdAt,
                        selectedRequest.customer.lastName,
                        selectedRequest.customer.firstName
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FolderOpen className="w-4 h-4 mr-1" />
                      Cloudinary
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
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
                        onClick={() => updateRequestStatus(selectedRequest.id, newStatus || selectedRequest.status)}
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
                  </div>
                </div>

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
                      <p className="font-medium">{getClientTypeLabel(selectedRequest.fiscal.clientType)}</p>

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

                      <p className="text-muted-foreground">Statut emploi</p>
                      <p className="font-medium">{getEmploymentLabel(selectedRequest.fiscal.employmentStatus) || "Non spécifié"}</p>
                    </div>
                  </div>
                </div>

                {/* Situation */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5" /> Situation personnelle
                  </h3>
                  <div className="bg-secondary/20 p-4 rounded-xl space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-muted-foreground">Déménagement</p>
                      <p className="font-medium">{selectedRequest.situation.hasMoved ? "Oui" : "Non"}</p>

                      <p className="text-muted-foreground">Enfants</p>
                      <p className="font-medium">
                        {selectedRequest.situation.hasChildren
                          ? `Oui (${selectedRequest.situation.childrenCount || 0})`
                          : "Non"}
                      </p>

                      {selectedRequest.situation.monthlyRent && (
                        <>
                          <p className="text-muted-foreground">Loyer mensuel</p>
                          <p className="font-medium">CHF {selectedRequest.situation.monthlyRent}.-</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

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

                      {selectedRequest.financial.hasGuardCosts && (
                        <>
                          <p className="text-muted-foreground">Frais de garde</p>
                          <p className="font-medium">CHF {selectedRequest.financial.guardCosts}.-</p>
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
                       !selectedRequest.financial.hasAlimonyReceived &&
                       !selectedRequest.financial.hasAlimonyPaid &&
                       !selectedRequest.financial.hasDonations &&
                       !selectedRequest.financial.hasDebts && (
                        <p className="col-span-2 text-muted-foreground italic">Aucune information spécifique</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

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
                </h3>
                <div className="bg-secondary/20 p-4 rounded-xl">
                  {selectedRequest.documents.length === 0 ? (
                    <p className="text-muted-foreground italic">Aucun document</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedRequest.documents.map((doc, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 bg-white rounded-lg text-sm"
                        >
                          <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                          {doc.url ? (
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate hover:text-primary hover:underline"
                            >
                              {doc.name}
                            </a>
                          ) : (
                            <span className="truncate">{doc.name}</span>
                          )}
                          <Badge variant="outline" className="ml-auto text-xs flex-shrink-0">
                            {doc.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
