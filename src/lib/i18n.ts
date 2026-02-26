// Internationalization system for NeoFidu
// Supports French (default) and English

export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

// Translation keys organized by section
export const translations = {
  fr: {
    // Header
    header: {
      services: "Services",
      pricing: "Tarifs",
      blog: "Blog",
      tracking: "Suivi des demandes",
      contact: "Contact",
      cta: "Déposer une demande",
    },
    // Hero section
    hero: {
      tagline: "Fiduciaire digitale",
      title1: "Votre déclaration d'impôts",
      title2: "simplifiée",
      description: "Confiez vos impôts et votre comptabilité à des experts. Service 100% en ligne pour 6 cantons romands.",
      cta1: "Déposer une demande",
      cta2: "Découvrir nos services",
      badge1: "100% en ligne",
      badge2: "6 cantons",
      badge3: "Dès CHF 50.-",
    },
    // Services section
    services: {
      tagline: "NOTRE OFFRE",
      title1: "Un accompagnement global",
      title2: "pour votre gestion",
      description: "Particulier, travailleur autonome ou dirigeant d'entreprise : bénéficiez de solutions personnalisées pour vos enjeux fiscaux, comptables et immobiliers.",
      tax: {
        title: "Fiscalité des personnes",
        subtitle: "Destiné aux contribuables privés et indépendants",
        service1: "Déclaration d'impôts",
        service1Desc: "Préparation complète de votre formulaire d'imposition en exploitant chaque avantage fiscal applicable à votre profil.",
        service2: "Ajustement des acomptes",
        service2Desc: "Adaptation de vos versements provisionnels selon l'évolution de vos revenus pour une meilleure gestion de trésorerie.",
        service3: "Vérification des bordereaux",
        service3Desc: "Analyse minutieuse des décisions fiscales reçues et contestation en cas d'anomalie détectée.",
        service4: "Opposition et réclamation",
        service4Desc: "Rédaction et dépôt de recours auprès des autorités compétentes lorsqu'une taxation paraît erronée.",
      },
      accounting: {
        title: "Expertise comptable",
        subtitle: "Pour les entrepreneurs et sociétés",
        service1: "Suivi comptable freelance",
        service1Desc: "Accompagnement sur mesure pour les professionnels exerçant en nom propre ou en profession libérale.",
        service2: "Gestion PME",
        service2Desc: "Prestations comptables calibrées pour les structures de petite et moyenne taille établies en Suisse.",
        service3: "États financiers annuels",
        service3Desc: "Production de votre bilan et compte de profits et pertes selon les exigences légales helvétiques.",
        service4: "Administration TVA",
        service4Desc: "Prise en charge intégrale de vos décomptes de taxe sur la valeur ajoutée et formalités associées.",
      },
      property: {
        title: "Gérance immobilière",
        subtitle: "Pour les propriétaires et investisseurs",
        badge: "Vaud & Valais",
        service1: "Gestion locative",
        service1Desc: "Recherche de locataires, rédaction des baux, états des lieux et suivi des encaissements.",
        service2: "Suivi technique",
        service2Desc: "Coordination des travaux d'entretien, gestion des sinistres et relation avec les artisans.",
        service3: "Comptabilité immobilière",
        service3Desc: "Décomptes de charges, bouclement annuel et reporting financier pour propriétaires.",
        service4: "Conseil patrimonial",
        service4Desc: "Optimisation du rendement locatif et accompagnement dans vos projets immobiliers.",
      },
    },
    // Pricing section
    pricing: {
      tagline: "GRILLE TARIFAIRE",
      title1: "Honoraires lisibles,",
      title2: "zéro mauvaise surprise",
      description: "Chaque prestation est chiffrée en amont. Aucun supplément inattendu : tous les prix affichés sont TTC (TVA 8.1% incluse).",
      taxTitle: "Prestations fiscales",
      accountingTitle: "Comptabilité",
      propertyTitle: "Gérance immobilière",
      propertyBadge: "Vaud & Valais uniquement",
      priceNote: "Tous les prix sont TTC (TVA 8.1% incluse). Le tarif exact s'affiche lors de votre simulation en ligne.",
      popular: "Populaire",
      choosePlan: "Choisir ce forfait",
      submitRequest: "Déposer une demande",
      plans: {
        basic: {
          name: "Basique",
          description: "Dossiers sans complexité",
          features: ["Personne seule ou en ménage", "Attestation(s) de revenus", "Relevé(s) de compte", "Abattements usuels", "Traitement sous 10 jours"],
        },
        comfort: {
          name: "Confort",
          description: "Formule plébiscitée",
          features: ["Inclut la formule Basique", "Charge(s) de famille", "Un logement en propriété", "Dépenses professionnelles", "Traitement sous 7 jours", "Assistance dédiée"],
        },
        integral: {
          name: "Intégral",
          description: "Patrimoine diversifié",
          features: ["Inclut la formule Confort", "Patrimoine immobilier étendu", "Titres et placements", "Sources de revenus multiples", "Traitement sous 5 jours", "Entretien téléphonique"],
        },
        solo: {
          name: "Solo",
          description: "Parfait pour se lancer",
          features: ["Jusqu'à 50 opérations/mois", "Clôture annuelle", "Décomptes TVA", "Assistance par courriel"],
        },
        enterprise: {
          name: "Entreprise",
          description: "Pour structures établies",
          features: ["Volume d'écritures illimité", "Situations trimestrielles", "Gestion TVA intégrale", "Interlocuteur attitré", "Tableaux de bord sur mesure"],
        },
        propertyManagement: {
          name: "Gérance immobilière",
          description: "Gestion complète de vos biens",
          features: ["Recherche et sélection de locataires", "États des lieux d'entrée et sortie", "Gestion des travaux et sinistres", "Déclaration fiscale immobilière", "Rédaction des baux et avenants", "Encaissement et suivi des loyers", "Décompte de charges annuel", "Reporting mensuel détaillé"],
        },
      },
    },
    // About section
    about: {
      tagline: "QUI SOMMES-NOUS",
      title1: "La fiduciaire",
      title2: "réinventée",
      description1: "NeoFidu a été fondée avec l'ambition de démocratiser l'accès aux prestations fiduciaires grâce au numérique et à une politique tarifaire claire.",
      description2: "Avec plus d'une décennie de pratique dans le domaine fiscal romand, nos collaborateurs guident aussi bien les ménages que les entrepreneurs implantés dans les cantons de Vaud, Valais, Genève, Neuchâtel, Jura et Fribourg.",
      description3: "Notre objectif : vous libérer des tracas administratifs tout en maximisant vos économies d'impôt et en assurant une comptabilité irréprochable.",
      stats: {
        years: "Ans d'activité",
        clients: "Mandats réalisés",
        satisfaction: "Taux de fidélisation",
      },
      values: {
        confidentiality: {
          title: "Confidentialité",
          description: "Chaque information transmise bénéficie d'un traitement sécurisé et d'une discrétion absolue.",
        },
        punctuality: {
          title: "Ponctualité",
          description: "Respect scrupuleux des échéances convenues pour chacun de vos dossiers.",
        },
        expertise: {
          title: "Savoir-faire",
          description: "Maîtrise approfondie des particularités fiscales propres à chaque canton romand.",
        },
        listening: {
          title: "Écoute",
          description: "Relation de confiance et suivi individualisé malgré une prestation entièrement dématérialisée.",
        },
      },
    },
    // Contact section
    contact: {
      tagline: "PARLONS DE VOTRE PROJET",
      title1: "Sollicitez un",
      title2: "devis sans frais",
      description: "Complétez ce formulaire et recevez une proposition chiffrée sous 24 heures. Aucune obligation de votre part.",
      email: "Email",
      address: "Adresse",
      hours: "Horaires",
      hoursValue: "Du lundi au vendredi, 9h - 18h",
      hoursNote: "Retour garanti sous un jour ouvré",
      form: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        phone: "Téléphone",
        canton: "Canton",
        selectCanton: "Sélectionnez votre canton",
        service: "Type de service",
        selectService: "Sélectionnez un service",
        message: "Message",
        messagePlaceholder: "Décrivez votre situation ou posez-nous vos questions...",
        submit: "Envoyer ma demande",
        privacy: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité.",
        serviceOptions: {
          tax: "Déclaration d'impôts",
          accounting: "Comptabilité",
          property: "Gérance immobilière",
          other: "Autre demande",
        },
      },
    },
    // Footer
    footer: {
      description: "Fiduciaire entièrement dématérialisée au service de la Romandie. Accompagnement fiscal et comptable pour les ménages, les indépendants et les structures professionnelles.",
      services: "Services",
      cantons: "Cantons",
      company: "Entreprise",
      aboutUs: "À propos",
      faq: "FAQ",
      terms: "Conditions générales",
      privacy: "Confidentialité",
      copyright: "Tous droits réservés.",
      taxDeclaration: "Déclaration d'impôt",
      accountingService: "Comptabilité",
      propertyManagement: "Gérance immobilière",
      taxControl: "Contrôle fiscal",
    },
    // Language notice
    language: {
      notice: "We also speak English! Contact us in your preferred language.",
      switchTo: "Switch to English",
    },
    // Common
    common: {
      from: "Dès",
      perYear: "/an",
      chf: "CHF",
      learnMore: "En savoir plus",
      getQuote: "Obtenir un devis",
      startNow: "Commencer maintenant",
    },
  },
  en: {
    // Header
    header: {
      services: "Services",
      pricing: "Pricing",
      blog: "Blog",
      tracking: "Track requests",
      contact: "Contact",
      cta: "Submit a request",
    },
    // Hero section
    hero: {
      tagline: "Digital Fiduciary",
      title1: "Your tax declaration",
      title2: "simplified",
      description: "Trust your taxes and accounting to experts. 100% online service for 6 Swiss cantons. We speak English!",
      cta1: "Submit a request",
      cta2: "Discover our services",
      badge1: "100% online",
      badge2: "6 cantons",
      badge3: "From CHF 50.-",
    },
    // Services section
    services: {
      tagline: "OUR OFFER",
      title1: "Comprehensive support",
      title2: "for your management",
      description: "Individual, freelancer or business owner: benefit from personalized solutions for your tax, accounting and real estate challenges.",
      tax: {
        title: "Personal Taxation",
        subtitle: "For private taxpayers and self-employed",
        service1: "Tax Declaration",
        service1Desc: "Complete preparation of your tax form, leveraging every tax advantage applicable to your profile.",
        service2: "Installment Adjustment",
        service2Desc: "Adaptation of your provisional payments according to your income evolution for better cash flow management.",
        service3: "Tax Assessment Review",
        service3Desc: "Thorough analysis of tax decisions received and dispute in case of detected anomalies.",
        service4: "Appeals & Claims",
        service4Desc: "Drafting and filing of appeals with the competent authorities when a taxation appears incorrect.",
      },
      accounting: {
        title: "Accounting Expertise",
        subtitle: "For entrepreneurs and companies",
        service1: "Freelance Accounting",
        service1Desc: "Tailored support for professionals practicing as sole proprietors or in liberal professions.",
        service2: "SME Management",
        service2Desc: "Accounting services calibrated for small and medium-sized structures established in Switzerland.",
        service3: "Annual Financial Statements",
        service3Desc: "Production of your balance sheet and profit and loss statement according to Swiss legal requirements.",
        service4: "VAT Administration",
        service4Desc: "Full handling of your VAT statements and associated formalities.",
      },
      property: {
        title: "Property Management",
        subtitle: "For owners and investors",
        badge: "Vaud & Valais",
        service1: "Rental Management",
        service1Desc: "Tenant search, lease drafting, inventory and payment tracking.",
        service2: "Technical Monitoring",
        service2Desc: "Coordination of maintenance work, claims management and liaison with contractors.",
        service3: "Property Accounting",
        service3Desc: "Expense statements, annual closing and financial reporting for owners.",
        service4: "Wealth Advisory",
        service4Desc: "Rental yield optimization and support for your real estate projects.",
      },
    },
    // Pricing section
    pricing: {
      tagline: "PRICING",
      title1: "Transparent fees,",
      title2: "no surprises",
      description: "Each service is quoted upfront. No unexpected charges: all prices shown include VAT (8.1%).",
      taxTitle: "Tax Services",
      accountingTitle: "Accounting",
      propertyTitle: "Property Management",
      propertyBadge: "Vaud & Valais only",
      priceNote: "All prices include VAT (8.1%). The exact price is displayed during your online simulation.",
      popular: "Popular",
      choosePlan: "Choose this plan",
      submitRequest: "Submit a request",
      plans: {
        basic: {
          name: "Basic",
          description: "Simple cases",
          features: ["Single person or household", "Income certificate(s)", "Bank statement(s)", "Standard deductions", "Processing within 10 days"],
        },
        comfort: {
          name: "Comfort",
          description: "Most popular",
          features: ["Includes Basic plan", "Dependents", "One owned property", "Professional expenses", "Processing within 7 days", "Dedicated support"],
        },
        integral: {
          name: "Integral",
          description: "Diversified assets",
          features: ["Includes Comfort plan", "Extended real estate", "Securities and investments", "Multiple income sources", "Processing within 5 days", "Phone consultation"],
        },
        solo: {
          name: "Solo",
          description: "Perfect to get started",
          features: ["Up to 50 operations/month", "Annual closing", "VAT statements", "Email support"],
        },
        enterprise: {
          name: "Enterprise",
          description: "For established structures",
          features: ["Unlimited entries", "Quarterly statements", "Full VAT management", "Dedicated contact", "Custom dashboards"],
        },
        propertyManagement: {
          name: "Property Management",
          description: "Complete management of your properties",
          features: ["Tenant search and selection", "Entry and exit inventories", "Works and claims management", "Real estate tax declaration", "Lease and addendum drafting", "Rent collection and tracking", "Annual expense statement", "Detailed monthly reporting"],
        },
      },
    },
    // About section
    about: {
      tagline: "ABOUT US",
      title1: "The fiduciary",
      title2: "reinvented",
      description1: "NeoFidu was founded with the ambition to democratize access to fiduciary services through digital technology and a clear pricing policy.",
      description2: "With over a decade of practice in the Swiss tax field, our team guides both households and entrepreneurs established in the cantons of Vaud, Valais, Geneva, Neuchâtel, Jura and Fribourg.",
      description3: "Our goal: to free you from administrative hassles while maximizing your tax savings and ensuring impeccable accounting.",
      stats: {
        years: "Years of experience",
        clients: "Completed mandates",
        satisfaction: "Client retention rate",
      },
      values: {
        confidentiality: {
          title: "Confidentiality",
          description: "Every piece of information transmitted benefits from secure processing and absolute discretion.",
        },
        punctuality: {
          title: "Punctuality",
          description: "Strict adherence to agreed deadlines for each of your cases.",
        },
        expertise: {
          title: "Expertise",
          description: "Deep mastery of tax specificities for each Swiss Romand canton.",
        },
        listening: {
          title: "Attentiveness",
          description: "Trusting relationship and personalized follow-up despite a fully digital service.",
        },
      },
    },
    // Contact section
    contact: {
      tagline: "LET'S DISCUSS YOUR PROJECT",
      title1: "Request a",
      title2: "free quote",
      description: "Complete this form and receive a detailed proposal within 24 hours. No obligation on your part.",
      email: "Email",
      address: "Address",
      hours: "Hours",
      hoursValue: "Monday to Friday, 9am - 6pm",
      hoursNote: "Response guaranteed within one business day",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        canton: "Canton",
        selectCanton: "Select your canton",
        service: "Service type",
        selectService: "Select a service",
        message: "Message",
        messagePlaceholder: "Describe your situation or ask us your questions...",
        submit: "Send my request",
        privacy: "By submitting this form, you accept our privacy policy.",
        serviceOptions: {
          tax: "Tax declaration",
          accounting: "Accounting",
          property: "Property management",
          other: "Other request",
        },
      },
    },
    // Footer
    footer: {
      description: "Fully digital fiduciary serving French-speaking Switzerland. Tax and accounting support for households, freelancers and professional structures.",
      services: "Services",
      cantons: "Cantons",
      company: "Company",
      aboutUs: "About us",
      faq: "FAQ",
      terms: "Terms of service",
      privacy: "Privacy",
      copyright: "All rights reserved.",
      taxDeclaration: "Tax declaration",
      accountingService: "Accounting",
      propertyManagement: "Property management",
      taxControl: "Tax audit",
    },
    // Language notice
    language: {
      notice: "Nous parlons aussi français ! Contactez-nous dans votre langue préférée.",
      switchTo: "Passer au français",
    },
    // Common
    common: {
      from: "From",
      perYear: "/year",
      chf: "CHF",
      learnMore: "Learn more",
      getQuote: "Get a quote",
      startNow: "Start now",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.fr;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

// Helper to get nested translation
export function t(locale: Locale, path: string): string {
  const keys = path.split(".");
  let result: unknown = translations[locale];

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return the path if translation not found
    }
  }

  return typeof result === "string" ? result : path;
}
