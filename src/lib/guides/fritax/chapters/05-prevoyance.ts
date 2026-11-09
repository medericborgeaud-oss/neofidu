import type { GuideChapter } from "../../types";

export const prevoyance: GuideChapter = {
  slug: "prevoyance",
  readTime: 7,
  fr: {
    title: "Prévoyance dans FriTax : 3e pilier A (4.130), rachat 3a, rachats LPP (4.140) et capitaux",
    navTitle: "Prévoyance",
    metaTitle: "FriTax 2026 : déduire 3e pilier A, rachat 3a et rachat LPP",
    metaDescription:
      "Où déduire le 3e pilier A dans FriTax (code 4.130, CHF 7'258), les nouveaux rachats 3a de 2026, les rachats LPP (code 4.140), les cotisations AVS des non-actifs (4.350) et comment est imposé un capital de prévoyance dans le canton de Fribourg.",
    keywords: [
      "fritax 3e pilier",
      "code 4.130 fribourg",
      "rachat 3a 2026 déclaration fribourg",
      "rachat lpp déduction fribourg",
      "impôt capital prévoyance fribourg",
      "retrait 2e pilier impôt fribourg",
    ],
    summary: [
      "**3e pilier A** : code **4.130**, jusqu'à **CHF 7'258** avec caisse de pension, ou 20 % du revenu d'activité jusqu'à **CHF 36'288** sans 2e pilier. Seules les cotisations versées en 2026 comptent, attestation à l'appui.",
      "**Nouveau en 2026** : les cotisations 3a manquées en 2025 peuvent être rachetées et déduites pour la première fois.",
      "**Rachats LPP** : code **4.140**, avec l'attestation de la caisse, sauf s'ils figurent déjà au chiffre 10.2 du certificat de salaire. Pas de retrait en capital dans les trois ans qui suivent.",
      "Les **capitaux** de prévoyance (2e et 3e pilier A) sont imposés à part, de 1 % à 5 % à l'impôt cantonal de base ; ils se déclarent à la lettre **E** de la dernière page.",
    ],
    blocks: [
      { type: "h2", id: "pilier-3a", text: "3e pilier A (code 4.130)" },
      { type: "path", items: ["Déclaration d'impôt", "Primes, cotisations d'assurances", "Code 4.130"] },
      {
        type: "table",
        head: ["Situation", "Déduction maximale 2026"],
        rows: [
          ["Affilié à une caisse de pension (2e pilier)", "CHF 7'258"],
          ["Sans 2e pilier (indépendant, par exemple)", "20 % du revenu d'activité, max. CHF 36'288"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, code 4.130 ; montants fédéraux inchangés en 2026.",
      },
      {
        type: "p",
        text: "La déduction suppose une **activité lucrative soumise à l'AVS**. Elle reste acquise en cas d'interruption passagère (chômage, maladie, service militaire). Chaque conjoint qui travaille peut déduire les cotisations d'un contrat à son propre nom. Seules les cotisations **effectivement versées en 2026** comptent, et l'attestation de la banque ou de l'assurance doit être jointe. Il n'y a aucune déduction si l'activité lucrative est déficitaire.",
      },
      {
        type: "screenshot",
        file: "05-prevoyance.webp",
        alt: "Rubrique primes et cotisations d'assurances dans FriTax : codes 4.110 assurance-maladie, 4.120 3e pilier B, 4.130 3e pilier A et 4.140 rachats",
        caption: "Codes 4.110 à 4.140 : la prime d'assurance-maladie est pré-remplie au forfait, le 3e pilier A et les rachats se saisissent (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "05-pilier-3a.webp",
        alt: "Fenêtre 3e pilier a de FriTax : institution de prévoyance, numéro de police, années de conclusion et d'échéance, montant par personne",
        caption: "Le bouton « ... » du code 4.130 ouvre le détail du 3e pilier A : une ligne par contrat, avec institution, numéro de police et montant (FriTax 2025, données fictives)",
      },

      { type: "h2", id: "rachat-3a", text: "Nouveau en 2026 : le rachat de 3e pilier A" },
      {
        type: "p",
        text: "Depuis 2026, on peut combler une **lacune de cotisation 3a** des années précédentes, au plus tôt pour l'année 2025. Le rachat est déductible **pour la première fois dans la déclaration 2026**, déposée en 2027. Les conditions sont fixées par la Confédération et valent dans tous les cantons :",
      },
      {
        type: "list",
        items: [
          "avoir eu un revenu soumis à l'AVS en Suisse pendant l'année à rattraper **et** pendant l'année du rachat ;",
          "avoir d'abord versé la cotisation ordinaire complète de l'année du rachat ;",
          "rachat limité, pour chaque année manquante, à la « petite cotisation » (CHF 7'258 en 2026), sur dix ans au plus.",
        ],
      },
      {
        type: "table",
        head: ["Exemple (revenu AVS en 2025 et 2026)", "Versé pour 2025", "Rachat en 2026", "Déduction 2026"],
        rows: [
          ["A : cotisations complètes, pas de rachat", "CHF 7'258", "0", "CHF 7'258"],
          ["B : rien versé en 2025", "0", "CHF 7'258", "CHF 14'516"],
          ["C : versement partiel en 2025", "CHF 4'500", "CHF 2'758", "CHF 10'016"],
        ],
        caption: "Exemples établis selon l'ordonnance fédérale sur la prévoyance individuelle liée (OPP 3), modifiée au 1er janvier 2025.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Le rachat passe par votre banque ou assurance 3a, qui vérifie la lacune et délivre une attestation distincte. Joignez-la à la déclaration 2026 avec l'attestation ordinaire. Pour aller plus loin : [plafonds et avantages du 3e pilier 2026](/blog/pilier-3a-2026-plafonds-avantages).",
      },

      { type: "h2", id: "rachat-lpp", text: "Rachats d'années d'assurance LPP (code 4.140)" },
      {
        type: "p",
        text: "Les cotisations ordinaires à la caisse de pension sont déjà déduites du salaire net. Le **code 4.140** reçoit uniquement les **rachats d'années d'assurance** versés directement à la caisse, avec son **attestation** indiquant le rachat maximal autorisé. Un rachat qui figure au **chiffre 10.2** du certificat de salaire est déjà déduit du salaire : ne le saisissez pas une seconde fois (il entre en revanche dans le calcul du forfait de 3 %).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "La règle des trois ans",
        text: "Un rachat n'est déductible que si **aucune prestation en capital**, y compris un versement anticipé pour la propriété du logement, n'est perçue dans les **trois ans** qui suivent. Un retrait en capital trop proche d'un rachat fait perdre la déduction.",
      },
      {
        type: "p",
        text: "Les personnes **sans activité lucrative** (retraite anticipée, études, invalidité) qui paient elles-mêmes leurs cotisations AVS/AI/APG les déduisent sous le **code 4.350**, avec le justificatif. Pour le calcul de ces cotisations, la caisse AVS retient la valeur des immeubles à 155 % de leur valeur fiscale.",
      },

      { type: "h2", id: "capital", text: "Prestations en capital (lettre E de la dernière page)" },
      {
        type: "p",
        text: "Un **capital** de la caisse de pension, du 3e pilier A ou de l'AVS/AI, ainsi qu'un capital versé à la suite d'un décès ou d'une atteinte durable à la santé, n'est pas ajouté au revenu : il est **imposé séparément**. Déclarez-le à la rubrique « **E, Prestations en capital** » de la dernière page. Les capitaux reçus la même année s'additionnent, y compris ceux des deux conjoints.",
      },
      {
        type: "table",
        head: ["Tranche du capital", "Taux de l'impôt cantonal de base"],
        rows: [
          ["Premiers CHF 50'000", "1 %"],
          ["CHF 50'000 suivants", "2 %"],
          ["CHF 50'000 suivants", "3 %"],
          ["CHF 50'000 suivants", "4 %"],
          ["Au-delà de CHF 200'000", "5 %"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, chapitre X.I. S'y ajoutent l'impôt communal et paroissial (en pour-cent de l'impôt cantonal) et l'impôt fédéral direct (au cinquième du barème ordinaire).",
      },
      {
        type: "list",
        items: [
          "Les couples mariés vivant ensemble et les familles monoparentales bénéficient d'une **déduction de CHF 10'000** sur le total.",
          "Si le total de l'année est **inférieur à CHF 10'000**, aucun impôt n'est perçu.",
          "L'impôt est réduit de **50 %** pour un capital versé en raison d'une invalidité.",
          "Un capital de libre passage reversé dans l'année à la caisse d'un nouvel employeur n'est pas imposable.",
          "Si vous **remboursez** un versement anticipé pour le logement, vous pouvez récupérer l'impôt payé à l'époque : demande écrite avec le formulaire de la caisse, dans les trois ans suivant le remboursement.",
        ],
      },
      {
        type: "p",
        text: "Avant leur versement, les avoirs du 2e pilier et du 3e pilier A **ne font pas partie de la fortune** : ne les déclarez pas comme assurance ou compte. Le SCC met un fichier Excel de calcul à disposition sur [fr.ch/scc/pp](https://www.fr.ch/scc/pp).",
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour le 3e pilier A en 2026 dans le canton de Fribourg ?",
        a: "CHF 7'258 si vous êtes affilié à une caisse de pension, sinon 20 % du revenu d'activité jusqu'à CHF 36'288, sous le code 4.130. Les montants sont inchangés par rapport à 2025.",
      },
      {
        q: "Le rachat 3a est-il déductible dans la déclaration fribourgeoise 2026 ?",
        a: "Oui. Depuis 2026, les cotisations 3a non versées en 2025 peuvent être rachetées, si vous aviez un revenu soumis à l'AVS les deux années et que la cotisation 2026 complète a été versée. Joignez l'attestation de rachat de votre banque ou assurance.",
      },
      {
        q: "Faut-il déclarer le rachat LPP indiqué au chiffre 10.2 du certificat de salaire ?",
        a: "Non. Il est déjà déduit du salaire net (chiffre 11). Le code 4.140 ne reçoit que les rachats versés directement à la caisse de pension.",
      },
      {
        q: "Comment est imposé un retrait de 2e pilier dans le canton de Fribourg ?",
        a: "Séparément du revenu, de 1 % à 5 % à l'impôt cantonal de base selon le montant, plus l'impôt communal, paroissial et fédéral. Sous CHF 10'000 par an, il n'y a pas d'impôt ; les couples ont une déduction de CHF 10'000.",
      },
    ],
  },
  en: {
    title: "Pension savings in FriTax: pillar 3a (4.130), 3a catch-up, pension fund buy-ins (4.140) and lump sums",
    navTitle: "Pension savings",
    metaTitle: "FriTax 2026: deducting pillar 3a, 3a catch-up and pension fund buy-ins",
    metaDescription:
      "Where to deduct pillar 3a in FriTax (code 4.130, CHF 7,258), the new 2026 3a catch-up payments, pension fund buy-ins (code 4.140), AHV contributions of non-earners (4.350) and how lump-sum pension benefits are taxed in Fribourg.",
    keywords: [
      "fritax pillar 3a",
      "fribourg code 4.130",
      "3a catch-up 2026 fribourg",
      "pension fund buy-in deduction fribourg",
      "lump sum pension tax fribourg",
      "2nd pillar withdrawal tax fribourg",
    ],
    summary: [
      "**Pillar 3a**: code **4.130**, up to **CHF 7,258** with a pension fund, or 20% of earned income up to **CHF 36,288** without a 2nd pillar. Only contributions paid in 2026 count, with a certificate.",
      "**New in 2026**: 3a contributions missed in 2025 can be made up and deducted for the first time.",
      "**Pension fund buy-ins**: code **4.140**, with the fund's certificate, unless they already appear in box 10.2 of the salary certificate. No lump-sum withdrawal in the following three years.",
      "Pension **lump sums** (2nd pillar and pillar 3a) are taxed separately, at 1% to 5% basic cantonal tax; they are declared under letter **E** on the last page.",
    ],
    blocks: [
      { type: "h2", id: "pilier-3a", text: "Pillar 3a (code 4.130)" },
      { type: "path", items: ["Déclaration d'impôt", "Primes, cotisations d'assurances", "Code 4.130"] },
      {
        type: "table",
        head: ["Situation", "Maximum deduction 2026"],
        rows: [
          ["Member of a pension fund (2nd pillar)", "CHF 7,258"],
          ["No 2nd pillar (self-employed, for example)", "20% of earned income, max. CHF 36,288"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, code 4.130; federal amounts unchanged for 2026.",
      },
      {
        type: "p",
        text: "The deduction requires **gainful activity liable to AHV contributions**. It is kept during a temporary interruption (unemployment, illness, military service). Each working spouse can deduct contributions to a contract in their own name. Only contributions **actually paid in 2026** count, and the bank or insurer's certificate must be attached. There is no deduction if your gainful activity made a loss.",
      },
      {
        type: "screenshot",
        file: "05-prevoyance.webp",
        alt: "Premiums and contributions section in FriTax: codes 4.110 health insurance, 4.120 pillar 3b, 4.130 pillar 3a and 4.140 buy-ins",
        caption: "Codes 4.110 to 4.140: the health insurance premium is pre-filled at the flat rate, pillar 3a and buy-ins are entered (FriTax 2025)",
      },
      {
        type: "screenshot",
        file: "05-pilier-3a.webp",
        alt: "FriTax pillar 3a window: pension institution, policy number, start and end years, amount per person",
        caption: "The « ... » button of code 4.130 opens the pillar 3a details: one line per contract, with institution, policy number and amount (FriTax 2025, fictitious data)",
      },

      { type: "h2", id: "rachat-3a", text: "New in 2026: pillar 3a catch-up payments" },
      {
        type: "p",
        text: "From 2026, you can fill a **3a contribution gap** from earlier years, starting with 2025 at the earliest. The catch-up payment is deductible **for the first time in the 2026 return**, filed in 2027. The conditions are set at federal level and apply in every canton:",
      },
      {
        type: "list",
        items: [
          "AHV-liable income in Switzerland in the missing year **and** in the year of the catch-up;",
          "the full ordinary contribution for the catch-up year must be paid first;",
          "catch-up limited, for each missing year, to the « small contribution » (CHF 7,258 in 2026), over ten years at most.",
        ],
      },
      {
        type: "table",
        head: ["Example (AHV income in 2025 and 2026)", "Paid for 2025", "Catch-up in 2026", "2026 deduction"],
        rows: [
          ["A: full contributions, no catch-up", "CHF 7,258", "0", "CHF 7,258"],
          ["B: nothing paid in 2025", "0", "CHF 7,258", "CHF 14,516"],
          ["C: partial payment in 2025", "CHF 4,500", "CHF 2,758", "CHF 10,016"],
        ],
        caption: "Examples based on the federal ordinance on tied pension provision (BVV 3 / OPP 3), amended on 1 January 2025.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "The catch-up goes through your 3a bank or insurer, which checks the gap and issues a separate certificate. Attach it to the 2026 return with the ordinary certificate. More: [pillar 3a limits and benefits 2026](/blog/pilier-3a-2026-plafonds-avantages).",
      },

      { type: "h2", id: "rachat-lpp", text: "Pension fund buy-ins (code 4.140)" },
      {
        type: "p",
        text: "Ordinary pension fund contributions are already deducted from net salary. **Code 4.140** only takes **buy-ins of insurance years** paid directly to the fund, with its **certificate** stating the maximum buy-in allowed. A buy-in shown in **box 10.2** of the salary certificate is already deducted from salary: do not enter it again (it does count towards the 3% flat-rate base).",
      },
      {
        type: "callout",
        tone: "warning",
        title: "The three-year rule",
        text: "A buy-in is only deductible if **no lump-sum benefit**, including an advance withdrawal for home ownership, is received in the **following three years**. A lump-sum withdrawal too soon after a buy-in cancels the deduction.",
      },
      {
        type: "p",
        text: "People **without gainful activity** (early retirement, students, disability) who pay their own AHV/IV/EO contributions deduct them under **code 4.350**, with proof. For these contributions, the AHV office values property at 155% of its tax value.",
      },

      { type: "h2", id: "capital", text: "Lump-sum benefits (letter E on the last page)" },
      {
        type: "p",
        text: "A **lump sum** from a pension fund, pillar 3a or AHV/disability insurance, or a lump sum paid after a death or permanent damage to health, is not added to income: it is **taxed separately**. Declare it in section « **E, Prestations en capital** » (lump-sum benefits) on the last page. Lump sums received in the same year are added together, including both spouses'.",
      },
      {
        type: "table",
        head: ["Band of the lump sum", "Basic cantonal tax rate"],
        rows: [
          ["First CHF 50,000", "1%"],
          ["Next CHF 50,000", "2%"],
          ["Next CHF 50,000", "3%"],
          ["Next CHF 50,000", "4%"],
          ["Above CHF 200,000", "5%"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, chapter X.I. Municipal and parish tax (as a percentage of cantonal tax) and direct federal tax (at one fifth of the ordinary scale) come on top.",
      },
      {
        type: "list",
        items: [
          "Married couples living together and single-parent families get a **CHF 10,000 deduction** on the total.",
          "If the year's total is **below CHF 10,000**, no tax is levied.",
          "The tax is reduced by **50%** for a lump sum paid because of disability.",
          "A vested benefit paid into a new employer's fund within the year is not taxable.",
          "If you **repay** a home-ownership advance withdrawal, you can reclaim the tax paid at the time: written request with the fund's form, within three years of repayment.",
        ],
      },
      {
        type: "p",
        text: "Before they are paid out, 2nd pillar and pillar 3a assets **are not part of your wealth**: do not declare them as insurance or accounts. The SCC provides an Excel calculator at [fr.ch/scc/pp](https://www.fr.ch/scc/pp).",
      },
    ],
    faq: [
      {
        q: "How much pillar 3a can I deduct in Fribourg in 2026?",
        a: "CHF 7,258 if you belong to a pension fund, otherwise 20% of earned income up to CHF 36,288, under code 4.130. The amounts are unchanged from 2025.",
      },
      {
        q: "Is a 3a catch-up payment deductible in the 2026 Fribourg return?",
        a: "Yes. From 2026, 3a contributions missed in 2025 can be made up, if you had AHV-liable income in both years and paid the full 2026 contribution. Attach the catch-up certificate from your bank or insurer.",
      },
      {
        q: "Do I declare the pension buy-in shown in box 10.2 of my salary certificate?",
        a: "No. It is already deducted from net salary (box 11). Code 4.140 only takes buy-ins paid directly to the pension fund.",
      },
      {
        q: "How is a 2nd pillar withdrawal taxed in Fribourg?",
        a: "Separately from income, at 1% to 5% basic cantonal tax depending on the amount, plus municipal, parish and federal tax. Below CHF 10,000 a year there is no tax; couples get a CHF 10,000 deduction.",
      },
    ],
  },
};
