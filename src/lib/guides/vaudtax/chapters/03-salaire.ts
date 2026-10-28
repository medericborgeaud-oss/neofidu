import type { GuideChapter } from "../../types";

export const salaire: GuideChapter = {
  slug: "salaire",
  readTime: 7,
  fr: {
    title: "Déclarer son salaire dans VaudTax : certificat de salaire, chômage, rentes",
    navTitle: "Salaire et revenus",
    metaTitle: "VaudTax : où saisir son salaire et le certificat de salaire | NeoFidu",
    metaDescription:
      "Où reporter le certificat de salaire dans VaudTax (code 100), comment déclarer une activité accessoire, les allocations, le chômage, les indemnités et les rentes.",
    keywords: [
      "vaudtax certificat de salaire",
      "code 100 déclaration vaud",
      "chiffre 11 certificat de salaire",
      "activité accessoire vaudtax",
      "chômage déclaration impôt vaud",
      "allocations familiales impôt vaud",
    ],
    summary: [
      "Reportez le **salaire net du chiffre 11** de chaque certificat de salaire, pas le brut (code 100).",
      "Un emploi à moins de 30 % est une **activité accessoire** (code 105), avec un forfait de frais spécifique.",
      "Les indemnités chômage, maladie, accident ou APG **non comprises dans le certificat de salaire** se déclarent à part (codes 200 à 220).",
      "Les rentes AVS, AI, LPP et 3e pilier A sont imposables et ont leurs propres codes (240 à 270).",
    ],
    blocks: [
      { type: "h2", id: "certificat", text: "Le certificat de salaire : quel chiffre reporter ?" },
      {
        type: "p",
        text: "Pour chaque employeur, VaudTax demande les montants de votre certificat de salaire. Le montant clé est le **salaire net du chiffre 11**, c'est-à-dire après déduction des cotisations AVS/AI/APG/AC/AANP et des cotisations au 2e pilier. Ces cotisations sont donc déjà « déduites » : ne les déclarez pas une seconde fois ailleurs.",
      },
      { type: "path", items: ["Activités salariées (codes 100 à 120)", "Afficher", "Principale, accessoire, allocations non versées par l'employeur, administrateur"] },
      {
        type: "steps",
        items: [
          "Ouvrez la rubrique **« Activités salariées (codes 100 à 120) »** puis **« Afficher »**.",
          "Ajoutez un certificat par employeur (ou par période chez le même employeur si vous en avez reçu plusieurs).",
          "Recopiez les chiffres demandés, en particulier le **chiffre 11 (salaire net)**. Vérifiez les cases cochées en haut du certificat (F : transport gratuit, G : cantine) car elles influencent vos déductions de frais.",
          "Joignez une copie du certificat : c'est une pièce **obligatoire**.",
          "Si vous avez eu une interruption de travail (maladie, congé non payé, chômage partiel), indiquez les périodes dans la rubrique des frais professionnels : voir [Frais professionnels](/guide/vaudtax/frais-professionnels).",
        ],
      },
      { type: "screenshot", file: "03-certificat-salaire.webp", alt: "Formulaire de saisie d'un certificat de salaire dans VaudTax : employeur, taux, dates, salaire net chiffre 11, cotisations LPP chiffre 10.1", caption: "VaudTax indique sous chaque champ le chiffre correspondant du certificat de salaire (VaudTax 2025, mode simulation, données fictives)" },
      {
        type: "callout",
        tone: "tip",
        title: "Lire son certificat en 30 secondes",
        text: "Chiffre 8 = salaire brut total. Chiffre 9 = cotisations AVS/AI/APG/AC/AANP. Chiffre 10 = cotisations LPP (10.1 ordinaires, 10.2 rachats). Chiffre 11 = salaire net, celui qui compte. Cases F et G et chiffre 13 = indications sur les frais remboursés.",
      },

      { type: "h2", id: "accessoire", text: "Activité accessoire (code 105)" },
      {
        type: "p",
        text: "Est accessoire une activité salariée régulière à **moins de 30 %** d'un horaire normal, ou une activité à plein temps occasionnelle de courte durée (jobs, cours privés, sapeurs-pompiers volontaires, mandats ponctuels). Elle se saisit dans la même rubrique, sur une ligne « accessoire ». Avantage : un forfait de frais de 20 % du gain (minimum CHF 800, maximum CHF 2'400). Voir notre article sur l'[activité accessoire](/blog/activite-accessoire-suisse-declaration-revenus).",
      },

      { type: "h2", id: "allocations", text: "Allocations familiales et pourboires (code 110)" },
      {
        type: "p",
        text: "Les allocations familiales sont imposables. Si elles figurent déjà sur votre certificat de salaire, ne faites rien. Si elles vous sont versées **directement par une caisse de compensation** (par exemple quand le conjoint ne travaille pas en Suisse), déclarez-les au code 110, comme les pourboires non inclus dans le certificat.",
      },

      { type: "h2", id: "pertes-de-gain", text: "Chômage, maladie, accident, service militaire (codes 200 à 220)" },
      { type: "path", items: ["Indemnités perte de gain (codes 200 à 220)", "Afficher"] },
      {
        type: "table",
        head: ["Revenu", "Code", "Document"],
        rows: [
          ["Indemnités de chômage (si pas sur un certificat de salaire)", "200", "Attestation de la caisse de chômage"],
          ["APG service militaire, protection civile, J+S versées directement", "200", "Attestation de la caisse de compensation"],
          ["Indemnités journalières maladie ou accident versées directement", "210", "Attestation de l'assurance"],
          ["Indemnités journalières de l'AI", "220", "Décision ou attestation AI"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Si votre employeur a encaissé les indemnités et vous les a reversées avec le salaire, elles sont déjà dans le chiffre 11. Les déclarer une deuxième fois ferait payer l'impôt deux fois.",
      },

      { type: "h2", id: "rentes", text: "Rentes et pensions (codes 240 à 280)" },
      { type: "path", items: ["Rentes et pensions (codes 240 à 280)", "Afficher"] },
      {
        type: "list",
        items: [
          "**Code 240** : rentes AVS et AI (y compris rentes extraordinaires). Les prestations complémentaires et l'allocation pour impotent ne sont **pas** imposables.",
          "**Code 250** : rentes de caisse de pension (2e pilier).",
          "**Code 260** : rentes du 3e pilier A, imposables à 100 %.",
          "**Code 270** : autres rentes, dont les rentes accident LAA (SUVA) et les rentes viagères.",
          "**Code 280** : pension alimentaire reçue pour vous-même ou pour vos enfants mineurs.",
        ],
      },
      {
        type: "p",
        text: "Un **retrait en capital** (2e pilier, 3e pilier A) ne se met pas ici : il est imposé séparément, à taux réduit, et se déclare dans la rubrique « Prestation en capital ».",
      },

      { type: "h2", id: "autres", text: "Autres revenus (code 195)" },
      {
        type: "p",
        text: "Sous-location d'un appartement ou d'une chambre, location sur une plateforme type Airbnb, droits d'auteur, location de biens mobiliers : ces revenus se déclarent au code 195 (rubrique « Autres revenus de toute nature »). Pour un logement meublé, on déclare en règle générale **80 % des loyers encaissés**.",
      },
    ],
    faq: [
      {
        q: "Dois-je reporter le salaire brut ou net dans VaudTax ?",
        a: "Le salaire net figurant au chiffre 11 du certificat de salaire, c'est-à-dire après les cotisations sociales et LPP.",
      },
      {
        q: "J'ai eu trois employeurs en 2026. Comment faire ?",
        a: "Saisissez un certificat de salaire par employeur dans la rubrique Activités salariées, et joignez chacun d'eux. Pensez à adapter vos frais de transport et de repas aux périodes réellement travaillées.",
      },
      {
        q: "Où déclarer un retrait de mon 3e pilier ?",
        a: "Dans la rubrique « Prestation en capital ». Le capital est imposé séparément du reste de vos revenus, à un taux réduit.",
      },
    ],
  },
  en: {
    title: "Declaring your salary in VaudTax: salary certificate, unemployment, pensions",
    navTitle: "Salary and income",
    metaTitle: "VaudTax: where to enter your salary certificate (English guide)",
    metaDescription:
      "Where to enter your salary certificate in VaudTax (code 100), how to declare a side job, family allowances, unemployment, daily allowances and pensions.",
    keywords: [
      "vaudtax salary certificate",
      "lohnausweis vaud",
      "salary certificate box 11",
      "side job tax vaud",
      "unemployment benefits tax vaud",
      "vaud tax return income",
    ],
    summary: [
      "Enter the **net salary from box 11** of each salary certificate, not the gross amount (code 100).",
      "A job below 30% is a **side activity** (code 105), with its own flat-rate expense deduction.",
      "Unemployment, sickness, accident or military pay **not included in the salary certificate** is declared separately (codes 200 to 220).",
      "AVS/AHV, disability, pension fund and pillar 3a annuities are taxable and have their own codes (240 to 270).",
    ],
    blocks: [
      { type: "h2", id: "certificat", text: "Salary certificate: which box to use?" },
      {
        type: "p",
        text: "For each employer, VaudTax asks for the amounts on your salary certificate (certificat de salaire / Lohnausweis). The key figure is the **net salary in box 11**, after social security (AVS/AI/APG/AC/AANP) and pension fund contributions. Those contributions are therefore already deducted: do not declare them again elsewhere.",
      },
      { type: "path", items: ["Activités salariées (codes 100 à 120)", "Afficher", "Principale, accessoire, allocations non versées par l'employeur, administrateur"] },
      {
        type: "steps",
        items: [
          "Open the section **« Activités salariées (codes 100 à 120) »** (employment income), then **« Afficher »**.",
          "Add one certificate per employer (or per period if the same employer issued several).",
          "Copy the requested figures, especially **box 11 (net salary)**. Check the boxes ticked at the top of the certificate (F: free transport, G: canteen), as they affect your expense deductions.",
          "Attach a copy of the certificate: it is a **mandatory** document.",
          "If you had a work interruption (sickness, unpaid leave, short-time work), enter the periods in the professional expenses section: see [Work expenses](/guide/vaudtax/frais-professionnels).",
        ],
      },
      { type: "screenshot", file: "03-certificat-salaire.webp", alt: "Salary certificate form in VaudTax: employer, rate, dates, net salary box 11, pension contributions box 10.1", caption: "VaudTax shows the matching salary certificate box under each field (VaudTax 2025, simulation mode, fictitious data)" },
      {
        type: "callout",
        tone: "tip",
        title: "Reading your certificate in 30 seconds",
        text: "Box 8 = total gross salary. Box 9 = AVS/AI/APG/AC/AANP contributions. Box 10 = pension fund contributions (10.1 ordinary, 10.2 buy-ins). Box 11 = net salary, the one that matters. Boxes F and G and box 13 = information on reimbursed expenses.",
      },

      { type: "h2", id: "accessoire", text: "Side activity (code 105)" },
      {
        type: "p",
        text: "A side activity is regular employment below **30%** of normal hours, or occasional short full-time work (odd jobs, private lessons, volunteer firefighting, one-off assignments). Enter it in the same section on a « accessoire » line. Benefit: a flat expense deduction of 20% of the income (minimum CHF 800, maximum CHF 2,400).",
      },

      { type: "h2", id: "allocations", text: "Family allowances and tips (code 110)" },
      {
        type: "p",
        text: "Family allowances are taxable. If they already appear on your salary certificate, do nothing. If a **compensation fund pays them to you directly**, declare them under code 110, like tips not included in the certificate.",
      },

      { type: "h2", id: "pertes-de-gain", text: "Unemployment, sickness, accident, military service (codes 200 to 220)" },
      { type: "path", items: ["Indemnités perte de gain (codes 200 à 220)", "Afficher"] },
      {
        type: "table",
        head: ["Income", "Code", "Document"],
        rows: [
          ["Unemployment benefits (if not on a salary certificate)", "200", "Unemployment fund statement"],
          ["Military, civil protection or J+S pay (APG) paid to you directly", "200", "Compensation fund statement"],
          ["Sickness or accident daily allowances paid to you directly", "210", "Insurer's statement"],
          ["Disability insurance (AI) daily allowances", "220", "AI decision or statement"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "If your employer received the allowances and paid them to you with your salary, they are already in box 11. Declaring them again would mean paying tax twice.",
      },

      { type: "h2", id: "rentes", text: "Pensions and annuities (codes 240 to 280)" },
      { type: "path", items: ["Rentes et pensions (codes 240 à 280)", "Afficher"] },
      {
        type: "list",
        items: [
          "**Code 240**: AVS/AHV old-age and AI disability pensions. Supplementary benefits (PC) and helplessness allowances are **not** taxable.",
          "**Code 250**: pension fund (2nd pillar) annuities.",
          "**Code 260**: pillar 3a annuities, 100% taxable.",
          "**Code 270**: other annuities, including accident (LAA/SUVA) pensions and life annuities.",
          "**Code 280**: maintenance received for yourself or your minor children.",
        ],
      },
      {
        type: "p",
        text: "A **lump-sum withdrawal** (2nd pillar, pillar 3a) does not go here: it is taxed separately at a reduced rate and declared in the « Prestation en capital » section.",
      },

      { type: "h2", id: "autres", text: "Other income (code 195)" },
      {
        type: "p",
        text: "Subletting a flat or room, renting on a platform such as Airbnb, royalties, renting out movable goods: declare this income under code 195 (« Autres revenus de toute nature »). For furnished lettings, you usually declare **80% of the rent received**.",
      },
    ],
    faq: [
      {
        q: "Do I enter my gross or net salary in VaudTax?",
        a: "The net salary shown in box 11 of the salary certificate, after social security and pension fund contributions.",
      },
      {
        q: "I had three employers in 2026. What should I do?",
        a: "Enter one salary certificate per employer in the employment income section and attach each one. Adjust your commuting and meal deductions to the periods you actually worked.",
      },
      {
        q: "My salary was taxed at source. Do I still declare it?",
        a: "If you file an ordinary or subsequent ordinary assessment return, yes: declare the full salary, and the tax withheld at source is credited against the final tax bill without interest.",
      },
    ],
  },
};
