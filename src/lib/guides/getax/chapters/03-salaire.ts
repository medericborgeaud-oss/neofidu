import type { GuideChapter } from "../../types";

export const salaire: GuideChapter = {
  slug: "salaire",
  readTime: 7,
  fr: {
    title: "Saisir son salaire dans GeTax : certificat de salaire, bonus, chômage et rentes",
    navTitle: "Salaire et revenus",
    metaTitle: "GeTax 2026 : où saisir le certificat de salaire (code 11.10)",
    metaDescription:
      "Comment reporter le certificat de salaire dans GeTax : salaire brut chiffre 1 au code 11.10, bonus, cotisations AVS et LPP, allocations familiales, activité accessoire, chômage et rentes.",
    keywords: [
      "getax certificat de salaire",
      "code 11.10 genève",
      "salaire brut getax",
      "allocations familiales getax",
      "gains accessoires impôt genève",
      "rentes avs déclaration genève",
    ],
    summary: [
      "Dans GeTax, on part du **salaire brut** (chiffre 1 du certificat, code **11.10**), et non du salaire net comme dans d'autres cantons.",
      "Les **cotisations sociales** se saisissent sur le même écran : AVS/AI/APG/chômage (chiffre 9, code 31.10), 2e pilier (chiffre 10.1, code 31.12) et rachats LPP (chiffre 10.2, code 31.30).",
      "Si vos **allocations familiales** sont comprises dans le salaire brut, retirez-les du chiffre 1 et déclarez-les dans la fiche de l'enfant.",
      "Les **gains accessoires occasionnels** (code 16.20) donnent droit à un forfait de 20 % du revenu net, minimum **CHF 810**, maximum **CHF 2'429** en 2026.",
    ],
    blocks: [
      { type: "h2", id: "selection", text: "Sélection des revenus" },
      { type: "path", items: ["Revenu", "Sélection des revenus"] },
      {
        type: "p",
        text: "Cochez pour chaque contribuable ce qui le concerne : salaire, allocations remplaçant le salaire (chômage, maladie, accident, maternité), interruptions de travail non payées, activité indépendante, rentes AVS/AI, pensions et rentes viagères. Les écrans correspondants apparaissent ensuite dans l'arborescence.",
      },

      { type: "h2", id: "certificat", text: "Reporter le certificat de salaire" },
      { type: "path", items: ["Revenu", "Activité dépendante - Contr.A"] },
      {
        type: "p",
        text: "Indiquez d'abord l'employeur, l'adresse du lieu de travail, la **commune d'imposition** et le taux d'activité. Si vous habitez le canton de Genève et travaillez dans un autre canton, choisissez comme commune d'imposition **votre commune de domicile**. Reportez ensuite les chiffres du certificat de salaire.",
      },
      {
        type: "screenshot",
        file: "03-salaire.webp",
        alt: "Écran Activité dépendante de GeTax : chiffres 1 à 7 du certificat de salaire, allocations pour frais 13.2, cotisations 9, 10.1 et 10.2",
        caption: "Chaque champ porte la référence du certificat de salaire : 1 à 7 pour les revenus, 13.2 pour les allocations de frais, 9 et 10 pour les cotisations (GeTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Certificat de salaire", "Champ GeTax", "Code"],
        rows: [
          ["Chiffre 1 : salaire", "Salaire", "11.10"],
          ["Chiffre 2 : prestations accessoires", "Prestations salariales accessoires", "11.10"],
          ["Chiffre 3 : bonus, gratification", "Prestations non périodiques", "11.15"],
          ["Chiffre 4 : prestations en capital", "Prestations en capital", "11.70"],
          ["Chiffre 5 : actions, options", "Droits de participations selon annexe", "11.40"],
          ["Chiffre 6 : tantièmes", "Tantièmes et jetons de présence", "11.30"],
          ["Chiffre 13.2 : allocations pour frais", "Frais de représentation, de voiture, autres", "11.90 à 11.92"],
          ["Chiffre 9 : AVS, AI, APG, chômage", "Cotisations AVS/AI, APG, Chômage, AANP", "31.10"],
          ["Chiffre 10.1 : 2e pilier ordinaire", "Prévoyance 2ème pilier", "31.12"],
          ["Chiffre 10.2 : rachats LPP", "Rachat(s) de la prévoyance professionnelle", "31.30"],
        ],
        caption: "Codes du Guide de la déclaration 2025, AFC Genève. Pour le contribuable B, remplacer 11 par 21 et 31 par 41.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Allocations familiales comprises dans le salaire",
        text: "Si la rubrique 15 « Observations » du certificat indique que les allocations familiales sont incluses dans le salaire brut, **déduisez-les du chiffre 1** avant de le reporter, puis indiquez leur montant dans la fiche de chaque enfant. Sinon, elles seraient comptées deux fois.",
      },
      {
        type: "p",
        text: "Les **cases F et G** du certificat comptent aussi : F signale un transport gratuit entre domicile et travail (pas de déduction de déplacements), G une participation de l'employeur aux repas (la déduction de repas est réduite de moitié). Cochez-les dans GeTax comme sur le certificat.",
      },

      { type: "h2", id: "plusieurs-employeurs", text: "Plusieurs employeurs et activité accessoire" },
      {
        type: "p",
        text: "Un second certificat de salaire se saisit sous « Autres activités dépendantes », bouton **Insérer**, en bas du même écran ; une activité exercée régulièrement (par exemple à 40 %) suit les règles ordinaires du forfait professionnel. Les **gains accessoires occasionnels** (leçons privées, commissions, jetons de présence d'une autorité) se déclarent au code 16.20, sous « Autres revenus et fortune ». Ils donnent droit, pour l'impôt cantonal, à un forfait de **20 % des revenus nets**, au minimum **CHF 810** et au maximum **CHF 2'429** en 2026 (art. 29A LIPP et 7 RCEPF), aux codes 59.70 (ICC) et 59.75 (IFD). Des frais effectifs plus élevés restent possibles sur justificatifs.",
      },

      { type: "h2", id: "remplacement", text: "Chômage, maladie, accident, maternité" },
      { type: "path", items: ["Revenu", "Allocations de remplacement - Contr.A"] },
      {
        type: "p",
        text: "Les indemnités versées directement par la caisse de chômage ou par l'assurance (attestation annuelle) se déclarent ici (code 11.50 pour le contribuable A). Celles versées par l'employeur figurent déjà dans le salaire du certificat : ne les ajoutez pas. Pour des **interruptions de travail non payées**, indiquez les dates de début et de fin dans « Sélection des revenus ».",
      },

      { type: "h2", id: "rentes", text: "Rentes, pensions et autres prestations" },
      {
        type: "table",
        head: ["Revenu", "Écran GeTax", "Code"],
        rows: [
          ["Rentes AVS ou AI", "Rentes AVS/AI", "17.10"],
          ["Rentes de la prévoyance professionnelle (LPP)", "Rentes, pensions et autres prestations", "13.20"],
          ["Pensions alimentaires reçues", "Rentes, pensions et autres prestations", "13.10"],
          ["Autres rentes, rentes viagères", "Rentes viagères", "13.40, 13.50"],
          ["Gains accessoires (hors salaire)", "Autres revenus et fortune", "16.20"],
          ["Subsides d'assurance-maladie", "Autres revenus et fortune", "16.30"],
        ],
        caption: "Codes du Guide de la déclaration 2025, AFC Genève.",
      },
      {
        type: "p",
        text: "Les **prestations en capital** du 2e pilier et du 3e pilier A (retrait à la retraite, achat d'un logement) ne s'additionnent pas au revenu : elles sont imposées séparément. GeTax les demande sous « Renseignements », « Renseignements complémentaires ».",
      },
    ],
    faq: [
      {
        q: "Faut-il saisir le salaire brut ou net dans GeTax ?",
        a: "Le salaire brut : chiffre 1 du certificat au code 11.10, puis les cotisations sociales (chiffres 9 et 10) sur le même écran. GeTax calcule lui-même le revenu net.",
      },
      {
        q: "Où déclarer un bonus dans GeTax ?",
        a: "Dans « Prestations non périodiques (bonus, gratifications, etc.) », qui correspond au chiffre 3 du certificat de salaire et au code 11.15.",
      },
      {
        q: "Mes allocations familiales sont incluses dans mon salaire. Que faire ?",
        a: "Retirez-les du chiffre 1 avant de le reporter dans GeTax et indiquez-les dans la fiche de chaque enfant (Données personnelles, Enfant(s) à charge), en répondant oui à la question sur leur inclusion dans le salaire.",
      },
      {
        q: "Je travaille dans le canton de Vaud mais j'habite dans le canton de Genève. Quelle commune d'imposition ?",
        a: "Votre commune de domicile genevoise : le salaire d'un résident genevois est imposé dans sa commune de domicile, même si l'employeur se trouve dans un autre canton.",
      },
    ],
  },
  en: {
    title: "Entering your salary in GeTax: salary certificate, bonus, unemployment and pensions",
    navTitle: "Salary and income",
    metaTitle: "GeTax 2026: where to enter your salary certificate (code 11.10)",
    metaDescription:
      "How to copy your salary certificate into GeTax: gross salary box 1 under code 11.10, bonus, social security and pension contributions, family allowances, side job, unemployment and pensions.",
    keywords: [
      "getax salary certificate",
      "geneva tax return salary",
      "gross salary getax",
      "family allowances geneva tax",
      "second job tax geneva",
      "pension income geneva tax return",
    ],
    summary: [
      "In GeTax you start from the **gross salary** (box 1 of the certificate, code **11.10**), not the net salary as in some other cantons.",
      "**Social contributions** go on the same screen: AHV/AI/APG/unemployment (box 9, code 31.10), 2nd pillar (box 10.1, code 31.12) and pension buy-ins (box 10.2, code 31.30).",
      "If your **family allowances** are included in the gross salary, take them out of box 1 and declare them in the child's sheet.",
      "**Occasional side income** (code 16.20) gives a flat deduction of 20% of its net income, minimum **CHF 810**, maximum **CHF 2,429** in 2026.",
    ],
    blocks: [
      { type: "h2", id: "selection", text: "Selecting your income types" },
      { type: "path", items: ["Revenu", "Sélection des revenus"] },
      {
        type: "p",
        text: "Tick for each taxpayer what applies: salary, benefits replacing salary (unemployment, sickness, accident, maternity), unpaid work interruptions, self-employment, AHV/AI pensions, other pensions and life annuities. The matching screens then appear in the tree.",
      },

      { type: "h2", id: "certificat", text: "Copying the salary certificate" },
      { type: "path", items: ["Revenu", "Activité dépendante - Contr.A"] },
      {
        type: "p",
        text: "First enter the employer, the workplace address, the **taxing municipality** (« Commune d'imposition ») and your activity rate. If you live in the canton of Geneva and work in another canton, choose **your municipality of residence**. Then copy the boxes of your salary certificate.",
      },
      {
        type: "screenshot",
        file: "03-salaire.webp",
        alt: "GeTax employment screen: salary certificate boxes 1 to 7, expense allowances 13.2, contributions 9, 10.1 and 10.2",
        caption: "Each field shows the salary certificate box: 1 to 7 for income, 13.2 for expense allowances, 9 and 10 for contributions (GeTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Salary certificate", "GeTax field", "Code"],
        rows: [
          ["Box 1: salary", "« Salaire »", "11.10"],
          ["Box 2: fringe benefits", "« Prestations salariales accessoires »", "11.10"],
          ["Box 3: bonus", "« Prestations non périodiques » (non-recurring)", "11.15"],
          ["Box 4: lump-sum payments", "« Prestations en capital »", "11.70"],
          ["Box 5: shares, options", "« Droits de participations selon annexe »", "11.40"],
          ["Box 6: board fees", "« Tantièmes et jetons de présence »", "11.30"],
          ["Box 13.2: expense allowances", "Representation, car, other", "11.90 to 11.92"],
          ["Box 9: AHV, AI, APG, unemployment", "« Cotisations AVS/AI, APG, Chômage, AANP »", "31.10"],
          ["Box 10.1: ordinary 2nd pillar", "« Prévoyance 2ème pilier »", "31.12"],
          ["Box 10.2: pension fund buy-ins", "« Rachat(s) de la prévoyance professionnelle »", "31.30"],
        ],
        caption: "Codes from the 2025 return guide, AFC Geneva. For taxpayer B, replace 11 with 21 and 31 with 41.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Family allowances included in salary",
        text: "If box 15 « Observations » of the certificate says family allowances are included in the gross salary, **deduct them from box 1** before copying it, then enter the amount in each child's sheet. Otherwise they would be counted twice.",
      },
      {
        type: "p",
        text: "**Boxes F and G** of the certificate matter too: F means free transport between home and work (no commuting deduction), G an employer contribution to meals (the meal deduction is halved). Tick them in GeTax exactly as on the certificate.",
      },

      { type: "h2", id: "plusieurs-employeurs", text: "Several employers and side jobs" },
      {
        type: "p",
        text: "A second salary certificate goes under « Autres activités dépendantes » (other employment), button **« Insérer »**, at the bottom of the same screen; a job held regularly (for example at 40%) follows the ordinary flat-rate rules. **Occasional side income** (private lessons, commissions, fees for sitting on a public body) is declared under code 16.20, in « Autres revenus et fortune ». For cantonal tax it gives a flat **20% of net income**, minimum **CHF 810** and maximum **CHF 2,429** in 2026 (art. 29A LIPP and 7 RCEPF), under codes 59.70 (cantonal) and 59.75 (federal). Higher actual costs remain possible with receipts.",
      },

      { type: "h2", id: "remplacement", text: "Unemployment, sickness, accident, maternity" },
      { type: "path", items: ["Revenu", "Allocations de remplacement - Contr.A"] },
      {
        type: "p",
        text: "Benefits paid directly by the unemployment fund or the insurer (annual statement) go here (code 11.50 for taxpayer A). Those paid through your employer are already in the certificate's salary: do not add them. For **unpaid work interruptions**, enter the start and end dates in « Sélection des revenus ».",
      },

      { type: "h2", id: "rentes", text: "Pensions and other benefits" },
      {
        type: "table",
        head: ["Income", "GeTax screen", "Code"],
        rows: [
          ["AHV or AI pensions", "« Rentes AVS/AI »", "17.10"],
          ["Occupational pension (BVG/LPP)", "« Rentes, pensions et autres prestations »", "13.20"],
          ["Maintenance received", "« Rentes, pensions et autres prestations »", "13.10"],
          ["Other pensions, life annuities", "« Rentes viagères »", "13.40, 13.50"],
          ["Side income (not salary)", "« Autres revenus et fortune »", "16.20"],
          ["Health insurance subsidies", "« Autres revenus et fortune »", "16.30"],
        ],
        caption: "Codes from the 2025 return guide, AFC Geneva.",
      },
      {
        type: "p",
        text: "**Lump-sum withdrawals** from the 2nd pillar and pillar 3a (at retirement, to buy a home) are not added to income: they are taxed separately. GeTax asks for them under « Renseignements », « Renseignements complémentaires » (additional information).",
      },
    ],
    faq: [
      {
        q: "Do I enter gross or net salary in GeTax?",
        a: "Gross salary: box 1 of the certificate under code 11.10, then the social contributions (boxes 9 and 10) on the same screen. GeTax computes net income itself.",
      },
      {
        q: "Where do I declare a bonus in GeTax?",
        a: "Under « Prestations non périodiques (bonus, gratifications, etc.) », which matches box 3 of the salary certificate and code 11.15.",
      },
      {
        q: "My family allowances are included in my salary. What should I do?",
        a: "Take them out of box 1 before copying it into GeTax and enter them in each child's sheet (« Données personnelles », « Enfant(s) à charge »), answering yes to the question on whether they are included in the salary.",
      },
      {
        q: "I live in the canton of Geneva and work in the canton of Vaud. Which taxing municipality?",
        a: "Your Geneva municipality of residence: a Geneva resident's salary is taxed in their municipality of residence, even if the employer is in another canton.",
      },
    ],
  },
};
