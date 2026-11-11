import type { GuideChapterContent } from "../types";

export const jurataxPillarEn: GuideChapterContent = {
  title: "How to fill in your Jura tax return with JuraTax: the complete 2026 guide",
  navTitle: "JuraTax guide",
  metaTitle: "JuraTax guide 2026: filing your Jura tax return in English",
  metaDescription:
    "Free step-by-step tutorial in English to fill in your Jura tax return with JuraTax Online or the JuraTax desktop program: codes for each section (100, 500, 525, 620...), 2026 deductions, end-of-February deadline, Code-DI, SwissID and upload.",
  keywords: [
    "juratax",
    "juratax english",
    "juratax online",
    "jura tax return",
    "how to fill in juratax",
    "jura tax return 2026",
    "jura tax deductions 2026",
    "code-di jura",
    "moutier tax return",
  ],
  summary: [
    "**JuraTax** is the free tool of the Jura cantonal tax service (Service des contributions). It comes in two versions: **JuraTax Online**, in your browser (computer, tablet or smartphone), and the **JuraTax desktop program** (« JuraTax Logiciel »), installed on Windows, macOS or Linux.",
    "The **2026** return covers your income for 2026 and your wealth on 31 December 2026. It is due **at the end of February 2027**. An extension to **31 October** is requested on the virtual counter (« guichet virtuel ») and costs **CHF 31**.",
    "To upload the return you need the **Code-DI** printed on your return or a verified **SwissID**. With SwissID in JuraTax Online, the return is signed electronically: no handwritten signature at all.",
    "This guide follows the Jura return in **11 chapters** and gives, for each amount, the return **code** (100, 500, 525, 620, etc.) and the relevant **form** (« formule » 4, 5A, 7, 8, 9, 11).",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "JuraTax in 10 steps" },
    {
      type: "steps",
      items: [
        "Choose JuraTax Online or the desktop program, gather your documents and find your Code-DI. [Before you start](/guide/juratax/avant-de-commencer)",
        "Under « Commencer ici » (start here), import last year's return (a .tax file or the data from last year's upload).",
        "Complete your personal situation on 31 December 2026: marital status, religion, status, dependent children. [Personal situation](/guide/juratax/situation-personnelle)",
        "Enter your net salaries (code 100), secondary earnings (110), daily allowances (120), pensions (200 to 260) and other income (400). [Salary and income](/guide/juratax/salaire)",
        "Fill in form 7: general expenses, commuting, meals, or the 20% flat rate (code 500). [Work expenses](/guide/juratax/frais-professionnels)",
        "Enter pillar 3a (520), pension fund buy-ins (515) and, new for 2026, 3a catch-up contributions. [Retirement savings](/guide/juratax/prevoyance)",
        "Fill in the securities list (form 5A): accounts, securities, crypto, electronic tax statements (« eRelevés fiscaux »). [Accounts and securities](/guide/juratax/comptes-titres)",
        "Add vehicles, life insurance, debts (form 8) and property (form 4). [Wealth and debts](/guide/juratax/fortune-dettes) · [Property](/guide/juratax/immeubles)",
        "Check insurance premiums (525), childcare (555), medical costs (570 to 580), donations (585) and personal deductions (600 to 680). [Deductions](/guide/juratax/deductions)",
        "Under « Validation », upload the return, send your supporting documents and, with the Code-DI, sign and post the summary page. [Check and file](/guide/juratax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-accueil.webp",
      alt: "JuraTax 2025 start screen with the Fichier menu open: Nouveau, Ouvrir, Importer, and instructions for first-time users or carrying over 2024 data",
      caption: "The JuraTax start screen: « Fichier », « Nouveau » (file, new) for a first return, « Fichier », « Importer » (file, import) to carry over last year's data (JuraTax 2025)",
    },

    { type: "h2", id: "rubriques", text: "Where to find what: codes and forms of the Jura return" },
    {
      type: "p",
      text: "The Jura return numbers each amount with a **three-digit code**: the hundreds digit shows the family (1 for employment income, 2 for pensions, 3 for investment and property income, 5 and 6 for deductions, 7 and 8 for wealth). The suffix **C** stands for the spouse: 100 for the taxpayer's salary, 100C for the spouse's. Details are entered on numbered **forms** (« formules » 4, 5A, 7, 8, 9, 11), whose totals are carried over automatically. When the tax service writes to you about « code 525 », it means the insurance premium deduction.",
    },
    {
      type: "table",
      head: ["Section", "Form", "Codes", "Chapter"],
      rows: [
        ["Personal, professional and family situation", "Page 1", "Marital status, status, children", "[Personal situation](/guide/juratax/situation-personnelle)"],
        ["Employment income", "Return", "100 to 130", "[Salary](/guide/juratax/salaire)"],
        ["Pensions, annuities and other benefits", "Return", "200 to 260", "[Salary](/guide/juratax/salaire)"],
        ["Employee work expenses", "Form 7", "7000 to 7850, carried to 500", "[Work expenses](/guide/juratax/frais-professionnels)"],
        ["Pension fund buy-ins and pillar 3a", "Return", "515, 520", "[Retirement savings](/guide/juratax/prevoyance)"],
        ["Securities and other investments", "Form 5A, DA-1/R-US", "340, 740", "[Accounts and securities](/guide/juratax/comptes-titres)"],
        ["Property", "Form 4", "300, 310, 700, 702, 892, 894", "[Property](/guide/juratax/immeubles)"],
        ["Vehicles, life insurance, other assets", "Return", "760, 770, 780", "[Wealth and debts](/guide/juratax/fortune-dettes)"],
        ["Interest paid and debts", "Form 8", "530, 535, 800, 810", "[Wealth and debts](/guide/juratax/fortune-dettes)"],
        ["Insurance premiums, childcare, training, donations", "Return, forms 9 and 11", "525 to 585", "[Deductions](/guide/juratax/deductions)"],
        ["Personal deductions (children, couple, student)", "Return", "600 to 680", "[Deductions](/guide/juratax/deductions)"],
        ["Lump-sum pension payouts", "Return", "905, 905C", "[Retirement savings](/guide/juratax/prevoyance)"],
      ],
      caption: "Codes and forms: 2025 individual tax return and 2025 general guide, Service des contributions, Republic and Canton of Jura.",
    },

    { type: "h2", id: "chiffres-2026", text: "Key Jura amounts for 2026 (cantonal and municipal tax)" },
    {
      type: "table",
      head: ["Deduction", "Code", "2026 amount"],
      rows: [
        ["General work expenses", "500 (form 7)", "CHF 2,000 for a full-time job all year"],
        ["Commuting by car (if no public transport)", "500 (form 7)", "CHF 0.70 per km up to 7,999 km, 0.65 up to 14,999 km, 0.60 beyond"],
        ["Meals away from home", "500 (form 7)", "CHF 15 per day, max. CHF 3,200 (canteen: CHF 7.50, max. CHF 1,600)"],
        ["Flat rate instead of actual costs", "500 (form 7)", "20% of income, max. CHF 4,100"],
        ["Both spouses working", "505", "max. CHF 2,700"],
        ["Pillar 3a (with a pension fund)", "520", "max. CHF 7,258"],
        ["Insurance premiums and savings interest", "525", "CHF 6,800 married, CHF 3,400 others; + CHF 1,020 per child; + CHF 790 without pillar 2 or 3a"],
        ["Childcare costs", "555", "max. CHF 10,600 per child under 14"],
        ["Training and further education", "549", "max. CHF 12,000"],
        ["Medical costs", "570 to 580", "portion above 5% of net income I"],
        ["Donations", "585", "max. 10% of net income I"],
        ["Child deduction", "620", "CHF 5,700; CHF 6,400 per child from 3 children"],
        ["Married couple living together", "680", "CHF 3,700"],
        ["Private property upkeep (flat rate)", "Form 4", "10% (building 10 years old or less) or 20% of gross rental income"],
        ["Wealth tax allowance", "860, 870", "CHF 57,000 couple, CHF 28,500 others, + CHF 28,500 per child; tax due from CHF 58,000"],
      ],
      caption: "Source: 2025 general guide and 2025 form 7, Jura Service des contributions; Federal Tax Administration Jura cantonal sheet, February 2026, which states that indexed amounts remain unchanged for the 2026 tax period.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples and single parents: a separate tax scale",
      text: "The canton of Jura does not use splitting. It applies a **reserved scale**, gentler than the one for single people, to **married couples** and **single parents with dependent children**. Unmarried couples with children are normally not entitled to it, as they do not run a household alone. JuraTax applies it automatically: there is nothing to enter.",
    },

    { type: "h2", id: "nouveautes", text: "What changes (and what does not) for the 2026 return" },
    {
      type: "list",
      items: [
        "**Unchanged amounts**: Jura indexes its deductions and tax scales automatically, but the indexed amounts stay the same as in 2025 for the 2026 tax period.",
        "**Cantonal multiplier**: it remains at **2.85** for 2026, as in 2025 (2026 tax scales of the Service des contributions).",
        "**Pillar 3a catch-up contributions**: 3a contributions missed in 2025 can be made up and deducted for the first time in the 2026 return. Gaps from before 2025 cannot be bought back.",
        "**Moutier**: residents of Moutier have been part of the canton of Jura since 1 January 2026. Living in Jura on 31 December 2026, they file a Jura return for 2026, with JuraTax.",
        "**Life annuities**: since 2025 their taxable portion is based on the rate published each year by the Federal Tax Administration, or shown on the insurer's statement.",
        "**Imputed rent**: its federal abolition takes effect on 1 January 2029. It therefore stays in the 2026 return.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Do it yourself or get help?" },
    {
      type: "p",
      text: "For an employee with one or two salary certificates, a pillar 3a and a few accounts, JuraTax can be completed alone in one to two hours with this guide. It is worth getting help if you are self-employed or a farmer, rent out property or carried out major works, own property in another canton or abroad, hold a share in an undivided estate (form 6), moved in or out during the year, or have a subsequent ordinary assessment (TOU) after tax at source.",
    },
  ],
  faq: [
    {
      q: "When is the 2026 Jura tax return due?",
      a: "At the end of February 2027. For the 2025 return, the deadline was 28 February 2026. An extension to 31 October can be requested on the virtual counter with a SwissID, or with a form, and costs CHF 31.",
    },
    {
      q: "Is JuraTax free?",
      a: "Yes. JuraTax Online and the JuraTax desktop program are provided free of charge by the tax service on the virtual counter, jura.ch/guichet. They go online each year around 27 or 28 January.",
    },
    {
      q: "What is the difference between JuraTax Online and the desktop program?",
      a: "JuraTax Online runs in your browser, on a computer, tablet or smartphone, saves your data on the canton's servers and lets you send supporting documents as PDFs or photos. The desktop program is installed on Windows, macOS or Linux; with it, supporting documents are sent by post.",
    },
    {
      q: "Do I need a separate return for federal tax?",
      a: "No. The Jura return also covers direct federal tax (IFD). The tax service itself applies the differences between cantonal and federal law (commuting costs, insurance premiums, childcare, etc.).",
    },
    {
      q: "Is JuraTax available in English?",
      a: "No, JuraTax has no English version. This guide quotes the French labels of JuraTax with a translation, so you can find them on screen.",
    },
  ],
};
