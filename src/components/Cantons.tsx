"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Mountain, Building2, Globe, Baby, Watch, Tractor } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const cantons = [
  {
    name: "Vaud",
    nameFr: "Vaud",
    slug: "vaud",
    icon: Building2,
    highlight: "Délai 15 mars",
    highlightEn: "March 15 deadline",
    color: "bg-green-500",
  },
  {
    name: "Geneva",
    nameFr: "Genève",
    slug: "geneve",
    icon: Globe,
    highlight: "Frontaliers",
    highlightEn: "Cross-border",
    color: "bg-blue-500",
  },
  {
    name: "Valais",
    nameFr: "Valais",
    slug: "valais",
    icon: Mountain,
    highlight: "Fiscalité basse",
    highlightEn: "Low taxes",
    color: "bg-orange-500",
  },
  {
    name: "Fribourg",
    nameFr: "Fribourg",
    slug: "fribourg",
    icon: Baby,
    highlight: "Familles",
    highlightEn: "Families",
    color: "bg-purple-500",
  },
  {
    name: "Neuchâtel",
    nameFr: "Neuchâtel",
    slug: "neuchatel",
    icon: Watch,
    highlight: "Horlogerie",
    highlightEn: "Watchmaking",
    color: "bg-yellow-500",
  },
  {
    name: "Jura",
    nameFr: "Jura",
    slug: "jura",
    icon: Tractor,
    highlight: "Agriculture",
    highlightEn: "Agriculture",
    color: "bg-teal-500",
  },
];

export function Cantons() {
  const { isEnglish } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {isEnglish ? "Coverage" : "Couverture"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            {isEnglish ? (
              <>Your fiduciary in <span className="text-gradient">6 cantons</span></>
            ) : (
              <>Votre fiduciaire dans <span className="text-gradient">6 cantons</span></>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isEnglish
              ? "We know the tax specificities of each canton. Choose yours for personalized service."
              : "Nous connaissons les spécificités fiscales de chaque canton. Choisissez le vôtre pour un service personnalisé."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cantons.map((canton) => (
            <Link key={canton.slug} href={`/cantons/${canton.slug}`}>
              <Card className="p-4 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer border-2 hover:border-primary/30 text-center">
                <div className={`w-12 h-12 rounded-xl ${canton.color} flex items-center justify-center mx-auto mb-3`}>
                  <canton.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold group-hover:text-primary transition-colors">
                  {isEnglish ? canton.name : canton.nameFr}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isEnglish ? canton.highlightEn : canton.highlight}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/cantons">
            <Button variant="outline" size="lg">
              <MapPin className="mr-2 w-4 h-4" />
              {isEnglish ? "View all cantons" : "Voir tous les cantons"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
