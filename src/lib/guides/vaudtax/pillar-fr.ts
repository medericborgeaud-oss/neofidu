import type { GuideChapterContent } from "../types";

export const vaudtaxPillarFr: GuideChapterContent = {
  title: "Comment remplir sa déclaration d'impôt vaudoise avec VaudTax : le guide complet 2026",
  navTitle: "Guide VaudTax",
  metaTitle: "Remplir sa déclaration d'impôt Vaud avec VaudTax : guide 2026",
  metaDescription:
    "Tutoriel gratuit pas à pas pour remplir votre déclaration d'impôt vaudoise dans VaudTax : où saisir chaque montant, déductions 2026, délais et erreurs à éviter.",
  keywords: [
    "vaudtax",
    "remplir déclaration impôt vaud",
    "comment remplir vaudtax",
    "tutoriel vaudtax",
    "déclaration d'impôt vaud 2026",
    "déductions vaud 2026",
    "guide déclaration impôt vaudoise",
  ],
  summary: [
    "**VaudTax** est la prestation en ligne gratuite de l'État de Vaud pour remplir et déposer sa déclaration d'impôt. Depuis 2025, elle n'existe plus qu'en ligne.",
    "La déclaration **2026** porte sur vos revenus de l'année 2026 et votre fortune au 31 décembre 2026. Elle se dépose en principe jusqu'au **15 mars 2027** (tolérance au 30 juin pour les résidents).",
    "Il faut votre **numéro de contribuable** et votre **code de contrôle**, plus vos certificats de salaire, relevés bancaires et attestations 3e pilier.",
    "Ce guide suit l'ordre de VaudTax en **11 chapitres** et donne, pour chaque montant, la rubrique exacte et le code de la déclaration.",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Remplir VaudTax en 10 étapes" },
    {
      type: "steps",
      items: [
        "Réunissez vos documents et ouvrez VaudTax en ligne avec votre numéro de contribuable et votre code de contrôle. [Avant de commencer](/guide/vaudtax/avant-de-commencer)",
        "Importez la déclaration de l'an dernier (fichier .vaudtax) et vos eRelevés fiscaux bancaires si disponibles.",
        "Vérifiez votre situation personnelle et déclarez vos enfants. [Situation personnelle](/guide/vaudtax/situation-personnelle)",
        "Saisissez chaque certificat de salaire (salaire net du chiffre 11) et vos autres revenus. [Salaire et revenus](/guide/vaudtax/salaire)",
        "Déduisez vos frais de transport, de repas et le forfait de 3 %. [Frais professionnels](/guide/vaudtax/frais-professionnels)",
        "Indiquez primes d'assurance-maladie, subsides, 3e pilier A et rachats LPP. [Assurances et 3e pilier](/guide/vaudtax/assurances-prevoyance)",
        "Remplissez l'état des titres : comptes, titres, crypto, en Suisse et à l'étranger. [Comptes et titres](/guide/vaudtax/comptes-titres)",
        "Ajoutez les autres éléments de fortune, vos dettes et votre logement. [Fortune et dettes](/guide/vaudtax/fortune-dettes) · [Logement](/guide/vaudtax/logement)",
        "Ne ratez pas les déductions familiales et spéciales : garde, formation, frais médicaux, dons. [Famille](/guide/vaudtax/deductions-famille) · [Autres déductions](/guide/vaudtax/autres-deductions)",
        "Contrôlez, joignez les justificatifs, envoyez et gardez la quittance PDF. [Vérifier et envoyer](/guide/vaudtax/verifier-envoyer)",
      ],
    },
    { type: "screenshot", file: "00-vue-ensemble.webp", alt: "Menu principal de VaudTax : liste des formulaires et outils", caption: "Le menu principal : les formulaires à gauche, les outils (sauvegarde, import, vérification, transmission) à droite (VaudTax 2025, mode simulation, données fictives)" },

    { type: "h2", id: "rubriques", text: "Où trouver quoi : rubriques VaudTax et codes de la déclaration" },
    {
      type: "p",
      text: "VaudTax est organisé en rubriques qui correspondent aux **codes** de la déclaration vaudoise. Quand l'office d'impôt vous écrit au sujet du « code 140 », il parle de vos frais de transport. Ce tableau fait le lien.",
    },
    {
      type: "table",
      head: ["Rubrique VaudTax", "Codes", "Contenu", "Chapitre"],
      rows: [
        ["Enfants et personnes à charge", "670, 680, 810", "Enfants, frais de garde, proches à charge", "[Situation personnelle](/guide/vaudtax/situation-personnelle)"],
        ["Activités salariées", "100 à 120", "Certificats de salaire, activité accessoire, allocations", "[Salaire](/guide/vaudtax/salaire)"],
        ["Frais professionnels et interruption de travail", "140 à 165", "Transport, repas, autres frais, périodes non travaillées", "[Frais professionnels](/guide/vaudtax/frais-professionnels)"],
        ["Indemnités perte de gain", "200 à 220", "Chômage, APG, indemnités maladie et accident", "[Salaire](/guide/vaudtax/salaire)"],
        ["Rentes et pensions", "240 à 280", "AVS, AI, LPP, 3a, pensions reçues", "[Salaire](/guide/vaudtax/salaire)"],
        ["Primes et cotisations d'assurances", "300 à 340, 640", "Assurance-maladie, subsides, 3e pilier A, rachats LPP", "[Assurances et 3e pilier](/guide/vaudtax/assurances-prevoyance)"],
        ["Etat des titres", "410, 480, 490", "Comptes, titres, crypto, impôt anticipé", "[Comptes et titres](/guide/vaudtax/comptes-titres)"],
        ["Autres éléments de fortune", "420 à 445", "Véhicules, assurance-vie, espèces, mobilier", "[Fortune et dettes](/guide/vaudtax/fortune-dettes)"],
        ["Immeubles, terrains et forêts", "500 à 540", "Valeur locative, loyers, frais d'entretien", "[Logement](/guide/vaudtax/logement)"],
        ["Intérêts et dettes", "610, 615", "Hypothèques, crédits, intérêts passifs", "[Fortune et dettes](/guide/vaudtax/fortune-dettes)"],
        ["Déductions spéciales sur le revenu", "618 à 720", "Formation, pensions versées, frais médicaux, dons", "[Autres déductions](/guide/vaudtax/autres-deductions)"],
        ["Prestation en capital", "page 4", "Retraits 2e et 3e piliers, imposés à part", "[Salaire](/guide/vaudtax/salaire)"],
      ],
      caption: "Intitulés de la prestation VaudTax pour la déclaration 2025, repris des Instructions générales de l'ACI.",
    },

    { type: "h2", id: "chiffres-2026", text: "Les principaux montants vaudois 2026" },
    {
      type: "table",
      head: ["Déduction", "Code", "Montant 2026"],
      rows: [
        ["Voiture (si transports publics pas utilisables)", "140", "CHF 0.75/km jusqu'à 15'000 km, puis CHF 0.35"],
        ["Repas hors du domicile", "150", "CHF 3'200 (CHF 1'600 avec cantine)"],
        ["Autres frais professionnels", "160", "3 % du salaire net, min. CHF 2'000, max. CHF 4'000"],
        ["Couple marié biactif", "235", "CHF 1'700"],
        ["Primes d'assurance-maladie", "300", "CHF 5'000 seul, CHF 9'900 couple, + CHF 1'300 par enfant"],
        ["3e pilier A", "310", "CHF 7'258 (avec LPP) ou 20 %, max. CHF 36'288"],
        ["Intérêts d'épargne", "480", "CHF 1'600 seul, CHF 3'300 couple, + CHF 300 par enfant"],
        ["Entretien d'immeuble (propriétaire occupant)", "540", "Forfait 20 % (20 ans et moins) ou 30 % de la valeur locative"],
        ["Formation continue", "618", "CHF 12'000 par personne"],
        ["Déduction pour le logement", "660", "max. CHF 6'800"],
        ["Frais de garde", "670", "CHF 15'200 par enfant de moins de 14 ans"],
        ["Personne à charge", "680", "CHF 3'400"],
        ["Frais médicaux", "710", "Part dépassant 5 % du revenu"],
        ["Dons", "720", "Max. 20 % du revenu"],
        ["Déduction pour famille", "725", "CHF 1'300 couple, CHF 2'800 parent seul, + CHF 1'000 par enfant"],
      ],
      caption: "Source : Tableau des principales déductions vaudoises 2026, Administration cantonale des impôts.",
    },

    { type: "h2", id: "nouveautes", text: "Ce qui change pour la déclaration 2026" },
    {
      type: "list",
      items: [
        "**VaudTax uniquement en ligne** : le logiciel à installer n'existe plus depuis la déclaration 2025.",
        "**Voiture** : la déduction passe à CHF 0.75 par km (CHF 0.70 en 2025), pour ceux qui y ont droit.",
        "**Rachat 3a** : première année où l'on peut combler une lacune de 3e pilier (pour 2025) et la déduire.",
        "**Initiative « Baisse d'impôts pour tous »** acceptée le 27 septembre 2026 : elle agit sur le calcul de l'impôt cantonal (le Conseil d'État annonce une application dès l'an prochain) et ne change rien à la manière de remplir VaudTax. Voir [notre article](/blog/initiative-12-pourcent-vaud-baisse-impots).",
        "**Valeur locative** : abolie au 1er janvier 2029 seulement. Elle reste dans la déclaration 2026.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Remplir seul ou se faire aider ?" },
    {
      type: "p",
      text: "Pour un salarié avec un ou deux certificats de salaire, un 3e pilier et quelques comptes, VaudTax se remplit seul en une à deux heures avec ce guide. Il vaut la peine de se faire accompagner en cas d'activité indépendante, d'immeuble loué, d'arrivée ou de départ de Suisse en cours d'année, de passage de l'impôt à la source à la taxation ordinaire, ou d'immeuble dans un autre canton.",
    },
  ],
  faq: [
    {
      q: "Quand faut-il rendre la déclaration d'impôt vaudoise 2026 ?",
      a: "En principe au 15 mars 2027, ou à la date imprimée sur votre formulaire. Les personnes domiciliées en Suisse bénéficient d'une tolérance jusqu'au 30 juin, et une prolongation gratuite peut être demandée en ligne (e-Délai) jusqu'à cette date.",
    },
    {
      q: "VaudTax est-il gratuit ?",
      a: "Oui. La prestation en ligne VaudTax de l'État de Vaud est gratuite et accessible 24h/24 sur vd.ch/vaudtax.",
    },
    {
      q: "Combien de temps faut-il pour remplir VaudTax ?",
      a: "Pour une situation simple de salarié, comptez une à deux heures si les documents sont réunis à l'avance. La reprise de l'année précédente et l'import de l'eRelevé fiscal font gagner beaucoup de temps.",
    },
    {
      q: "Faut-il remplir une déclaration séparée pour l'impôt fédéral ?",
      a: "Non. La déclaration vaudoise sert aussi pour l'impôt fédéral direct : VaudTax calcule automatiquement les montants fédéraux lorsque les règles diffèrent (frais de transport, assurances, double activité).",
    },
    {
      q: "Mon entourage parle peu français. Existe-t-il un guide en anglais ?",
      a: "Oui, ce guide existe en anglais, avec les intitulés français de VaudTax pour s'y retrouver à l'écran : neofidu.ch/en/guide/vaudtax.",
    },
  ],
};
