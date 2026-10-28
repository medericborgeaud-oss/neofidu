import type { GuideChapter } from "../../types";

export const verifierEnvoyer: GuideChapter = {
  slug: "verifier-envoyer",
  readTime: 6,
  fr: {
    title: "Vérifier et envoyer sa déclaration VaudTax : justificatifs, quittance et suite",
    navTitle: "Vérifier et envoyer",
    metaTitle: "Envoyer sa déclaration VaudTax : quittance, justificatifs, taxation",
    metaDescription:
      "La check-list avant d'envoyer votre déclaration vaudoise, comment joindre les justificatifs, la quittance de dépôt, le délai de 6 jours pour corriger, puis la décision de taxation et la réclamation.",
    keywords: [
      "envoyer déclaration vaudtax",
      "quittance vaudtax",
      "justificatifs vaudtax",
      "corriger déclaration vaudtax",
      "décision de taxation vaud réclamation",
      "erreurs déclaration impôt vaud",
    ],
    summary: [
      "Avant d'envoyer, relisez la **check-list des erreurs fréquentes** ci-dessous (certificats manquants, télétravail, subsides, comptes oubliés).",
      "Joignez les **pièces obligatoires** directement dans VaudTax : certificats de salaire, relevés fiscaux, attestations 3a, rachats LPP dès CHF 10'000, frais de garde.",
      "Après l'envoi, téléchargez et gardez le PDF **« Quittance et avis récapitulatif »** : c'est votre seule preuve de dépôt.",
      "Vous avez **6 jours** pour envoyer une version corrigée. Ensuite, la décision de taxation arrive et vous disposez de **30 jours** pour faire réclamation si elle est fausse.",
    ],
    blocks: [
      { type: "h2", id: "check-list", text: "La check-list avant d'envoyer" },
      {
        type: "p",
        text: "Ce sont les erreurs que nous voyons le plus souvent en reprenant des déclarations vaudoises remplies seul :",
      },
      {
        type: "list",
        items: [
          "**Un certificat de salaire oublié** (job d'été, deuxième employeur, indemnités de chômage).",
          "**Frais de transport et de repas non réduits** malgré le télétravail ou une interruption de travail.",
          "**Repas à CHF 3'200** alors que la case G (cantine) est cochée sur le certificat.",
          "**Subsides d'assurance-maladie non indiqués** : l'office d'impôt les connaît et corrigera.",
          "**Compte à l'étranger, compte épargne d'un enfant mineur ou crypto oubliés** dans l'état des titres.",
          "**Impôt anticipé non récupéré** parce que des dividendes suisses n'ont pas été déclarés.",
          "**3e pilier du conjoint** saisi chez le mauvais contribuable.",
          "**Déduction pour le logement (code 660)** oubliée par un ménage locataire modeste.",
          "**Frais de garde sans justificatifs** joints.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Comparez le résultat avec l'année précédente. Un écart important de revenu imposable sans changement de situation signale souvent une erreur de saisie. Vous pouvez aussi estimer votre impôt avec notre [simulateur d'impôts](/simulateur/impots).",
      },

      { type: "h2", id: "justificatifs", text: "Joindre les justificatifs" },
      {
        type: "p",
        text: "VaudTax permet de joindre les pièces au format électronique. Elles sont enregistrées dans votre fichier .vaudtax et transmises avec la déclaration. Les **pièces obligatoires** sont :",
      },
      {
        type: "list",
        items: [
          "Certificats de salaire de tous les employeurs.",
          "eRelevé fiscal ou relevés des valeurs fiscales des titres au 31 décembre.",
          "Attestations officielles de versement au 3e pilier A.",
          "Attestations de rachat LPP **dès CHF 10'000**.",
          "Justificatifs des frais de garde par des tiers.",
          "Justificatifs originaux des gains de loterie soumis à l'impôt anticipé.",
        ],
      },
      {
        type: "p",
        text: "Les autres pièces (frais médicaux, entretien d'immeuble, petits rachats LPP, frais bancaires) sont facultatives mais doivent être **conservées** : l'office d'impôt peut les demander lors du contrôle.",
      },

      { type: "h2", id: "envoyer", text: "Transmettre la déclaration" },
      {
        type: "steps",
        items: [
          "Sauvegardez une dernière fois votre fichier .vaudtax sur votre appareil.",
          "Lancez la transmission électronique depuis VaudTax et suivez les étapes de validation.",
          "Attendez l'écran **« Quittance de votre dépôt de déclaration d'impôt »**. Un PDF « Quittance et avis récapitulatif » se télécharge automatiquement.",
          "Vérifiez que le PDF est bien enregistré avant de fermer la fenêtre : une fois fermée, il n'est plus possible de le régénérer.",
          "Aucune signature n'est nécessaire et rien n'est à envoyer par la poste, sauf les pièces que vous n'auriez pas pu joindre (avec la chemise A3 reçue).",
        ],
      },
      { type: "screenshot", file: "11-outils.webp", alt: "Outils VaudTax : pièces justificatives, vérifier, calculer les impôts, imprimer un brouillon, transmettre", caption: "Les outils du menu : joindre les pièces, vérifier, calculer l'impôt, puis transmettre (VaudTax 2025, mode simulation, données fictives)" },
      {
        type: "callout",
        tone: "warning",
        title: "Sans quittance, pas de dépôt",
        text: "Si vous n'avez ni le message de confirmation ni le PDF, la déclaration n'est pas considérée comme déposée. Recommencez la transmission ou appelez le support VaudTax (021 316 10 40). L'envoi par e-mail n'est pas accepté.",
      },

      { type: "h2", id: "corriger", text: "Corriger après l'envoi" },
      {
        type: "p",
        text: "Vous disposez de **6 jours** après le premier envoi électronique pour transmettre une nouvelle version complète, qui remplace la précédente. Passé ce délai, vous pouvez encore envoyer une déclaration corrigée sur papier tant que la taxation n'a pas été notifiée, ou écrire à votre office d'impôt.",
      },

      { type: "h2", id: "payer", text: "Payer ou être remboursé" },
      {
        type: "list",
        items: [
          "Vous avez payé des **acomptes** pendant 2026 sur la base d'une estimation. Si l'impôt réel semble nettement plus élevé, faites un **paiement volontaire** d'ici fin mars avec la QR-facture vierge reçue avec la déclaration : cela limite les intérêts.",
          "Si votre situation a changé durablement (nouvel emploi, hausse de salaire), adaptez vos acomptes de l'année en cours avec la prestation **e-ACO**.",
          "Pour un remboursement, communiquez votre IBAN (compte à votre nom ou à celui de votre conjoint), par exemple via **e-InfoRemboursement**.",
        ],
      },

      { type: "h2", id: "taxation", text: "Après l'envoi : décision de taxation et réclamation" },
      {
        type: "p",
        text: "L'office d'impôt de votre district contrôle la déclaration, parfois en demandant des pièces, puis vous envoie la **décision de taxation** et le **décompte final**, en général dans l'année qui suit. Le solde est payable à 30 jours. Comparez la décision avec votre déclaration : les corrections de l'office sont indiquées.",
      },
      {
        type: "p",
        text: "Si vous n'êtes pas d'accord, vous pouvez déposer une **réclamation écrite et motivée dans les 30 jours** dès la notification. Passé ce délai, la taxation devient définitive.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Une question sur une décision de taxation vaudoise ? NeoFidu propose un [second avis](/second-avis) sur votre déclaration ou votre taxation.",
      },
    ],
    faq: [
      {
        q: "Comment savoir si ma déclaration VaudTax a bien été envoyée ?",
        a: "Vous devez voir l'écran « Quittance de votre dépôt de déclaration d'impôt » et avoir téléchargé le PDF « Quittance et avis récapitulatif ». Sans ces deux éléments, le dépôt n'est pas valable.",
      },
      {
        q: "J'ai oublié un document après l'envoi. Que faire ?",
        a: "Dans les 6 jours suivant le premier envoi, transmettez une nouvelle version complète depuis VaudTax. Ensuite, envoyez le document à votre office d'impôt avec votre numéro de contribuable, ou une déclaration corrigée sur papier tant que la taxation n'est pas notifiée.",
      },
      {
        q: "Combien de temps pour contester une taxation dans le canton de Vaud ?",
        a: "30 jours dès la notification de la décision de taxation, par une réclamation écrite et motivée adressée à l'office d'impôt.",
      },
    ],
  },
  en: {
    title: "Checking and filing your VaudTax return: documents, receipt and what happens next",
    navTitle: "Check and file",
    metaTitle: "Filing your VaudTax return: receipt, documents, assessment (English)",
    metaDescription:
      "Checklist before filing your Vaud tax return, attaching documents, the filing receipt, the 6-day correction window, then the tax assessment and how to object.",
    keywords: [
      "submit vaudtax",
      "vaudtax receipt quittance",
      "vaud tax assessment objection",
      "correct vaud tax return",
      "common tax return mistakes switzerland",
      "vaud tax return filing",
    ],
    summary: [
      "Before filing, go through the **common mistakes checklist** below (missing certificates, home office, subsidies, forgotten accounts).",
      "Attach **mandatory documents** directly in VaudTax: salary certificates, tax statements, 3a certificates, pension buy-ins from CHF 10,000, childcare invoices.",
      "After filing, download and keep the **« Quittance et avis récapitulatif »** PDF: it is your only proof of filing.",
      "You have **6 days** to send a corrected version. Later, the tax assessment arrives and you have **30 days** to object if it is wrong.",
    ],
    blocks: [
      { type: "h2", id: "check-list", text: "Checklist before filing" },
      {
        type: "list",
        items: [
          "**A forgotten salary certificate** (summer job, second employer, unemployment benefits).",
          "**Commuting and meal deductions not reduced** despite home office or a work interruption.",
          "**CHF 3,200 meals** claimed while box G (canteen) is ticked on the certificate.",
          "**Health insurance subsidies not entered**: the tax office knows them and will correct.",
          "**Foreign account, a minor child's savings or crypto forgotten** in the securities list.",
          "**Withholding tax not recovered** because Swiss dividends were not declared.",
          "**Spouse's pillar 3a** entered under the wrong taxpayer.",
          "**Housing deduction (code 660)** forgotten by a modest tenant household.",
          "**Childcare costs without receipts** attached.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Compare the result with last year. A large change in taxable income without a change in situation often signals an input error. You can also estimate your tax with our [tax simulator](/simulateur/impots).",
      },

      { type: "h2", id: "justificatifs", text: "Attaching documents" },
      {
        type: "p",
        text: "VaudTax lets you attach documents electronically; they are stored in your .vaudtax file and sent with the return. **Mandatory documents**: salary certificates, eRelevé fiscal or securities tax values at 31 December, pillar 3a certificates, pension buy-in certificates from CHF 10,000, childcare receipts, and original lottery win statements subject to withholding tax. Keep all other receipts in case the tax office asks.",
      },

      { type: "h2", id: "envoyer", text: "Submitting the return" },
      {
        type: "steps",
        items: [
          "Save your .vaudtax file to your device one last time.",
          "Start the electronic submission in VaudTax and follow the validation steps.",
          "Wait for the **« Quittance de votre dépôt de déclaration d'impôt »** screen. A « Quittance et avis récapitulatif » PDF downloads automatically.",
          "Make sure the PDF is saved before closing the window: once closed, it cannot be regenerated.",
          "No signature is needed and nothing needs posting, except documents you could not attach (use the A3 folder you received).",
        ],
      },
      { type: "screenshot", file: "11-outils.webp", alt: "VaudTax tools: supporting documents, check, calculate tax, print a draft, submit", caption: "Menu tools: attach documents, check, calculate tax, then submit (VaudTax 2025, simulation mode, fictitious data)" },
      {
        type: "callout",
        tone: "warning",
        title: "No receipt, no filing",
        text: "Without the confirmation message and the PDF, the return is not considered filed. Submit again or call VaudTax support (021 316 10 40). Email submission is not accepted.",
      },

      { type: "h2", id: "corriger", text: "Correcting after submission" },
      {
        type: "p",
        text: "You have **6 days** after the first electronic submission to send a new complete version, which replaces the previous one. After that, you can still send a corrected paper return as long as the assessment has not been issued, or write to your tax office.",
      },

      { type: "h2", id: "payer", text: "Paying or getting a refund" },
      {
        type: "list",
        items: [
          "You paid **provisional instalments** during 2026. If your real tax looks much higher, make a **voluntary payment** by the end of March with the blank QR bill received with the return, to limit interest.",
          "If your situation has changed permanently (new job, pay rise), adjust the current year's instalments with the **e-ACO** online service.",
          "For refunds, provide your IBAN (account in your or your spouse's name), for example via **e-InfoRemboursement**.",
        ],
      },

      { type: "h2", id: "taxation", text: "After filing: assessment and objection" },
      {
        type: "p",
        text: "Your district tax office reviews the return, sometimes asking for documents, then sends the **tax assessment** (décision de taxation) and the **final statement**, usually during the following year. Any balance is payable within 30 days. If you disagree, file a **written, reasoned objection (réclamation) within 30 days** of notification. After that, the assessment becomes final.",
      },
    ],
    faq: [
      {
        q: "How do I know my VaudTax return was submitted?",
        a: "You must see the « Quittance de votre dépôt de déclaration d'impôt » screen and have downloaded the « Quittance et avis récapitulatif » PDF. Without both, the filing is not valid.",
      },
      {
        q: "How long do I have to object to a Vaud tax assessment?",
        a: "30 days from notification of the assessment, with a written and reasoned objection sent to the tax office.",
      },
    ],
  },
};
