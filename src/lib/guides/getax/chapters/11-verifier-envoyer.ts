import type { GuideChapter } from "../../types";

export const verifierEnvoyer: GuideChapter = {
  slug: "verifier-envoyer",
  readTime: 7,
  fr: {
    title: "Vérifier et transmettre sa déclaration GeTax : justificatifs, zéro papier et quittance",
    navTitle: "Vérifier et transmettre",
    metaTitle: "GeTax 2026 : déposer en zéro papier ou téléverser, justificatifs",
    metaDescription:
      "Contrôler le calcul d'impôt dans GeTax, joindre les justificatifs PDF (20 fichiers, 100 Mo), déposer en zéro papier avec quittance ou téléverser et envoyer la page de synthèse signée.",
    keywords: [
      "getax déposer déclaration",
      "zéro papier genève impôt",
      "page de synthèse getax",
      "quittance de dépôt getax",
      "justificatifs déclaration genève",
      "téléverser déclaration genève",
    ],
    summary: [
      "Avant l'envoi, tous les écrans doivent porter une **coche verte** (ou un point d'interrogation jaune, non bloquant). Relisez la **Récapitulation** et le **calcul d'impôt** estimé.",
      "Joignez vos justificatifs en **PDF** dans « Gérer vos justificatifs » : **20 fichiers** et **100 Mo** au maximum. Le certificat de salaire est toujours obligatoire.",
      "Avec un compte e-démarches et des justificatifs tous électroniques, choisissez le **dépôt zéro papier** : vous recevez aussitôt une **quittance de dépôt** horodatée.",
      "Sans compte, **téléversez** puis envoyez par la poste la **page de synthèse signée** : la déclaration n'est déposée qu'à sa réception.",
    ],
    blocks: [
      { type: "h2", id: "controle", text: "Contrôler la déclaration" },
      {
        type: "p",
        text: "Dans l'arborescence, chaque écran porte une icône : **point d'exclamation orange** (à compléter), **rouge** (à corriger), **coche verte** (correct), **point d'interrogation jaune** (avertissement non bloquant, par exemple un numéro de contribuable qui ne correspond pas exactement au nom). Le message d'erreur s'affiche en bas à droite. Passez ensuite en **saisie formulaire** pour relire la déclaration page par page, comme sur papier, ou imprimez-la en mode brouillon (menu « Fichier », « Imprimer mode brouillon »).",
      },

      { type: "h2", id: "recapitulation", text: "La récapitulation et le calcul d'impôt" },
      { type: "path", items: ["Récapitulation", "Calcul d'impôt"] },
      {
        type: "screenshot",
        file: "11b-calcul-impot.webp",
        alt: "Écran Calcul d'impôt de GeTax : barème avec splitting, revenu déterminant, impôt de base, centimes additionnels, réduction de 12 %, impôts cantonaux et communaux",
        caption: "Le calcul d'impôt estimé : impôt de base, centimes additionnels cantonaux et communaux, réduction de 12 % et taxe personnelle (GeTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "La récapitulation affiche les revenus et la fortune déclarés, les déductions, les répartitions intercantonales et intercommunales, puis une **estimation** de l'impôt cantonal et communal (ICC) et de l'impôt fédéral direct (IFD). Elle n'engage pas l'AFC, mais un résultat surprenant signale souvent une erreur de saisie : un salaire net saisi à la place du brut, un montant à l'IFD oublié, des allocations familiales comptées deux fois.",
      },

      { type: "h2", id: "finalisation", text: "Finalisation : acomptes, justificatifs, observations" },
      { type: "path", items: ["Finalisation", "Gérer vos justificatifs"] },
      {
        type: "screenshot",
        file: "11-justificatifs.webp",
        alt: "Fenêtre Gestion des justificatifs de GeTax : liste des justificatifs requis et ajout de fichiers PDF",
        caption: "GeTax dresse la liste des justificatifs requis selon vos saisies et permet d'ajouter les PDF (GeTax 2025, données fictives)",
      },
      {
        type: "list",
        items: [
          "**Acomptes / Remboursements** : indiquez si vous payez vos acomptes de l'année suivante par internet (une seule QR-facture suffit alors). Les coordonnées bancaires pour un remboursement se modifient dans l'espace fiscal (prestation « Mes Coordonnées Bancaires »), pas dans GeTax.",
          "**Gérer vos justificatifs** : GeTax enregistre d'abord la déclaration, puis liste les pièces requises. Ajoutez les PDF avec le bouton « + » ou par glisser-déposer : 20 fichiers et 100 Mo au maximum.",
          "**Observations** : une précision utile pour la taxation (changement de situation, annexe papier jointe).",
        ],
      },
      {
        type: "table",
        head: ["Justificatif", "À envoyer ?"],
        rows: [
          ["Certificat de salaire", "**Toujours**"],
          ["Attestations 3e pilier A, rachats LPP", "Oui"],
          ["Factures de frais de garde", "Oui"],
          ["Certificats de rentes, justificatifs d'intérêts et de dettes, jugement de divorce", "Seulement la première fois ou en cas de changement important"],
          ["Attestations de bouclement de comptes salaire ou épargne", "Non, à conserver"],
          ["Justificatifs de frais médicaux, de dons, factures d'entretien d'immeuble", "Non, à conserver"],
          ["La déclaration elle-même", "Non, la page de synthèse suffit"],
        ],
        caption: "Source : AFC Infos mars 2026 et Guide de la déclaration 2025, AFC Genève. En cas de doute, suivez la liste des justificatifs requis de GeTax.",
      },

      { type: "h2", id: "depot", text: "Déposer : zéro papier ou téléversement" },
      { type: "path", items: ["Envoi / Impression", "Déposer - Téléverser"] },
      {
        type: "screenshot",
        file: "11c-deposer.webp",
        alt: "Fenêtre Déposer - Téléverser de GeTax : dépôt zéro papier avec compte e-démarches, ou téléversement et envoi postal de la page de synthèse",
        caption: "Deux modes de dépôt ; les gros codes-barres sont désormais réservés aux déclarations Départ-Décès (GeTax 2025)",
      },
      {
        type: "table",
        head: ["", "Zéro papier (« Transmettre et déposer »)", "Téléversement (« Téléverser »)"],
        rows: [
          ["Condition", "Compte e-démarches et tous les justificatifs en PDF", "Sans compte, ou avec au moins un justificatif papier"],
          ["Étapes", "Authentification e-démarches, transmission de la déclaration et des justificatifs", "Transmission sans authentification, puis impression et signature de la page de synthèse"],
          ["Preuve de dépôt", "Quittance de dépôt avec horodatage et numéro de transaction, première page du PDF enregistré", "Réception par l'AFC de la page de synthèse signée"],
          ["Courrier postal", "Aucun", "Page de synthèse signée et justificatifs papier"],
          ["Visible dans l'espace fiscal", "Immédiatement", "Après réception de la page, environ 10 jours en période de pointe"],
        ],
        caption: "Source : « Déposer sa déclaration : les différents modes », getax.ch, et aide de GeTax 2025, AFC Genève.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Téléversement : seule la dernière page de synthèse compte",
        text: "Une déclaration téléversée n'est **déposée qu'à la réception de la page de synthèse signée** : sans elle, l'AFC n'a aucune trace de votre déclaration. Si vous corrigez et téléversez à nouveau, une nouvelle page avec un nouveau numéro de transaction est créée, et c'est elle qu'il faut envoyer.",
      },
      {
        type: "p",
        text: "Enregistrez le fichier .tax et le PDF final : ils serviront à importer vos données l'an prochain et à répondre à une éventuelle question de l'AFC.",
      },

      { type: "h2", id: "apres", text: "Après le dépôt" },
      {
        type: "list",
        items: [
          "Un dossier simple est traité en **8 semaines en moyenne**. Inutile de relancer l'AFC avant six mois.",
          "Vous recevez les **bordereaux ICC et IFD**, l'avis de taxation et un relevé de compte, par courrier ou dans l'espace fiscal (e-correspondance).",
          "Solde en votre faveur : remboursement dans les **30 jours** sur le compte indiqué. Solde en faveur de l'AFC : **30 jours** pour payer ou contester (réclamation). Un délai de paiement peut être demandé.",
          "Pour une erreur constatée après coup, faites une réclamation dans les 30 jours suivant la réception du bordereau.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment savoir si ma déclaration GeTax a bien été déposée ?",
        a: "En zéro papier, vous recevez une quittance de dépôt horodatée avec un numéro de transaction, et la déclaration apparaît dans votre espace e-démarches. En téléversement, elle n'est déposée qu'à la réception par l'AFC de la page de synthèse signée.",
      },
      {
        q: "Faut-il signer la déclaration GeTax ?",
        a: "En dépôt zéro papier, non : l'authentification e-démarches suffit. En téléversement, il faut signer la page de synthèse et l'envoyer par la poste.",
      },
      {
        q: "Combien de justificatifs peut-on joindre dans GeTax ?",
        a: "Jusqu'à 20 fichiers PDF, pour 100 Mo au total, dans « Finalisation », « Gérer vos justificatifs ».",
      },
      {
        q: "Peut-on encore envoyer la déclaration genevoise sur papier ?",
        a: "L'impression avec gros codes-barres est désormais réservée aux déclarations Départ/Décès. Pour une déclaration ordinaire, il faut déposer en zéro papier ou téléverser et envoyer la page de synthèse.",
      },
    ],
  },
  en: {
    title: "Checking and filing your GeTax return: documents, paperless filing and receipt",
    navTitle: "Check and file",
    metaTitle: "GeTax 2026: paperless filing or upload, supporting documents",
    metaDescription:
      "Checking the tax calculation in GeTax, attaching PDF documents (20 files, 100 MB), filing paperless with a receipt, or uploading and posting the signed summary page.",
    keywords: [
      "getax file return",
      "geneva paperless tax return",
      "getax summary page",
      "getax filing receipt",
      "supporting documents geneva tax return",
      "upload tax return geneva",
    ],
    summary: [
      "Before filing, every screen must show a **green tick** (or a yellow question mark, which does not block). Review the **summary** (« Récapitulation ») and the estimated **tax calculation**.",
      "Attach your documents as **PDF** under « Gérer vos justificatifs » (manage supporting documents): **20 files** and **100 MB** at most. The salary certificate is always mandatory.",
      "With an e-démarches account and fully electronic documents, choose **paperless filing** (« zéro papier »): you instantly receive a time-stamped **filing receipt**.",
      "Without an account, **upload** the return and post the **signed summary page** (« page de synthèse »): the return is only filed when it arrives.",
    ],
    blocks: [
      { type: "h2", id: "controle", text: "Checking the return" },
      {
        type: "p",
        text: "In the tree, each screen has an icon: **orange exclamation mark** (to complete), **red** (to correct), **green tick** (correct), **yellow question mark** (non-blocking warning, for example a taxpayer number that does not exactly match the name). The message appears at the bottom right. Then switch to **form entry** to review the return page by page, as on paper, or print a draft (menu « Fichier », « Imprimer mode brouillon »).",
      },

      { type: "h2", id: "recapitulation", text: "The summary and the tax calculation" },
      { type: "path", items: ["Récapitulation", "Calcul d'impôt"] },
      {
        type: "screenshot",
        file: "11b-calcul-impot.webp",
        alt: "GeTax tax calculation screen: scale with splitting, relevant income, basic tax, additional cents, 12% reduction, cantonal and communal taxes",
        caption: "The estimated tax: basic tax, cantonal and communal surcharges, 12% reduction and personal tax (GeTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "The summary shows declared income and wealth, deductions, the intercantonal and intercommunal allocation, then an **estimate** of cantonal and communal tax (ICC) and federal direct tax (IFD). It does not bind the AFC, but a surprising result often points to an entry error: net salary entered instead of gross, a federal amount forgotten, family allowances counted twice.",
      },

      { type: "h2", id: "finalisation", text: "Finalisation: advance payments, documents, comments" },
      { type: "path", items: ["Finalisation", "Gérer vos justificatifs"] },
      {
        type: "screenshot",
        file: "11-justificatifs.webp",
        alt: "GeTax supporting documents window: list of required documents and PDF upload",
        caption: "GeTax lists the documents required by your entries and lets you add the PDFs (GeTax 2025, fictitious data)",
      },
      {
        type: "list",
        items: [
          "**« Acomptes / Remboursements »** (advance payments, refunds): state whether you pay next year's instalments online (one QR bill is then enough). Bank details for refunds are changed in your tax account (service « Mes Coordonnées Bancaires »), not in GeTax.",
          "**« Gérer vos justificatifs »**: GeTax first saves the return, then lists the required documents. Add the PDFs with the « + » button or by drag and drop: 20 files and 100 MB at most.",
          "**« Observations »** (comments): any useful note for the assessment (change of situation, paper schedule attached).",
        ],
      },
      {
        type: "table",
        head: ["Document", "Send it?"],
        rows: [
          ["Salary certificate", "**Always**"],
          ["Pillar 3a certificates, pension buy-ins", "Yes"],
          ["Childcare invoices", "Yes"],
          ["Pension certificates, interest and debt documents, divorce judgment", "Only the first time or after a significant change"],
          ["Year-end statements for salary or savings accounts", "No, keep them"],
          ["Receipts for medical costs, donations, property upkeep invoices", "No, keep them"],
          ["The return itself", "No, the summary page is enough"],
        ],
        caption: "Source: AFC Infos March 2026 and 2025 return guide, AFC Geneva. If in doubt, follow GeTax's list of required documents.",
      },

      { type: "h2", id: "depot", text: "Filing: paperless or upload" },
      { type: "path", items: ["Envoi / Impression", "Déposer - Téléverser"] },
      {
        type: "screenshot",
        file: "11c-deposer.webp",
        alt: "GeTax File - Upload window: paperless filing with an e-démarches account, or upload and post the summary page",
        caption: "Two filing modes; large barcodes are now reserved for departure or death returns (GeTax 2025)",
      },
      {
        type: "table",
        head: ["", "Paperless (« Transmettre et déposer »)", "Upload (« Téléverser »)"],
        rows: [
          ["Condition", "e-démarches account and all documents as PDF", "No account, or at least one paper document"],
          ["Steps", "e-démarches login, transmission of the return and documents", "Transmission without login, then print and sign the summary page"],
          ["Proof of filing", "Filing receipt with time stamp and transaction number, first page of the saved PDF", "AFC receives the signed summary page"],
          ["Post", "None", "Signed summary page and paper documents"],
          ["Visible in your tax account", "Immediately", "Once the page arrives, about 10 days at peak times"],
        ],
        caption: "Source: \"Déposer sa déclaration : les différents modes\", getax.ch, and GeTax 2025 help, AFC Geneva.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Upload: only the latest summary page counts",
        text: "An uploaded return is **only filed when the signed summary page arrives**: without it, the AFC has no record of your return. If you correct and upload again, a new page with a new transaction number is created, and that is the one to send.",
      },
      {
        type: "p",
        text: "Save the .tax file and the final PDF: you will import the data next year and can answer any AFC questions.",
      },

      { type: "h2", id: "apres", text: "After filing" },
      {
        type: "list",
        items: [
          "A simple file takes **8 weeks on average**. There is no point chasing the AFC within six months.",
          "You receive the **cantonal and federal tax bills**, the assessment notice and an account statement, by post or in your tax account (e-correspondence).",
          "Balance in your favour: refund within **30 days** to the account on file. Balance due: **30 days** to pay or object (« réclamation »). A payment extension can be requested.",
          "If you spot an error later, file an objection within 30 days of receiving the tax bill.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I know my GeTax return has been filed?",
        a: "With paperless filing, you get a time-stamped filing receipt with a transaction number, and the return appears in your e-démarches account. With an upload, it is only filed once the AFC receives the signed summary page.",
      },
      {
        q: "Do I have to sign the GeTax return?",
        a: "Not with paperless filing: the e-démarches login is enough. With an upload, you sign the summary page and post it.",
      },
      {
        q: "How many documents can I attach in GeTax?",
        a: "Up to 20 PDF files, 100 MB in total, under « Finalisation », « Gérer vos justificatifs ».",
      },
      {
        q: "Can I still file the Geneva return on paper?",
        a: "Printing with large barcodes is now reserved for departure or death returns. An ordinary return must be filed paperless, or uploaded with the summary page posted.",
      },
    ],
  },
};
