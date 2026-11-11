import type { GuideChapter } from "../../types";

export const comptesTitres: GuideChapter = {
  slug: "comptes-titres",
  readTime: 7,
  fr: {
    title: "Comptes, titres et crypto dans JuraTax : l'état des titres (formule 5A), eRelevé et impôt anticipé",
    navTitle: "Comptes et titres",
    metaTitle: "JuraTax : état des titres (formule 5A), eRelevé et crypto",
    metaDescription:
      "Remplir l'état des titres de JuraTax (formule 5A, codes 340 et 740) : comptes bancaires, actions, ETF et crypto, import des eRelevés fiscaux en PDF, catégories A et B, DA-1 et R-US, gains de loterie, frais de gérance et remboursement de l'impôt anticipé.",
    keywords: [
      "juratax état des titres",
      "formule 5a jura",
      "juratax erelevé",
      "crypto déclaration impôt jura",
      "impôt anticipé remboursement jura",
      "da-1 jura",
    ],
    summary: [
      "Tous les comptes, titres et placements au **31 décembre 2026** se déclarent dans la **formule 5A** « État des titres ». Le total de la fortune passe au **code 740**, le rendement au **code 340**.",
      "Avec **JuraTax Online**, importez l'**eRelevé fiscal** en PDF de votre banque : comptes, titres et dettes se remplissent seuls, et le PDF est joint automatiquement aux justificatifs.",
      "Déclarez les rendements suisses soumis à l'impôt anticipé en **catégorie A** : c'est la condition du **remboursement** de l'impôt anticipé de 35 %.",
      "Les **gains en capital** privés ne sont pas imposables ; les avoirs **2e pilier, 3e pilier A et libre passage** ne se déclarent pas.",
    ],
    blocks: [
      { type: "h2", id: "formule-5a", text: "Ce que doit contenir l'état des titres" },
      {
        type: "p",
        text: "La **formule 5A** liste toute la fortune en titres et autres placements de capitaux que vous, votre conjoint et vos enfants mineurs possédiez ou dont vous aviez l'usufruit au 31 décembre 2026, en Suisse et à l'étranger, dans cet ordre :",
      },
      {
        type: "list",
        items: [
          "**a.** Carnets d'épargne et de dépôt, comptes courants, comptes salaire, comptes postaux, en Suisse et à l'étranger.",
          "**b.** Obligations, actions, parts de Sàrl et de coopératives, bons de participation et de jouissance, **cryptomonnaies**.",
          "**c.** Parts de fonds de placement, y compris le fonds de rénovation d'une propriété par étages.",
          "**d.** Créances hypothécaires et autres créances, prêts privés, titres étrangers, même bloqués.",
          "**e.** Gains de loterie, du Sport-Toto, de la Loterie à numéros, du PMU et gains en nature.",
        ],
      },
      {
        type: "table",
        head: ["Colonne", "Contenu"],
        rows: [
          ["4 et 5", "Valeur vénale et valeur imposable au 31 décembre 2026 : valeur nominale pour les comptes et créances, cours de clôture du dernier jour de bourse de décembre pour les titres cotés"],
          ["6, catégorie A", "Rendements bruts suisses ayant subi l'impôt anticipé de 35 % (dividendes, intérêts d'obligations, intérêts de comptes de plus de CHF 200 par an)"],
          ["7, catégorie B", "Rendements non soumis à l'impôt anticipé : titres et avoirs étrangers, intérêts de comptes ne dépassant pas CHF 200 par an, prêts privés, créances hypothécaires, gains de loterie non soumis à l'impôt anticipé"],
        ],
        caption: "Source : Guide général 2025, pages 22 à 25, Service des contributions du canton du Jura.",
      },
      { type: "path", items: ["Titres", "Sélection des titres"] },
      {
        type: "p",
        text: "Dans JuraTax, la rubrique **« Titres »** commence par une **sélection** : comptes et livrets d'épargne, actions et fonds de placement, imposition partielle des dividendes, obligations, prêts, divers, relevés fiscaux bancaires, feuille DA-1 / R-US, gains de loterie, frais d'administration, ainsi que les parts de succession et les donations reçues ou versées. JuraTax en tire l'état des titres (formule 5A).",
      },
      {
        type: "screenshot",
        file: "06-selection-titres.webp",
        alt: "Écran Sélection des titres de JuraTax 2025 : comptes et livrets d'épargne, actions et fonds, dividendes, obligations, prêts, divers, relevés fiscaux bancaires, DA-1 / R-US, gains de loterie, frais d'administration, successions et donations",
        caption: "La sélection des titres : chaque case cochée ouvre un écran de saisie (JuraTax 2025)",
      },
      {
        type: "p",
        text: "Chaque **compte** se saisit avec la banque, le numéro, la devise, les dates d'ouverture ou de clôture en 2026, les **intérêts bruts**, la case **soumis à l'impôt anticipé** et le **solde au 31 décembre**. Pour une **action ou un fonds**, saisissez le **numéro de valeur** (ISIN ou valor) : les boutons **« Chercher un titre »** et **« Liste des cours »** reprennent automatiquement la désignation, le cours au 31 décembre et les dividendes de la liste officielle de l'AFC. Il ne reste qu'à indiquer le nombre de titres.",
      },
      {
        type: "screenshot",
        file: "06-comptes.webp",
        alt: "Écran Comptes et livrets d'épargne de JuraTax 2025 : origine, banque, numéro de compte, devise, dates d'ouverture et de clôture, rendement brut, impôt anticipé, solde au 31 décembre, frais du compte",
        caption: "Un écran par compte : intérêts bruts, impôt anticipé et solde au 31 décembre (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "06-actions.webp",
        alt: "Écran Actions / fonds de placement de JuraTax 2025 : numéro de valeur avec les boutons Chercher un titre et Liste des cours, nombre de titres, devise, rendement et valeur fiscale par titre",
        caption: "Avec le numéro de valeur, JuraTax reprend le cours et les dividendes de la liste officielle (JuraTax 2025)",
      },

      { type: "h2", id: "ereleve", text: "Importer l'eRelevé fiscal de votre banque" },
      {
        type: "p",
        text: "Depuis 2022, **JuraTax Online** importe les **eRelevés fiscaux** au format PDF générés par votre banque. Le détail se charge automatiquement dans les rubriques des titres (comptes, livrets, actions) et des **dettes**, et le PDF est ajouté aux justificatifs transmis électroniquement. Contrôlez ensuite chaque ligne : un compte clôturé l'an dernier peut subsister après la reprise de l'année précédente et doit être supprimé. Les **indépendants et agriculteurs** veillent à séparer les éléments privés et commerciaux. Avec **JuraTax Logiciel**, il n'y a pas d'import : cochez « **Relevés fiscaux bancaires, relevés supplémentaires** » dans la sélection des titres et reportez, pour chaque relevé, la banque, les rendements avec et sans impôt anticipé, les frais et la valeur fiscale. Le relevé fiscal se **joint dans tous les cas** à la déclaration.",
      },
      {
        type: "screenshot",
        file: "06-releves-fiscaux.webp",
        alt: "Écran Relevés fiscaux bancaires de JuraTax 2025 : liste des relevés avec banque, désignation, rendement brut avec et sans impôt anticipé, frais, valeur fiscale, et report des relevés supplémentaires",
        caption: "Dans JuraTax Logiciel, chaque relevé fiscal bancaire se résume en une ligne : rendements, frais et valeur fiscale ; le relevé lui-même est à joindre dans tous les cas (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Sans eRelevé : joignez le relevé fiscal",
        text: "Si vous saisissez vos titres à la main ou utilisez JuraTax Logiciel, **joignez le relevé fiscal** de votre dépôt à l'état des titres. Pour tout **achat ou vente** de titres en 2026, joignez aussi les **décomptes d'achat et de vente**. Les cours officiels se trouvent sur ictax.admin.ch ; JuraTax Logiciel les charge avec la mise à jour du programme.",
      },

      { type: "h2", id: "crypto", text: "Cryptomonnaies, titres non cotés et monnaies étrangères" },
      {
        type: "list",
        items: [
          "**Cryptomonnaies** : une ligne par monnaie, au cours publié par l'Administration fédérale des contributions (ICTax) au 31 décembre, à défaut au cours de la plateforme. Les gains réalisés en vendant ne sont pas imposables pour un investisseur privé.",
          "**Monnaies étrangères** : indiquez le cours de bourse et le cours de conversion de la liste officielle des cours 2026.",
          "**Titres non cotés** : valeur vénale selon la circulaire n° 28 de la Conférence suisse des impôts. Si la valeur 2026 n'est pas encore connue, indiquez provisoirement celle du 31 décembre 2025.",
          "**Participations suisses non cotées** : elles sont imposées à une valeur réduite, la valeur fiscale diminuée de **30 % de la différence** entre valeur fiscale et valeur nominale. Pour les sociétés jurassiennes, cette valeur figure sur la notification adressée au conseil d'administration.",
          "**Avoirs non imposables** : ne déclarez pas vos avoirs de 2e pilier, de 3e pilier A ni vos comptes de libre passage.",
        ],
      },

      { type: "h2", id: "da1", text: "Titres américains et impôts étrangers : DA-1 et R-US" },
      {
        type: "p",
        text: "Les titres **américains** avec retenue supplémentaire d'impôt des États-Unis ne figurent pas dans la formule 5A mais sur la **feuille complémentaire DA-1/R-US**. Elle sert aussi à demander l'**imputation des impôts étrangers** prélevés à la source sur les dividendes et intérêts de 2026 (formules DA-2 et DA-3 pour d'autres cas). Les dividendes **allemands** se déclarent aussi sur la DA-1/R-US. Sans DA-1/R-US jointe, **aucun remboursement** n'est effectué. Les formulaires se téléchargent sur jura.ch, rubrique « Formulaires impôts spéciaux ».",
      },

      { type: "h2", id: "impot-anticipe", text: "Remboursement de l'impôt anticipé" },
      {
        type: "p",
        text: "L'impôt anticipé de **35 %** retenu sur les rendements suisses vous est remboursé si vous déclarez **tous** les titres et leurs rendements dans la formule 5A, et si vous êtes **domicilié dans le canton du Jura au 31 décembre**. Il est remboursé séparément dès le traitement de votre état des titres lorsqu'il dépasse **CHF 500** ; un montant inférieur est porté en compte comme paiement d'impôt sur l'année suivante. Un titre non déclaré fait perdre le droit au remboursement et expose à un rappel d'impôt et à une amende.",
      },

      { type: "h2", id: "loterie-frais", text: "Gains de loterie et frais de gérance" },
      {
        type: "list",
        items: [
          "**Loteries et jeux** : pour l'impôt cantonal, un gain unique est exonéré jusqu'à **CHF 1'000'000** ; au-delà, il est imposé séparément au taux unitaire de **2 %**. Les mises sont déduites à raison de **5 %**, au maximum **CHF 5'000**. Joignez les justificatifs originaux et annoncez-vous à l'unité de l'impôt anticipé à Delémont.",
          "**Frais de gérance de titres** : seuls les frais effectifs de gestion confiée à des tiers en dépôt ouvert sont déductibles, pour la part soumise à la TVA. Les commissions d'achat et de vente et les honoraires de conseil ne le sont pas. Ils doivent être justifiés.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment importer un eRelevé fiscal dans JuraTax ?",
        a: "Dans JuraTax Online, importez le PDF de l'eRelevé fiscal fourni par votre banque : les comptes, titres et dettes se remplissent automatiquement et le PDF est joint aux justificatifs. JuraTax Logiciel ne permet pas l'envoi électronique des justificatifs.",
      },
      {
        q: "Comment déclarer ses cryptomonnaies dans le canton du Jura ?",
        a: "Dans l'état des titres (formule 5A), avec les actions et obligations, une ligne par monnaie, au cours ICTax de l'Administration fédérale des contributions au 31 décembre. Les gains en capital privés ne sont pas imposables.",
      },
      {
        q: "Quand l'impôt anticipé est-il remboursé dans le Jura ?",
        a: "Séparément, dès le traitement de l'état des titres, s'il dépasse CHF 500. En dessous, il est porté en compte comme paiement sur l'impôt de l'année suivante. Il faut être domicilié dans le canton du Jura au 31 décembre.",
      },
      {
        q: "Faut-il déclarer son 3e pilier A dans l'état des titres ?",
        a: "Non. Les avoirs de 3e pilier A, de 2e pilier et de libre passage ne sont pas imposables tant qu'ils ne sont pas versés et ne se déclarent pas. Seules les cotisations 3a de l'année se déduisent, au code 520.",
      },
    ],
  },
  en: {
    title: "Accounts, securities and crypto in JuraTax: the securities list (form 5A), eRelevé and withholding tax",
    navTitle: "Accounts and securities",
    metaTitle: "JuraTax: securities list (form 5A), eRelevé and crypto",
    metaDescription:
      "Fill in the JuraTax securities list (form 5A, codes 340 and 740): bank accounts, shares, ETFs and crypto, importing electronic tax statements (eRelevé) as PDFs, categories A and B, DA-1 and R-US, lottery winnings, management fees and Swiss withholding tax refunds.",
    keywords: [
      "juratax securities list",
      "jura form 5a",
      "juratax erelevé",
      "crypto tax return jura",
      "withholding tax refund jura",
      "da-1 jura",
    ],
    summary: [
      "All accounts, securities and investments at **31 December 2026** go on **form 5A** « État des titres » (securities list). Total wealth goes to **code 740**, income to **code 340**.",
      "With **JuraTax Online**, import your bank's **electronic tax statement** (« eRelevé fiscal ») as a PDF: accounts, securities and debts fill in automatically, and the PDF is attached to your supporting documents.",
      "Declare Swiss income subject to withholding tax in **category A**: this is the condition for **refunding** the 35% Swiss withholding tax.",
      "Private **capital gains** are not taxable; **pillar 2, pillar 3a and vested benefits** balances are not declared.",
    ],
    blocks: [
      { type: "h2", id: "formule-5a", text: "What the securities list must contain" },
      {
        type: "p",
        text: "**Form 5A** lists all wealth held in securities and other investments that you, your spouse and your minor children owned or held in usufruct on 31 December 2026, in Switzerland and abroad, in this order:",
      },
      {
        type: "list",
        items: [
          "**a.** Savings and deposit books, current accounts, salary accounts, postal accounts, in Switzerland and abroad.",
          "**b.** Bonds, shares, shares in limited companies and cooperatives, participation and dividend-right certificates, **cryptocurrencies**.",
          "**c.** Investment fund units, including the renovation fund of a condominium (PPE).",
          "**d.** Mortgage claims and other claims, private loans, foreign securities, even if blocked.",
          "**e.** Lottery, Sport-Toto, Swiss Lotto and PMU winnings and prizes in kind.",
        ],
      },
      {
        type: "table",
        head: ["Column", "Content"],
        rows: [
          ["4 and 5", "Market value and taxable value at 31 December 2026: nominal value for accounts and claims, closing price on the last trading day of December for listed securities"],
          ["6, category A", "Gross Swiss income that suffered the 35% withholding tax (dividends, bond interest, interest on accounts above CHF 200 a year)"],
          ["7, category B", "Income not subject to withholding tax: foreign securities and assets, interest on accounts up to CHF 200 a year, private loans, mortgage claims, lottery winnings not subject to withholding tax"],
        ],
        caption: "Source: 2025 general guide, pages 22 to 25, Jura Service des contributions.",
      },
      { type: "path", items: ["Titres", "Sélection des titres"] },
      {
        type: "p",
        text: "In JuraTax, the **« Titres »** (securities) section starts with a **selection** (« Sélection des titres »): accounts and savings books, shares and investment funds, partial taxation of dividends, bonds, loans, miscellaneous, bank tax statements, DA-1 / R-US sheet, lottery winnings, administration fees, as well as shares in estates and gifts received or made. JuraTax builds the securities list (form 5A) from them.",
      },
      {
        type: "screenshot",
        file: "06-selection-titres.webp",
        alt: "JuraTax 2025 « Sélection des titres » screen: accounts and savings books, shares and funds, dividends, bonds, loans, miscellaneous, bank tax statements, DA-1 / R-US, lottery winnings, administration fees, estates and gifts",
        caption: "Selecting securities: each ticked box opens an entry screen (JuraTax 2025)",
      },
      {
        type: "p",
        text: "Each **account** is entered with the bank, number, currency, opening or closing dates in 2026, **gross interest**, the **subject to withholding tax** box (« Soumis à l'impôt anticipé ») and the **balance on 31 December**. For a **share or fund**, enter the **security number** (ISIN or valor): the **« Chercher un titre »** (find a security) and **« Liste des cours »** (price list) buttons automatically fill in the name, the 31 December price and dividends from the Federal Tax Administration's official list. You then only enter the number of securities.",
      },
      {
        type: "screenshot",
        file: "06-comptes.webp",
        alt: "JuraTax 2025 accounts and savings books screen: origin, bank, account number, currency, opening and closing dates, gross income, withholding tax, balance at 31 December, account fees",
        caption: "One screen per account: gross interest, withholding tax and balance on 31 December (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "06-actions.webp",
        alt: "JuraTax 2025 shares / investment funds screen: security number with Chercher un titre and Liste des cours buttons, number of securities, currency, income and tax value per security",
        caption: "With the security number, JuraTax fills in the price and dividends from the official list (JuraTax 2025)",
      },

      { type: "h2", id: "ereleve", text: "Import your bank's electronic tax statement" },
      {
        type: "p",
        text: "Since 2022, **JuraTax Online** imports **electronic tax statements** (« eRelevés fiscaux ») in the PDF format produced by your bank. The details load automatically into the securities sections (accounts, savings books, shares) and **debts**, and the PDF is added to the supporting documents sent electronically. Then check each line: an account closed last year may remain after carrying over last year's data and must be deleted. The **self-employed and farmers** must keep private and business items separate. The **desktop program** has no import: tick « **Relevés fiscaux bancaires, relevés supplémentaires** » (bank tax statements) in the securities selection and copy, for each statement, the bank, income with and without withholding tax, fees and tax value. The tax statement must **always be enclosed** with the return.",
      },
      {
        type: "screenshot",
        file: "06-releves-fiscaux.webp",
        alt: "JuraTax 2025 bank tax statements screen: list of statements with bank, description, gross income with and without withholding tax, fees, tax value, and totals from supplementary statements",
        caption: "In the desktop program, each bank tax statement is summarised on one line: income, fees and tax value; the statement itself must always be enclosed (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "No eRelevé: enclose the tax statement",
        text: "If you enter your securities by hand or use the desktop program, **enclose your custody account's tax statement** with the securities list. For any **purchase or sale** of securities in 2026, also enclose the **purchase and sale slips**. Official prices are on ictax.admin.ch; the desktop program loads them when it updates.",
      },

      { type: "h2", id: "crypto", text: "Cryptocurrencies, unlisted securities and foreign currencies" },
      {
        type: "list",
        items: [
          "**Cryptocurrencies**: one line per currency, at the rate published by the Federal Tax Administration (ICTax) on 31 December, otherwise the platform's rate. Gains from selling are not taxable for a private investor.",
          "**Foreign currencies**: enter the market price and the conversion rate from the official 2026 price list.",
          "**Unlisted securities**: market value under circular no. 28 of the Swiss Tax Conference. If the 2026 value is not yet known, provisionally enter the value at 31 December 2025.",
          "**Unlisted Swiss holdings**: they are taxed at a reduced value, the tax value minus **30% of the difference** between tax value and nominal value. For Jura companies, this value appears on the notice sent to the board of directors.",
          "**Non-taxable assets**: do not declare your pillar 2, pillar 3a or vested benefits accounts.",
        ],
      },

      { type: "h2", id: "da1", text: "US securities and foreign taxes: DA-1 and R-US" },
      {
        type: "p",
        text: "**US** securities with additional US withholding are not listed on form 5A but on the **supplementary sheet DA-1/R-US**. It is also used to claim **credit for foreign taxes** withheld on 2026 dividends and interest (forms DA-2 and DA-3 for other cases). **German** dividends also go on the DA-1/R-US. Without the DA-1/R-US enclosed, **no refund** is made. The forms can be downloaded from jura.ch, under « Formulaires impôts spéciaux » (special tax forms).",
      },

      { type: "h2", id: "impot-anticipe", text: "Swiss withholding tax refund" },
      {
        type: "p",
        text: "The **35%** withholding tax deducted from Swiss income is refunded if you declare **all** securities and their income on form 5A and **live in the canton of Jura on 31 December**. It is refunded separately once your securities list has been processed if it exceeds **CHF 500**; a smaller amount is credited as a tax payment for the following year. An undeclared security forfeits the refund and exposes you to back taxes and a fine.",
      },

      { type: "h2", id: "loterie-frais", text: "Lottery winnings and management fees" },
      {
        type: "list",
        items: [
          "**Lotteries and gambling**: for cantonal tax, a single win is exempt up to **CHF 1,000,000**; above that, it is taxed separately at a unit rate of **2%**. Stakes are deducted at **5%**, up to **CHF 5,000**. Enclose the original proof and report to the withholding tax unit in Delémont.",
          "**Securities management fees**: only actual fees for management entrusted to third parties in an open custody account are deductible, for the portion subject to VAT. Purchase and sale commissions and advisory fees are not. They must be documented.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I import an eRelevé fiscal into JuraTax?",
        a: "In JuraTax Online, import the PDF electronic tax statement provided by your bank: accounts, securities and debts fill in automatically and the PDF is attached to your supporting documents. The desktop program cannot send supporting documents electronically.",
      },
      {
        q: "How do I declare cryptocurrencies in Jura?",
        a: "On the securities list (form 5A), together with shares and bonds, one line per currency, at the Federal Tax Administration's ICTax rate on 31 December. Private capital gains are not taxable.",
      },
      {
        q: "When is Swiss withholding tax refunded in Jura?",
        a: "Separately, once the securities list has been processed, if it exceeds CHF 500. Below that, it is credited as a payment on the following year's tax. You must live in the canton of Jura on 31 December.",
      },
      {
        q: "Do I declare my pillar 3a on the securities list?",
        a: "No. Pillar 3a, pillar 2 and vested benefits balances are not taxable until paid out and are not declared. Only the year's 3a contributions are deducted, under code 520.",
      },
    ],
  },
};
