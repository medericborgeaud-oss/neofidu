import type { GuideChapterContent } from "../types";

export const fritaxPillarEn: GuideChapterContent = {
  title: "How to fill in your Fribourg tax return with FriTax: the complete 2026 guide",
  navTitle: "FriTax guide",
  metaTitle: "FriTax guide 2026: Fribourg tax return step by step",
  metaDescription:
    "Free step-by-step guide in English to the Fribourg tax return in FriTax: the code for every section (1.110, 2.130, 4.110...), 2026 deductions, deadlines, the FriTax code, electronic filing and source tax.",
  keywords: [
    "fritax",
    "fritax english",
    "fribourg tax return",
    "how to fill in fritax",
    "fribourg tax return 2026",
    "fribourg tax deductions 2026",
    "fritax guide",
    "tax return fribourg expat",
  ],
  summary: [
    "**FriTax** is the free program of the Fribourg cantonal tax service (SCC, « Service cantonal des contributions »). It runs on Windows, macOS and Linux; it does not work on tablets or in a browser. More than 130,000 taxpayers use it.",
    "The **2026** return covers your income for 2026 and your wealth on 31 December 2026. It is due on the date printed on the return, normally **31 March 2027**. Each extension costs **CHF 20**, up to 15 December at the latest.",
    "To file electronically you need the 6-character **FriTax code** printed on the « Déclaration d'impôt » folder. The electronic receipt replaces your signature.",
    "This guide follows the Fribourg return in **11 chapters** and gives, for every amount, the code on the return (1.110, 2.130, 4.110, etc.) and the FriTax schedule concerned.",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "FriTax in 10 steps" },
    {
      type: "steps",
      items: [
        "Install FriTax, gather your documents and find your FriTax code. [Before you start](/guide/fritax/avant-de-commencer)",
        "Click « Importer données de l'année précédente » (import last year's data) to start from last year's return.",
        "Complete page 1: marital status, religion, children and dependants (boxes A, B or C). [Personal situation](/guide/fritax/situation-personnelle)",
        "Enter your net salaries (code 1.110), side income (1.120), benefits (1.510 to 1.530) and pensions (3.110 to 3.150). [Salary and income](/guide/fritax/salaire)",
        "Fill in schedule 03: commuting (2.110), meals (2.120), the 3% flat rate (2.130). [Work expenses](/guide/fritax/frais-professionnels)",
        "Enter pillar 3a (4.130), pension fund buy-ins (4.140) and, new for 2026, 3a catch-up payments. [Pension savings](/guide/fritax/prevoyance)",
        "Complete the securities list (schedule 01): accounts, securities, crypto, electronic bank statements. [Accounts and securities](/guide/fritax/comptes-titres)",
        "Add other assets, the debts list (schedule 02) and the property list (schedule 04). [Wealth and debts](/guide/fritax/fortune-dettes) · [Property](/guide/fritax/immeubles)",
        "Check insurance premiums, childcare, medical costs, donations and social deductions. [Deductions](/guide/fritax/deductions)",
        "Check the calculation, attach the documents requested, file with your FriTax code and check the receipt. [Check and file](/guide/fritax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-accueil.webp",
      alt: "FriTax 2025 start screen: new return, list of returns, open return, export and import tax return, import last year's data",
      caption: "The FriTax start screen: new return, list of returns saved on the computer, export, import and last year's data (FriTax 2025, fictitious data)",
    },

    { type: "h2", id: "rubriques", text: "Where to find what: pages, schedules and codes of the Fribourg return" },
    {
      type: "p",
      text: "The Fribourg return has **four pages** and **numbered schedules** from 01 to 06. Every amount has a four-digit **code**: the first digit gives the family (1 for employment income, 2 for expenses, 3 for other income and wealth, 4 to 7 for deductions). When the SCC writes to you about « code 2.130 », it means the flat rate for other work expenses. In FriTax, the **« Formulaires »** (forms) column on the left lists the return (pages 1 to 4) and every schedule; the small blue **« ... »** button next to a code also opens the schedule that calculates it (« Ouvrir l'annexe », open schedule). The total is carried over to the return automatically, and the **« Erreurs »** (errors) panel on the right shows what is still missing.",
    },
    {
      type: "table",
      head: ["Section", "Schedule", "Codes", "Chapter"],
      rows: [
        ["Personal, professional and family situation", "Page 1", "Boxes A*, B*, C*", "[Personal situation](/guide/fritax/situation-personnelle)"],
        ["Employment income and benefits", "Return and schedule 03", "1.110 to 1.530", "[Salary](/guide/fritax/salaire)"],
        ["Work expenses", "Schedule 03 « Revenu d'activité-Frais d'acquisition »", "2.110 to 2.510", "[Work expenses](/guide/fritax/frais-professionnels)"],
        ["Pensions and maintenance", "Return", "3.110 to 3.150", "[Salary](/guide/fritax/salaire)"],
        ["« Etat des titres » (securities list)", "Schedule 01, DA-1 and R-US", "3.210 to 3.250", "[Accounts and securities](/guide/fritax/comptes-titres)"],
        ["Property", "Schedule 04 « Etat des immeubles »", "3.310 to 3.350, 4.310 to 4.315", "[Property](/guide/fritax/immeubles)"],
        ["Other assets", "Return, letter A « Assurances »", "3.510 to 3.570", "[Wealth and debts](/guide/fritax/fortune-dettes)"],
        ["Interest and debts", "Schedule 02 « Etat des dettes »", "4.210, 4.220", "[Wealth and debts](/guide/fritax/fortune-dettes)"],
        ["Premiums, pension savings, other deductions", "Return", "4.110 to 4.420", "[Pension savings](/guide/fritax/prevoyance) · [Deductions](/guide/fritax/deductions)"],
        ["Medical costs, donations, social deductions", "Last page, letters B and C", "5.110 to 7.110", "[Deductions](/guide/fritax/deductions)"],
        ["Lump-sum pension benefits", "Last page, letter E", "Taxed separately", "[Pension savings](/guide/fritax/prevoyance)"],
      ],
      caption: "Codes and schedules: « Instructions générales concernant la déclaration des personnes physiques 2025 », SCC Fribourg (January 2026).",
    },

    { type: "h2", id: "chiffres-2026", text: "Key Fribourg amounts for 2026 (cantonal and municipal tax)" },
    {
      type: "table",
      head: ["Deduction", "Code", "2026 amount"],
      rows: [
        ["Commuting costs", "2.110", "max. CHF 12,000; car CHF 0.70 per km (if no public transport)"],
        ["Meals away from home", "2.120", "CHF 15 per meal, max. CHF 3,200"],
        ["Other work expenses (flat rate)", "2.130", "3% of net salary, min. CHF 2,000, max. CHF 4,000"],
        ["Employed side income", "2.140", "20%, min. CHF 800, max. CHF 2,400"],
        ["Both spouses working", "2.510", "CHF 500"],
        ["Health and accident insurance premiums (flat rate)", "4.110", "CHF 4,810 per adult, CHF 4,210 per young adult in education, CHF 1,140 per child"],
        ["Childcare costs", "4.380", "max. CHF 12,000 per child under 14"],
        ["Training and further education", "4.420", "max. CHF 12,000"],
        ["Medical costs", "5.110", "share above 5% of net income"],
        ["Donations", "5.120", "min. CHF 100, max. 20% of net income"],
        ["Social deduction per child", "6.110", "CHF 8,600 (CHF 9,600 from the 3rd), reduced with income, min. CHF 7,100"],
        ["Private property upkeep (flat rate)", "4.310", "10% (built after 2015) or 20% of gross rental income"],
        ["Social deduction on wealth", "7.110", "CHF 55,000 single, CHF 105,000 couple or family, tapering"],
      ],
      caption: "Source: Feuille cantonale Fribourg, Swiss Federal Tax Administration, February 2026; « Instructions générales 2025 », SCC Fribourg. The canton has not changed these amounts for the 2026 tax period.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples and single parents: full splitting",
      text: "Fribourg taxes the income of married couples and single-parent families at the **rate for 50%** of their taxable income (full splitting). A couple with CHF 80,000 taxable income pays at the rate of a single person on CHF 40,000. This is automatic: there is nothing to enter.",
    },

    { type: "h2", id: "nouveautes", text: "What changes (and what does not) for the 2026 return" },
    {
      type: "list",
      items: [
        "**Cantonal deductions and tax scales unchanged**: after voters rejected the public finance recovery law (LAFE) on 26 April 2026, the commuting cap stays at CHF 12,000 (the LAFE would have cut it to CHF 8,000).",
        "**Cantonal multiplier**: it stays at **96%** of the basic tax for 2026.",
        "**Pillar 3a catch-up payments**: 3a contributions missed in 2025 can be made up and deducted for the first time in the 2026 return.",
        "**Life annuities**: since 2025 they are no longer taxed at 40% but on their **income portion** as certified by the insurer.",
        "**For 2027**: on 7 October 2026 the cantonal parliament adopted the compensation for bracket creep. From the 2027 tax period, the child deduction will rise to CHF 9,100 for example, subject to a referendum.",
        "**Imputed rent**: its abolition at federal level takes effect on 1 January 2029. It therefore still appears in the 2026 return.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Do it yourself or get help?" },
    {
      type: "p",
      text: "An employee with one or two salary certificates, a pillar 3a and a few accounts can complete FriTax alone in one to two hours with this guide. Help is worth it if you are self-employed or a farmer, rent out property or did major works, own property in another canton or abroad, have a share in an undivided estate, moved in or out during the year, or are switching from source tax to a subsequent ordinary assessment (TOU).",
    },
  ],
  faq: [
    {
      q: "When is the 2026 Fribourg tax return due?",
      a: "On the date printed at the top right of page 1 of the return, normally 31 March 2027. Paying CHF 20 with the enclosed QR bill moves it to 30 June, then step by step to 31 August, 31 October and 15 December at the latest.",
    },
    {
      q: "Is FriTax free?",
      a: "Yes. FriTax is provided free of charge by the cantonal tax service. Download it only from fr.ch/fritax.",
    },
    {
      q: "Is there an online version of FriTax?",
      a: "No. FriTax is a program you install on a computer (64-bit Windows 10 or later, macOS 10.15 or later, Linux Ubuntu). It does not work on tablets. Filing itself is done over the internet from within the program.",
    },
    {
      q: "Do I need a separate return for federal tax?",
      a: "No. The Fribourg return is also used for direct federal tax (« impôt fédéral direct », IFD). The SCC applies the differences between cantonal and federal law itself (commuting cap, insurance premiums, childcare, etc.).",
    },
    {
      q: "Is FriTax available in English?",
      a: "No, FriTax exists in French and German only. This guide quotes the French labels with an English translation so you can find your way on screen.",
    },
  ],
};
