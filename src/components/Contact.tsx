"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Contact() {
  const { isEnglish } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    canton: "",
    service: "",
    message: "",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || (isEnglish ? "Error sending message" : "Erreur lors de l'envoi"));
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError(isEnglish ? "Connection error. Please try again." : "Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Translations
  const t = {
    tagline: isEnglish ? "LET'S DISCUSS YOUR PROJECT" : "Parlons de votre projet",
    title1: isEnglish ? "Request a" : "Sollicitez un",
    title2: isEnglish ? "free quote" : "devis sans frais",
    description: isEnglish
      ? "Complete this form and receive a detailed proposal within 24 hours. No obligation on your part."
      : "Complétez ce formulaire et recevez une proposition chiffrée sous 24 heures. Aucune obligation de votre part.",
    email: "Email",
    address: isEnglish ? "Address" : "Adresse",
    hours: isEnglish ? "Hours" : "Horaires",
    hoursValue: isEnglish ? "Monday to Friday, 9am - 6pm" : "Du lundi au vendredi, 9h - 18h",
    hoursNote: isEnglish ? "Response guaranteed within one business day" : "Retour garanti sous un jour ouvré",
    firstName: isEnglish ? "First name *" : "Prénom *",
    lastName: isEnglish ? "Last name *" : "Nom *",
    emailLabel: "Email *",
    phone: isEnglish ? "Phone" : "Téléphone",
    canton: "Canton *",
    selectCanton: isEnglish ? "Select your canton" : "Sélectionnez votre canton",
    service: isEnglish ? "Service type *" : "Type de service *",
    selectService: isEnglish ? "Select a service" : "Sélectionnez un service",
    message: "Message",
    messagePlaceholder: isEnglish
      ? "Describe your situation or ask us your questions..."
      : "Décrivez votre situation ou posez-nous vos questions...",
    submit: isEnglish ? "Send my request" : "Envoyer ma demande",
    sending: isEnglish ? "Sending..." : "Envoi en cours...",
    privacy: isEnglish
      ? "By submitting this form, you accept our privacy policy."
      : "En soumettant ce formulaire, vous acceptez notre politique de confidentialité.",
    thankYou: isEnglish ? "Thank you for your request!" : "Merci pour votre demande !",
    recontact: isEnglish
      ? "We will contact you within 24 business hours."
      : "Nous vous recontacterons dans les 24 heures ouvrables.",
    services: isEnglish
      ? {
          tax: "Tax declaration",
          accounting: "Accounting",
          property: "Property management",
          taxAndAccounting: "Tax + Accounting",
          other: "Other",
        }
      : {
          tax: "Déclaration d'impôt",
          accounting: "Comptabilité",
          property: "Gérance immobilière",
          taxAndAccounting: "Déclaration + Comptabilité",
          other: "Autre",
        },
    cantons: isEnglish
      ? { geneva: "Geneva" }
      : { geneva: "Genève" },
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left content */}
          <div className="text-white">
            <span className="text-white/70 font-semibold text-sm uppercase tracking-wider">
              {t.tagline}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              {t.title1}{" "}
              <span className="text-emerald-300">{t.title2}</span>
            </h2>
            <p className="text-white/80 text-lg mb-10">
              {t.description}
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.email}</h3>
                  <p className="text-white/70">contact@neofidu.ch</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.address}</h3>
                  <p className="text-white/70">Rue Louis Favez</p>
                  <p className="text-white/70">1854 Leysin</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.hours}</h3>
                  <p className="text-white/70">{t.hoursValue}</p>
                  <p className="text-white/60 text-sm">{t.hoursNote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="p-6 md:p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.thankYou}</h3>
                <p className="text-muted-foreground">
                  {t.recontact}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t.firstName}
                    </label>
                    <Input
                      placeholder="Jean"
                      required
                      value={formData.firstName}
                      onChange={(e) => updateForm("firstName", e.target.value)}
                      className="rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t.lastName}
                    </label>
                    <Input
                      placeholder="Dupont"
                      required
                      value={formData.lastName}
                      onChange={(e) => updateForm("lastName", e.target.value)}
                      className="rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t.emailLabel}
                  </label>
                  <Input
                    type="email"
                    placeholder="jean.dupont@email.ch"
                    required
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="rounded-xl border-2 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t.phone}
                  </label>
                  <Input
                    type="tel"
                    placeholder="+41 79 123 45 67"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="rounded-xl border-2 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t.canton}
                  </label>
                  <select
                    required
                    value={formData.canton}
                    onChange={(e) => updateForm("canton", e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border-2 border-input bg-background text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="">{t.selectCanton}</option>
                    <option value="Vaud">Vaud</option>
                    <option value="Valais">Valais</option>
                    <option value="Genève">{t.cantons.geneva}</option>
                    <option value="Neuchâtel">Neuchâtel</option>
                    <option value="Jura">Jura</option>
                    <option value="Fribourg">Fribourg</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t.service}
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => updateForm("service", e.target.value)}
                    className="w-full h-10 px-4 rounded-xl border-2 border-input bg-background text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="">{t.selectService}</option>
                    <option value="Déclaration d'impôt">{t.services.tax}</option>
                    <option value="Comptabilité">{t.services.accounting}</option>
                    <option value="Gérance immobilière">{t.services.property}</option>
                    <option value="Déclaration + Comptabilité">{t.services.taxAndAccounting}</option>
                    <option value="Autre">{t.services.other}</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t.message}
                  </label>
                  <Textarea
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    className="rounded-xl border-2 focus:border-primary resize-none"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    t.sending
                  ) : (
                    <>
                      {t.submit}
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t.privacy}
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
