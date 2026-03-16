"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  RefreshCw,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  Users,
  Lock,
  Eye,
  EyeOff,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface DuplicateRequest {
  id: string;
  reference: string;
  status: string;
  created_at: string;
  paid_at: string | null;
  customerName: string;
  amount: number;
}

interface DuplicateGroup {
  email: string;
  cantonCode: string;
  taxYear: number;
  requests: DuplicateRequest[];
}

export default function DuplicatesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // État pour la correction manuelle
  const [fixingGroup, setFixingGroup] = useState<number | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [selectedKeep, setSelectedKeep] = useState<string | null>(null);

  const fetchDuplicates = async () => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/duplicates", {
        headers: {
          "x-admin-password": savedPassword,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDuplicates(data.duplicates || []);
        setIsAuthenticated(true);
      } else {
        const data = await response.json();
        setError(data.error || "Erreur lors de la récupération");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    sessionStorage.setItem("adminPassword", password);
    await fetchDuplicates();
  };

  const handleDelete = async (requestId: string, reference: string) => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    if (!confirm(`Êtes-vous sûr de vouloir supprimer la demande ${reference} ?\n\nCette action est irréversible.`)) {
      return;
    }

    setProcessingId(requestId);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/duplicates", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: data.message || `Demande ${reference} supprimée`,
        });
        await fetchDuplicates();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erreur lors de la suppression",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Erreur de connexion",
      });
    } finally {
      setProcessingId(null);
    }
  };

  // Corriger un doublon : marquer un comme payé, supprimer l'autre
  const handleFixDuplicate = async (groupIndex: number) => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (!savedPassword) return;

    const group = duplicates[groupIndex];
    if (!selectedKeep || !paymentIntentId) {
      setMessage({
        type: "error",
        text: "Sélectionnez la demande à garder et entrez le Payment Intent ID",
      });
      return;
    }

    const deleteRef = group.requests.find(r => r.reference !== selectedKeep)?.reference;
    if (!deleteRef) {
      setMessage({
        type: "error",
        text: "Erreur: impossible de trouver la demande à supprimer",
      });
      return;
    }

    if (!confirm(`Vous allez :\n\n✅ Garder ${selectedKeep} et le marquer comme PAYÉ\n🗑️ Supprimer ${deleteRef}\n\nContinuer ?`)) {
      return;
    }

    setProcessingId(selectedKeep);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/fix-duplicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({
          keepReference: selectedKeep,
          deleteReference: deleteRef,
          paymentIntentId: paymentIntentId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: data.message || "Correction effectuée avec succès !",
        });
        setFixingGroup(null);
        setSelectedKeep(null);
        setPaymentIntentId("");
        await fetchDuplicates();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erreur lors de la correction",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Erreur de connexion",
      });
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (savedPassword) {
      setPassword(savedPassword);
      fetchDuplicates();
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string, paidAt: string | null) => {
    if (paidAt || status === "paid" || status === "in_progress" || status === "completed") {
      return (
        <Badge className="bg-green-100 text-green-700">
          <CreditCard className="w-3 h-3 mr-1" />
          Payé
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-700">
        <Clock className="w-3 h-3 mr-1" />
        En attente
      </Badge>
    );
  };

  // Écran de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold">Gestion des doublons</h1>
            <p className="text-muted-foreground mt-2">
              Identifiez et nettoyez les demandes en double
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
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button
              onClick={handleLogin}
              disabled={loading || !password}
              className="w-full rounded-xl"
            >
              {loading ? (
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="font-bold">Gestion des doublons</h1>
              <p className="text-xs text-muted-foreground">
                {duplicates.length} groupe(s) de doublons
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchDuplicates}
            disabled={loading}
            className="rounded-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Liste des doublons */}
        {duplicates.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Aucun doublon détecté</h2>
            <p className="text-muted-foreground">
              Toutes les demandes sont uniques (email + canton + année fiscale)
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {duplicates.map((group, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="bg-amber-50 border-b border-amber-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-semibold text-amber-800">
                          {group.requests.length} demandes pour le même client
                        </p>
                        <p className="text-sm text-amber-700">
                          {group.email} • {group.cantonCode} • {group.taxYear}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFixingGroup(fixingGroup === index ? null : index);
                        setSelectedKeep(null);
                        setPaymentIntentId("");
                      }}
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      <Wrench className="w-4 h-4 mr-2" />
                      {fixingGroup === index ? "Annuler" : "Corriger"}
                    </Button>
                  </div>
                </div>

                {/* Formulaire de correction */}
                {fixingGroup === index && (
                  <div className="bg-blue-50 border-b border-blue-200 p-4 space-y-4">
                    <h3 className="font-semibold text-blue-800">Correction du doublon</h3>

                    <div>
                      <label className="text-sm font-medium text-blue-700 block mb-2">
                        1. Sélectionnez la demande à GARDER (sera marquée comme payée) :
                      </label>
                      <div className="flex gap-2">
                        {group.requests.map((req) => (
                          <Button
                            key={req.id}
                            variant={selectedKeep === req.reference ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedKeep(req.reference)}
                            className={selectedKeep === req.reference ? "bg-blue-600" : ""}
                          >
                            {req.reference}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-blue-700 block mb-2">
                        2. Entrez le Payment Intent ID de Stripe (pi_xxx...) :
                      </label>
                      <Input
                        placeholder="pi_3T3g8vIO06SfDIp70b7pAyA9"
                        value={paymentIntentId}
                        onChange={(e) => setPaymentIntentId(e.target.value)}
                        className="max-w-md"
                      />
                    </div>

                    {selectedKeep && (
                      <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          <strong>{selectedKeep}</strong> sera gardé et marqué payé
                        </span>
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span>
                          <strong>{group.requests.find(r => r.reference !== selectedKeep)?.reference}</strong> sera supprimé
                        </span>
                      </div>
                    )}

                    <Button
                      onClick={() => handleFixDuplicate(index)}
                      disabled={!selectedKeep || !paymentIntentId || processingId !== null}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {processingId ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Wrench className="w-4 h-4 mr-2" />
                      )}
                      Appliquer la correction
                    </Button>
                  </div>
                )}

                <div className="divide-y">
                  {group.requests.map((req) => (
                    <div
                      key={req.id}
                      className={`p-4 flex items-center justify-between ${
                        req.paid_at || req.status !== "pending"
                          ? "bg-green-50/50"
                          : selectedKeep === req.reference
                          ? "bg-blue-50/50"
                          : "bg-white"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <code className="text-sm bg-secondary px-2 py-1 rounded font-mono">
                            {req.reference}
                          </code>
                          {getStatusBadge(req.status, req.paid_at)}
                          {req.amount > 0 && (
                            <span className="text-sm font-medium">
                              CHF {req.amount}.-
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {req.customerName} • Créé le {formatDate(req.created_at)}
                        </p>
                        {req.paid_at && (
                          <p className="text-sm text-green-600">
                            Payé le {formatDate(req.paid_at)}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {req.status === "pending" && !req.paid_at ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(req.id, req.reference)}
                            disabled={processingId === req.id}
                            className="rounded-full"
                          >
                            {processingId === req.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            <span className="ml-2">Supprimer</span>
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            À conserver
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Comment corriger un doublon ?</h3>
          <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
            <li>Cliquez sur <strong>"Corriger"</strong> pour le groupe de doublons</li>
            <li>Sélectionnez la demande à <strong>garder</strong> (celle qui sera marquée comme payée)</li>
            <li>Entrez le <strong>Payment Intent ID</strong> de Stripe (trouvé dans Stripe Dashboard)</li>
            <li>Cliquez sur <strong>"Appliquer la correction"</strong></li>
          </ol>
          <p className="text-sm text-blue-600 mt-3">
            La demande sélectionnée sera mise à jour avec le statut "payé" et l'autre sera supprimée.
          </p>
        </Card>
      </main>
    </div>
  );
}
