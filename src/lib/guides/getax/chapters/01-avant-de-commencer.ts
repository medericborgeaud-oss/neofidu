import type { GuideChapter } from "../../types";

export const avantDeCommencer: GuideChapter = {
  slug: "avant-de-commencer",
  readTime: 7,
  fr: {
    title: "Avant de commencer GeTax : logiciel ou déclaration en ligne, identifiants, délais 2027",
    navTitle: "Avant de commencer",
    metaTitle: "GeTax 2026 : installer, identifiants, délai et prolongation",
    metaDescription:
      "Logiciel GeTax ou déclaration en ligne e-démarches, numéro de contribuable et code déclaration, délai du 31 mars 2027, prolongation payante et documents à réunir.",
    keywords: [
      "getax télécharger",
      "getax en ligne",
      "code déclaration genève",
      "délai déclaration impôt genève 2027",
      "prolongation délai impôt genève",
      "vos identifiants déclaration genève",
    ],
    summary: [
      "Deux outils gratuits : le **logiciel GeTax** à installer (une version par année fiscale) ou la **déclaration en ligne** dans votre espace e-démarches, sans installation.",
      "Pour commencer, il faut le **numéro de contribuable** et le **code déclaration** imprimés sur le courrier « Vos identifiants pour la déclaration », envoyé en janvier.",
      "Délai en principe au **31 mars 2027**. Prolongation payante : **CHF 20** jusqu'à 3 mois, **CHF 40** jusqu'à 5 mois, **CHF 60** au-delà.",
      "Importez le fichier .tax de l'an dernier pour gagner du temps, puis choisissez la **saisie guidée** ou la **saisie formulaire**.",
    ],
    blocks: [
      { type: "h2", id: "outils", text: "Logiciel GeTax ou déclaration en ligne ?" },
      {
        type: "table",
        head: ["", "Logiciel GeTax", "Déclaration en ligne"],
        rows: [
          ["Installation", "Windows 10 ou 11, macOS 12 ou plus récent, Linux (Java 8 ou plus)", "Aucune, navigateur sur ordinateur ou tablette"],
          ["Accès", "Numéro de contribuable et code déclaration", "Compte e-démarches, puis « Gérer ma déclaration »"],
          ["Reprise de l'an dernier", "Import du fichier .tax", "Automatique si la déclaration précédente a été transmise par internet"],
          ["Contrôles et calcul d'impôt", "Oui", "Oui, identiques"],
          ["Dépôt", "Zéro papier ou téléversement", "Zéro papier ou téléversement"],
        ],
        caption: "Source : pages « Télécharger et installer GeTax » et « La déclaration en ligne des particuliers », ge.ch, 2026.",
      },
      {
        type: "p",
        text: "Il existe **une version de GeTax par année fiscale** : pour la déclaration 2026, il faut GeTax 2026, publié en janvier 2027. La version 2025 est sortie le 13 janvier 2026. Téléchargez-la uniquement sur [ge.ch](https://www.ge.ch/getax/telecharger-installer-getax-particuliers) ou getax.ch : l'AFC met en garde contre des courriels frauduleux qui imitent ses envois.",
      },

      { type: "h2", id: "identifiants", text: "Numéro de contribuable et code déclaration" },
      {
        type: "p",
        text: "Le courrier « **Vos identifiants pour la déclaration** » contient deux données : le **numéro de contribuable** (format 333.75.2250-1, saisi sans point ni espace) et le **code déclaration** (8 chiffres et 3 lettres, par exemple 13-222-444 FXL). Avec la e-correspondance, ce courrier n'arrive plus par la poste mais dans votre espace fiscal, sous « Mes courriers reçus ».",
      },
      { type: "path", items: ["Données personnelles", "Déclaration", "Numéro de contribuable", "Code déclaration"] },
      {
        type: "screenshot",
        file: "01-identifiants.webp",
        alt: "Écran Déclaration de GeTax : numéro de contribuable, code déclaration, adresse, commune et état civil",
        caption: "Le premier écran : identifiants, adresse au 31 décembre, commune de domicile et état civil (GeTax 2025, données fictives)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Identifiants perdus ?",
        text: "Retrouvez-les dans votre espace e-démarches ou demandez-les à l'AFC. Sans code, GeTax accepte un code fictif pour remplir la déclaration, mais seul le dépôt papier est alors possible, ce qui est réservé aux déclarations Départ/Décès. Mieux vaut obtenir le vrai code avant de déposer.",
      },
      {
        type: "p",
        text: "Sur le même écran, trois cases déclenchent des pages supplémentaires : adresse différente au 31 décembre, **arrivée dans le canton de Genève** pendant l'année, et **domicile à l'étranger avec statut de quasi-résident** (voir le chapitre [Impôt à la source et TOU](/guide/getax/impot-source-tou)). La **commune** à indiquer est votre commune politique de domicile, qui peut différer de l'adresse postale.",
      },

      { type: "h2", id: "delais", text: "Délai de dépôt et prolongation" },
      {
        type: "table",
        head: ["Étape", "Règle"],
        rows: [
          ["Délai initial", "En principe le 31 mars 2027, date imprimée sur « Vos identifiants »"],
          ["Prolongation jusqu'à 3 mois", "CHF 20"],
          ["Prolongation jusqu'à 5 mois", "CHF 40"],
          ["Prolongation au-delà de 5 mois", "CHF 60"],
          ["Demande en ligne", "Du 1er janvier au 31 octobre, depuis l'espace fiscal ou le formulaire en accès libre"],
          ["Du 1er novembre au 31 décembre", "Uniquement par courrier motivé au Service du registre fiscal"],
        ],
        caption: "Source : « Demander un délai pour ma déclaration d'impôt », ge.ch (émoluments fixés par le REmAFC).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Demandez le délai avant le 31 mars",
        text: "Sans demande de délai, un rappel vous est envoyé après le 31 mars, et ce rappel est lui aussi facturé. Si la déclaration n'arrive toujours pas, l'AFC procède à une taxation d'office.",
      },
      {
        type: "p",
        text: "Si vous êtes imposable à Genève mais domicilié dans un autre canton au 31 décembre (par exemple propriétaire d'un appartement genevois), vous pouvez demander le même délai que votre canton de domicile, par courrier avec le motif « Accord canton domicile ».",
      },

      { type: "h2", id: "documents", text: "Les documents à réunir" },
      {
        type: "list",
        items: [
          "Certificats de salaire 2026 de chaque employeur (obligatoires), attestations de chômage, d'indemnités maladie ou accident.",
          "Relevés bancaires et postaux au 31 décembre 2026, relevés fiscaux ou e-relevés fiscaux de la banque, relevés de titres et de crypto.",
          "Attestations 3e pilier A, rachats LPP (formulaire de la caisse de pension), polices d'assurance-vie avec valeur de rachat.",
          "Décomptes de primes d'assurance-maladie et subsides reçus, frais médicaux non remboursés.",
          "Factures de crèche, parascolaire ou maman de jour, attestations d'allocations familiales.",
          "Pour les propriétaires : avis de valeur fiscale, intérêts hypothécaires, factures d'entretien.",
          "Le fichier .tax de l'an dernier, ou l'accès à votre déclaration précédente en ligne.",
        ],
      },

      { type: "h2", id: "demarrer", text: "Démarrer : importer l'an dernier et choisir le mode de saisie" },
      { type: "path", items: ["Fichier", "Importer..."] },
      {
        type: "screenshot",
        file: "01-menu-fichier.webp",
        alt: "Menu Fichier de GeTax : Nouveau, Déclaration Départ/Décès, Ouvrir, Importer, Enregistrer, Imprimer mode brouillon, Déposer - Téléverser",
        caption: "Le menu « Fichier » : « Importer... » reprend la déclaration de l'an dernier, « Déposer - Téléverser » sert à la fin (GeTax 2025)",
      },
      {
        type: "p",
        text: "GeTax propose deux modes, accessibles par les icônes de la barre d'outils : la **saisie guidée** (baguette magique), qui pose les questions écran par écran, et la **saisie formulaire**, qui reproduit la déclaration papier page par page. L'AFC conseille de remplir en mode guidé et de relire en mode formulaire. Les icônes à gauche de chaque écran indiquent son état : point d'exclamation orange à compléter, rouge à corriger, coche verte correcte, point d'interrogation jaune pour un avertissement non bloquant.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Pour une année en cours (départ à l'étranger, décès), il faut utiliser le menu « Fichier », « Déclaration Départ/Décès », dans la dernière version de GeTax disponible.",
      },
    ],
    faq: [
      {
        q: "Où télécharger GeTax 2026 ?",
        a: "Sur la page « Télécharger et installer GeTax pour les particuliers » de ge.ch, ou sur getax.ch. La version 2026 paraît en janvier 2027 ; la version 2025 était disponible dès le 13 janvier 2026.",
      },
      {
        q: "J'ai perdu mon code déclaration, que faire ?",
        a: "Consultez votre espace e-démarches (rubrique « Mes courriers reçus ») ou demandez un nouveau formulaire à l'AFC. Pour un formulaire papier, l'AFC demande votre numéro de contribuable et l'envoie dans un délai de 15 jours au maximum.",
      },
      {
        q: "Combien coûte une prolongation du délai à Genève ?",
        a: "CHF 20 pour une prolongation jusqu'à 3 mois, CHF 40 jusqu'à 5 mois et CHF 60 au-delà. La demande se fait en ligne jusqu'au 31 octobre, ensuite uniquement par courrier motivé.",
      },
      {
        q: "Peut-on utiliser GeTax sur Mac ?",
        a: "Oui. GeTax existe pour Windows 10 et 11, macOS 12 (Monterey) ou plus récent et Linux. Sans installation, la déclaration en ligne fonctionne dans un navigateur, y compris sur tablette.",
      },
    ],
  },
  en: {
    title: "Before you start GeTax: desktop or online return, login details, 2027 deadlines",
    navTitle: "Before you start",
    metaTitle: "GeTax 2026: install, login details, deadline and extension",
    metaDescription:
      "GeTax desktop program or online return in e-démarches, taxpayer number and return code, 31 March 2027 deadline, paid extensions and the documents you need.",
    keywords: [
      "getax download",
      "getax online",
      "geneva tax return code",
      "geneva tax return deadline 2027",
      "geneva tax extension fee",
      "geneva taxpayer number",
    ],
    summary: [
      "Two free tools: the **GeTax desktop program** (one version per tax year) or the **online return** in your e-démarches account, with nothing to install.",
      "To start, you need the **taxpayer number** (« Numéro de contribuable ») and the **return code** (« Code déclaration ») printed on the letter « Vos identifiants pour la déclaration », sent in January.",
      "The deadline is normally **31 March 2027**. Paid extensions: **CHF 20** up to 3 months, **CHF 40** up to 5 months, **CHF 60** beyond.",
      "Import last year's .tax file to save time, then choose **guided entry** or **form entry**.",
    ],
    blocks: [
      { type: "h2", id: "outils", text: "Desktop GeTax or online return?" },
      {
        type: "table",
        head: ["", "GeTax desktop program", "Online return"],
        rows: [
          ["Installation", "Windows 10 or 11, macOS 12 or later, Linux (Java 8 or later)", "None, browser on computer or tablet"],
          ["Access", "Taxpayer number and return code", "e-démarches account, then « Gérer ma déclaration » (manage my return)"],
          ["Last year's data", "Import of the .tax file", "Automatic if last year's return was filed online"],
          ["Checks and tax calculation", "Yes", "Yes, identical"],
          ["Filing", "Paperless or upload", "Paperless or upload"],
        ],
        caption: "Source: ge.ch pages on installing GeTax and on the online return for individuals, 2026.",
      },
      {
        type: "p",
        text: "There is **one GeTax version per tax year**: for the 2026 return you need GeTax 2026, released in January 2027. The 2025 version came out on 13 January 2026. Only download it from [ge.ch](https://www.ge.ch/getax/telecharger-installer-getax-particuliers) or getax.ch: the AFC warns about fraudulent emails imitating its messages. The program can be switched to English, but the return itself stays in French.",
      },

      { type: "h2", id: "identifiants", text: "Taxpayer number and return code" },
      {
        type: "p",
        text: "The letter « **Vos identifiants pour la déclaration** » (your login details for the return) holds two items: the **taxpayer number** (format 333.75.2250-1, entered without dots or spaces) and the **return code** (8 digits and 3 letters, for example 13-222-444 FXL). With e-correspondence, the letter no longer comes by post but appears in your tax account under « Mes courriers reçus » (letters received).",
      },
      { type: "path", items: ["Données personnelles", "Déclaration", "Numéro de contribuable", "Code déclaration"] },
      {
        type: "screenshot",
        file: "01-identifiants.webp",
        alt: "GeTax Declaration screen: taxpayer number, return code, address, municipality and marital status",
        caption: "The first screen: login details, address on 31 December, municipality and marital status (GeTax 2025, fictitious data)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Lost your login details?",
        text: "Find them in your e-démarches account or ask the AFC. Without a code, GeTax accepts a dummy code so you can fill in the return, but only paper filing is then possible, and that is reserved for departure or death returns. Get the real code before filing.",
      },
      {
        type: "p",
        text: "On the same screen, three boxes open extra pages: a different address on 31 December, **arriving in the canton of Geneva** during the year, and **living abroad with quasi-resident status** (see [Source tax and TOU](/guide/getax/impot-source-tou)). The **municipality** (« Commune ») is your municipality of residence, which can differ from your postal address.",
      },

      { type: "h2", id: "delais", text: "Filing deadline and extensions" },
      {
        type: "table",
        head: ["Step", "Rule"],
        rows: [
          ["Initial deadline", "Normally 31 March 2027, the date printed on « Vos identifiants »"],
          ["Extension up to 3 months", "CHF 20"],
          ["Extension up to 5 months", "CHF 40"],
          ["Extension beyond 5 months", "CHF 60"],
          ["Online request", "1 January to 31 October, from your tax account or the open online form"],
          ["1 November to 31 December", "Only by letter with reasons to the tax register service"],
        ],
        caption: "Source: \"Demander un délai pour ma déclaration d'impôt\", ge.ch (fees set by the REmAFC regulation).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Ask for the extension before 31 March",
        text: "Without an extension request, you receive a reminder after 31 March, and the reminder is charged too. If the return still does not arrive, the AFC issues an estimated assessment (« taxation d'office »).",
      },
      {
        type: "p",
        text: "If you are taxable in Geneva but lived in another canton on 31 December (for example, you own a flat in Geneva), you can ask for the same deadline as your canton of residence, by letter with the reason « Accord canton domicile ».",
      },

      { type: "h2", id: "documents", text: "Documents to gather" },
      {
        type: "list",
        items: [
          "2026 salary certificates from every employer (mandatory), unemployment, sickness or accident benefit statements.",
          "Bank and postal statements on 31 December 2026, bank tax statements or e-tax statements, securities and crypto statements.",
          "Pillar 3a certificates, pension fund buy-in confirmations, life insurance policies with surrender value.",
          "Health insurance premium statements and subsidies received, unreimbursed medical costs.",
          "Invoices for nursery, after-school care or childminder, family allowance statements.",
          "For owners: tax value notice, mortgage interest, upkeep invoices.",
          "Last year's .tax file, or access to your previous online return.",
        ],
      },

      { type: "h2", id: "demarrer", text: "Getting started: import last year and choose the entry mode" },
      { type: "path", items: ["Fichier", "Importer..."] },
      {
        type: "screenshot",
        file: "01-menu-fichier.webp",
        alt: "GeTax File menu: New, Departure/Death return, Open, Import, Save, Draft print, File - Upload",
        caption: "The « Fichier » (file) menu: « Importer... » carries over last year's return, « Déposer - Téléverser » (file - upload) is used at the end (GeTax 2025)",
      },
      {
        type: "p",
        text: "GeTax has two modes, available from the toolbar icons: **guided entry** (magic wand), which asks questions screen by screen, and **form entry** (« Saisie formulaire »), which mirrors the paper return page by page. The AFC recommends filling in with guided entry and reviewing in form mode. Icons next to each screen show its status: orange exclamation mark to complete, red to correct, green tick correct, yellow question mark for a non-blocking warning.",
      },
      {
        type: "callout",
        tone: "info",
        text: "For the current year (leaving Switzerland, death), use « Fichier », « Déclaration Départ/Décès » in the latest GeTax version available.",
      },
    ],
    faq: [
      {
        q: "Where can I download GeTax 2026?",
        a: "From the ge.ch page on installing GeTax for individuals, or from getax.ch. The 2026 version is released in January 2027; the 2025 version was available from 13 January 2026.",
      },
      {
        q: "I lost my return code. What should I do?",
        a: "Check your e-démarches account (« Mes courriers reçus ») or ask the AFC for a new form. For a paper form, the AFC asks for your taxpayer number and sends it within 15 days at most.",
      },
      {
        q: "How much does a tax return extension cost in Geneva?",
        a: "CHF 20 for up to 3 months, CHF 40 for up to 5 months and CHF 60 beyond. Requests are made online until 31 October, then only by letter with reasons.",
      },
      {
        q: "Can I use GeTax in English?",
        a: "Yes, the GeTax interface can be switched to English. The return, the codes and AFC letters remain in French, so this guide always gives the French label with a translation.",
      },
    ],
  },
};
