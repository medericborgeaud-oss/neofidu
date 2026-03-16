"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  MapPin,
  ArrowRight,
  Building2,
  Users,
  Mountain,
  Watch,
  Baby,
  Tractor,
  Globe
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function CantonsPage() {
  const { isEnglish } = useLanguage();

  const cantons = [
    {
      name: "Vaud",
      slug: "vaud",
      capital: "Lausanne",
      description: isEnglish
        ? "The largest French-speaking canton. Deadline March 15, among the shortest in Switzerland."
        : "Le plus grand canton romand. Délai au 15 mars, parmi les plus courts de Suisse.",
      highlight: isEnglish ? "Short deadline" : "Délai court",
      icon: Building2,
      color: "from-green-500 to-emerald-600",
    },
    {
      name: isEnglish ? "Geneva" : "Genève",
      slug: "geneve",
      capital: isEnglish ? "Geneva" : "Genève",
      description: isEnglish
        ? "International canton with expertise in cross-border workers and quasi-resident status."
        : "Canton international avec expertise frontaliers et statut quasi-résident.",
      highlight: isEnglish ? "Cross-border" : "Frontaliers",
      icon: Globe,
      color: "from-blue-500 to-cyan-600",
    },
    {
      name: "Valais",
      slug: "valais",
      capital: "Sion",
      description: isEnglish
        ? "Among the most advantageous taxation in Switzerland. Secondary residence expertise."
        : "Fiscalité parmi les plus avantageuses de Suisse. Expertise résidences secondaires.",
      highlight: isEnglish ? "Low taxation" : "Fiscalité basse",
      icon: Mountain,
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Fribourg",
      slug: "fribourg",
      capital: "Fribourg",
      description: isEnglish
        ? "Bilingual canton with some of the most generous family deductions."
        : "Canton bilingue avec des déductions familiales parmi les plus généreuses.",
      highlight: isEnglish ? "Families" : "Familles",
      icon: Baby,
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "Neuchâtel",
      slug: "neuchatel",
      capital: "Neuchâtel",
      description: isEnglish
        ? "Heart of the Swiss watchmaking industry. Expertise for executives and bonuses."
        : "Cœur de l'industrie horlogère suisse. Expertise pour cadres et bonus.",
      highlight: isEnglish ? "Watchmaking" : "Horlogerie",
      icon: Watch,
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Jura",
      slug: "jura",
      capital: "Delémont",
      description: isEnglish
        ? "The youngest Swiss canton. Agricultural expertise and administrative flexibility."
        : "Le plus jeune canton suisse. Expertise agricole et souplesse administrative.",
      highlight: isEnglish ? "Agriculture" : "Agriculture",
      icon: Tractor,
      color: "from-teal-500 to-green-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Cantons" },
            ]}
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {isEnglish ? (
              <>Your fiduciary in<br />
              <span className="text-emerald-300">6 French-speaking cantons</span></>
            ) : (
              <>Votre fiduciaire dans<br />
              <span className="text-emerald-300">6 cantons romands</span></>
            )}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mb-8">
            {isEnglish
              ? "NeoFidu supports you with your tax return and accounting throughout French-speaking Switzerland. Choose your canton."
              : "NeoFidu vous accompagne pour votre déclaration d'impôts et comptabilité dans toute la Suisse romande. Choisissez votre canton."}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/demande">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                {isEnglish ? "Submit my request" : "Déposer ma demande"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cantons Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isEnglish ? "Choose your canton" : "Choisissez votre canton"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEnglish
                ? "Each canton has its tax specificities. Discover our local expertise and the particularities of your region."
                : "Chaque canton a ses spécificités fiscales. Découvrez notre expertise locale et les particularités de votre région."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cantons.map((canton) => (
              <Link key={canton.slug} href={`/cantons/${canton.slug}`}>
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border-2 hover:border-primary/30">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${canton.color} flex items-center justify-center mb-4`}>
                    <canton.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {isEnglish ? `Canton of ${canton.name}` : `Canton de ${canton.name}`}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {isEnglish ? "Capital: " : "Capitale : "}{canton.capital}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {canton.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {canton.highlight}
                    </span>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services communs */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isEnglish ? "Services tailored to each canton" : "Des services adaptés à chaque canton"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEnglish
                ? "Regardless of your canton, you benefit from our tax expertise and 100% online service."
                : "Quel que soit votre canton, vous bénéficiez de notre expertise fiscale et d'un service 100% en ligne."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">{isEnglish ? "Individuals" : "Particuliers"}</h3>
              <p className="text-sm text-muted-foreground">
                {isEnglish
                  ? "Tax return adapted to your canton's specificities."
                  : "Déclaration d'impôts adaptée aux spécificités de votre canton."}
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">{isEnglish ? "Businesses" : "Entreprises"}</h3>
              <p className="text-sm text-muted-foreground">
                {isEnglish
                  ? "Accounting and taxation compliant with cantonal requirements."
                  : "Comptabilité et fiscalité conformes aux exigences cantonales."}
              </p>
            </Card>
            <Card className="p-6 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">{isEnglish ? "Local expertise" : "Expertise locale"}</h3>
              <p className="text-sm text-muted-foreground">
                {isEnglish
                  ? "In-depth knowledge of cantonal tax software."
                  : "Connaissance approfondie des logiciels fiscaux cantonaux."}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isEnglish ? "Ready to simplify your taxes?" : "Prêt à simplifier vos impôts ?"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Regardless of your canton, our team of experts supports you for an optimized declaration."
              : "Quel que soit votre canton, notre équipe d'experts vous accompagne pour une déclaration optimisée."}
          </p>
          <Link href="/demande">
            <Button size="lg" variant="secondary" className="text-primary font-semibold">
              {isEnglish ? "Submit my request" : "Déposer ma demande"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
