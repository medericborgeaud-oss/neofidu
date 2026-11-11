import type { GuideChapter } from "../../types";

export const deductions: GuideChapter = {
  slug: "deductions",
  readTime: 8,
  fr: {
    title: "Déductions dans JuraTax : primes d'assurance (525), frais de garde, maladie, dons et déductions personnelles",
    navTitle: "Déductions",
    metaTitle: "JuraTax 2026 : primes, frais de garde, maladie, dons, enfants",
    metaDescription:
      "Toutes les déductions de la déclaration jurassienne 2026 : primes d'assurance et réduction de primes (codes 5250 à 525), pensions alimentaires, partis politiques, formation (549), frais de garde (555, CHF 10'600), frais de maladie (570 à 580), dons (585) et déductions personnelles (600 à 680).",
    keywords: [
      "juratax déductions",
      "déduction primes assurance maladie jura",
      "frais de garde déduction jura",
      "déduction enfant jura 2026",
      "frais médicaux déduction jura",
      "dons déduction impôt jura",
    ],
    summary: [
      "**Primes d'assurance** (code 525) : au maximum **CHF 6'800** pour un couple marié et **CHF 3'400** pour les autres, plus **CHF 1'020** par enfant et **CHF 790** par personne sans 2e ni 3e pilier. La réduction de primes de l'ECAS se retranche.",
      "**Frais de garde** (code 555) : jusqu'à **CHF 10'600** par enfant de moins de 14 ans, si les deux parents ou le parent seul travaillent.",
      "**Frais de maladie** (570 à 580) : la part qui dépasse **5 % du revenu net I**. **Dons** (585) : jusqu'à **10 %** du revenu net I, sociétés sportives et culturelles locales comprises.",
      "**Déduction par enfant** (620) : **CHF 5'700**, ou **CHF 6'400 pour chaque enfant** dès trois enfants. **Couple marié** (680) : **CHF 3'700**.",
    ],
    blocks: [
      { type: "path", items: ["Déductions", "Sélection des déductions"] },
      {
        type: "p",
        text: "Dans JuraTax, la rubrique **« Déductions »** commence par une **sélection** : pensions alimentaires versées, cotisations de prévoyance (3e pilier A, rachat LPP), dons, partis politiques, frais de handicap ou de maladie, formation, personnes secourues. Les primes d'assurance et les déductions forfaitaires ont leurs propres écrans dans la même rubrique.",
      },
      {
        type: "screenshot",
        file: "09-selection-deductions.webp",
        alt: "Écran Sélection des déductions de JuraTax 2025 : pension alimentaire versée, cotisations AVS / AI / LPP et pilier 3a, dons, partis politiques, frais de handicap ou de maladie, formation, personne secourue",
        caption: "La sélection des déductions : cochez celles qui vous concernent (JuraTax 2025)",
      },

      { type: "h2", id: "primes", text: "Primes d'assurance et intérêts d'épargne (codes 5250 à 525)" },
      {
        type: "table",
        head: ["Code", "Montant à indiquer"],
        rows: [
          ["5250", "Primes brutes d'assurance-maladie et accidents facturées pour 2026 (joindre la police 2026)"],
          ["5252", "Moins la réduction des primes attribuée par l'Établissement cantonal des assurances sociales (ECAS) pour 2026"],
          ["5254", "Primes d'assurances sur la vie et de rente (joindre la police ou les décomptes)"],
          ["5256", "Intérêts des capitaux d'épargne : intérêts bancaires, d'obligations et de prêts (pas les dividendes ni les fonds)"],
          ["5259 puis 525", "Total, plafonné au maximum ci-dessous"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025 et Guide général 2025, pages 29 et 30, Service des contributions du canton du Jura.",
      },
      {
        type: "table",
        head: ["Situation", "Maximum 2026"],
        rows: [
          ["Couple marié, les deux conjoints cotisent à un 2e ou un 3e pilier A", "CHF 6'800"],
          ["Couple marié, un seul conjoint cotise", "CHF 7'590"],
          ["Couple marié, aucun ne cotise (par exemple deux retraités)", "CHF 8'380"],
          ["Personne seule qui cotise à un 2e ou un 3e pilier A", "CHF 3'400"],
          ["Personne seule qui ne cotise pas", "CHF 4'190"],
          ["En plus, par enfant à charge jusqu'à 18 ans", "CHF 1'020"],
          ["En plus, par jeune adulte à charge de 18 à 25 ans en formation", "CHF 3'400 (pas de cumul avec les CHF 1'020)"],
        ],
        caption: "Source : Guide général 2025, page 29, Service des contributions du canton du Jura ; montants inchangés pour 2026 selon la feuille cantonale Jura, AFC, état février 2026.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pas de réduction de primes ? Un seul code",
        text: "Sans réduction de primes de l'ECAS, il suffit de remplir le **code 525** : dans JuraTax, la déduction est même **automatique** et apparaît dans « Déductions forfaitaires / frais de garde ». Le détail des primes, dans l'écran « Primes et cotisations d'assurances », ne sert qu'en cas de réduction de primes. Avec une réduction, indiquez les primes brutes (5250), retranchez la réduction (5252) et ajoutez les autres primes : le total 5259 est retenu s'il reste sous le plafond. Les assurances de choses et de responsabilité civile (ménage, véhicule) ne comptent pas. Pour l'impôt fédéral, les plafonds sont plus bas : CHF 3'700 pour un couple et CHF 1'800 pour une personne seule qui cotisent au 2e ou au 3e pilier, plus CHF 700 par enfant (montants 2025).",
      },
      {
        type: "screenshot",
        file: "09-deductions-forfaitaires.webp",
        alt: "Écran Déductions forfaitaires / frais de garde de JuraTax 2025 : cotisations d'assurance maladie et vie en déduction automatique, ménage indépendant, parent seul, enfants à charge, frais de garde, apprenti ou étudiant, personnes âgées",
        caption: "« Déductions forfaitaires / frais de garde » récapitule les déductions calculées par JuraTax, dont la déduction d'assurance automatique (JuraTax 2025)",
      },

      { type: "h2", id: "autres", text: "Pensions alimentaires, partis politiques, formation, handicap" },
      {
        type: "table",
        head: ["Code", "Déduction", "Règle 2026"],
        rows: [
          ["540, 545", "Pensions alimentaires versées à l'ex-conjoint et pour les enfants mineurs, rentes et charges durables", "Montant versé, avec jugement ou convention et quittances ; pas pour un enfant majeur ni pour une indemnité unique"],
          ["548", "Cotisations et dons à un parti politique", "max. CHF 10'600, si le parti est inscrit au registre fédéral, représenté au Parlement jurassien ou a obtenu au moins 3 % des voix"],
          ["549", "Formation, perfectionnement et reconversion professionnels (formule 11)", "max. CHF 12'000, dès un premier diplôme du secondaire II ou dès 20 ans"],
          ["550", "Frais liés au handicap (formule 9)", "En principe en totalité ; justificatifs dès CHF 1'000"],
        ],
        caption: "Source : Guide général 2025, pages 31 à 33, Service des contributions du canton du Jura.",
      },

      { type: "h2", id: "garde", text: "Frais de garde (code 555)" },
      { type: "path", items: ["Données de référence", "Enfants à charge"] },
      {
        type: "p",
        text: "Les frais de garde par des tiers (crèche, accueil extrascolaire, maman de jour) sont déductibles jusqu'à **CHF 10'600 par enfant**, jusqu'à son **14e anniversaire**, si les **deux parents mariés travaillent**, si le **parent seul travaille** (et, si le ménage compte deux adultes, que les deux travaillent), ou si la garde est rendue nécessaire par une **maladie grave ou une invalidité**. Joignez l'attestation des frais avec le nom du bénéficiaire. Les frais de déplacement et de repas ne sont pas déductibles. Dans JuraTax, les frais se saisissent **dans la fiche de chaque enfant**, champ « **Frais de garde versés** ». Pour l'impôt fédéral, le plafond est de CHF 25'800 par enfant (2025).",
      },
      {
        type: "screenshot",
        file: "02-fiche-enfant.webp",
        alt: "Fiche Données personnelles de l'enfant dans JuraTax 2025 : champ Frais de garde versés",
        caption: "Les frais de garde se saisissent dans la fiche de chaque enfant, champ « Frais de garde versés » (JuraTax 2025)",
      },

      { type: "h2", id: "maladie-dons", text: "Frais de maladie et dons (codes 570 à 585)" },
      {
        type: "p",
        text: "Les **frais de maladie et d'accident** que vous avez payés vous-même, pour vous ou une personne à votre charge, se détaillent dans la **formule 9** (code 570). Seule la part qui dépasse **5 % du revenu net I** (code 560) est déductible. Exemple : revenu net I de CHF 32'400 et frais de CHF 4'800 ; 5 % font CHF 1'620, la déduction est de **CHF 3'180**. Joignez les factures et les décomptes de la caisse-maladie si les frais dépassent CHF 1'000.",
      },
      {
        type: "p",
        text: "Les **dons** (code 585) sont déductibles jusqu'à **10 % du revenu net I** s'ils vont à des personnes morales suisses exonérées pour but d'utilité publique, ainsi qu'aux **sociétés sportives ou culturelles à caractère local ou régional**. Si le total dépasse CHF 1'500, joignez les justificatifs des dons de plus de CHF 500. Pour l'impôt fédéral, les dons comptent dès CHF 100 et jusqu'à 20 % du revenu net, mais seulement en faveur de personnes morales exonérées pour but d'utilité publique.",
      },

      { type: "h2", id: "personnelles", text: "Déductions personnelles (codes 600 à 680)" },
      {
        type: "table",
        head: ["Code", "Déduction", "Montant 2026"],
        rows: [
          ["600", "Divorcé ou séparé vivant seul, sans enfant à charge, avec droit d'accueil de ses enfants mineurs", "CHF 1'800"],
          ["610", "Parent seul avec enfant à charge qui exerce une activité lucrative", "max. CHF 2'700"],
          ["620", "Enfant à charge de moins de 18 ans, ou en apprentissage ou aux études", "CHF 5'700 ; dès 3 enfants, CHF 6'400 par enfant (3 enfants : CHF 19'200)"],
          ["630", "Supplément pour enfant instruit hors du domicile, chambre et pension à l'extérieur (pas pour l'école obligatoire publique)", "max. CHF 10'600 ; un seul repas à l'extérieur : CHF 3'000 plus les trajets jusqu'à CHF 2'700"],
          ["640", "Personne secourue, incapable de subvenir à ses besoins", "CHF 2'400, si votre aide atteint au moins ce montant"],
          ["660", "Apprenti ou étudiant, dans sa propre déclaration", "CHF 4'100"],
          ["670", "Rentier AVS ou AI à revenu modeste", "Selon un barème : jusqu'à CHF 8'900 (une rente) ou CHF 10'300 (deux rentes)"],
          ["680", "Couple marié ou partenaires enregistrés vivant ensemble", "CHF 3'700"],
        ],
        caption: "Source : Déclaration des personnes physiques 2025 et Guide général 2025, pages 34 à 37, Service des contributions du canton du Jura ; montants inchangés pour 2026.",
      },
      {
        type: "list",
        items: [
          "**Code 620** : la déduction n'est pas accordée si le revenu annuel de l'enfant, bourse comprise, dépasse **CHF 19'800**.",
          "**Code 630** : il faut au moins CHF 1'000 de frais d'instruction. La déduction complète reste admise avec une bourse jusqu'à CHF 8'000 par an ; elle est réduite à CHF 5'300 entre CHF 8'001 et CHF 11'000 et supprimée au-delà.",
          "**Code 660** : les études doivent mobiliser l'essentiel des ressources ; dès qu'une activité dépasse un tiers temps, la déduction tombe. Elle n'existe pas pour l'impôt fédéral.",
          "**Code 670** : le revenu déterminant part du revenu net II (code 590), auquel s'ajoutent certains excédents de dépenses et **3 %** de la fortune imposable au-delà de CHF 114'000 (couple) ou CHF 57'000 (personne seule). JuraTax applique le barème du guide.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien peut-on déduire pour les primes d'assurance-maladie dans le Jura en 2026 ?",
        a: "Au maximum CHF 6'800 pour un couple marié et CHF 3'400 pour une personne seule, plus CHF 1'020 par enfant et CHF 790 par personne qui ne cotise ni au 2e ni au 3e pilier A. La réduction de primes de l'ECAS se retranche des primes brutes.",
      },
      {
        q: "Quel est le montant de la déduction pour enfant dans le canton du Jura ?",
        a: "CHF 5'700 par enfant. Dès trois enfants, la déduction passe à CHF 6'400 pour chaque enfant, soit CHF 19'200 pour trois enfants. Elle se fait au code 620.",
      },
      {
        q: "Où saisir les frais de crèche dans JuraTax ?",
        a: "Dans « Données de référence », « Enfants à charge », dans la fiche de chaque enfant. Ils sont déductibles jusqu'à CHF 10'600 par enfant de moins de 14 ans, au code 555.",
      },
      {
        q: "Peut-on déduire un don au club de foot du village ?",
        a: "Oui, pour l'impôt cantonal : les dons aux sociétés sportives ou culturelles à caractère local ou régional sont déductibles, avec les autres dons, jusqu'à 10 % du revenu net I. Pour l'impôt fédéral direct, seuls comptent les dons à des personnes morales exonérées pour but d'utilité publique.",
      },
    ],
  },
  en: {
    title: "Deductions in JuraTax: insurance premiums (525), childcare, medical costs, donations and personal deductions",
    navTitle: "Deductions",
    metaTitle: "JuraTax 2026: premiums, childcare, medical costs, donations",
    metaDescription:
      "All deductions on the 2026 Jura tax return: insurance premiums and premium reductions (codes 5250 to 525), maintenance, political parties, training (549), childcare (555, CHF 10,600), medical costs (570 to 580), donations (585) and personal deductions (600 to 680).",
    keywords: [
      "juratax deductions",
      "health insurance premium deduction jura",
      "childcare deduction jura",
      "child deduction jura 2026",
      "medical expenses deduction jura",
      "donation tax deduction jura",
    ],
    summary: [
      "**Insurance premiums** (code 525): up to **CHF 6,800** for a married couple and **CHF 3,400** for others, plus **CHF 1,020** per child and **CHF 790** per person with neither pillar 2 nor pillar 3a. The ECAS premium reduction is subtracted.",
      "**Childcare** (code 555): up to **CHF 10,600** per child under 14, if both parents or the single parent work.",
      "**Medical costs** (570 to 580): the portion above **5% of net income I**. **Donations** (585): up to **10%** of net income I, including local sports and cultural clubs.",
      "**Child deduction** (620): **CHF 5,700**, or **CHF 6,400 for each child** from three children. **Married couple** (680): **CHF 3,700**.",
    ],
    blocks: [
      { type: "path", items: ["Déductions", "Sélection des déductions"] },
      {
        type: "p",
        text: "In JuraTax, the **« Déductions »** section starts with a **selection** (« Sélection des déductions »): maintenance paid, pension contributions (pillar 3a, pension fund buy-in), donations, political parties, disability or medical costs, training, supported persons. Insurance premiums and flat-rate deductions have their own screens in the same section.",
      },
      {
        type: "screenshot",
        file: "09-selection-deductions.webp",
        alt: "JuraTax 2025 « Sélection des déductions » screen: maintenance paid, AHV / AI / LPP contributions and pillar 3a, donations, political parties, disability or medical costs, training, supported person",
        caption: "Selecting deductions: tick the ones that apply to you (JuraTax 2025)",
      },

      { type: "h2", id: "primes", text: "Insurance premiums and savings interest (codes 5250 to 525)" },
      {
        type: "table",
        head: ["Code", "Amount to enter"],
        rows: [
          ["5250", "Gross health and accident insurance premiums billed for 2026 (enclose the 2026 policy)"],
          ["5252", "Minus the premium reduction granted by the cantonal social insurance office (ECAS) for 2026"],
          ["5254", "Life and annuity insurance premiums (enclose the policy or statements)"],
          ["5256", "Interest on savings: bank, bond and loan interest (not dividends or funds)"],
          ["5259 then 525", "Total, capped at the maximum below"],
        ],
        caption: "Source: 2025 individual tax return and 2025 general guide, pages 29 and 30, Jura Service des contributions.",
      },
      {
        type: "table",
        head: ["Situation", "Maximum 2026"],
        rows: [
          ["Married couple, both spouses pay into pillar 2 or pillar 3a", "CHF 6,800"],
          ["Married couple, only one spouse pays in", "CHF 7,590"],
          ["Married couple, neither pays in (for example two retirees)", "CHF 8,380"],
          ["Single person paying into pillar 2 or pillar 3a", "CHF 3,400"],
          ["Single person not paying in", "CHF 4,190"],
          ["Plus, per dependent child up to 18", "CHF 1,020"],
          ["Plus, per dependent young adult aged 18 to 25 in training", "CHF 3,400 (not combined with the CHF 1,020)"],
        ],
        caption: "Source: 2025 general guide, page 29, Jura Service des contributions; amounts unchanged for 2026 per the Federal Tax Administration Jura cantonal sheet, February 2026.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "No premium reduction? One code is enough",
        text: "Without an ECAS premium reduction, you only need to fill in **code 525**: in JuraTax, the deduction is even **automatic** and appears under « Déductions forfaitaires / frais de garde » (flat-rate deductions / childcare). The detailed premiums screen (« Primes et cotisations d'assurances ») is only needed if you receive a premium reduction. With a reduction, enter gross premiums (5250), subtract the reduction (5252) and add the other premiums: total 5259 is used if it stays below the cap. Property and liability insurance (household, vehicle) does not count. For federal tax, caps are lower: CHF 3,700 for a couple and CHF 1,800 for a single person paying into pillar 2 or 3a, plus CHF 700 per child (2025 amounts).",
      },
      {
        type: "screenshot",
        file: "09-deductions-forfaitaires.webp",
        alt: "JuraTax 2025 « Déductions forfaitaires / frais de garde » screen: automatic health and life insurance deduction, own household, single parent, dependent children, childcare, apprentice or student, elderly persons",
        caption: "« Déductions forfaitaires / frais de garde » summarises the deductions JuraTax calculates, including the automatic insurance deduction (JuraTax 2025)",
      },

      { type: "h2", id: "autres", text: "Maintenance, political parties, training, disability" },
      {
        type: "table",
        head: ["Code", "Deduction", "2026 rule"],
        rows: [
          ["540, 545", "Maintenance paid to a former spouse and for minor children, annuities and permanent charges", "Amount paid, with judgment or agreement and receipts; not for an adult child or a one-off payment"],
          ["548", "Membership fees and donations to a political party", "max. CHF 10,600, if the party is on the federal register, represented in the Jura Parliament or won at least 3% of the vote"],
          ["549", "Vocational training, further training and retraining (form 11)", "max. CHF 12,000, after a first upper-secondary diploma or from age 20"],
          ["550", "Disability-related costs (form 9)", "In principle in full; proof from CHF 1,000"],
        ],
        caption: "Source: 2025 general guide, pages 31 to 33, Jura Service des contributions.",
      },

      { type: "h2", id: "garde", text: "Childcare costs (code 555)" },
      { type: "path", items: ["Données de référence", "Enfants à charge"] },
      {
        type: "p",
        text: "Third-party childcare (nursery, after-school care, childminder) is deductible up to **CHF 10,600 per child**, until the child's **14th birthday**, if **both married parents work**, if the **single parent works** (and, if the household has two adults, both work), or if care is needed because of **serious illness or disability**. Enclose the cost certificate with the provider's name. Travel and meal costs are not deductible. In JuraTax, the costs are entered **in each child's record**, field « **Frais de garde versés** » (childcare costs paid). For federal tax, the cap is CHF 25,800 per child (2025).",
      },
      {
        type: "screenshot",
        file: "02-fiche-enfant.webp",
        alt: "« Données personnelles de l'enfant » form in JuraTax 2025: « Frais de garde versés » field",
        caption: "Childcare costs are entered in each child's form, field « Frais de garde versés » (JuraTax 2025)",
      },

      { type: "h2", id: "maladie-dons", text: "Medical costs and donations (codes 570 to 585)" },
      {
        type: "p",
        text: "**Medical and accident costs** you paid yourself, for yourself or a dependant, are itemised on **form 9** (code 570). Only the portion above **5% of net income I** (code 560) is deductible. Example: net income I of CHF 32,400 and costs of CHF 4,800; 5% is CHF 1,620, so the deduction is **CHF 3,180**. Enclose invoices and health insurer statements if costs exceed CHF 1,000.",
      },
      {
        type: "p",
        text: "**Donations** (code 585) are deductible up to **10% of net income I** if they go to Swiss legal entities exempt for public-interest purposes, and to **local or regional sports or cultural clubs**. If the total exceeds CHF 1,500, enclose proof for donations above CHF 500. For federal tax, donations count from CHF 100 and up to 20% of net income, but only to legal entities exempt for public-interest purposes.",
      },

      { type: "h2", id: "personnelles", text: "Personal deductions (codes 600 to 680)" },
      {
        type: "table",
        head: ["Code", "Deduction", "2026 amount"],
        rows: [
          ["600", "Divorced or separated person living alone, no dependent child, with visiting rights for minor children", "CHF 1,800"],
          ["610", "Working single parent with a dependent child", "max. CHF 2,700"],
          ["620", "Dependent child under 18, or in an apprenticeship or studying", "CHF 5,700; from 3 children, CHF 6,400 per child (3 children: CHF 19,200)"],
          ["630", "Supplement for a child educated away from home, with room and board (not for public compulsory school)", "max. CHF 10,600; only one meal away: CHF 3,000 plus travel up to CHF 2,700"],
          ["640", "Supported person unable to support themselves", "CHF 2,400, if your support reaches at least this amount"],
          ["660", "Apprentice or student, in their own return", "CHF 4,100"],
          ["670", "AHV or disability pensioner on a modest income", "Per a scale: up to CHF 8,900 (one pension) or CHF 10,300 (two pensions)"],
          ["680", "Married couple or registered partners living together", "CHF 3,700"],
        ],
        caption: "Source: 2025 individual tax return and 2025 general guide, pages 34 to 37, Jura Service des contributions; amounts unchanged for 2026.",
      },
      {
        type: "list",
        items: [
          "**Code 620**: the deduction is not granted if the child's annual income, grants included, exceeds **CHF 19,800**.",
          "**Code 630**: education costs must be at least CHF 1,000. The full deduction remains with a grant of up to CHF 8,000 a year; it drops to CHF 5,300 between CHF 8,001 and CHF 11,000 and disappears above that.",
          "**Code 660**: studies must take up most of the student's resources; as soon as work exceeds one-third time, the deduction is lost. It does not exist for federal tax.",
          "**Code 670**: the qualifying income starts from net income II (code 590), plus certain excess expenses and **3%** of taxable wealth above CHF 114,000 (couple) or CHF 57,000 (single). JuraTax applies the guide's scale.",
        ],
      },
    ],
    faq: [
      {
        q: "How much health insurance can I deduct in Jura in 2026?",
        a: "Up to CHF 6,800 for a married couple and CHF 3,400 for a single person, plus CHF 1,020 per child and CHF 790 per person paying into neither pillar 2 nor pillar 3a. The ECAS premium reduction is subtracted from gross premiums.",
      },
      {
        q: "How much is the child deduction in the canton of Jura?",
        a: "CHF 5,700 per child. From three children, the deduction rises to CHF 6,400 for each child, i.e. CHF 19,200 for three children. It goes under code 620.",
      },
      {
        q: "Where do I enter nursery costs in JuraTax?",
        a: "Under « Données de référence », « Enfants à charge » (reference data, dependent children), in each child's record. They are deductible up to CHF 10,600 per child under 14, under code 555.",
      },
      {
        q: "Can I deduct a donation to the village football club?",
        a: "Yes, for cantonal tax: donations to local or regional sports or cultural clubs are deductible, with other donations, up to 10% of net income I. For direct federal tax, only donations to legal entities exempt for public-interest purposes count.",
      },
    ],
  },
};
