import type { GuideChapterContent } from "../types";

export const fritaxPillarFr: GuideChapterContent = {
  title: "Comment remplir sa déclaration d'impôt fribourgeoise avec FriTax : le guide complet 2026",
  navTitle: "Guide FriTax",
  metaTitle: "Guide FriTax 2026 : la déclaration d'impôt fribourgeoise",
  metaDescription:
    "Tutoriel gratuit pas à pas pour remplir votre déclaration d'impôt fribourgeoise dans FriTax : codes de chaque rubrique (1.110, 2.130, 4.110...), déductions 2026, délais, code FriTax, envoi électronique et impôt à la source.",
  keywords: [
    "fritax",
    "remplir déclaration impôt fribourg",
    "comment remplir fritax",
    "tutoriel fritax",
    "déclaration d'impôt fribourg 2026",
    "déductions fribourg 2026",
    "fritax 2026",
    "guide déclaration impôt fribourgeoise",
  ],
  summary: [
    "**FriTax** est le logiciel gratuit du Service cantonal des contributions (SCC) du canton de Fribourg. Il s'installe sur Windows, macOS et Linux ; il ne fonctionne ni sur tablette ni dans un navigateur. Plus de 130'000 contribuables l'utilisent.",
    "La déclaration **2026** porte sur vos revenus de l'année 2026 et votre fortune au 31 décembre 2026. Elle se dépose à la date imprimée sur la déclaration, en principe le **31 mars 2027**. Chaque prolongation coûte **CHF 20**, jusqu'au 15 décembre au plus tard.",
    "Pour l'envoi électronique, il faut le **code FriTax** de 6 caractères imprimé sur la fourre « Déclaration d'impôt ». L'accusé de réception remplace la signature.",
    "Ce guide suit la déclaration fribourgeoise en **11 chapitres** et donne, pour chaque montant, le code de la déclaration (1.110, 2.130, 4.110, etc.) et l'annexe de FriTax concernée.",
  ],
  blocks: [
    { type: "h2", id: "en-10-etapes", text: "Remplir FriTax en 10 étapes" },
    {
      type: "steps",
      items: [
        "Installez FriTax, réunissez vos documents et repérez votre code FriTax. [Avant de commencer](/guide/fritax/avant-de-commencer)",
        "Cliquez sur « Importer données de l'année précédente » pour repartir de votre déclaration de l'an dernier.",
        "Complétez la page 1 : état civil, religion, enfants et personnes à charge (cases A, B ou C). [Situation personnelle](/guide/fritax/situation-personnelle)",
        "Saisissez vos salaires nets (code 1.110), gains accessoires (1.120), indemnités (1.510 à 1.530) et rentes (3.110 à 3.150). [Salaire et revenus](/guide/fritax/salaire)",
        "Remplissez l'annexe 03 : transport (2.110), repas (2.120), forfait de 3 % (2.130). [Frais professionnels](/guide/fritax/frais-professionnels)",
        "Indiquez 3e pilier A (4.130), rachats LPP (4.140) et, nouveauté 2026, rachats 3a. [Prévoyance](/guide/fritax/prevoyance)",
        "Remplissez l'état des titres (annexe 01) : comptes, titres, crypto, e-relevés bancaires. [Comptes et titres](/guide/fritax/comptes-titres)",
        "Ajoutez les autres éléments de fortune, l'état des dettes (annexe 02) et l'état des immeubles (annexe 04). [Fortune et dettes](/guide/fritax/fortune-dettes) · [Immeubles](/guide/fritax/immeubles)",
        "Contrôlez primes d'assurance, frais de garde, frais médicaux, dons et déductions sociales. [Déductions](/guide/fritax/deductions)",
        "Vérifiez le calcul, joignez les pièces demandées, envoyez avec le code FriTax et contrôlez l'accusé de réception. [Vérifier et envoyer](/guide/fritax/verifier-envoyer)",
      ],
    },
    {
      type: "screenshot",
      file: "00-accueil.webp",
      alt: "Écran d'accueil de FriTax 2025 : nouvelle déclaration, liste des déclarations, ouvrir déclaration, exporter et importer déclaration d'impôt, importer données de l'année précédente",
      caption: "L'écran d'accueil de FriTax : nouvelle déclaration, liste des déclarations enregistrées sur l'ordinateur, export, import et reprise de l'année précédente (FriTax 2025, données fictives)",
    },

    { type: "h2", id: "rubriques", text: "Où trouver quoi : pages, annexes et codes de la déclaration fribourgeoise" },
    {
      type: "p",
      text: "La déclaration fribourgeoise compte **quatre pages** et des **annexes numérotées** de 01 à 06. Chaque montant porte un **code** à quatre chiffres : le premier chiffre indique la famille (1 pour le revenu d'activité, 2 pour les frais, 3 pour les autres revenus et la fortune, 4 à 7 pour les déductions). Quand le SCC vous écrit au sujet du « code 2.130 », il parle du forfait pour autres frais professionnels. Dans FriTax, la colonne **« Formulaires »** à gauche liste la déclaration (pages 1 à 4) et toutes les annexes ; le petit bouton bleu **« ... »** à côté d'un code ouvre aussi l'annexe qui le calcule (« Ouvrir l'annexe »). Le total est reporté automatiquement sur la déclaration, et le panneau **« Erreurs »** à droite signale ce qui manque encore.",
    },
    {
      type: "table",
      head: ["Rubrique", "Annexe", "Codes", "Chapitre"],
      rows: [
        ["Situation personnelle, professionnelle et familiale", "Page 1", "Cases A*, B*, C*", "[Situation personnelle](/guide/fritax/situation-personnelle)"],
        ["Revenu d'activité salariée et indemnités", "Déclaration et annexe 03", "1.110 à 1.530", "[Salaire](/guide/fritax/salaire)"],
        ["Frais d'acquisition du revenu", "Annexe 03 « Revenu d'activité-Frais d'acquisition »", "2.110 à 2.510", "[Frais professionnels](/guide/fritax/frais-professionnels)"],
        ["Rentes et pensions", "Déclaration", "3.110 à 3.150", "[Salaire](/guide/fritax/salaire)"],
        ["Etat des titres et autres placements de capitaux", "Annexe 01, DA-1 et R-US", "3.210 à 3.250", "[Comptes et titres](/guide/fritax/comptes-titres)"],
        ["Immeubles", "Annexe 04 « Etat des immeubles »", "3.310 à 3.350, 4.310 à 4.315", "[Immeubles](/guide/fritax/immeubles)"],
        ["Autres éléments de fortune", "Déclaration, lettre A « Assurances »", "3.510 à 3.570", "[Fortune et dettes](/guide/fritax/fortune-dettes)"],
        ["Intérêts et dettes", "Annexe 02 « Etat des dettes »", "4.210, 4.220", "[Fortune et dettes](/guide/fritax/fortune-dettes)"],
        ["Primes, prévoyance, autres déductions", "Déclaration", "4.110 à 4.420", "[Prévoyance](/guide/fritax/prevoyance) · [Déductions](/guide/fritax/deductions)"],
        ["Frais médicaux, dons, déductions sociales", "Dernière page, lettres B et C", "5.110 à 7.110", "[Déductions](/guide/fritax/deductions)"],
        ["Prestations en capital", "Dernière page, lettre E", "Imposition séparée", "[Prévoyance](/guide/fritax/prevoyance)"],
      ],
      caption: "Codes et annexes : Instructions générales concernant la déclaration des personnes physiques 2025, SCC Fribourg (janvier 2026).",
    },

    { type: "h2", id: "chiffres-2026", text: "Les principaux montants fribourgeois 2026 (impôt cantonal et communal)" },
    {
      type: "table",
      head: ["Déduction", "Code", "Montant 2026"],
      rows: [
        ["Frais de transport domicile-travail", "2.110", "max. CHF 12'000 ; voiture CHF 0.70 par km (si pas de transports publics)"],
        ["Repas pris hors du domicile", "2.120", "CHF 15 par repas, max. CHF 3'200"],
        ["Autres frais professionnels (forfait)", "2.130", "3 % du salaire net, min. CHF 2'000, max. CHF 4'000"],
        ["Activité accessoire salariée", "2.140", "20 %, min. CHF 800, max. CHF 2'400"],
        ["Activité lucrative des deux conjoints", "2.510", "CHF 500"],
        ["Primes d'assurance-maladie et accidents (forfait)", "4.110", "CHF 4'810 par adulte, CHF 4'210 jeune adulte en formation, CHF 1'140 par enfant"],
        ["Frais de garde des enfants", "4.380", "max. CHF 12'000 par enfant de moins de 14 ans"],
        ["Formation et perfectionnement", "4.420", "max. CHF 12'000"],
        ["Frais médicaux", "5.110", "part dépassant 5 % du revenu net"],
        ["Dons", "5.120", "min. CHF 100, max. 20 % du revenu net"],
        ["Déduction sociale par enfant", "6.110", "CHF 8'600 (CHF 9'600 dès le 3e), réduite selon le revenu, min. CHF 7'100"],
        ["Entretien d'immeuble privé (forfait)", "4.310", "10 % (construit après 2015) ou 20 % du rendement brut"],
        ["Déduction sociale sur la fortune", "7.110", "CHF 55'000 personne seule, CHF 105'000 couple ou famille, dégressive"],
      ],
      caption: "Source : Feuille cantonale Fribourg, Administration fédérale des contributions, état février 2026 ; Instructions générales 2025, SCC Fribourg. Le canton n'a pas modifié ces montants pour la période fiscale 2026.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Couples et familles monoparentales : le splitting intégral",
      text: "Le canton de Fribourg impose le revenu des couples mariés et des familles monoparentales au **taux correspondant à 50 %** de leur revenu imposable (splitting intégral). Un couple qui gagne CHF 80'000 imposables paie au taux d'une personne seule à CHF 40'000. Le calcul est automatique : vous n'avez rien à saisir.",
    },

    { type: "h2", id: "nouveautes", text: "Ce qui change (et ne change pas) pour la déclaration 2026" },
    {
      type: "list",
      items: [
        "**Déductions et barèmes cantonaux inchangés** : après le refus de la loi sur l'assainissement des finances (LAFE) en votation le 26 avril 2026, le plafond des frais de transport reste à CHF 12'000 (la LAFE prévoyait CHF 8'000).",
        "**Coefficient cantonal** : il reste fixé à **96 %** de l'impôt de base pour 2026.",
        "**Rachats de 3e pilier A** : les cotisations 3a non versées en 2025 peuvent être rattrapées et déduites pour la première fois dans la déclaration 2026.",
        "**Rentes viagères** : depuis 2025, elles ne sont plus imposées à 40 % mais selon leur **part de rendement** attestée par l'assureur.",
        "**Pour 2027** : le Grand Conseil a adopté le 7 octobre 2026 la compensation de la progression à froid. Dès la période fiscale 2027, la déduction par enfant passera par exemple à CHF 9'100, sous réserve de référendum.",
        "**Valeur locative** : sa suppression au niveau fédéral entre en vigueur le 1er janvier 2029. Elle reste donc dans la déclaration 2026.",
      ],
    },

    { type: "h2", id: "seul-ou-accompagne", text: "Remplir seul ou se faire aider ?" },
    {
      type: "p",
      text: "Pour un salarié avec un ou deux certificats de salaire, un 3e pilier et quelques comptes, FriTax se remplit seul en une à deux heures avec ce guide. Il vaut la peine de se faire accompagner en cas d'activité indépendante ou agricole, d'immeuble loué ou de travaux importants, d'immeuble dans un autre canton ou à l'étranger, de part à une succession non partagée, d'arrivée ou de départ en cours d'année, ou de taxation ordinaire ultérieure (TOU) après l'impôt à la source.",
    },
  ],
  faq: [
    {
      q: "Quand faut-il rendre la déclaration d'impôt fribourgeoise 2026 ?",
      a: "À la date imprimée en haut à droite de la première page de la déclaration, en principe le 31 mars 2027. En payant CHF 20 avec la QR-facture jointe, le délai passe au 30 juin, puis par étapes au 31 août, au 31 octobre et au 15 décembre au plus tard.",
    },
    {
      q: "FriTax est-il gratuit ?",
      a: "Oui. FriTax est mis gratuitement à disposition par le Service cantonal des contributions. Téléchargez-le uniquement depuis fr.ch/fritax.",
    },
    {
      q: "Existe-t-il une version en ligne de FriTax ?",
      a: "Non. FriTax est un programme à installer sur un ordinateur (Windows 10 64 bits ou plus récent, macOS 10.15 ou plus récent, Linux Ubuntu). Il ne fonctionne pas sur tablette. L'envoi de la déclaration, lui, se fait par internet depuis le programme.",
    },
    {
      q: "Faut-il remplir une déclaration séparée pour l'impôt fédéral ?",
      a: "Non. La déclaration fribourgeoise sert aussi pour l'impôt fédéral direct (IFD). Le SCC applique lui-même les différences entre la loi cantonale et la loi fédérale (plafond des frais de transport, primes d'assurance, frais de garde, etc.).",
    },
    {
      q: "Existe-t-il un guide FriTax en anglais ?",
      a: "Oui, ce guide existe en anglais, avec les libellés français de FriTax suivis d'une traduction : neofidu.ch/en/guide/fritax.",
    },
  ],
};
