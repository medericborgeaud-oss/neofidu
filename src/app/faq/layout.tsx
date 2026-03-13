import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Swiss Tax Questions",
  description: "Answers about Swiss tax returns and accounting. Deadlines, rates, required documents. We speak English! | FAQ déclaration d'impôts suisse.",
  keywords: [
    "swiss tax FAQ",
    "switzerland tax questions",
    "swiss tax return help",
    "expat tax questions switzerland",
    "FAQ fiscalité suisse",
    "questions impôts",
    "aide déclaration fiscale",
  ],
  openGraph: {
    title: "FAQ - Swiss Tax Questions",
    description: "Answers about Swiss taxes and accounting. We speak English!",
    url: "https://www.neofidu.ch/faq",
  },
  alternates: {
    canonical: "https://www.neofidu.ch/faq",
  },
};

// FAQPage Schema.org structured data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What supporting documents are required for Swiss tax return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You will need your income statements (Lohnausweis), bank statements as of December 31, health insurance premium confirmations, and any documents related to deductible expenses (childcare, pillar 3a, professional expenses).",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to process a tax return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard processing time is approximately two business weeks. An express option allows delivery within 72 hours for an additional fee.",
      },
    },
    {
      "@type": "Question",
      name: "What tax deductions can I claim in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several items are deductible: commuting expenses, meals away from home, professional training, health insurance, loan interest, maintenance contributions, pillar 3a contributions (up to CHF 7,258), and property renovation work.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a tax return cost at NeoFidu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The amount depends on the complexity of the file. Basic returns start from CHF 50, Comfort from CHF 100, and Integral from CHF 150. The rate is displayed instantly during your online simulation.",
      },
    },
    {
      "@type": "Question",
      name: "Which Swiss cantons do you cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support taxpayers and businesses in six French-speaking cantons: Vaud, Valais, Geneva, Neuchâtel, Jura, and Fribourg. Our service is 100% online.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a deadline extension for my Swiss tax return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. An extension until the end of September can be requested before the end of June. A grace period until June 30 is generally granted without special formalities.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
