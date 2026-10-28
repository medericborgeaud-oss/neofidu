import type { GuideChapterContent } from "../types";

export const getaxPillarEn: GuideChapterContent = {
  title: "How to fill in your Geneva tax return with GeTax: the complete 2026 guide",
  navTitle: "GeTax guide",
  metaTitle: "Geneva tax return with GeTax: step-by-step guide 2026 (English)",
  metaDescription:
    "Free step-by-step guide in English to filling in your Geneva tax return in GeTax: codes for every section, 2026 deductions, deadlines, paperless filing, TOU and cross-border workers.",
  keywords: [
    "getax english",
    "geneva tax return guide",
    "how to fill in getax",
    "geneva tax return 2026",
    "geneva tax deductions 2026",
    "getax tutorial",
    "tax return geneva expat",
  ],
  summary: [
    "**GeTax** is the free software of the Geneva cantonal tax administration (AFC). It comes as a desktop program (Windows, macOS, Linux) and as an **online return** in your e-démarches account, with the same checks.",
    "The **2026** return covers your 2026 income and your wealth on 31 December 2026. It is normally due by **31 March 2027**. An extension costs CHF 20 to 60 depending on its length.",
    "You need your **taxpayer number** (« Numéro de contribuable ») and your **return code** (« Code déclaration »), printed on the letter « Vos identifiants pour la déclaration », plus your salary certificates, bank statements and pillar 3a certificates.",
    "This guide follows GeTax in **11 chapters** and gives, for each amount, the exact screen and the Geneva return code (11.10, 31.50, 52.21, etc.).",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Filling in GeTax in 10 steps" },
    {
      type: "steps",
      items: [
        "Gather your documents, choose between the desktop program and the online return, and enter your taxpayer number and return code. [Before you start](/guide/getax/avant-de-commencer)",
        "Import last year's .tax file (menu « Fichier », « Importer... ») to carry over your data.",
        "Fill in marital status, the voluntary church contribution and your children, with their childcare costs and premiums. [Personal situation](/guide/getax/situation-personnelle)",
        "Enter each salary certificate starting from the **gross salary** (box 1) and your other income. [Salary and income](/guide/getax/salaire)",
        "Choose flat rate or actual costs, separately for cantonal and federal tax. [Work expenses](/guide/getax/frais-professionnels)",
        "Enter pillar 3a, pension fund buy-ins and, new in 2026, pillar 3a catch-up payments. [Pension savings](/guide/getax/prevoyance)",
        "Complete the list of securities: accounts, shares, crypto, bank tax statements. [Accounts and securities](/guide/getax/comptes-titres)",
        "Add other assets, your debts and your property. [Wealth and debts](/guide/getax/fortune-dettes) · [Property](/guide/getax/immeubles)",
        "Deduct health insurance, medical costs, childcare, training and donations. [Deductions](/guide/getax/deductions)",
        "Check the tax calculation, attach your PDF documents and file paperless to receive the filing receipt. [Check and file](/guide/getax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-mode-formulaire.webp",
      alt: "GeTax in form mode: list of pages PG1 to PG4 and schedules A to G on the left, cover page in the centre",
      caption: "Form mode (« Saisie formulaire ») mirrors the paper return: cover pages PG1 to PG4 and schedules A to G (GeTax 2025, fictitious data)",
    },

    { type: "h2", id: "rubriques", text: "Where to find what: GeTax screens, schedules and codes" },
    {
      type: "p",
      text: "The Geneva return is made of **cover pages** (PG1 to PG4) and **schedules** named by a letter. Every amount has a **four-digit code**: when the AFC writes to you about « code 31.50 », it means your flat-rate work expenses. Codes starting with 1 or 3 concern taxpayer A, those starting with 2 or 4 taxpayer B.",
    },
    {
      type: "table",
      head: ["GeTax screen (guided mode)", "Schedule", "Codes", "Chapter"],
      rows: [
        ["« Données personnelles » (personal data)", "PG1, G1, G2", "61.20, 59.10", "[Personal situation](/guide/getax/situation-personnelle)"],
        ["« Revenu », « Activité dépendante » (employment)", "A", "11.10 to 11.70, 31.10 to 31.30", "[Salary](/guide/getax/salaire)"],
        ["« Déductions pour frais professionnels » (work expenses)", "A", "31.50 to 31.95", "[Work expenses](/guide/getax/frais-professionnels)"],
        ["« Déductions sociales » (pillar 3a)", "A", "31.40", "[Pension savings](/guide/getax/prevoyance)"],
        ["« Rentes, pensions et autres prestations » (pensions)", "C1", "13.10 to 13.50, 17.10", "[Salary](/guide/getax/salaire)"],
        ["« Etat des titres » (securities)", "F", "Accounts, securities, withholding tax", "[Accounts and securities](/guide/getax/comptes-titres)"],
        ["« Autres revenus et fortune » (other income and assets)", "C2", "16.20 to 16.80", "[Wealth and debts](/guide/getax/fortune-dettes)"],
        ["« Intérêts et dettes » (debts)", "E", "Debts and interest paid", "[Wealth and debts](/guide/getax/fortune-dettes)"],
        ["« Immeubles » (property)", "D", "15.10 to 15.50, 58.10", "[Property](/guide/getax/immeubles)"],
        ["« Déductions »", "C3, C4", "52.21, 53.10, 59.50, 71.00, 73.10", "[Deductions](/guide/getax/deductions)"],
        ["« Récapitulation », « Finalisation », « Envoi / Impression »", "PG2 to PG4", "92.20 (net income)", "[Check and file](/guide/getax/verifier-envoyer)"],
      ],
      caption: "GeTax 2025 labels and codes from the 2025 Guide to the individual tax return, AFC Geneva.",
    },

    { type: "h2", id: "chiffres-2026", text: "Key Geneva amounts for 2026 (cantonal and communal tax)" },
    {
      type: "table",
      head: ["Deduction", "Code", "2026 amount"],
      rows: [
        ["Flat-rate work expenses (covers commuting, meals, other costs)", "31.50", "3% of income, min. CHF 641, max. CHF 1,817"],
        ["Actual commuting costs", "31.70", "max. CHF 536"],
        ["Occasional side income", "16.20, 59.70", "20%, min. CHF 810, max. CHF 2,429"],
        ["Married couple, both working", "31.95", "CHF 1,054"],
        ["Health insurance premiums", "52.21", "up to twice the cantonal average premium"],
        ["Life insurance and savings interest", "52.15", "CHF 3,528 couple, CHF 2,352 single, + CHF 962 per dependant"],
        ["Childcare", "59.10", "CHF 26,392 per child under 14"],
        ["Training", "59.50", "CHF 12,791"],
        ["Medical costs", "71.00", "share above 0.5% of income"],
        ["Donations (church contribution included)", "73.10", "max. 20% of income"],
        ["Dependant deduction", "computed by GeTax", "CHF 13,698 per child (CHF 10,536 if childcare is deducted)"],
        ["Property upkeep, owner-occupier", "58.10", "flat 15% (building 10 years old or less) or 25%"],
        ["Wealth allowance", "51.50", "CHF 87,872 single, CHF 175,743 couple, + CHF 43,936 per dependant"],
      ],
      caption: "Source: Geneva cantonal sheet of the Swiss Federal Tax Administration, February 2026, \"amounts applicable for tax year 2026\". Codes: 2025 return guide, AFC Geneva.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Married couples: 50% splitting",
      text: "In the canton of Geneva, a married couple's income is taxed at the rate that applies to **50%** of that income (full splitting). The same rule applies to a single parent living with dependent children. GeTax applies it automatically: the children screen shows « Barème ICC : Avec splitting » (cantonal rate: with splitting).",
    },

    { type: "h2", id: "nouveautes", text: "What changes for the 2026 return" },
    {
      type: "list",
      items: [
        "**Pillar 3a catch-up payments**: 3a contributions you did not make in 2025 can be paid in 2026 and are deductible for the first time in the 2026 return (source: AFC Geneva, AFC Infos October 2026).",
        "**Indexed amounts**: flat-rate work expenses CHF 641 to 1,817 (CHF 640 to 1,812 in 2025), commuting CHF 536 (CHF 534), dependant deduction CHF 13,698 (CHF 13,660).",
        "**Houses and condominiums**: after the 12% increase of 2025 (LEFI law), the tax value is indexed every year from 2026. The figure is on the letter sent before 31 March.",
        "**Imputed rental value**: its abolition takes effect on 1 January 2029 (Federal Council, 1 April 2026). It therefore remains in the 2026 return.",
        "**GeTax 2026**: the software comes out every January (GeTax 2025 was released on 13 January 2026). Screenshots in this guide show GeTax 2025; the screens change little from year to year.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Do it yourself or get help?" },
    {
      type: "p",
      text: "An employee with one or two salary certificates, a pillar 3a and a few bank accounts can complete GeTax alone in one to two hours with this guide. Help is worth it for self-employment, rented or foreign property, arriving in or leaving Switzerland during the year, a subsequent ordinary assessment (TOU) after source tax, or quasi-resident status.",
    },
  ],
  faq: [
    {
      q: "When is the 2026 Geneva tax return due?",
      a: "Normally by 31 March 2027, on the date shown on the page « Vos identifiants pour la déclaration ». You can request an extension online until 31 October; it costs CHF 20 for up to 3 months, CHF 40 for up to 5 months and CHF 60 beyond.",
    },
    {
      q: "Is GeTax free?",
      a: "Yes. Both the GeTax software and the online return in e-démarches are free. Only download GeTax from ge.ch or getax.ch: the AFC warns about phishing campaigns imitating its messages.",
    },
    {
      q: "Is GeTax available in English?",
      a: "Yes, the program has an English interface. The return, the help texts on official documents and AFC letters remain in French, which is why this guide quotes the French labels with a translation.",
    },
    {
      q: "Do I need a separate return for federal tax?",
      a: "No. The Geneva return also covers federal direct tax (IFD). GeTax shows an ICC column (cantonal) and an IFD column (federal) and computes the federal figures itself where the rules differ.",
    },
    {
      q: "Desktop program or online return?",
      a: "Both have the same checks and printouts. The online return needs no installation and carries over last year's data if it was filed online. The desktop program suits people who prefer working offline or manage several returns.",
    },
  ],
};
