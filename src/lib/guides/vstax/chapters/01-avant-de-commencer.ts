import type { GuideChapter } from "../../types";

export const avantDeCommencer: GuideChapter = {
  slug: "avant-de-commencer",
  readTime: 7,
  fr: {
    title: "Avant de commencer VSTax : installation, numéros et mot de passe, délais 2027",
    navTitle: "Avant de commencer",
    metaTitle: "VSTax 2026 : installer, numéro de contribuable, délai et prolongation",
    metaDescription:
      "Télécharger VSTax (Windows, Mac, Linux), numéro de contribuable, numéro de dossier et mot de passe, délai du 31 mars 2027, prolongation à CHF 20 et documents à réunir.",
    keywords: [
      "vstax télécharger",
      "vstax mac",
      "vstax mot de passe",
      "numéro de contribuable valais",
      "délai déclaration impôt valais 2027",
      "prolongation délai impôt valais",
    ],
    summary: [
      "VSTax est un **programme gratuit à installer** (Windows, macOS, Linux). Il existe **une version par année fiscale** : la déclaration 2026 se remplit avec VSTax 2026.",
      "Pour commencer, il faut le **numéro de contribuable**, le **numéro de dossier** et le **mot de passe** de 10 caractères, tous imprimés sur la déclaration papier ou la feuille d'information reçue du SCC.",
      "Délai en principe au **31 mars 2027**. Une prolongation s'obtient en payant **CHF 20** avec le bulletin joint, avant le 31 mars : délai en principe au 31 juillet, au 31 octobre pour les indépendants.",
      "Créez la déclaration **avec reprise des données de l'année précédente** pour repartir de votre fichier de l'an dernier.",
    ],
    blocks: [
      { type: "h2", id: "installer", text: "Télécharger et installer VSTax" },
      {
        type: "table",
        head: ["Système", "Versions proposées"],
        rows: [
          ["Windows 10 et 11", "Installateur .msi 64 bits ou 32 bits"],
          ["macOS 11 ou plus récent", "Paquet .pkg pour processeur Intel ou Apple (ARM)"],
          ["Linux", "Paquets .deb et .rpm 64 bits, distribution de référence Ubuntu 24.04"],
        ],
        caption: "Source : page « VSTax 2025 » de vs.ch (version 1.0.10). Java est inclus, il n'y a rien d'autre à installer.",
      },
      {
        type: "p",
        text: "Il existe **une version de VSTax par année fiscale** : pour la déclaration 2026, il faut VSTax 2026, qui paraît au début de l'année 2027. Une version d'une autre année ne peut pas servir à déposer la déclaration. Téléchargez-la uniquement sur [vs.ch/vstax](https://www.vs.ch/vstax). Le programme fonctionne **en français ou en allemand** (choix sur l'écran d'accueil) et il n'en existe **pas de version en ligne**.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Un problème d'installation ?",
        text: "La hotline technique VSTax répond au **058 660 22 11** (gratuit depuis la Suisse), de 9 h à 11 h et de 14 h à 17 h les jours ouvrables. Pour une question fiscale, passez par le formulaire de contact de votre commune sur vs.ch.",
      },

      { type: "h2", id: "numeros", text: "Numéro de contribuable, numéro de dossier et mot de passe" },
      {
        type: "p",
        text: "Le **numéro de contribuable** et le **numéro de dossier** figurent en haut à gauche de la première page de la déclaration papier. Le numéro de contribuable a le format **111.222.333.44**. Le **mot de passe** compte **10 lettres et chiffres** et respecte les majuscules : il est imprimé sous votre adresse en page 1 de la déclaration, ou en bas de la page 2 de la feuille d'information. Il ne sert qu'à la fin, pour transmettre la déclaration par internet.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Saisissez le nom exactement comme sur la déclaration",
        text: "VSTax vérifie que le numéro de contribuable correspond au **nom et au prénom** saisis. Si le message « Le numéro de contribuable saisi semble ne pas être le bon » apparaît alors que le numéro est juste, reprenez l'orthographe du nom imprimée par le SCC (nom de famille actuel, sans abréviation).",
      },
      {
        type: "p",
        text: "Si vous remplissez votre déclaration avec VSTax, le SCC ne vous envoie plus, l'année suivante, le formulaire papier complet, mais seulement une **information sur les données de base** de votre dossier, avec vos numéros et votre mot de passe. Gardez ce courrier.",
      },

      { type: "h2", id: "delais", text: "Délai de dépôt et prolongation" },
      {
        type: "table",
        head: ["Étape", "Règle"],
        rows: [
          ["Délai initial", "31 mars de l'année qui suit, soit le 31 mars 2027 pour la déclaration 2026"],
          ["Prolongation", "Payer l'émolument de CHF 20 avec le bulletin joint à la déclaration, impérativement avant le 31 mars ; aucune demande écrite n'est nécessaire"],
          ["Nouveau délai, salariés et rentiers", "En principe le 31 juillet"],
          ["Nouveau délai, activité indépendante principale", "En principe le 31 octobre"],
          ["Mandat à une fiduciaire", "Le représentant demande lui-même la prolongation ; le bulletin n'est alors pas utilisé"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, « Délai pour le dépôt de la déclaration ».",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Sans déclaration, une sommation puis une amende",
        text: "Le contribuable qui ne dépose pas sa déclaration dans le délai reçoit une sommation. S'il ne la dépose toujours pas, il est frappé d'une amende d'ordre, qui peut aller jusqu'à CHF 10'000 en cas de récidive.",
      },
      {
        type: "p",
        text: "Le délai vaut aussi pour les **nouveaux contribuables** : la personne qui, en 2026, a commencé à travailler, est devenue majeure ou est arrivée dans le canton du Valais doit remplir une déclaration 2026, même sans avoir reçu de formulaire.",
      },

      { type: "h2", id: "documents", text: "Les documents à réunir" },
      {
        type: "list",
        items: [
          "Certificats de salaire 2026 de chaque employeur, attestations de chômage, d'indemnités maladie ou accident, d'APG.",
          "Attestations de rentes AVS, AI, caisse de pension, rentes viagères.",
          "Relevés bancaires et postaux au 31 décembre 2026, relevés fiscaux électroniques de la banque, relevés de titres et de crypto.",
          "Attestations 3e pilier A, rachats LPP (attestation de la caisse de pension), polices d'assurance-vie avec valeur de rachat.",
          "Décomptes de primes d'assurance-maladie et subsides reçus, factures médicales non remboursées avec ordonnances.",
          "Factures de crèche, d'unité d'accueil pour écoliers ou de maman de jour.",
          "Pour les propriétaires : taxe cadastrale, intérêts hypothécaires, factures d'entretien, loyers encaissés.",
          "Le fichier .vstax de l'an dernier (par défaut dans Documents, dossier VSTAX).",
        ],
      },

      { type: "h2", id: "demarrer", text: "Démarrer : reprendre l'an dernier et choisir le type de déclaration" },
      { type: "path", items: ["Menu de démarrage", "Créer la déclaration d'impôt avec reprise des données de l'année précédente..."] },
      {
        type: "screenshot",
        file: "01-menu-fichier.webp",
        alt: "Menu Fichier de VSTax : menu de démarrage, nouveau, ouvrir, enregistrer sous, déposer la déclaration, impression en mode brouillon",
        caption: "Le menu « Fichier » : « Enregistrer sous... » pour travailler sur une copie, « Déposer la déclaration... » pour la transmission finale (VSTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "Sur l'écran d'accueil, ce bouton ouvre le fichier de l'an dernier et en reprend les données de base : identité, enfants, comptes, titres, dettes, immeubles. Sans fichier précédent, choisissez « **Nouvelle déclaration d'impôt** ». VSTax demande alors le **type de déclaration** :",
      },
      {
        type: "screenshot",
        file: "01-type-declaration.webp",
        alt: "Fenêtre Choisir le type de la déclaration de VSTax : domicilié dans le canton du Valais, hors du canton, hors de la Suisse, succession non partagée",
        caption: "Quatre types de déclaration : la plupart des contribuables choisissent « Domicilié dans le canton du Valais » (VSTax 2025)",
      },
      {
        type: "list",
        items: [
          "**Domicilié dans le canton du Valais** : la déclaration complète, pour toute personne domiciliée en Valais au 31 décembre.",
          "**Domicilié hors du canton du Valais** : pour un propriétaire valaisan domicilié dans un autre canton, typiquement un chalet ou un appartement de vacances. La déclaration est plus courte : le revenu et la fortune totaux servent au calcul du taux.",
          "**Domicilié hors de la Suisse** : même logique pour un propriétaire domicilié à l'étranger.",
          "**Succession non partagée** : depuis 2024, la déclaration d'hoirie se remplit exclusivement avec VSTax ; chaque héritier reporte ensuite sa part dans sa propre déclaration.",
        ],
      },
      {
        type: "p",
        text: "Viennent ensuite les **données personnelles**, présentées au chapitre [Situation personnelle](/guide/vstax/situation-personnelle). VSTax enregistre la déclaration dans un fichier **.vstax25** (pour VSTax 2025) et crée une copie de récupération toutes les 4 minutes. Le programme ne protège pas le fichier par un mot de passe : sur un ordinateur partagé, enregistrez-le sur un support externe.",
      },
    ],
    faq: [
      {
        q: "Où télécharger VSTax 2026 ?",
        a: "Sur vs.ch/vstax, la page du Service cantonal des contributions. VSTax 2026 paraît au début de l'année 2027, en versions Windows, macOS et Linux.",
      },
      {
        q: "Où trouver le mot de passe VSTax ?",
        a: "Sur la première page de la déclaration papier, sous votre adresse, ou en bas de la page 2 de la feuille d'information envoyée par le SCC. Il compte 10 lettres et chiffres et respecte les majuscules.",
      },
      {
        q: "Combien coûte une prolongation du délai en Valais ?",
        a: "CHF 20, à payer avec le bulletin de versement joint à la déclaration avant le 31 mars. Le paiement suffit : le délai est en principe prolongé au 31 juillet, ou au 31 octobre pour les indépendants.",
      },
      {
        q: "Peut-on utiliser VSTax sur Mac ?",
        a: "Oui. VSTax existe pour macOS 11 ou plus récent, en version Intel et en version Apple (ARM), ainsi que pour Windows 10 et 11 et Linux.",
      },
    ],
  },
  en: {
    title: "Before you start VSTax: installation, numbers and password, 2027 deadlines",
    navTitle: "Before you start",
    metaTitle: "VSTax 2026: install, taxpayer number, deadline and extension",
    metaDescription:
      "Download VSTax (Windows, Mac, Linux), taxpayer number, file number and password, 31 March 2027 deadline, CHF 20 extension and the documents you need.",
    keywords: [
      "vstax download",
      "vstax mac",
      "vstax password",
      "valais taxpayer number",
      "valais tax return deadline 2027",
      "valais tax extension",
    ],
    summary: [
      "VSTax is a **free program to install** (Windows, macOS, Linux). There is **one version per tax year**: the 2026 return is completed with VSTax 2026.",
      "To start, you need your **taxpayer number**, your **file number** and the 10-character **password**, all printed on the paper return or the information sheet sent by the SCC.",
      "The deadline is normally **31 March 2027**. You get an extension by paying **CHF 20** with the enclosed slip before 31 March: normally to 31 July, or 31 October if self-employed.",
      "Create the return **with last year's data** (« avec reprise des données de l'année précédente ») to start from last year's file.",
    ],
    blocks: [
      { type: "h2", id: "installer", text: "Downloading and installing VSTax" },
      {
        type: "table",
        head: ["System", "Versions available"],
        rows: [
          ["Windows 10 and 11", ".msi installer, 64-bit or 32-bit"],
          ["macOS 11 or later", ".pkg package for Intel or Apple (ARM) processors"],
          ["Linux", "64-bit .deb and .rpm packages, reference distribution Ubuntu 24.04"],
        ],
        caption: "Source: \"VSTax 2025\" page on vs.ch (version 1.0.10). Java is included, nothing else to install.",
      },
      {
        type: "p",
        text: "There is **one VSTax version per tax year**: for the 2026 return you need VSTax 2026, released early in 2027. A version for another year cannot be used to file. Only download it from [vs.ch/vstax](https://www.vs.ch/vstax). The program runs **in French or German** (choice on the start screen), and there is **no online version**.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Installation problems?",
        text: "The VSTax technical hotline answers on **058 660 22 11** (free from Switzerland), 9 to 11 am and 2 to 5 pm on working days. For tax questions, use your municipality's contact form on vs.ch.",
      },

      { type: "h2", id: "numeros", text: "Taxpayer number, file number and password" },
      {
        type: "p",
        text: "The **taxpayer number** (« N° de contribuable ») and the **file number** (« N° de dossier ») are at the top left of the first page of the paper return. The taxpayer number has the format **111.222.333.44**. The **password** (« mot de passe ») has **10 letters and digits** and is case-sensitive: it is printed below your address on page 1 of the return, or at the bottom of page 2 of the information sheet. You only need it at the end, to file online.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Type your name exactly as on the return",
        text: "VSTax checks that the taxpayer number matches the **surname and first name** you enter. If the message « Le numéro de contribuable saisi semble ne pas être le bon » (the taxpayer number entered seems wrong) appears although the number is right, copy the spelling printed by the SCC (current surname, no abbreviations).",
      },
      {
        type: "p",
        text: "Once you file with VSTax, the SCC no longer sends you the full paper form the next year, only an **information sheet with your file's basic data**, including your numbers and password. Keep that letter.",
      },

      { type: "h2", id: "delais", text: "Filing deadline and extensions" },
      {
        type: "table",
        head: ["Step", "Rule"],
        rows: [
          ["Initial deadline", "31 March of the following year, i.e. 31 March 2027 for the 2026 return"],
          ["Extension", "Pay the CHF 20 fee with the slip enclosed with the return, strictly before 31 March; no written request needed"],
          ["New deadline, employees and pensioners", "Normally 31 July"],
          ["New deadline, main activity self-employed", "Normally 31 October"],
          ["Return prepared by a fiduciary", "The representative requests the extension; you do not use the slip"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, section on the filing deadline.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "No return means a formal reminder, then a fine",
        text: "If the return is not filed on time, you receive a formal reminder (« sommation »). If you still do not file, a disciplinary fine applies, up to CHF 10,000 for repeat cases.",
      },
      {
        type: "p",
        text: "The deadline also applies to **new taxpayers**: anyone who started working, came of age or moved to the canton of Valais in 2026 must file a 2026 return, even without receiving a form.",
      },

      { type: "h2", id: "documents", text: "Documents to gather" },
      {
        type: "list",
        items: [
          "2026 salary certificates from every employer, unemployment, sickness, accident or loss-of-earnings benefit statements.",
          "Pension statements: AHV/AVS, disability insurance, pension fund, life annuities.",
          "Bank and postal statements on 31 December 2026, electronic bank tax statements, securities and crypto statements.",
          "Pillar 3a certificates, pension fund buy-in confirmations, life insurance policies with surrender value.",
          "Health insurance premium statements and subsidies received, unreimbursed medical bills with prescriptions.",
          "Invoices for nursery, after-school care or childminder.",
          "For owners: cadastral value (« taxe cadastrale »), mortgage interest, upkeep invoices, rents received.",
          "Last year's .vstax file (by default in Documents, VSTAX folder).",
        ],
      },

      { type: "h2", id: "demarrer", text: "Getting started: carry over last year and choose the return type" },
      { type: "path", items: ["Menu de démarrage", "Créer la déclaration d'impôt avec reprise des données de l'année précédente..."] },
      {
        type: "screenshot",
        file: "01-menu-fichier.webp",
        alt: "VSTax File menu: start menu, new, open, save as, file the return, draft print",
        caption: "The « Fichier » (file) menu: « Enregistrer sous... » (save as) to work on a copy, « Déposer la déclaration... » to file at the end (VSTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "On the start screen, this button opens last year's file and carries over the basic data: identity, children, accounts, securities, debts, property. Without a previous file, choose « **Nouvelle déclaration d'impôt** » (new return). VSTax then asks for the **return type**:",
      },
      {
        type: "screenshot",
        file: "01-type-declaration.webp",
        alt: "VSTax return type window: resident in the canton of Valais, outside the canton, outside Switzerland, undivided estate",
        caption: "Four return types: most taxpayers choose « Domicilié dans le canton du Valais » (resident in Valais) (VSTax 2025)",
      },
      {
        type: "list",
        items: [
          "« **Domicilié dans le canton du Valais** » (resident in Valais): the full return, for anyone living in Valais on 31 December.",
          "« **Domicilié hors du canton du Valais** » (resident in another canton): for owners of Valais property living elsewhere in Switzerland, typically a chalet or holiday flat. The return is shorter: total income and wealth are used to set the rate.",
          "« **Domicilié hors de la Suisse** » (resident abroad): the same for owners living outside Switzerland.",
          "« **Succession non partagée** » (undivided estate): since 2024, the estate return must be completed in VSTax; each heir then reports their share in their own return.",
        ],
      },
      {
        type: "p",
        text: "Next comes the **personal data** window, covered in [Personal situation](/guide/vstax/situation-personnelle). VSTax saves the return as a **.vstax25** file (for VSTax 2025) and makes a recovery copy every 4 minutes. The program does not password-protect the file: on a shared computer, save it on an external drive.",
      },
    ],
    faq: [
      {
        q: "Where can I download VSTax 2026?",
        a: "From vs.ch/vstax, the cantonal tax service page. VSTax 2026 is released early in 2027, for Windows, macOS and Linux.",
      },
      {
        q: "Where do I find my VSTax password?",
        a: "On the first page of the paper return, below your address, or at the bottom of page 2 of the information sheet sent by the SCC. It has 10 letters and digits and is case-sensitive.",
      },
      {
        q: "How much does a tax return extension cost in Valais?",
        a: "CHF 20, paid with the slip enclosed with the return before 31 March. Payment alone is enough: the deadline is normally extended to 31 July, or 31 October for the self-employed.",
      },
      {
        q: "Is VSTax available in English?",
        a: "No, only in French and German. This guide gives every French label followed by a translation so you can find it on screen.",
      },
    ],
  },
};
