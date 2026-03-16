"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  User,
  AlertTriangle,
  Info,
  HelpCircle,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Options pour l'activité de l'enfant
const childActivityOptions = [
  { id: "student_primary", name: "Écolier/ère", description: "École primaire ou secondaire" },
  { id: "student_high", name: "Gymnase/collège", description: "Études secondaires supérieures" },
  { id: "student_university", name: "Étudiant/e", description: "Université, HES, HEP" },
  { id: "apprentice", name: "Apprenti/e", description: "Formation professionnelle" },
  { id: "employed", name: "Employé/e", description: "Activité salariée" },
  { id: "unemployed", name: "Sans activité", description: "Chômeur ou sans emploi" },
  { id: "other", name: "Autre", description: "Autre situation" },
];

// Options pour le type de garde (cas de parents séparés)
const custodyOptions = [
  { id: "full", name: "Garde exclusive", description: "L'enfant vit exclusivement avec vous" },
  { id: "shared_main", name: "Garde partagée (principal)", description: "Vous êtes le parent principal (>50% du temps)" },
  { id: "shared_equal", name: "Garde alternée (50/50)", description: "Temps égal entre les deux parents" },
  { id: "shared_secondary", name: "Garde partagée (secondaire)", description: "L'enfant vit principalement chez l'autre parent" },
];

// Interface pour un enfant à charge
export interface ChildData {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  activity: string;
  // Charge et déductions
  isDependent: boolean;
  dependentPercentage: string; // 100, 50, etc.
  // Garde (pour parents séparés/divorcés)
  custodyType: string;
  // Frais spécifiques à cet enfant
  hasGuardCosts: boolean;
  guardCostsAmount: string;
  guardCostsDescription: string;
}

export const createEmptyChild = (): ChildData => ({
  id: Math.random().toString(36).substr(2, 9),
  firstName: "",
  lastName: "",
  birthDate: "",
  activity: "",
  isDependent: true,
  dependentPercentage: "100",
  custodyType: "full",
  hasGuardCosts: false,
  guardCostsAmount: "",
  guardCostsDescription: "",
});

// Calculer l'âge à partir de la date de naissance
const calculateAge = (birthDate: string): number => {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Vérifier si un enfant peut être fiscalement à charge
const canBeDependent = (child: ChildData): { canBe: boolean; reason: string } => {
  const age = calculateAge(child.birthDate);
  if (age < 18) {
    return { canBe: true, reason: "Enfant mineur" };
  }
  if (age < 25 && (child.activity === "student_high" || child.activity === "student_university" || child.activity === "apprentice")) {
    return { canBe: true, reason: "En formation jusqu'à 25 ans" };
  }
  if (age >= 25) {
    return { canBe: false, reason: "Plus de 25 ans - non déductible" };
  }
  if (child.activity === "employed") {
    return { canBe: false, reason: "Enfant majeur avec revenus propres" };
  }
  return { canBe: true, reason: "" };
};

// Validation d'un enfant
const validateChild = (child: ChildData): string[] => {
  const errors: string[] = [];
  if (!child.firstName.trim()) errors.push("Prénom");
  if (!child.lastName.trim()) errors.push("Nom");
  if (!child.birthDate) errors.push("Date de naissance");
  if (!child.activity) errors.push("Activité actuelle");
  return errors;
};

interface ChildrenSectionProps {
  children: ChildData[];
  onChildrenChange: (children: ChildData[]) => void;
  maritalStatus: string; // Pour savoir si parents séparés/divorcés
  hasGuardCosts: boolean;
  onHasGuardCostsChange: (value: boolean) => void;
}

export function ChildrenSection({
  children,
  onChildrenChange,
  maritalStatus,
  hasGuardCosts,
  onHasGuardCostsChange,
}: ChildrenSectionProps) {
  const isSeparatedOrDivorced = maritalStatus === "divorced" || maritalStatus === "separated";

  const addChild = () => {
    onChildrenChange([...children, createEmptyChild()]);
  };

  const removeChild = (childId: string) => {
    if (children.length > 1) {
      onChildrenChange(children.filter((c) => c.id !== childId));
    }
  };

  const updateChild = (childId: string, field: keyof ChildData, value: string | boolean) => {
    onChildrenChange(
      children.map((c) =>
        c.id === childId ? { ...c, [field]: value } : c
      )
    );
  };

  // Calculer le total des frais de garde
  const totalGuardCosts = children
    .filter((c) => c.hasGuardCosts && c.guardCostsAmount)
    .reduce((sum, c) => sum + (parseFloat(c.guardCostsAmount) || 0), 0);

  return (
    <div className="space-y-4">
      {/* Info pour parents séparés/divorcés */}
      {isSeparatedOrDivorced && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Parents séparés / divorcés</p>
              <p className="text-sm text-amber-700 mt-1">
                Pour chaque enfant, indiquez le type de garde. La répartition des déductions fiscales
                dépend de la situation de garde. En cas de garde alternée (50/50), les déductions
                sont généralement partagées entre les deux parents.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Liste des enfants */}
      {children.map((child, index) => {
        const age = calculateAge(child.birthDate);
        const dependentStatus = canBeDependent(child);
        const errors = validateChild(child);

        return (
          <Card key={child.id} className="p-4 border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Enfant {index + 1}
                {child.firstName && <span className="text-primary">- {child.firstName}</span>}
                {age > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-muted-foreground">
                    {age} ans
                  </span>
                )}
              </h4>
              {children.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeChild(child.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Erreurs de validation */}
            {errors.length > 0 && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">
                    Champs requis : {errors.join(", ")}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Nom et prénom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Prénom de l'enfant"
                    value={child.firstName}
                    onChange={(e) => updateChild(child.id, "firstName", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nom de l'enfant"
                    value={child.lastName}
                    onChange={(e) => updateChild(child.id, "lastName", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Date de naissance */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={child.birthDate}
                    onChange={(e) => updateChild(child.id, "birthDate", e.target.value)}
                    className="rounded-xl"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                    Activité actuelle <span className="text-red-500">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-muted-foreground hover:text-primary">
                            <HelpCircle className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>L'activité détermine si l'enfant peut être fiscalement à charge. Les enfants en formation jusqu'à 25 ans restent déductibles.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <select
                    value={child.activity}
                    onChange={(e) => updateChild(child.id, "activity", e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  >
                    <option value="">Sélectionnez...</option>
                    {childActivityOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Statut de charge fiscale */}
              {child.birthDate && child.activity && (
                <div className={`p-3 rounded-xl ${dependentStatus.canBe ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={child.isDependent && dependentStatus.canBe}
                      onChange={(e) => updateChild(child.id, "isDependent", e.target.checked)}
                      disabled={!dependentStatus.canBe}
                      className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <span className={`font-medium text-sm ${dependentStatus.canBe ? "text-green-800" : "text-amber-800"}`}>
                        {dependentStatus.canBe ? "Enfant à votre charge fiscale" : "Non déductible fiscalement"}
                      </span>
                      {dependentStatus.reason && (
                        <p className={`text-xs mt-0.5 ${dependentStatus.canBe ? "text-green-600" : "text-amber-600"}`}>
                          {dependentStatus.reason}
                        </p>
                      )}
                    </div>
                    {child.isDependent && dependentStatus.canBe && (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          min="50"
                          max="100"
                          step="50"
                          value={child.dependentPercentage}
                          onChange={(e) => updateChild(child.id, "dependentPercentage", e.target.value)}
                          className="w-16 rounded-lg text-sm p-1.5 text-center"
                        />
                        <span className="text-sm text-green-700">%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Type de garde (pour parents séparés/divorcés) */}
              {isSeparatedOrDivorced && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <label className="block text-sm font-medium mb-2 text-blue-800">
                    Type de garde
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {custodyOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => updateChild(child.id, "custodyType", opt.id)}
                        className={`p-2 rounded-lg border cursor-pointer transition-all text-sm ${
                          child.custodyType === opt.id
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div className="font-medium text-xs">{opt.name}</div>
                      </div>
                    ))}
                  </div>
                  {child.custodyType === "shared_equal" && (
                    <p className="text-xs text-blue-600 mt-2">
                      En garde alternée 50/50, les déductions sont partagées entre les parents. Indiquez 50% ci-dessus.
                    </p>
                  )}
                </div>
              )}

              {/* Frais de garde pour cet enfant */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={child.hasGuardCosts}
                    onChange={(e) => {
                      updateChild(child.id, "hasGuardCosts", e.target.checked);
                      // Also update the parent hasGuardCosts if any child has guard costs
                      const anyChildHasGuardCosts = children.some(c =>
                        c.id === child.id ? e.target.checked : c.hasGuardCosts
                      );
                      onHasGuardCostsChange(anyChildHasGuardCosts);
                    }}
                    className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Frais de garde pour cet enfant</span>
                </label>
                {child.hasGuardCosts && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">CHF</span>
                      <Input
                        type="number"
                        placeholder="Montant annuel"
                        value={child.guardCostsAmount}
                        onChange={(e) => updateChild(child.id, "guardCostsAmount", e.target.value)}
                        className="w-32 rounded-lg"
                      />
                      <span className="text-sm text-muted-foreground">/ an</span>
                    </div>
                    <Input
                      placeholder="Type de garde (crèche, UAPE, maman de jour, cantine, camps...)"
                      value={child.guardCostsDescription}
                      onChange={(e) => updateChild(child.id, "guardCostsDescription", e.target.value)}
                      className="rounded-lg text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      {/* Bouton ajouter un enfant */}
      <Button
        type="button"
        variant="outline"
        onClick={addChild}
        className="w-full rounded-xl border-dashed border-2"
      >
        <Plus className="w-4 h-4 mr-2" />
        Ajouter un autre enfant
      </Button>

      {/* Résumé des frais de garde */}
      {totalGuardCosts > 0 && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-800">Total frais de garde</span>
            <span className="font-bold text-emerald-700">CHF {totalGuardCosts.toLocaleString('fr-CH')}.-</span>
          </div>
          <p className="text-xs text-emerald-600 mt-1">
            Ces frais seront déduits de votre revenu imposable (plafonds cantonaux applicables).
          </p>
        </div>
      )}

      {/* Info sur les documents */}
      {hasGuardCosts && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              <strong>Documents à fournir :</strong> Attestations de frais de garde (crèche, UAPE, maman de jour),
              factures de cantine scolaire, attestations de camps de vacances.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
