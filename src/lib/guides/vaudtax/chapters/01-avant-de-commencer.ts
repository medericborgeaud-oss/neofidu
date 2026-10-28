import type { GuideChapter } from "../../types";

export const avantDeCommencer: GuideChapter = {
  slug: "avant-de-commencer",
  readTime: 6,
  fr: {
    title: "VaudTax : documents à réunir, délais et accès à la déclaration en ligne",
    navTitle: "Avant de commencer",
    metaTitle: "VaudTax 2026 : documents, délais et connexion | Guide NeoFidu",
    metaDescription:
      "Ce qu'il faut préparer avant d'ouvrir VaudTax : liste des documents, numéro de contribuable et code de contrôle, délai du 15 mars et prolongation.",
    keywords: [
      "vaudtax",
      "vaudtax en ligne",
      "code de contrôle vaudtax",
      "délai déclaration impôt vaud",
      "documents déclaration impôt vaud",
      "prolongation délai impôt vaud",
    ],
    summary: [
      "Depuis la déclaration 2025, **VaudTax n'existe plus qu'en ligne** : plus de logiciel à installer, tout se fait dans le navigateur (ordinateur, tablette ou smartphone).",
      "Pour vous connecter, il faut votre **numéro de contribuable** et votre **code de contrôle**, imprimés sur le formulaire A3 reçu par la poste.",
      "Le délai légal est le **15 mars**. Si vous êtes domicilié en Suisse, l'ACI tolère un dépôt jusqu'au **30 juin** sans demande, et une prolongation gratuite est possible en ligne (e-Délai).",
      "VaudTax **ne sauvegarde pas automatiquement** : enregistrez régulièrement votre fichier .vaudtax sur votre appareil.",
    ],
    blocks: [
      { type: "h2", id: "vaudtax-en-ligne", text: "VaudTax en 2026 : uniquement en ligne" },
      {
        type: "p",
        text: "L'Administration cantonale des impôts (ACI) a abandonné le logiciel VaudTax à installer : il n'est plus produit depuis la déclaration 2025. On remplit désormais sa déclaration dans la **prestation en ligne VaudTax**, accessible 24h/24 depuis [vd.ch/vaudtax](https://www.vd.ch/vaudtax), sans installation. Les navigateurs récents sont supportés (Chrome, Edge, Firefox, Safari).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Pas de sauvegarde automatique",
        text: "Si vous fermez l'onglet sans sauvegarder, vos saisies sont perdues. Utilisez le bouton **« Sauvegarder la déclaration sur son poste de travail »** après chaque rubrique importante. Chaque sauvegarde crée un fichier **.vaudtax** (souvent dans votre dossier Téléchargements) qui contient vos saisies et les justificatifs joints.",
      },
      {
        type: "p",
        text: "Ce fichier ne s'ouvre pas en double-cliquant dessus : il faut le réimporter dans VaudTax en ligne pour reprendre votre travail. L'an prochain, il vous servira aussi à reprendre les données de l'année précédente.",
      },

      { type: "h2", id: "codes", text: "Numéro de contribuable et code de contrôle" },
      {
        type: "p",
        text: "Au début de l'année, vous recevez par la poste une grande enveloppe A3 avec le « Formulaire de transmission de la déclaration d'impôt ». Vous y trouvez votre **numéro de contribuable** et votre **code de contrôle**. Ce sont les deux seules informations nécessaires pour ouvrir votre déclaration.",
      },
      {
        type: "list",
        items: [
          "Gardez ce formulaire jusqu'à la fin de la procédure : il sert aussi pour un éventuel envoi papier des justificatifs.",
          "Si VaudTax indique que le numéro et le code ne correspondent pas, vérifiez les deux sur le formulaire A3 (confusion fréquente entre 0 et O, 1 et I).",
          "Vous venez d'arriver dans le canton et n'avez rien reçu ? Les nouveaux contribuables reçoivent d'abord un formulaire pour fixer les acomptes, puis la déclaration au début de l'année suivante.",
        ],
      },
      { type: "h3", text: "L'écran de connexion" },
      {
        type: "steps",
        items: [
          "Ouvrez [vd.ch/vaudtax](https://www.vd.ch/vaudtax) et cliquez sur « Commencer ».",
          "Choisissez la **période fiscale** : pour la déclaration remplie au printemps 2027, ce sera « Période fiscale 2026 ».",
          "Saisissez votre **numéro de contribuable** et votre **code de contrôle**.",
          "Validez la vérification anti-robot (Cloudflare), puis cliquez sur **« Suivant »**.",
        ],
      },
      { type: "screenshot", file: "01-connexion.webp", alt: "Écran de connexion VaudTax : choix de la période fiscale, numéro de contribuable, code de contrôle et mode simulation", caption: "L'écran de connexion de VaudTax en ligne (version de la déclaration 2025)" },
      {
        type: "callout",
        tone: "tip",
        title: "Le mode simulation : essayer sans codes",
        text: "Cochez **« Accéder en simulation »** pour utiliser VaudTax sans numéro de contribuable ni code de contrôle. Toutes les fonctions sont disponibles, y compris l'estimation de l'impôt, sauf la transmission de la déclaration. Pratique pour s'entraîner, estimer son impôt avant d'avoir reçu le formulaire, ou suivre ce guide sans risque.",
      },
      { type: "h3", text: "Mode guidé ou mode autonome ?" },
      {
        type: "p",
        text: "Pour une nouvelle déclaration, VaudTax propose ensuite de reprendre le fichier de l'an dernier ou de partir de zéro, puis de choisir un **mode de saisie**. Le **mode guidé** affiche tous les formulaires dans le menu : c'est le plus sûr pour ne rien oublier, et c'est celui que suit ce guide. Le **mode autonome** n'affiche que les formulaires choisis. On peut changer de mode à tout moment (menu « Outils », lien « Type de saisie »).",
      },
      { type: "screenshot", file: "00-mode-saisie.webp", alt: "Choix entre le mode guidé et le mode autonome dans VaudTax", caption: "Le choix du mode de saisie (VaudTax 2025, mode simulation, données fictives)" },
      {
        type: "callout",
        tone: "info",
        text: "Commencez par le formulaire **« Identification »** (état civil, commune, adresse) : tant qu'il est incomplet, une partie des autres formulaires reste bloquée.",
      },

      { type: "h2", id: "documents", text: "Les documents à réunir avant de commencer" },
      {
        type: "p",
        text: "Le plus long dans une déclaration, c'est de chercher les papiers. Réunissez-les avant d'ouvrir VaudTax. Pour la déclaration 2026, ce sont les documents de l'année civile 2026 (revenus) et la situation au 31 décembre 2026 (fortune).",
      },
      {
        type: "table",
        head: ["Document", "Où le trouver", "Obligatoire à joindre ?"],
        rows: [
          ["Certificat(s) de salaire de tous vos employeurs", "Remis par l'employeur en janvier ou février", "**Oui**"],
          ["eRelevé fiscal ou relevés des comptes et titres au 31.12", "E-banking, rubrique documents fiscaux", "**Oui** (relevé fiscal / valeurs fiscales des titres)"],
          ["Attestations de versement au 3e pilier A", "Banque ou assurance, en janvier", "**Oui**"],
          ["Attestation de rachat LPP (2e pilier)", "Caisse de pension", "**Oui** dès CHF 10'000, facultatif en dessous"],
          ["Justificatifs de frais de garde (crèche, maman de jour, UAPE)", "Factures de la structure d'accueil", "**Oui**"],
          ["Primes d'assurance-maladie et subsides reçus", "Décompte annuel de votre caisse maladie, décision de subside", "Non, mais le montant est obligatoire"],
          ["Attestations d'indemnités chômage, maladie, accident, APG", "Caisse de chômage, assurance", "Non (à conserver)"],
          ["Attestations de rentes (AVS, AI, LPP)", "Caisse de compensation, caisse de pension", "Non (à conserver)"],
          ["Décompte des intérêts hypothécaires et dettes au 31.12", "Banque", "Non (à conserver)"],
          ["Factures de frais médicaux non remboursés, reçus de dons", "Vos archives", "Non (à conserver)"],
          ["Factures d'entretien d'immeuble (si frais effectifs)", "Vos archives", "Non (à conserver)"],
        ],
        caption: "Source : liste officielle des pièces justificatives de l'ACI Vaud. Les pièces facultatives doivent être conservées et produites sur demande.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Gagnez du temps avec l'eRelevé fiscal",
        text: "Si votre banque le propose, téléchargez l'**eRelevé fiscal** en PDF depuis votre e-banking. VaudTax l'importe et remplit automatiquement vos comptes, titres et dettes. Seul le PDF original fonctionne, pas un scan du relevé papier. Détails au chapitre [Comptes bancaires et titres](/guide/vaudtax/comptes-titres).",
      },

      { type: "h2", id: "delais", text: "Délais : 15 mars, 30 juin et prolongation" },
      {
        type: "table",
        head: ["Échéance", "Ce qui se passe"],
        rows: [
          ["**15 mars 2027**", "Délai légal de dépôt de la déclaration 2026 (ou la date imprimée sur votre formulaire)."],
          ["**31 mars 2027**", "Date conseillée pour un paiement volontaire si vous constatez que vos acomptes sont trop bas (évite des intérêts)."],
          ["**30 juin 2027**", "Délai de tolérance pour les personnes domiciliées en Suisse : dépôt accepté sans demande de prolongation. C'est aussi la date limite pour demander une prolongation."],
          ["**30 septembre 2027**", "Prolongation maximale en principe accordée sur demande e-Délai (gratuite)."],
        ],
        caption: "Dates transposées des règles officielles de la période fiscale 2025 (15 mars, tolérance au 30 juin, e-Délai jusqu'au 30 septembre). La date imprimée sur votre déclaration fait foi.",
      },
      {
        type: "p",
        text: "La demande de prolongation se fait en ligne sur [vd.ch/e-delai](https://www.vd.ch/e-delai), avec votre numéro de contribuable et votre code de contrôle. Si vous ne déposez rien, l'ACI envoie une sommation (émolument de CHF 50) puis peut vous taxer d'office avec une amende.",
      },

      { type: "h2", id: "aide", text: "Où trouver de l'aide officielle" },
      {
        type: "list",
        items: [
          "Dans VaudTax, les **blocs orange** contiennent des explications pour chaque rubrique.",
          "Support technique VaudTax : **021 316 10 40**. Questions fiscales : **021 316 00 00** (Centre d'appels téléphoniques).",
          "Les [instructions générales de l'ACI](https://www.vd.ch/etat-droit-finances/impots/formulaires-directives-et-baremes) détaillent chaque code de la déclaration.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Les noms de rubriques cités dans ce guide sont ceux de la prestation VaudTax de la déclaration 2025. Si l'ACI modifie des intitulés pour 2026, nous mettrons ce guide à jour.",
      },
    ],
    faq: [
      {
        q: "Peut-on encore télécharger le logiciel VaudTax ?",
        a: "Non. L'ACI ne produit plus le logiciel VaudTax depuis la déclaration 2025. Il faut utiliser la prestation en ligne sur vd.ch/vaudtax. Des logiciels privés agréés existent (Dr. Tax, Windfisc, KTax), mais l'ACI n'en assure pas le support.",
      },
      {
        q: "J'ai perdu mon code de contrôle, que faire ?",
        a: "Le code figure sur le formulaire A3 reçu par la poste. Si vous l'avez égaré, contactez le Centre d'appels téléphoniques de l'ACI au 021 316 00 00 avec votre numéro de contribuable.",
      },
      {
        q: "Faut-il signer la déclaration envoyée par VaudTax ?",
        a: "Non. Une déclaration déposée électroniquement n'a pas besoin d'être signée. Conservez en revanche la quittance PDF qui prouve le dépôt.",
      },
      {
        q: "Puis-je remplir VaudTax sur mon téléphone ?",
        a: "Oui, la prestation fonctionne sur smartphone et tablette. Pour une déclaration avec beaucoup de rubriques, un ordinateur reste plus confortable, notamment pour joindre les justificatifs.",
      },
    ],
  },
  en: {
    title: "VaudTax: documents to gather, deadlines and how to log in",
    navTitle: "Before you start",
    metaTitle: "VaudTax 2026: documents, deadlines and login (English guide)",
    metaDescription:
      "What to prepare before opening VaudTax: document checklist, taxpayer number and control code, 15 March deadline and how to get an extension.",
    keywords: [
      "vaudtax english",
      "vaudtax login",
      "vaud tax return deadline",
      "vaud tax return documents",
      "vaud tax extension",
      "how to fill vaudtax",
    ],
    summary: [
      "Since the 2025 tax return, **VaudTax is online only**: there is no software to install, everything runs in your browser.",
      "To log in you need your **taxpayer number** (numéro de contribuable) and your **control code** (code de contrôle), printed on the A3 form you receive by post.",
      "The legal deadline is **15 March**. If you live in Switzerland, the tax office accepts returns until **30 June** without a request, and a free online extension (e-Délai) is available.",
      "VaudTax **does not save automatically**: save your .vaudtax file to your device regularly.",
      "VaudTax is in French only. This guide quotes the exact French labels so you can find them on screen.",
    ],
    blocks: [
      { type: "h2", id: "vaudtax-en-ligne", text: "VaudTax in 2026: online only" },
      {
        type: "p",
        text: "The Vaud cantonal tax administration (ACI) discontinued the downloadable VaudTax software from the 2025 tax return onwards. You now fill in your return in the **VaudTax online service** at [vd.ch/vaudtax](https://www.vd.ch/vaudtax), available 24/7 with no installation. Recent browsers are supported (Chrome, Edge, Firefox, Safari).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "No automatic saving",
        text: "If you close the tab without saving, your entries are lost. Use the button **« Sauvegarder la déclaration sur son poste de travail »** (save the return to your device) after each major section. Each save creates a **.vaudtax** file, usually in your Downloads folder, containing your entries and attached documents.",
      },
      {
        type: "p",
        text: "You cannot open that file by double-clicking it: you re-import it into VaudTax online to continue. Next year, the same file lets you carry over last year's data.",
      },

      { type: "h2", id: "codes", text: "Taxpayer number and control code" },
      {
        type: "p",
        text: "Early in the year you receive a large A3 envelope containing the « Formulaire de transmission de la déclaration d'impôt ». It shows your **taxpayer number** and your **control code**. Those are the only two things you need to open your return.",
      },
      {
        type: "list",
        items: [
          "Keep this form until the process is over: you also need it if you post supporting documents on paper.",
          "If VaudTax says the number and code do not match, check both against the A3 form (0 and O, 1 and I are easy to mix up).",
          "Just moved to the canton of Vaud and received nothing? New taxpayers first receive a form to set provisional instalments, then the tax return early the following year.",
        ],
      },
      { type: "h3", text: "The login screen" },
      {
        type: "steps",
        items: [
          "Open [vd.ch/vaudtax](https://www.vd.ch/vaudtax) and click « Commencer » (start).",
          "Choose the **tax period** (« Période fiscale »): for the return filed in spring 2027, select « Période fiscale 2026 ».",
          "Enter your **taxpayer number** (« Numéro de contribuable ») and **control code** (« Code de contrôle »).",
          "Complete the anti-bot check (Cloudflare), then click **« Suivant »** (next).",
        ],
      },
      { type: "screenshot", file: "01-connexion.webp", alt: "VaudTax login screen: tax period choice, taxpayer number, control code and simulation mode", caption: "The VaudTax online login screen (2025 return version, in French)" },
      {
        type: "callout",
        tone: "tip",
        title: "Simulation mode: try it without codes",
        text: "Tick **« Accéder en simulation »** to use VaudTax without a taxpayer number or control code. Every feature works, including the tax estimate, except submitting the return. Handy to practise, estimate your tax before the form arrives, or follow this guide safely.",
      },
      { type: "h3", text: "Guided or independent mode?" },
      {
        type: "p",
        text: "For a new return, VaudTax then lets you import last year's file or start from scratch, and choose an **input mode**. **Guided mode** (« Mode guidé ») shows every form in the menu: the safest way not to miss anything, and the one this guide follows. **Independent mode** (« Mode autonome ») only shows the forms you pick. You can switch at any time (« Outils » menu, « Type de saisie » link).",
      },
      { type: "screenshot", file: "00-mode-saisie.webp", alt: "Choice between guided and independent mode in VaudTax", caption: "Choosing the input mode (VaudTax 2025, simulation mode, fictitious data)" },
      {
        type: "callout",
        tone: "info",
        text: "Start with the **« Identification »** form (civil status, commune, address): until it is complete, some other forms stay locked.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Taxed at source?",
        text: "If you hold a B or L permit and your salary is taxed at source, you only fill in a VaudTax return in specific cases: gross salary above CHF 120,000, other income or taxable wealth, or a voluntary request for ordinary assessment (deadline 31 March of the following year). See our [withholding tax guide](/blog/impot-source-suisse-guide-complet-2026).",
      },

      { type: "h2", id: "documents", text: "Documents to gather before you start" },
      {
        type: "p",
        text: "The slowest part of a tax return is hunting for paperwork. Gather everything before opening VaudTax. For the 2026 return, you need the documents for calendar year 2026 (income) and your situation on 31 December 2026 (wealth).",
      },
      {
        type: "table",
        head: ["Document", "Where to find it", "Must be attached?"],
        rows: [
          ["Salary certificate(s) from every employer", "Issued by your employer in January or February", "**Yes**"],
          ["eRelevé fiscal or account and securities statements at 31.12", "E-banking, tax documents section", "**Yes** (tax statement / tax values of securities)"],
          ["Pillar 3a contribution certificates", "Bank or insurer, in January", "**Yes**"],
          ["Pension fund (LPP) buy-in certificate", "Pension fund", "**Yes** from CHF 10,000, optional below"],
          ["Childcare invoices (nursery, day parent, after-school care)", "Childcare provider", "**Yes**"],
          ["Health insurance premiums and subsidies received", "Annual statement from your health insurer, subsidy decision", "No, but the amount is mandatory"],
          ["Unemployment, sickness, accident or military pay statements", "Unemployment fund, insurer", "No (keep them)"],
          ["Pension statements (AVS/AHV, AI, LPP)", "Compensation office, pension fund", "No (keep them)"],
          ["Mortgage interest and debt statements at 31.12", "Bank", "No (keep them)"],
          ["Unreimbursed medical bills, donation receipts", "Your files", "No (keep them)"],
          ["Property maintenance invoices (if claiming actual costs)", "Your files", "No (keep them)"],
        ],
        caption: "Source: official ACI Vaud list of supporting documents. Optional documents must be kept and produced on request.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Save time with the eRelevé fiscal",
        text: "If your bank offers it, download the **eRelevé fiscal** PDF from your e-banking. VaudTax imports it and fills in your accounts, securities and debts automatically. Only the original PDF works, not a scan. Details in the [bank accounts and securities](/guide/vaudtax/comptes-titres) chapter.",
      },

      { type: "h2", id: "delais", text: "Deadlines: 15 March, 30 June and extensions" },
      {
        type: "table",
        head: ["Date", "What it means"],
        rows: [
          ["**15 March 2027**", "Legal deadline for the 2026 tax return (or the date printed on your form)."],
          ["**31 March 2027**", "Suggested date for a voluntary payment if your provisional instalments were too low (avoids interest)."],
          ["**30 June 2027**", "Tolerance deadline for Swiss residents: returns accepted without an extension request. Also the last day to request an extension."],
          ["**30 September 2027**", "Maximum extension usually granted through e-Délai (free)."],
        ],
        caption: "Dates carried over from the official rules for tax year 2025 (15 March, tolerance to 30 June, e-Délai up to 30 September). The date printed on your return prevails.",
      },
      {
        type: "p",
        text: "Request an extension online at [vd.ch/e-delai](https://www.vd.ch/e-delai) with your taxpayer number and control code. If you file nothing, the ACI sends a reminder (CHF 50 fee) and may then assess you ex officio with a fine.",
      },

      { type: "h2", id: "aide", text: "Official help" },
      {
        type: "list",
        items: [
          "Inside VaudTax, the **orange boxes** explain each section (in French).",
          "VaudTax technical support: **021 316 10 40**. Tax questions: **021 316 00 00** (call centre).",
          "The [ACI general instructions](https://www.vd.ch/etat-droit-finances/impots/formulaires-directives-et-baremes) explain every code of the return (in French).",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "The section names quoted in this guide are those of the VaudTax online service for the 2025 return. If the ACI renames sections for 2026, we will update this guide.",
      },
    ],
    faq: [
      {
        q: "Can I still download the VaudTax software?",
        a: "No. The ACI stopped producing the VaudTax software from the 2025 return onwards. Use the online service at vd.ch/vaudtax. Approved private software exists (Dr. Tax, Windfisc, KTax), but the ACI does not support it.",
      },
      {
        q: "Is VaudTax available in English?",
        a: "No, VaudTax is in French only. This guide gives the French label of each section with an English explanation, so you can follow along on screen.",
      },
      {
        q: "Do I need to sign a return filed through VaudTax?",
        a: "No. An electronically filed return does not need a signature. Keep the PDF receipt (quittance) as proof of filing.",
      },
      {
        q: "I lost my control code. What should I do?",
        a: "The code is on the A3 form you received by post. If you lost it, call the ACI call centre on 021 316 00 00 with your taxpayer number.",
      },
    ],
  },
};
