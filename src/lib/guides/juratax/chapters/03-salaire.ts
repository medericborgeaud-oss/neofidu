import type { GuideChapter } from "../../types";

export const salaire: GuideChapter = {
  slug: "salaire",
  readTime: 6,
  fr: {
    title: "Salaire, rentes et autres revenus dans JuraTax : codes 100 à 260 et 400",
    navTitle: "Salaire et revenus",
    metaTitle: "JuraTax : salaire (code 100), rentes AVS et LPP, chômage",
    metaDescription:
      "Où déclarer son salaire net dans JuraTax (code 100, chiffre 11 du certificat), gain accessoire (110), indemnités AI (120), jetons de présence (130), rentes AVS, AI et LPP (200 à 220), chômage (230), pensions alimentaires (250, 260) et autres revenus (400).",
    keywords: [
      "juratax salaire",
      "code 100 déclaration jura",
      "juratax certificat de salaire",
      "rente avs déclaration jura",
      "chômage déclaration impôt jura",
      "pension alimentaire impôt jura",
    ],
    summary: [
      "**Code 100** : le salaire net du **chiffre 11** du certificat de salaire, allocations familiales comprises. Un rachat LPP ne se retranche pas du salaire : il se déduit au code 515.",
      "Un **gain accessoire** salarié (code 110) doit être attesté par un certificat de salaire, quel que soit le montant.",
      "Les **rentes AVS et AI** (200, 210) sont imposables à **100 %**, comme les **indemnités de chômage** (230). Les prestations complémentaires et les allocations pour impotents ne sont pas imposables.",
      "Les **pensions alimentaires** reçues pour vous et pour vos enfants mineurs sont imposables (250, 260) ; celles versées pour un enfant majeur ne le sont pas.",
    ],
    blocks: [
      { type: "h2", id: "salaire", text: "Le revenu de l'activité dépendante (codes 100 à 130)" },
      {
        type: "table",
        head: ["Code", "Quoi", "Où le trouver"],
        rows: [
          ["100 / 100C", "Salaire net, y compris allocations familiales, primes, commissions, part privée à la voiture de service", "Chiffre 11 du certificat de salaire"],
          ["105 / 105C", "Revenu en nature (pension, logement gratuits) et part privée aux frais généraux", "Barème du Guide général, page 18"],
          ["110 / 110C", "Gain accessoire net d'une activité salariée", "Certificat de salaire de l'employeur accessoire"],
          ["120 / 120C", "Indemnités journalières de l'AI", "Attestation de l'AI"],
          ["130 / 130C", "Jetons de présence, honoraires d'administrateur, nets de cotisations", "Attestation ou certificat de salaire"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025 et Guide général 2025, pages 18 et 19, Service des contributions du canton du Jura.",
      },
      {
        type: "p",
        text: "Le **salaire net** est le salaire restant après les cotisations AVS/AI/APG, AC, AANP et 2e pilier. Il comprend les primes, les gratifications, les indemnités de trajet, les allocations familiales et la part privée à la voiture de service. Si votre certificat atteste un **rachat d'années de cotisation** (chiffre 10.2), ajoutez-le au chiffre 11 : le rachat se déduit séparément au code 515 (voir [Prévoyance](/guide/juratax/prevoyance)). Déclarez tout revenu du conjoint, quel que soit le régime matrimonial, sauf en cas de divorce ou de séparation.",
      },
      { type: "path", items: ["Revenus", "Sélection des revenus"] },
      {
        type: "p",
        text: "Dans JuraTax, la rubrique **« Revenus »** commence par une **sélection** : cochez les revenus qui vous concernent (profession dépendante, indépendante, agricole, rentes et prestations en capital, pension alimentaire, rentes viagères, autres revenus). Seuls les écrans cochés s'ouvrent ensuite.",
      },
      {
        type: "screenshot",
        file: "03-selection-revenus.webp",
        alt: "Écran Sélection des revenus de JuraTax 2025 : profession dépendante, indépendante, agricole, rentes et prestations en capital, pension alimentaire, rentes viagères, autres revenus",
        caption: "La sélection des revenus ouvre les écrans utiles (JuraTax 2025)",
      },
      { type: "path", items: ["Revenus", "Revenu dépendant du contribuable", "Insérer"] },
      {
        type: "p",
        text: "Saisissez **un salaire par employeur** avec « Insérer » : domicile, employeur, lieu de travail, **genre de revenu** (emploi principal, emploi accessoire, revenu en nature, indemnités AI, jetons de présence), taux et durée d'activité, puis le **salaire net du chiffre 11**. JuraTax pose ensuite quatre questions : retenue 2e pilier (chiffre 10.1), **rachat du 2e pilier** (chiffre 10.2, sans les cotisations ordinaires), **employeur hors du canton du Jura**, **deux certificats reçus** et **véhicule de fonction**. Les deux premières alimentent la déduction des rachats, les suivantes la liste des justificatifs et les frais de déplacement.",
      },
      {
        type: "screenshot",
        file: "03-salaire.webp",
        alt: "Écran Revenu dépendant du contribuable (insertion) de JuraTax 2025 : employeur, genre de revenu, taux et durée d'activité, salaire net selon chiffre 11, rachat 2e pilier, employeur hors canton, véhicule de fonction",
        caption: "Un écran par salaire : genre de revenu, salaire net du chiffre 11, rachat LPP et véhicule de fonction (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Début ou fin d'activité en cours d'année",
        text: "Si vous êtes domicilié dans le canton du Jura toute l'année, vous déclarez le salaire **effectivement reçu** : un étudiant qui commence à travailler en août déclare cinq mois de salaire, sans conversion sur douze mois. Ce n'est qu'en cas d'arrivée de l'étranger, de départ pour l'étranger ou de décès que le revenu est annualisé pour calculer le taux.",
      },
      {
        type: "p",
        text: "Pour une activité **indépendante, agricole ou en société de personnes** (codes 140 à 190), remplissez la formule 2 ou 3 et suivez le guide complémentaire pour indépendants et agriculteurs du Service des contributions. Joignez les certificats de salaire officiels lorsque votre employeur est **hors du canton du Jura**.",
      },

      { type: "h2", id: "rentes", text: "Rentes, pensions et autres indemnités (codes 200 à 260)" },
      {
        type: "table",
        head: ["Code", "Revenu", "Part imposable"],
        rows: [
          ["200", "Rente AVS, y compris rentes pour enfants", "100 %"],
          ["210", "Rente AI, y compris compléments ; indiquez le taux d'invalidité", "100 %"],
          ["220", "Pensions et rentes de la prévoyance professionnelle (2e pilier)", "100 % en général ; 60 % ou 80 % pour d'anciens contrats financés par vos propres cotisations, conclus avant 1987 et ayant commencé à courir avant 2002"],
          ["230", "Indemnités de l'assurance-chômage (joindre l'attestation)", "100 %"],
          ["240", "Autres rentes et prestations : rentes SUVA, APG, allocation maternité, assurance militaire, indemnités journalières (sauf AI), allocations familiales des personnes sans activité", "100 %"],
          ["250", "Pension alimentaire reçue pour vous-même", "100 %"],
          ["260", "Pension alimentaire reçue pour vos enfants mineurs", "100 %"],
        ],
        caption: "Source : Guide général 2025, pages 20 et 21, Service des contributions du canton du Jura.",
      },
      {
        type: "list",
        items: [
          "Déclarez les **montants reçus en 2026**. Une rente versée rétroactivement est imposée séparément, au taux de l'année de la décision.",
          "Les **rentes d'orphelin** sont déclarées par le parent survivant ; les orphelins majeurs les déclarent eux-mêmes.",
          "Les **prestations complémentaires** AVS/AI et les **allocations pour impotents** ne sont pas imposables : ne les déclarez pas.",
          "La pension versée **à ou pour un enfant majeur** n'est imposable ni chez l'enfant, ni chez le parent qui la reçoit.",
          "Les **rentes imposées à l'étranger** comptent à 100 % pour déterminer le taux d'imposition.",
        ],
      },
      {
        type: "p",
        text: "Dans JuraTax, chaque rente se saisit avec « Insérer » dans **« Rentes, pensions, autres indemnités »** : genre de revenu (AVS, AI, 2e pilier, chômage, autres prestations ou **prestations en capital touchées**), première rente en 2026, provenance étrangère, taux AI, puis le **montant touché**. Pour une rente du 2e pilier, JuraTax demande si le versement a commencé avant 2002 et le **taux d'imposition** (60 %, 80 % ou 100 %) et calcule le montant imposable.",
      },
      {
        type: "screenshot",
        file: "03-rentes.webp",
        alt: "Écran Rentes, pensions et autres indemnités du contribuable (insertion) de JuraTax 2025 : genre de revenu, première rente, revenu étranger, taux AI, prestations en capital, versement avant 2002, taux d'imposition, montant touché et imposable",
        caption: "Une fiche par rente ou capital : genre, taux d'imposition et montant imposable calculé (JuraTax 2025)",
      },

      { type: "h2", id: "autres-revenus", text: "Autres revenus (code 400)" },
      {
        type: "p",
        text: "Le **code 400** reçoit tout revenu qui ne figure pas aux codes 100 à 390, avec la mention de son genre et les justificatifs : par exemple les **gains d'activités commerciales sur internet** ou les travaux personnels. Ne sont pas imposables : la solde militaire et de la protection civile, les indemnités pour tort moral, les prestations complémentaires, l'aide sociale, les **héritages, legs et donations**, et les versements d'assurances-vie rachetables. Les **gains de loterie** se déclarent dans l'état des titres (voir [Comptes et titres](/guide/juratax/comptes-titres)).",
      },
    ],
    faq: [
      {
        q: "Quel montant du certificat de salaire reporter dans JuraTax ?",
        a: "Le salaire net du chiffre 11, au code 100 (100C pour le conjoint). Si un rachat LPP figure au chiffre 10.2, ajoutez-le au chiffre 11 et déduisez-le au code 515.",
      },
      {
        q: "Les allocations familiales sont-elles imposables dans le Jura ?",
        a: "Oui. Versées par l'employeur, elles sont comprises dans le salaire net du code 100. Versées à une personne sans activité, elles se déclarent au code 240.",
      },
      {
        q: "Où déclarer les indemnités journalières dans JuraTax ?",
        a: "Les indemnités journalières de l'AI au code 120. Les autres (maladie, accident, APG) au code 240. Les indemnités de chômage au code 230, avec l'attestation de la caisse.",
      },
      {
        q: "Une pension alimentaire pour un enfant de 19 ans est-elle imposable ?",
        a: "Non. La pension versée à ou pour un enfant majeur n'est imposable ni chez l'enfant, ni chez le parent qui la reçoit, et elle n'est pas déductible chez celui qui la verse.",
      },
    ],
  },
  en: {
    title: "Salary, pensions and other income in JuraTax: codes 100 to 260 and 400",
    navTitle: "Salary and income",
    metaTitle: "JuraTax: salary (code 100), AHV and pension fund income",
    metaDescription:
      "Where to declare your net salary in JuraTax (code 100, box 11 of the salary certificate), secondary earnings (110), disability allowances (120), directors' fees (130), AHV, disability and pension fund income (200 to 220), unemployment (230), maintenance (250, 260) and other income (400).",
    keywords: [
      "juratax salary",
      "jura tax return code 100",
      "juratax salary certificate",
      "ahv pension tax jura",
      "unemployment benefits tax jura",
      "maintenance payments tax jura",
    ],
    summary: [
      "**Code 100**: the net salary from **box 11** of the salary certificate, family allowances included. A pension fund buy-in is not subtracted from the salary: it is deducted under code 515.",
      "**Secondary employment income** (code 110) must be backed by a salary certificate, whatever the amount.",
      "**AHV and disability pensions** (200, 210) are **100%** taxable, as are **unemployment benefits** (230). Supplementary benefits and helplessness allowances are not taxable.",
      "**Maintenance payments** received for yourself and your minor children are taxable (250, 260); those paid for an adult child are not.",
    ],
    blocks: [
      { type: "h2", id: "salaire", text: "Employment income (codes 100 to 130)" },
      {
        type: "table",
        head: ["Code", "What", "Where to find it"],
        rows: [
          ["100 / 100C", "Net salary, including family allowances, bonuses, commissions, private use of a company car", "Box 11 of the salary certificate"],
          ["105 / 105C", "Benefits in kind (free board and lodging) and private share of expenses", "Scale in the general guide, page 18"],
          ["110 / 110C", "Net secondary employment income", "Salary certificate from the secondary employer"],
          ["120 / 120C", "Disability insurance (AI) daily allowances", "AI statement"],
          ["130 / 130C", "Attendance fees, directors' fees, net of contributions", "Statement or salary certificate"],
        ],
        caption: "Source: 2025 individual tax return and 2025 general guide, pages 18 and 19, Jura Service des contributions.",
      },
      {
        type: "p",
        text: "**Net salary** is what remains after AHV/IV/EO, unemployment insurance, non-occupational accident insurance and pension fund contributions. It includes bonuses, gratuities, travel allowances, family allowances and private use of a company car. If your certificate shows a **pension fund buy-in** (box 10.2), add it back to box 11: the buy-in is deducted separately under code 515 (see [Retirement savings](/guide/juratax/prevoyance)). Declare all of your spouse's income, whatever your matrimonial regime, unless you are divorced or separated.",
      },
      { type: "path", items: ["Revenus", "Sélection des revenus"] },
      {
        type: "p",
        text: "In JuraTax, the **« Revenus »** (income) section starts with a **selection** (« Sélection des revenus »): tick the income that applies to you (employment, self-employment, farming, pensions and lump sums, maintenance, life annuities, other income). Only the ticked screens open afterwards.",
      },
      {
        type: "screenshot",
        file: "03-selection-revenus.webp",
        alt: "JuraTax 2025 « Sélection des revenus » screen: employment, self-employment, farming, pensions and lump sums, maintenance, life annuities, other income",
        caption: "Selecting your income opens the screens you need (JuraTax 2025)",
      },
      { type: "path", items: ["Revenus", "Revenu dépendant du contribuable", "Insérer"] },
      {
        type: "p",
        text: "Enter **one salary per employer** with « Insérer » (insert): residence, employer, place of work, **type of income** (« Genre de revenu »: main job, secondary job, benefits in kind, disability allowances, directors' fees), activity rate and period, then the **net salary from box 11**. JuraTax then asks: pillar 2 deduction (box 10.1), **pillar 2 buy-in** (box 10.2, excluding ordinary contributions), **employer outside the canton of Jura**, **two certificates received** and **company car**. The first two feed the buy-in deduction, the others the list of supporting documents and commuting costs.",
      },
      {
        type: "screenshot",
        file: "03-salaire.webp",
        alt: "JuraTax 2025 employment income entry screen: employer, type of income, activity rate and period, net salary per box 11, pillar 2 buy-in, employer outside the canton, company car",
        caption: "One screen per salary: type of income, net salary from box 11, pension buy-in and company car (JuraTax 2025)",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Starting or stopping work during the year",
        text: "If you live in the canton of Jura all year, you declare the salary **actually received**: a student who starts work in August declares five months of salary, without converting it to twelve months. Income is only annualised to set the rate if you arrive from abroad, leave for abroad or die during the year.",
      },
      {
        type: "p",
        text: "For **self-employed, farming or partnership** income (codes 140 to 190), fill in form 2 or 3 and follow the tax service's supplementary guide for the self-employed and farmers. Enclose the official salary certificates if your employer is **outside the canton of Jura**.",
      },

      { type: "h2", id: "rentes", text: "Pensions, annuities and other benefits (codes 200 to 260)" },
      {
        type: "table",
        head: ["Code", "Income", "Taxable share"],
        rows: [
          ["200", "AHV pension, including children's pensions", "100%"],
          ["210", "Disability (AI) pension, including supplements; state the disability rate", "100%"],
          ["220", "Occupational pension fund (pillar 2) pensions", "Generally 100%; 60% or 80% for old contracts funded by your own contributions, concluded before 1987 and paid out before 2002"],
          ["230", "Unemployment benefits (enclose the statement)", "100%"],
          ["240", "Other pensions and benefits: SUVA pensions, loss-of-earnings (APG), maternity allowance, military insurance, daily allowances (except AI), family allowances for people not working", "100%"],
          ["250", "Maintenance received for yourself", "100%"],
          ["260", "Maintenance received for your minor children", "100%"],
        ],
        caption: "Source: 2025 general guide, pages 20 and 21, Jura Service des contributions.",
      },
      {
        type: "list",
        items: [
          "Declare the **amounts received in 2026**. A pension paid retroactively is taxed separately, at the rate of the year of the decision.",
          "**Orphans' pensions** are declared by the surviving parent; adult orphans declare them themselves.",
          "AHV/AI **supplementary benefits** and **helplessness allowances** are not taxable: do not declare them.",
          "Maintenance paid **to or for an adult child** is taxable neither for the child nor for the parent receiving it.",
          "**Pensions taxed abroad** count 100% towards the tax rate.",
        ],
      },
      {
        type: "p",
        text: "In JuraTax, each pension is entered with « Insérer » under **« Rentes, pensions, autres indemnités »**: type of income (AHV, disability, pillar 2, unemployment, other benefits or **lump sums received**, « prestations en capital touchées »), first pension in 2026, foreign source, disability rate, then the **amount received** (« Montant touché »). For a pillar 2 pension, JuraTax asks whether payments started before 2002 and the **taxable rate** (60%, 80% or 100%) and calculates the taxable amount.",
      },
      {
        type: "screenshot",
        file: "03-rentes.webp",
        alt: "JuraTax 2025 pensions and other benefits entry screen: type of income, first pension, foreign income, disability rate, lump sums, payment before 2002, taxable rate, amount received and taxable",
        caption: "One record per pension or lump sum: type, taxable rate and calculated taxable amount (JuraTax 2025)",
      },

      { type: "h2", id: "autres-revenus", text: "Other income (code 400)" },
      {
        type: "p",
        text: "**Code 400** covers any income not listed under codes 100 to 390, stating its type and with supporting documents: for example **income from online sales** or personal work. Not taxable: military and civil protection pay, compensation for moral damage, supplementary benefits, social assistance, **inheritances, bequests and gifts**, and payouts from surrenderable life insurance. **Lottery winnings** are declared in the securities list (see [Accounts and securities](/guide/juratax/comptes-titres)).",
      },
    ],
    faq: [
      {
        q: "Which amount from the salary certificate goes into JuraTax?",
        a: "The net salary in box 11, under code 100 (100C for your spouse). If a pension fund buy-in appears in box 10.2, add it to box 11 and deduct it under code 515.",
      },
      {
        q: "Are family allowances taxable in Jura?",
        a: "Yes. Paid by the employer, they are included in the net salary under code 100. Paid to someone not working, they are declared under code 240.",
      },
      {
        q: "Where do I declare daily allowances in JuraTax?",
        a: "Disability (AI) daily allowances under code 120. Others (sickness, accident, loss of earnings) under code 240. Unemployment benefits under code 230, with the fund's statement.",
      },
      {
        q: "Is maintenance for a 19-year-old child taxable?",
        a: "No. Maintenance paid to or for an adult child is taxable neither for the child nor for the receiving parent, and it is not deductible for the payer.",
      },
    ],
  },
};
