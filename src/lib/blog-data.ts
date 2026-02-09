export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "fiscalite" | "comptabilite" | "actualites" | "conseils";
  date: string;
  readTime: number;
  image?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    slug: "declaration-impots-2025-nouveautes",
    title: "Déclaration d'impôts 2025 : les nouveautés à connaître",
    excerpt: "Découvrez les changements fiscaux pour l'année 2025 et comment optimiser votre déclaration dans les cantons romands.",
    content: `
      <h2>Les principales modifications fiscales pour 2025</h2>
      <p>L'année fiscale 2025 apporte son lot de changements pour les contribuables suisses. Voici les points essentiels à retenir pour optimiser votre déclaration.</p>

      <h3>Augmentation des déductions pour le pilier 3a</h3>
      <p>Le plafond de déduction pour le pilier 3a a été relevé, permettant aux salariés affiliés à une caisse de pension de déduire davantage de leur revenu imposable.</p>

      <h3>Nouvelles règles pour le télétravail</h3>
      <p>Les frais liés au home office sont désormais mieux encadrés. Vous pouvez déduire une partie de vos charges si vous travaillez régulièrement depuis votre domicile.</p>

      <h3>Déductions pour la rénovation énergétique</h3>
      <p>Les investissements visant à améliorer l'efficacité énergétique de votre logement restent déductibles et peuvent même être étalés sur plusieurs années fiscales.</p>
    `,
    category: "fiscalite",
    date: "2025-01-15",
    readTime: 5,
  },
  {
    id: "2",
    slug: "tva-suisse-independants-guide",
    title: "TVA en Suisse : guide complet pour les indépendants",
    excerpt: "Tout ce que vous devez savoir sur l'assujettissement à la TVA, les seuils et les obligations déclaratives.",
    content: `
      <h2>Comprendre la TVA suisse</h2>
      <p>En tant qu'indépendant en Suisse, la question de la TVA se pose dès que votre chiffre d'affaires commence à croître. Voici un guide pratique.</p>

      <h3>Seuil d'assujettissement</h3>
      <p>Vous devez vous inscrire à la TVA dès que votre chiffre d'affaires annuel atteint CHF 100'000. En dessous de ce seuil, l'inscription reste facultative mais peut s'avérer avantageuse selon votre activité.</p>

      <h3>Méthode effective vs méthode forfaitaire</h3>
      <p>Deux méthodes de décompte sont possibles : la méthode effective (TVA collectée moins TVA déductible) ou la méthode des taux de dette fiscale nette (forfaitaire). Chaque méthode a ses avantages.</p>

      <h3>Délais de déclaration</h3>
      <p>Les décomptes TVA doivent être remis trimestriellement dans les 60 jours suivant la fin de la période. Un retard entraîne des intérêts moratoires.</p>
    `,
    category: "comptabilite",
    date: "2025-01-10",
    readTime: 7,
  },
  {
    id: "3",
    slug: "deductions-fiscales-meconnues",
    title: "10 déductions fiscales souvent oubliées",
    excerpt: "Maximisez vos économies d'impôts en découvrant ces déductions légales que beaucoup de contribuables ignorent.",
    content: `
      <h2>Optimisez votre déclaration</h2>
      <p>De nombreuses déductions fiscales passent inaperçues. Voici une liste de postes souvent négligés.</p>

      <h3>1. Frais de formation continue</h3>
      <p>Les dépenses liées à votre perfectionnement professionnel sont déductibles jusqu'à CHF 12'000 par an au niveau fédéral.</p>

      <h3>2. Cotisations syndicales et professionnelles</h3>
      <p>Les cotisations versées à des associations professionnelles ou syndicats sont intégralement déductibles.</p>

      <h3>3. Dons aux organisations d'utilité publique</h3>
      <p>Vos dons à des organisations reconnues sont déductibles jusqu'à 20% de votre revenu net.</p>

      <h3>4. Frais de garde d'enfants</h3>
      <p>Les frais de crèche, maman de jour ou parascolaire sont déductibles, avec des plafonds variant selon les cantons.</p>
    `,
    category: "conseils",
    date: "2025-01-05",
    readTime: 6,
  },
  {
    id: "4",
    slug: "creation-entreprise-suisse-etapes",
    title: "Créer son entreprise en Suisse : les étapes clés",
    excerpt: "Raison individuelle, Sàrl ou SA ? Guide pratique pour choisir la bonne structure et démarrer sereinement.",
    content: `
      <h2>Bien démarrer son activité</h2>
      <p>La création d'une entreprise en Suisse implique plusieurs choix stratégiques. Voici les étapes essentielles.</p>

      <h3>Choisir la forme juridique</h3>
      <p>Trois options principales s'offrent à vous : la raison individuelle (simple et rapide), la Sàrl (protection du patrimoine personnel) ou la SA (pour des projets plus ambitieux).</p>

      <h3>Inscription au Registre du Commerce</h3>
      <p>Obligatoire dès CHF 100'000 de chiffre d'affaires pour une raison individuelle, l'inscription confère une existence légale à votre entreprise.</p>

      <h3>Affiliation aux assurances sociales</h3>
      <p>AVS, prévoyance professionnelle, assurance accidents : les obligations varient selon votre statut et le nombre d'employés.</p>
    `,
    category: "conseils",
    date: "2024-12-20",
    readTime: 8,
  },
  {
    id: "5",
    slug: "bouclement-annuel-pme-checklist",
    title: "Bouclement annuel : checklist pour les PME",
    excerpt: "Préparez efficacement votre clôture comptable avec cette liste de contrôle complète.",
    content: `
      <h2>Réussir son bouclement</h2>
      <p>La fin d'exercice approche ? Voici les points à vérifier pour un bouclement serein.</p>

      <h3>Avant le 31 décembre</h3>
      <ul>
        <li>Enregistrer toutes les factures fournisseurs reçues</li>
        <li>Émettre les dernières factures clients</li>
        <li>Effectuer l'inventaire des stocks</li>
        <li>Calculer les amortissements</li>
      </ul>

      <h3>Travaux de clôture</h3>
      <ul>
        <li>Rapprochement bancaire</li>
        <li>Provision pour créances douteuses</li>
        <li>Régularisations (charges et produits à reporter)</li>
        <li>Calcul de l'impôt sur le bénéfice</li>
      </ul>
    `,
    category: "comptabilite",
    date: "2024-12-15",
    readTime: 5,
  },
  {
    id: "6",
    slug: "impots-immobilier-suisse",
    title: "Fiscalité immobilière en Suisse : ce qu'il faut savoir",
    excerpt: "Valeur locative, intérêts hypothécaires, plus-values : maîtrisez les aspects fiscaux de votre bien immobilier.",
    content: `
      <h2>L'immobilier et les impôts</h2>
      <p>Posséder un bien immobilier en Suisse a des implications fiscales importantes. Tour d'horizon.</p>

      <h3>La valeur locative</h3>
      <p>Les propriétaires occupants doivent déclarer une valeur locative fictive comme revenu. Cette particularité suisse est compensée par la déductibilité des intérêts hypothécaires et des frais d'entretien.</p>

      <h3>Déductions possibles</h3>
      <p>Intérêts d'emprunt, frais d'entretien, primes d'assurance bâtiment et travaux de rénovation énergétique sont déductibles de votre revenu imposable.</p>

      <h3>Impôt sur les gains immobiliers</h3>
      <p>Lors de la vente, le bénéfice réalisé est soumis à un impôt cantonal spécifique dont le taux diminue avec la durée de détention.</p>
    `,
    category: "fiscalite",
    date: "2024-12-10",
    readTime: 6,
  },
  {
    id: "7",
    slug: "pilier-3a-guide-complet",
    title: "Le pilier 3a en 2025 : guide complet pour optimiser votre prévoyance",
    excerpt: "Tout savoir sur le 3ème pilier : plafonds, avantages fiscaux, stratégies de retrait et choix entre banque ou assurance.",
    content: `
      <h2>Le pilier 3a : votre allié fiscal</h2>
      <p>Le pilier 3a est l'un des outils les plus efficaces pour réduire vos impôts tout en préparant votre retraite. Voici tout ce que vous devez savoir.</p>

      <h3>Plafonds de cotisation 2025</h3>
      <p>Les salariés affiliés à une caisse de pension peuvent déduire jusqu'à CHF 7'056 en 2025. Les indépendants sans LPP peuvent déduire 20% de leur revenu net, plafonné à CHF 35'280.</p>

      <h3>Banque ou assurance ?</h3>
      <p>Un compte 3a bancaire offre plus de flexibilité, tandis qu'une solution d'assurance combine épargne et couverture risque. Évaluez vos besoins avant de choisir.</p>

      <h3>Stratégies de retrait</h3>
      <p>Le capital 3a est imposé séparément au moment du retrait. Échelonner les retraits sur plusieurs années peut significativement réduire la charge fiscale.</p>

      <h3>Astuce : ouvrir plusieurs comptes</h3>
      <p>Vous pouvez détenir plusieurs comptes 3a. Cette stratégie permet de planifier des retraits échelonnés et d'optimiser la fiscalité à la retraite.</p>
    `,
    category: "conseils",
    date: "2025-01-20",
    readTime: 7,
  },
  {
    id: "8",
    slug: "erreurs-declaration-impots-eviter",
    title: "Les 7 erreurs les plus courantes dans sa déclaration d'impôts",
    excerpt: "Évitez ces pièges fréquents qui peuvent vous coûter cher ou retarder le traitement de votre déclaration.",
    content: `
      <h2>Ne laissez pas ces erreurs vous pénaliser</h2>
      <p>Chaque année, de nombreux contribuables commettent les mêmes erreurs. Voici comment les éviter.</p>

      <h3>1. Oublier des revenus</h3>
      <p>Allocations familiales, intérêts bancaires, revenus locatifs... tous les revenus doivent être déclarés, même les petits montants.</p>

      <h3>2. Ne pas déclarer les comptes à l'étranger</h3>
      <p>Tout compte bancaire étranger doit être mentionné. L'échange automatique d'informations rend cette obligation incontournable.</p>

      <h3>3. Sous-estimer la valeur des titres</h3>
      <p>Utilisez les cours officiels au 31 décembre pour évaluer votre fortune mobilière. Des erreurs peuvent déclencher des contrôles.</p>

      <h3>4. Oublier les déductions forfaitaires</h3>
      <p>Frais professionnels, assurance maladie, prévoyance... vérifiez que tous les forfaits auxquels vous avez droit sont appliqués.</p>

      <h3>5. Confondre frais d'entretien et plus-value</h3>
      <p>Seuls les frais d'entretien sont déductibles, pas les travaux de plus-value comme une piscine ou une véranda.</p>
    `,
    category: "fiscalite",
    date: "2025-01-25",
    readTime: 5,
  },
  {
    id: "9",
    slug: "comptabilite-startup-suisse",
    title: "Comptabilité pour startups : les bases essentielles",
    excerpt: "Du premier jour à la levée de fonds, gérez efficacement la comptabilité de votre jeune entreprise.",
    content: `
      <h2>Bien démarrer sa comptabilité</h2>
      <p>Une comptabilité bien tenue est cruciale pour le succès de votre startup. Voici les fondamentaux.</p>

      <h3>Choisir son logiciel comptable</h3>
      <p>Optez pour une solution adaptée à votre taille : Bexio, Abacus ou simplement Excel au départ. L'important est la rigueur dans la saisie.</p>

      <h3>Séparer les finances personnelles et professionnelles</h3>
      <p>Ouvrez un compte bancaire dédié dès le premier jour. Cette séparation facilite la comptabilité et la crédibilité face aux investisseurs.</p>

      <h3>Archiver tous les justificatifs</h3>
      <p>Conservez chaque facture, reçu et contrat pendant 10 ans minimum. La numérisation facilite l'archivage et la recherche.</p>

      <h3>Anticiper le reporting</h3>
      <p>Si vous visez une levée de fonds, préparez des états financiers mensuels. Les investisseurs apprécient la transparence et la rigueur.</p>
    `,
    category: "comptabilite",
    date: "2025-01-18",
    readTime: 6,
  },
  {
    id: "10",
    slug: "nouveau-droit-succession-vaud",
    title: "Droit des successions à Vaud : ce qui change en 2025",
    excerpt: "Les modifications du droit successoral vaudois et leurs implications pour la planification patrimoniale.",
    content: `
      <h2>Évolutions du droit successoral</h2>
      <p>Le canton de Vaud a apporté des modifications importantes aux règles de succession. Voici ce qu'il faut retenir.</p>

      <h3>Nouvelle quotité disponible</h3>
      <p>La part dont vous pouvez disposer librement a été élargie, offrant plus de flexibilité dans la répartition de votre patrimoine.</p>

      <h3>Impact sur les pactes successoraux</h3>
      <p>Les accords existants peuvent nécessiter une révision. Consultez un spécialiste pour vérifier la validité de vos dispositions.</p>

      <h3>Fiscalité des héritages</h3>
      <p>Les taux d'imposition varient selon le lien de parenté. Les conjoints et descendants directs bénéficient d'exonérations totales ou partielles.</p>

      <h3>Planification recommandée</h3>
      <p>Une planification successorale anticipée permet d'optimiser la transmission et d'éviter les conflits familiaux.</p>
    `,
    category: "actualites",
    date: "2025-01-12",
    readTime: 5,
  },
  {
    id: "11",
    slug: "teletravail-frontaliers-fiscalite",
    title: "Télétravail et frontaliers : les règles fiscales 2025",
    excerpt: "Comment le télétravail impacte l'imposition des travailleurs frontaliers entre la Suisse et la France.",
    content: `
      <h2>Télétravail transfrontalier : les nouvelles règles</h2>
      <p>Les accords bilatéraux ont évolué pour tenir compte du télétravail. Voici les points clés pour les frontaliers.</p>

      <h3>Seuil de tolérance</h3>
      <p>Un accord permet aux frontaliers de télétravailler jusqu'à 40% du temps depuis leur domicile sans changement de régime fiscal.</p>

      <h3>Au-delà du seuil</h3>
      <p>Si le télétravail dépasse ce seuil, une partie du salaire peut être imposée dans le pays de résidence, complexifiant la situation.</p>

      <h3>Déclaration et justificatifs</h3>
      <p>Tenez un registre précis des jours travaillés à domicile et en Suisse. Ces informations peuvent être demandées par les autorités fiscales.</p>

      <h3>Conseils pratiques</h3>
      <p>Coordonnez-vous avec votre employeur pour rester dans les limites autorisées et éviter une double imposition défavorable.</p>
    `,
    category: "actualites",
    date: "2025-01-08",
    readTime: 6,
  },
  {
    id: "12",
    slug: "optimisation-fiscale-famille",
    title: "Optimisation fiscale pour les familles : stratégies légales",
    excerpt: "Réduisez votre charge fiscale familiale grâce à ces stratégies éprouvées et parfaitement légales.",
    content: `
      <h2>Maximiser les avantages fiscaux familiaux</h2>
      <p>Les familles disposent de nombreux leviers pour réduire légalement leur imposition. Tour d'horizon des possibilités.</p>

      <h3>Frais de garde déductibles</h3>
      <p>Crèche, maman de jour, parascolaire : ces frais sont déductibles jusqu'à un certain plafond variant selon les cantons.</p>

      <h3>Déduction pour enfants</h3>
      <p>Chaque enfant à charge ouvre droit à une déduction forfaitaire. Vérifiez les montants spécifiques à votre canton.</p>

      <h3>Splitting et quotient familial</h3>
      <p>Certains cantons appliquent un système de quotient familial qui réduit la progressivité de l'impôt pour les familles.</p>

      <h3>Formation des enfants majeurs</h3>
      <p>Les frais de formation professionnelle ou universitaire peuvent continuer à être déduits pour les enfants en formation.</p>

      <h3>Pilier 3a : une stratégie familiale</h3>
      <p>Chaque conjoint peut cotiser à son propre pilier 3a, doublant ainsi le potentiel d'économie fiscale du ménage.</p>
    `,
    category: "conseils",
    date: "2024-12-28",
    readTime: 7,
  },
];

export const blogCategories = {
  fiscalite: { name: "Fiscalité", color: "bg-primary" },
  comptabilite: { name: "Comptabilité", color: "bg-teal-600" },
  actualites: { name: "Actualités", color: "bg-amber-600" },
  conseils: { name: "Conseils", color: "bg-purple-600" },
};
