import type { GuideChapter } from "../../types";

export const autresDeductions: GuideChapter = {
  slug: "autres-deductions",
  readTime: 6,
  fr: {
    title: "Formation, frais médicaux et dons dans VaudTax : les déductions spéciales",
    navTitle: "Formation, santé, dons",
    metaTitle: "VaudTax : déduire formation, frais médicaux et dons | NeoFidu",
    metaDescription:
      "Formation continue jusqu'à CHF 12'000, frais médicaux au-delà de 5 % du revenu, frais liés à un handicap, dons jusqu'à 20 % et cotisations aux partis : les déductions spéciales vaudoises (codes 618 à 720).",
    keywords: [
      "formation continue déduction vaud 12000",
      "frais médicaux déduction impôt vaud 5%",
      "dons déductibles vaud",
      "frais dentaires déduction vaud",
      "parti politique déduction vaud",
      "code 710 vaudtax",
    ],
    summary: [
      "**Formation continue (code 618)** : jusqu'à **CHF 12'000** par personne et par an, hors première formation, si vous avez payé vous-même.",
      "**Frais médicaux et dentaires (code 710)** : seule la part qui dépasse **5 % du revenu** (code 700) est déductible, après remboursements de l'assurance.",
      "**Dons (code 720)** : déductibles dès **CHF 100** par an et jusqu'à **20 %** du revenu, s'ils vont à des institutions suisses exonérées d'utilité publique. Les dons aux Églises ne sont pas déductibles dans le canton de Vaud.",
      "**Partis politiques (code 620)** : jusqu'à **CHF 10'100** par an.",
    ],
    blocks: [
      { type: "p", text: "Ces déductions se trouvent toutes dans la même rubrique de VaudTax." },
      { type: "path", items: ["Déductions spéciales sur le revenu (codes 618 à 720)", "Afficher"] },

      { type: "h2", id: "formation", text: "Frais de formation et de perfectionnement (code 618)" },
      { type: "path", items: ["Déductions spéciales sur le revenu", "Frais de perfectionnement et de formation"] },
      {
        type: "list",
        items: [
          "Plafond : **CHF 12'000 par personne** et par année (CHF 24'000 pour un couple où les deux se forment).",
          "Conditions : avoir un diplôme du secondaire II (CFC, maturité, etc.) **ou** avoir 20 ans et suivre une formation autre qu'un premier diplôme du secondaire II.",
          "Exemples : brevet fédéral, CAS ou MAS, cours de langue utile au travail, reconversion, bachelor suivi après un CFC.",
          "Seuls les frais **payés par vous** et non remboursés par l'employeur. Déductibles l'année du paiement.",
          "Les cours de loisirs ne sont pas déductibles.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Examens professionnels fédéraux : les contributions reçues de la Confédération (SEFRI) ou de la FONPRO se déclarent en revenu (code 195). Si vous avez dû les reverser à votre employeur, le montant reversé se déduit en frais professionnels (code 160).",
      },

      { type: "h2", id: "frais-medicaux", text: "Frais médicaux et dentaires (code 710)" },
      { type: "path", items: ["Déductions spéciales sur le revenu", "Frais médicaux et dentaires"] },
      {
        type: "p",
        text: "Additionnez sur l'année les frais de santé **restés à votre charge** (franchise, quote-part, dentiste, lunettes et lentilles prescrites, médicaments sur ordonnance, physiothérapie, etc.), pour vous et les personnes à votre charge. Seule la partie qui dépasse **5 % de votre revenu net** (code 700) est déductible.",
      },
      {
        type: "p",
        text: "Exemple : revenu au code 700 de CHF 70'000, seuil de 5 % = CHF 3'500. Avec CHF 5'200 de frais non remboursés (gros traitement dentaire), la déduction est de **CHF 1'700**. VaudTax fait le calcul ; vous saisissez la liste des frais.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Frais liés à un handicap",
        text: "Les frais reconnus liés à un handicap sont déductibles **en totalité, sans seuil de 5 %** (rubrique « Frais liés à un handicap »). Les bénéficiaires d'une allocation pour impotent peuvent choisir un forfait annuel de CHF 2'500, 5'000 ou 7'500 selon le degré.",
      },

      { type: "h2", id: "dons", text: "Dons à des institutions d'utilité publique (code 720)" },
      { type: "path", items: ["Déductions spéciales sur le revenu", "Dons à des institutions d'utilité publique"] },
      {
        type: "list",
        items: [
          "Le total des dons de l'année doit atteindre **au moins CHF 100**.",
          "Plafond : **20 % du revenu net** (code 700).",
          "Bénéficiaires admis : institutions dont le siège est en Suisse et exonérées pour but d'utilité publique (Croix-Rouge, Ligue contre le cancer, Pro Juventute, hôpitaux publics, etc.), ainsi que la Confédération, les cantons et les communes.",
          "Pas déductibles : les cotisations de membre d'une association, et les dons aux **Églises, paroisses et institutions à but cultuel** (règle vaudoise).",
          "Gardez les reçus : ils sont à produire sur demande.",
        ],
      },

      { type: "h2", id: "partis", text: "Versements aux partis politiques (code 620)" },
      {
        type: "p",
        text: "Cotisations et dons à un parti politique sont déductibles jusqu'à **CHF 10'100** par an, si le parti est inscrit au registre fédéral des partis, représenté dans un parlement cantonal ou a obtenu au moins 3 % des voix à la dernière élection cantonale. La même rubrique sert aux rentes et charges durables (rente viagère versée, droit de superficie).",
      },
    ],
    faq: [
      {
        q: "Mes frais de dentiste sont-ils déductibles ?",
        a: "Oui, avec les autres frais médicaux non remboursés, mais seulement pour la part qui dépasse 5 % de votre revenu net (code 700 de la déclaration vaudoise).",
      },
      {
        q: "Combien peut-on déduire pour une formation continue dans le canton de Vaud ?",
        a: "Jusqu'à CHF 12'000 par personne et par année pour l'impôt cantonal, hors première formation, à condition d'avoir payé les frais soi-même.",
      },
      {
        q: "Un don à ma paroisse est-il déductible ?",
        a: "Non. Dans le canton de Vaud, les versements aux Églises, paroisses et institutions à but cultuel ne sont pas déductibles.",
      },
    ],
  },
  en: {
    title: "Training, medical costs and donations in VaudTax: special deductions",
    navTitle: "Training, health, donations",
    metaTitle: "VaudTax: deducting training, medical costs and donations (English)",
    metaDescription:
      "Further training up to CHF 12,000, medical costs above 5% of income, disability costs, donations up to 20% and political party contributions: Vaud special deductions (codes 618 to 720).",
    keywords: [
      "training tax deduction vaud",
      "medical expenses tax deduction switzerland",
      "dentist tax deduction vaud",
      "charitable donations tax deduction vaud",
      "vaudtax deductions",
      "further education deduction switzerland",
    ],
    summary: [
      "**Further training (code 618)**: up to **CHF 12,000** per person per year, excluding first education, if you paid it yourself.",
      "**Medical and dental costs (code 710)**: only the part above **5% of income** (code 700) is deductible, after insurance reimbursements.",
      "**Donations (code 720)**: deductible from **CHF 100** a year up to **20%** of income, to Swiss tax-exempt charities. Donations to churches are not deductible in Vaud.",
      "**Political parties (code 620)**: up to **CHF 10,100** a year.",
    ],
    blocks: [
      { type: "p", text: "All these deductions are in the same VaudTax section." },
      { type: "path", items: ["Déductions spéciales sur le revenu (codes 618 à 720)", "Afficher"] },

      { type: "h2", id: "formation", text: "Training and further education (code 618)" },
      {
        type: "list",
        items: [
          "Cap: **CHF 12,000 per person** per year.",
          "Conditions: hold an upper-secondary diploma (apprenticeship certificate, maturité, etc.) **or** be 20 or over and follow training other than a first upper-secondary diploma.",
          "Examples: federal professional diploma, CAS or MAS, job-related language course, career change, a bachelor's after an apprenticeship.",
          "Only costs **you paid** and that your employer did not reimburse, deductible in the year paid.",
        ],
      },

      { type: "h2", id: "frais-medicaux", text: "Medical and dental costs (code 710)" },
      {
        type: "p",
        text: "Add up the health costs **you paid yourself** during the year (deductible, co-payment, dentist, prescribed glasses and lenses, prescription medicines, physiotherapy, etc.) for you and your dependants. Only the part above **5% of your net income** (code 700) is deductible.",
      },
      {
        type: "p",
        text: "Example: income at code 700 of CHF 70,000, 5% threshold = CHF 3,500. With CHF 5,200 of unreimbursed costs, the deduction is **CHF 1,700**.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Disability-related costs",
        text: "Recognised disability-related costs are deductible **in full, with no 5% threshold** (« Frais liés à un handicap »).",
      },

      { type: "h2", id: "dons", text: "Donations to charities (code 720)" },
      {
        type: "list",
        items: [
          "Total donations for the year must reach **at least CHF 100**.",
          "Cap: **20% of net income** (code 700).",
          "Eligible: organisations based in Switzerland and tax-exempt for public-benefit purposes, plus the Confederation, cantons and communes.",
          "Not deductible: association membership fees, and donations to **churches, parishes and religious institutions** (Vaud rule).",
        ],
      },

      { type: "h2", id: "partis", text: "Political party contributions (code 620)" },
      {
        type: "p",
        text: "Contributions and donations to a political party are deductible up to **CHF 10,100** a year, if the party is on the federal party register, sits in a cantonal parliament or won at least 3% of votes in the last cantonal election.",
      },
    ],
    faq: [
      {
        q: "Are dentist bills tax deductible in Vaud?",
        a: "Yes, together with other unreimbursed medical costs, but only for the part above 5% of your net income (code 700).",
      },
      {
        q: "Is a donation to my church deductible?",
        a: "No. In Vaud, payments to churches, parishes and religious institutions are not deductible.",
      },
    ],
  },
};
