"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Check, Home, Building, MapPin, Send } from "lucide-react";
import { SuccessIllustration } from "@/components/Illustrations";
// Drapeaux retirés pour gagner de la place

// Only Vaud and Valais for property management
const cantons = [
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
];

const propertyTypes = [
  { id: "apartment", name: "Appartement", icon: Building },
  { id: "house", name: "Villa / Maison", icon: Home },
  { id: "commercial", name: "Local commercial", icon: Building },
  { id: "mixed", name: "Immeuble mixte", icon: Building },
];

const steps = ["Canton", "Bien(s)", "Coordonnées", "Confirmation"];

export function PropertyRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          canton: cantonData?.name || formData.canton,
          cantonCode: formData.canton,
          propertyType: formData.propertyType,
          propertyCount: formData.propertyCount,
          propertyAddress: formData.propertyAddress,
          propertyCity: formData.propertyCity,
          monthlyRent: formData.monthlyRent,
          currentlyManaged: formData.currentlyManaged,
          currentManager: formData.currentManager,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          npa: formData.npa,
          city: formData.city,
          comments: formData.comments,
        }),
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
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Demande envoyée avec succès !</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Merci pour votre intérêt. Un conseiller spécialisé en gérance immobilière
          vous contactera sous 24h pour discuter de votre projet.
          <strong> Un email de confirmation vous a été envoyé.</strong>
        </p>
        <div className="bg-amber-50 rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <div className="text-sm text-muted-foreground mb-2">Estimation annuelle TTC</div>
          <div className="text-4xl font-bold text-amber-600">CHF {calculateEstimate().toFixed(2)}</div>
          <div className="text-sm text-muted-foreground mt-1">soit 5% des loyers bruts + TVA (8.1%)</div>
          <div className="text-xs text-muted-foreground mt-2">
            HT: CHF {calculateEstimateHT()}.- | TVA: CHF {calculateEstimateTVA().toFixed(2)}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Référence: <span className="font-mono font-semibold">{submitReference}</span></p>
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep > i + 1 ? "bg-amber-600 text-white" : currentStep === i + 1 ? "bg-amber-600 text-white ring-4 ring-amber-200" : "bg-secondary text-muted-foreground"
              }`}>
                {currentStep > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`hidden md:block w-16 lg:w-32 h-1 mx-2 rounded ${currentStep > i + 1 ? "bg-amber-600" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>
        <div className="text-center text-sm"><span className="text-muted-foreground">Étape {currentStep}:</span> <span className="font-medium">{steps[currentStep - 1]}</span></div>
      </div>

      {formData.monthlyRent && (
        <div className="flex justify-end mb-4">
          <Badge className="text-lg px-4 py-2 bg-amber-600">~CHF {calculateEstimate().toFixed(2)} TTC/an</Badge>
        </div>
      )}

      <Card className="p-6 md:p-8">
        {/* Step 1: Canton */}
        {currentStep === 1 && (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-amber-500/10 flex items-center justify-center">
                <Home className="w-12 h-12 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Gérance immobilière</h2>
                <p className="text-muted-foreground">Dans quel canton se situe votre bien ?</p>
                <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-700">
                  Service disponible uniquement en Vaud et Valais
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {cantons.map((c) => (
                <div key={c.code} onClick={() => updateForm("canton", c.code)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${formData.canton === c.code ? "border-amber-600 bg-amber-50" : "border-border hover:border-amber-300"}`}>
                  <div className="text-center font-semibold text-lg">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Détails du bien</h2>
            <p className="text-muted-foreground mb-8">Décrivez le(s) bien(s) à gérer.</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Type de bien</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {propertyTypes.map((type) => (
                    <div key={type.id} onClick={() => updateForm("propertyType", type.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${formData.propertyType === type.id ? "border-amber-600 bg-amber-50" : "border-border hover:border-amber-300"}`}>
                      <type.icon className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                      <div className="text-sm font-medium">{type.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Nombre de biens *</label>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" size="icon" onClick={() => updateForm("propertyCount", Math.max(1, formData.propertyCount - 1))}>-</Button>
                  <span className="text-2xl font-bold w-12 text-center">{formData.propertyCount}</span>
                  <Button type="button" variant="outline" size="icon" onClick={() => updateForm("propertyCount", formData.propertyCount + 1)}>+</Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Adresse du bien principal *</label>
                <Input value={formData.propertyAddress} onChange={(e) => updateForm("propertyAddress", e.target.value)} placeholder="Rue et numéro" className="rounded-xl" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">NPA</label>
                  <Input value={formData.npa} onChange={(e) => updateForm("npa", e.target.value)} placeholder="1000" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Localité *</label>
                  <Input value={formData.propertyCity} onChange={(e) => updateForm("propertyCity", e.target.value)} placeholder="Lausanne" className="rounded-xl" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Loyer mensuel total (CHF)</label>
                <Input type="number" value={formData.monthlyRent} onChange={(e) => updateForm("monthlyRent", e.target.value)} placeholder="Ex: 2500" className="rounded-xl" />
                <p className="text-sm text-muted-foreground mt-1">Pour calculer notre estimation tarifaire (5% des loyers bruts)</p>
              </div>

              <div className="p-4 border rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <input type="checkbox" id="currentlyManaged" checked={formData.currentlyManaged} onChange={(e) => updateForm("currentlyManaged", e.target.checked)} className="w-5 h-5" />
                  <label htmlFor="currentlyManaged" className="font-medium cursor-pointer">Le bien est actuellement géré par une régie</label>
                </div>
                {formData.currentlyManaged && (
                  <div className="pl-8">
                    <label className="text-sm font-medium mb-2 block">Nom de la régie actuelle</label>
                    <Input value={formData.currentManager} onChange={(e) => updateForm("currentManager", e.target.value)} className="rounded-xl" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Vos coordonnées</h2>
            <p className="text-muted-foreground mb-8">Comment pouvons-nous vous joindre ?</p>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prénom *</label>
                  <Input value={formData.firstName} onChange={(e) => updateForm("firstName", e.target.value)} placeholder="Jean" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom *</label>
                  <Input value={formData.lastName} onChange={(e) => updateForm("lastName", e.target.value)} placeholder="Dupont" className="rounded-xl" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input type="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="jean@email.ch" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Téléphone *</label>
                  <Input type="tel" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+41 79 123 45 67" className="rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Adresse</label>
                <Input value={formData.street} onChange={(e) => updateForm("street", e.target.value)} placeholder="Votre adresse de correspondance" className="rounded-xl" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">NPA</label>
                  <Input placeholder="1003" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ville</label>
                  <Input value={formData.city} onChange={(e) => updateForm("city", e.target.value)} placeholder="Lausanne" className="rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Commentaires ou questions</label>
                <Textarea value={formData.comments} onChange={(e) => updateForm("comments", e.target.value)} className="rounded-xl" rows={3} placeholder="Décrivez votre situation ou posez-nous vos questions..." />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Récapitulatif de votre demande</h2>
              <p className="text-muted-foreground">Vérifiez les informations avant envoi.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Canton</div>
                  <div className="font-semibold">{cantons.find(c => c.code === formData.canton)?.name}</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Type de bien</div>
                  <div className="font-semibold">{propertyTypes.find(t => t.id === formData.propertyType)?.name}</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Adresse</div>
                  <div className="font-semibold">{formData.propertyAddress}, {formData.propertyCity}</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground">Contact</div>
                  <div className="font-semibold">{formData.firstName} {formData.lastName}</div>
                  <div className="text-sm">{formData.email}</div>
                </div>
              </div>
              <div>
                <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                  <div className="text-sm text-muted-foreground mb-2 text-center">Estimation tarifaire annuelle</div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Montant HT (5%)</span>
                      <span>CHF {calculateEstimateHT()}.-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA (8.1%)</span>
                      <span>CHF {calculateEstimateTVA().toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total TTC</span>
                      <span className="text-amber-600">CHF {calculateEstimate().toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">CHF {calculateEstimate().toFixed(2)}/an</div>
                  </div>
                  {formData.monthlyRent && (
                    <div className="text-xs text-muted-foreground mt-2 text-center">
                      ({formData.monthlyRent} CHF x 12 mois x 5% + TVA 8.1%)
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Un conseiller vous contactera sous 24h pour discuter de vos besoins spécifiques et vous proposer un devis personnalisé.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={nextStep} disabled={!canProceed()} className="rounded-full bg-amber-600 hover:bg-amber-700">
              Suivant<ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="rounded-full bg-amber-600 hover:bg-amber-700">
              {isSubmitting ? "Envoi..." : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer ma demande
                </>
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
