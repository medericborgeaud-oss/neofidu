import type { GuideChapterContent } from "../types";

export const vstaxPillarFr: GuideChapterContent = {
  title: "Comment remplir sa déclaration d'impôt valaisanne avec VSTax : le guide complet 2026",
  navTitle: "Guide VSTax",
  metaTitle: "Remplir sa déclaration d'impôt en Valais avec VSTax : guide 2026",
  metaDescription:
    "Tutoriel gratuit pas à pas pour remplir votre déclaration d'impôt valaisanne dans VSTax : codes de chaque rubrique, déductions 2026, délais, envoi sans signature, résidences secondaires et impôt à la source.",
  keywords: [
    "vstax",
    "remplir déclaration impôt valais",
    "comment remplir vstax",
    "tutoriel vstax",
    "déclaration d'impôt valais 2026",
    "déductions valais 2026",
    "vstax 2026",
    "guide déclaration impôt valaisanne",
  ],
  summary: [
    "**VSTax** est le logiciel gratuit du Service cantonal des contributions (SCC) du Valais. Il s'installe sur Windows, macOS et Linux ; il n'existe pas de version en ligne. Près de 90 % des contribuables valaisans l'utilisent.",
    "La déclaration **2026** porte sur vos revenus de l'année 2026 et votre fortune au 31 décembre 2026. Elle se dépose en principe jusqu'au **31 mars 2027**. Une prolongation coûte **CHF 20**, payés avec le bulletin joint à la déclaration.",
    "Il faut votre **numéro de contribuable**, votre **numéro de dossier** et le **mot de passe** de 10 caractères imprimés sur la déclaration papier, plus vos certificats de salaire, relevés bancaires et attestations 3e pilier.",
    "Ce guide suit les formulaires de VSTax en **11 chapitres** et donne, pour chaque montant, l'annexe et le code de la déclaration valaisanne (310, 1910, 2560, etc.).",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Remplir VSTax en 10 étapes" },
    {
      type: "steps",
      items: [
        "Installez VSTax, réunissez vos documents et repérez numéro de contribuable, numéro de dossier et mot de passe. [Avant de commencer](/guide/vstax/avant-de-commencer)",
        "Créez la déclaration « avec reprise des données de l'année précédente » pour repartir de votre fichier .vstax de l'an dernier.",
        "Complétez les données personnelles, vos enfants et les frais de garde. [Situation personnelle](/guide/vstax/situation-personnelle)",
        "Saisissez vos salaires nets dans l'annexe 5 (code 310), vos rentes dans l'annexe 1 et vos gains accessoires. [Salaire et revenus](/guide/vstax/salaire)",
        "Remplissez vos frais de déplacement, de repas et le forfait de 3 % dans l'annexe 5 (code 1910). [Frais professionnels](/guide/vstax/frais-professionnels)",
        "Indiquez 3e pilier A, rachats LPP et, nouveauté 2026, rachats 3a. [Prévoyance](/guide/vstax/prevoyance)",
        "Remplissez l'état des titres : comptes, titres, crypto, relevés fiscaux électroniques. [Comptes et titres](/guide/vstax/comptes-titres)",
        "Ajoutez les autres éléments de fortune, vos dettes et vos immeubles, résidence secondaire comprise. [Fortune et dettes](/guide/vstax/fortune-dettes) · [Immeubles](/guide/vstax/immeubles)",
        "Déduisez primes d'assurance, frais médicaux, dons et formation. [Déductions](/guide/vstax/deductions)",
        "Validez, lancez le calcul estimatif, joignez les justificatifs et transmettez sans signature. [Vérifier et transmettre](/guide/vstax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-accueil.webp",
      alt: "Écran d'accueil de VSTax 2025 : créer la déclaration avec reprise des données de l'année précédente, nouvelle déclaration, chercher et ouvrir",
      caption: "Le menu de démarrage de VSTax : reprise de l'an dernier, nouvelle déclaration ou ouverture d'un fichier existant (VSTax 2025)",
    },

    { type: "h2", id: "rubriques", text: "Où trouver quoi : formulaires VSTax, annexes et codes" },
    {
      type: "p",
      text: "La déclaration valaisanne compte **quatre pages** et des **annexes numérotées** de 1 à 5. Chaque montant porte un **code** : quand le SCC vous écrit au sujet du « code 1910 », il parle des frais professionnels du contribuable 1. Les codes suivis d'un « a » (310a, 600a) concernent le contribuable 2. Dans VSTax, chaque annexe est un formulaire de la liste « Formulaires », à gauche de l'écran ; ses totaux sont reportés automatiquement sur la déclaration.",
    },
    {
      type: "table",
      head: ["Formulaire VSTax", "Annexe", "Codes", "Chapitre"],
      rows: [
        ["Données personnelles, Déclaration d'impôts page 1", "Page 1", "État civil, enfants", "[Situation personnelle](/guide/vstax/situation-personnelle)"],
        ["Salaires et frais professionnels", "Annexe 5", "310, 320, 1910, 1920", "[Salaire](/guide/vstax/salaire)"],
        ["Rentes, pensions, revenus de contrats viagers et autres rentes", "Annexe 1", "600, 610, 720, 2530", "[Salaire](/guide/vstax/salaire)"],
        ["Détail gains accessoires", "Page 2", "410, 420", "[Salaire](/guide/vstax/salaire)"],
        ["Déclaration d'impôts page 3", "Page 3", "2100, 2210, 2220", "[Prévoyance](/guide/vstax/prevoyance)"],
        ["Etat des titres et autres placements de capitaux", "Annexe 3", "1210, 1800, 3200", "[Comptes et titres](/guide/vstax/comptes-titres)"],
        ["Etat des dettes", "Annexe 4", "1720, 3800", "[Fortune et dettes](/guide/vstax/fortune-dettes)"],
        ["Immeubles", "Annexe 2", "1110 à 1130, 2920 à 2923", "[Immeubles](/guide/vstax/immeubles)"],
        ["Autres déductions", "Page 3", "2510 à 2581", "[Déductions](/guide/vstax/deductions)"],
        ["Impôt fédéral direct", "Feuille IFD", "2710 à 2810", "[Déductions](/guide/vstax/deductions)"],
        ["Prestations en capital touchées", "Page 3", "1010, 1020", "[Prévoyance](/guide/vstax/prevoyance)"],
      ],
      caption: "Intitulés de VSTax 2025 et codes de la Déclaration 2025 des personnes physiques, SCC Valais.",
    },

    { type: "h2", id: "chiffres-2026", text: "Les principaux montants valaisans 2026 (impôt cantonal et communal)" },
    {
      type: "table",
      head: ["Déduction", "Code", "Montant 2026"],
      rows: [
        ["Autres frais professionnels (forfait)", "1910", "3 % du salaire net, min. CHF 2'000, max. CHF 4'000"],
        ["Voiture pour aller au travail", "1910", "CHF 0.75 par km jusqu'à 15'000 km, puis dégressif"],
        ["Repas pris hors du domicile", "1910", "CHF 15 par jour, max. CHF 3'200"],
        ["Gains accessoires", "410, 420", "20 %, min. CHF 800, max. CHF 2'400"],
        ["Déduction sur le revenu du conjoint (deux revenus)", "2520", "max. CHF 7'000 (CHF 6'290 en 2025)"],
        ["Primes d'assurance et intérêts d'épargne", "2560", "CHF 7'600 couple, CHF 3'800 seul, + CHF 1'130 par enfant"],
        ["Enfant à charge", "2510", "CHF 7'860 (moins de 6 ans), CHF 8'940 (6 à 16 ans), CHF 11'930 (dès 16 ans)"],
        ["Frais de garde par un tiers", "2512", "max. CHF 10'000 par enfant de moins de 14 ans"],
        ["Garde de ses propres enfants", "2512a", "CHF 3'130 par enfant de moins de 14 ans"],
        ["Frais de maladie", "2565", "part dépassant 2 % du revenu net"],
        ["Formation continue", "2581", "max. CHF 12'550"],
        ["Dons", "2570", "max. 20 % du revenu net"],
        ["Entretien d'immeuble (forfait)", "Annexe 2", "10 % (bâtiment de 10 ans ou moins) ou 20 %"],
        ["Déduction sur la fortune", "3900", "CHF 90'000 couple ou famille, CHF 45'000 autres personnes"],
      ],
      caption: "Source : « Adaptation des déductions forfaitaires pour l'imposition 2026 », SCC Valais, 7 novembre 2025, et Feuille cantonale Valais de l'Administration fédérale des contributions, état février 2026. Codes : Déclaration 2025, SCC.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples et familles : un rabais de 35 % sur l'impôt",
      text: "Le Valais ne pratique pas le splitting. Pour les couples mariés et les parents qui vivent avec leurs enfants, c'est le **montant d'impôt cantonal** qui est réduit de **35 %**, au minimum de CHF 680 et au maximum de CHF 4'900, puis de **CHF 300 par enfant**. Le calcul est automatique : vous n'avez rien à saisir.",
    },

    { type: "h2", id: "nouveautes", text: "Ce qui change pour la déclaration 2026" },
    {
      type: "list",
      items: [
        "**Primes d'assurance** : le plafond passe à CHF 7'600 pour un couple et CHF 3'800 pour une personne seule (CHF 7'240 et CHF 3'620 en 2025), selon la modification de la loi fiscale au 1er janvier 2026.",
        "**Couples à deux revenus** : la déduction sur le revenu le plus bas passe de CHF 6'290 à CHF 7'000.",
        "**Nouvelles déductions** : CHF 7'000 pour les retraités qui continuent de travailler, et CHF 1'000 à CHF 3'000 pour les rentiers AVS vivant seuls avec une fortune inférieure à CHF 100'000. Le logement d'un étudiant du degré tertiaire passe de CHF 5'220 à CHF 10'000.",
        "**Rachats de 3e pilier A** : les cotisations 3a non versées en 2025 peuvent être rattrapées et déduites pour la première fois dans la déclaration 2026.",
        "**Tell Tax** : dès la période fiscale 2026, l'application ne stocke plus les justificatifs dans le cloud. Elle sert encore à les scanner avec le code QR affiché dans VSTax (VSTax-QR).",
        "**Valeur locative** : sa suppression entre en vigueur le 1er janvier 2029 (Conseil fédéral, 1er avril 2026). Elle reste donc dans la déclaration 2026.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Remplir seul ou se faire aider ?" },
    {
      type: "p",
      text: "Pour un salarié avec un ou deux certificats de salaire, un 3e pilier et quelques comptes, VSTax se remplit seul en une à deux heures avec ce guide. Il vaut la peine de se faire accompagner en cas d'activité indépendante ou agricole, de chalet ou d'appartement loué (meublé ou non), d'immeuble dans un autre canton ou à l'étranger, de part à une succession non partagée, d'arrivée ou de départ en cours d'année, ou de taxation ordinaire ultérieure (TOU) après l'impôt à la source.",
    },
  ],
  faq: [
    {
      q: "Quand faut-il rendre la déclaration d'impôt valaisanne 2026 ?",
      a: "En principe jusqu'au 31 mars 2027. En payant l'émolument de CHF 20 avec le bulletin joint à la déclaration avant cette date, vous obtenez sans autre démarche une prolongation, en principe au 31 juillet (au 31 octobre si votre activité principale est indépendante).",
    },
    {
      q: "VSTax est-il gratuit ?",
      a: "Oui. VSTax est mis gratuitement à disposition par le Service cantonal des contributions. Téléchargez-le uniquement depuis vs.ch/vstax.",
    },
    {
      q: "Existe-t-il une version en ligne de VSTax ?",
      a: "Non. VSTax est un programme à installer, pour Windows 10 et 11, macOS 11 ou plus récent et Linux. La transmission de la déclaration, elle, se fait par internet depuis le programme.",
    },
    {
      q: "Faut-il remplir une déclaration séparée pour l'impôt fédéral ?",
      a: "Non. La déclaration valaisanne sert aussi pour l'impôt fédéral direct (IFD). VSTax calcule les différences entre la loi cantonale et la loi fédérale dans le formulaire « Impôt fédéral direct ».",
    },
    {
      q: "Existe-t-il un guide VSTax en anglais ?",
      a: "Oui, ce guide existe en anglais, avec les libellés français de VSTax suivis d'une traduction : neofidu.ch/en/guide/vstax.",
    },
  ],
};
