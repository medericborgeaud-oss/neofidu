import type { GuideChapter } from "../../types";

export const avantDeCommencer: GuideChapter = {
  slug: "avant-de-commencer",
  readTime: 7,
  fr: {
    title: "Avant de commencer FriTax : installation, code FriTax, délais et prolongations 2027",
    navTitle: "Avant de commencer",
    metaTitle: "FriTax 2026 : installer, code, délai et prolongation",
    metaDescription:
      "Télécharger FriTax (Windows, Mac, Linux), trouver le code FriTax de 6 caractères, délai du 31 mars 2027, prolongations à CHF 20 jusqu'au 15 décembre, reprise de l'année précédente et documents à réunir.",
    keywords: [
      "fritax télécharger",
      "fritax mac",
      "code fritax",
      "délai déclaration impôt fribourg 2027",
      "prolongation délai impôt fribourg",
      "fritax importer année précédente",
    ],
    summary: [
      "FriTax est un **programme gratuit à installer** (Windows 10 64 bits, macOS 10.15, Linux Ubuntu). Il existe **une version par période fiscale** : la déclaration 2026 se remplit avec FriTax 2026.",
      "Le **code FriTax** (6 lettres et chiffres en majuscules) est imprimé sur la fourre A4 « Déclaration d'impôt ». Il sert à l'envoi électronique, à la fin.",
      "Délai à la date indiquée sur la déclaration, en principe le **31 mars 2027**. Chaque prolongation coûte **CHF 20** : 30 juin, 31 août, 31 octobre, puis 15 décembre au plus tard.",
      "Cliquez sur **« Importer données de l'année précédente »** pour repartir de votre déclaration de l'an dernier.",
    ],
    blocks: [
      { type: "h2", id: "installer", text: "Télécharger et installer FriTax" },
      {
        type: "table",
        head: ["Système", "Version requise"],
        rows: [
          ["Windows", "Windows 10 64 bits ou plus récent (la version 32 bits n'est plus prise en charge depuis la période fiscale 2024)"],
          ["macOS", "macOS 10.15 ou plus récent ; ne déplacez pas le programme après l'installation"],
          ["Linux", "Ubuntu avec interface graphique"],
          ["Tablette, téléphone", "Non pris en charge"],
        ],
        caption: "Source : page « Télécharger FriTax » et FAQ FriTax, fr.ch (état mai 2026).",
      },
      {
        type: "p",
        text: "Il existe **une version de FriTax par période fiscale** : pour la déclaration 2026, il faut FriTax 2026, qui paraît au début de l'année 2027. Une version d'une autre année ne peut pas servir. Téléchargez le programme uniquement sur [fr.ch/fritax](https://www.fr.ch/fritax). FriTax fonctionne **en français ou en allemand** et permet de préparer plusieurs déclarations (au-delà d'une dizaine, il ralentit).",
      },
      {
        type: "callout",
        tone: "info",
        title: "Un problème d'installation ?",
        text: "Si macOS bloque l'installation, autorisez les applications « App Store et développeurs identifiés » dans Réglages système, Confidentialité et sécurité. Pour un problème technique, la hotline FriTax répond au **0900 111 001** (CHF 1 la minute), du lundi au vendredi de 10 h à 12 h et de 14 h à 16 h, ou gratuitement par e-mail à support.impots@drtax.ch. Pour une question fiscale, appelez le SCC au 026 305 33 00.",
      },

      { type: "h2", id: "code-fritax", text: "Le code FriTax" },
      {
        type: "p",
        text: "Le **code FriTax** compte **6 caractères alphanumériques, uniquement en majuscules**. Il est imprimé sur la **fourre A4 « Déclaration d'impôt »** que le SCC vous envoie par la poste. Vous n'en avez pas besoin pour remplir la déclaration : FriTax le demande seulement dans la fenêtre d'**envoi électronique**, avant le téléversement. Gardez donc la fourre à portée de main jusqu'à la fin. Notez aussi votre **numéro de chapitre** et la **référence de service**, imprimés au-dessus de votre adresse : FriTax demande le **numéro de chapitre**, avec la commune de domicile au 31 décembre, dans « Identité », « **Indications sur la déclaration d'impôt** ». Rappelez-les aussi dans tout courrier au SCC.",
      },
      {
        type: "screenshot",
        file: "01-code-fritax.webp",
        alt: "En-tête de la page 1 de la déclaration dans FriTax : champ Code FriTax à saisir dans le dialogue avant le téléversement",
        caption: "En page 1, FriTax rappelle que le code FriTax se saisit dans la fenêtre d'envoi, avant le téléversement (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-numero-chapitre.webp",
        alt: "Formulaire Indications sur la déclaration d'impôt de FriTax : numéro de chapitre et commune de domicile au 31.12.2025",
        caption: "Le numéro de chapitre et la commune de domicile se saisissent dans « Identité », « Indications sur la déclaration d'impôt » (FriTax 2025)",
      },

      { type: "h2", id: "delais", text: "Délai de dépôt et prolongations" },
      {
        type: "table",
        head: ["Étape", "Règle"],
        rows: [
          ["Délai initial", "La date imprimée en haut à droite de la première page de la déclaration, en principe le 31 mars 2027 pour la déclaration 2026"],
          ["1re prolongation", "Payer CHF 20 avec la QR-facture jointe à la déclaration : le délai passe au 30 juin, sans motif ni confirmation écrite"],
          ["Prolongations suivantes", "CHF 20 chacune avec le formulaire reçu quelques jours avant l'échéance : 31 août, 31 octobre, puis 15 décembre"],
          ["Maximum", "4 prolongations ; aucune au-delà du 15 décembre"],
          ["Demande motivée", "Possible par écrit, avec un motif sérieux ; le SCC répond par écrit et facture aussi CHF 20"],
        ],
        caption: "Sources : « Comment obtenir un délai pour le dépôt de la déclaration d'impôt » et calculateur de prolongation des délais, SCC Fribourg. Un délai payé n'est jamais remboursé, qu'il soit utilisé ou non.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Sans déclaration : sommation, taxation d'office et amende",
        text: "Le contribuable qui n'a ni déposé sa déclaration ni obtenu de prolongation reçoit une **sommation** avec un délai de 10 jours. Faute de réponse, il est **taxé d'office** et risque une **amende jusqu'à CHF 1'000**.",
      },
      {
        type: "p",
        text: "Le délai vaut aussi pour les **nouveaux contribuables** : la personne qui, en 2026, a commencé une activité ou un apprentissage, est devenue majeure ou est arrivée dans le canton de Fribourg doit remplir une déclaration 2026. Si vous avez besoin rapidement de votre avis de taxation (subsides, bourse), sachez que le SCC ne traite en priorité que les déclarations **envoyées par voie électronique**.",
      },

      { type: "h2", id: "documents", text: "Les documents à réunir" },
      {
        type: "list",
        items: [
          "Certificats de salaire 2026 de chaque employeur, attestations de chômage, d'indemnités maladie ou accident, d'APG.",
          "Attestations de rentes AVS, AI, caisse de pension, rentes viagères.",
          "Relevés bancaires et postaux au 31 décembre 2026, relevés fiscaux (si possible en e-relevé), relevés de titres et de crypto.",
          "Attestations 3e pilier A, attestation de rachat de la caisse de pension, valeurs de rachat des assurances-vie au 31 décembre.",
          "Décision de réduction de primes d'assurance-maladie (ECAS) si vous en bénéficiez, factures médicales non remboursées.",
          "Factures de crèche, d'accueil extrascolaire ou de maman de jour.",
          "Pour les propriétaires : dernier avis de taxation (valeur locative et valeur fiscale), intérêts hypothécaires, factures d'entretien payées en 2026, loyers encaissés.",
          "La déclaration FriTax de l'an dernier (sur le même ordinateur, ou exportée) et la fourre « Déclaration d'impôt » avec le code FriTax.",
        ],
      },

      { type: "h2", id: "demarrer", text: "Démarrer : reprendre l'an dernier ou créer une nouvelle déclaration" },
      { type: "path", items: ["Écran d'accueil", "Importer données de l'année précédente"] },
      {
        type: "p",
        text: "Sur l'écran d'accueil, ce bouton reprend le fichier de l'an dernier : identité, enfants, comptes et titres, dettes, immeubles. FriTax cherche d'abord les données de l'an dernier dans son dossier standard. S'il ne les trouve pas, il propose de les chercher : répondez « **Oui** » et sélectionnez le fichier de l'année précédente (extension **.FRNP2024** pour une déclaration exportée de FriTax 2024). Si l'import échoue, ouvrez la déclaration de l'an dernier dans l'ancienne version, modifiez une saisie, enregistrez, puis recommencez. Sans fichier précédent, créez une nouvelle déclaration et commencez par la page 1.",
      },
      {
        type: "screenshot",
        file: "01-import-annee-precedente.webp",
        alt: "Message de FriTax : données de l'année précédente introuvables dans le dossier standard, voulez-vous chercher les données à importer ?",
        caption: "Si les données de l'an dernier ne sont pas dans le dossier standard, FriTax propose de les chercher (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-import-fichier.webp",
        alt: "Fenêtre Ouvrir FriTax 2024 fichiers : sélection d'un fichier FR_2024_N.mv.db ou .FRNP2024",
        caption: "Répondez « Oui », puis choisissez le fichier de l'année précédente (FR_2024_N.mv.db ou export .FRNP2024) (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-type-declaration.webp",
        alt: "Fenêtre Nouvelle déclaration d'impôt de FriTax : personnes physiques, sociétés simples et hoiries, sociétés en nom collectif ou en commandite",
        caption: "Pour une nouvelle déclaration, choisissez « Personnes physiques 2025 » ; les hoiries ont leur propre type de déclaration (FriTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Changement d'ordinateur : exportez d'abord",
        text: "Les données restent sur l'ordinateur où vous les avez saisies ; le SCC n'y a pas accès. Avant de changer d'ordinateur, utilisez « **Exporter déclaration d'impôt** » sur l'écran d'accueil, puis importez le fichier sur le nouvel appareil. Sans cette opération, vos données sont perdues.",
      },
      {
        type: "p",
        text: "Vous pouvez ensuite remplir la déclaration **page par page** dans l'onglet **« Formulaires »**, ou vous laisser guider par l'onglet **« Assistant »**, à gauche de l'écran. Les deux mènent au même résultat. La suite de ce guide suit l'ordre des codes de la déclaration, en commençant par la [situation personnelle](/guide/fritax/situation-personnelle).",
      },
      {
        type: "screenshot",
        file: "01-formulaires.webp",
        alt: "Fenêtre principale de FriTax 2025 : onglets Assistant et Formulaires, liste des formulaires, saisie de l'identité et panneau Erreurs",
        caption: "La fenêtre de travail : liste des formulaires à gauche, saisie au centre, erreurs à corriger à droite (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-assistant.webp",
        alt: "Onglet Assistant de FriTax : étapes Identité, déductions sociales, revenu de l'activité, frais d'acquisition, autres revenus et fortune, déductions, divers, calcul d'impôt, impression et envoi électronique",
        caption: "L'onglet « Assistant » guide pas à pas, de l'identité jusqu'à l'envoi électronique ; « Au formulaire » ramène à la page correspondante de la déclaration (FriTax 2025)",
      },
    ],
    faq: [
      {
        q: "Où télécharger FriTax 2026 ?",
        a: "Sur fr.ch/fritax, la page du Service cantonal des contributions. FriTax 2026 paraît au début de l'année 2027, en versions Windows, macOS et Linux.",
      },
      {
        q: "Où trouver le code FriTax ?",
        a: "Sur la fourre A4 « Déclaration d'impôt » envoyée par le SCC. Il compte 6 lettres et chiffres en majuscules et n'est demandé qu'au moment de l'envoi électronique.",
      },
      {
        q: "Combien coûte une prolongation du délai dans le canton de Fribourg ?",
        a: "CHF 20 par prolongation, payés avec la QR-facture jointe à la déclaration. La première repousse le délai du 31 mars au 30 juin. Au maximum quatre prolongations sont possibles, jusqu'au 15 décembre.",
      },
      {
        q: "Peut-on utiliser FriTax sur Mac ?",
        a: "Oui, sur macOS 10.15 ou plus récent. FriTax existe aussi pour Windows 10 64 bits et pour Linux Ubuntu, mais pas pour tablette.",
      },
      {
        q: "Peut-on remplir la déclaration d'une année précédente avec FriTax ?",
        a: "Oui, avec la version de FriTax de l'année concernée, disponible sur la page de téléchargement pour les périodes fiscales précédentes. Chaque version ne sert que pour sa propre période fiscale.",
      },
    ],
  },
  en: {
    title: "Before you start FriTax: installation, FriTax code, 2027 deadlines and extensions",
    navTitle: "Before you start",
    metaTitle: "FriTax 2026: install, FriTax code, deadline and CHF 20 extension",
    metaDescription:
      "Download FriTax (Windows, Mac, Linux), find the 6-character FriTax code, 31 March 2027 deadline, CHF 20 extensions up to 15 December, importing last year's data and documents to gather.",
    keywords: [
      "fritax download",
      "fritax mac",
      "fritax code",
      "fribourg tax return deadline 2027",
      "fribourg tax return extension",
      "fritax import previous year",
    ],
    summary: [
      "FriTax is a **free program you install** (64-bit Windows 10, macOS 10.15, Linux Ubuntu). There is **one version per tax period**: the 2026 return is completed with FriTax 2026.",
      "The **FriTax code** (6 capital letters and digits) is printed on the A4 « Déclaration d'impôt » folder. It is used for electronic filing, at the end.",
      "The deadline is the date printed on the return, normally **31 March 2027**. Each extension costs **CHF 20**: 30 June, 31 August, 31 October, then 15 December at the latest.",
      "Click **« Importer données de l'année précédente »** (import last year's data) to start from last year's return.",
    ],
    blocks: [
      { type: "h2", id: "installer", text: "Download and install FriTax" },
      {
        type: "table",
        head: ["System", "Required version"],
        rows: [
          ["Windows", "64-bit Windows 10 or later (32-bit is no longer supported since the 2024 tax period)"],
          ["macOS", "macOS 10.15 or later; do not move the program after installing it"],
          ["Linux", "Ubuntu with a graphical interface"],
          ["Tablet, phone", "Not supported"],
        ],
        caption: "Source: « Télécharger FriTax » page and FriTax FAQ, fr.ch (May 2026).",
      },
      {
        type: "p",
        text: "There is **one FriTax version per tax period**: for the 2026 return you need FriTax 2026, released early in 2027. A version for another year cannot be used. Download the program only from [fr.ch/fritax](https://www.fr.ch/fritax). FriTax works **in French or German** and lets you prepare several returns (it slows down beyond about ten).",
      },
      {
        type: "callout",
        tone: "info",
        title: "Installation problems?",
        text: "If macOS blocks the installer, allow apps from the « App Store and identified developers » under System Settings, Privacy & Security. For technical issues, the FriTax hotline answers on **0900 111 001** (CHF 1 per minute), Monday to Friday 10:00 to 12:00 and 14:00 to 16:00, or free of charge by email at support.impots@drtax.ch. For tax questions, call the SCC on 026 305 33 00.",
      },

      { type: "h2", id: "code-fritax", text: "The FriTax code" },
      {
        type: "p",
        text: "The **FriTax code** has **6 alphanumeric characters, capitals only**. It is printed on the **A4 « Déclaration d'impôt » folder** the SCC sends you by post. You do not need it to fill in the return: FriTax only asks for it in the **electronic filing** window, before upload. Keep the folder to hand until the end. Also note your **chapter number** (« numéro de chapitre ») and **service reference**, printed above your address: FriTax asks for the **chapter number**, with your municipality of residence on 31 December, under « Identité », « **Indications sur la déclaration d'impôt** » (return details). Also quote them in any letter to the SCC.",
      },
      {
        type: "screenshot",
        file: "01-code-fritax.webp",
        alt: "Header of page 1 of the return in FriTax: FriTax code field to be entered in the dialog before upload",
        caption: "On page 1, FriTax reminds you that the FriTax code is entered in the filing window, before upload (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-numero-chapitre.webp",
        alt: "FriTax « Indications sur la déclaration d'impôt » form: chapter number and municipality of residence at 31.12.2025",
        caption: "The chapter number and municipality of residence are entered under « Identité », « Indications sur la déclaration d'impôt » (FriTax 2025)",
      },

      { type: "h2", id: "delais", text: "Filing deadline and extensions" },
      {
        type: "table",
        head: ["Step", "Rule"],
        rows: [
          ["Initial deadline", "The date printed at the top right of page 1 of the return, normally 31 March 2027 for the 2026 return"],
          ["1st extension", "Pay CHF 20 with the QR bill enclosed with the return: the deadline moves to 30 June, with no reason needed and no written confirmation"],
          ["Further extensions", "CHF 20 each, using the form sent a few days before the deadline: 31 August, 31 October, then 15 December"],
          ["Maximum", "4 extensions; none beyond 15 December"],
          ["Reasoned request", "Possible in writing, with a serious reason; the SCC replies in writing and also charges CHF 20"],
        ],
        caption: "Sources: « Comment obtenir un délai pour le dépôt de la déclaration d'impôt » and the SCC Fribourg extension calculator. A paid extension is never refunded, whether used or not.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "No return: reminder, estimated assessment and fine",
        text: "If you neither file nor obtain an extension, you receive a **formal reminder** with 10 days to file. Without a response you are **assessed by estimate** and may be **fined up to CHF 1,000**.",
      },
      {
        type: "p",
        text: "The deadline also applies to **new taxpayers**: anyone who, in 2026, started work or an apprenticeship, turned 18 or moved to the canton of Fribourg must file a 2026 return. If you need your assessment quickly (for subsidies or a study grant), note that the SCC only fast-tracks returns **filed electronically**.",
      },

      { type: "h2", id: "documents", text: "Documents to gather" },
      {
        type: "list",
        items: [
          "2026 salary certificates from each employer, statements of unemployment, sickness or accident benefits, loss-of-earnings (EO/APG) payments.",
          "AHV, disability, pension fund and life annuity statements.",
          "Bank and postal statements at 31 December 2026, tax statements (electronic « e-relevé » if possible), securities and crypto statements.",
          "Pillar 3a certificates, pension fund buy-in certificate, surrender values of life insurance policies at 31 December.",
          "Health insurance premium reduction decision (ECAS) if you receive one, unreimbursed medical bills.",
          "Invoices for nursery, after-school care or childminder.",
          "For owners: last assessment notice (imputed rent and tax value), mortgage interest, upkeep invoices paid in 2026, rents received.",
          "Last year's FriTax return (on the same computer, or exported) and the « Déclaration d'impôt » folder with the FriTax code.",
        ],
      },

      { type: "h2", id: "demarrer", text: "Getting started: carry over last year or create a new return" },
      { type: "path", items: ["Écran d'accueil", "Importer données de l'année précédente"] },
      {
        type: "p",
        text: "On the start screen, this button carries over last year's file: identity, children, accounts and securities, debts, property. FriTax first looks for last year's data in its standard folder. If it cannot find it, it offers to search: answer « **Oui** » (yes) and select last year's file (extension **.FRNP2024** for a return exported from FriTax 2024). If the import fails, open last year's return in the old version, change one entry, save, then try again. Without a previous file, create a new return and start with page 1.",
      },
      {
        type: "screenshot",
        file: "01-import-annee-precedente.webp",
        alt: "FriTax message: last year's data not found in the standard folder, do you want to search for the data to import?",
        caption: "If last year's data is not in the standard folder, FriTax offers to search for it (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-import-fichier.webp",
        alt: "FriTax « Ouvrir FriTax 2024 fichiers » window: selecting an FR_2024_N.mv.db or .FRNP2024 file",
        caption: "Answer « Oui », then choose last year's file (FR_2024_N.mv.db or a .FRNP2024 export) (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-type-declaration.webp",
        alt: "FriTax « Nouvelle déclaration d'impôt » window: individuals, simple partnerships and estates, general or limited partnerships",
        caption: "For a new return, choose « Personnes physiques 2025 » (individuals); undivided estates have their own return type (FriTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Changing computer: export first",
        text: "Your data stays on the computer where you entered it; the SCC has no access to it. Before switching computer, use « **Exporter déclaration d'impôt** » (export tax return) on the start screen, then import the file on the new device. Without this step your data is lost.",
      },
      {
        type: "p",
        text: "You can then fill in the return **page by page** in the **« Formulaires »** tab, or follow the **« Assistant »** (guided mode) tab, on the left of the screen. Both lead to the same result. The rest of this guide follows the order of the codes on the return, starting with your [personal situation](/guide/fritax/situation-personnelle).",
      },
      {
        type: "screenshot",
        file: "01-formulaires.webp",
        alt: "FriTax 2025 main window: Assistant and Formulaires tabs, list of forms, identity entry and Erreurs panel",
        caption: "The working window: list of forms on the left, entry in the middle, errors to fix on the right (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "01-assistant.webp",
        alt: "FriTax Assistant tab: steps from identity, social deductions, employment income, work expenses, other income and wealth, deductions, miscellaneous, tax calculation, printing and electronic filing",
        caption: "The « Assistant » tab guides you step by step, from identity to electronic filing; « Au formulaire » takes you to the matching page of the return (FriTax 2025)",
      },
    ],
    faq: [
      {
        q: "Where can I download FriTax 2026?",
        a: "From fr.ch/fritax, the cantonal tax service's page. FriTax 2026 is released early in 2027, for Windows, macOS and Linux.",
      },
      {
        q: "Where do I find the FriTax code?",
        a: "On the A4 « Déclaration d'impôt » folder sent by the SCC. It has 6 capital letters and digits and is only requested when you file electronically.",
      },
      {
        q: "How much does a tax return extension cost in Fribourg?",
        a: "CHF 20 per extension, paid with the QR bill enclosed with the return. The first moves the deadline from 31 March to 30 June. Up to four extensions are possible, until 15 December.",
      },
      {
        q: "Does FriTax run on a Mac?",
        a: "Yes, on macOS 10.15 or later. FriTax also exists for 64-bit Windows 10 and Linux Ubuntu, but not for tablets.",
      },
      {
        q: "Can I complete an earlier year's return with FriTax?",
        a: "Yes, with the FriTax version for that year, available on the download page for previous tax periods. Each version only works for its own tax period.",
      },
    ],
  },
};
