"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calculator, FileText, Building2, Users, PiggyBank, TrendingDown, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// Related simulators component
export function RelatedSimulators({ currentSimulator }: { currentSimulator: string }) {
  const { isEnglish } = useLanguage();

  const simulators = [
    {
      id: "impots",
      title: { fr: "Simulateur d'impôts", en: "Tax Calculator" },
      description: { fr: "Calculez vos impôts en 2 minutes", en: "Calculate your taxes in 2 minutes" },
      href: "/simulateur/impots",
      icon: Calculator,
      color: "text-primary"
    },
    {
      id: "3eme-pilier",
      title: { fr: "Simulateur 3ème pilier", en: "3rd Pillar Calculator" },
      description: { fr: "Optimisez votre épargne retraite", en: "Optimize your retirement savings" },
      href: "/simulateur/3eme-pilier",
      icon: PiggyBank,
      color: "text-emerald-600"
    },
    {
      id: "baisse-loyer",
      title: { fr: "Calculateur baisse de loyer", en: "Rent Reduction Calculator" },
      description: { fr: "Vérifiez si vous payez trop", en: "Check if you're overpaying" },
      href: "/simulateur/baisse-loyer",
      icon: TrendingDown,
      color: "text-rose-600"
    },
    {
      id: "salaire-net",
      title: { fr: "Simulateur salaire net", en: "Net Salary Calculator" },
      description: { fr: "Du brut au net en 1 clic", en: "From gross to net in 1 click" },
      href: "/simulateur/salaire-net",
      icon: Users,
      color: "text-blue-600"
    },
    {
      id: "valeur-locative",
      title: { fr: "Simulateur valeur locative", en: "Rental Value Calculator" },
      description: { fr: "Impact sur vos impôts", en: "Impact on your taxes" },
      href: "/simulateur/valeur-locative",
      icon: Building2,
      color: "text-amber-600"
    }
  ];

  const filtered = simulators.filter(s => s.id !== currentSimulator).slice(0, 3);

  return (
    <div className="bg-secondary/30 rounded-2xl p-6 mt-8">
      <h3 className="font-bold text-lg mb-4">
        {isEnglish ? "Other free tools" : "Autres outils gratuits"}
      </h3>
      <div className="grid gap-3">
        {filtered.map((sim) => (
          <Link key={sim.id} href={sim.href} className="group">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${sim.color}`}>
                <sim.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">
                  {isEnglish ? sim.title.en : sim.title.fr}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isEnglish ? sim.description.en : sim.description.fr}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>
      <Link href="/simulateur" className="inline-flex items-center gap-2 text-sm text-primary font-medium mt-4 hover:underline">
        {isEnglish ? "See all simulators" : "Voir tous les simulateurs"}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

// Related articles for service pages
export function RelatedArticles({ category }: { category: "fiscalite" | "comptabilite" | "immobilier" | "entreprise" }) {
  const { isEnglish } = useLanguage();

  const articlesByCategory = {
    fiscalite: [
      { title: "Guide déductions fiscales 2026", href: "/guide/deductions-fiscales" },
      { title: "Impôt à la source : guide complet", href: "/blog/impot-source-suisse-guide-complet-2026" },
      { title: "Votre première déclaration d'impôts", href: "/blog/premiere-declaration-impots-suisse-guide" },
    ],
    comptabilite: [
      { title: "Créer son entreprise en Suisse", href: "/blog/creer-entreprise-suisse-2026" },
      { title: "TVA en Suisse : ce qu'il faut savoir", href: "/blog/tva-suisse-guide" },
    ],
    immobilier: [
      { title: "Baisse de loyer 2026 : vos droits", href: "/blog/baisse-loyer-suisse-2026-taux-reference-hypothecaire" },
      { title: "Valeur locative : comment ça marche", href: "/simulateur/valeur-locative" },
    ],
    entreprise: [
      { title: "Créer son entreprise en Suisse 2026", href: "/blog/creer-entreprise-suisse-2026" },
      { title: "Comptabilité PME : nos services", href: "/tarifs" },
    ]
  };

  const articles = articlesByCategory[category] || [];

  return (
    <div className="border-t pt-6 mt-8">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        {isEnglish ? "Related articles" : "Articles connexes"}
      </h3>
      <ul className="space-y-2">
        {articles.map((article, index) => (
          <li key={index}>
            <Link href={article.href} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Canton links component for cross-linking
export function RelatedCantons({ currentCanton }: { currentCanton: string }) {
  const { isEnglish } = useLanguage();

  const cantons = [
    { id: "geneve", name: "Genève", href: "/cantons/geneve" },
    { id: "vaud", name: "Vaud", href: "/cantons/vaud" },
    { id: "fribourg", name: "Fribourg", href: "/cantons/fribourg" },
    { id: "valais", name: "Valais", href: "/cantons/valais" },
    { id: "neuchatel", name: "Neuchâtel", href: "/cantons/neuchatel" },
  ];

  const filtered = cantons.filter(c => c.id !== currentCanton);

  return (
    <div className="bg-secondary/30 rounded-xl p-5 mt-8">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        {isEnglish ? "Other cantons" : "Autres cantons"}
      </h3>
      <div className="flex flex-wrap gap-2">
        {filtered.map((canton) => (
          <Link
            key={canton.id}
            href={canton.href}
            className="px-3 py-1.5 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
          >
            {canton.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Quick links CTA component
export function QuickActionsCTA() {
  const { isEnglish } = useLanguage();

  return (
    <div className="grid sm:grid-cols-3 gap-4 my-8">
      <Link href="/demande" className="group">
        <Card className="p-4 text-center hover:shadow-lg transition-all hover:border-primary">
          <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="font-medium group-hover:text-primary">
            {isEnglish ? "Tax return" : "Déclaration d'impôts"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isEnglish ? "From CHF 50.-" : "Dès CHF 50.-"}
          </p>
        </Card>
      </Link>
      <Link href="/tarifs" className="group">
        <Card className="p-4 text-center hover:shadow-lg transition-all hover:border-primary">
          <Calculator className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
          <p className="font-medium group-hover:text-primary">
            {isEnglish ? "Our prices" : "Nos tarifs"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isEnglish ? "Transparent" : "Transparents"}
          </p>
        </Card>
      </Link>
      <Link href="/faq" className="group">
        <Card className="p-4 text-center hover:shadow-lg transition-all hover:border-primary">
          <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <p className="font-medium group-hover:text-primary">
            {isEnglish ? "FAQ" : "Questions fréquentes"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isEnglish ? "Get answers" : "Trouvez des réponses"}
          </p>
        </Card>
      </Link>
    </div>
  );
}
