import type { GuideChapter } from "../../types";

export const salaire: GuideChapter = {
  slug: "salaire",
  readTime: 7,
  fr: {
    title: "Salaire, rentes et gains accessoires dans VSTax : annexe 5, annexe 1 et codes 310 à 721",
    navTitle: "Salaire et revenus",
    metaTitle: "VSTax : déclarer son salaire, ses rentes et gains accessoires (2026)",
    metaDescription:
      "Où saisir le salaire net dans VSTax (annexe 5, code 310), chômage et revenus hors certificat (320), gains accessoires avec forfait de 20 %, rentes AVS et LPP (annexe 1) et indemnités journalières.",
    keywords: [
      "vstax salaire",
      "salaire net code 310 valais",
      "annexe 5 vstax",
      "gains accessoires valais forfait 20 %",
      "rente avs déclaration valais",
      "chômage déclaration impôt valais",
    ],
    summary: [
      "En Valais, on déclare le **salaire net** : salaire brut moins les cotisations AVS/AI/APG/AC/AANP et LPP, soit le **chiffre 11** du certificat de salaire. Il se saisit dans l'**annexe 5**, puis s'affiche sous le **code 310** (310a pour le contribuable 2).",
      "Les revenus hors certificat de salaire (indemnités de chômage, revenus en nature) vont sous le **code 320**.",
      "Gains accessoires : déclarer le gain net, puis déduire un forfait de **20 %**, au minimum CHF 800 et au maximum CHF 2'400 (codes 410 et 420).",
      "Rentes AVS et AI sous le **code 600**, rentes de caisse de pension et rentes viagères sous le **code 610**, via l'annexe 1.",
    ],
    blocks: [
      { type: "h2", id: "annexe-5", text: "Le salaire dans l'annexe 5 « Salaires et frais professionnels »" },
      { type: "path", items: ["Formulaires", "Salaires et frais professionnels", "Données générales"] },
      {
        type: "p",
        text: "Le haut de l'annexe 5 liste vos périodes d'activité de l'année : **domicile, lieu de travail, employeur, du, au, taux d'activité et salaire net**. Ajoutez une ligne par employeur et par période, y compris les périodes **sans activité** (chômage, congé non payé). Le total est reporté automatiquement sous le **code 310** en page 2 de la déclaration. Le contribuable 2 a sa propre partie B, reportée sous le code 310a.",
      },
      {
        type: "table",
        head: ["Certificat de salaire", "Où le saisir dans VSTax"],
        rows: [
          ["Chiffre 11, salaire net", "Annexe 5, colonne « Salaires nets » (code 310)"],
          ["Chiffre 1 : allocations familiales versées par l'employeur", "Comprises dans le salaire net du code 310"],
          ["Chiffre 2.2 : part privée du véhicule de service", "Comprise dans le salaire net ; cochez aussi « oui » à la question sur le véhicule commercial"],
          ["Chiffre 10.2 : rachat LPP", "Page 3, code 2100 (voir [Prévoyance](/guide/vstax/prevoyance))"],
          ["Chiffres 13.1 et 13.2 : allocations pour frais", "À ne pas ajouter, mais elles limitent vos frais déductibles"],
          ["Case G cochée (cantine, repas subventionnés)", "Repas à CHF 7.50 par jour dans les frais (voir [Frais professionnels](/guide/vstax/frais-professionnels))"],
        ],
        caption: "Sources : Déclaration 2025 et Guide de la déclaration d'impôts 2025, SCC Valais.",
      },
      {
        type: "screenshot",
        file: "03-annexe5-salaires.webp",
        alt: "Annexe 5 de VSTax : tableau des données générales avec employeur, période, taux d'activité et salaire net",
        caption: "Une ligne par employeur et par période ; le total part sous le code 310 (VSTax 2025, données fictives)",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Pas de déduction des cotisations APG maladie sur le salaire",
        text: "Les cotisations à une assurance d'indemnités journalières maladie prélevées sur votre salaire ne réduisent pas le salaire net. Elles se déduisent avec les primes d'assurance sous le **code 2560**, dans les limites de ce code (voir [Déductions](/guide/vstax/deductions)).",
      },

      { type: "h2", id: "code-320", text: "Revenus hors certificat de salaire (code 320)" },
      {
        type: "p",
        text: "Le **code 320** reçoit les revenus d'activité salariée qui ne figurent pas sur un certificat de salaire : **indemnités de chômage**, revenus en nature, part privée aux frais généraux, allocations familiales ou de naissance versées directement par la caisse, subsides de recherche. Un salaire doit être déclaré même si l'employeur ne vous a pas remis de certificat.",
      },

      { type: "h2", id: "accessoires", text: "Gains accessoires (codes 410 et 420)" },
      { type: "path", items: ["Formulaires", "Détail gains accessoires"] },
      {
        type: "p",
        text: "Un petit revenu à côté de l'emploi principal (cours, arbitrage, travaux ponctuels) se déclare dans le formulaire « **Détail gains accessoires** ». Indiquez la nature du gain et distinguez l'activité **dépendante** (code 420, gain net de cotisations sociales) de l'activité **indépendante** (code 410, gain brut puis cotisations AVS sous le code 411). VSTax déduit ensuite un forfait de **20 %**, au minimum CHF 800 et au maximum CHF 2'400. Si le gain brut est inférieur à CHF 800, seul ce montant peut être déduit. Des frais plus élevés sont possibles, avec justificatifs.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Deux cas à part",
        text: "Les **jetons de présence et tantièmes** d'administrateur vont sous le code 500, sans forfait de 20 %. La **solde des sapeurs-pompiers de milice** est exonérée jusqu'à CHF 8'000 par an à l'impôt cantonal et CHF 5'400 à l'impôt fédéral direct ; seule la part qui dépasse se déclare.",
      },

      { type: "h2", id: "rentes", text: "Rentes et pensions (annexe 1)" },
      { type: "path", items: ["Formulaires", "Rentes, pensions, revenus de contrats viagers et autres rentes"] },
      {
        type: "screenshot",
        file: "03-rentes-annexe1.webp",
        alt: "Annexe 1 de VSTax : tableaux des rentes AVS et AI, des rentes, pensions et contrats viagers avec taux de déduction cantonal et IFD",
        caption: "L'annexe 1 : rentes AVS/AI en haut, rentes de caisse de pension et contrats viagers en bas, avec les taux de déduction calculés par VSTax (VSTax 2025, données fictives)",
      },
      {
        type: "table",
        head: ["Revenu", "Code", "Imposition"],
        rows: [
          ["Rentes AVS et AI", "600", "100 %"],
          ["Rentes de caisse de pension (2e pilier) nées dès 2002", "610", "100 %"],
          ["Rentes du 3e pilier A", "610", "100 %"],
          ["Rentes de caisse de pension nées avant 2002", "610, déduction 2530", "60 %, 80 % ou 90 % selon la date et la part financée par vous"],
          ["Rentes viagères privées", "610", "part de rendement seulement"],
          ["APG, assurance militaire, indemnités journalières maladie, accident, AI", "720", "100 %, si pas déjà sur le certificat de salaire"],
          ["Autres prestations", "721", "à préciser"],
        ],
        caption: "Source : Guide de la déclaration d'impôts 2025, SCC Valais, tableau des rentes. La déduction pour rentes anciennes (code 2530) est calculée dans l'annexe 1.",
      },
      {
        type: "p",
        text: "Ne sont **pas imposables** et ne se déclarent pas : les prestations complémentaires AVS/AI, les allocations pour impotent, l'aide sociale et les prestations transitoires pour chômeurs âgés. Indiquez pour chaque rente le nom de l'institution, le genre de rente et l'année du début : cela évite des demandes de renseignements. Une rente pour laquelle vous payez encore des cotisations AVS donne droit à leur déduction sous le code 2000.",
      },

      { type: "h2", id: "autres", text: "Pensions alimentaires et autres revenus" },
      {
        type: "list",
        items: [
          "**Pension reçue de l'ex-conjoint** : code 1410. **Contributions reçues pour les enfants mineurs** : code 1420. La pension d'un enfant majeur n'est ni imposable ni déductible.",
          "Une pension alimentaire versée en **capital** n'est pas imposable chez le bénéficiaire (ni déductible chez celui qui paie).",
          "Revenus d'une **succession non partagée** : code 1300, avec un état détaillé, selon la répartition communiquée par l'administrateur de l'hoirie.",
          "Tout autre revenu non mentionné ailleurs (bourse d'études imposable, revenu d'une location occasionnelle de matériel) : code 1500.",
        ],
      },
      {
        type: "screenshot",
        file: "03-page2-revenus.webp",
        alt: "Page 2 de la déclaration VSTax : rentes et indemnités (codes 600 à 800) et autres revenus (codes 1110 à 1600)",
        caption: "Page 2 de la déclaration : les totaux des annexes s'y reportent automatiquement, les champs jaunes (1300, 1420, 1500) se remplissent à la main (VSTax 2025)",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer le salaire brut ou net dans VSTax ?",
        a: "Le salaire net, c'est-à-dire le chiffre 11 du certificat de salaire : salaire brut moins les cotisations AVS/AI/APG/AC/AANP et les cotisations ordinaires au 2e pilier. Il se saisit dans l'annexe 5 et apparaît sous le code 310.",
      },
      {
        q: "Où déclarer les indemnités de chômage en Valais ?",
        a: "Sous le code 320, revenus d'activité salariée hors certificat de salaire, sauf si la caisse de chômage vous a remis une attestation de type certificat de salaire, à saisir alors comme un employeur dans l'annexe 5.",
      },
      {
        q: "Quel forfait pour un gain accessoire en Valais ?",
        a: "20 % du gain net, au minimum CHF 800 et au maximum CHF 2'400 par an. Si le gain est inférieur à CHF 800, la déduction est limitée au montant du gain. Les jetons de présence d'administrateur n'y ont pas droit.",
      },
      {
        q: "Les prestations complémentaires AVS sont-elles imposables ?",
        a: "Non. Les prestations complémentaires AVS/AI, les allocations pour impotent et les prestations de l'aide sociale ne sont pas imposables et ne se déclarent pas.",
      },
    ],
  },
  en: {
    title: "Salary, pensions and side income in VSTax: schedule 5, schedule 1 and codes 310 to 721",
    navTitle: "Salary and income",
    metaTitle: "VSTax: declaring salary, pensions and side income (2026)",
    metaDescription:
      "Where to enter net salary in VSTax (schedule 5, code 310), unemployment and income without a certificate (320), side income with the 20% flat rate, AHV and pension fund pensions (schedule 1).",
    keywords: [
      "vstax salary",
      "valais net salary code 310",
      "vstax schedule 5",
      "valais side income deduction",
      "valais pension tax return",
      "valais unemployment benefits tax",
    ],
    summary: [
      "In Valais you declare your **net salary**: gross salary minus AHV/IV/EO/ALV/NBU and pension fund contributions, i.e. **box 11** of the salary certificate. It goes in **schedule 5**, then appears under **code 310** (310a for taxpayer 2).",
      "Income without a salary certificate (unemployment benefits, benefits in kind) goes under **code 320**.",
      "Side income: declare the net amount, then a flat **20%** is deducted, at least CHF 800 and at most CHF 2,400 (codes 410 and 420).",
      "AHV and disability pensions go under **code 600**, pension fund pensions and life annuities under **code 610**, via schedule 1.",
    ],
    blocks: [
      { type: "h2", id: "annexe-5", text: "Salary in schedule 5 « Salaires et frais professionnels »" },
      { type: "path", items: ["Formulaires", "Salaires et frais professionnels", "Données générales"] },
      {
        type: "p",
        text: "The top of schedule 5 lists your work periods for the year: **home, place of work, employer, from, to, work rate and net salary** (« Salaires nets »). Add one line per employer and per period, including periods **without work** (unemployment, unpaid leave). The total is carried over automatically to **code 310** on page 2 of the return. Taxpayer 2 has their own part B, carried over to code 310a.",
      },
      {
        type: "table",
        head: ["Salary certificate", "Where it goes in VSTax"],
        rows: [
          ["Box 11, net salary", "Schedule 5, « Salaires nets » column (code 310)"],
          ["Box 1: family allowances paid by the employer", "Included in the net salary under code 310"],
          ["Box 2.2: private share of a company car", "Included in the net salary; also answer « oui » to the company car question"],
          ["Box 10.2: pension fund buy-in", "Page 3, code 2100 (see [Pension savings](/guide/vstax/prevoyance))"],
          ["Boxes 13.1 and 13.2: expense allowances", "Do not add them, but they limit your deductible expenses"],
          ["Box G ticked (canteen, subsidised meals)", "Meals at CHF 7.50 per day in expenses (see [Work expenses](/guide/vstax/frais-professionnels))"],
        ],
        caption: "Sources: 2025 return and Guide de la déclaration d'impôts 2025, SCC Valais.",
      },
      {
        type: "screenshot",
        file: "03-annexe5-salaires.webp",
        alt: "VSTax schedule 5: general data table with employer, period, work rate and net salary",
        caption: "One line per employer and per period; the total goes to code 310 (VSTax 2025, fictitious data)",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Sickness daily-allowance contributions are not deducted from salary",
        text: "Contributions to a sickness daily-allowance insurance taken from your pay do not reduce net salary. They are deducted with insurance premiums under **code 2560**, within that code's limits (see [Deductions](/guide/vstax/deductions)).",
      },

      { type: "h2", id: "code-320", text: "Income without a salary certificate (code 320)" },
      {
        type: "p",
        text: "**Code 320** takes employment income that is not on a salary certificate: **unemployment benefits**, benefits in kind, private share of overheads, family or birth allowances paid directly by the fund, research grants. A salary must be declared even if the employer gave you no certificate.",
      },

      { type: "h2", id: "accessoires", text: "Side income (codes 410 and 420)" },
      { type: "path", items: ["Formulaires", "Détail gains accessoires"] },
      {
        type: "p",
        text: "A small income alongside your main job (teaching, refereeing, one-off work) goes in the « **Détail gains accessoires** » (side income details) form. State what it is and separate **employed** work (code 420, net of social contributions) from **self-employed** work (code 410, gross amount, then AHV contributions under code 411). VSTax then deducts a flat **20%**, at least CHF 800 and at most CHF 2,400. If the gross amount is below CHF 800, only that amount can be deducted. Higher costs can be claimed with receipts.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Two special cases",
        text: "Board **attendance fees and directors' fees** go under code 500, without the 20% flat rate. **Volunteer firefighter pay** is tax-free up to CHF 8,000 a year for cantonal tax and CHF 5,400 for direct federal tax; only the excess is declared.",
      },

      { type: "h2", id: "rentes", text: "Pensions and annuities (schedule 1)" },
      { type: "path", items: ["Formulaires", "Rentes, pensions, revenus de contrats viagers et autres rentes"] },
      {
        type: "screenshot",
        file: "03-rentes-annexe1.webp",
        alt: "VSTax schedule 1: AHV/disability pensions table and pensions/annuities table with cantonal and federal deduction rates",
        caption: "Schedule 1: AHV/disability pensions at the top, pension fund pensions and annuities below, with deduction rates worked out by VSTax (VSTax 2025, fictitious data)",
      },
      {
        type: "table",
        head: ["Income", "Code", "Taxed at"],
        rows: [
          ["AHV and disability (AI) pensions", "600", "100%"],
          ["Pension fund (2nd pillar) pensions starting from 2002", "610", "100%"],
          ["Pillar 3a annuities", "610", "100%"],
          ["Pension fund pensions starting before 2002", "610, deduction 2530", "60%, 80% or 90% depending on date and your share of funding"],
          ["Private life annuities", "610", "income portion only"],
          ["Loss of earnings, military insurance, sickness, accident or disability daily allowances", "720", "100%, if not already on the salary certificate"],
          ["Other benefits", "721", "specify"],
        ],
        caption: "Source: Guide de la déclaration d'impôts 2025, SCC Valais, pensions table. The deduction for older pensions (code 2530) is calculated in schedule 1.",
      },
      {
        type: "p",
        text: "**Not taxable** and not declared: AHV/disability supplementary benefits, helplessness allowances, social assistance and bridging benefits for older unemployed people. For each pension, give the institution, type of pension and start year: this avoids follow-up questions. If you still pay AHV contributions on a pension, you can deduct them under code 2000.",
      },

      { type: "h2", id: "autres", text: "Maintenance payments and other income" },
      {
        type: "list",
        items: [
          "**Maintenance received from a former spouse**: code 1410. **Contributions received for minor children**: code 1420. Maintenance for an adult child is neither taxable nor deductible.",
          "Maintenance paid as a **lump sum** is not taxable for the recipient (nor deductible for the payer).",
          "Income from an **undivided estate**: code 1300, with a detailed statement, based on the split provided by the estate administrator.",
          "Any other income not covered elsewhere (taxable study grant, occasional rental of equipment): code 1500.",
        ],
      },
      {
        type: "screenshot",
        file: "03-page2-revenus.webp",
        alt: "Page 2 of the VSTax return: pensions and benefits (codes 600 to 800) and other income (codes 1110 to 1600)",
        caption: "Page 2 of the return: schedule totals are carried over automatically, yellow fields (1300, 1420, 1500) are filled in by hand (VSTax 2025)",
      },
    ],
    faq: [
      {
        q: "Do I enter gross or net salary in VSTax?",
        a: "Net salary, i.e. box 11 of the salary certificate: gross salary minus AHV/IV/EO/ALV/NBU contributions and ordinary pension fund contributions. It is entered in schedule 5 and appears under code 310.",
      },
      {
        q: "Where do I declare unemployment benefits in Valais?",
        a: "Under code 320, employment income without a salary certificate, unless the unemployment fund gave you a salary-certificate-style statement, which you then enter like an employer in schedule 5.",
      },
      {
        q: "What flat-rate deduction applies to side income in Valais?",
        a: "20% of net side income, at least CHF 800 and at most CHF 2,400 a year. If the income is below CHF 800, the deduction is limited to that amount. Directors' attendance fees do not qualify.",
      },
      {
        q: "Are AHV supplementary benefits taxable?",
        a: "No. AHV/disability supplementary benefits, helplessness allowances and social assistance are not taxable and are not declared.",
      },
    ],
  },
};
