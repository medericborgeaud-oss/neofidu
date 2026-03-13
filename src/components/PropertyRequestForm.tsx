"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Check, Home, Building, MapPin, Send } from "lucide-react";
import { SuccessIllustration } from "@/components/Illustrations";
import { useLanguage } from "@/lib/language-context";

// Only Vaud and Valais for property management
const cantons = [
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
];

export function PropertyRequestForm() {
  const { isEnglish } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Property types with translations
  const propertyTypes = isEnglish
    ? [
        { id: "apartment", name: "Apartment", icon: Building },
        { id: "house", name: "House / Villa", icon: Home },
        { id: "commercial", name: "Commercial space", icon: Building },
        { id: "mixed", name: "Mixed building", icon: Building },
      ]
    : [
        { id: "apartment", name: "Appartement", icon: Building },
        { id: "house", name: "Villa / Maison", icon: Home },
        { id: "commercial", name: "Local commercial", icon: Building },
        { id: "mixed", name: "Immeuble mixte", icon: Building },
      ];

  // Step names
  const steps = isEnglish
    ? ["Canton", "Property", "Contact", "Confirmation"]
    : ["Canton", "Bien(s)", "Coordonnées", "Confirmation"];

  // All translations
  const t = {
    // Step 1
    step1Title: isEnglish ? "Property Management" : "Gérance immobilière",
    step1Subtitle: isEnglish
      ? "In which canton is your property located?"
      : "Dans quel canton se situe votre bien ?",
    available: isEnglish ? "Available in Vaud & Valais" : "Disponible en Vaud & Valais",
    // Step 2
    step2Title: isEnglish ? "Your property" : "Votre bien",
    step2Subtitle: isEnglish
      ? "Describe the property you wish to have managed"
      : "Décrivez le bien que vous souhaitez faire gérer",
    propertyType: isEnglish ? "Property type *" : "Type de bien *",
    propertyCount: isEnglish ? "Number of properties" : "Nombre de biens",
    propertyAddress: isEnglish ? "Property address *" : "Adresse du bien *",
    propertyAddressPlaceholder: isEnglish ? "Street and number" : "Rue et numéro",
    propertyCity: isEnglish ? "City *" : "Localité *",
    propertyCityPlaceholder: isEnglish ? "City" : "Ville",
    monthlyRent: isEnglish ? "Monthly rent (CHF)" : "Loyer mensuel (CHF)",
    currentlyManaged: isEnglish ? "Currently managed by an agency?" : "Actuellement géré par une régie ?",
    yes: isEnglish ? "Yes" : "Oui",
    no: isEnglish ? "No" : "Non",
    currentManager: isEnglish ? "Current manager name" : "Nom de la régie actuelle",
    // Step 3
    step3Title: isEnglish ? "Your contact details" : "Vos coordonnées",
    step3Subtitle: isEnglish
      ? "How can we reach you?"
      : "Comment pouvons-nous vous joindre ?",
    firstName: isEnglish ? "First name *" : "Prénom *",
    lastName: isEnglish ? "Last name *" : "Nom *",
    email: isEnglish ? "Email *" : "Email *",
    phone: isEnglish ? "Phone *" : "Téléphone *",
    street: isEnglish ? "Street" : "Rue",
    npa: isEnglish ? "Postal code" : "NPA",
    city: isEnglish ? "City" : "Ville",
    comments: isEnglish ? "Comments" : "Commentaires",
    commentsPlaceholder: isEnglish
      ? "Any additional information about your property..."
      : "Informations complémentaires sur votre bien...",
    // Step 4
    step4Title: isEnglish ? "Summary" : "Récapitulatif",
    step4Subtitle: isEnglish
      ? "Check your information before submitting"
      : "Vérifiez vos informations avant envoi",
    property: isEnglish ? "Property" : "Bien",
    propertyLabel: isEnglish ? "Property" : "Bien",
    address: isEnglish ? "Address" : "Adresse",
    owner: isEnglish ? "Owner" : "Propriétaire",
    contact: isEnglish ? "Contact" : "Contact",
    estimate: isEnglish ? "Annual estimate" : "Estimation annuelle",
    estimateNote: isEnglish
      ? "5% of annual rent + VAT 8.1%"
      : "5% des loyers annuels + TVA 8.1%",
    htLabel: isEnglish ? "Excl. VAT" : "HT",
    vatLabel: isEnglish ? "VAT (8.1%)" : "TVA (8.1%)",
    ttcLabel: isEnglish ? "Incl. VAT" : "TTC",
    typeLabel: isEnglish ? "Type:" : "Type :",
    rentLabel: isEnglish ? "Rent:" : "Loyer :",
    perMonth: isEnglish ? "/month" : "/mois",
    // Buttons
    back: isEnglish ? "Back" : "Retour",
    next: isEnglish ? "Next" : "Suivant",
    submit: isEnglish ? "Submit request" : "Envoyer la demande",
    submitting: isEnglish ? "Sending..." : "Envoi en cours...",
    // Success
    successTitle: isEnglish ? "Request sent!" : "Demande envoyée !",
    successMessage: isEnglish
      ? "We will contact you within 24 business hours to discuss your project."
      : "Nous vous recontacterons dans les 24 heures ouvrables pour discuter de votre projet.",
    reference: isEnglish ? "Reference" : "Référence",
    perYear: isEnglish ? "/year" : "/an",
    stepLabel: isEnglish ? "Step" : "Étape",
  };

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const [formData, setFormData] = useState({
    canton: "",
    propertyType: "",
    propertyCount: 1,
    propertyAddress: "",
    propertyCity: "",
    monthlyRent: "",
    currentlyManaged: false,
    currentManager: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    npa: "",
    city: "",
    comments: "",
  });

  const updateForm = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const TVA_RATE = 0.081; // TVA suisse 8.1%

  const calculateEstimateHT = () => {
    const monthlyRent = parseFloat(formData.monthlyRent) || 0;
    const annualRent = monthlyRent * 12;
    return Math.round(annualRent * 0.05);
  };

  const calculateEstimateTVA = () => {
    return Math.round(calculateEstimateHT() * TVA_RATE * 100) / 100;
  };

  const calculateEstimate = () => {
    return Math.round((calculateEstimateHT() + calculateEstimateTVA()) * 100) / 100;
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.canton !== "";
    if (currentStep === 2) return formData.propertyType !== "" && formData.propertyAddress && formData.propertyCity;
    if (currentStep === 3) return formData.firstName && formData.lastName && formData.email && formData.phone;
    return true;
  };

  const nextStep = () => currentStep < steps.length && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const [submitReference, setSubmitReference] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Get canton name from code
      const cantonData = cantons.find(c => c.code === formData.canton);

      const response = await fetch("/api/property-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          canton: cantonData?.name || formData.canton,
          cantonCode: formData.canton,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || (isEnglish ? "Error sending request" : "Erreur lors de l'envoi"));
        setIsSubmitting(false);
        return;
      }

      setSubmitReference(data.reference || "");
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(isEnglish ? "Connection error" : "Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 md:p-12 text-center">
        <SuccessIllustration className="w-40 h-40 mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.successTitle}</h2>
        <p className="text-muted-foreground text-lg mb-6">{t.successMessage}</p>
        <div className="bg-amber-50 rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <div className="text-sm text-muted-foreground mb-2">{t.estimate} ({t.ttcLabel})</div>
          <div className="text-4xl font-bold text-amber-600">
            CHF {calculateEstimate().toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{t.perYear}</div>
        </div>
        {submitReference && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{t.reference}:</span> {submitReference}
          </p>
        )}
      </Card>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold ${
                  currentStep > i + 1
                    ? "bg-amber-500 text-white"
                    : currentStep === i + 1
                    ? "bg-amber-500 text-white ring-4 ring-amber-500/20"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {currentStep > i + 1 ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden md:block w-4 lg:w-8 h-1 mx-1 rounded ${
                    currentStep > i + 1 ? "bg-amber-500" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">{t.stepLabel} {currentStep}:</span>{" "}
          <span className="font-medium">{steps[currentStep - 1]}</span>
        </div>
      </div>

      {/* Estimate badge */}
      <div className="flex justify-end mb-4">
        <Badge variant="secondary" className="text-lg px-4 py-2 bg-amber-100 text-amber-700">
          ≈ CHF {calculateEstimate().toFixed(2)}{t.perYear}
        </Badge>
      </div>

      <Card className="p-6 md:p-8">
        {/* Step 1: Canton */}
        {currentStep === 1 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-amber-500/10 flex items-center justify-center">
                <Home className="w-12 h-12 text-amber-600" />
              </div>
              <div>
                <Badge className="bg-amber-100 text-amber-700 mb-2">{t.available}</Badge>
                <h2 className="text-2xl font-bold mb-2">{t.step1Title}</h2>
                <p className="text-muted-foreground">{t.step1Subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {cantons.map((c) => (
                <div
                  key={c.code}
                  onClick={() => updateForm("canton", c.code)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    formData.canton === c.code
                      ? "border-amber-500 bg-amber-50"
                      : "border-border hover:border-amber-500/30"
                  }`}
                >
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                    <div className="font-semibold">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t.step2Title}</h2>
            <p className="text-muted-foreground mb-8">{t.step2Subtitle}</p>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">{t.propertyType}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {propertyTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => updateForm("propertyType", type.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        formData.propertyType === type.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-border hover:border-amber-500/30"
                      }`}
                    >
                      <type.icon className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                      <div className="font-medium text-sm">{type.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.propertyAddress}</label>
                  <Input
                    placeholder={t.propertyAddressPlaceholder}
                    value={formData.propertyAddress}
                    onChange={(e) => updateForm("propertyAddress", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.propertyCity}</label>
                  <Input
                    placeholder={t.propertyCityPlaceholder}
                    value={formData.propertyCity}
                    onChange={(e) => updateForm("propertyCity", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t.monthlyRent}</label>
                <Input
                  type="number"
                  placeholder="2500"
                  value={formData.monthlyRent}
                  onChange={(e) => updateForm("monthlyRent", e.target.value)}
                  className="rounded-xl max-w-xs"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">{t.currentlyManaged}</label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={formData.currentlyManaged ? "default" : "outline"}
                    onClick={() => updateForm("currentlyManaged", true)}
                    className="rounded-full"
                  >
                    {t.yes}
                  </Button>
                  <Button
                    type="button"
                    variant={!formData.currentlyManaged ? "default" : "outline"}
                    onClick={() => updateForm("currentlyManaged", false)}
                    className="rounded-full"
                  >
                    {t.no}
                  </Button>
                </div>
                {formData.currentlyManaged && (
                  <Input
                    placeholder={t.currentManager}
                    value={formData.currentManager}
                    onChange={(e) => updateForm("currentManager", e.target.value)}
                    className="rounded-xl mt-4 max-w-md"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t.step3Title}</h2>
            <p className="text-muted-foreground mb-8">{t.step3Subtitle}</p>

            <div className="space-y-4 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.firstName}</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.lastName}</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.email}</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.phone}</label>
                  <Input
                    type="tel"
                    placeholder="+41 79 123 45 67"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t.street}</label>
                <Input
                  value={formData.street}
                  onChange={(e) => updateForm("street", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t.npa}</label>
                  <Input
                    value={formData.npa}
                    onChange={(e) => updateForm("npa", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium mb-2 block">{t.city}</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t.comments}</label>
                <Textarea
                  placeholder={t.commentsPlaceholder}
                  value={formData.comments}
                  onChange={(e) => updateForm("comments", e.target.value)}
                  className="rounded-xl"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{t.step4Title}</h2>
            <p className="text-muted-foreground mb-8">{t.step4Subtitle}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-amber-600" />
                  {t.propertyLabel}
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">{t.typeLabel}</span> {propertyTypes.find(p => p.id === formData.propertyType)?.name}</p>
                  <p><span className="text-muted-foreground">{t.address}:</span> {formData.propertyAddress}, {formData.propertyCity}</p>
                  <p><span className="text-muted-foreground">{t.rentLabel}</span> CHF {formData.monthlyRent}{t.perMonth}</p>
                  <p><span className="text-muted-foreground">Canton:</span> {cantons.find(c => c.code === formData.canton)?.name}</p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  {t.owner}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  {formData.street && <p>{formData.street}, {formData.npa} {formData.city}</p>}
                </div>
              </div>
            </div>

            {/* Estimate */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 text-center mb-6">
              <div className="text-sm opacity-90 mb-2">{t.estimate}</div>
              <div className="text-4xl font-bold mb-1">CHF {calculateEstimate().toFixed(2)}</div>
              <div className="text-sm opacity-80">
                {t.htLabel}: CHF {calculateEstimateHT()}.– | {t.vatLabel}: CHF {calculateEstimateTVA().toFixed(2)}
              </div>
              <div className="text-xs opacity-70 mt-2">{t.estimateNote}</div>
            </div>

            {submitError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4">
                {submitError}
              </div>
            )}
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
            {t.back}
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="rounded-full bg-amber-500 hover:bg-amber-600"
            >
              {t.next}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-full bg-amber-500 hover:bg-amber-600"
            >
              {isSubmitting ? t.submitting : t.submit}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
