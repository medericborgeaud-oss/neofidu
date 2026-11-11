import type { GuideChapterContent } from "../types";

export const jurataxPillarFr: GuideChapterContent = {
  title: "Comment remplir sa déclaration d'impôt jurassienne avec JuraTax : le guide complet 2026",
  navTitle: "Guide JuraTax",
  metaTitle: "Guide JuraTax 2026 : la déclaration d'impôt jurassienne",
  metaDescription:
    "Tutoriel gratuit pas à pas pour remplir votre déclaration d'impôt jurassienne avec JuraTax Online ou JuraTax Logiciel : codes de chaque rubrique (100, 500, 525, 620...), déductions 2026, délai de fin février, Code-DI, SwissID et téléversement.",
  keywords: [
    "juratax",
    "juratax online",
    "remplir déclaration impôt jura",
    "comment remplir juratax",
    "tutoriel juratax",
    "déclaration d'impôt jura 2026",
    "déductions jura 2026",
    "juratax 2026",
    "code-di jura",
    "déclaration impôt moutier",
  ],
  summary: [
    "**JuraTax** est l'outil gratuit du Service des contributions de la République et Canton du Jura. Il existe en deux versions : **JuraTax Online**, dans le navigateur (ordinateur, tablette ou smartphone), et **JuraTax Logiciel**, à installer sur Windows, macOS ou Linux.",
    "La déclaration **2026** porte sur vos revenus de l'année 2026 et votre fortune au 31 décembre 2026. Elle se rend **à la fin du mois de février 2027**. Une prolongation jusqu'au **31 octobre** se demande sur le guichet virtuel et coûte **CHF 31**.",
    "Pour téléverser la déclaration, il faut le **Code-DI** imprimé sur votre déclaration ou une **SwissID** vérifiée. Avec SwissID dans JuraTax Online, la déclaration est signée électroniquement : plus aucune signature manuscrite.",
    "Ce guide suit la déclaration jurassienne en **11 chapitres** et donne, pour chaque montant, le **code** de la déclaration (100, 500, 525, 620, etc.) et la **formule** concernée (4, 5A, 7, 8, 9, 11).",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Remplir JuraTax en 10 étapes" },
    {
      type: "steps",
      items: [
        "Choisissez JuraTax Online ou JuraTax Logiciel, réunissez vos documents et repérez votre Code-DI. [Avant de commencer](/guide/juratax/avant-de-commencer)",
        "Dans « Commencer ici », importez votre déclaration de l'an dernier (fichier .tax ou données du téléversement précédent).",
        "Complétez la situation personnelle au 31 décembre 2026 : état civil, confession, statut, enfants à charge. [Situation personnelle](/guide/juratax/situation-personnelle)",
        "Saisissez vos salaires nets (code 100), gains accessoires (110), indemnités (120), rentes (200 à 260) et autres revenus (400). [Salaire et revenus](/guide/juratax/salaire)",
        "Remplissez la formule 7 : dépenses générales, déplacements, repas, ou forfait de 20 % (code 500). [Frais professionnels](/guide/juratax/frais-professionnels)",
        "Indiquez 3e pilier A (520), rachats LPP (515) et, nouveauté 2026, rachats 3a. [Prévoyance](/guide/juratax/prevoyance)",
        "Remplissez l'état des titres (formule 5A) : comptes, titres, crypto, eRelevés fiscaux. [Comptes et titres](/guide/juratax/comptes-titres)",
        "Ajoutez véhicules, assurances-vie, dettes (formule 8) et immeubles (formule 4). [Fortune et dettes](/guide/juratax/fortune-dettes) · [Immeubles](/guide/juratax/immeubles)",
        "Contrôlez primes d'assurance (525), frais de garde (555), frais de maladie (570 à 580), dons (585) et déductions personnelles (600 à 680). [Déductions](/guide/juratax/deductions)",
        "Dans « Validation », téléversez la déclaration, transmettez les justificatifs et, avec le Code-DI, signez et envoyez la page de synthèse. [Vérifier et envoyer](/guide/juratax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-accueil.webp",
      alt: "Écran d'accueil de JuraTax 2025 avec le menu Fichier ouvert : Nouveau, Ouvrir, Importer, et les instructions pour une première utilisation ou une reprise des données 2024",
      caption: "L'accueil de JuraTax : « Fichier », « Nouveau » pour une première déclaration, « Fichier », « Importer » pour reprendre les données de l'an dernier (JuraTax 2025)",
    },

    { type: "h2", id: "rubriques", text: "Où trouver quoi : codes et formules de la déclaration jurassienne" },
    {
      type: "p",
      text: "La déclaration jurassienne numérote chaque montant par un **code à trois chiffres** : la centaine indique la famille (1 pour le revenu du travail, 2 pour les rentes, 3 pour le revenu de la fortune, 5 et 6 pour les déductions, 7 et 8 pour la fortune). Le suffixe **C** désigne le conjoint : 100 pour le salaire du contribuable, 100C pour celui de son conjoint. Les détails se remplissent dans des **formules** numérotées (4, 5A, 7, 8, 9, 11), dont les totaux sont reportés automatiquement. Quand le Service des contributions vous écrit au sujet du « code 525 », il parle de la déduction pour primes d'assurance.",
    },
    {
      type: "table",
      head: ["Rubrique", "Formule", "Codes", "Chapitre"],
      rows: [
        ["Situation personnelle, professionnelle et familiale", "Page 1", "État civil, statut, enfants", "[Situation personnelle](/guide/juratax/situation-personnelle)"],
        ["Revenu de l'activité dépendante", "Déclaration", "100 à 130", "[Salaire](/guide/juratax/salaire)"],
        ["Rentes, pensions et autres indemnités", "Déclaration", "200 à 260", "[Salaire](/guide/juratax/salaire)"],
        ["Frais professionnels des salariés", "Formule 7", "7000 à 7850, report en 500", "[Frais professionnels](/guide/juratax/frais-professionnels)"],
        ["Rachats LPP et 3e pilier A", "Déclaration", "515, 520", "[Prévoyance](/guide/juratax/prevoyance)"],
        ["Titres et autres placements de capitaux", "Formule 5A, DA-1/R-US", "340, 740", "[Comptes et titres](/guide/juratax/comptes-titres)"],
        ["Immeubles", "Formule 4", "300, 310, 700, 702, 892, 894", "[Immeubles](/guide/juratax/immeubles)"],
        ["Véhicules, assurances-vie, autre fortune", "Déclaration", "760, 770, 780", "[Fortune et dettes](/guide/juratax/fortune-dettes)"],
        ["Intérêts passifs et dettes", "Formule 8", "530, 535, 800, 810", "[Fortune et dettes](/guide/juratax/fortune-dettes)"],
        ["Primes d'assurance, garde, formation, dons", "Déclaration, formules 9 et 11", "525 à 585", "[Déductions](/guide/juratax/deductions)"],
        ["Déductions personnelles (enfants, couple, étudiant)", "Déclaration", "600 à 680", "[Déductions](/guide/juratax/deductions)"],
        ["Prestations en capital", "Déclaration", "905, 905C", "[Prévoyance](/guide/juratax/prevoyance)"],
      ],
      caption: "Codes et formules : Déclaration des personnes physiques 2025 et Guide général 2025, Service des contributions, République et Canton du Jura.",
    },

    { type: "h2", id: "chiffres-2026", text: "Les principaux montants jurassiens 2026 (impôt cantonal et communal)" },
    {
      type: "table",
      head: ["Déduction", "Code", "Montant 2026"],
      rows: [
        ["Dépenses professionnelles générales", "500 (formule 7)", "CHF 2'000 pour un poste à 100 % toute l'année"],
        ["Déplacements en voiture (si pas de transports publics)", "500 (formule 7)", "CHF 0.70 par km jusqu'à 7'999 km, 0.65 jusqu'à 14'999 km, 0.60 au-delà"],
        ["Repas pris hors du domicile", "500 (formule 7)", "CHF 15 par jour, max. CHF 3'200 (cantine : CHF 7.50, max. CHF 1'600)"],
        ["Forfait au lieu des frais effectifs", "500 (formule 7)", "20 % du revenu, max. CHF 4'100"],
        ["Activité des deux conjoints", "505", "max. CHF 2'700"],
        ["3e pilier A (avec 2e pilier)", "520", "max. CHF 7'258"],
        ["Primes d'assurance et intérêts d'épargne", "525", "CHF 6'800 mariés, CHF 3'400 autres ; + CHF 1'020 par enfant ; + CHF 790 sans 2e ni 3e pilier"],
        ["Frais de garde", "555", "max. CHF 10'600 par enfant de moins de 14 ans"],
        ["Formation et perfectionnement", "549", "max. CHF 12'000"],
        ["Frais de maladie", "570 à 580", "part dépassant 5 % du revenu net I"],
        ["Dons", "585", "max. 10 % du revenu net I"],
        ["Déduction par enfant", "620", "CHF 5'700 ; CHF 6'400 par enfant dès 3 enfants"],
        ["Couple marié vivant ensemble", "680", "CHF 3'700"],
        ["Entretien d'immeuble privé (forfait)", "Formule 4", "10 % (bâtiment de 10 ans au plus) ou 20 % du rendement brut"],
        ["Déduction sur la fortune", "860, 870", "CHF 57'000 couple, CHF 28'500 autres, + CHF 28'500 par enfant ; impôt dû dès CHF 58'000"],
      ],
      caption: "Source : Guide général 2025 et formule 7 2025, Service des contributions du canton du Jura ; feuille cantonale Jura, Administration fédérale des contributions, état février 2026, qui précise que les montants indexés restent inchangés pour la période fiscale 2026.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples et familles monoparentales : un barème à part",
      text: "Le canton du Jura ne pratique pas le splitting. Il applique aux **couples mariés** et aux **parents seuls avec enfants à charge** un **tarif réservé** plus doux que celui des personnes seules. Les concubins avec enfants n'y ont en principe pas droit, car ils ne tiennent pas seuls un ménage. Le calcul est automatique dans JuraTax : vous n'avez rien à saisir.",
    },

    { type: "h2", id: "nouveautes", text: "Ce qui change (et ne change pas) pour la déclaration 2026" },
    {
      type: "list",
      items: [
        "**Montants inchangés** : le Jura indexe automatiquement ses déductions et ses barèmes, mais les montants indexés restent les mêmes qu'en 2025 pour la période fiscale 2026.",
        "**Quotité cantonale** : elle reste fixée à **2,85** pour 2026, comme en 2025 (tarifs 2026 du Service des contributions).",
        "**Rachats de 3e pilier A** : les cotisations 3a non versées en 2025 peuvent être rattrapées et déduites pour la première fois dans la déclaration 2026. Les lacunes antérieures à 2025 ne peuvent pas être rachetées.",
        "**Moutier** : les habitants de Moutier font partie du canton du Jura depuis le 1er janvier 2026. Domiciliés dans le Jura au 31 décembre 2026, ils remplissent pour 2026 une déclaration jurassienne, avec JuraTax.",
        "**Rentes viagères** : leur part imposable se calcule depuis 2025 selon le taux publié chaque année par l'Administration fédérale des contributions, ou figure sur l'attestation de l'assureur.",
        "**Valeur locative** : sa suppression au niveau fédéral entre en vigueur le 1er janvier 2029. Elle reste donc dans la déclaration 2026.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Remplir seul ou se faire aider ?" },
    {
      type: "p",
      text: "Pour un salarié avec un ou deux certificats de salaire, un 3e pilier et quelques comptes, JuraTax se remplit seul en une à deux heures avec ce guide. Il vaut la peine de se faire accompagner en cas d'activité indépendante ou agricole, d'immeuble loué ou de travaux importants, d'immeuble dans un autre canton ou à l'étranger, de part à une succession non partagée (formule 6), d'arrivée ou de départ en cours d'année, ou de taxation ordinaire ultérieure (TOU) après l'impôt à la source.",
    },
  ],
  faq: [
    {
      q: "Quand faut-il rendre la déclaration d'impôt jurassienne 2026 ?",
      a: "À la fin du mois de février 2027. Pour la déclaration 2025, le délai était le 28 février 2026. Une prolongation jusqu'au 31 octobre se demande sur le guichet virtuel avec une SwissID, ou par formulaire, et coûte CHF 31.",
    },
    {
      q: "JuraTax est-il gratuit ?",
      a: "Oui. JuraTax Online et JuraTax Logiciel sont mis gratuitement à disposition par le Service des contributions sur le guichet virtuel, jura.ch/guichet. Ils sont mis en ligne chaque année vers le 27 ou le 28 janvier.",
    },
    {
      q: "Quelle différence entre JuraTax Online et JuraTax Logiciel ?",
      a: "JuraTax Online fonctionne dans le navigateur, sur ordinateur, tablette ou smartphone, enregistre les données sur les serveurs du canton et permet d'envoyer les justificatifs en PDF ou en photo. JuraTax Logiciel s'installe sur Windows, macOS ou Linux ; avec lui, les justificatifs s'envoient par la poste.",
    },
    {
      q: "Faut-il remplir une déclaration séparée pour l'impôt fédéral ?",
      a: "Non. La déclaration jurassienne sert aussi pour l'impôt fédéral direct (IFD). Le Service des contributions applique lui-même les différences entre la loi cantonale et la loi fédérale (frais de déplacement, primes d'assurance, frais de garde, etc.).",
    },
    {
      q: "Existe-t-il un guide JuraTax en anglais ?",
      a: "Oui, ce guide existe en anglais, avec les libellés français de JuraTax suivis d'une traduction : neofidu.ch/en/guide/juratax.",
    },
  ],
};
