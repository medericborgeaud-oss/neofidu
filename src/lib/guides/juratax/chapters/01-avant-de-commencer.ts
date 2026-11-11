import type { GuideChapter } from "../../types";

export const avantDeCommencer: GuideChapter = {
  slug: "avant-de-commencer",
  readTime: 7,
  fr: {
    title: "Avant de commencer JuraTax : Online ou Logiciel, Code-DI, SwissID, délais et prolongations 2027",
    navTitle: "Avant de commencer",
    metaTitle: "JuraTax 2026 : Online ou Logiciel, Code-DI, délai et prolongation",
    metaDescription:
      "JuraTax Online ou JuraTax Logiciel (Windows, Mac, Linux), où trouver le Code-DI, pourquoi créer une SwissID, délai de fin février 2027, prolongation à CHF 31 jusqu'au 31 octobre, reprise de l'année précédente et documents à réunir.",
    keywords: [
      "juratax online",
      "juratax télécharger",
      "juratax mac",
      "code-di jura",
      "délai déclaration impôt jura 2027",
      "prolongation délai impôt jura",
      "juratax swissid",
    ],
    summary: [
      "JuraTax existe en **deux versions gratuites** : **JuraTax Online**, dans le navigateur, sans installation, et **JuraTax Logiciel**, à installer sur Windows, macOS ou Linux. Les deux sont publiées chaque année vers le **27 ou 28 janvier** sur jura.ch/guichet.",
      "Le **Code-DI** (format 22Y-1Y6-YC5) figure en bas à droite de la première page de la déclaration. Il change chaque année. Une **SwissID** vérifiée permet en plus la signature électronique et la reprise des données de l'an dernier.",
      "Délai : **fin février 2027**. Prolongation jusqu'au **31 octobre** sur le guichet virtuel ou par formulaire, facturée **CHF 31**.",
      "Rappel facturé **CHF 42** (14 jours), puis sommation **CHF 63** (10 jours), puis amende jusqu'à **CHF 1'000** et taxation d'office.",
    ],
    blocks: [
      { type: "h2", id: "installer", text: "JuraTax Online ou JuraTax Logiciel ?" },
      {
        type: "table",
        head: ["", "JuraTax Online", "JuraTax Logiciel"],
        rows: [
          ["Installation", "Aucune : navigateur sur ordinateur, tablette ou smartphone", "Programme à télécharger pour Windows, macOS ou Linux"],
          ["Enregistrement des données", "Automatique, sur les serveurs du canton (Le Noirmont et Delémont)", "Sur votre ordinateur, en fichier .tax"],
          ["Connexion", "SwissID ou Code-DI", "Code-DI uniquement : le téléversement par SwissID n'est plus possible avec le Logiciel"],
          ["Signature", "Électronique avec une SwissID vérifiée ; sinon page de synthèse à signer", "Page de synthèse à signer et à envoyer, ou déclaration imprimée avec codes-barres"],
          ["Justificatifs", "En ligne : PDF ou photo prise avec le smartphone", "Par la poste uniquement"],
          ["Reprise de l'an dernier", "Avec SwissID, si la déclaration précédente a été téléversée", "Import du fichier .tax de l'année précédente"],
        ],
        caption: "Sources : page JuraTax et FAQ du Service des contributions du canton du Jura (faq.jura.ch), état 2026.",
      },
      {
        type: "p",
        text: "Le Service des contributions recommande **JuraTax Online**, qui permet une déclaration **100 % électronique**, justificatifs compris. JuraTax Logiciel reste utile si vous préférez garder vos données sur votre ordinateur ou si vous remplissez plusieurs déclarations hors ligne. Pour signer avec une SwissID, il faut passer par JuraTax Online, qui **importe les fichiers .tax** créés avec le Logiciel : rien n'est perdu. Il se met à jour à l'ouverture, ou par le menu **« Outils »**, **« Mise à jour JuraTax »**, qui charge aussi la banque de données des cours des titres. Si votre version de macOS ou de Linux est trop ancienne, utilisez JuraTax Online. Il n'existe **pas de version 2026 avant la fin janvier 2027** : chaque version ne sert que pour sa propre période fiscale.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Hotline JuraTax",
        text: "La hotline JuraTax répond au **032 420 56 00** et au **032 420 56 10** (tarif ordinaire). Du 1er février au 31 mars : lundi au jeudi de 8 h à 11 h 30 et de 13 h 30 à 17 h, vendredi jusqu'à 16 h. Dès le 1er avril : de 9 h à 11 h 30 et de 14 h à 17 h (16 h le vendredi). Pour la SwissID, appelez SwissSign au 0848 99 88 00. Si le téléversement échoue avec JuraTax Logiciel, vérifiez d'abord que votre antivirus ou votre pare-feu ne le bloque pas.",
      },

      { type: "h2", id: "code-di", text: "Le Code-DI et la SwissID" },
      {
        type: "p",
        text: "Le **Code-DI** est votre code personnel de téléversement, au format **22Y-1Y6-YC5**. Il est imprimé **en bas à droite de la première page** de la déclaration et au centre du document joint à votre matériel fiscal. Il n'est **valable qu'une année**. Égaré ? Demandez-le au secrétariat de la Section des personnes physiques (032 420 55 60, secr.pph@jura.ch) : il vous est renvoyé par la poste. Après réception de votre page de synthèse signée, l'accès par Code-DI est désactivé : **enregistrez une copie PDF** de votre déclaration dès le téléversement.",
      },
      {
        type: "p",
        text: "Une **SwissID** se crée gratuitement en quelques minutes, avec une adresse e-mail et un numéro de téléphone portable. Reliée à votre Code-DI dans JuraTax Online, elle débloque toutes les fonctions : **reprise des données de l'an dernier**, **signature électronique** (avec une identité vérifiée), suivi de la taxation, demande de délai et modification des acomptes sur le guichet virtuel.",
      },

      { type: "h2", id: "delais", text: "Délai de dépôt et prolongations" },
      {
        type: "table",
        head: ["Étape", "Règle"],
        rows: [
          ["Délai ordinaire", "Fin février de l'année suivante : 28 février 2026 pour la déclaration 2025, fin février 2027 pour la déclaration 2026"],
          ["Prolongation", "Jusqu'au 31 octobre, sur le guichet virtuel avec une SwissID ou avec le formulaire de demande de délai ; facturée CHF 31 sur la taxation"],
          ["Condition", "Aucun arriéré d'impôt sur les années précédentes"],
          ["Mandataire", "Une fiduciaire peut demander la prolongation en votre nom sur le guichet virtuel"],
          ["Sans demande", "Pour la déclaration 2025, aucune demande n'était nécessaire en cas de dépôt au bureau communal avant le 30 juin 2026 ou de téléversement avant le 31 juillet 2026, sans frais"],
        ],
        caption: "Sources : Guide général 2025, pages 7 et 8, et formulaire « Demande de prolongation de délai DI 2025 », Service des contributions du canton du Jura. Les dates de tolérance pour la déclaration 2026 seront publiées dans le Guide général 2026.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Sans déclaration : rappel, sommation, amende",
        text: "Sans déclaration ni délai, vous recevez un **rappel facturé CHF 42** avec un délai de 14 jours, puis une **sommation facturée CHF 63** avec un ultime délai de 10 jours. Ensuite, une **amende jusqu'à CHF 1'000** (CHF 10'000 en cas de récidive ou de cas grave) est prononcée et vous risquez d'être **taxé d'office**. Ces émoluments ne sont pas indexés en 2026.",
      },
      {
        type: "p",
        text: "Payez à temps même si vous demandez un délai : le **28 février** est aussi le terme général d'échéance de l'impôt. Si vos acomptes ne couvrent pas l'impôt estimé, versez la différence avec le bulletin de la **formule 110** (« Aide au calcul du solde d'impôt ») pour éviter des intérêts compensatoires dès le 1er mars.",
      },

      { type: "h2", id: "documents", text: "Les documents à réunir" },
      {
        type: "list",
        items: [
          "Certificats de salaire 2026 de chaque employeur, attestations de chômage, d'indemnités journalières (maladie, accident, AI) et d'APG.",
          "Attestations de rentes AVS, AI, caisse de pension, rentes viagères.",
          "Relevés bancaires et postaux au 31 décembre 2026, eRelevés fiscaux en PDF, relevés de titres et de crypto, décomptes d'achat et de vente de titres.",
          "Attestations 3e pilier A, attestation de rachat de la caisse de pension, valeurs de rachat des assurances-vie au 31 décembre.",
          "Police d'assurance-maladie 2026 et, si vous en bénéficiez, la décision de réduction des primes de l'ECAS.",
          "Factures de crèche, d'accueil extrascolaire ou de maman de jour, factures médicales non remboursées et décomptes de la caisse-maladie.",
          "Pour les propriétaires : valeur officielle, loyers encaissés, intérêts hypothécaires, factures finales d'entretien payées en 2026.",
          "Votre Code-DI, votre numéro de contribuable et, pour JuraTax Logiciel, le fichier .tax de l'an dernier.",
        ],
      },

      { type: "h2", id: "demarrer", text: "Démarrer : reprendre l'an dernier ou partir de zéro" },
      { type: "path", items: ["Fichier", "Importer..."] },
      {
        type: "p",
        text: "Dans **JuraTax Logiciel**, choisissez **« Fichier », « Nouveau »** pour une première déclaration, ou **« Fichier », « Importer... »** pour reprendre les données de l'an dernier. L'import ne fonctionne que si vous aviez **enregistré le fichier JuraTax de l'année précédente** sur votre ordinateur. La déclaration se remplit ensuite dans l'**arborescence à gauche** : « Données de référence », « Revenus », « Frais professionnels », « Immeubles privés », « Copropriétés », « Titres », « Dettes », « Déductions », « Fortune », « Récapitulation », « Téléversement » et « Impression ». Les boutons **« Retour »** et **« Suivant »** font passer d'un écran à l'autre.",
      },
      {
        type: "screenshot",
        file: "01-fenetre-principale.webp",
        alt: "Fenêtre principale de JuraTax 2025 : arborescence Données de référence, Revenus, Frais professionnels, Immeubles privés, Titres, Dettes, Déductions, Fortune, Récapitulation, Téléversement, Impression, et légende des couleurs",
        caption: "La fenêtre de travail : les rubriques à gauche, la saisie à droite, l'aide et la légende des couleurs en bas (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Suivez les couleurs",
        text: "Chaque rubrique porte une couleur : **orange** à compléter, **jaune** modifié, **rouge** à corriger, **vert** correct. L'onglet **« Problème »**, en bas de l'écran, explique ce qui manque, par exemple « Champ de saisie \"Commune de taxation\" doit être sélectionné ». Votre déclaration est prête quand tout est vert.",
      },
      {
        type: "p",
        text: "Le premier écran, **« Données de la déclaration d'impôt »**, demande la **commune de taxation**, votre **numéro de contribuable** (en tête de la déclaration papier), votre adresse, votre téléphone et votre adresse e-mail, à confirmer.",
      },
      {
        type: "screenshot",
        file: "01-donnees-declaration.webp",
        alt: "Écran Données de la déclaration d'impôt de JuraTax 2025 : période de taxation 2025, commune de taxation à choisir, numéro de contribuable, adresse, e-mail, et message dans l'onglet Problème",
        caption: "Le premier écran : commune de taxation, numéro de contribuable et coordonnées ; l'onglet « Problème » signale le champ manquant (JuraTax 2025)",
      },
      { type: "path", items: ["Commencer ici", "Importer une déclaration d'impôt"] },
      {
        type: "p",
        text: "JuraTax Online est organisé en **quatre rubriques** : **« Commencer ici »** (import des fichiers .tax de l'année précédente ou de l'année en cours, suppression de la déclaration), **« Parcourir la déclaration »** (toutes les rubriques), **« Impression »** et **« Validation »** (envoi électronique ou postal, liste des justificatifs). Pour reprendre vos données de base de l'an dernier (identité, employeur, enfants, comptes), connectez-vous **avec votre SwissID** et cliquez sur « Importer une déclaration d'impôt ». Cela ne fonctionne que si la déclaration précédente a été **téléversée**, et non envoyée sur papier.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Vous n'avez pas terminé ? Aucun problème",
        text: "JuraTax Online enregistre automatiquement vos saisies : vous pouvez vous déconnecter et reprendre plus tard. Tant que vous n'avez pas validé votre déclaration, les services de l'État n'y ont **pas accès**. Avec JuraTax Logiciel, enregistrez régulièrement votre fichier .tax (« Fichier », « Enregistrer », ou Ctrl+S) et **gardez-le** : c'est lui qui permettra d'importer vos données l'an prochain.",
      },
      {
        type: "p",
        text: "Arrivé dans le canton ou parti à l'étranger en cours d'année ? Vous pouvez utiliser JuraTax, mais le récapitulatif et l'impôt affichés sont calculés sur une année entière : le Service des contributions les corrige. La suite de ce guide suit l'ordre des codes de la déclaration, en commençant par la [situation personnelle](/guide/juratax/situation-personnelle).",
      },
    ],
    faq: [
      {
        q: "Où télécharger JuraTax 2026 ?",
        a: "Sur le guichet virtuel du canton, jura.ch/guichet, rubrique « JuraTax Logiciel », en versions Windows, macOS et Linux. JuraTax Online 2026 se lance depuis la même page. Les deux sont mis en ligne vers le 27 ou 28 janvier 2027.",
      },
      {
        q: "Où trouver le Code-DI ?",
        a: "En bas à droite de la première page de votre déclaration d'impôt, et au centre du document joint au matériel fiscal. Il a le format 22Y-1Y6-YC5 et change chaque année. S'il est égaré, la Section des personnes physiques le renvoie par la poste (032 420 55 60).",
      },
      {
        q: "Combien coûte une prolongation du délai dans le canton du Jura ?",
        a: "CHF 31, facturés sur la taxation. La prolongation va jusqu'au 31 octobre et se demande sur le guichet virtuel avec une SwissID, par votre mandataire, ou avec le formulaire de demande de délai.",
      },
      {
        q: "Peut-on utiliser JuraTax sur Mac ou sur tablette ?",
        a: "Sur Mac, oui : JuraTax Logiciel existe pour macOS, et JuraTax Online fonctionne dans Safari ou un autre navigateur. Sur tablette ou smartphone, seule la version JuraTax Online peut être utilisée.",
      },
      {
        q: "Faut-il une SwissID pour utiliser JuraTax Online ?",
        a: "Non, le Code-DI suffit pour remplir et téléverser. Mais sans SwissID, vous ne pouvez ni reprendre vos données de l'an dernier, ni signer électroniquement : il faut alors signer et envoyer la page de synthèse.",
      },
    ],
  },
  en: {
    title: "Before you start JuraTax: online or desktop, Code-DI, SwissID, 2027 deadlines and extensions",
    navTitle: "Before you start",
    metaTitle: "JuraTax 2026: online or desktop, Code-DI, deadline, extension",
    metaDescription:
      "JuraTax Online or the JuraTax desktop program (Windows, Mac, Linux), where to find the Code-DI, why create a SwissID, end-of-February 2027 deadline, CHF 31 extension to 31 October, carrying over last year and documents to gather.",
    keywords: [
      "juratax online",
      "juratax download",
      "juratax mac",
      "code-di jura",
      "jura tax return deadline 2027",
      "jura tax return extension",
      "juratax swissid",
    ],
    summary: [
      "JuraTax comes in **two free versions**: **JuraTax Online**, in your browser with no installation, and the **desktop program** (« JuraTax Logiciel »), installed on Windows, macOS or Linux. Both are released each year around **27 or 28 January** on jura.ch/guichet.",
      "The **Code-DI** (format 22Y-1Y6-YC5) is printed at the bottom right of page 1 of your return. It changes every year. A verified **SwissID** also lets you sign electronically and carry over last year's data.",
      "Deadline: **end of February 2027**. Extension to **31 October** on the virtual counter or by form, charged **CHF 31**.",
      "A reminder costs **CHF 42** (14 days), then a formal notice **CHF 63** (10 days), then a fine of up to **CHF 1,000** and an estimated assessment.",
    ],
    blocks: [
      { type: "h2", id: "installer", text: "JuraTax Online or the desktop program?" },
      {
        type: "table",
        head: ["", "JuraTax Online", "JuraTax desktop program"],
        rows: [
          ["Installation", "None: a browser on a computer, tablet or smartphone", "Program to download for Windows, macOS or Linux"],
          ["Data storage", "Automatic, on the canton's servers (Le Noirmont and Delémont)", "On your computer, as a .tax file"],
          ["Login", "SwissID or Code-DI", "Code-DI only: SwissID upload is no longer possible with the desktop program"],
          ["Signature", "Electronic with a verified SwissID; otherwise a summary page to sign", "Summary page to sign and post, or a printed return with barcodes"],
          ["Supporting documents", "Online: PDF or a photo taken with your smartphone", "By post only"],
          ["Carrying over last year", "With SwissID, if last year's return was uploaded", "Import last year's .tax file"],
        ],
        caption: "Sources: JuraTax page and FAQ of the Jura Service des contributions (faq.jura.ch), 2026.",
      },
      {
        type: "p",
        text: "The tax service recommends **JuraTax Online**, which allows a **fully electronic** return, supporting documents included. The desktop program remains useful if you prefer to keep your data on your computer or complete several returns offline. To sign with a SwissID you must use JuraTax Online, which **imports the .tax files** created with the desktop program: nothing is lost. It updates when opened, or via the **« Outils »** (tools) menu, **« Mise à jour JuraTax »** (update JuraTax), which also loads the securities price database. If your macOS or Linux version is too old, use JuraTax Online. There is **no 2026 version before the end of January 2027**: each version only works for its own tax period.",
      },
      {
        type: "callout",
        tone: "info",
        title: "JuraTax hotline",
        text: "The JuraTax hotline answers on **032 420 56 00** and **032 420 56 10** (standard rates). From 1 February to 31 March: Monday to Thursday 8:00 to 11:30 and 13:30 to 17:00, Friday until 16:00. From 1 April: 9:00 to 11:30 and 14:00 to 17:00 (16:00 on Friday). For SwissID questions, call SwissSign on 0848 99 88 00. If upload fails with the desktop program, first check that your antivirus or firewall is not blocking it.",
      },

      { type: "h2", id: "code-di", text: "The Code-DI and SwissID" },
      {
        type: "p",
        text: "The **Code-DI** is your personal upload code, in the format **22Y-1Y6-YC5**. It is printed **at the bottom right of page 1** of the return and in the middle of the letter enclosed with your tax documents. It is **valid for one year only**. Lost it? Ask the secretariat of the individual taxpayers section (« Section des personnes physiques », 032 420 55 60, secr.pph@jura.ch): it is sent to you by post. Once your signed summary page is received, Code-DI access is deactivated: **save a PDF copy** of your return as soon as you upload it.",
      },
      {
        type: "p",
        text: "A **SwissID** is free and takes a few minutes to create, with an email address and a mobile number. Linked to your Code-DI in JuraTax Online, it unlocks every feature: **carrying over last year's data**, **electronic signature** (with a verified identity), tracking your assessment, requesting an extension and changing your instalments on the virtual counter.",
      },

      { type: "h2", id: "delais", text: "Filing deadline and extensions" },
      {
        type: "table",
        head: ["Step", "Rule"],
        rows: [
          ["Ordinary deadline", "End of February of the following year: 28 February 2026 for the 2025 return, end of February 2027 for the 2026 return"],
          ["Extension", "To 31 October, on the virtual counter with a SwissID or with the extension request form; charged CHF 31 on your assessment"],
          ["Condition", "No tax arrears from previous years"],
          ["Representative", "A fiduciary can request the extension on your behalf on the virtual counter"],
          ["No request needed", "For the 2025 return, no request was needed if you filed at the municipal office before 30 June 2026 or uploaded before 31 July 2026, free of charge"],
        ],
        caption: "Sources: 2025 general guide, pages 7 and 8, and « Demande de prolongation de délai DI 2025 » form, Jura Service des contributions. Tolerance dates for the 2026 return will be published in the 2026 general guide.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "No return: reminder, formal notice, fine",
        text: "Without a return or an extension, you receive a **reminder charged CHF 42** with 14 days to file, then a **formal notice charged CHF 63** with a final 10 days. After that, a **fine of up to CHF 1,000** (CHF 10,000 for repeat or serious cases) is imposed and you may be **assessed by estimate**. These fees are not indexed in 2026.",
      },
      {
        type: "p",
        text: "Pay on time even if you request an extension: **28 February** is also the general due date for the tax. If your instalments do not cover the estimated tax, pay the difference with the payment slip on **form 110** (« Aide au calcul du solde d'impôt », tax balance calculator) to avoid compensatory interest from 1 March.",
      },

      { type: "h2", id: "documents", text: "Documents to gather" },
      {
        type: "list",
        items: [
          "2026 salary certificates from each employer, statements of unemployment, daily allowances (sickness, accident, disability) and loss-of-earnings (APG) payments.",
          "AHV, disability, pension fund and life annuity statements.",
          "Bank and postal statements at 31 December 2026, electronic tax statements (eRelevés fiscaux) as PDFs, securities and crypto statements, purchase and sale slips for securities.",
          "Pillar 3a certificates, pension fund buy-in certificate, surrender values of life insurance policies at 31 December.",
          "Your 2026 health insurance policy and, if you receive one, the ECAS premium reduction decision.",
          "Invoices for nursery, after-school care or childminder, unreimbursed medical bills and health insurer statements.",
          "For owners: official value, rents received, mortgage interest, final upkeep invoices paid in 2026.",
          "Your Code-DI, your taxpayer number and, for the desktop program, last year's .tax file.",
        ],
      },

      { type: "h2", id: "demarrer", text: "Getting started: carry over last year or start from scratch" },
      { type: "path", items: ["Fichier", "Importer..."] },
      {
        type: "p",
        text: "In the **desktop program**, choose **« Fichier », « Nouveau »** (file, new) for a first return, or **« Fichier », « Importer... »** (file, import) to carry over last year's data. The import only works if you **saved last year's JuraTax file** on your computer. You then fill in the return using the **tree on the left**: « Données de référence » (reference data), « Revenus » (income), « Frais professionnels » (work expenses), « Immeubles privés » (private property), « Copropriétés » (co-ownership), « Titres » (securities), « Dettes » (debts), « Déductions », « Fortune » (wealth), « Récapitulation » (summary), « Téléversement » (upload) and « Impression » (printing). The **« Retour »** (back) and **« Suivant »** (next) buttons move between screens.",
      },
      {
        type: "screenshot",
        file: "01-fenetre-principale.webp",
        alt: "JuraTax 2025 main window: tree with reference data, income, work expenses, private property, securities, debts, deductions, wealth, summary, upload, printing, and colour legend",
        caption: "The working window: sections on the left, entry on the right, help and colour legend at the bottom (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Follow the colours",
        text: "Each section has a colour: **orange** to complete (« compléter »), **yellow** modified (« Modifié »), **red** to correct (« à corriger »), **green** correct (« Correct »). The **« Problème »** (problem) tab at the bottom explains what is missing, for example that the « Commune de taxation » (municipality of taxation) must be selected. Your return is ready when everything is green.",
      },
      {
        type: "p",
        text: "The first screen, **« Données de la déclaration d'impôt »** (return details), asks for the **municipality of taxation**, your **taxpayer number** (at the top of the paper return), your address, phone number and email address, which you confirm.",
      },
      {
        type: "screenshot",
        file: "01-donnees-declaration.webp",
        alt: "JuraTax 2025 « Données de la déclaration d'impôt » screen: tax period 2025, municipality to select, taxpayer number, address, email, and message in the Problème tab",
        caption: "The first screen: municipality of taxation, taxpayer number and contact details; the « Problème » tab flags the missing field (JuraTax 2025)",
      },
      { type: "path", items: ["Commencer ici", "Importer une déclaration d'impôt"] },
      {
        type: "p",
        text: "JuraTax Online has **four main sections**: **« Commencer ici »** (start here: import .tax files from last year or the current year, delete the return), **« Parcourir la déclaration »** (browse the return: every section), **« Impression »** (printing) and **« Validation »** (electronic or postal filing, list of supporting documents). To carry over last year's basic data (identity, employer, children, accounts), log in **with your SwissID** and click « Importer une déclaration d'impôt » (import a tax return). This only works if last year's return was **uploaded**, not sent on paper.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Not finished? No problem",
        text: "JuraTax Online saves your entries automatically: you can log out and resume later. Until you validate your return, state services have **no access** to it. With the desktop program, save your .tax file regularly (« Fichier », « Enregistrer », or Ctrl+S) and **keep it**: you will need it to import your data next year.",
      },
      {
        type: "p",
        text: "Moved into the canton or abroad during the year? You can use JuraTax, but the summary and tax shown are calculated on a full year: the tax service corrects them. The rest of this guide follows the order of the codes on the return, starting with your [personal situation](/guide/juratax/situation-personnelle).",
      },
    ],
    faq: [
      {
        q: "Where can I download JuraTax 2026?",
        a: "From the canton's virtual counter, jura.ch/guichet, under « JuraTax Logiciel », for Windows, macOS and Linux. JuraTax Online 2026 is launched from the same page. Both go online around 27 or 28 January 2027.",
      },
      {
        q: "Where do I find the Code-DI?",
        a: "At the bottom right of page 1 of your tax return, and in the middle of the letter enclosed with your tax documents. Its format is 22Y-1Y6-YC5 and it changes every year. If lost, the individual taxpayers section sends it again by post (032 420 55 60).",
      },
      {
        q: "How much does a tax return extension cost in Jura?",
        a: "CHF 31, charged on your assessment. The extension runs to 31 October and is requested on the virtual counter with a SwissID, by your representative, or with the extension request form.",
      },
      {
        q: "Can I use JuraTax on a Mac or a tablet?",
        a: "On a Mac, yes: the desktop program exists for macOS, and JuraTax Online works in Safari or another browser. On a tablet or smartphone, only JuraTax Online can be used.",
      },
      {
        q: "Do I need a SwissID to use JuraTax Online?",
        a: "No, the Code-DI is enough to fill in and upload. But without a SwissID you can neither carry over last year's data nor sign electronically: you then have to sign and post the summary page.",
      },
    ],
  },
};
