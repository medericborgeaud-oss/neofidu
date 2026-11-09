import type { GuideChapter } from "../../types";

export const verifierEnvoyer: GuideChapter = {
  slug: "verifier-envoyer",
  readTime: 7,
  fr: {
    title: "Vérifier et transmettre sa déclaration VSTax : validation, calcul d'impôt, justificatifs et envoi sans signature",
    navTitle: "Vérifier et transmettre",
    metaTitle: "VSTax : valider, joindre les justificatifs et transmettre",
    metaDescription:
      "Valider la déclaration VSTax, lancer le calcul estimatif de l'impôt, joindre les justificatifs (PDF ou VSTax-QR avec Tell Tax) et transmettre par internet sans signature, avec 15 jours pour corriger.",
    keywords: [
      "vstax transmettre déclaration",
      "vstax envoi sans signature",
      "vstax justificatifs",
      "vstax qr tell tax",
      "vstax calcul impôt",
      "vstax quittance",
    ],
    summary: [
      "Avant l'envoi, lancez la **validation** (menu « Outils ») : elle liste les champs obligatoires vides et les incohérences. Une déclaration non validée porte la mention « incomplet ».",
      "Le **calcul estimatif** (menu « Calcul de l'impôt ») donne l'impôt cantonal, communal et fédéral attendu.",
      "Joignez les justificatifs en **PDF, JPG, PNG ou TIFF**, depuis l'ordinateur ou avec **VSTax-QR** et l'application Tell Tax, en les classant par catégorie.",
      "La transmission se fait par **internet**, avec le **mot de passe** de 10 caractères. Avec 100 % des justificatifs en ligne, **aucune signature** n'est nécessaire et vous disposez de **15 jours** pour corriger.",
    ],
    blocks: [
      { type: "h2", id: "valider", text: "Valider la déclaration" },
      { type: "path", items: ["Outils", "Valider la déclaration"] },
      {
        type: "screenshot",
        file: "11-menu-outils.webp",
        alt: "Menu Outils de VSTax : options, recherche des mises à jour, récapitulation, module fiduciaire, valider la déclaration cochée, marquer la déclaration comme déposée, notes personnelles",
        caption: "Le menu « Outils » : la coche devant « Valider la déclaration » active le contrôle continu (VSTax 2025)",
      },
      {
        type: "p",
        text: "Dans le menu « Outils », « Valider la déclaration » est une **option à cocher** : tant qu'elle est cochée, VSTax contrôle la déclaration en continu. La validation contrôle que tous les **champs obligatoires** sont remplis et que les données sont **cohérentes**. Le résultat s'affiche dans la zone de validation, en deux blocs : « **Tests des champs à corriger** » liste les champs obligatoires vides, « **Tests de cohérence** » les incohérences entre les données (par exemple des jours de télétravail non déduits des jours de déplacement). Un clic sur un message place le curseur dans le champ concerné. Un test de cohérence n'est qu'un avertissement : si la situation est correcte, cochez sa case pour le considérer comme respecté. La validation est aussi lancée automatiquement avant l'impression et la transmission.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "« Incomplet » ou « brouillon » sur les pages",
        text: "Si les formulaires imprimés portent ces mentions ou si la transmission échoue, relancez la validation et corrigez chaque point listé. Le SCC rappelle de vérifier en particulier la case du **chiffre 7** (prestations en capital) en page 3 : il faut cocher « Non » si vous n'avez reçu aucun capital.",
      },
      {
        type: "screenshot",
        file: "11-validation.webp",
        alt: "Zone de validation de VSTax : tous les champs obligatoires sont remplis, un test de cohérence sur les jours de télétravail avec sa case à cocher",
        caption: "La zone de validation : champs obligatoires en haut, tests de cohérence en bas ; un clic sur le lien mène au champ concerné (VSTax 2025)",
      },

      { type: "h2", id: "calcul", text: "Le calcul estimatif de l'impôt" },
      { type: "path", items: ["Calcul de l'impôt", "Effectuer le calcul d'impôt"] },
      {
        type: "screenshot",
        file: "11-calcul-impot.webp",
        alt: "Calcul estimatif de l'impôt dans VSTax : revenus et fortune imposables, impôt cantonal, impôt communal, impôt fédéral direct et prestations en capital",
        caption: "Le calcul estimatif : barèmes, indexation, coefficient communal, puis impôts cantonal, communal et fédéral (VSTax 2025, données fictives)",
      },
      {
        type: "p",
        text: "VSTax affiche un **calcul estimatif** de l'impôt cantonal, de l'impôt communal (selon le coefficient et l'indexation de votre commune) et de l'impôt fédéral direct. Comparez-le avec vos acomptes : un écart important signale souvent un montant mal placé (salaire brut au lieu de net, frais saisis deux fois). Le menu **Outils, Récapitulation** compare aussi votre revenu avec celui de l'année précédente.",
      },

      { type: "h2", id: "justificatifs", text: "Joindre les justificatifs" },
      { type: "path", items: ["Justificatifs", "Ajouter un justificatif..."] },
      {
        type: "screenshot",
        file: "11-ajouter-justificatif.webp",
        alt: "Fenêtre Ajouter un justificatif de VSTax : ajouter de cet ordinateur, ajouter du VSTax QR, description courte et catégorie",
        caption: "Ajouter un justificatif : depuis l'ordinateur ou par VSTax QR, avec une description et une catégorie obligatoire (VSTax 2025)",
      },
      {
        type: "screenshot",
        file: "11-justificatifs-zone.webp",
        alt: "Zone Justificatifs de la déclaration d'impôts dans VSTax : pièces classées par catégorie (salaires, 3e pilier, frais de maladie, état des titres, dettes)",
        caption: "Les justificatifs classés par catégorie dans la zone de gauche (VSTax 2025, noms de fichiers fictifs)",
      },
      {
        type: "screenshot",
        file: "11-vstax-qr.webp",
        alt: "Fenêtre Transférer le justificatif avec VSTax QR : code QR à scanner avec l'application Tell Tax",
        caption: "VSTax QR : scannez le code avec Tell Tax, photographiez les pièces, puis cliquez sur « OK » (VSTax 2025, code QR masqué)",
      },
      {
        type: "p",
        text: "La zone « **Justificatifs de la déclaration d'impôts** », à gauche, reçoit les fichiers **PDF, JPG, PNG ou TIFF**, par le bouton d'ajout ou par glisser-déposer. Pour chaque fichier, choisissez une **catégorie** : salaires, rentes, état des titres, dettes, frais d'entretien d'immeubles, dépenses professionnelles, 3e pilier, frais de maladie, dons, formation, déductions pour les enfants, assurances sur la vie, prestation en capital, autres pièces. Le classement permet au SCC de rattacher chaque pièce à la bonne rubrique.",
      },
      {
        type: "list",
        items: [
          "**VSTax-QR** : le menu « Justificatifs », « Ajouter un justificatif avec VSTax QR... » (touche F12) affiche un code QR. Ouvrez l'application gratuite **Tell Tax** sur votre téléphone, section « VsTax-QR », scannez le code puis photographiez vos documents : ils arrivent directement dans VSTax.",
          "**Fin du cloud Tell Tax** : dès la période fiscale 2026, Tell Tax ne stocke plus les justificatifs dans le cloud. Seule la voie VSTax-QR reste possible.",
          "**Pour un envoi sans signature**, chaque rubrique remplie doit être justifiée : VSTax refuse la transmission tant qu'il manque des pièces dans une catégorie utilisée.",
        ],
      },

      { type: "h2", id: "transmettre", text: "Transmettre la déclaration par internet" },
      { type: "path", items: ["Fichier", "Déposer la déclaration..."] },
      {
        type: "screenshot",
        file: "11-depot-etape1.webp",
        alt: "Fenêtre Déposer la déclaration d'impôt en ligne de VSTax : tous les justificatifs importés électroniquement, justificatifs en format papier, ou dépôt en format papier avec barcode 2D",
        caption: "L'étape 1 du dépôt : trois variantes ; la première, tout électronique, ne demande aucun envoi postal et laisse 15 jours pour corriger (VSTax 2025)",
      },
      {
        type: "screenshot",
        file: "11-menu-affichage.webp",
        alt: "Menu Affichage de VSTax : zoom, pages, afficher en PDF la déclaration imprimée, afficher la quittance après l'envoi par internet",
        caption: "Le menu « Affichage » : la quittance et la copie PDF de la déclaration restent accessibles après l'envoi (VSTax 2025)",
      },
      {
        type: "steps",
        items: [
          "VSTax enregistre la déclaration et lance une validation complète.",
          "**Étape 1** : choisissez la variante d'envoi. Pour l'envoi sans signature, indiquez une adresse e-mail valable et précisez s'il s'agit de votre déclaration ou de celle d'un tiers.",
          "**Étape 2** : saisissez le **mot de passe** de 10 caractères imprimé sur votre déclaration et cliquez sur « Démarrer la transmission ». La liaison est chiffrée.",
          "**Étape 3** : enregistrez ou imprimez la **quittance**. Avec des justificatifs papier, imprimez-la, signez-la et envoyez-la avec ces documents au Service cantonal des contributions, Centre de scannage, Av. de la Gare 35, 1951 Sion.",
          "**Étape 4** : cliquez sur « Terminer ». La quittance reste consultable par le menu « Affichage », « Afficher la quittance après l'envoi par internet ».",
        ],
      },
      {
        type: "table",
        head: ["Variante", "Justificatifs", "Signature", "À envoyer par la poste"],
        rows: [
          ["Tout par internet (recommandé)", "100 % numérisés dans VSTax", "Non", "Rien : la quittance électronique est à conserver"],
          ["Internet et papier", "En partie numérisés", "Oui, sur la quittance", "Quittance signée et justificatifs papier"],
          ["Impression complète", "Papier", "Oui", "Déclaration complète, seulement sans connexion internet"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, « Exigences du SCC pour l'envoi de la déclaration d'impôts à l'aide de VSTax ».",
      },
      {
        type: "callout",
        tone: "info",
        title: "15 jours pour corriger",
        text: "Après un envoi entièrement électronique, vous disposez de **15 jours** pour transmettre une version corrigée. Ensuite, une petite correction (une rubrique) se fait par lettre avec les pièces ; une correction importante demande d'imprimer la déclaration complète avec la page à code-barres. Si VSTax détecte une connexion internet, la déclaration ne peut être déposée que par internet.",
      },
      {
        type: "p",
        text: "En cas d'échec, vérifiez le mot de passe (majuscules comprises), puis la connexion et les réglages de proxy dans « Outils », « Options ». Le SCC envoie les décisions de taxation chaque semaine, au fil d'une campagne qui dure environ un an. Conservez le fichier .vstax et vos justificatifs : il servira de base pour l'année prochaine.",
      },
    ],
    faq: [
      {
        q: "Faut-il signer la déclaration VSTax ?",
        a: "Non, si vous transmettez la déclaration par internet avec 100 % des justificatifs numérisés. Si une partie des pièces est envoyée sur papier, il faut imprimer, signer et poster la quittance avec ces pièces.",
      },
      {
        q: "Peut-on corriger une déclaration VSTax déjà envoyée ?",
        a: "Oui, pendant 15 jours après un envoi entièrement électronique, en transmettant une nouvelle version. Ensuite, par lettre pour une petite correction, ou en déposant une déclaration complète imprimée pour une correction importante.",
      },
      {
        q: "Comment scanner ses justificatifs avec le téléphone ?",
        a: "Dans VSTax, menu « Justificatifs », « Ajouter un justificatif avec VSTax QR... » : un code QR s'affiche. Scannez-le avec l'application Tell Tax (section « VsTax-QR »), puis photographiez les documents.",
      },
      {
        q: "Le mot de passe VSTax ne fonctionne pas, que faire ?",
        a: "Vérifiez les majuscules et les caractères proches (0 et O, 1 et l). Le mot de passe compte 10 caractères et figure en page 1 de la déclaration ou en page 2 de la feuille d'information. En cas de perte, contactez votre commune ou le SCC.",
      },
    ],
  },
  en: {
    title: "Checking and filing your VSTax return: validation, tax estimate, documents and paperless filing",
    navTitle: "Check and file",
    metaTitle: "VSTax: validate, attach documents and file without a signature",
    metaDescription:
      "Validate the VSTax return, run the estimated tax calculation, attach documents (PDF or VSTax-QR with Tell Tax) and file online without a signature, with 15 days to make corrections.",
    keywords: [
      "vstax file return",
      "vstax paperless filing",
      "vstax documents",
      "vstax qr tell tax",
      "vstax tax calculation",
      "vstax receipt",
    ],
    summary: [
      "Before filing, run the **validation** (« Outils » menu): it lists empty mandatory fields and inconsistencies. A return that fails validation is marked « incomplet » (incomplete).",
      "The **estimated calculation** (« Calcul de l'impôt » menu) gives the expected cantonal, municipal and federal tax.",
      "Attach documents as **PDF, JPG, PNG or TIFF**, from your computer or with **VSTax-QR** and the Tell Tax app, sorted by category.",
      "Filing is **online**, with the 10-character **password**. With 100% of documents online, **no signature** is needed and you have **15 days** to correct it.",
    ],
    blocks: [
      { type: "h2", id: "valider", text: "Validating the return" },
      { type: "path", items: ["Outils", "Valider la déclaration"] },
      {
        type: "screenshot",
        file: "11-menu-outils.webp",
        alt: "VSTax Tools menu: options, update check, summary, fiduciary module, validate return ticked, mark return as filed, personal notes",
        caption: "The « Outils » (tools) menu: the tick next to « Valider la déclaration » turns on continuous checking (VSTax 2025)",
      },
      {
        type: "p",
        text: "In the « Outils » menu, « Valider la déclaration » is an **on/off option**: while it is ticked, VSTax checks the return continuously. Validation checks that all **mandatory fields** are filled in and that the data is **consistent**. Results appear in the validation area, in two blocks: « **Tests des champs à corriger** » (fields to correct) lists empty mandatory fields, « **Tests de cohérence** » (consistency checks) lists inconsistencies in the data (for example home-working days not deducted from commuting days). Clicking a message takes you to the field. A consistency check is only a warning: if your situation is correct, tick its box to mark it as met. Validation also runs automatically before printing and filing.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "« Incomplet » or « brouillon » on the pages",
        text: "If printed forms show these words (incomplete, draft) or filing fails, run the validation again and fix every item listed. The SCC specifically reminds you to check the **section 7** box (lump sums) on page 3: tick « Non » (no) if you received no lump sum.",
      },
      {
        type: "screenshot",
        file: "11-validation.webp",
        alt: "VSTax validation area: all mandatory fields filled in, one consistency check about home-working days with its checkbox",
        caption: "The validation area: mandatory fields at the top, consistency checks below; clicking the link takes you to the field (VSTax 2025)",
      },

      { type: "h2", id: "calcul", text: "The estimated tax calculation" },
      { type: "path", items: ["Calcul de l'impôt", "Effectuer le calcul d'impôt"] },
      {
        type: "screenshot",
        file: "11-calcul-impot.webp",
        alt: "VSTax estimated tax calculation: taxable income and wealth, cantonal, municipal and federal tax and lump sums",
        caption: "The estimated calculation: scales, indexation, municipal coefficient, then cantonal, municipal and federal tax (VSTax 2025, fictitious data)",
      },
      {
        type: "p",
        text: "VSTax shows an **estimated calculation** of cantonal tax, municipal tax (based on your municipality's coefficient and indexation) and direct federal tax. Compare it with your provisional payments: a large gap often points to a misplaced amount (gross salary instead of net, expenses entered twice). The **Outils, Récapitulation** (summary) menu also compares your income with the previous year.",
      },

      { type: "h2", id: "justificatifs", text: "Attaching documents" },
      { type: "path", items: ["Justificatifs", "Ajouter un justificatif..."] },
      {
        type: "screenshot",
        file: "11-ajouter-justificatif.webp",
        alt: "VSTax add a document window: add from this computer, add from VSTax QR, short description and category",
        caption: "Adding a document: from the computer or via VSTax QR, with a description and a mandatory category (VSTax 2025)",
      },
      {
        type: "screenshot",
        file: "11-justificatifs-zone.webp",
        alt: "VSTax supporting documents area: files sorted by category (salaries, pillar 3a, medical costs, securities, debts)",
        caption: "Documents sorted by category in the left-hand area (VSTax 2025, fictitious file names)",
      },
      {
        type: "screenshot",
        file: "11-vstax-qr.webp",
        alt: "VSTax QR transfer window: QR code to scan with the Tell Tax app",
        caption: "VSTax QR: scan the code with Tell Tax, photograph the documents, then click « OK » (VSTax 2025, QR code hidden)",
      },
      {
        type: "p",
        text: "The « **Justificatifs de la déclaration d'impôts** » (supporting documents) area on the left takes **PDF, JPG, PNG or TIFF** files, via the add button or drag and drop. For each file, choose a **category**: salaries, pensions, securities list, debts, property upkeep, work expenses, pillar 3a, medical costs, donations, training, child deductions, life insurance, lump sum, other documents. Sorting lets the SCC link each document to the right section.",
      },
      {
        type: "list",
        items: [
          "**VSTax-QR**: the « Justificatifs », « Ajouter un justificatif avec VSTax QR... » menu (F12 key) shows a QR code. Open the free **Tell Tax** app on your phone, « VsTax-QR » section, scan the code and photograph your documents: they go straight into VSTax.",
          "**End of the Tell Tax cloud**: from tax year 2026, Tell Tax no longer stores documents in the cloud. Only the VSTax-QR route remains.",
          "**For paperless filing**, every section you filled in must have supporting documents: VSTax refuses to file while a category you used has none.",
        ],
      },

      { type: "h2", id: "transmettre", text: "Filing the return online" },
      { type: "path", items: ["Fichier", "Déposer la déclaration..."] },
      {
        type: "screenshot",
        file: "11-depot-etape1.webp",
        alt: "VSTax file the return online window: all documents imported electronically, paper documents remaining, or paper filing with 2D barcode",
        caption: "Filing step 1: three options; the first, fully electronic, needs nothing by post and leaves 15 days for corrections (VSTax 2025)",
      },
      {
        type: "screenshot",
        file: "11-menu-affichage.webp",
        alt: "VSTax View menu: zoom, pages, show the printed return as PDF, show the receipt after online filing",
        caption: "The « Affichage » (view) menu: the receipt and PDF copy of the return remain available after filing (VSTax 2025)",
      },
      {
        type: "steps",
        items: [
          "VSTax saves the return and runs a full validation.",
          "**Step 1**: choose how to file. For paperless filing, give a valid email address and say whether it is your own return or someone else's.",
          "**Step 2**: enter the 10-character **password** printed on your return and click « Démarrer la transmission » (start filing). The connection is encrypted.",
          "**Step 3**: save or print the **receipt** (« quittance »). With paper documents, print it, sign it and post it with those documents to the Service cantonal des contributions, Centre de scannage, Av. de la Gare 35, 1951 Sion.",
          "**Step 4**: click « Terminer » (finish). The receipt remains available under « Affichage », « Afficher la quittance après l'envoi par internet ».",
        ],
      },
      {
        type: "table",
        head: ["Option", "Documents", "Signature", "To post"],
        rows: [
          ["All online (recommended)", "100% scanned in VSTax", "No", "Nothing: keep the electronic receipt"],
          ["Online and paper", "Partly scanned", "Yes, on the receipt", "Signed receipt and paper documents"],
          ["Full printout", "Paper", "Yes", "Full return, only without an internet connection"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, SCC requirements for filing with VSTax.",
      },
      {
        type: "callout",
        tone: "info",
        title: "15 days to make corrections",
        text: "After fully electronic filing, you have **15 days** to send a corrected version. After that, a small correction (one section) is made by letter with the documents; a major correction requires printing the full return with the barcode page. If VSTax detects an internet connection, the return can only be filed online.",
      },
      {
        type: "p",
        text: "If filing fails, check the password (including capitals), then your connection and proxy settings under « Outils », « Options ». The SCC sends assessments weekly, over a campaign lasting about a year. Keep the .vstax file and your documents: it will be the starting point for next year.",
      },
    ],
    faq: [
      {
        q: "Do I need to sign the VSTax return?",
        a: "No, if you file online with 100% of documents scanned. If some documents are sent on paper, you must print, sign and post the receipt with them.",
      },
      {
        q: "Can I correct a VSTax return after filing?",
        a: "Yes, within 15 days of fully electronic filing, by sending a new version. After that, by letter for a small correction, or by filing a full printed return for a major one.",
      },
      {
        q: "How do I scan documents with my phone?",
        a: "In VSTax, « Justificatifs » menu, « Ajouter un justificatif avec VSTax QR... »: a QR code appears. Scan it with the Tell Tax app (« VsTax-QR » section), then photograph the documents.",
      },
      {
        q: "My VSTax password does not work. What should I do?",
        a: "Check capitals and look-alike characters (0 and O, 1 and l). The password has 10 characters and is on page 1 of the return or page 2 of the information sheet. If lost, contact your municipality or the SCC.",
      },
    ],
  },
};
