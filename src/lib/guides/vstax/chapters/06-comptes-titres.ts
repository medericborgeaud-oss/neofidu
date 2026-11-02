import type { GuideChapter } from "../../types";

export const comptesTitres: GuideChapter = {
  slug: "comptes-titres",
  readTime: 7,
  fr: {
    title: "Comptes, titres et crypto dans VSTax : l'état des titres (annexe 3) et l'impôt anticipé",
    navTitle: "Comptes et titres",
    metaTitle: "VSTax : remplir l'état des titres, comptes et crypto (2026)",
    metaDescription:
      "Remplir l'annexe 3 de VSTax : comptes bancaires, actions, fonds, crypto, codes A, PP et S, relevé fiscal électronique, frais de garde 1 pour mille et remboursement de l'impôt anticipé.",
    keywords: [
      "état des titres vstax",
      "annexe 3 valais",
      "relevé fiscal électronique vstax",
      "crypto déclaration impôt valais",
      "impôt anticipé remboursement valais",
      "frais administration titres valais 1 pour mille",
    ],
    summary: [
      "L'**état des titres** (annexe 3) recense tous vos comptes, titres et crypto au 31 décembre 2026. Il sert aussi de **demande de remboursement de l'impôt anticipé** de 35 %.",
      "Pour chaque valeur : désignation et numéro IBAN ou de dépôt, **valeur imposable au 31.12** (colonne 4) et **rendements bruts** soumis (colonne 5) ou non (colonne 6) à l'impôt anticipé.",
      "Un **relevé fiscal électronique** de la banque s'importe directement : les lignes se remplissent seules.",
      "Frais de garde des titres : forfait de **1 pour mille** de la fortune en titres, au maximum **CHF 1'000** (code 1800), ou frais effectifs.",
    ],
    blocks: [
      { type: "h2", id: "etat-des-titres", text: "Le formulaire « Etat des titres et autres placements de capitaux »" },
      { type: "path", items: ["Formulaires", "Etat des titres et autres placements de capitaux", "Détail"] },
      {
        type: "screenshot",
        file: "06-saisir-titre.webp",
        alt: "Fenêtre Saisir un titre de VSTax : désignation, type de compte, IBAN, banque, code A capital d'épargne, créance au 31.12, frais d'administration et rendements",
        caption: "Chaque ligne de l'état des titres se saisit dans cette fenêtre : code A pour un compte d'épargne, solde au 31.12, frais et rendements soumis ou non à l'impôt anticipé (VSTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Colonne", "Contenu"],
        rows: [
          ["N° valeur, désignation", "Numéro de valeur (ISIN), nom exact, IBAN ou numéro de dépôt"],
          ["1 et 2 : entrée, sortie", "Date d'ouverture ou d'achat, date de vente ou de bouclement si en 2026"],
          ["3 : frais", "Forfait de 1 pour mille ou frais effectifs"],
          ["4 : fortune", "Valeur imposable au 31 décembre 2026"],
          ["5 : rendement soumis à l'impôt anticipé", "Intérêts et dividendes suisses, montant brut avant les 35 %"],
          ["6 : rendement non soumis", "Dividendes étrangers, intérêts de moins de CHF 200 sur un compte bouclé une fois par an, crypto"],
          ["Codes", "A, E, F, PP, PCE, PCF, D, S : voir plus bas"],
        ],
        caption: "Source : formulaire « Détail état des titres et autres placements de capitaux 2025 », VSTax 2025, SCC Valais.",
      },
      {
        type: "p",
        text: "Le total de la colonne 4 part sous le **code 3200** (fortune), celui des colonnes 5 et 6 sous le **code 1210** (revenus), et VSTax calcule l'impôt anticipé à rembourser (35 % de la colonne 5). Pour une valeur achetée, vendue ou remboursée en 2026, indiquez la **date exacte**. Joignez les attestations bancaires et les décomptes de coupons.",
      },
      {
        type: "screenshot",
        file: "06-etat-des-titres.webp",
        alt: "Détail de l'état des titres dans VSTax : compte d'épargne avec code A, actions suisses et ETF, frais effectifs, fortune, rendements soumis et non soumis, impôt anticipé à rembourser",
        caption: "Un compte par ligne, avec sa valeur au 31.12 et ses rendements bruts (VSTax 2025, données fictives)",
      },

      { type: "h2", id: "codes", text: "Les codes de l'état des titres" },
      {
        type: "table",
        head: ["Code", "Signification", "Effet"],
        rows: [
          ["A", "Capitaux d'épargne (comptes d'épargne, comptes privés)", "Les intérêts entrent dans le plafond du code 2560 avec les primes d'assurance"],
          ["PP", "Participation privée d'au moins 10 % du capital", "Rendement imposé à 60 % à l'impôt cantonal, 70 % à l'IFD"],
          ["E, F", "Titres de l'entreprise du contribuable 1 ou 2", "Reportés dans la fortune commerciale (code 3020)"],
          ["PCE, PCF", "Participations commerciales", "Rendement imposé à 50 % à l'impôt cantonal"],
          ["D", "Prêts, divers", "Prêt privé à un tiers, par exemple"],
          ["S", "Part à une succession non partagée", "Selon la répartition communiquée par l'administrateur de l'hoirie"],
        ],
        caption: "Source : formulaire « Détail état des titres » de VSTax 2025 et Guide de la déclaration d'impôts 2025, SCC Valais.",
      },

      { type: "h2", id: "releve-electronique", text: "Importer un relevé fiscal électronique" },
      {
        type: "p",
        text: "La plupart des banques fournissent un **relevé fiscal électronique** (e-relevé fiscal, au format eCH-0196), sous forme de PDF avec un code-barres. VSTax l'importe dans l'état des titres : comptes, titres, valeurs et rendements se remplissent automatiquement. Vérifiez ensuite les codes (A pour les comptes d'épargne) et ajoutez à la main ce que le relevé ne contient pas. Pour un titre saisi à la main, l'assistant de recherche de VSTax retrouve le cours officiel par le numéro de valeur ; il a besoin d'un accès à internet, que certains antivirus bloquent.",
      },

      { type: "h2", id: "valeurs", text: "Quelle valeur indiquer au 31 décembre ?" },
      {
        type: "table",
        head: ["Placement", "Valeur fiscale au 31.12.2026"],
        rows: [
          ["Comptes d'épargne, comptes privés, dépôts à terme", "Solde au 31 décembre"],
          ["Titres cotés (actions, obligations, fonds, ETF)", "Cours officiel de la liste des cours de l'AFC (ictax.admin.ch)"],
          ["Titres suisses non cotés", "Valeur fiscale communiquée par la société"],
          ["Cryptomonnaies", "Cours de la liste officielle de l'AFC, sinon cours de la plateforme"],
          ["Monnaies étrangères", "Converties au cours des devises de la liste officielle"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, « Quelle est la valeur fiscale de la fortune ? ».",
      },
      {
        type: "callout",
        tone: "info",
        title: "Crypto : fortune et revenus",
        text: "Chaque cryptomonnaie se déclare sur une ligne de l'état des titres, au cours de l'AFC au 31 décembre. Les **revenus passifs** (staking, lending, liquidity mining, mining) sont imposables et vont en colonne 6. Les gains de cours réalisés sur la fortune privée ne sont pas imposables, sauf activité de commerce professionnel.",
      },

      { type: "h2", id: "frais", text: "Frais d'administration des titres (code 1800)" },
      {
        type: "list",
        items: [
          "**Forfait** : 1 pour mille de la valeur fiscale des titres et autres capitaux, sans justificatif, au maximum **CHF 1'000**. Il ne s'applique pas aux valeurs que vous gérez vous-même (prêts privés, participations).",
          "**Frais effectifs** : droits de garde, frais de coffre, frais de tenue de compte, intérêts négatifs, sur justificatifs complets. Si la banque facture un forfait non détaillé, le SCC admet 3 pour mille des titres concernés.",
          "**Non déductibles** : frais de gestion de fortune (mandat de gestion active), courtages, droits de timbre, frais de conseil en placement ou fiscal, frais de cartes bancaires.",
        ],
      },

      { type: "h2", id: "impot-anticipe", text: "Impôt anticipé et impôts étrangers" },
      {
        type: "p",
        text: "L'état des titres **tient lieu de demande de remboursement** de l'impôt anticipé suisse de 35 %. Le droit s'éteint si les rendements ne sont pas déclarés avant la taxation définitive, ou si la demande n'est pas faite dans les **trois ans** suivant l'année de l'échéance ; une prolongation du délai de la déclaration n'y change rien. Pour les dividendes américains et les impôts étrangers retenus à la source, remplissez la feuille complémentaire **DA-1/R-US**, accessible dans la liste des formulaires ; son total est reporté sur l'état des titres. En dessous de CHF 100 d'impôts étrangers non récupérables, la demande DA-1 n'est pas possible.",
      },
      {
        type: "screenshot",
        file: "06-da1.webp",
        alt: "Formulaire DA-1/R-US de VSTax : demande d'imputation d'impôts étrangers prélevés à la source et de remboursement de la retenue supplémentaire USA",
        caption: "La feuille complémentaire DA-1/R-US, accessible dans la liste des formulaires, pour les dividendes étrangers et américains (VSTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Les **gains de loterie** (Swisslos, Loterie Romande, Euro Millions) se déclarent en page 1 de l'état des titres et sous le code 1230. Les gains de jeux de grande envergure et de casinos en ligne sont exonérés jusqu'à CHF 1'071'000 par gain (montant 2026) ; ceux des jeux destinés à promouvoir les ventes jusqu'à CHF 1'100.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer un compte bancaire sans intérêts en Valais ?",
        a: "Oui. Tous les comptes et avoirs se déclarent dans l'état des titres avec leur solde au 31 décembre, même sans rendement : ils font partie de la fortune imposable.",
      },
      {
        q: "Comment déclarer ses cryptomonnaies dans VSTax ?",
        a: "Une ligne par cryptomonnaie dans l'état des titres, avec la valeur au cours de l'AFC au 31 décembre en colonne 4. Les revenus de staking ou de lending vont en colonne 6.",
      },
      {
        q: "Quel forfait pour les frais bancaires des titres en Valais ?",
        a: "1 pour mille de la valeur fiscale des titres et capitaux, au maximum CHF 1'000, sans justificatif. Des frais effectifs plus élevés sont admis avec les pièces complètes.",
      },
      {
        q: "Comment récupérer l'impôt anticipé de 35 % ?",
        a: "En déclarant les rendements bruts dans l'état des titres, colonne 5. L'état des titres vaut demande de remboursement ; le montant est imputé sur vos impôts ou remboursé.",
      },
    ],
  },
  en: {
    title: "Accounts, securities and crypto in VSTax: the securities list (schedule 3) and withholding tax",
    navTitle: "Accounts and securities",
    metaTitle: "VSTax: completing the securities list, accounts and crypto (2026)",
    metaDescription:
      "Completing VSTax schedule 3: bank accounts, shares, funds, crypto, codes A, PP and S, electronic bank tax statements, the 1 per mille custody flat rate and withholding tax refunds.",
    keywords: [
      "vstax securities list",
      "valais schedule 3",
      "electronic tax statement vstax",
      "crypto tax return valais",
      "withholding tax refund valais",
      "vstax bank accounts",
    ],
    summary: [
      "The **securities list** (« Etat des titres », schedule 3) covers all your accounts, securities and crypto on 31 December 2026. It is also your **claim for a refund of the 35% withholding tax**.",
      "For each item: description and IBAN or custody account number, **taxable value on 31.12** (column 4) and **gross income** subject (column 5) or not subject (column 6) to withholding tax.",
      "An **electronic bank tax statement** can be imported directly: the lines fill themselves in.",
      "Custody costs: flat rate of **1 per mille** of the securities' value, at most **CHF 1,000** (code 1800), or actual costs.",
    ],
    blocks: [
      { type: "h2", id: "etat-des-titres", text: "The « Etat des titres et autres placements de capitaux » form" },
      { type: "path", items: ["Formulaires", "Etat des titres et autres placements de capitaux", "Détail"] },
      {
        type: "screenshot",
        file: "06-saisir-titre.webp",
        alt: "VSTax enter a security window: description, account type, IBAN, bank, code A savings, balance on 31.12, custody costs and income",
        caption: "Each securities list line is entered in this window: code A for a savings account, balance on 31.12, costs and income subject or not to withholding tax (VSTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Column", "Content"],
        rows: [
          ["Security number, description", "ISIN, exact name, IBAN or custody account number"],
          ["1 and 2: in, out", "Opening or purchase date, sale or closing date if in 2026"],
          ["3: costs", "1 per mille flat rate or actual costs"],
          ["4: wealth", "Taxable value on 31 December 2026"],
          ["5: income subject to withholding tax", "Swiss interest and dividends, gross before the 35%"],
          ["6: income not subject", "Foreign dividends, interest under CHF 200 on an account closed once a year, crypto"],
          ["Codes", "A, E, F, PP, PCE, PCF, D, S: see below"],
        ],
        caption: "Source: « Détail état des titres et autres placements de capitaux 2025 » form, VSTax 2025, SCC Valais.",
      },
      {
        type: "p",
        text: "The column 4 total goes to **code 3200** (wealth), columns 5 and 6 to **code 1210** (income), and VSTax works out the withholding tax to refund (35% of column 5). For any item bought, sold or redeemed in 2026, give the **exact date**. Attach bank statements and coupon statements.",
      },
      {
        type: "screenshot",
        file: "06-etat-des-titres.webp",
        alt: "Securities list in VSTax: savings account with code A, Swiss shares and a fund, wealth and income columns",
        caption: "One account per line, with its value on 31.12 and gross income (VSTax 2025, fictitious data)",
      },

      { type: "h2", id: "codes", text: "Securities list codes" },
      {
        type: "table",
        head: ["Code", "Meaning", "Effect"],
        rows: [
          ["A", "Savings (savings and private accounts)", "Interest counts towards the code 2560 cap together with insurance premiums"],
          ["PP", "Private holding of at least 10% of the capital", "Income taxed at 60% for cantonal tax, 70% for federal tax"],
          ["E, F", "Securities of taxpayer 1's or 2's business", "Moved to business assets (code 3020)"],
          ["PCE, PCF", "Business holdings", "Income taxed at 50% for cantonal tax"],
          ["D", "Loans, other", "A private loan to someone, for example"],
          ["S", "Share in an undivided estate", "Based on the split provided by the estate administrator"],
        ],
        caption: "Source: VSTax 2025 securities list form and Guide de la déclaration d'impôts 2025, SCC Valais.",
      },

      { type: "h2", id: "releve-electronique", text: "Importing an electronic bank tax statement" },
      {
        type: "p",
        text: "Most banks provide an **electronic tax statement** (eCH-0196 format), a PDF with a barcode. VSTax imports it into the securities list: accounts, securities, values and income fill themselves in. Then check the codes (A for savings accounts) and add by hand anything the statement does not cover. For a security entered by hand, VSTax's search assistant finds the official price from the security number; it needs internet access, which some antivirus programs block.",
      },

      { type: "h2", id: "valeurs", text: "Which value on 31 December?" },
      {
        type: "table",
        head: ["Investment", "Tax value on 31.12.2026"],
        rows: [
          ["Savings and private accounts, fixed-term deposits", "Balance on 31 December"],
          ["Listed securities (shares, bonds, funds, ETFs)", "Official price from the Federal Tax Administration's price list (ictax.admin.ch)"],
          ["Unlisted Swiss securities", "Tax value provided by the company"],
          ["Cryptocurrencies", "Official Federal Tax Administration rate, otherwise the platform's rate"],
          ["Foreign currencies", "Converted at the official list's exchange rate"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, section on the tax value of wealth.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Crypto: wealth and income",
        text: "Each cryptocurrency goes on its own line in the securities list, at the Federal Tax Administration rate on 31 December. **Passive income** (staking, lending, liquidity mining, mining) is taxable and goes in column 6. Price gains on private wealth are tax-free, unless you trade professionally.",
      },

      { type: "h2", id: "frais", text: "Securities administration costs (code 1800)" },
      {
        type: "list",
        items: [
          "**Flat rate**: 1 per mille of the tax value of securities and other capital, without receipts, at most **CHF 1,000**. It does not apply to assets you manage yourself (private loans, holdings).",
          "**Actual costs**: custody fees, safe-deposit box, account fees, negative interest, with complete receipts. If the bank charges an undetailed package fee, the SCC accepts 3 per mille of the securities concerned.",
          "**Not deductible**: asset management fees (active management mandate), brokerage, stamp duty, investment or tax advice, bank card fees.",
        ],
      },

      { type: "h2", id: "impot-anticipe", text: "Withholding tax and foreign taxes" },
      {
        type: "p",
        text: "The securities list **serves as your refund claim** for the 35% Swiss withholding tax. The right lapses if the income is not declared before the final assessment, or if the claim is not made within **three years** after the year the income fell due; an extension of the filing deadline does not change this. For US dividends and foreign taxes withheld at source, complete the **DA-1/R-US** supplementary sheet, available in the forms list; its total is carried over to the securities list. Below CHF 100 of non-recoverable foreign tax, a DA-1 claim is not possible.",
      },
      {
        type: "screenshot",
        file: "06-da1.webp",
        alt: "VSTax DA-1/R-US form: claim for credit of foreign withholding taxes and refund of the additional US withholding",
        caption: "The DA-1/R-US supplementary sheet, in the forms list, for foreign and US dividends (VSTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "**Lottery winnings** (Swisslos, Loterie Romande, EuroMillions) are declared on page 1 of the securities list and under code 1230. Winnings from large-scale games and online casinos are tax-free up to CHF 1,071,000 per win (2026 amount); those from sales-promotion games up to CHF 1,100.",
      },
    ],
    faq: [
      {
        q: "Do I need to declare a bank account with no interest in Valais?",
        a: "Yes. All accounts go in the securities list with their balance on 31 December, even without income: they are part of your taxable wealth.",
      },
      {
        q: "How do I declare cryptocurrency in VSTax?",
        a: "One line per cryptocurrency in the securities list, with its value at the Federal Tax Administration rate on 31 December in column 4. Staking or lending income goes in column 6.",
      },
      {
        q: "What is the flat rate for securities custody costs in Valais?",
        a: "1 per mille of the tax value of securities and capital, at most CHF 1,000, without receipts. Higher actual costs are accepted with complete documents.",
      },
      {
        q: "How do I get the 35% withholding tax back?",
        a: "By declaring gross income in column 5 of the securities list. The list is your refund claim; the amount is credited against your taxes or paid back.",
      },
    ],
  },
};
