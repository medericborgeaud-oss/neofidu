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
const getChildActivityOptions = (isEnglish: boolean) => [
  { id: "student_primary", name: isEnglish ? "Primary school student" : "Écolier/ère", description: isEnglish ? "Primary or secondary school" : "École primaire ou secondaire" },
  { id: "student_high", name: isEnglish ? "High school / gymnasium" : "Gymnase/collège", description: isEnglish ? "Upper secondary studies" : "Études secondaires supérieures" },
  { id: "student_university", name: isEnglish ? "Student" : "Étudiant/e", description: isEnglish ? "University, HES, HEP" : "Université, HES, HEP" },
  { id: "apprentice", name: isEnglish ? "Apprentice" : "Apprenti/e", description: isEnglish ? "Vocational training" : "Formation professionnelle" },
  { id: "employed", name: isEnglish ? "Employed" : "Employé/e", description: isEnglish ? "Salaried employment" : "Activité salariée" },
  { id: "unemployed", name: isEnglish ? "Inactive" : "Sans activité", description: isEnglish ? "Unemployed or inactive" : "Chômeur ou sans emploi" },
  { id: "other", name: isEnglish ? "Other" : "Autre", description: isEnglish ? "Other situation" : "Autre situation" },
];

// Options pour le type de garde (cas de parents séparés)
const getCustodyOptions = (isEnglish: boolean) => [
  { id: "full", name: isEnglish ? "Exclusive custody" : "Garde exclusive", description: isEnglish ? "The child lives exclusively with you" : "L'enfant vit exclusivement avec vous" },
  { id: "shared_main", name: isEnglish ? "Shared custody (primary)" : "Garde partagée (principal)", description: isEnglish ? "You are the primary parent (>50% of the time)" : "Vous êtes le parent principal (>50% du temps)" },
  { id: "shared_equal", name: isEnglish ? "Alternating custody (50/50)" : "Garde alternée (50/50)", description: isEnglish ? "Equal time between both parents" : "Temps égal entre les deux parents" },
  { id: "shared_secondary", name: isEnglish ? "Shared custody (secondary)" : "Garde partagée (secondaire)", description: isEnglish ? "The child lives mainly with the other parent" : "L'enfant vit principalement chez l'autre parent" },
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
const canBeDependent = (child: ChildData, isEnglish: boolean = false): { canBe: boolean; reason: string } => {
  const age = calculateAge(child.birthDate);
  if (age < 18) {
    return { canBe: true, reason: isEnglish ? "Minor child" : "Enfant mineur" };
  }
  if (age < 25 && (child.activity === "student_high" || child.activity === "student_university" || child.activity === "apprentice")) {
    return { canBe: true, reason: isEnglish ? "In education up to age 25" : "En formation jusqu'à 25 ans" };
  }
  if (age >= 25) {
    return { canBe: false, reason: isEnglish ? "Over 25 - not deductible" : "Plus de 25 ans - non déductible" };
  }
  if (child.activity === "employed") {
    return { canBe: false, reason: isEnglish ? "Adult child with own income" : "Enfant majeur avec revenus propres" };
  }
  return { canBe: true, reason: "" };
};

// Validation d'un enfant
const validateChild = (child: ChildData, isEnglish: boolean = false): string[] => {
  const errors: string[] = [];
  if (!child.firstName.trim()) errors.push(isEnglish ? "First name" : "Prénom");
  if (!child.lastName.trim()) errors.push(isEnglish ? "Last name" : "Nom");
  if (!child.birthDate) errors.push(isEnglish ? "Date of birth" : "Date de naissance");
  if (!child.activity) errors.push(isEnglish ? "Current activity" : "Activité actuelle");
  return errors;
};

interface ChildrenSectionProps {
  children: ChildData[];
  onChildrenChange: (children: ChildData[]) => void;
  maritalStatus: string; // Pour savoir si parents séparés/divorcés
  hasGuardCosts: boolean;
  onHasGuardCostsChange: (value: boolean) => void;
  isEnglish?: boolean;
}

export function ChildrenSection({
  children,
  onChildrenChange,
  maritalStatus,
  hasGuardCosts,
  onHasGuardCostsChange,
  isEnglish = false,
}: ChildrenSectionProps) {
  const isSeparatedOrDivorced =
    maritalStatus === "divorced" || maritalStatus === "separated";

  const addChild = () => {
    onChildrenChange([...children, createEmptyChild()]);
  };

  const removeChild = (childId: string) => {
    if (children.length > 1) {
      onChildrenChange(children.filter((c) => c.id !== childId));
    }
  };

  const updateChild = (
    childId: string,
    field: keyof ChildData,
    value: string | boolean
  ) => {
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

  const childActivityOptions = getChildActivityOptions(isEnglish);
  const custodyOptions = getCustodyOptions(isEnglish);

  return (
    <div className="space-y-4">
      {/* Info pour parents séparés/divorcés */}
      {isSeparatedOrDivorced && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">
                {isEnglish ? "Separated / Divorced parents" : "Parents séparés / divorcés"}
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {isEnglish
                  ? "For each child, indicate the custody type. Tax deductions depend on the custody arrangement. In case of alternating custody (50/50), deductions are generally shared between both parents."
                  : "Pour chaque enfant, indiquez le type de garde. La répartition des déductions fiscales dépend de la situation de garde. En cas de garde alternée (50/50), les déductions sont généralement partagées entre les deux parents."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Liste des enfants */}
      {children.map((child, index) => {
        const age = calculateAge(child.birthDate);
        const dependentStatus = canBeDependent(child, isEnglish);
        const errors = validateChild(child, isEnglish);

        return (
          <Card key={child.id} className="p-4 border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {isEnglish ? "Child" : "Enfant"} {index + 1}
                {child.firstName && (
                  <span className="text-primary">- {child.firstName}</span>
                )}
                {age > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-muted-foreground">
                    {age} {isEnglish ? "yrs" : "ans"}
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
                    {isEnglish ? "Required fields:" : "Champs requis :"} {errors.join(", ")}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Nom et prénom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {isEnglish ? "First name" : "Prénom"} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder={isEnglish ? "Child's first name" : "Prénom de l'enfant"}
                    value={child.firstName}
                    onChange={(e) =>
                      updateChild(child.id, "firstName", e.target.value)
                    }
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {isEnglish ? "Last name" : "Nom"} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder={isEnglish ? "Child's last name" : "Nom de l'enfant"}
                    value={child.lastName}
                    onChange={(e) =>
                      updateChild(child.id, "lastName", e.target.value)
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Date de naissance */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {isEnglish ? "Date of birth" : "Date de naissance"} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={child.birthDate}
                    onChange={(e) =>
                      updateChild(child.id, "birthDate", e.target.value)
                    }
                    className="rounded-xl"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                    {isEnglish ? "Current activity" : "Activité actuelle"} <span className="text-red-500">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            {isEnglish
                              ? "The activity determines whether the child can be a tax dependent. Children in education up to age 25 remain deductible."
                              : "L'activité détermine si l'enfant peut être fiscalement à charge. Les enfants en formation jusqu'à 25 ans restent déductibles."}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <select
                    value={child.activity}
                    onChange={(e) =>
                      updateChild(child.id, "activity", e.target.value)
                    }
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  >
                    <option value="">{isEnglish ? "Select..." : "Sélectionnez..."}</option>
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
                <div
                  className={`p-3 rounded-xl ${
                    dependentStatus.canBe
                      ? "bg-green-50 border border-green-200"
                      : "bg-amber-50 border border-amber-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={child.isDependent && dependentStatus.canBe}
                      onChange={(e) =>
                        updateChild(child.id, "isDependent", e.target.checked)
                      }
                      disabled={!dependentStatus.canBe}
                      className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <span
                        className={`font-medium text-sm ${
                          dependentStatus.canBe
                            ? "text-green-800"
                            : "text-amber-800"
                        }`}
                      >
                        {dependentStatus.canBe
                          ? (isEnglish ? "Child in your tax charge" : "Enfant à votre charge fiscale")
                          : (isEnglish ? "Not tax deductible" : "Non déductible fiscalement")}
                      </span>
                      {dependentStatus.reason && (
                        <p
                          className={`text-xs mt-0.5 ${
                            dependentStatus.canBe
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
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
                          onChange={(e) =>
                            updateChild(
                              child.id,
                              "dependentPercentage",
                              e.target.value
                            )
                          }
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
                    {isEnglish ? "Custody type" : "Type de garde"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {custodyOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() =>
                          updateChild(child.id, "custodyType", opt.id)
                        }
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
                      {isEnglish
                        ? "In alternating custody 50/50, deductions are shared between both parents. Enter 50% above."
                        : "En garde alternée 50/50, les déductions sont partagées entre les parents. Indiquez 50% ci-dessus."}
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
                  <span className="text-sm font-medium">
                    {isEnglish ? "Childcare costs for this child" : "Frais de garde pour cet enfant"}
                  </span>
                </label>
                {child.hasGuardCosts && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">CHF</span>
                      <Input
                        type="number"
                        placeholder={isEnglish ? "Annual amount" : "Montant annuel"}
                        value={child.guardCostsAmount}
                        onChange={(e) =>
                          updateChild(
                            child.id,
                            "guardCostsAmount",
                            e.target.value
                          )
                        }
                        className="w-32 rounded-lg"
                      />
                      <span className="text-sm text-muted-foreground">
                        {isEnglish ? "/ year" : "/ an"}
                      </span>
                    </div>
                    <Input
                      placeholder={isEnglish ? "Type of childcare (daycare, UAPE, childminder, canteen, camps...)" : "Type de garde (crèche, UAPE, maman de jour, cantine, camps...)"}
                      value={child.guardCostsDescription}
                      onChange={(e) =>
                        updateChild(
                          child.id,
                          "guardCostsDescription",
                          e.target.value
                        )
                      }
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
        {isEnglish ? "Add another child" : "Ajouter un autre enfant"}
      </Button>

      {/* Résumé des frais de garde */}
      {totalGuardCosts > 0 && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-800">
              {isEnglish ? "Total childcare costs" : "Total frais de garde"}
            </span>
            <span className="font-bold text-emerald-700">
              CHF {totalGuardCosts.toLocaleString('fr-CH')}.-
            </span>
          </div>
          <p className="text-xs text-emerald-600 mt-1">
            {isEnglish
              ? "These costs will be deducted from your taxable income (cantonal caps apply)."
              : "Ces frais seront déduits de votre revenu imposable (plafonds cantonaux applicables)."}
          </p>
        </div>
      )}

      {/* Info sur les documents */}
      {hasGuardCosts && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              <strong>{isEnglish ? "Documents to provide:" : "Documents à fournir :"}</strong>{" "}
              {isEnglish
                ? "Childcare cost certificates (daycare, UAPE, childminder), school canteen invoices, holiday camp certificates."
                : "Attestations de frais de garde (crèche, UAPE, maman de jour), factures de cantine scolaire, attestations de camps de vacances."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
