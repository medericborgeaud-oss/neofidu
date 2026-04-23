"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import {
  Send,
  AlertCircle,
  Loader2,
  Building2,
  Users,
  Briefcase,
  HelpCircle,
  Clock,
  Shield,
} from "lucide-react";

interface CreationEntrepriseFormProps {
  defaultCompanyType?: string;
}

export function CreationEntrepriseForm({ defaultCompanyType }: CreationEntrepriseFormProps) {
  const { isEnglish } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formToken, setFormToken] = useState<number>(0);

  // Generate form token on mount (for spam protection)
  useEffect(() => {
    setFormToken(Date.now());
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    canton: "",
    companyType: defaultCompanyType || "",
    projectDescription: "",
    _honeypot: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const companyTypes = [
    {
      id: "ri",
      name: isEnglish ? "Sole proprietorship" : "Raison individuelle",
      icon: Users,
    },
    {
      id: "sarl",
      name: "Sàrl",
      icon: Building2,
    },
    {
      id: "sa",
      name: "SA",
      icon: Briefcase,
    },
    {
      id: "other",
      name: isEnglish ? "Other / Not sure" : "Autre / Je ne sais pas",
      icon: HelpCircle,
    },
  ];

  const cantons = ["Vaud", "Valais", "Genève", "Fribourg", "Neuchâtel", "Jura"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/creation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _formToken: formToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (isEnglish ? "Error sending request" : "Erreur lors de l'envoi"));
        setIsLoading(false);
        return;
      }

      // Redirect to thank you page with company type
      router.push(`/creation-entreprise/merci?type=${formData.companyType}`);
    } catch {
      setError(isEnglish ? "Connection error. Please try again." : "Erreur de connexion. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  const t = {
    title: isEnglish ? "Start your project" : "Lancez votre projet",
    subtitle: isEnglish
      ? "Fill out this form and we'll contact you"
      : "Remplissez ce formulaire et nous vous contactons",
    firstName: isEnglish ? "First name *" : "Prénom *",
    lastName: isEnglish ? "Last name *" : "Nom *",
    email: "Email *",
    phone: isEnglish ? "Phone" : "Téléphone",
    canton: "Canton",
    selectCanton: isEnglish ? "Select your canton" : "Sélectionnez votre canton",
    companyType: isEnglish ? "Company type *" : "Type d'entreprise *",
    projectDescription: isEnglish ? "Describe your project" : "Décrivez votre projet",
    projectPlaceholder: isEnglish
      ? "What activity do you want to start? Do you have any questions about the legal form?"
      : "Quelle activité souhaitez-vous lancer ? Avez-vous des questions sur la forme juridique ?",
    submit: isEnglish ? "Send my request, no commitment" : "Envoyer ma demande sans engagement",
    sending: isEnglish ? "Sending..." : "Envoi en cours...",
    noCommitment: isEnglish ? "No commitment" : "Sans engagement",
    responseTime: isEnglish ? "Fast response" : "Réponse rapide",
  };

  return (
    <Card className="overflow-hidden" id="contact-form">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
        <h3 className="text-xl font-bold mb-1">{t.title}</h3>
        <p className="text-white/80 text-sm">{t.subtitle}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{t.responseTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4" />
            <span>{t.noCommitment}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Honeypot field */}
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
          <label htmlFor="website_url_creation">Website</label>
          <input
            type="text"
            id="website_url_creation"
            name="website_url_creation"
            tabIndex={-1}
            autoComplete="off"
            value={formData._honeypot}
            onChange={(e) => updateForm("_honeypot", e.target.value)}
          />
        </div>

        {/* Company Type Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">{t.companyType}</label>
          <div className="grid grid-cols-2 gap-3">
            {companyTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => updateForm("companyType", type.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.companyType === type.id
                    ? "border-violet-500 bg-violet-50"
                    : "border-border hover:border-violet-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    formData.companyType === type.id ? "bg-violet-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">{type.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">{t.firstName}</label>
            <Input
              placeholder="Jean"
              required
              value={formData.firstName}
              onChange={(e) => updateForm("firstName", e.target.value)}
              className="rounded-xl border-2 focus:border-violet-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t.lastName}</label>
            <Input
              placeholder="Dupont"
              required
              value={formData.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
              className="rounded-xl border-2 focus:border-violet-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium mb-2 block">{t.email}</label>
          <Input
            type="email"
            placeholder="jean.dupont@email.ch"
            required
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
            className="rounded-xl border-2 focus:border-violet-500"
          />
        </div>

        {/* Phone & Canton */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">{t.phone}</label>
            <Input
              type="tel"
              placeholder="+41 79 123 45 67"
              value={formData.phone}
              onChange={(e) => updateForm("phone", e.target.value)}
              className="rounded-xl border-2 focus:border-violet-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t.canton}</label>
            <select
              value={formData.canton}
              onChange={(e) => updateForm("canton", e.target.value)}
              className="w-full h-10 px-4 rounded-xl border-2 border-input bg-background text-sm focus:border-violet-500 focus:outline-none"
            >
              <option value="">{t.selectCanton}</option>
              {cantons.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="text-sm font-medium mb-2 block">{t.projectDescription}</label>
          <Textarea
            placeholder={t.projectPlaceholder}
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => updateForm("projectDescription", e.target.value)}
            className="rounded-xl border-2 focus:border-violet-500 resize-none"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-base font-semibold"
            disabled={isLoading || !formData.companyType}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t.sending}
              </>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                {t.submit}
              </span>
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
              ✓ {isEnglish ? "Free" : "Gratuit"}
            </span>
            {isEnglish ? "No commitment • Fast response" : "Sans engagement • Réponse rapide"}
          </p>
        </div>
      </form>
    </Card>
  );
}
