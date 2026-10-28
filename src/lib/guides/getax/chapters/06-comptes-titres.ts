import type { GuideChapter } from "../../types";

export const comptesTitres: GuideChapter = {
  slug: "comptes-titres",
  readTime: 7,
  fr: {
    title: "Etat des titres dans GeTax : comptes bancaires, titres, crypto et impôt anticipé",
    navTitle: "Comptes et titres",
    metaTitle: "GeTax 2026 : remplir l'état des titres (comptes, actions, crypto)",
    metaDescription:
      "Remplir l'état des titres dans GeTax : types CPT, ACT, FDS, ERF, CRY, intérêts soumis ou non à l'impôt anticipé, frais bancaires, e-relevé fiscal, crypto et taux de change officiels.",
    keywords: [
      "état des titres getax",
      "impôt anticipé remboursement genève",
      "e-relevé fiscal getax",
      "crypto déclaration impôt genève",
      "frais bancaires déductibles genève",
      "annexe F déclaration genève",
    ],
    summary: [
      "Tous les comptes et titres, **en Suisse et à l'étranger**, se déclarent dans l'**état des titres** (annexe F), avec leur solde ou valeur au 31 décembre et leurs rendements.",
      "Chaque ligne a un **type** : CPT (compte), ACT (action), OBL, FDS (fonds), CRY (crypto), RF ou ERF (relevé fiscal, saisie simplifiée), etc.",
      "Les rendements **soumis à l'impôt anticipé** donnent droit au remboursement des **35 %** retenus, imputés sur l'impôt cantonal. Les comptes à l'étranger vont dans la colonne « non soumis ».",
      "Les **frais de tenue de compte** et de coffre sont déductibles, pas les frais de cartes, d'e-banking ni de retraits.",
    ],
    blocks: [
      { type: "h2", id: "questions", text: "Les questions préalables" },
      { type: "path", items: ["Etat des titres (comptes, titres, gains de loterie)", "Questions"] },
      {
        type: "p",
        text: "GeTax demande d'abord si vous êtes **citoyen des États-Unis** (double nationalité ou statut « US Person ») et si vous participez à des sociétés de personnes (société en nom collectif, commandite). Répondez pour l'ensemble du foyer.",
      },

      { type: "h2", id: "saisie", text: "Saisie détaillée ou simplifiée" },
      { type: "path", items: ["Etat des titres", "Insérer", "Veuillez choisir le type de titre"] },
      {
        type: "screenshot",
        file: "06-types-titres.webp",
        alt: "Choix du type de fortune mobilière dans GeTax, avec la liste des codes CPT, ACT, OBL, DEV, FDS, CRE, LOT, RF, ERF, PQ, FID, PAR, CRY",
        caption: "Chaque ligne de l'état des titres commence par le choix du type (GeTax 2025)",
      },
      {
        type: "table",
        head: ["Code", "Type", "Quand l'utiliser"],
        rows: [
          ["CPT", "Compte bancaire ou postal", "Comptes privés, épargne, comptes à l'étranger, crypto détenue sur un compte"],
          ["ACT, OBL, FDS", "Action, obligation, fonds de placement", "Titres détenus en direct, saisie détaillée"],
          ["DEV, CRE, FID", "Produit dérivé, créance et prêt, placement fiduciaire", "Cas particuliers"],
          ["LOT", "Gain de jeu d'argent", "Gains de loterie imposables"],
          ["RF", "Relevé fiscal papier", "Saisie simplifiée : une ligne reprend la récapitulation du relevé de la banque"],
          ["ERF", "e-Relevé fiscal", "Import du fichier électronique de la banque"],
          ["PQ", "Participation qualifiée", "Au moins 10 % du capital d'une société"],
          ["PAR", "Plan de participation de collaborateur", "Actions ou options de l'employeur"],
          ["CRY", "Cryptomonnaie", "Bitcoin, Ether, etc."],
        ],
        caption: "Types de l'aide de GeTax 2025, AFC Genève.",
      },
      {
        type: "p",
        text: "Avec un **relevé fiscal** de votre banque, la saisie simplifiée évite de recopier chaque titre : choisissez RF et reportez les totaux de la page récapitulative, ou ERF pour importer l'e-relevé. Les lignes importées apparaissent dans « Affichage des titres importés par e-relevé ».",
      },

      { type: "h2", id: "comptes", text: "Déclarer un compte bancaire" },
      {
        type: "screenshot",
        file: "06b-compte.webp",
        alt: "Saisie d'un compte bancaire dans GeTax : IBAN, établissement, intérêts soumis et non soumis à l'impôt anticipé, solde au 31 décembre, frais bancaires",
        caption: "Un compte : titulaire, IBAN, banque, intérêts, solde au 31 décembre et frais bancaires (GeTax 2025, données fictives)",
      },
      {
        type: "list",
        items: [
          "**Civilité** : contribuable A, B, couple ou enfant(s). Les comptes des enfants mineurs se déclarent avec ceux des parents.",
          "**Opération** : ouverture ou fermeture du compte pendant l'année, avec la date.",
          "**Intérêts bruts soumis à l'impôt anticipé** : comptes suisses avec retenue de 35 %. Les intérêts d'un compte ne dépassant pas CHF 200 dans l'année sont en principe exonérés d'impôt anticipé : mettez-les en « non soumis ».",
          "**Intérêts bruts non soumis** : comptes à l'étranger, petits intérêts suisses.",
          "**Solde du compte au 31 décembre** (ou à la fin de l'assujettissement), converti en francs.",
          "**Frais bancaires** : frais de tenue de compte et de location de coffre. Les cotisations de cartes, les frais d'e-banking et de retrait ne sont pas admis.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Les comptes de **3e pilier A** et de **libre passage** ne figurent pas dans l'état des titres : ils sont exonérés d'impôt sur le revenu et la fortune pendant toute la constitution de la prévoyance.",
      },

      { type: "h2", id: "impot-anticipe", text: "Impôt anticipé et autres imputations" },
      {
        type: "p",
        text: "GeTax calcule **35 %** des rendements soumis à l'impôt anticipé et l'affiche dans le « Résumé des imputations ». L'AFC impute ce montant sur l'impôt cantonal et communal : il apparaît sous « Imputations » du bordereau. Deux autres colonnes concernent les titres étrangers :",
      },
      {
        type: "table",
        head: ["Colonne", "Signification", "Justificatif obligatoire"],
        rows: [
          ["RSI", "Retenue supplémentaire d'impôt sur dividendes et intérêts américains encaissés via une banque suisse", "Formule R-US 164"],
          ["IES", "Imputation d'impôts étrangers prélevés à la source selon une convention de double imposition", "Formule DA-1 (dividendes, intérêts) ou DA-3"],
        ],
        caption: "Source : Guide de la déclaration 2025, AFC Genève. Pas de remboursement si l'imputation d'impôts étrangers ne dépasse pas CHF 100.",
      },

      { type: "h2", id: "crypto", text: "Cryptomonnaies" },
      {
        type: "p",
        text: "Les cryptomonnaies sont traitées comme des **devises étrangères** : elles font partie de la fortune au cours fiscal du 31 décembre publié par l'Administration fédérale des contributions (liste « Crypto-monnaies » des cours officiels, sur ictax.admin.ch). Multipliez le cours par le nombre d'unités. Pour un particulier qui gère sa fortune privée, les gains en capital ne sont pas imposables et les pertes ne sont pas déductibles ; les rendements (staking, intérêts) se déclarent comme revenus de fortune.",
      },

      { type: "h2", id: "devises", text: "Comptes et titres en monnaie étrangère" },
      {
        type: "p",
        text: "Utilisez les **taux de change officiels** de l'année : les **cours moyens annuels** pour convertir les revenus, les **cours au 31 décembre** pour la fortune. L'AFC les publie sur ge.ch et la Confédération sur ictax.admin.ch. GeTax intègre la base des cours des titres cotés, mise à jour en cours d'année.",
      },
      {
        type: "p",
        text: "Pour les **participations qualifiées** (10 % du capital ou plus), les dividendes de la fortune privée bénéficient d'un abattement de 30 % pour l'impôt cantonal. Elles se déclarent avec le type PQ.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer un compte bancaire à l'étranger à Genève ?",
        a: "Oui. Tous les comptes, en Suisse et à l'étranger, figurent dans l'état des titres avec leur solde au 31 décembre converti en francs et leurs intérêts dans la colonne « non soumis à l'impôt anticipé ».",
      },
      {
        q: "Comment récupérer l'impôt anticipé de 35 % ?",
        a: "En déclarant les rendements dans la colonne « soumis à l'impôt anticipé » de l'état des titres. GeTax calcule les 35 % et l'AFC les impute sur votre impôt cantonal et communal.",
      },
      {
        q: "Comment déclarer ses bitcoins dans GeTax ?",
        a: "Avec le type CRY (ou comme compte), au cours fiscal du 31 décembre publié par l'Administration fédérale des contributions, multiplié par le nombre d'unités. Les gains en capital privés ne sont pas imposables.",
      },
      {
        q: "Les frais bancaires sont-ils déductibles ?",
        a: "Les frais de tenue de compte et de location de coffre, oui. Les cotisations de cartes de crédit ou de débit, les frais d'e-banking et de retrait au bancomat, non.",
      },
    ],
  },
  en: {
    title: "Securities list in GeTax: bank accounts, shares, crypto and withholding tax",
    navTitle: "Accounts and securities",
    metaTitle: "GeTax 2026: completing the securities list (accounts, shares, crypto)",
    metaDescription:
      "Completing the securities list in GeTax: types CPT, ACT, FDS, ERF, CRY, interest subject or not to withholding tax, bank fees, e-tax statement, crypto and official exchange rates.",
    keywords: [
      "getax securities list",
      "geneva withholding tax refund",
      "foreign bank account geneva tax",
      "crypto tax return geneva",
      "bank fees deductible geneva",
      "e-tax statement getax",
    ],
    summary: [
      "All accounts and securities, **in Switzerland and abroad**, go in the **securities list** (« Etat des titres », schedule F), with their balance or value on 31 December and their income.",
      "Each line has a **type**: CPT (account), ACT (share), OBL, FDS (fund), CRY (crypto), RF or ERF (bank tax statement, simplified entry), etc.",
      "Income **subject to withholding tax** gives a refund of the **35%** withheld, credited against cantonal tax. Foreign accounts go in the \"not subject\" column.",
      "**Account maintenance** and safe deposit fees are deductible; card fees, e-banking and withdrawal fees are not.",
    ],
    blocks: [
      { type: "h2", id: "questions", text: "Preliminary questions" },
      { type: "path", items: ["Etat des titres (comptes, titres, gains de loterie)", "Questions"] },
      {
        type: "p",
        text: "GeTax first asks whether you are a **US citizen** (dual nationality or « US Person » status) and whether you hold stakes in partnerships (« société en nom collectif », « commandite »). Answer for the whole household.",
      },

      { type: "h2", id: "saisie", text: "Detailed or simplified entry" },
      { type: "path", items: ["Etat des titres", "Insérer", "Veuillez choisir le type de titre"] },
      {
        type: "screenshot",
        file: "06-types-titres.webp",
        alt: "Choosing the asset type in GeTax, with the list of codes CPT, ACT, OBL, DEV, FDS, CRE, LOT, RF, ERF, PQ, FID, PAR, CRY",
        caption: "Each line of the securities list starts with choosing its type (GeTax 2025)",
      },
      {
        type: "table",
        head: ["Code", "Type", "When to use it"],
        rows: [
          ["CPT", "« Compte bancaire ou postal » (bank or postal account)", "Private, savings and foreign accounts, crypto held in an account"],
          ["ACT, OBL, FDS", "Share, bond, investment fund", "Securities held directly, detailed entry"],
          ["DEV, CRE, FID", "Derivative, receivable or loan, fiduciary deposit", "Special cases"],
          ["LOT", "Gambling winnings", "Taxable lottery winnings"],
          ["RF", "« Relevé fiscal papier » (paper bank tax statement)", "Simplified entry: one line copies the bank statement's summary"],
          ["ERF", "« e-Relevé fiscal » (electronic tax statement)", "Import of the bank's electronic file"],
          ["PQ", "Qualifying holding", "At least 10% of a company's capital"],
          ["PAR", "Employee participation plan", "Employer shares or options"],
          ["CRY", "Cryptocurrency", "Bitcoin, Ether, etc."],
        ],
        caption: "Types from the GeTax 2025 help, AFC Geneva.",
      },
      {
        type: "p",
        text: "With a **bank tax statement**, simplified entry saves you copying every security: choose RF and copy the totals from the summary page, or ERF to import the e-statement. Imported lines appear under « Affichage des titres importés par e-relevé ».",
      },

      { type: "h2", id: "comptes", text: "Declaring a bank account" },
      {
        type: "screenshot",
        file: "06b-compte.webp",
        alt: "Bank account entry in GeTax: IBAN, bank, interest subject and not subject to withholding tax, balance on 31 December, bank fees",
        caption: "One account: owner, IBAN, bank, interest, balance on 31 December and bank fees (GeTax 2025, fictitious data)",
      },
      {
        type: "list",
        items: [
          "**Owner** (« Civilité »): taxpayer A, B, couple or child(ren). Minor children's accounts are declared with the parents'.",
          "**Transaction**: account opened or closed during the year, with the date.",
          "**Gross interest subject to withholding tax** (« soumis à l'impôt anticipé »): Swiss accounts with 35% withheld. Interest of CHF 200 or less on an account in the year is normally exempt from withholding tax: put it under \"not subject\".",
          "**Gross interest not subject** (« non soumis »): foreign accounts, small Swiss interest.",
          "**Balance on 31 December** (or at the end of tax liability), converted into francs.",
          "**Bank fees**: account maintenance and safe deposit rental. Card fees, e-banking and withdrawal fees are not accepted.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "**Pillar 3a** and **vested benefits** accounts are not listed: they are exempt from income and wealth tax throughout the saving period.",
      },

      { type: "h2", id: "impot-anticipe", text: "Withholding tax and other credits" },
      {
        type: "p",
        text: "GeTax computes **35%** of income subject to withholding tax and shows it in « Résumé des imputations » (summary of credits). The AFC credits it against cantonal and communal tax: it appears under « Imputations » on the tax bill. Two more columns concern foreign securities:",
      },
      {
        type: "table",
        head: ["Column", "Meaning", "Mandatory form"],
        rows: [
          ["RSI", "Additional withholding on US dividends and interest received through a Swiss bank", "Form R-US 164"],
          ["IES", "Credit for foreign withholding taxes under a double tax treaty", "Form DA-1 (dividends, interest) or DA-3"],
        ],
        caption: "Source: 2025 return guide, AFC Geneva. No refund if the foreign tax credit is CHF 100 or less.",
      },

      { type: "h2", id: "crypto", text: "Cryptocurrencies" },
      {
        type: "p",
        text: "Cryptocurrencies are treated as **foreign currencies**: they are part of your wealth at the 31 December tax rate published by the Swiss Federal Tax Administration (\"Crypto-monnaies\" list of official rates, on ictax.admin.ch). Multiply the rate by the number of units. For an individual managing private wealth, capital gains are not taxable and losses are not deductible; income (staking, interest) is declared as investment income.",
      },

      { type: "h2", id: "devises", text: "Accounts and securities in foreign currency" },
      {
        type: "p",
        text: "Use the year's **official exchange rates**: **annual average rates** to convert income, **31 December rates** for wealth. The AFC publishes them on ge.ch and the Confederation on ictax.admin.ch. GeTax includes a database of listed securities prices, updated during the year.",
      },
      {
        type: "p",
        text: "For **qualifying holdings** (10% of the capital or more), dividends from private wealth get a 30% reduction for cantonal tax. Declare them with type PQ.",
      },
    ],
    faq: [
      {
        q: "Do I have to declare a foreign bank account in Geneva?",
        a: "Yes. All accounts, in Switzerland and abroad, go in the securities list with their 31 December balance in francs and their interest in the column « non soumis à l'impôt anticipé ».",
      },
      {
        q: "How do I get the 35% withholding tax back?",
        a: "By declaring the income in the column « soumis à l'impôt anticipé » of the securities list. GeTax computes the 35% and the AFC credits it against your cantonal and communal tax.",
      },
      {
        q: "How do I declare bitcoin in GeTax?",
        a: "With type CRY (or as an account), at the 31 December tax rate published by the Swiss Federal Tax Administration, multiplied by the number of units. Private capital gains are not taxable.",
      },
      {
        q: "Are bank fees deductible?",
        a: "Account maintenance and safe deposit fees, yes. Credit or debit card fees, e-banking and ATM withdrawal fees, no.",
      },
    ],
  },
};
