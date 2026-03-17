import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions fréquentes — Impôts Suisse",
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

// FAQPage Schema.org structured data - Optimized for Google Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a tax return cost at NeoFidu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NeoFidu offers Swiss tax returns starting from CHF 50 (Basic for simple situations), CHF 100 (Comfort for property owners or families), and CHF 150 (Integral for complex portfolios). All prices include 8.1% VAT. The exact price is calculated instantly when you fill out our online form.",
      },
    },
    {
      "@type": "Question",
      name: "Do you speak English for expat tax returns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! NeoFidu provides full English-language support for expats and international residents in Switzerland. Our entire platform, customer service, and tax documents can be handled in English. We specialize in helping newcomers understand Swiss taxation.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need for my Swiss tax return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll need: 1) Salary certificate (Lohnausweis), 2) Bank statements as of December 31st, 3) Health insurance premium confirmation, 4) Pillar 3a certificate if applicable, 5) Rental agreement for housing deduction, 6) Any receipts for deductible expenses (childcare, donations, professional training).",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to complete my tax return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard processing takes 10 business days. Need it faster? Choose Priority (7 days, +CHF 20) or Express (48 hours, +CHF 120). Once completed, you'll receive your tax return by email, ready to submit to the tax authorities.",
      },
    },
    {
      "@type": "Question",
      name: "Which Swiss cantons does NeoFidu cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NeoFidu serves all 6 French-speaking cantons: Vaud (VD), Valais (VS), Geneva (GE), Neuchâtel (NE), Jura (JU), and Fribourg (FR). Our 100% online service means you can file from anywhere in Switzerland or abroad.",
      },
    },
    {
      "@type": "Question",
      name: "What tax deductions can I claim in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common Swiss tax deductions include: commuting costs, meals away from home, professional training, health insurance premiums, Pillar 3a contributions (up to CHF 7,258 for employees), mortgage interest, property maintenance, childcare costs, alimony payments, and charitable donations. NeoFidu ensures you claim all eligible deductions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a deadline extension for my Swiss tax return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In most cantons, you can request an extension until September 30th by applying before June 30th. A grace period until June 30th is usually granted automatically. NeoFidu can help you request an extension through our platform for CHF 30.",
      },
    },
    {
      "@type": "Question",
      name: "Is NeoFidu a licensed Swiss fiduciary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, NeoFidu is a registered Swiss fiduciary company based in Leysin, Canton of Vaud. We are fully compliant with Swiss regulations and specialize in tax returns, accounting, and property management for French-speaking Switzerland.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pay for NeoFidu services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept all major payment methods: Visa, Mastercard, PayPal, Klarna (pay later), and bank transfer. Payment is secure and processed through Stripe. You only pay after submitting your documents, and you'll receive your completed tax return once payment is confirmed.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm new to Switzerland and never filed taxes here?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NeoFidu specializes in helping newcomers! Whether you have a B permit, C permit, or just arrived, we guide you through the entire Swiss tax system in English. First-time filers often save money by claiming deductions they didn't know existed.",
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
