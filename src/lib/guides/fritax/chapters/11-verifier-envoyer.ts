import type { GuideChapter } from "../../types";

export const verifierEnvoyer: GuideChapter = {
  slug: "verifier-envoyer",
  readTime: 7,
  fr: {
    title: "Vérifier et envoyer sa déclaration avec FriTax : calcul de l'impôt, pièces justificatives et accusé de réception",
    navTitle: "Vérifier et envoyer",
    metaTitle: "FriTax : envoyer la déclaration par internet, pièces à joindre et délai de 72 heures",
    metaDescription:
      "Contrôler la déclaration et le calcul de l'impôt dans FriTax, joindre les pièces demandées (3 Mo par fichier, photo au téléphone possible), envoyer avec le code FriTax, accusé de réception et corrections pendant 72 heures, ou envoi papier signé.",
    keywords: [
      "fritax envoyer déclaration",
      "fritax pièces justificatives",
      "fritax accusé de réception",
      "fritax 72 heures",
      "fritax calcul impôt",
      "déclaration fribourg papier signature",
    ],
    summary: [
      "Avant l'envoi, ouvrez le formulaire **« Calcul de l'impôt »**, en bas de la liste « Formulaires », pour une estimation de vos impôts cantonal, communal, paroissial et fédéral.",
      "FriTax indique lui-même **quelles pièces joindre** selon vos saisies. Fichiers de **3 Mo** au plus ; une photo prise au téléphone suffit.",
      "L'envoi électronique se fait avec le **code FriTax**. L'**accusé de réception** remplace la signature : vérifiez-le.",
      "Vous pouvez **renvoyer une version corrigée pendant 72 heures**, autant de fois que nécessaire. Ensuite, la déclaration est réputée déposée.",
    ],
    blocks: [
      { type: "h2", id: "controler", text: "Contrôler la déclaration et le calcul de l'impôt" },
      { type: "path", items: ["Formulaires", "Calcul de l'impôt"] },
      {
        type: "p",
        text: "Le formulaire « **Calcul de l'impôt** » (« Calcul estimatif de l'impôt ») estime votre impôt cantonal (coefficient de 96 % en 2026), communal et paroissial, selon les coefficients de votre commune et de votre paroisse, ainsi que l'impôt fédéral direct. C'est une **estimation** : la taxation du SCC fait foi. Comparez le résultat avec vos acomptes : si l'impôt dû est nettement plus élevé, vous pouvez payer un **acompte volontaire** avec le bulletin prévu, pour limiter l'intérêt moratoire.",
      },
      {
        type: "screenshot",
        file: "11-calcul-impot.webp",
        alt: "Formulaire Calcul de l'impôt de FriTax : revenu et fortune imposables, impôt cantonal, communal, paroissial et fédéral direct",
        caption: "Le « Calcul estimatif de l'impôt » : impôt cantonal (coefficient 96 %), communal, ecclésiastique et fédéral direct (FriTax 2025)",
      },
      {
        type: "list",
        items: [
          "Les **revenus** sont-ils tous là, y compris ceux de la personne 2, des indemnités et des rentes ?",
          "Les **jours de travail et de repas** de l'annexe 03 tiennent-ils compte du télétravail ?",
          "Chaque **compte** ouvert ou fermé en 2026 figure-t-il dans l'état des titres ?",
          "Les **enfants** ont-ils la bonne case (A*, B* ou C*) et les frais de garde sont-ils saisis ?",
          "Le **3e pilier A**, les rachats et les pensions versées ont-ils leur attestation ?",
        ],
      },

      { type: "h2", id: "pieces", text: "Les pièces justificatives" },
      {
        type: "p",
        text: "Avec l'envoi électronique, **la plupart des pièces ne sont plus demandées** : FriTax liste lui-même les documents à joindre selon ce que vous avez déclaré, dans la fenêtre « **Gestion des pièces justificatives** » (icône trombone de la barre d'outils), et ses exigences priment sur les instructions générales. Restent en général exigés : les comptes des indépendants, les **relevés de dépôt de titres** et certains relevés bancaires au-delà d'un seuil, les attestations de **3e pilier A et de rachat LPP**, les frais d'entretien d'immeuble au-delà d'un seuil, les frais liés au handicap, ainsi que les rentes et pensions **la première année** où elles sont déclarées.",
      },
      {
        type: "list",
        items: [
          "Chaque fichier peut peser jusqu'à **3 Mo**.",
          "Pas de scanner ? Une **photo prise avec le téléphone** est acceptée.",
          "N'envoyez jamais d'originaux : le SCC scanne les documents puis les détruit.",
          "Conservez toutes les pièces **pendant 10 ans** : le SCC peut les demander lors d'un contrôle.",
        ],
      },
      {
        type: "screenshot",
        file: "11-pieces-justificatives.webp",
        alt: "Fenêtre Gestion des pièces justificatives de FriTax : rachat LPP 4.140 exigé, attestation 3e pilier A 4.130 exigée la première fois avec case Déjà déclaré l'année passée, pièces facultatives",
        caption: "L'icône trombone ouvre la « Gestion des pièces justificatives » : pièces exigées (ici le rachat LPP), pièces exigées seulement la première fois (3e pilier A, avec « Déjà déclaré l'année passée ») et pièces facultatives (FriTax 2025, données fictives)",
      },
      {
        type: "screenshot",
        file: "11-envoi-electronique.webp",
        alt: "Fenêtre Remarques avant l'envoi électronique de FriTax : récépissé dans les 5 minutes, onglet Quittance d'envoi, 72 heures pour corriger, J'accepte",
        caption: "Avant l'envoi, FriTax rappelle les règles : récépissé en PDF sous 5 minutes, 72 heures pour corriger, chaque envoi remplace le précédent (FriTax 2025)",
      },

      { type: "h2", id: "envoyer", text: "Envoyer par internet avec le code FriTax" },
      {
        type: "steps",
        items: [
          "Cliquez sur « **Envoi électronique** » dans la barre d'outils et acceptez les conditions (« J'accepte »).",
          "FriTax affiche les pièces justificatives à joindre : ajoutez-les.",
          "Saisissez le **code FriTax** de 6 caractères (en majuscules) imprimé sur la fourre « Déclaration d'impôt » et confirmez : la transmission est **cryptée et sécurisée**.",
          "Dans les **5 minutes**, un **récépissé** arrive dans FriTax, onglet « **Quittance d'envoi** » : il contient votre déclaration complète en PDF, avec la date et l'heure du dépôt. Conservez-le : c'est la preuve du dépôt.",
          "Exportez une copie de sauvegarde de votre déclaration (« Exporter déclaration d'impôt » sur l'écran d'accueil) pour l'an prochain.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "72 heures pour corriger",
        text: "Selon l'article 157 LICD, l'accusé de réception **remplace la signature manuscrite**. Pendant les **72 heures** qui suivent, vous pouvez renvoyer une version corrigée autant de fois que nécessaire ; le SCC n'a pas accès aux données avant la fin de ce délai. Sans nouvel envoi, la déclaration est réputée **valablement déposée**. Attention : **chaque nouvel envoi remplace le précédent**, l'historique n'est pas conservé. Après 72 heures, une correction passe par un courrier au SCC.",
      },
      {
        type: "p",
        text: "L'envoi électronique est possible jusqu'au **31 décembre de l'année qui suit** la période fiscale, soit jusqu'au 31 décembre 2027 pour la déclaration 2026 ; ensuite, seul l'envoi papier est accepté. L'envoi par e-mail n'est pas possible. Un envoi électronique est aussi le seul moyen d'obtenir un **traitement rapide** de la taxation, utile pour une demande de subside ou de bourse.",
      },

      { type: "h2", id: "papier", text: "Envoyer sur papier" },
      {
        type: "p",
        text: "Si vous préférez le papier, FriTax imprime la déclaration, les annexes et une **feuille de codes-barres** sur papier blanc. **Signez tous les documents imprimés** (les deux conjoints pour un couple), glissez-les avec les pièces justificatives dans la fourre originale et envoyez le tout, **affranchi**, au Service cantonal des contributions, case postale, 1701 Fribourg. Avec l'envoi papier, **toutes** les pièces justificatives mentionnées dans les instructions générales doivent être jointes.",
      },

      { type: "h2", id: "apres", text: "Après l'envoi : taxation et paiement" },
      {
        type: "list",
        items: [
          "**Impôt cantonal et communal** : payé en principe en **9 acomptes**, puis un décompte final après la taxation. Les décisions arrivent au fil de l'année, à des dates qui varient d'une année à l'autre.",
          "**Intérêts** : pour l'impôt cantonal 2025, le SCC appliquait 3,75 % d'intérêt moratoire sur les acomptes payés en retard ou en moins et 0,25 % d'intérêt rémunératoire sur les paiements anticipés volontaires ; les taux sont fixés chaque année.",
          "**Impôt fédéral direct** : bordereau provisoire à payer au **31 mars 2027**, puis décompte avec la taxation ; acomptes volontaires possibles dès juillet 2026.",
          "**Ordre permanent** : à mettre à jour chaque année, car la référence des bulletins change.",
          "**Contestation** : réclamation écrite dans les **30 jours** dès la notification de la taxation.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il signer la déclaration envoyée par FriTax ?",
        a: "Non. Avec l'envoi électronique, l'accusé de réception remplace la signature manuscrite (art. 157 et 158 LICD). Seule la déclaration envoyée sur papier doit être signée.",
      },
      {
        q: "Peut-on corriger une déclaration déjà envoyée avec FriTax ?",
        a: "Oui, pendant 72 heures après l'accusé de réception, en renvoyant une nouvelle version autant de fois que nécessaire. Ensuite, la déclaration est réputée déposée et toute correction passe par un courrier au SCC.",
      },
      {
        q: "Quelle taille pour les pièces justificatives dans FriTax ?",
        a: "3 Mo au maximum par fichier. Une photo prise avec le téléphone est acceptée. FriTax indique quelles pièces joindre selon vos saisies.",
      },
      {
        q: "Jusqu'à quand peut-on envoyer la déclaration 2026 par internet ?",
        a: "Jusqu'au 31 décembre 2027, sous réserve de votre délai de dépôt. Après cette date, seul l'envoi papier est accepté.",
      },
    ],
  },
  en: {
    title: "Checking and filing your return with FriTax: tax calculation, supporting documents and receipt",
    navTitle: "Check and file",
    metaTitle: "FriTax: filing online, documents to attach and the 72-hour correction window",
    metaDescription:
      "Checking the return and tax calculation in FriTax, attaching the requested documents (3 MB per file, phone photos accepted), filing with the FriTax code, the receipt and corrections within 72 hours, or filing a signed paper return.",
    keywords: [
      "fritax file return",
      "fritax supporting documents",
      "fritax receipt",
      "fritax 72 hours",
      "fritax tax calculation",
      "fribourg paper tax return signature",
    ],
    summary: [
      "Before filing, open the **« Calcul de l'impôt »** (tax calculation) form, at the bottom of the « Formulaires » list, for an estimate of your cantonal, municipal, parish and federal tax.",
      "FriTax itself tells you **which documents to attach** based on your entries. Files up to **3 MB**; a phone photo is enough.",
      "Electronic filing uses the **FriTax code**. The **receipt** replaces your signature: check it.",
      "You can **send a corrected version within 72 hours**, as many times as needed. After that, the return is deemed filed.",
    ],
    blocks: [
      { type: "h2", id: "controler", text: "Checking the return and the tax calculation" },
      { type: "path", items: ["Formulaires", "Calcul de l'impôt"] },
      {
        type: "p",
        text: "The « **Calcul de l'impôt** » form (« Calcul estimatif de l'impôt », estimated tax calculation) estimates your cantonal tax (96% multiplier in 2026), municipal and parish tax, using your municipality's and parish's multipliers, and direct federal tax. It is an **estimate**: the SCC's assessment is binding. Compare the result with your instalments: if the tax due is clearly higher, you can make a **voluntary instalment** with the slip provided, to limit late-payment interest.",
      },
      {
        type: "screenshot",
        file: "11-calcul-impot.webp",
        alt: "FriTax tax calculation form: taxable income and wealth, cantonal, municipal, parish and direct federal tax",
        caption: "The « Calcul estimatif de l'impôt »: cantonal (96% multiplier), municipal, church and direct federal tax (FriTax 2025)",
      },
      {
        type: "list",
        items: [
          "Is all **income** there, including person 2's, benefits and pensions?",
          "Do the **working and meal days** in schedule 03 take home office into account?",
          "Does every **account** opened or closed in 2026 appear in the securities list?",
          "Do the **children** have the right box (A*, B* or C*) and is childcare entered?",
          "Do **pillar 3a**, buy-ins and maintenance paid have their certificates?",
        ],
      },

      { type: "h2", id: "pieces", text: "Supporting documents" },
      {
        type: "p",
        text: "With electronic filing, **most documents are no longer required**: FriTax lists the documents to attach based on what you declared, in the « **Gestion des pièces justificatives** » window (paperclip icon in the toolbar), and its requirements take precedence over the general instructions. Usually still required: accounts for the self-employed, **securities custody statements** and some bank statements above a threshold, **pillar 3a and pension buy-in** certificates, property upkeep costs above a threshold, disability costs, and pensions **in the first year** they are declared.",
      },
      {
        type: "list",
        items: [
          "Each file can be up to **3 MB**.",
          "No scanner? A **photo taken with your phone** is accepted.",
          "Never send originals: the SCC scans documents and then destroys them.",
          "Keep all documents **for 10 years**: the SCC may ask for them during an audit.",
        ],
      },
      {
        type: "screenshot",
        file: "11-pieces-justificatives.webp",
        alt: "FriTax supporting documents manager: pension buy-in 4.140 required, pillar 3a certificate 4.130 required the first time with an Already declared last year box, optional documents",
        caption: "The paperclip icon opens « Gestion des pièces justificatives »: required documents (here the pension buy-in), documents required only the first time (pillar 3a, with « Déjà déclaré l'année passée ») and optional documents (FriTax 2025, fictitious data)",
      },
      {
        type: "screenshot",
        file: "11-envoi-electronique.webp",
        alt: "FriTax « Remarques avant l'envoi électronique » window: receipt within 5 minutes, Quittance d'envoi tab, 72 hours to correct, J'accepte",
        caption: "Before filing, FriTax recaps the rules: PDF receipt within 5 minutes, 72 hours to correct, each submission replaces the previous one (FriTax 2025)",
      },

      { type: "h2", id: "envoyer", text: "Filing online with the FriTax code" },
      {
        type: "steps",
        items: [
          "Click « **Envoi électronique** » (electronic filing) in the toolbar and accept the conditions (« J'accepte »).",
          "FriTax shows the supporting documents to attach: add them.",
          "Enter the 6-character **FriTax code** (capitals) printed on the « Déclaration d'impôt » folder and confirm: the transmission is **encrypted and secure**.",
          "Within **5 minutes**, a **receipt** arrives in FriTax, « **Quittance d'envoi** » tab: it contains your full return as a PDF, with the date and time of filing. Keep it: it is your proof of filing.",
          "Export a backup of your return (« Exporter déclaration d'impôt » on the start screen) for next year.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "72 hours to correct",
        text: "Under article 157 LICD, the receipt **replaces your handwritten signature**. During the following **72 hours** you can resend a corrected version as many times as needed; the SCC cannot see the data until that window closes. Without a new submission, the return is deemed **validly filed**. Note: **each new submission replaces the previous one**; no history is kept. After 72 hours, corrections go by letter to the SCC.",
      },
      {
        type: "p",
        text: "Electronic filing is possible until **31 December of the year after** the tax period, i.e. until 31 December 2027 for the 2026 return; after that only paper is accepted. Filing by email is not possible. Electronic filing is also the only way to get **fast-tracked** processing, useful for subsidy or study grant applications.",
      },

      { type: "h2", id: "papier", text: "Filing on paper" },
      {
        type: "p",
        text: "If you prefer paper, FriTax prints the return, schedules and a **barcode sheet** on plain paper. **Sign every printed document** (both spouses for a couple), put them with the supporting documents into the original folder and send everything, **stamped**, to the Service cantonal des contributions, case postale, 1701 Fribourg. With a paper return, **all** supporting documents listed in the general instructions must be attached.",
      },

      { type: "h2", id: "apres", text: "After filing: assessment and payment" },
      {
        type: "list",
        items: [
          "**Cantonal and municipal tax**: normally paid in **9 instalments**, then a final statement after the assessment. Decisions arrive throughout the year, on dates that vary from year to year.",
          "**Interest**: for 2025 cantonal tax, the SCC charged 3.75% late-payment interest on instalments paid late or short and paid 0.25% on voluntary advance payments; rates are set each year.",
          "**Direct federal tax**: provisional bill due by **31 March 2027**, then a final statement with the assessment; voluntary instalments possible from July 2026.",
          "**Standing orders**: update them every year, as the payment slip reference changes.",
          "**Objections**: written objection within **30 days** of notification of the assessment.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to sign a return filed with FriTax?",
        a: "No. With electronic filing, the receipt replaces the handwritten signature (art. 157 and 158 LICD). Only a paper return must be signed.",
      },
      {
        q: "Can I correct a return already filed with FriTax?",
        a: "Yes, within 72 hours of the receipt, by resending a new version as many times as needed. After that the return is deemed filed and corrections go by letter to the SCC.",
      },
      {
        q: "What size can supporting documents be in FriTax?",
        a: "Up to 3 MB per file. Phone photos are accepted. FriTax tells you which documents to attach based on your entries.",
      },
      {
        q: "Until when can I file the 2026 return online?",
        a: "Until 31 December 2027, subject to your filing deadline. After that date, only paper returns are accepted.",
      },
    ],
  },
};
