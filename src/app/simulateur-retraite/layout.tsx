import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur Retraite Suisse | AVS, LPP, 3ème Pilier",
  description:
    "Estimez votre revenu mensuel à la retraite en Suisse : AVS (1er pilier), LPP (2ème pilier) et 3ème pilier. Simulateur gratuit, résultat instantané.",
  keywords: [
    "calculateur retraite suisse",
    "simulateur retraite suisse",
    "rente avs calculateur",
    "calcul rente avs suisse",
    "revenu retraite suisse",
    "combien toucher retraite suisse",
    "taux de remplacement retraite",
    "2ème pilier simulateur",
    "lpp rente retraite",
    "calcul retraite vaud",
    "calcul retraite genève",
    "calcul retraite valais",
    "prévoyance retraite suisse romande",
    "retraite anticipée suisse",
    "simulateur 3 piliers retraite",
  ],
  openGraph: {
    title: "Calculateur Retraite Suisse | NeoFidu",
    description:
      "Combien toucherez-vous à la retraite ? Simulez votre AVS, 2ème et 3ème pilier en 30 secondes.",
    url: "https://www.neofidu.ch/simulateur-retraite",
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur Retraite Suisse | NeoFidu",
    description: "Simulateur gratuit AVS + LPP + 3ème pilier. Résultat instantané.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur-retraite",
  },
};

const simulateurSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calculateur de revenus à la retraite - NeoFidu",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description:
    "Estimez votre revenu mensuel à la retraite en Suisse : AVS, 2ème pilier (LPP) et 3ème pilier.",
  url: "https://www.neofidu.ch/simulateur-retraite",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CHF",
  },
  provider: {
    "@type": "Organization",
    name: "NeoFidu",
    url: "https://www.neofidu.ch",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien vais-je toucher à la retraite en Suisse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Suisse, votre revenu à la retraite combine l’AVS (entre CHF 1’260 et CHF 2’520/mois), la rente LPP du 2ème pilier (capital × taux de conversion de 6,8%) et votre 3ème pilier. Notre simulateur calcule votre total en quelques secondes.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le taux de remplacement moyen à la retraite en Suisse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le taux de remplacement moyen en Suisse est d’environ 60–70% du dernier salaire pour AVS + 2ème pilier. Le 3ème pilier permet d’atteindre 80–90%. Ce taux varie selon votre revenu, vos années de cotisation et votre avoir LPP.",
      },
    },
    {
      "@type": "Question",
      name: "Comment est calculée la rente AVS en Suisse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La rente AVS dépend de votre revenu annuel moyen (RAM) et de vos années de cotisation. Une cotisation complète (44 ans) donne droit à une rente entre CHF 1’260 (revenu minimal) et CHF 2’520/mois (revenu élevé) en 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on prendre une retraite anticipée en Suisse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Il est possible de prendre sa retraite dès 58–60 ans en liquidant son 2ème pilier et 3ème pilier. La rente AVS peut être anticipée d’un ou deux ans (avec réduction de 6,8% par année). NeoFidu peut vous aider à planifier cette transition.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(simulateurSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
