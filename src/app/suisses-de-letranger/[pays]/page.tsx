import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countryPages, getCountryPage } from "@/lib/country-data";
import CountryPageClient from "./CountryPageClient";

export function generateStaticParams() {
  return countryPages.map((c) => ({ pays: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pays: string }>;
}): Promise<Metadata> {
  const { pays } = await params;
  const page = getCountryPage(pays);

  if (!page) {
    return { title: "Page non trouvée | NeoFidu" };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    authors: [{ name: "NeoFidu" }],
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      url: `https://neofidu.ch/suisses-de-letranger/${page.slug}`,
      siteName: "NeoFidu",
      locale: "fr_CH",
    },
    alternates: {
      canonical: `https://neofidu.ch/suisses-de-letranger/${page.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ pays: string }>;
}) {
  const { pays } = await params;
  const page = getCountryPage(pays);

  if (!page) {
    notFound();
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://neofidu.ch" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Suisses de l'étranger",
        item: "https://neofidu.ch/suisses-de-letranger",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.country,
        item: `https://neofidu.ch/suisses-de-letranger/${page.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CountryPageClient page={page} />
    </>
  );
}
