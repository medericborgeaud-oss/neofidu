import type { GuideChapterContent } from "../types";

export const vaudtaxPillarEn: GuideChapterContent = {
  title: "How to fill in your Vaud tax return with VaudTax: the complete 2026 guide in English",
  navTitle: "VaudTax guide",
  metaTitle: "How to fill in VaudTax: Vaud tax return guide in English (2026)",
  metaDescription:
    "Free step-by-step English guide to the Vaud tax return in VaudTax: where to enter each amount, 2026 deductions, deadlines and mistakes to avoid, with the French labels.",
  keywords: [
    "vaudtax english",
    "how to fill vaudtax",
    "vaud tax return guide",
    "vaud tax return english",
    "swiss tax return vaud expat",
    "vaud tax deductions 2026",
    "lausanne tax return",
  ],
  summary: [
    "**VaudTax** is the Canton of Vaud's free online service to complete and file your tax return. Since 2025 it exists online only, and **only in French**.",
    "The **2026** return covers your income for 2026 and your wealth on 31 December 2026. It is normally due by **15 March 2027** (residents have a tolerance until 30 June).",
    "You need your **taxpayer number** and **control code**, plus salary certificates, bank statements and pillar 3a certificates.",
    "This guide follows VaudTax in **11 chapters** and, for each amount, gives the exact French section name and the return code.",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Filling in VaudTax in 10 steps" },
    {
      type: "steps",
      items: [
        "Gather your documents and open VaudTax online with your taxpayer number and control code. [Before you start](/guide/vaudtax/avant-de-commencer)",
        "Import last year's return (.vaudtax file) and your banks' eRelevé fiscal statements if available.",
        "Check your personal details and declare your children. [Personal situation](/guide/vaudtax/situation-personnelle)",
        "Enter each salary certificate (net salary from box 11) and other income. [Salary and income](/guide/vaudtax/salaire)",
        "Deduct commuting, meals and the 3% flat rate. [Work expenses](/guide/vaudtax/frais-professionnels)",
        "Enter health insurance premiums, subsidies, pillar 3a and pension buy-ins. [Insurance and pillar 3a](/guide/vaudtax/assurances-prevoyance)",
        "Fill in the securities list: accounts, securities and crypto, in Switzerland and abroad. [Accounts and securities](/guide/vaudtax/comptes-titres)",
        "Add other assets, debts and your housing. [Wealth and debts](/guide/vaudtax/fortune-dettes) · [Housing](/guide/vaudtax/logement)",
        "Do not miss family and special deductions: childcare, training, medical costs, donations. [Family](/guide/vaudtax/deductions-famille) · [Other deductions](/guide/vaudtax/autres-deductions)",
        "Check, attach documents, submit and keep the PDF receipt. [Check and file](/guide/vaudtax/verifier-envoyer)",
      ],
    },
    { type: "screenshot", file: "00-vue-ensemble.webp", alt: "VaudTax main menu: list of forms and tools", caption: "The main menu: forms on the left, tools (save, import, check, submit) on the right (VaudTax 2025, simulation mode, fictitious data)" },

    { type: "h2", id: "rubriques", text: "Where to find what: VaudTax sections and return codes" },
    {
      type: "p",
      text: "VaudTax is organised in sections matching the **codes** of the Vaud tax return. When the tax office writes about « code 140 », it means your commuting costs. This table links the French section names, codes and chapters.",
    },
    {
      type: "table",
      head: ["VaudTax section (French)", "Codes", "What it covers", "Chapter"],
      rows: [
        ["Enfants et personnes à charge", "670, 680, 810", "Children, childcare, dependants", "[Personal situation](/guide/vaudtax/situation-personnelle)"],
        ["Activités salariées", "100 to 120", "Salary certificates, side jobs, allowances", "[Salary](/guide/vaudtax/salaire)"],
        ["Frais professionnels et interruption de travail", "140 to 165", "Commuting, meals, other expenses, periods not worked", "[Work expenses](/guide/vaudtax/frais-professionnels)"],
        ["Indemnités perte de gain", "200 to 220", "Unemployment, military pay, sickness and accident allowances", "[Salary](/guide/vaudtax/salaire)"],
        ["Rentes et pensions", "240 to 280", "AVS/AHV, disability, pension fund, 3a, maintenance received", "[Salary](/guide/vaudtax/salaire)"],
        ["Primes et cotisations d'assurances", "300 to 340, 640", "Health insurance, subsidies, pillar 3a, pension buy-ins", "[Insurance and pillar 3a](/guide/vaudtax/assurances-prevoyance)"],
        ["Etat des titres", "410, 480, 490", "Accounts, securities, crypto, withholding tax", "[Accounts and securities](/guide/vaudtax/comptes-titres)"],
        ["Autres éléments de fortune", "420 to 445", "Vehicles, life insurance, cash, furniture", "[Wealth and debts](/guide/vaudtax/fortune-dettes)"],
        ["Immeubles, terrains et forêts", "500 to 540", "Rental value, rents, maintenance", "[Housing](/guide/vaudtax/logement)"],
        ["Intérêts et dettes", "610, 615", "Mortgages, loans, interest", "[Wealth and debts](/guide/vaudtax/fortune-dettes)"],
        ["Déductions spéciales sur le revenu", "618 to 720", "Training, maintenance paid, medical costs, donations", "[Other deductions](/guide/vaudtax/autres-deductions)"],
        ["Prestation en capital", "page 4", "2nd and 3rd pillar lump sums, taxed separately", "[Salary](/guide/vaudtax/salaire)"],
      ],
      caption: "Section names from the VaudTax online service for the 2025 return, taken from the ACI general instructions.",
    },

    { type: "h2", id: "chiffres-2026", text: "Key Vaud amounts for 2026" },
    {
      type: "table",
      head: ["Deduction", "Code", "2026 amount"],
      rows: [
        ["Car (if public transport not usable)", "140", "CHF 0.75/km up to 15,000 km, then CHF 0.35"],
        ["Meals away from home", "150", "CHF 3,200 (CHF 1,600 with canteen)"],
        ["Other work expenses", "160", "3% of net salary, min CHF 2,000, max CHF 4,000"],
        ["Married couple, both working", "235", "CHF 1,700"],
        ["Health insurance premiums", "300", "CHF 5,000 single, CHF 9,900 couple, + CHF 1,300 per child"],
        ["Pillar 3a", "310", "CHF 7,258 (with pension fund) or 20%, max CHF 36,288"],
        ["Savings interest", "480", "CHF 1,600 single, CHF 3,300 couple, + CHF 300 per child"],
        ["Property maintenance (owner-occupied)", "540", "Flat 20% (20 years or less) or 30% of rental value"],
        ["Further training", "618", "CHF 12,000 per person"],
        ["Housing deduction", "660", "max CHF 6,800"],
        ["Childcare", "670", "CHF 15,200 per child under 14"],
        ["Dependant", "680", "CHF 3,400"],
        ["Medical costs", "710", "Part above 5% of income"],
        ["Donations", "720", "Max 20% of income"],
        ["Family deduction", "725", "CHF 1,300 couple, CHF 2,800 single parent, + CHF 1,000 per child"],
      ],
      caption: "Source: table of main Vaud deductions 2026, cantonal tax administration (ACI).",
    },

    { type: "h2", id: "expats", text: "For expats: do you need to file at all?" },
    {
      type: "list",
      items: [
        "**C permit or Swiss spouse**: you file an ordinary VaudTax return every year.",
        "**B or L permit, salary taxed at source**: you only file if your gross salary exceeds CHF 120,000, you have other income or taxable wealth, or you requested an ordinary assessment by 31 March of the following year. The tax withheld is then credited.",
        "**Arrived from abroad during 2026**: you declare income from your arrival date and wealth at 31 December; the rate is calculated on an annualised basis and wealth tax is pro rata.",
        "More in our guides on [withholding tax](/blog/impot-source-suisse-guide-complet-2026) and your [first Swiss tax return](/blog/first-tax-return-switzerland-expat-guide).",
      ],
    },

    { type: "h2", id: "nouveautes", text: "What changes for the 2026 return" },
    {
      type: "list",
      items: [
        "**VaudTax online only**: the installable software no longer exists since the 2025 return.",
        "**Car**: the deduction rises to CHF 0.75 per km (CHF 0.70 in 2025), for those entitled to it.",
        "**Pillar 3a catch-up**: first year you can fill a 3a gap (for 2025) and deduct it.",
        "**« Baisse d'impôts pour tous » initiative** accepted on 27 September 2026: it affects the calculation of cantonal tax (the government announced it would apply from next year) and does not change how you fill in VaudTax.",
        "**Imputed rental value**: abolished only from 1 January 2029. It stays in the 2026 return.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Do it yourself or get help?" },
    {
      type: "p",
      text: "An employee with one or two salary certificates, a pillar 3a and a few accounts can complete VaudTax alone in one to two hours with this guide, even with limited French. Help is worthwhile for self-employment, rental property, arriving in or leaving Switzerland during the year, moving from source taxation to ordinary assessment, or property in another canton.",
    },
  ],
  faq: [
    {
      q: "When is the 2026 Vaud tax return due?",
      a: "Normally on 15 March 2027, or the date printed on your form. Swiss residents have a tolerance until 30 June, and a free extension can be requested online (e-Délai) until that date.",
    },
    {
      q: "Is VaudTax available in English?",
      a: "No, VaudTax is only available in French. This guide gives the French name of each section with an English explanation so you can follow along on screen.",
    },
    {
      q: "Is VaudTax free?",
      a: "Yes. The VaudTax online service of the Canton of Vaud is free and available 24/7 at vd.ch/vaudtax.",
    },
    {
      q: "Do I need a separate return for federal tax?",
      a: "No. The Vaud return also covers federal direct tax: VaudTax automatically calculates federal amounts where the rules differ (commuting, insurance, dual income).",
    },
  ],
};
