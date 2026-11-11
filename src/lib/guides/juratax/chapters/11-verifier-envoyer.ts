import type { GuideChapter } from "../../types";

export const verifierEnvoyer: GuideChapter = {
  slug: "verifier-envoyer",
  readTime: 7,
  fr: {
    title: "Vérifier et envoyer sa déclaration JuraTax : téléversement, page de synthèse, justificatifs et acomptes",
    navTitle: "Vérifier et envoyer",
    metaTitle: "JuraTax : téléverser, page de synthèse, justificatifs (2026)",
    metaDescription:
      "Terminer sa déclaration jurassienne dans JuraTax : rubrique Validation, téléversement avec SwissID (signature électronique) ou Code-DI (page de synthèse à signer), envoi des justificatifs en ligne ou au centre de scannage, liste des pièces à joindre, corrections, formule 110 et acomptes 2027.",
    keywords: [
      "juratax téléversement",
      "juratax page de synthèse",
      "juratax justificatifs",
      "envoyer déclaration impôt jura",
      "juratax corriger déclaration",
      "acomptes impôt jura",
    ],
    summary: [
      "Dans la rubrique **« Validation »**, JuraTax propose l'**envoi électronique** (téléversement) ou l'**envoi postal**, et imprime la **liste des justificatifs** à fournir.",
      "Avec une **SwissID vérifiée** dans JuraTax Online, la déclaration est **signée électroniquement**. Avec le **Code-DI**, la **page de synthèse** doit être **signée et envoyée** : sans elle, la déclaration est considérée comme non déposée.",
      "Les **justificatifs** s'envoient en ligne (PDF ou photo) avec JuraTax Online, ou par la poste au **centre de scannage** du Service des contributions à Delémont avec JuraTax Logiciel.",
      "Une erreur après le téléversement ? On ne peut plus téléverser : envoyez un courrier ou la déclaration corrigée imprimée au Service des contributions.",
    ],
    blocks: [
      { type: "h2", id: "verifier", text: "Vérifier avant d'envoyer" },
      {
        type: "list",
        items: [
          "Parcourez la **prévisualisation** : chaque code de la déclaration doit correspondre à vos documents (salaire du chiffre 11, 3e pilier, primes, valeurs au 31 décembre).",
          "Comparez avec la **décision de taxation de l'an dernier** : un écart important sur un code doit avoir une explication.",
          "Vérifiez les comptes repris de l'année précédente : supprimez les comptes clôturés, ajoutez les nouveaux.",
          "Contrôlez l'**IBAN** de remboursement et, pour un couple, les montants saisis pour chaque conjoint (codes C).",
          "Regardez l'**impôt calculé** par JuraTax : il sert de référence pour vérifier vos acomptes. Pour une arrivée ou un départ en cours d'année, il est calculé sur une année entière et sera corrigé.",
        ],
      },
      {
        type: "screenshot",
        file: "11-revenu-imposable.webp",
        alt: "Écran Revenu imposable de la Récapitulation de JuraTax 2025 : revenu, frais d'acquisition, déductions, revenu net et revenu imposable pour l'impôt cantonal et l'impôt fédéral direct",
        caption: "« Récapitulation », « Revenu imposable » : les deux colonnes montrent les écarts entre impôt cantonal et fédéral (JuraTax 2025, données fictives)",
      },
      {
        type: "screenshot",
        file: "11-calcul-impot.webp",
        alt: "Écran Calcul de l'impôt de JuraTax 2025 : impôt simple, quotité cantonale 2,85, impôt paroissial, quotité communale, total des impôts cantonaux et impôt fédéral direct",
        caption: "« Calcul de l'impôt » : impôt simple multiplié par la quotité cantonale (2,85), communale et paroissiale, plus l'IFD (JuraTax 2025, données fictives)",
      },

      {
        type: "p",
        text: "La rubrique **« Récapitulation »** de JuraTax enchaîne aussi : l'investissement dans des **nouvelles entreprises innovantes** (code 915), l'**IBAN** de remboursement, un lien vers la **formule 120** pour adapter les acomptes (à envoyer séparément, pas avec la déclaration) et, pour les rentiers AVS ou AI, un calculateur de **prestations complémentaires**. L'écran **« Fin »** résume ensuite les modes de transmission.",
      },

      { type: "h2", id: "envoyer", text: "Les quatre façons de transmettre la déclaration" },
      { type: "path", items: ["Téléversement", "Accès Code-DI", "Procéder au téléversement"] },
      {
        type: "table",
        head: ["Mode", "Ce qu'il faut faire", "Justificatifs"],
        rows: [
          ["Téléversement avec SwissID (JuraTax Online uniquement)", "Téléverser ; signature électronique, aucune signature manuscrite. Le Logiciel ne permet plus le téléversement par SwissID, mais JuraTax Online importe ses fichiers .tax", "En ligne (recommandé) ou par la poste au centre de scannage"],
          ["Téléversement avec Code-DI (JuraTax Online ou Logiciel)", "Téléverser (Logiciel : « Téléversement », « Accès Code-DI », « Procéder au téléversement »), puis **signer la page de synthèse** et l'envoyer au Service des contributions", "En ligne avec JuraTax Online ; par la poste avec JuraTax Logiciel"],
          ["Impression papier par JuraTax", "« Impression déclaration d'impôts et code-barres » : imprimer la déclaration avec ses codes-barres et la liste des justificatifs, signer, déposer à la commune de taxation", "Joints au dossier papier, à la commune de taxation"],
          ["Déclaration manuscrite (déconseillé)", "Remplir à la main, signer la déclaration et la formule 5A", "Joints au dossier, à la commune de taxation"],
        ],
        caption: "Source : FAQ « Comment transmettre ma déclaration d'impôt ? » et « Informations sur les pièces justificatives », Service des contributions du canton du Jura (faq.jura.ch).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Code-DI : n'oubliez pas la page de synthèse",
        text: "Après un téléversement par Code-DI, la **signature et l'envoi de la page de synthèse** sont obligatoires. Pour un couple marié, **les deux conjoints signent**. Sans ce document, le Service des contributions considère la déclaration comme **non retournée** : rappel, sommation, puis taxation d'office. Une fois la page reçue, l'accès par Code-DI est désactivé : enregistrez le **PDF de votre déclaration** dès le téléversement.",
      },
      {
        type: "screenshot",
        file: "11-validation.webp",
        alt: "Écran Téléversement de JuraTax 2025 : visualiser la déclaration, choix entre Accès Code-DI et Impression déclaration d'impôts et code-barres, Procéder au téléversement, historique, impression de la liste des justificatifs",
        caption: "« Téléversement » : aperçu, choix du mode de dépôt, puis liste des justificatifs à imprimer (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "11-fin.webp",
        alt: "Écran Fin de JuraTax 2025 : modes de transmission par Code-DI ou impression avec codes-barres, et rappel que le téléversement par SwissID passe par JuraTax Online",
        caption: "L'écran « Fin » rappelle les modes de transmission ; pour la SwissID, il faut JuraTax Online (JuraTax 2025)",
      },

      { type: "h2", id: "justificatifs", text: "Les justificatifs à joindre" },
      {
        type: "p",
        text: "À la fin, JuraTax établit la **liste des pièces justificatives** selon les déductions revendiquées. Avec **JuraTax Online**, vous les transmettez en **PDF** ou en **photo** prise avec votre smartphone (par SMS ou QR code), et les eRelevés importés sont joints automatiquement. Pour les envoyer plutôt par la poste, cliquez sur « Suivant » dans la rubrique « Justificatifs » (le point d'exclamation orange n'est pas bloquant), puis choisissez « **Envoi postal** » dans « Validation ». L'adresse est : **Service des contributions, Centre de scannage, 2, rue de la Justice, 2800 Delémont**. Envoyez uniquement des **copies A4**, non agrafées : tout est détruit après scannage.",
      },
      {
        type: "table",
        head: ["Justificatif", "À joindre"],
        rows: [
          ["Certificats de salaire", "Si l'employeur est hors du canton du Jura ou s'il a remis deux certificats identiques"],
          ["Rachat LPP, 3e pilier A", "Attestation de rachat ; attestation officielle des cotisations 3a"],
          ["Primes d'assurance", "Police d'assurance-maladie 2026 ; décision de réduction de primes de l'ECAS"],
          ["Cotisations syndicales, AVS", "Si elles dépassent CHF 500 (syndicat) ou CHF 1'000 (AVS)"],
          ["Frais de maladie, de handicap", "Si les frais dépassent CHF 1'000"],
          ["Dons", "Si le total dépasse CHF 1'500 : justificatifs des dons de plus de CHF 500"],
          ["Intérêts passifs", "Nouveau prêt en 2026, intérêts privés de plus de CHF 500, résiliation d'une hypothèque à taux fixe"],
          ["Entretien d'immeuble", "Factures finales de plus de CHF 1'000 ; toutes les factures en cas d'excédent de dépenses"],
          ["Titres", "Relevé fiscal du dépôt, décomptes d'achat et de vente, DA-1/R-US"],
          ["Arrivée d'un autre canton ou de l'étranger en 2026", "Tous les justificatifs et la décision de taxation de l'année précédente"],
        ],
        caption: "Source : Guide général 2025, « Après avoir rempli votre déclaration d'impôt », pages 3 et 4, Service des contributions du canton du Jura.",
      },

      { type: "h2", id: "corriger", text: "Corriger une déclaration déjà téléversée" },
      {
        type: "p",
        text: "Une déclaration téléversée **ne peut plus être téléversée à nouveau**. Si vous découvrez une erreur, corrigez-la dans JuraTax Online, allez dans « Validation » et suivez l'indication « Comment corriger sa déclaration d'impôt » : imprimez la déclaration avec le bouton « **Impression déclaration** » et envoyez-la par la poste au Service des contributions. Vous pouvez aussi écrire simplement, avec votre **numéro de contribuable**, la date d'envoi et les modifications à apporter. Faites-le **au plus vite**, avant la taxation.",
      },

      { type: "h2", id: "payer", text: "Solde d'impôt et acomptes" },
      {
        type: "list",
        items: [
          "**Formule 110** : jointe à votre matériel fiscal, elle aide à calculer le solde d'impôt. Si l'impôt estimé dépasse vos acomptes, versez la différence avec son bulletin **avant le 28 février** pour éviter des intérêts compensatoires.",
          "**Acomptes 2027** : l'impôt présumé est facturé en **12 acomptes**, du 10 janvier au 10 décembre, envoyés en trois fois (janvier, mai, septembre). Vous pouvez aussi payer l'impôt annuel en une fois, avec un intérêt rémunératoire.",
          "**Adapter les acomptes** : sur le guichet virtuel (« Modification d'acompte ») avec une SwissID, ou avec la **formule 120**.",
          "**Impôt fédéral direct** : il échoit le 1er mars ; un bordereau provisoire est envoyé si l'impôt provisoire atteint au moins CHF 300.",
          "**Suivi** : avec une SwissID, le guichet virtuel affiche l'avancement de la taxation, la facturation et les paiements.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il signer la déclaration JuraTax ?",
        a: "Avec une SwissID vérifiée dans JuraTax Online, non : la signature est électronique. Avec le Code-DI, il faut signer la page de synthèse et l'envoyer au Service des contributions, les deux conjoints pour un couple marié. Une déclaration imprimée se signe et se dépose au bureau communal.",
      },
      {
        q: "Où envoyer les justificatifs JuraTax par la poste ?",
        a: "Au Service des contributions, Centre de scannage, 2, rue de la Justice, 2800 Delémont, en copies A4 non agrafées. Pour une déclaration papier, tout se dépose à la commune de taxation.",
      },
      {
        q: "Comment corriger une déclaration JuraTax déjà téléversée ?",
        a: "On ne peut plus téléverser. Corrigez la déclaration dans JuraTax Online, imprimez-la avec « Impression déclaration » et envoyez-la par la poste, ou écrivez au Service des contributions avec votre numéro de contribuable et les corrections.",
      },
      {
        q: "Comment modifier ses acomptes d'impôt dans le Jura ?",
        a: "Sur le guichet virtuel jura.ch/guichet, prestation « Modification d'acompte », avec une SwissID, ou en envoyant la formule 120 au Service des contributions.",
      },
    ],
  },
  en: {
    title: "Checking and filing your JuraTax return: upload, summary page, supporting documents and instalments",
    navTitle: "Check and file",
    metaTitle: "JuraTax: upload, summary page, supporting documents (2026)",
    metaDescription:
      "Finish your Jura return in JuraTax: the Validation section, upload with SwissID (electronic signature) or Code-DI (summary page to sign), sending supporting documents online or to the scanning centre, list of documents to enclose, corrections, form 110 and 2027 instalments.",
    keywords: [
      "juratax upload",
      "juratax summary page",
      "juratax supporting documents",
      "file tax return jura",
      "juratax correct return",
      "jura tax instalments",
    ],
    summary: [
      "In the **« Validation »** section, JuraTax offers **electronic filing** (upload, « téléversement ») or **postal filing**, and prints the **list of supporting documents** required.",
      "With a **verified SwissID** in JuraTax Online, the return is **signed electronically**. With the **Code-DI**, the **summary page** (« page de synthèse ») must be **signed and posted**: without it, the return is treated as not filed.",
      "**Supporting documents** are sent online (PDF or photo) with JuraTax Online, or by post to the tax service's **scanning centre** in Delémont with the desktop program.",
      "Spotted a mistake after uploading? You can no longer upload: send a letter or the corrected printed return to the tax service.",
    ],
    blocks: [
      { type: "h2", id: "verifier", text: "Check before filing" },
      {
        type: "list",
        items: [
          "Go through the **preview**: every code on the return must match your documents (salary from box 11, pillar 3a, premiums, values at 31 December).",
          "Compare with **last year's assessment**: a large difference on a code should have an explanation.",
          "Check accounts carried over from last year: delete closed accounts, add new ones.",
          "Check the refund **IBAN** and, for a couple, the amounts entered for each spouse (C codes).",
          "Look at the **tax calculated** by JuraTax: it is a benchmark to check your instalments. If you moved in or out during the year, it is calculated on a full year and will be corrected.",
        ],
      },
      {
        type: "screenshot",
        file: "11-revenu-imposable.webp",
        alt: "JuraTax 2025 summary « Revenu imposable » screen: income, work expenses, deductions, net income and taxable income for cantonal and direct federal tax",
        caption: "« Récapitulation », « Revenu imposable » (taxable income): the two columns show the differences between cantonal and federal tax (JuraTax 2025, fictitious data)",
      },
      {
        type: "screenshot",
        file: "11-calcul-impot.webp",
        alt: "JuraTax 2025 « Calcul de l'impôt » screen: simple tax, cantonal multiplier 2.85, parish tax, municipal multiplier, total cantonal taxes and direct federal tax",
        caption: "« Calcul de l'impôt » (tax calculation): simple tax multiplied by the cantonal (2.85), municipal and parish multipliers, plus federal tax (JuraTax 2025, fictitious data)",
      },

      { type: "h2", id: "envoyer", text: "The four ways to file the return" },
      {
        type: "p",
        text: "JuraTax's **« Récapitulation »** (summary) section also covers: investment in **new innovative companies** (code 915), the refund **IBAN**, a link to **form 120** to adjust instalments (sent separately, not with the return) and, for AHV or disability pensioners, a **supplementary benefits** calculator. The **« Fin »** (end) screen then summarises the filing options.",
      },
      { type: "path", items: ["Téléversement", "Accès Code-DI", "Procéder au téléversement"] },
      {
        type: "table",
        head: ["Method", "What to do", "Supporting documents"],
        rows: [
          ["Upload with SwissID (JuraTax Online only)", "Upload; electronic signature, no handwritten signature. The desktop program no longer allows SwissID upload, but JuraTax Online imports its .tax files", "Online (recommended) or by post to the scanning centre"],
          ["Upload with Code-DI (JuraTax Online or desktop)", "Upload (desktop: « Téléversement », « Accès Code-DI », « Procéder au téléversement »), then **sign the summary page** and post it to the tax service", "Online with JuraTax Online; by post with the desktop program"],
          ["Paper printout from JuraTax", "« Impression déclaration d'impôts et code-barres »: print the return with its barcodes and the list of supporting documents, sign, file at your municipality", "Enclosed with the paper file, at the municipality"],
          ["Handwritten return (not recommended)", "Fill in by hand, sign the return and form 5A", "Enclosed with the file, at the municipality"],
        ],
        caption: "Source: FAQ « Comment transmettre ma déclaration d'impôt ? » and « Informations sur les pièces justificatives », Jura Service des contributions (faq.jura.ch).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Code-DI: don't forget the summary page",
        text: "After a Code-DI upload, **signing and posting the summary page** is mandatory. For a married couple, **both spouses sign**. Without this document, the tax service treats the return as **not returned**: reminder, formal notice, then an estimated assessment. Once the page is received, Code-DI access is deactivated: save the **PDF of your return** as soon as you upload it.",
      },
      {
        type: "screenshot",
        file: "11-validation.webp",
        alt: "JuraTax 2025 upload screen: view the return, choice between Accès Code-DI and printing with barcodes, Procéder au téléversement, history, printing the list of supporting documents",
        caption: "« Téléversement » (upload): preview, filing method, then the list of supporting documents to print (JuraTax 2025)",
      },
      {
        type: "screenshot",
        file: "11-fin.webp",
        alt: "JuraTax 2025 end screen: filing by Code-DI or printing with barcodes, and a reminder that SwissID upload goes through JuraTax Online",
        caption: "The « Fin » screen recaps the filing options; for SwissID you need JuraTax Online (JuraTax 2025)",
      },

      { type: "h2", id: "justificatifs", text: "Supporting documents to enclose" },
      {
        type: "p",
        text: "At the end, JuraTax produces the **list of supporting documents** based on the deductions you claim. With **JuraTax Online**, you send them as **PDFs** or **photos** taken with your smartphone (via SMS or QR code), and imported eRelevés are attached automatically. To post them instead, click « Suivant » (next) in the « Justificatifs » section (the orange exclamation mark does not block you), then choose « **Envoi postal** » (postal filing) under « Validation ». The address is: **Service des contributions, Centre de scannage, 2, rue de la Justice, 2800 Delémont**. Send only **A4 copies**, unstapled: everything is destroyed after scanning.",
      },
      {
        type: "table",
        head: ["Document", "When to enclose it"],
        rows: [
          ["Salary certificates", "If the employer is outside the canton of Jura or issued two identical certificates"],
          ["Pension buy-in, pillar 3a", "Buy-in certificate; official 3a contribution certificate"],
          ["Insurance premiums", "2026 health insurance policy; ECAS premium reduction decision"],
          ["Union dues, AHV contributions", "If they exceed CHF 500 (union) or CHF 1,000 (AHV)"],
          ["Medical and disability costs", "If costs exceed CHF 1,000"],
          ["Donations", "If the total exceeds CHF 1,500: proof of donations above CHF 500"],
          ["Interest paid", "New loan in 2026, private interest above CHF 500, early termination of a fixed-rate mortgage"],
          ["Property upkeep", "Final invoices above CHF 1,000; all invoices if expenses exceed income"],
          ["Securities", "Custody account tax statement, purchase and sale slips, DA-1/R-US"],
          ["Moving from another canton or abroad in 2026", "All supporting documents and last year's assessment"],
        ],
        caption: "Source: 2025 general guide, « Après avoir rempli votre déclaration d'impôt », pages 3 and 4, Jura Service des contributions.",
      },

      { type: "h2", id: "corriger", text: "Correcting a return already uploaded" },
      {
        type: "p",
        text: "An uploaded return **cannot be uploaded again**. If you find a mistake, correct it in JuraTax Online, go to « Validation » and follow the note « Comment corriger sa déclaration d'impôt » (how to correct your return): print the return with the « **Impression déclaration** » (print return) button and post it to the tax service. You can also simply write, quoting your **taxpayer number**, the filing date and the changes. Do it **as soon as possible**, before the assessment.",
      },

      { type: "h2", id: "payer", text: "Tax balance and instalments" },
      {
        type: "list",
        items: [
          "**Form 110**: enclosed with your tax documents, it helps you calculate the tax balance. If the estimated tax exceeds your instalments, pay the difference with its payment slip **before 28 February** to avoid compensatory interest.",
          "**2027 instalments**: the estimated tax is billed in **12 instalments**, from 10 January to 10 December, sent in three batches (January, May, September). You can also pay the annual tax at once and earn interest.",
          "**Adjusting instalments**: on the virtual counter (« Modification d'acompte ») with a SwissID, or with **form 120**.",
          "**Direct federal tax**: due on 1 March; a provisional bill is sent if the provisional tax is at least CHF 300.",
          "**Tracking**: with a SwissID, the virtual counter shows the progress of your assessment, billing and payments.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to sign my JuraTax return?",
        a: "With a verified SwissID in JuraTax Online, no: the signature is electronic. With the Code-DI, you must sign the summary page and post it to the tax service, both spouses for a married couple. A printed return is signed and filed at the municipal office.",
      },
      {
        q: "Where do I post JuraTax supporting documents?",
        a: "To the Service des contributions, Centre de scannage, 2, rue de la Justice, 2800 Delémont, as unstapled A4 copies. For a paper return, everything goes to your municipality.",
      },
      {
        q: "How do I correct a JuraTax return that has already been uploaded?",
        a: "You can no longer upload. Correct the return in JuraTax Online, print it with « Impression déclaration » and post it, or write to the tax service with your taxpayer number and the corrections.",
      },
      {
        q: "How do I change my tax instalments in Jura?",
        a: "On the virtual counter jura.ch/guichet, « Modification d'acompte » service, with a SwissID, or by sending form 120 to the tax service.",
      },
    ],
  },
};
