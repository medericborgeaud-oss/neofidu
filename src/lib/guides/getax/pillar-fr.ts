import type { GuideChapterContent } from "../types";

export const getaxPillarFr: GuideChapterContent = {
  title: "Comment remplir sa déclaration d'impôt genevoise avec GeTax : le guide complet 2026",
  navTitle: "Guide GeTax",
  metaTitle: "Remplir sa déclaration d'impôt Genève avec GeTax : guide 2026",
  metaDescription:
    "Tutoriel gratuit pas à pas pour remplir votre déclaration d'impôt genevoise dans GeTax : codes de chaque rubrique, déductions 2026, délais, dépôt zéro papier, TOU et frontaliers.",
  keywords: [
    "getax",
    "remplir déclaration impôt genève",
    "comment remplir getax",
    "tutoriel getax",
    "déclaration d'impôt genève 2026",
    "déductions genève 2026",
    "getax 2026",
    "guide déclaration impôt genevoise",
  ],
  summary: [
    "**GeTax** est le logiciel gratuit de l'Administration fiscale cantonale (AFC) de Genève. Il existe en version à installer (Windows, macOS, Linux) et en **déclaration en ligne** dans votre espace e-démarches, avec les mêmes contrôles.",
    "La déclaration **2026** porte sur vos revenus de l'année 2026 et votre fortune au 31 décembre 2026. Elle se dépose en principe jusqu'au **31 mars 2027**. Une prolongation coûte CHF 20 à 60 selon sa durée.",
    "Il faut votre **numéro de contribuable** et votre **code déclaration**, imprimés sur le courrier « Vos identifiants pour la déclaration », plus vos certificats de salaire, relevés bancaires et attestations 3e pilier.",
    "Ce guide suit l'ordre de GeTax en **11 chapitres** et donne, pour chaque montant, l'écran exact et le code de la déclaration genevoise (11.10, 31.50, 52.21, etc.).",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Remplir GeTax en 10 étapes" },
    {
      type: "steps",
      items: [
        "Réunissez vos documents, choisissez entre le logiciel et la déclaration en ligne, et saisissez numéro de contribuable et code déclaration. [Avant de commencer](/guide/getax/avant-de-commencer)",
        "Importez le fichier .tax de l'an dernier (menu « Fichier », « Importer... ») pour reprendre vos données.",
        "Complétez l'état civil, la contribution religieuse volontaire et vos enfants, avec leurs frais de garde et primes. [Situation personnelle](/guide/getax/situation-personnelle)",
        "Saisissez chaque certificat de salaire en partant du **salaire brut** (chiffre 1) et vos autres revenus. [Salaire et revenus](/guide/getax/salaire)",
        "Choisissez forfait ou frais effectifs, séparément pour l'impôt cantonal et l'impôt fédéral. [Frais professionnels](/guide/getax/frais-professionnels)",
        "Indiquez 3e pilier A, rachats LPP et, nouveauté 2026, rachats 3a. [Prévoyance](/guide/getax/prevoyance)",
        "Remplissez l'état des titres : comptes, titres, crypto, relevés fiscaux. [Comptes et titres](/guide/getax/comptes-titres)",
        "Ajoutez les autres éléments de fortune, vos dettes et vos immeubles. [Fortune et dettes](/guide/getax/fortune-dettes) · [Immeubles](/guide/getax/immeubles)",
        "Déduisez assurance-maladie, frais médicaux, garde, formation et dons. [Déductions](/guide/getax/deductions)",
        "Contrôlez le calcul d'impôt, joignez les justificatifs PDF et déposez en zéro papier pour obtenir la quittance. [Vérifier et transmettre](/guide/getax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-mode-formulaire.webp",
      alt: "GeTax en mode formulaire : liste des pages PG1 à PG4 et annexes A à G à gauche, page de garde au centre",
      caption: "Le mode « Saisie formulaire » reprend la déclaration papier : pages de garde PG1 à PG4 et annexes A à G (GeTax 2025, données fictives)",
    },

    { type: "h2", id: "rubriques", text: "Où trouver quoi : écrans GeTax, annexes et codes" },
    {
      type: "p",
      text: "La déclaration genevoise est organisée en **pages de garde** (PG1 à PG4) et en **annexes** désignées par une lettre. Chaque montant porte un **code à quatre chiffres** : quand l'AFC vous écrit au sujet du « code 31.50 », elle parle de votre forfait pour frais professionnels. Les codes en 1x et 3x concernent le contribuable A, ceux en 2x et 4x le contribuable B.",
    },
    {
      type: "table",
      head: ["Écran GeTax (saisie guidée)", "Annexe", "Codes", "Chapitre"],
      rows: [
        ["Données personnelles", "PG1, G1, G2", "61.20, 59.10", "[Situation personnelle](/guide/getax/situation-personnelle)"],
        ["Revenu, Activité dépendante", "A", "11.10 à 11.70, 31.10 à 31.30", "[Salaire](/guide/getax/salaire)"],
        ["Déductions pour frais professionnels", "A", "31.50 à 31.95", "[Frais professionnels](/guide/getax/frais-professionnels)"],
        ["Déductions sociales", "A", "31.40 (3e pilier A)", "[Prévoyance](/guide/getax/prevoyance)"],
        ["Rentes, pensions et autres prestations", "C1", "13.10 à 13.50, 17.10", "[Salaire](/guide/getax/salaire)"],
        ["Etat des titres", "F", "Comptes, titres, impôt anticipé", "[Comptes et titres](/guide/getax/comptes-titres)"],
        ["Autres revenus et fortune", "C2", "16.20 à 16.80", "[Fortune et dettes](/guide/getax/fortune-dettes)"],
        ["Intérêts et dettes", "E", "Dettes et intérêts passifs", "[Fortune et dettes](/guide/getax/fortune-dettes)"],
        ["Immeubles", "D", "15.10 à 15.50, 58.10", "[Immeubles](/guide/getax/immeubles)"],
        ["Déductions", "C3, C4", "52.21, 53.10, 59.50, 71.00, 73.10", "[Déductions](/guide/getax/deductions)"],
        ["Récapitulation, Finalisation, Envoi / Impression", "PG2 à PG4", "92.20 (revenu net)", "[Vérifier et transmettre](/guide/getax/verifier-envoyer)"],
      ],
      caption: "Intitulés de GeTax 2025 et codes du Guide de la déclaration 2025 des personnes physiques, AFC Genève.",
    },

    { type: "h2", id: "chiffres-2026", text: "Les principaux montants genevois 2026 (impôt cantonal et communal)" },
    {
      type: "table",
      head: ["Déduction", "Code", "Montant 2026"],
      rows: [
        ["Forfait frais professionnels (couvre déplacements, repas, autres frais)", "31.50", "3 % du revenu, min. CHF 641, max. CHF 1'817"],
        ["Frais de déplacement effectifs", "31.70", "max. CHF 536"],
        ["Gains accessoires occasionnels", "16.20, 59.70", "20 %, min. CHF 810, max. CHF 2'429"],
        ["Couple dont les deux conjoints travaillent", "31.95", "CHF 1'054"],
        ["Primes d'assurance-maladie", "52.21", "jusqu'au double de la prime moyenne cantonale"],
        ["Assurances-vie et intérêts d'épargne", "52.15", "CHF 3'528 couple, CHF 2'352 seul, + CHF 962 par charge"],
        ["Frais de garde", "59.10", "CHF 26'392 par enfant de moins de 14 ans"],
        ["Formation continue", "59.50", "CHF 12'791"],
        ["Frais médicaux", "71.00", "part dépassant 0,5 % du revenu"],
        ["Dons (contribution ecclésiastique comprise)", "73.10", "max. 20 % du revenu"],
        ["Charges de famille", "calculé par GeTax", "CHF 13'698 par enfant (CHF 10'536 si frais de garde déduits)"],
        ["Entretien d'immeuble, propriétaire occupant", "58.10", "forfait 15 % (bâtiment de 10 ans ou moins) ou 25 %"],
        ["Déduction sociale sur la fortune", "51.50", "CHF 87'872 seul, CHF 175'743 couple, + CHF 43'936 par charge"],
      ],
      caption: "Source : Feuille cantonale Genève de l'Administration fédérale des contributions, état février 2026, « montants applicables pour la période fiscale 2026 ». Codes : Guide de la déclaration 2025, AFC Genève.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples mariés : splitting à 50 %",
      text: "Dans le canton de Genève, le revenu d'un couple marié est imposé au taux correspondant à **50 %** de ce revenu (splitting intégral). La même règle vaut pour le parent seul qui vit avec ses enfants à charge. GeTax l'applique automatiquement : l'écran des enfants affiche « Barème ICC : Avec splitting ».",
    },

    { type: "h2", id: "nouveautes", text: "Ce qui change pour la déclaration 2026" },
    {
      type: "list",
      items: [
        "**Rachats de 3e pilier A** : les cotisations 3a non versées en 2025 peuvent être rattrapées en 2026 et se déduisent pour la première fois dans la déclaration 2026 (source : AFC Genève, AFC Infos octobre 2026).",
        "**Montants indexés** : forfait professionnel CHF 641 à 1'817 (CHF 640 à 1'812 en 2025), déplacements CHF 536 (CHF 534), charges de famille CHF 13'698 (CHF 13'660).",
        "**Villas et PPE** : après la majoration de 12 % de 2025 (loi LEFI), la valeur fiscale est indexée chaque année dès 2026. Le montant figure sur le courrier reçu avant le 31 mars.",
        "**Valeur locative** : sa suppression entre en vigueur le 1er janvier 2029 (Conseil fédéral, 1er avril 2026). Elle reste donc dans la déclaration 2026.",
        "**GeTax 2026** : le logiciel paraît chaque année en janvier (GeTax 2025 est sorti le 13 janvier 2026). Les captures de ce guide montrent GeTax 2025 ; les écrans changent peu d'une année à l'autre.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Remplir seul ou se faire aider ?" },
    {
      type: "p",
      text: "Pour un salarié avec un ou deux certificats de salaire, un 3e pilier et quelques comptes, GeTax se remplit seul en une à deux heures avec ce guide. Il vaut la peine de se faire accompagner en cas d'activité indépendante, d'immeuble loué ou situé à l'étranger, d'arrivée ou de départ en cours d'année, de taxation ordinaire ultérieure (TOU) après l'impôt à la source, ou de statut de quasi-résident.",
    },
  ],
  faq: [
    {
      q: "Quand faut-il rendre la déclaration d'impôt genevoise 2026 ?",
      a: "En principe avant le 31 mars 2027, à la date indiquée sur la page « Vos identifiants pour la déclaration ». Une prolongation peut être demandée en ligne jusqu'au 31 octobre ; elle coûte CHF 20 jusqu'à 3 mois, CHF 40 jusqu'à 5 mois et CHF 60 au-delà.",
    },
    {
      q: "GeTax est-il gratuit ?",
      a: "Oui. Le logiciel GeTax et la déclaration en ligne des e-démarches sont gratuits. Téléchargez GeTax uniquement depuis ge.ch ou getax.ch : l'AFC signale des campagnes d'hameçonnage qui imitent ses envois.",
    },
    {
      q: "Vaut-il mieux le logiciel GeTax ou la déclaration en ligne ?",
      a: "Les deux offrent les mêmes contrôles et impressions. La déclaration en ligne n'exige aucune installation et reprend vos données de l'an dernier si celles-ci ont été transmises par internet. Le logiciel convient si vous préférez travailler hors ligne ou gérer plusieurs déclarations.",
    },
    {
      q: "Faut-il remplir une déclaration séparée pour l'impôt fédéral ?",
      a: "Non. La déclaration genevoise sert aussi pour l'impôt fédéral direct (IFD). GeTax affiche une colonne ICC et une colonne IFD et calcule lui-même les montants fédéraux quand les règles diffèrent.",
    },
    {
      q: "Existe-t-il un guide GeTax en anglais ?",
      a: "Oui, ce guide existe en anglais, avec les libellés français de GeTax suivis d'une traduction : neofidu.ch/en/guide/getax.",
    },
  ],
};
