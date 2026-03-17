import type { Metadata } from "next";
import { GainImmobilierSimulator } from "./GainImmobilierSimulator";

export const metadata: Metadata = {
  title: "Simulateur Gain Immobilier 2026",
  description:
    "Calculez gratuitement l'impôt sur le gain immobilier (IGI) lors de la vente de votre bien en Suisse. Taux par canton (Vaud, Genève, Valais, Fribourg) et durée de détention. Simulation instantanée.",
  keywords:
    "impôt gain immobilier, IGI suisse, calculateur gain immobilier, taxe vente immobilière, impôt plus-value immobilière, simulation IGI vaud, impôt gain immobilier genève, calcul plus-value immobilière suisse, durée détention immobilier",
  openGraph: {
    title: "Simulateur Impôt Gain Immobilier | Calcul IGI par Canton",
    description:
      "Calculez l'impôt sur le gain immobilier lors de la vente de votre bien. Taux par canton et durée de détention.",
    url: "https://www.neofidu.ch/simulateur/gain-immobilier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur Impôt Gain Immobilier Suisse",
    description: "Calculez gratuitement l'IGI sur la vente de votre bien immobilier.",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/simulateur/gain-immobilier",
  },
};

// Schema.org structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulateur Impôt Gain Immobilier Suisse",
  description:
    "Calculateur gratuit pour estimer l'impôt sur le gain immobilier (IGI) lors de la vente d'un bien en Suisse, par canton et durée de détention.",
  url: "https://www.neofidu.ch/simulateur/gain-immobilier",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
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

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que l'impôt sur le gain immobilier (IGI) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'impôt sur le gain immobilier (IGI) est un impôt cantonal prélevé lors de la vente d'un bien immobilier avec profit. Il est calculé sur la différence entre le prix de vente et le prix d'acquisition, moins les travaux de plus-value.",
      },
    },
    {
      "@type": "Question",
      name: "Comment la durée de détention influence-t-elle l'IGI ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plus vous détenez votre bien longtemps, moins vous payez d'impôt. La plupart des cantons appliquent des réductions progressives, pouvant aller jusqu'à une exonération totale après 25 ans de détention.",
      },
    },
    {
      "@type": "Question",
      name: "Quels frais peut-on déduire du gain immobilier ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez déduire : les travaux de plus-value (rénovations, agrandissements), les frais d'acquisition (notaire, droits de mutation), les frais de vente (commission courtier), et les intérêts hypothécaires dans certains cantons.",
      },
    },
    {
      "@type": "Question",
      name: "L'IGI est-il le même dans tous les cantons ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, l'IGI varie fortement selon les cantons. Le Valais et Fribourg ont généralement les taux les plus bas, tandis que Genève et Vaud appliquent des taux plus élevés. La durée de détention influence également le taux final.",
      },
    },
  ],
};

export default function GainImmobilierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <GainImmobilierSimulator />
    </>
  );
}
