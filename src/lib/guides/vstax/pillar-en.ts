import type { GuideChapterContent } from "../types";

export const vstaxPillarEn: GuideChapterContent = {
  title: "How to fill in your Valais tax return with VSTax: the complete 2026 guide",
  navTitle: "VSTax guide",
  metaTitle: "Valais tax return with VSTax: step-by-step guide 2026 (English)",
  metaDescription:
    "Free step-by-step guide in English to the Valais tax return in VSTax: the code for every section, 2026 deductions, deadlines, paperless filing, holiday homes and source tax.",
  keywords: [
    "vstax",
    "vstax english",
    "valais tax return",
    "how to fill in vstax",
    "valais tax return 2026",
    "valais tax deductions 2026",
    "vstax guide",
    "tax return valais expat",
  ],
  summary: [
    "**VSTax** is the free program of the Valais cantonal tax service (SCC, « Service cantonal des contributions »). It runs on Windows, macOS and Linux; there is no online version. Nearly 90% of Valais taxpayers use it.",
    "The **2026** return covers your income for 2026 and your wealth on 31 December 2026. It is normally due by **31 March 2027**. An extension costs **CHF 20**, paid with the payment slip enclosed with the return.",
    "You need your **taxpayer number**, your **file number** and the 10-character **password** printed on the paper return, plus your salary certificates, bank statements and pillar 3a certificates.",
    "This guide follows the VSTax forms in **11 chapters** and gives, for every amount, the schedule and the code on the Valais return (310, 1910, 2560, etc.).",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "VSTax in 10 steps" },
    {
      type: "steps",
      items: [
        "Install VSTax, gather your documents and find your taxpayer number, file number and password. [Before you start](/guide/vstax/avant-de-commencer)",
        "Create the return « avec reprise des données de l'année précédente » (with last year's data) to start from last year's .vstax file.",
        "Complete your personal details, children and childcare costs. [Personal situation](/guide/vstax/situation-personnelle)",
        "Enter your net salaries in schedule 5 (code 310), your pensions in schedule 1 and any side income. [Salary and income](/guide/vstax/salaire)",
        "Fill in commuting, meals and the 3% flat rate in schedule 5 (code 1910). [Work expenses](/guide/vstax/frais-professionnels)",
        "Enter pillar 3a, pension fund buy-ins and, new for 2026, 3a catch-up payments. [Pension savings](/guide/vstax/prevoyance)",
        "Complete the securities list: accounts, securities, crypto, electronic bank tax statements. [Accounts and securities](/guide/vstax/comptes-titres)",
        "Add other assets, your debts and your property, including any holiday home. [Wealth and debts](/guide/vstax/fortune-dettes) · [Property](/guide/vstax/immeubles)",
        "Deduct insurance premiums, medical costs, donations and training. [Deductions](/guide/vstax/deductions)",
        "Validate, run the estimated tax calculation, attach your documents and file without a signature. [Check and file](/guide/vstax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-accueil.webp",
      alt: "VSTax 2025 start screen: create the return with last year's data, new return, find and open",
      caption: "The VSTax start menu: carry over last year, new return, or open an existing file (VSTax 2025)",
    },

    { type: "h2", id: "rubriques", text: "Where to find what: VSTax forms, schedules and codes" },
    {
      type: "p",
      text: "The Valais return has **four pages** and **numbered schedules** from 1 to 5. Every amount has a **code**: when the SCC writes to you about « code 1910 », it means taxpayer 1's work expenses. Codes ending in « a » (310a, 600a) are for taxpayer 2. In VSTax, each schedule is a form in the « Formulaires » (forms) list on the left of the screen; its totals are carried over to the return automatically.",
    },
    {
      type: "table",
      head: ["VSTax form", "Schedule", "Codes", "Chapter"],
      rows: [
        ["Personal data, « Déclaration d'impôts » page 1", "Page 1", "Marital status, children", "[Personal situation](/guide/vstax/situation-personnelle)"],
        ["« Salaires et frais professionnels » (salaries and work expenses)", "Schedule 5", "310, 320, 1910, 1920", "[Salary](/guide/vstax/salaire)"],
        ["« Rentes, pensions... » (pensions and annuities)", "Schedule 1", "600, 610, 720, 2530", "[Salary](/guide/vstax/salaire)"],
        ["« Détail gains accessoires » (side income)", "Page 2", "410, 420", "[Salary](/guide/vstax/salaire)"],
        ["« Déclaration d'impôts » page 3", "Page 3", "2100, 2210, 2220", "[Pension savings](/guide/vstax/prevoyance)"],
        ["« Etat des titres » (securities list)", "Schedule 3", "1210, 1800, 3200", "[Accounts and securities](/guide/vstax/comptes-titres)"],
        ["« Etat des dettes » (debts)", "Schedule 4", "1720, 3800", "[Wealth and debts](/guide/vstax/fortune-dettes)"],
        ["« Immeubles » (property)", "Schedule 2", "1110 to 1130, 2920 to 2923", "[Property](/guide/vstax/immeubles)"],
        ["« Autres déductions » (other deductions)", "Page 3", "2510 to 2581", "[Deductions](/guide/vstax/deductions)"],
        ["« Impôt fédéral direct » (federal tax)", "Federal sheet", "2710 to 2810", "[Deductions](/guide/vstax/deductions)"],
        ["« Prestations en capital touchées » (lump sums)", "Page 3", "1010, 1020", "[Pension savings](/guide/vstax/prevoyance)"],
      ],
      caption: "VSTax 2025 labels and codes from the 2025 individual tax return, SCC Valais.",
    },

    { type: "h2", id: "chiffres-2026", text: "Key Valais amounts for 2026 (cantonal and municipal tax)" },
    {
      type: "table",
      head: ["Deduction", "Code", "2026 amount"],
      rows: [
        ["Other work expenses (flat rate)", "1910", "3% of net salary, min. CHF 2,000, max. CHF 4,000"],
        ["Car to get to work", "1910", "CHF 0.75 per km up to 15,000 km, then decreasing"],
        ["Meals away from home", "1910", "CHF 15 per day, max. CHF 3,200"],
        ["Side income", "410, 420", "20%, min. CHF 800, max. CHF 2,400"],
        ["Deduction on the lower of two incomes (both spouses work)", "2520", "max. CHF 7,000 (CHF 6,290 in 2025)"],
        ["Insurance premiums and savings interest", "2560", "CHF 7,600 couple, CHF 3,800 single, + CHF 1,130 per child"],
        ["Dependent child", "2510", "CHF 7,860 (under 6), CHF 8,940 (6 to 16), CHF 11,930 (16 and over)"],
        ["Childcare by third parties", "2512", "max. CHF 10,000 per child under 14"],
        ["Looking after your own children", "2512a", "CHF 3,130 per child under 14"],
        ["Medical costs", "2565", "part above 2% of net income"],
        ["Professional training", "2581", "max. CHF 12,550"],
        ["Donations", "2570", "max. 20% of net income"],
        ["Property upkeep (flat rate)", "Schedule 2", "10% (building 10 years old or less) or 20%"],
        ["Wealth allowance", "3900", "CHF 90,000 couple or family, CHF 45,000 others"],
      ],
      caption: "Source: \"Adaptation des déductions forfaitaires pour l'imposition 2026\", SCC Valais, 7 November 2025, and the Valais cantonal sheet of the Swiss Federal Tax Administration, February 2026. Codes: 2025 return, SCC.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples and families: a 35% tax rebate",
      text: "Valais does not use income splitting. For married couples and parents living with their children, the **cantonal tax amount** itself is reduced by **35%**, at least CHF 680 and at most CHF 4,900, then by **CHF 300 per child**. This is automatic: there is nothing to enter.",
    },

    { type: "h2", id: "nouveautes", text: "What changes for the 2026 return" },
    {
      type: "list",
      items: [
        "**Insurance premiums**: the cap rises to CHF 7,600 for a couple and CHF 3,800 for a single person (CHF 7,240 and CHF 3,620 in 2025), following the tax law amendment of 1 January 2026.",
        "**Two-income couples**: the deduction on the lower income rises from CHF 6,290 to CHF 7,000.",
        "**New deductions**: CHF 7,000 for retirees who keep working, and CHF 1,000 to CHF 3,000 for AHV pensioners living alone with wealth under CHF 100,000. Housing for a child in tertiary education rises from CHF 5,220 to CHF 10,000.",
        "**Pillar 3a catch-up**: 3a contributions not paid in 2025 can be made up and deducted for the first time in the 2026 return.",
        "**Tell Tax**: from tax year 2026, the app no longer stores documents in the cloud. It can still scan them through the QR code shown in VSTax (VSTax-QR).",
        "**Imputed rental value**: its abolition takes effect on 1 January 2029 (Federal Council, 1 April 2026). It therefore still applies to the 2026 return.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Do it yourself or get help?" },
    {
      type: "p",
      text: "For an employee with one or two salary certificates, a pillar 3a and a few accounts, VSTax takes one to two hours with this guide. It is worth getting help if you are self-employed or farm, rent out a chalet or flat (furnished or not), own property in another canton or abroad, have a share in an undivided estate, arrived or left during the year, or move to an ordinary assessment (TOU) after source tax.",
    },
  ],
  faq: [
    {
      q: "When is the 2026 Valais tax return due?",
      a: "Normally by 31 March 2027. If you pay the CHF 20 fee with the payment slip enclosed with the return before that date, you get an extension with no further steps, normally to 31 July (31 October if your main activity is self-employed).",
    },
    {
      q: "Is VSTax free?",
      a: "Yes. VSTax is provided free of charge by the cantonal tax service. Only download it from vs.ch/vstax.",
    },
    {
      q: "Is there an English or online version of VSTax?",
      a: "No. VSTax is a program to install, for Windows 10 and 11, macOS 11 or later and Linux, and its interface is in French or German only. This guide gives every French label with a translation. Filing itself is done online from the program.",
    },
    {
      q: "Do I need a separate return for federal tax?",
      a: "No. The Valais return is also used for direct federal tax (« impôt fédéral direct », IFD). VSTax works out the differences between cantonal and federal law in the « Impôt fédéral direct » form.",
    },
  ],
};
