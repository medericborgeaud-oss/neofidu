import { Check, X, Info, Calculator } from "lucide-react";

// Détail des forfaits entreprises (Tarifs) et exemples de coût annuel (Entreprises).
// Source de vérité des seuils : la page Tarifs. Garder ces chiffres alignés.

const included = {
  fr: [
    "Saisie et tenue de la comptabilité",
    "Rapprochements bancaires",
    "Décomptes TVA (méthode effective ou TDFN)",
    "Bouclement annuel et états financiers",
    "Déclaration d'impôt de la société (formule PME)",
    "Salaires, décomptes AVS/LAA/LPP et certificats de salaire (formule PME, 2 salariés)",
    "Réponses à vos questions par e-mail",
  ],
  en: [
    "Bookkeeping",
    "Bank reconciliations",
    "VAT returns (effective or net tax rate method)",
    "Annual closing and financial statements",
    "Company tax return (SME plan)",
    "Payroll, AVS/LAA/LPP returns and salary certificates (SME plan, 2 employees)",
    "Answers to your questions by email",
  ],
};

const excluded = {
  fr: [
    "Rattrapage de comptabilité d'exercices antérieurs",
    "Accompagnement lors d'un contrôle fiscal, TVA ou AVS",
    "Création d'entreprise (tarif dédié, dès CHF 290.-)",
    "Déclaration d'impôt privée du dirigeant (dès CHF 89.-)",
  ],
  en: [
    "Catch-up bookkeeping for previous years",
    "Support during a tax, VAT or AVS audit",
    "Company formation (dedicated rate, from CHF 290.-)",
    "Owner's private tax return (from CHF 89.-)",
  ],
};

const extras = {
  fr: [
    { label: "Salarié supplémentaire (formule PME)", price: "CHF 25.-/fiche/mois" },
    { label: "Volume au-delà du seuil de transactions", price: "Devis ajusté, avec votre accord" },
  ],
  en: [
    { label: "Additional employee (SME plan)", price: "CHF 25.-/payslip/month" },
    { label: "Volume above the transaction limit", price: "Adjusted quote, with your agreement" },
  ],
};

export function EntreprisePricingDetails({ isEnglish = false }: { isEnglish?: boolean }) {
  const l = isEnglish ? "en" : "fr";
  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-6">
          <p className="font-semibold mb-4">{isEnglish ? "Included in the packages" : "Inclus dans les forfaits"}</p>
          <ul className="space-y-2">
            {included[l].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-6">
          <p className="font-semibold mb-4">{isEnglish ? "Not included (on quote)" : "Non inclus (sur devis)"}</p>
          <ul className="space-y-2">
            {excluded[l].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-xl border bg-white p-6">
        <p className="font-semibold mb-4">{isEnglish ? "Beyond the package" : "Au-delà du forfait"}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {extras[l].map((item) => (
            <div key={item.label} className="flex items-center justify-between border rounded-lg px-4 py-3">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm font-bold text-emerald-600 ml-3 text-right">{item.price}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0" />
          {isEnglish
            ? "A transaction is one bank statement line or one accounting document (purchase invoice, sales invoice, expense receipt). No extra charge is ever billed without your prior agreement."
            : "Une transaction correspond à une ligne de relevé bancaire ou à une pièce comptable (facture d'achat, facture de vente, note de frais). Aucun supplément n'est facturé sans votre accord préalable."}
        </p>
      </div>
    </div>
  );
}

const examples = {
  fr: [
    {
      profile: "Indépendant assujetti à la TVA",
      detail: "150 transactions par an",
      lines: [
        { label: "Comptabilité, TVA et bouclement", amount: "CHF 500.-" },
        { label: "Déclaration d'impôt privée (revenu indépendant)", amount: "CHF 189.-" },
      ],
      total: "CHF 689.-/an",
    },
    {
      profile: "Sàrl assujettie à la TVA, 2 salariés",
      detail: "500 transactions par an",
      lines: [
        { label: "Forfait PME : CHF 200.- × 12 mois", amount: "CHF 2'400.-" },
        { label: "Salaires, bouclement, déclaration de la société", amount: "inclus" },
      ],
      total: "CHF 2'400.-/an",
    },
    {
      profile: "Sàrl assujettie à la TVA, 4 salariés",
      detail: "550 transactions par an",
      lines: [
        { label: "Forfait PME : CHF 200.- × 12 mois", amount: "CHF 2'400.-" },
        { label: "2 salariés en plus : 2 × CHF 25.- × 12 mois", amount: "CHF 600.-" },
      ],
      total: "CHF 3'000.-/an",
    },
  ],
  en: [
    {
      profile: "Self-employed, VAT registered",
      detail: "150 transactions per year",
      lines: [
        { label: "Accounting, VAT and closing", amount: "CHF 500.-" },
        { label: "Private tax return (self-employed income)", amount: "CHF 189.-" },
      ],
      total: "CHF 689.-/year",
    },
    {
      profile: "LLC, VAT registered, 2 employees",
      detail: "500 transactions per year",
      lines: [
        { label: "SME package: CHF 200.- × 12 months", amount: "CHF 2'400.-" },
        { label: "Payroll, closing, company tax return", amount: "included" },
      ],
      total: "CHF 2'400.-/year",
    },
    {
      profile: "LLC, VAT registered, 4 employees",
      detail: "550 transactions per year",
      lines: [
        { label: "SME package: CHF 200.- × 12 months", amount: "CHF 2'400.-" },
        { label: "2 extra employees: 2 × CHF 25.- × 12 months", amount: "CHF 600.-" },
      ],
      total: "CHF 3'000.-/year",
    },
  ],
};

export function AnnualCostExamples({ isEnglish = false }: { isEnglish?: boolean }) {
  const l = isEnglish ? "en" : "fr";
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {isEnglish ? "What does it really cost per year?" : "Combien ça coûte vraiment par an ?"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isEnglish
            ? "Three typical cases, with everything included. No annual closing or company tax return billed on top."
            : "Trois cas types, tout compris. Pas de bouclement ni de déclaration de la société facturés en plus."}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {examples[l].map((ex) => (
          <div key={ex.profile} className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{ex.profile}</h3>
            <p className="text-sm text-muted-foreground mb-4">{ex.detail}</p>
            <ul className="space-y-2 mb-4 flex-1">
              {ex.lines.map((line) => (
                <li key={line.label} className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{line.label}</span>
                  <span className="font-medium whitespace-nowrap">{line.amount}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-3 flex justify-between items-baseline">
              <span className="text-sm font-semibold">{isEnglish ? "Total" : "Total"}</span>
              <span className="text-xl font-bold text-primary">{ex.total}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
        {isEnglish
          ? "Starting prices for a standard file. If your file is more complex, you receive an adjusted quote before we start: no extra charge without your agreement."
          : "Prix de départ pour un dossier standard. Si votre dossier est plus complexe, vous recevez un devis ajusté avant de commencer : aucun supplément sans votre accord."}
      </p>
    </div>
  );
}
