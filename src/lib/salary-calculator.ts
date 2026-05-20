// Donnees fiscales suisses par canton (taux approximatifs 2025)
export interface Canton {
  code: string;
  name: string;
  nameFr: string;
  taxRate: number;
  municipalMultiplier: number;
}

export const cantons: Canton[] = [
  { code: "ZH", name: "Zurich", nameFr: "Zurich", taxRate: 11.5, municipalMultiplier: 1.19 },
  { code: "BE", name: "Bern", nameFr: "Berne", taxRate: 14.2, municipalMultiplier: 1.54 },
  { code: "LU", name: "Luzern", nameFr: "Lucerne", taxRate: 9.8, municipalMultiplier: 1.75 },
  { code: "UR", name: "Uri", nameFr: "Uri", taxRate: 10.5, municipalMultiplier: 1.00 },
  { code: "SZ", name: "Schwyz", nameFr: "Schwytz", taxRate: 7.2, municipalMultiplier: 1.30 },
  { code: "OW", name: "Obwalden", nameFr: "Obwald", taxRate: 8.5, municipalMultiplier: 1.00 },
  { code: "NW", name: "Nidwalden", nameFr: "Nidwald", taxRate: 8.8, municipalMultiplier: 1.00 },
  { code: "GL", name: "Glarus", nameFr: "Glaris", taxRate: 12.0, municipalMultiplier: 1.00 },
  { code: "ZG", name: "Zug", nameFr: "Zoug", taxRate: 5.5, municipalMultiplier: 0.82 },
  { code: "FR", name: "Fribourg", nameFr: "Fribourg", taxRate: 13.8, municipalMultiplier: 1.00 },
  { code: "SO", name: "Solothurn", nameFr: "Soleure", taxRate: 12.5, municipalMultiplier: 1.20 },
  { code: "BS", name: "Basel-Stadt", nameFr: "Bale-Ville", taxRate: 14.0, municipalMultiplier: 1.00 },
  { code: "BL", name: "Basel-Landschaft", nameFr: "Bale-Campagne", taxRate: 12.8, municipalMultiplier: 1.00 },
  { code: "SH", name: "Schaffhausen", nameFr: "Schaffhouse", taxRate: 11.0, municipalMultiplier: 1.15 },
  { code: "AR", name: "Appenzell Ausserrhoden", nameFr: "Appenzell Rhodes-Ext.", taxRate: 11.5, municipalMultiplier: 1.00 },
  { code: "AI", name: "Appenzell Innerrhoden", nameFr: "Appenzell Rhodes-Int.", taxRate: 9.0, municipalMultiplier: 1.00 },
  { code: "SG", name: "St. Gallen", nameFr: "Saint-Gall", taxRate: 12.2, municipalMultiplier: 1.44 },
  { code: "GR", name: "Graubunden", nameFr: "Grisons", taxRate: 11.8, municipalMultiplier: 1.00 },
  { code: "AG", name: "Aargau", nameFr: "Argovie", taxRate: 10.5, municipalMultiplier: 1.15 },
  { code: "TG", name: "Thurgau", nameFr: "Thurgovie", taxRate: 10.8, municipalMultiplier: 1.17 },
  { code: "TI", name: "Ticino", nameFr: "Tessin", taxRate: 13.5, municipalMultiplier: 1.00 },
  { code: "VD", name: "Vaud", nameFr: "Vaud", taxRate: 14.5, municipalMultiplier: 1.54 },
  { code: "VS", name: "Valais", nameFr: "Valais", taxRate: 13.0, municipalMultiplier: 1.30 },
  { code: "NE", name: "Neuchatel", nameFr: "Neuchatel", taxRate: 15.2, municipalMultiplier: 1.00 },
  { code: "GE", name: "Geneve", nameFr: "Geneve", taxRate: 14.8, municipalMultiplier: 0.44 },
  { code: "JU", name: "Jura", nameFr: "Jura", taxRate: 15.0, municipalMultiplier: 1.00 },
];

export const socialContributions = {
  avsAiApg: 5.3,
  ac: 1.1,
  // AC2 solidarity contribution (0.5%) was abolished on 01.01.2023
  acThreshold: 148200,
  aanp: 1.5,
  lpp: {
    rate25to34: 3.5,
    rate35to44: 5.0,
    rate45to54: 7.5,
    rate55to65: 9.0,
  },
  lppThreshold: 22680, // 2025
  lppCoordination: 26460, // 2025
  lppMaxInsuredSalary: 90720, // BVG maximum insured salary 2025
};

// Baremes IFD 2025 indexes (ESTV Form. 58c 2025)
export const federalTaxBrackets = [
  { min: 0, max: 18500, rate: 0 },
  { min: 18500, max: 33200, rate: 0.77 },
  { min: 33200, max: 43500, rate: 0.88 },
  { min: 43500, max: 58100, rate: 2.64 },
  { min: 58100, max: 76200, rate: 2.97 },
  { min: 76200, max: 82100, rate: 5.94 },
  { min: 82100, max: 108900, rate: 6.6 },
  { min: 108900, max: 141600, rate: 8.8 },
  { min: 141600, max: 185000, rate: 11.0 },
  { min: 185000, max: 793400, rate: 13.2 },
  { min: 793400, max: Number.POSITIVE_INFINITY, rate: 11.5 },
];

export const federalTaxBracketsMarried = [
  { min: 0, max: 29700, rate: 0 },
  { min: 29700, max: 53400, rate: 1.0 },
  { min: 53400, max: 61300, rate: 2.0 },
  { min: 61300, max: 79100, rate: 3.0 },
  { min: 79100, max: 94900, rate: 4.0 },
  { min: 94900, max: 108600, rate: 5.0 },
  { min: 108600, max: 120500, rate: 6.0 },
  { min: 120500, max: 130500, rate: 7.0 },
  { min: 130500, max: 138300, rate: 8.0 },
  { min: 138300, max: 144200, rate: 9.0 },
  { min: 144200, max: 148200, rate: 10.0 },
  { min: 148200, max: 150300, rate: 11.0 },
  { min: 150300, max: 152300, rate: 12.0 },
  { min: 152300, max: 940900, rate: 13.0 },
  { min: 940900, max: Number.POSITIVE_INFINITY, rate: 11.5 },
];

export type MaritalStatus = "single" | "married";
export type AgeGroup = "25-34" | "35-44" | "45-54" | "55-65";

export interface SalaryCalculationInput {
  grossSalary: number;
  canton: string;
  maritalStatus: MaritalStatus;
  ageGroup: AgeGroup;
  children: number;
}

export interface SalaryCalculationResult {
  grossSalary: number;
  avsAiApg: number;
  ac: number;
  aanp: number;
  lpp: number;
  totalSocialContributions: number;
  federalTax: number;
  cantonalTax: number;
  totalTax: number;
  netSalary: number;
  netSalaryMonthly: number;
  effectiveTaxRate: number;
}

function getLppRate(ageGroup: AgeGroup): number {
  switch (ageGroup) {
    case "25-34": return socialContributions.lpp.rate25to34;
    case "35-44": return socialContributions.lpp.rate35to44;
    case "45-54": return socialContributions.lpp.rate45to54;
    case "55-65": return socialContributions.lpp.rate55to65;
    default: return socialContributions.lpp.rate35to44;
  }
}

function calculateFederalTax(taxableIncome: number, maritalStatus: MaritalStatus): number {
  const brackets = maritalStatus === "married" ? federalTaxBracketsMarried : federalTaxBrackets;
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    if (taxableInBracket > 0 && taxableIncome >= bracket.min) {
      tax += (taxableInBracket * bracket.rate) / 100;
      remainingIncome -= taxableInBracket;
    }
  }

  return Math.max(0, tax);
}

export function calculateNetSalary(input: SalaryCalculationInput): SalaryCalculationResult {
  const { grossSalary, canton: cantonCode, maritalStatus, ageGroup, children } = input;

  const canton = cantons.find(c => c.code === cantonCode);
  if (!canton) throw new Error(`Canton ${cantonCode} non trouve`);

  const avsAiApg = (grossSalary * socialContributions.avsAiApg) / 100;
  // AC: 1.1% up to threshold only (AC2 solidarity was abolished 01.01.2023)
  const acBase = Math.min(grossSalary, socialContributions.acThreshold);
  const ac = (acBase * socialContributions.ac) / 100;
  const aanp = (grossSalary * socialContributions.aanp) / 100;

  let lpp = 0;
  if (grossSalary > socialContributions.lppThreshold) {
    // LPP base = salary minus coordination deduction, capped at BVG maximum
    const lppBase = Math.min(
      grossSalary - socialContributions.lppCoordination,
      socialContributions.lppMaxInsuredSalary - socialContributions.lppCoordination
    );
    const lppRate = getLppRate(ageGroup);
    lpp = Math.max(0, (lppBase * lppRate) / 100);
  }

  const totalSocialContributions = avsAiApg + ac + aanp + lpp;

  let taxableIncome = grossSalary - totalSocialContributions;
  const professionalDeduction = Math.min(Math.max(grossSalary * 0.03, 2000), 4000);
  taxableIncome -= professionalDeduction;
  const childDeduction = children * 6600;
  taxableIncome -= childDeduction;
  taxableIncome = Math.max(0, taxableIncome);

  const federalTax = calculateFederalTax(taxableIncome, maritalStatus);

  const effectiveCantonalRate = canton.taxRate * canton.municipalMultiplier;
  let cantonalTax = (taxableIncome * effectiveCantonalRate) / 100;
  if (maritalStatus === "married") cantonalTax *= 0.85;
  cantonalTax -= children * 250;
  cantonalTax = Math.max(0, cantonalTax);

  const totalTax = federalTax + cantonalTax;
  const netSalary = grossSalary - totalSocialContributions - totalTax;
  const netSalaryMonthly = netSalary / 12;
  const effectiveTaxRate = ((totalSocialContributions + totalTax) / grossSalary) * 100;

  return {
    grossSalary,
    avsAiApg,
    ac,
    aanp,
    lpp,
    totalSocialContributions,
    federalTax,
    cantonalTax,
    totalTax,
    netSalary,
    netSalaryMonthly,
    effectiveTaxRate,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("fr-CH", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}
