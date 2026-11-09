import type { GuideChapter } from "../../types";

export const salaire: GuideChapter = {
  slug: "salaire",
  readTime: 7,
  fr: {
    title: "Salaire, indemnités et rentes dans FriTax : codes 1.110 à 1.530 et 3.110 à 3.150",
    navTitle: "Salaire et revenus",
    metaTitle: "FriTax : déclarer salaire, chômage, gains accessoires et rentes (2026)",
    metaDescription:
      "Où saisir le salaire net dans FriTax (code 1.110, chiffre 11 du certificat), activité accessoire (1.120), allocations (1.130), chômage et APG (1.510 à 1.530), rentes AVS, LPP et 3a (3.110 à 3.140) et pensions alimentaires reçues (3.150).",
    keywords: [
      "fritax salaire",
      "code 1.110 fribourg",
      "salaire net déclaration fribourg",
      "chômage déclaration impôt fribourg",
      "rente avs déclaration fribourg",
      "activité accessoire impôt fribourg",
    ],
    summary: [
      "On déclare le **salaire net**, soit le **chiffre 11** du certificat de salaire, sous le **code 1.110**. Les interruptions de travail (maladie, congé non payé) doivent être signalées.",
      "Activité salariée accessoire : **code 1.120**, avec un forfait de frais de 20 % (min. CHF 800, max. CHF 2'400) sous le code 2.140.",
      "Chômage, APG et indemnités journalières non comprises dans un certificat de salaire : **codes 1.510 à 1.530**.",
      "Rentes AVS et AI sous le **code 3.110**, caisse de pension sous **3.120**, 3e pilier A sous **3.130**, autres rentes sous **3.140** ; pensions alimentaires reçues sous **3.150**.",
    ],
    blocks: [
      { type: "h2", id: "code-1110", text: "Activité salariée principale (code 1.110)" },
      { type: "path", items: ["Déclaration d'impôt", "Revenu d'une activité salariée", "Code 1.110"] },
      {
        type: "p",
        text: "Indiquez le **salaire net** selon le **chiffre 11** du certificat de salaire de chaque employeur, en joignant les certificats. Pour un couple, la personne 2 a sa propre colonne. Si vous avez eu une **interruption de travail** en 2026 (maladie, accident, congé non payé, chômage), indiquez-la et déclarez les indemnités touchées sous les codes 1.510 à 1.530. FriTax ouvre au besoin la rubrique « activité salariée » de l'**annexe 03 « Revenu d'activité-Frais d'acquisition »**.",
      },
      {
        type: "table",
        head: ["Certificat de salaire", "Où le saisir dans FriTax"],
        rows: [
          ["Chiffre 11, salaire net", "Code 1.110 (1.120 pour une activité accessoire)"],
          ["Chiffre 10.2, rachat LPP retenu sur le salaire", "Déjà déduit du salaire net : ne pas le reporter sous 4.140"],
          ["Chiffres 13.1 et 13.2, allocations pour frais", "Ne s'ajoutent pas, mais le SCC peut vérifier qu'elles ont couvert des frais réels"],
          ["Case F cochée (transport gratuit)", "Pas de frais de transport pour ce trajet (voir [Frais professionnels](/guide/fritax/frais-professionnels))"],
          ["Case G cochée (cantine, repas subventionnés)", "Demi-déduction pour les repas, CHF 7.50 par jour"],
        ],
        caption: "Sources : Instructions générales 2025, SCC Fribourg, codes 1.110, 2.120 et 4.140.",
      },
      {
        type: "screenshot",
        file: "03-salaire.webp",
        alt: "Rubrique revenu d'une activité salariée dans FriTax : salaire net de l'activité principale et accessoire pour les personnes 1 et 2",
        caption: "La page 2 de la déclaration : revenu d'activité (1.110 à 1.530), frais (2.110 à 2.510), rentes (3.110 à 3.150) et revenus de la fortune (3.210 à 3.350), une colonne par personne (FriTax 2025)",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Procédure simplifiée et chèque emploi",
        text: "Les salaires déclarés en **procédure de décompte simplifiée** (impôt de 5 % retenu par l'employeur) ne sont pas imposés une seconde fois : mentionnez-les en **page 4, lettre F** (« Procédure simplifiée selon la loi sur le travail au noir ou chèque emploi »), sans frais professionnels, 3e pilier ni déduction pour double activité. Les salaires versés par le **Chèque emploi** se déclarent en revanche sous 1.110 ou 1.120 avec un certificat de salaire, sauf pour les travailleurs étrangers sans permis C, imposés à la source.",
      },

      { type: "h2", id: "accessoire", text: "Activité accessoire et allocations (codes 1.120 et 1.130)" },
      {
        type: "list",
        items: [
          "**Code 1.120** : tous les revenus d'une activité salariée accessoire (cours, arbitrage, extra le week-end). FriTax calcule le forfait de frais de **20 %**, au minimum CHF 800 (sans dépasser le gain) et au maximum CHF 2'400, sous le code 2.140.",
          "**Code 1.130** : allocations familiales, de naissance ou de maternité versées **directement par une caisse** et non par l'employeur, allocations familiales des indépendants, pourboires absents du certificat.",
          "**Code 1.410** : jetons de présence et tantièmes d'administrateur, nets des cotisations AVS/AI/APG/AC. Aucune autre déduction n'est admise.",
          "**Code 1.420** : part au revenu d'une société en nom collectif ou en commandite, selon le questionnaire de la société.",
        ],
      },
      {
        type: "p",
        text: "Les indépendants (code 1.210) et agriculteurs (1.310) doivent joindre bilan, compte de résultat et l'annexe 05 ou 06 : ces cas sortent du cadre de ce guide.",
      },

      { type: "h2", id: "indemnites", text: "Chômage, APG et indemnités journalières (codes 1.510 à 1.530)" },
      {
        type: "p",
        text: "Les **indemnités de chômage** se déclarent ici, avec l'attestation de la caisse, sauf si elles figurent déjà dans un certificat de salaire saisi sous 1.110. Il en va de même pour les **allocations pour perte de gain** (service militaire, protection civile, service civil, cours J+S) versées directement par la caisse de compensation, et pour les indemnités journalières maladie, accident ou AI.",
      },

      { type: "h2", id: "rentes", text: "Rentes et pensions (codes 3.110 à 3.140)" },
      {
        type: "table",
        head: ["Revenu", "Code", "Remarque"],
        rows: [
          ["Rentes AVS et AI (vieillesse, veuf ou veuve, orphelin, rentes extraordinaires)", "3.110", "Joindre l'attestation 2026"],
          ["Rentes de caisse de pension (2e pilier), assurance militaire dès 1994", "3.120", "100 % ; règles transitoires à l'IFD pour les rentes anciennes"],
          ["Rentes du 3e pilier A", "3.130", "Joindre l'attestation"],
          ["Rentes SUVA ou d'assurance accidents, responsabilité civile, rentes viagères", "3.140", "Rentes viagères : part de rendement seulement"],
        ],
        caption: "Source : Instructions générales 2025, SCC Fribourg, codes 3.110 à 3.140 et chapitre XI.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Rentes viagères : la part de rendement depuis 2025",
        text: "Depuis la période fiscale 2025, les assurances de rentes viagères et les contrats d'entretien viager ne sont plus imposés à 40 % mais selon leur **part de rendement**. Pour une assurance suisse, reprenez le montant attesté par l'assureur. Pour une rente viagère étrangère ou selon le Code des obligations, c'est à vous de calculer cette part.",
      },
      {
        type: "p",
        text: "Ne sont **pas imposables** et ne se déclarent pas : les prestations complémentaires AVS/AI, les allocations pour impotent, l'aide sociale, les héritages, legs et donations, la plupart des bourses d'études, la solde militaire et celle des sapeurs-pompiers (jusqu'à CHF 9'000 à l'impôt cantonal) et les prestations transitoires pour chômeurs âgés.",
      },

      { type: "h2", id: "pensions", text: "Pensions alimentaires reçues (code 3.150)" },
      {
        type: "p",
        text: "La pension reçue de l'ex-conjoint et les contributions pour les **enfants mineurs** sont imposables, y compris pour des enfants nés hors mariage. Remplissez la rubrique « **D, Pension alimentaire** » de la dernière page en séparant la part du conjoint et celle des enfants, et joignez les justificatifs. La contribution pour un enfant **majeur** n'est pas imposable chez vous (ni déductible chez celui qui la verse).",
      },
      {
        type: "p",
        text: "Les autres revenus sans code propre (par exemple un droit d'habitation dont vous bénéficiez) vont sous le **code 3.410**, avec leur nature. La sous-location d'un appartement que vous louez n'est imposable que si elle vous rapporte plus que le loyer payé.",
      },
    ],
    faq: [
      {
        q: "Faut-il déclarer le salaire brut ou net dans FriTax ?",
        a: "Le salaire net, c'est-à-dire le chiffre 11 du certificat de salaire, sous le code 1.110. Les cotisations sociales et les cotisations ordinaires au 2e pilier y sont déjà déduites.",
      },
      {
        q: "Où déclarer les indemnités de chômage dans le canton de Fribourg ?",
        a: "Sous les codes 1.510 à 1.530, avec l'attestation de la caisse de chômage, sauf si elles figurent déjà dans un certificat de salaire déclaré sous 1.110.",
      },
      {
        q: "Quel forfait pour une activité accessoire dans le canton de Fribourg ?",
        a: "20 % du revenu déclaré sous le code 1.120, au minimum CHF 800 (sans dépasser le gain) et au maximum CHF 2'400 par an, sous le code 2.140. Des frais plus élevés sont possibles avec justificatifs.",
      },
      {
        q: "Les prestations complémentaires AVS sont-elles imposables ?",
        a: "Non. Les prestations complémentaires AVS/AI, les allocations pour impotent et l'aide sociale ne sont pas imposables et ne se déclarent pas.",
      },
    ],
  },
  en: {
    title: "Salary, benefits and pensions in FriTax: codes 1.110 to 1.530 and 3.110 to 3.150",
    navTitle: "Salary and income",
    metaTitle: "FriTax: declaring salary, unemployment, side income and pensions (2026)",
    metaDescription:
      "Where to enter net salary in FriTax (code 1.110, box 11 of the certificate), employed side income (1.120), allowances (1.130), unemployment and loss-of-earnings benefits (1.510 to 1.530), AHV, pension fund and 3a pensions (3.110 to 3.140) and maintenance received (3.150).",
    keywords: [
      "fritax salary",
      "fribourg code 1.110",
      "net salary fribourg tax return",
      "unemployment benefits tax fribourg",
      "ahv pension tax return fribourg",
      "side income tax fribourg",
    ],
    summary: [
      "You declare your **net salary**, i.e. **box 11** of the salary certificate, under **code 1.110**. Work interruptions (illness, unpaid leave) must be reported.",
      "Employed side income: **code 1.120**, with a 20% flat-rate expense deduction (min. CHF 800, max. CHF 2,400) under code 2.140.",
      "Unemployment, loss-of-earnings and daily allowances not on a salary certificate: **codes 1.510 to 1.530**.",
      "AHV and disability pensions under **code 3.110**, pension fund under **3.120**, pillar 3a under **3.130**, other pensions under **3.140**; maintenance received under **3.150**.",
    ],
    blocks: [
      { type: "h2", id: "code-1110", text: "Main employment (code 1.110)" },
      { type: "path", items: ["Déclaration d'impôt", "Revenu d'une activité salariée", "Code 1.110"] },
      {
        type: "p",
        text: "Enter the **net salary** from **box 11** of each employer's salary certificate, and attach the certificates. For couples, person 2 has their own column. If you had a **work interruption** in 2026 (illness, accident, unpaid leave, unemployment), say so and declare the benefits received under codes 1.510 to 1.530. Where needed, FriTax opens the employment section of **schedule 03 « Revenu d'activité-Frais d'acquisition »** (employment income and expenses).",
      },
      {
        type: "table",
        head: ["Salary certificate", "Where it goes in FriTax"],
        rows: [
          ["Box 11, net salary", "Code 1.110 (1.120 for side income)"],
          ["Box 10.2, pension fund buy-in deducted from pay", "Already deducted from net salary: do not enter it again under 4.140"],
          ["Boxes 13.1 and 13.2, expense allowances", "Not added, but the SCC may check they covered real costs"],
          ["Box F ticked (free transport)", "No commuting deduction for that journey (see [Work expenses](/guide/fritax/frais-professionnels))"],
          ["Box G ticked (canteen, subsidised meals)", "Half meal deduction, CHF 7.50 per day"],
        ],
        caption: "Sources: « Instructions générales 2025 », SCC Fribourg, codes 1.110, 2.120 and 4.140.",
      },
      {
        type: "screenshot",
        file: "03-salaire.webp",
        alt: "Employment income section in FriTax: net salary from main and side employment for persons 1 and 2",
        caption: "Page 2 of the return: employment income (1.110 to 1.530), expenses (2.110 to 2.510), pensions (3.110 to 3.150) and investment income (3.210 to 3.350), one column per person (FriTax 2025)",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Simplified procedure and « Chèque emploi »",
        text: "Wages declared under the **simplified settlement procedure** (5% tax withheld by the employer) are not taxed a second time: mention them on **page 4, letter F** (« Procédure simplifiée... ou chèque emploi »), with no work expenses, pillar 3a or dual-income deduction. Wages paid through the **« Chèque emploi »** scheme, however, are declared under 1.110 or 1.120 with a salary certificate, except for foreign workers without a C permit, who are taxed at source.",
      },

      { type: "h2", id: "accessoire", text: "Side income and allowances (codes 1.120 and 1.130)" },
      {
        type: "list",
        items: [
          "**Code 1.120**: all income from employed side work (teaching, refereeing, weekend jobs). FriTax works out the **20%** flat-rate expense deduction, at least CHF 800 (but not more than the income) and at most CHF 2,400, under code 2.140.",
          "**Code 1.130**: family, birth or maternity allowances paid **directly by a fund** rather than by the employer, family allowances for the self-employed, tips not on the certificate.",
          "**Code 1.410**: board attendance and directors' fees, net of AHV/IV/EO/ALV contributions. No other deduction is allowed.",
          "**Code 1.420**: share of income from a general or limited partnership, per the partnership's questionnaire.",
        ],
      },
      {
        type: "p",
        text: "Self-employed people (code 1.210) and farmers (1.310) must attach a balance sheet, income statement and schedule 05 or 06: these cases are beyond the scope of this guide.",
      },

      { type: "h2", id: "indemnites", text: "Unemployment, loss of earnings and daily allowances (codes 1.510 to 1.530)" },
      {
        type: "p",
        text: "**Unemployment benefits** go here, with the fund's statement, unless they already appear on a salary certificate entered under 1.110. The same applies to **loss-of-earnings allowances** (military service, civil protection, civilian service, J+S courses) paid directly by the compensation fund, and to sickness, accident or disability daily allowances.",
      },

      { type: "h2", id: "rentes", text: "Pensions and annuities (codes 3.110 to 3.140)" },
      {
        type: "table",
        head: ["Income", "Code", "Note"],
        rows: [
          ["AHV and disability pensions (old age, widow(er), orphan, extraordinary pensions)", "3.110", "Attach the 2026 statement"],
          ["Pension fund (2nd pillar) pensions, military insurance from 1994", "3.120", "100%; transitional rules at federal level for older pensions"],
          ["Pillar 3a annuities", "3.130", "Attach the certificate"],
          ["SUVA or accident insurance pensions, liability pensions, life annuities", "3.140", "Life annuities: income portion only"],
        ],
        caption: "Source: « Instructions générales 2025 », SCC Fribourg, codes 3.110 to 3.140 and chapter XI.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Life annuities: income portion since 2025",
        text: "Since the 2025 tax period, life annuity insurance and life maintenance contracts are no longer taxed at 40% but on their **income portion**. For a Swiss policy, use the amount certified by the insurer. For a foreign life annuity or one under the Code of Obligations, you must work out that portion yourself.",
      },
      {
        type: "p",
        text: "**Not taxable** and not declared: AHV/disability supplementary benefits, helplessness allowances, social assistance, inheritances, legacies and gifts, most study grants, military pay and volunteer firefighter pay (up to CHF 9,000 for cantonal tax) and bridging benefits for older unemployed people.",
      },

      { type: "h2", id: "pensions", text: "Maintenance received (code 3.150)" },
      {
        type: "p",
        text: "Maintenance received from a former spouse and contributions for **minor children** are taxable, including for children born outside marriage. Complete section « **D, Pension alimentaire** » on the last page, separating the spouse's share from the children's, and attach the supporting documents. Maintenance for an **adult** child is not taxable for you (nor deductible for the payer).",
      },
      {
        type: "p",
        text: "Other income without its own code (for example a right of residence you benefit from) goes under **code 3.410**, stating what it is. Subletting a flat you rent is only taxable if it brings in more than the rent you pay.",
      },
    ],
    faq: [
      {
        q: "Do I enter gross or net salary in FriTax?",
        a: "Net salary, i.e. box 11 of the salary certificate, under code 1.110. Social security and ordinary pension fund contributions have already been deducted from it.",
      },
      {
        q: "Where do I declare unemployment benefits in Fribourg?",
        a: "Under codes 1.510 to 1.530, with the unemployment fund's statement, unless they already appear on a salary certificate declared under 1.110.",
      },
      {
        q: "What flat-rate deduction applies to side income in Fribourg?",
        a: "20% of the income declared under code 1.120, at least CHF 800 (but not more than the income) and at most CHF 2,400 a year, under code 2.140. Higher costs can be claimed with receipts.",
      },
      {
        q: "Are AHV supplementary benefits taxable?",
        a: "No. AHV/disability supplementary benefits, helplessness allowances and social assistance are not taxable and are not declared.",
      },
    ],
  },
};
