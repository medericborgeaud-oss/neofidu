import type { GuideChapter } from "../../types";

export const comptesTitres: GuideChapter = {
  slug: "comptes-titres",
  readTime: 8,
  fr: {
    title: "Comptes bancaires, titres et crypto dans VaudTax : état des titres et impôt anticipé",
    navTitle: "Comptes, titres et crypto",
    metaTitle: "VaudTax : état des titres, eRelevé fiscal et impôt anticipé | NeoFidu",
    metaDescription:
      "Comment remplir l'état des titres dans VaudTax (code 410) : comptes bancaires, actions, ETF, comptes étrangers, crypto-monnaies, eRelevé fiscal et remboursement de l'impôt anticipé de 35 %.",
    keywords: [
      "état des titres vaudtax",
      "erelevé fiscal vaudtax",
      "impôt anticipé remboursement vaud",
      "déclarer compte bancaire étranger vaud",
      "déclarer crypto vaud",
      "code 410 déclaration vaud",
    ],
    summary: [
      "Tous vos comptes et titres, en Suisse **et à l'étranger**, se déclarent dans l'**état des titres (code 410)** : valeur au 31 décembre et rendements bruts de l'année.",
      "Le plus simple : importer l'**eRelevé fiscal** PDF de votre banque, qui remplit tout automatiquement.",
      "Déclarer correctement vos rendements suisses permet de **récupérer l'impôt anticipé de 35 %** retenu sur les intérêts et dividendes.",
      "Les **gains en capital** sur titres privés ne sont pas imposables, mais la fortune et les dividendes le sont.",
    ],
    blocks: [
      { type: "h2", id: "deux-rubriques", text: "Deux rubriques dans VaudTax" },
      {
        type: "p",
        text: "VaudTax sépare l'état des titres en deux rubriques. Les deux alimentent le même code 410 de la déclaration.",
      },
      { type: "path", items: ["Etat des titres - Comptes et livrets, comptes-métal, crypto-monnaies (code 410)", "Afficher"] },
      {
        type: "p",
        text: "Comptes courants, épargne, compte postal, **garantie de loyer**, compte de leasing, part au fonds de rénovation PPE, comptes-métal et crypto-monnaies.",
      },
      { type: "path", items: ["Etat des titres - Actions, obligations, fonds de placement, relevé fiscal, créances, etc. (code 410)", "Afficher"] },
      {
        type: "p",
        text: "Actions, obligations, fonds et ETF, totaux d'un relevé fiscal bancaire, prêts accordés à des particuliers et gains de loterie.",
      },
      { type: "screenshot", file: "06-etat-des-titres.webp", alt: "Saisie d'un compte bancaire dans l'état des titres de VaudTax", caption: "Ajout d'un compte : établissement, pays, IBAN... (VaudTax 2025, mode simulation, données fictives)" },
      { type: "screenshot", file: "06b-compte-solde.webp", alt: "Solde au 31 décembre et question sur les intérêts soumis ou non à l'impôt anticipé", caption: "... puis le solde au 31.12 et le type d'intérêts : c'est ce choix qui permet de récupérer l'impôt anticipé" },

      { type: "h2", id: "e-releve", text: "La méthode rapide : importer l'eRelevé fiscal" },
      {
        type: "steps",
        items: [
          "Dans votre e-banking, téléchargez l'**eRelevé fiscal** (ou « relevé fiscal électronique ») au format PDF et enregistrez-le sur votre appareil.",
          "Dans VaudTax, cliquez sur **« Importer un eRelevé fiscal »**.",
          "Contrôlez les lignes créées : comptes, titres, dettes et intérêts sont remplis automatiquement.",
          "Répétez pour chaque banque qui propose le service. Complétez à la main les établissements qui ne le proposent pas.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Seul le PDF original téléchargé de l'e-banking fonctionne. Un relevé papier scanné ne s'importe pas. Le document doit contenir une page avec un code-barres : si ce n'est pas le cas, votre banque ne participe pas au système.",
      },

      { type: "h2", id: "saisie-manuelle", text: "Saisie manuelle : ce qu'il faut indiquer" },
      {
        type: "table",
        head: ["Champ", "Ce qu'il faut mettre"],
        rows: [
          ["Établissement / émetteur", "Code pays ISO + nom (ex. « CH UBS », « US Apple Inc. », « IE iShares Core MSCI World »)."],
          ["Numéro de compte ou de valeur", "Les 8 derniers caractères du compte ou le numéro de valeur (ISIN)."],
          ["Valeur au 31.12", "Le solde ou la valeur fiscale au 31 décembre, en francs suisses."],
          ["Rendement brut", "Intérêts ou dividendes **avant** déduction de l'impôt anticipé ou étranger."],
          ["Avec / sans impôt anticipé", "Colonne A : rendements suisses soumis aux 35 %. Colonne B : le reste (titres étrangers, petits intérêts)."],
          ["Achat / vente", "Date d'achat ou de vente si le titre est entré ou sorti du portefeuille en cours d'année."],
        ],
      },
      {
        type: "list",
        items: [
          "**Titres cotés en Suisse** : cours de la liste officielle de l'Administration fédérale des contributions au 31.12.",
          "**Titres cotés à l'étranger** : dernier cours de décembre, converti au cours de change officiel au 31.12.",
          "**Titres non cotés** (parts de Sàrl, startup) : valeur fiscale communiquée par la société.",
        ],
      },

      { type: "h2", id: "impot-anticipe", text: "Récupérer l'impôt anticipé de 35 %" },
      {
        type: "p",
        text: "Sur les dividendes d'actions suisses et les intérêts de comptes suisses au-delà de CHF 200 par an, la banque retient **35 % d'impôt anticipé**. Ce montant vous est **rendu** (imputé sur votre impôt cantonal) si vous déclarez le rendement brut et la fortune correspondante. Si vous oubliez de déclarer, vous perdez ce remboursement.",
      },
      {
        type: "p",
        text: "Le droit au remboursement s'éteint à la fin de la 3e année civile suivant l'échéance : pour des rendements de 2026, au plus tard le **31 décembre 2029**, à condition qu'ils figurent dans la déclaration 2026.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Actions étrangères",
        text: "Pour les dividendes étrangers (américains par exemple), une partie de l'impôt prélevé à l'étranger peut être imputée via le formulaire **DA-1** (et R-US 164 pour les titres américains). Voir notre article [dividendes d'actions américaines](/blog/dividende-action-americaine-suisse).",
      },

      { type: "h2", id: "crypto", text: "Crypto-monnaies" },
      {
        type: "p",
        text: "Les crypto-monnaies se déclarent à leur **valeur vénale au 31 décembre** (la liste des cours de l'AFC donne les cours officiels des principales cryptos). Dans VaudTax, elles se saisissent dans la rubrique des comptes, sur une ligne crypto. Le staking et les intérêts reçus sont des revenus imposables. Les gains de cours restent non imposables pour un investisseur privé. Plus de détails : [déclarer ses cryptomonnaies](/blog/declarer-cryptomonnaies-suisse-guide-2026).",
      },

      { type: "h2", id: "deductions-titres", text: "Deux petites déductions à ne pas oublier" },
      {
        type: "table",
        head: ["Déduction", "Montant 2026", "Condition"],
        rows: [
          ["Intérêts de capitaux d'épargne (code 480)", "CHF 1'600 (seul), CHF 3'300 (couple), + CHF 300 par enfant", "Limitée aux intérêts d'épargne déclarés (pas les dividendes)."],
          ["Frais d'administration de titres (code 490)", "Forfait de **1,5 ‰** de la valeur des titres gérés par des tiers", "Droits de garde, frais de dépôt. Pas les courtages ni les frais de gestion de fortune."],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Vous avez un portefeuille de CHF 200'000 en banque ? Le forfait de 1,5 ‰ donne CHF 300 de déduction sans justificatif. VaudTax le propose dans la rubrique « Etat des titres - Frais d'administration (code 490) ».",
      },
    ],
    faq: [
      {
        q: "Dois-je déclarer un compte bancaire à l'étranger dans VaudTax ?",
        a: "Oui. Tous les comptes et titres, en Suisse comme à l'étranger, se déclarent dans l'état des titres avec leur valeur au 31 décembre convertie en francs et leurs rendements bruts.",
      },
      {
        q: "Les gains réalisés en vendant des actions sont-ils imposables ?",
        a: "Non, pour un investisseur privé les gains en capital sur titres ne sont pas imposables en Suisse. Les dividendes, les intérêts et la fortune le sont.",
      },
      {
        q: "Comment récupérer l'impôt anticipé de 35 % ?",
        a: "En déclarant le rendement brut et la fortune correspondante dans l'état des titres (colonne avec impôt anticipé). Le montant est automatiquement imputé sur votre décompte d'impôt cantonal.",
      },
      {
        q: "Que faire si ma banque ne propose pas d'eRelevé fiscal ?",
        a: "Saisissez les comptes et titres à la main à partir des relevés au 31 décembre ou du relevé fiscal papier, et joignez ces documents à la déclaration.",
      },
    ],
  },
  en: {
    title: "Bank accounts, securities and crypto in VaudTax: securities list and withholding tax",
    navTitle: "Accounts, securities, crypto",
    metaTitle: "VaudTax: securities list, eRelevé fiscal and 35% withholding tax",
    metaDescription:
      "How to fill in the securities list in VaudTax (code 410): bank accounts, shares, ETFs, foreign accounts, crypto, eRelevé fiscal import and the 35% withholding tax refund.",
    keywords: [
      "vaudtax securities list",
      "declare foreign bank account switzerland",
      "withholding tax refund switzerland 35",
      "declare crypto vaud tax",
      "erelevé fiscal",
      "wertschriftenverzeichnis vaud",
    ],
    summary: [
      "All your accounts and securities, in Switzerland **and abroad**, go into the **securities list (code 410)**: value on 31 December and gross income for the year.",
      "The easiest way: import your bank's **eRelevé fiscal** PDF, which fills everything in automatically.",
      "Declaring Swiss income correctly lets you **recover the 35% withholding tax** deducted from interest and dividends.",
      "**Capital gains** on private securities are not taxable, but wealth and dividends are.",
    ],
    blocks: [
      { type: "h2", id: "deux-rubriques", text: "Two sections in VaudTax" },
      {
        type: "p",
        text: "VaudTax splits the securities list into two sections, both feeding code 410 of the return.",
      },
      { type: "path", items: ["Etat des titres - Comptes et livrets, comptes-métal, crypto-monnaies (code 410)", "Afficher"] },
      {
        type: "p",
        text: "Current and savings accounts, postal account, **rent deposit account**, leasing account, condominium renovation fund share, metal accounts and crypto.",
      },
      { type: "path", items: ["Etat des titres - Actions, obligations, fonds de placement, relevé fiscal, créances, etc. (code 410)", "Afficher"] },
      {
        type: "p",
        text: "Shares, bonds, funds and ETFs, totals from a bank tax statement, loans made to individuals and lottery winnings.",
      },
      { type: "screenshot", file: "06-etat-des-titres.webp", alt: "Adding a bank account in the VaudTax securities list", caption: "Adding an account: institution, country, IBAN... (VaudTax 2025, simulation mode, fictitious data)" },
      { type: "screenshot", file: "06b-compte-solde.webp", alt: "Balance at 31 December and interest question (subject or not to withholding tax)", caption: "... then the balance at 31.12 and the interest type: this choice is what lets you recover withholding tax" },

      { type: "h2", id: "e-releve", text: "The quick way: import the eRelevé fiscal" },
      {
        type: "steps",
        items: [
          "In your e-banking, download the **eRelevé fiscal** (electronic tax statement) as a PDF and save it to your device.",
          "In VaudTax, click **« Importer un eRelevé fiscal »**.",
          "Check the lines created: accounts, securities, debts and interest are filled in automatically.",
          "Repeat for each participating bank. Enter other banks manually.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Only the original PDF downloaded from e-banking works. A scanned paper statement will not import. The document must include a barcode page; if it does not, your bank does not take part in the system.",
      },

      { type: "h2", id: "saisie-manuelle", text: "Manual entry: what to fill in" },
      {
        type: "table",
        head: ["Field", "What to enter"],
        rows: [
          ["Institution / issuer", "ISO country code + name (e.g. « CH UBS », « US Apple Inc. », « IE iShares Core MSCI World »)."],
          ["Account or security number", "Last 8 characters of the account, or the security number (ISIN)."],
          ["Value at 31.12", "Balance or tax value on 31 December, in Swiss francs."],
          ["Gross income", "Interest or dividends **before** Swiss withholding tax or foreign tax."],
          ["With / without withholding tax", "Column A: Swiss income subject to the 35%. Column B: everything else (foreign securities, small interest)."],
          ["Purchase / sale", "Date of purchase or sale if the security entered or left the portfolio during the year."],
        ],
      },
      {
        type: "list",
        items: [
          "**Securities listed in Switzerland**: price from the Federal Tax Administration official list at 31.12.",
          "**Securities listed abroad**: last December price, converted at the official exchange rate at 31.12.",
          "**Unlisted shares** (GmbH/Sàrl shares, start-ups): tax value provided by the company.",
        ],
      },

      { type: "h2", id: "impot-anticipe", text: "Recovering the 35% withholding tax" },
      {
        type: "p",
        text: "On Swiss share dividends and Swiss account interest above CHF 200 a year, the bank deducts **35% withholding tax**. You get it **back** (credited against your cantonal tax) if you declare the gross income and the related wealth. Forget to declare it, and you lose the refund.",
      },
      {
        type: "p",
        text: "The refund right expires at the end of the 3rd calendar year after the income was due: for 2026 income, by **31 December 2029** at the latest, provided it appears in the 2026 return.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Foreign shares",
        text: "For foreign dividends (US shares, for example), part of the foreign tax can be credited using form **DA-1** (and R-US 164 for US securities).",
      },

      { type: "h2", id: "crypto", text: "Crypto-assets" },
      {
        type: "p",
        text: "Crypto-assets are declared at their **market value on 31 December** (the Federal Tax Administration price list gives official rates for the main coins). In VaudTax, enter them in the accounts section on a crypto line. Staking rewards and interest are taxable income. Price gains remain tax-free for a private investor.",
      },

      { type: "h2", id: "deductions-titres", text: "Two small deductions not to miss" },
      {
        type: "table",
        head: ["Deduction", "2026 amount", "Condition"],
        rows: [
          ["Savings interest (code 480)", "CHF 1,600 (single), CHF 3,300 (couple), + CHF 300 per child", "Limited to savings interest declared (not dividends)."],
          ["Securities administration costs (code 490)", "Flat **1.5‰** of the value of securities managed by third parties", "Custody and safekeeping fees. Not brokerage or asset management fees."],
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to declare a foreign bank account in VaudTax?",
        a: "Yes. All accounts and securities, in Switzerland and abroad, go into the securities list with their 31 December value converted to Swiss francs and their gross income.",
      },
      {
        q: "Are gains from selling shares taxable?",
        a: "No, for a private investor capital gains on securities are not taxable in Switzerland. Dividends, interest and wealth are.",
      },
      {
        q: "How do I get the 35% withholding tax back?",
        a: "Declare the gross income and the related wealth in the securities list (withholding tax column). The amount is automatically credited against your cantonal tax bill.",
      },
    ],
  },
};
