import type { Metadata } from "next";
import { BaiseLoyerCalculator } from "./BaiseLoyerCalculator";

export const metadata: Metadata = {
  title: "Calculateur Baisse de Loyer 2026",
  description: "Calculez gratuitement si vous pouvez demander une baisse de loyer en Suisse. Simulateur basé sur le taux de référence hypothécaire actuel (1.75%). Vaud, Genève, Valais, Fribourg.",
  keywords: [
    "baisse de loyer",
    "calculateur loyer suisse",
    "taux de référence hypothécaire",
    "taux hypothécaire de référence",
    "réduction loyer",
    "diminution loyer suisse",
    "demande baisse loyer",
    "loyer trop cher",
    "taux référence 2026",
    "baisse loyer vaud",
    "baisse loyer genève",
    "calculateur loyer",
    "simulateur loyer suisse",
    "droit du bail suisse",
    "locataire suisse",
  ],
  openGraph: {
    title: "Calculateur de baisse de loyer Suisse 2026 | Taux de référence",
    description: "Découvrez si vous avez droit à une baisse de loyer grâce à notre simulateur gratuit basé sur le taux de référence hypothécaire.",
    url: "https://neofidu.ch/simulateur/baisse-loyer",
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculateur de baisse de loyer Suisse 2026",
    description: "Simulateur gratuit pour calculer votre droit à une baisse de loyer en Suisse.",
  },
  alternates: {
    canonical: "https://neofidu.ch/simulateur/baisse-loyer",
  },
};

// JSON-LD Schema for the calculator
const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculateur de baisse de loyer Suisse",
  "description": "Simulateur gratuit pour calculer si vous pouvez demander une baisse de loyer en Suisse basé sur le taux de référence hypothécaire.",
  "url": "https://neofidu.ch/simulateur/baisse-loyer",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CHF"
  },
  "author": {
    "@type": "Organization",
    "name": "NeoFidu",
    "url": "https://neofidu.ch"
  }
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le taux de référence hypothécaire actuel en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le taux de référence hypothécaire est actuellement de 1.75% en Suisse (mars 2026). Ce taux est publié par l'Office fédéral du logement et sert de base pour les ajustements de loyer."
      }
    },
    {
      "@type": "Question",
      "name": "Comment demander une baisse de loyer en Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour demander une baisse de loyer, vous devez envoyer une lettre recommandée à votre bailleur en invoquant la baisse du taux de référence hypothécaire. La demande doit être faite pour le prochain terme de résiliation du bail (généralement 3 mois à l'avance)."
      }
    },
    {
      "@type": "Question",
      "name": "De combien peut baisser mon loyer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque baisse de 0.25% du taux de référence permet théoriquement une réduction de loyer d'environ 2.91%. Par exemple, si le taux passe de 2% à 1.75%, vous pouvez demander une baisse d'environ 2.91% sur votre loyer."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je demander une baisse de loyer rétroactive ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, la baisse de loyer n'est pas rétroactive. Elle prend effet au prochain terme de résiliation du bail après votre demande. C'est pourquoi il est important d'agir rapidement après une baisse du taux de référence."
      }
    }
  ]
};

export default function BaiseLoyerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Calculateur Baisse de Loyer 2026","applicationCategory":"FinanceApplication","operatingSystem":"Web Browser","offers":{"@type":"Offer","price":"0","priceCurrency":"CHF"},"url":"https://www.neofidu.ch/simulateur/baisse-loyer","description":"Calculez votre droit à une baisse de loyer en Suisse selon l'évolution du taux de référence hypothécaire.","provider":{"@type":"Organization","name":"NeoFidu","url":"https://www.neofidu.ch"}}` }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BaiseLoyerCalculator />
    </>
  );
}
