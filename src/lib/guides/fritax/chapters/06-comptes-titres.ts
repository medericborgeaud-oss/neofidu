import type { GuideChapter } from "../../types";

export const comptesTitres: GuideChapter = {
  slug: "comptes-titres",
  readTime: 8,
  fr: {
    title: "Comptes, titres et crypto dans FriTax : l'état des titres (annexe 01), e-relevé et impôt anticipé",
    navTitle: "Comptes et titres",
    metaTitle: "FriTax : remplir l'état des titres, e-relevé, crypto et impôt anticipé (2026)",
    metaDescription:
      "Remplir l'état des titres de FriTax (annexe 01, codes 3.210 et 3.220) : comptes bancaires, actions et ETF par ISIN avec la liste des cours, e-relevé fiscal, cryptomonnaies, gains de loterie, DA-1 et R-US, intérêts d'épargne (4.150) et frais de garde (4.320).",
    keywords: [
      "fritax état des titres",
      "fritax e-relevé",
      "annexe 01 fribourg",
      "crypto déclaration impôt fribourg",
      "impôt anticipé remboursement fribourg",
      "fritax liste des cours isin",
    ],
    summary: [
      "Tous les comptes, titres et cryptomonnaies au 31 décembre 2026 vont dans l'**état des titres (annexe 01)**, qui vaut aussi **demande de remboursement de l'impôt anticipé**.",
      "Rendements **soumis à l'impôt anticipé** dans la colonne 3, **non soumis** dans la colonne 4 ; valeur imposable au 31 décembre selon la liste officielle des cours (ICTax).",
      "Dans FriTax, la barre d'outils de l'état des titres propose **« Listes de cours »** (recherche d'un titre par ISIN), **« Frais d'administration »** et **« eRelevé »** (import du relevé fiscal électronique de la banque).",
      "Déductions liées : intérêts d'épargne (**4.150**, max. CHF 300 couple, CHF 150 seul) et frais de garde des titres (**4.320**, frais effectifs, sans forfait).",
    ],
    blocks: [
      { type: "h2", id: "etat-des-titres", text: "L'état des titres (annexe 01, codes 3.210 et 3.220)" },
      { type: "path", items: ["Formulaires", "Etat des titres"] },
      {
        type: "p",
        text: "L'annexe 01 recense la fortune en titres et placements de capitaux au **31 décembre 2026** (en propriété ou en usufruit), pour vous, votre conjoint et vos enfants mineurs, ainsi que son **rendement en 2026**. Elle sert aussi de **demande de remboursement de l'impôt anticipé** de 35 % retenu sur les intérêts et dividendes suisses. Les totaux sont reportés sous les codes 3.210 (titres et placements) et 3.220 de la déclaration.",
      },
      {
        type: "list",
        items: [
          "**Comptes** : comptes courants, d'épargne, de dépôt et postaux, parts au fonds de rénovation d'une PPE. Si vous joignez le relevé fiscal complet de la banque, il suffit d'indiquer le rendement et la fortune totaux.",
          "**Valeurs mobilières** : obligations, actions, parts de Sàrl et de coopératives, parts de fonds de placement, ETF.",
          "**Autres créances** : prêts, créances hypothécaires, dépôts de primes auprès d'assurances, **cryptomonnaies**, avoirs étrangers de toute nature.",
          "**Gains de loterie** et de jeux de casino en ligne, en Suisse et à l'étranger (voir plus bas).",
        ],
      },
      {
        type: "screenshot",
        file: "06-etat-des-titres.webp",
        alt: "État des titres de FriTax : désignation, colonnes de rendement soumis et non soumis à l'impôt anticipé et valeur imposable au 31 décembre",
        caption: "Page 2 de l'état des titres : barre d'outils (Listes de cours, Frais d'administration, eRelevé) et choix du type de titre, de « Compte bancaire » à « Gain de loterie » (FriTax 2025)",
      },

      { type: "h2", id: "colonnes", text: "Remplir les colonnes" },
      {
        type: "table",
        head: ["Colonne", "Contenu"],
        rows: [
          ["Marge", "« C » pour un titre de la fortune commerciale, « R » pour une participation qualifiée (10 % au moins), « N » pour un titre suisse non coté"],
          ["1 et 2", "Désignation : banque et numéro de compte, nombre et nom du titre, ISIN"],
          ["3", "Rendement brut soumis à l'impôt anticipé (intérêts et dividendes suisses)"],
          ["4", "Rendement non soumis à l'impôt anticipé (titres étrangers, petits intérêts)"],
          ["5 et 6", "Valeur imposable au 31 décembre 2026"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, codes 3.210 et 3.220, « Indications sur la manière de remplir l'état des titres ».",
      },
      {
        type: "p",
        text: "Pour les **titres cotés**, la valeur au 31 décembre est celle des listes officielles de l'Administration fédérale des contributions ([ictax.admin.ch](https://www.ictax.admin.ch)) ; pour un titre coté à l'étranger, le dernier cours de décembre converti au taux de la liste officielle. Les **titres non cotés** s'inscrivent à la valeur fiscale communiquée par la société (à défaut, provisoirement, celle de l'année précédente). Les rendements des fonds de capitalisation sont imposables même s'ils ne sont pas versés.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Titres non cotés : un impôt sur la fortune allégé",
        text: "Le canton de Fribourg réduit de **40 %** le taux moyen de l'impôt sur la fortune pour la part afférente aux actions et parts sociales de sociétés suisses non cotées (lettre « N », code 3.250). Une déduction forfaitaire de 30 % pour restrictions des droits patrimoniaux est aussi possible à certaines conditions.",
      },

      { type: "h2", id: "isin", text: "Saisir une action ou un ETF avec la liste des cours" },
      { type: "path", items: ["Etat des titres", "Page 2", "Listes de cours", "Chercher", "Reprendre"] },
      {
        type: "steps",
        items: [
          "Dans l'état des titres, page 2, cliquez sur « **Listes de cours** » dans la barre du haut : la fenêtre « Liste des cours 2025 » s'ouvre.",
          "Tapez le **numéro de valeur, l'ISIN ou le nom** du titre dans « Numéro de valeur/ISIN/Titre » et cliquez sur « **Chercher** », puis sélectionnez le titre trouvé.",
          "Sous « **Votre quantité** », indiquez le **nombre** de titres (et les dates d'achat ou de vente en cours d'année), puis cliquez sur « **Reprendre** ».",
          "FriTax reprend le cours au 31 décembre et, pour les titres suisses, le rendement soumis à l'impôt anticipé. Vérifiez chaque montant avec votre relevé.",
        ],
      },
      {
        type: "p",
        text: "Pour les titres **américains** (actions et ETF domiciliés aux États-Unis) et les autres titres étrangers avec impôt retenu à la source, FriTax ouvre le formulaire **DA-1 / R-US**, qui sert à l'imputation forfaitaire de l'impôt étranger et à la retenue supplémentaire d'impôt américain. Les valeurs déjà déclarées sur la DA-1 ne se répètent pas dans l'état des titres.",
      },
      {
        type: "screenshot",
        file: "06-liste-des-cours.webp",
        alt: "Fenêtre Liste des cours 2025 de FriTax : recherche par numéro de valeur, ISIN ou titre, quantité et bouton Reprendre",
        caption: "La fenêtre « Liste des cours 2025 » : chercher le titre, indiquer la quantité, puis « Reprendre » (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "06-da1-rus.webp",
        alt: "Page 2 du formulaire DA-1/R-US de FriTax : titres étrangers, rendement brut, impôt étranger non récupérable et retenue supplémentaire USA",
        caption: "Le formulaire DA-1/R-US : une ligne par titre étranger, avec l'État de la source, l'impôt étranger non récupérable et la retenue supplémentaire américaine (FriTax 2025)",
      },

      { type: "h2", id: "e-releve", text: "L'e-relevé fiscal : importer le relevé de la banque" },
      {
        type: "p",
        text: "De nombreuses banques fournissent un **relevé fiscal électronique** (e-relevé, avec code-barres) qui contient tous vos comptes et titres. FriTax sait l'**importer** avec le bouton « **eRelevé** » de l'état des titres : les comptes et titres se remplissent alors automatiquement et les relevés importés apparaissent dans le formulaire « **eRelevé: Liste** ». Le SCC propose un tutoriel vidéo sur l'import de l'e-relevé depuis la page FriTax de fr.ch. Vérifiez que chaque relevé n'est importé qu'une fois et que les comptes ouverts ou fermés en cours d'année y figurent. En cas de dépôt de titres, le **relevé fiscal doit être joint** à la déclaration.",
      },
      {
        type: "screenshot",
        file: "06-e-releve.webp",
        alt: "Import d'un e-relevé fiscal dans FriTax : choix du fichier et aperçu des comptes et titres repris",
        caption: "Le formulaire « eRelevé: Liste » récapitule les relevés électroniques importés (FriTax 2025)",
      },

      { type: "h2", id: "crypto", text: "Cryptomonnaies, or et gains de loterie" },
      {
        type: "list",
        items: [
          "**Cryptomonnaies** : une ligne par monnaie dans l'état des titres, à la valeur au 31 décembre (cours ICTax si disponible, sinon celui de la plateforme). Les gains de cours de la fortune privée sont exonérés, mais les rendements (staking, intérêts) sont imposables.",
          "**Numéraire, or et métaux précieux** (code 3.230) : billets étrangers, or et métaux à la valeur vénale de la liste officielle des cours au 31 décembre.",
          "**Gains de loterie** : à l'impôt cantonal, les gains des loteries et jeux de grande envergure sont imposables dès **CHF 1 million** (CHF 1'070'400 à l'impôt fédéral) ; ceux des jeux d'adresse et loteries promotionnelles dès CHF 1'000 (CHF 1'100 à l'IFD). Les mises sont déduites forfaitairement à 5 % du gain, au plus CHF 5'000 par gain (code 4.320). Les gains en nature sont imposables à 60 %. Les gains réalisés dans les casinos suisses sont exonérés.",
        ],
      },

      { type: "h2", id: "impot-anticipe", text: "Remboursement de l'impôt anticipé" },
      {
        type: "p",
        text: "L'impôt anticipé de 2026 est remboursé ou imputé sur le **décompte final de l'impôt 2026**, sans intérêt. La demande doit être faite dans la déclaration de l'année d'échéance ; le droit s'éteint à la fin de la **troisième année civile** qui suit. Attention : celui qui ne déclare pas un compte ou un titre **perd le droit au remboursement** de l'impôt anticipé correspondant, sauf négligence. Les héritiers d'une **succession non partagée** déclarent chacun leur part dans l'état des titres (code 3.240) : la déclaration vaut demande de remboursement.",
      },

      { type: "h2", id: "deductions", text: "Intérêts d'épargne et frais de garde (codes 4.150 et 4.320)" },
      {
        type: "list",
        items: [
          "**Code 4.150**, intérêts de capitaux d'épargne : FriTax déduit automatiquement jusqu'à **CHF 300** pour un couple et **CHF 150** pour les autres contribuables, sans dépasser les rendements déclarés.",
          "**Code 4.320**, frais d'administration des titres : seulement les **droits de garde**, la location d'un coffre-fort, les frais d'encaissement et les **frais de compte salaire**. Le canton de Fribourg n'accorde **pas de forfait**. Les courtages d'achat et de vente, les frais de conseil et d'établissement de la déclaration ne sont pas déductibles.",
          "**Code 4.160** : 30 % des rendements de **participations qualifiées** (10 % au moins du capital d'une société), calculés dans l'état des titres.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment importer un e-relevé dans FriTax ?",
        a: "Avec le bouton « eRelevé » de l'état des titres, importez le fichier fourni par votre banque : FriTax remplit les comptes et titres automatiquement. Le SCC propose un tutoriel vidéo sur la page FriTax de fr.ch. Vérifiez ensuite les montants avec le relevé.",
      },
      {
        q: "Faut-il déclarer ses cryptomonnaies dans le canton de Fribourg ?",
        a: "Oui, dans l'état des titres (annexe 01), une ligne par monnaie, à la valeur au 31 décembre. Elles font partie de la fortune imposable ; les rendements comme le staking sont imposables.",
      },
      {
        q: "Peut-on déduire des frais bancaires forfaitaires dans FriTax ?",
        a: "Non. Le canton de Fribourg n'accorde aucun forfait pour l'administration des titres. Seuls les droits de garde, la location de coffre et les frais de compte salaire sont déductibles, sous le code 4.320.",
      },
      {
        q: "Comment récupérer l'impôt anticipé dans le canton de Fribourg ?",
        a: "En déclarant les comptes et titres concernés dans l'état des titres, qui vaut demande de remboursement. Le montant est imputé sur le décompte final de l'impôt cantonal 2026.",
      },
    ],
  },
  en: {
    title: "Accounts, securities and crypto in FriTax: the securities list (schedule 01), e-relevé and withholding tax",
    navTitle: "Accounts and securities",
    metaTitle: "FriTax: securities list, electronic bank statement, crypto and withholding tax (2026)",
    metaDescription:
      "Completing the FriTax securities list (schedule 01, codes 3.210 and 3.220): bank accounts, shares and ETFs by ISIN with the price list, electronic tax statements (e-relevé), cryptocurrencies, lottery wins, DA-1 and R-US, savings interest (4.150) and custody fees (4.320).",
    keywords: [
      "fritax securities list",
      "fritax e-relevé",
      "fribourg schedule 01",
      "crypto tax return fribourg",
      "withholding tax refund fribourg",
      "fritax isin price list",
    ],
    summary: [
      "All accounts, securities and cryptocurrencies at 31 December 2026 go in the **securities list (schedule 01, « Etat des titres »)**, which is also your **withholding tax refund claim**.",
      "Income **subject to withholding tax** goes in column 3, income **not subject** in column 4; taxable value at 31 December per the official price list (ICTax).",
      "In FriTax, the securities list toolbar offers **« Listes de cours »** (price lists, to find a security by ISIN), **« Frais d'administration »** (custody fees) and **« eRelevé »** (import your bank's electronic tax statement).",
      "Related deductions: savings interest (**4.150**, max. CHF 300 for couples, CHF 150 single) and custody fees (**4.320**, actual costs, no flat rate).",
    ],
    blocks: [
      { type: "h2", id: "etat-des-titres", text: "The securities list (schedule 01, codes 3.210 and 3.220)" },
      { type: "path", items: ["Formulaires", "Etat des titres"] },
      {
        type: "p",
        text: "Schedule 01 lists your securities and capital investments at **31 December 2026** (owned or held in usufruct), for you, your spouse and your minor children, and their **income in 2026**. It also serves as the **claim for refund of the 35% Swiss withholding tax** deducted from Swiss interest and dividends. Totals are carried over to codes 3.210 (securities and investments) and 3.220 of the return.",
      },
      {
        type: "list",
        items: [
          "**Accounts**: current, savings, deposit and postal accounts, shares in a condominium renovation fund. If you attach the bank's full tax statement, entering total income and total wealth is enough.",
          "**Securities**: bonds, shares, shares in limited companies and cooperatives, investment fund units, ETFs.",
          "**Other claims**: loans, mortgage claims, premium deposits with insurers, **cryptocurrencies**, foreign assets of all kinds.",
          "**Lottery wins** and online casino winnings, in Switzerland and abroad (see below).",
        ],
      },
      {
        type: "screenshot",
        file: "06-etat-des-titres.webp",
        alt: "FriTax securities list: description, income columns subject and not subject to withholding tax, and taxable value at 31 December",
        caption: "Securities list, page 2: toolbar (price lists, custody fees, eRelevé) and choice of security type, from « Compte bancaire » to « Gain de loterie » (FriTax 2025)",
      },

      { type: "h2", id: "colonnes", text: "Filling in the columns" },
      {
        type: "table",
        head: ["Column", "Content"],
        rows: [
          ["Margin", "« C » for a business asset, « R » for a qualifying holding (at least 10%), « N » for an unlisted Swiss security"],
          ["1 and 2", "Description: bank and account number, number and name of securities, ISIN"],
          ["3", "Gross income subject to withholding tax (Swiss interest and dividends)"],
          ["4", "Income not subject to withholding tax (foreign securities, small interest amounts)"],
          ["5 and 6", "Taxable value at 31 December 2026"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, codes 3.210 and 3.220, instructions on completing the securities list.",
      },
      {
        type: "p",
        text: "For **listed securities**, the 31 December value is the one on the Federal Tax Administration's official lists ([ictax.admin.ch](https://www.ictax.admin.ch)); for a security listed abroad, the last December price converted at the official list rate. **Unlisted securities** are entered at the tax value provided by the company (if unavailable, provisionally last year's). Income from accumulating funds is taxable even when not paid out.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Unlisted securities: lighter wealth tax",
        text: "Fribourg reduces the average wealth tax rate by **40%** for the portion relating to shares in unlisted Swiss companies (letter « N », code 3.250). A 30% flat-rate deduction for restricted property rights is also possible under certain conditions.",
      },

      { type: "h2", id: "isin", text: "Entering a share or ETF with the price list" },
      { type: "path", items: ["Etat des titres", "Page 2", "Listes de cours", "Chercher", "Reprendre"] },
      {
        type: "steps",
        items: [
          "In the securities list, page 2, click « **Listes de cours** » (price lists) in the top bar: the « Liste des cours 2025 » window opens.",
          "Type the security's **valor number, ISIN or name** in « Numéro de valeur/ISIN/Titre » and click « **Chercher** » (search), then select the security found.",
          "Under « **Votre quantité** » (your quantity), enter the **number** of units (and purchase or sale dates during the year), then click « **Reprendre** » (apply).",
          "FriTax fills in the 31 December price and, for Swiss securities, the income subject to withholding tax. Check every amount against your statement.",
        ],
      },
      {
        type: "p",
        text: "For **US** securities (US-domiciled shares and ETFs) and other foreign securities with tax withheld at source, FriTax opens the **DA-1 / R-US** form, used for the flat-rate credit of foreign tax and the additional US withholding. Assets already declared on the DA-1 are not repeated in the securities list.",
      },
      {
        type: "screenshot",
        file: "06-liste-des-cours.webp",
        alt: "FriTax « Liste des cours 2025 » window: search by valor number, ISIN or name, quantity and the Reprendre button",
        caption: "The « Liste des cours 2025 » window: search for the security, enter the quantity, then « Reprendre » (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "06-da1-rus.webp",
        alt: "FriTax DA-1/R-US form, page 2: foreign securities, gross income, non-recoverable foreign tax and additional US withholding",
        caption: "The DA-1/R-US form: one line per foreign security, with the source country, non-recoverable foreign tax and additional US withholding (FriTax 2025)",
      },

      { type: "h2", id: "e-releve", text: "The e-relevé: importing your bank's tax statement" },
      {
        type: "p",
        text: "Many banks provide an **electronic tax statement** (« e-relevé », with a barcode) covering all your accounts and securities. FriTax can **import** it with the « **eRelevé** » button of the securities list: accounts and securities then fill in automatically, and imported statements appear in the « **eRelevé: Liste** » form. The SCC offers a video tutorial on importing an e-relevé from the FriTax page on fr.ch. Make sure each statement is imported only once and that accounts opened or closed during the year are included. If you hold a securities account, the **tax statement must be attached** to the return.",
      },
      {
        type: "screenshot",
        file: "06-e-releve.webp",
        alt: "Importing an electronic tax statement in FriTax: choosing the file and previewing the accounts and securities carried over",
        caption: "The « eRelevé: Liste » form lists the electronic statements imported (FriTax 2025)",
      },

      { type: "h2", id: "crypto", text: "Cryptocurrencies, gold and lottery wins" },
      {
        type: "list",
        items: [
          "**Cryptocurrencies**: one line per currency in the securities list, at the 31 December value (ICTax rate if available, otherwise the platform's). Price gains on private assets are tax-free, but income (staking, interest) is taxable.",
          "**Cash, gold and precious metals** (code 3.230): foreign banknotes, gold and metals at market value per the official price list at 31 December.",
          "**Lottery wins**: for cantonal tax, wins from large-scale lotteries and games are taxable from **CHF 1 million** (CHF 1,070,400 for federal tax); wins from games of skill and promotional lotteries from CHF 1,000 (CHF 1,100 federal). Stakes are deducted at a flat 5% of the win, up to CHF 5,000 per win (code 4.320). Wins in kind are taxable at 60%. Winnings in Swiss casinos are tax-free.",
        ],
      },

      { type: "h2", id: "impot-anticipe", text: "Withholding tax refund" },
      {
        type: "p",
        text: "Withholding tax deducted in 2026 is refunded or credited in the **final 2026 tax statement**, without interest. The claim must be made in the return for the year it was deducted; the right expires at the end of the **third calendar year** after that. Note: if you fail to declare an account or security, you **lose the right to a refund** of the related withholding tax, unless it was due to negligence. Heirs of an **undivided estate** each declare their share in the securities list (code 3.240): the return serves as the refund claim.",
      },

      { type: "h2", id: "deductions", text: "Savings interest and custody fees (codes 4.150 and 4.320)" },
      {
        type: "list",
        items: [
          "**Code 4.150**, interest on savings: FriTax automatically deducts up to **CHF 300** for a couple and **CHF 150** for other taxpayers, but not more than the income declared.",
          "**Code 4.320**, securities administration costs: only **custody fees**, safe-deposit box rental, collection fees and **salary account fees**. Fribourg grants **no flat rate**. Brokerage fees, investment or tax advice and the cost of preparing your return are not deductible.",
          "**Code 4.160**: 30% of income from **qualifying holdings** (at least 10% of a company's capital), worked out in the securities list.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I import an e-relevé into FriTax?",
        a: "With the « eRelevé » button of the securities list, import the file provided by your bank: FriTax fills in the accounts and securities automatically. The SCC offers a video tutorial on the FriTax page of fr.ch. Then check the amounts against the statement.",
      },
      {
        q: "Do I need to declare crypto in Fribourg?",
        a: "Yes, in the securities list (schedule 01), one line per currency, at the 31 December value. Crypto is part of taxable wealth; income such as staking is taxable.",
      },
      {
        q: "Can I deduct flat-rate bank fees in FriTax?",
        a: "No. Fribourg grants no flat rate for securities administration. Only custody fees, safe-deposit box rental and salary account fees are deductible, under code 4.320.",
      },
      {
        q: "How do I get Swiss withholding tax back in Fribourg?",
        a: "By declaring the accounts and securities concerned in the securities list, which serves as the refund claim. The amount is credited in the final 2026 cantonal tax statement.",
      },
    ],
  },
};
