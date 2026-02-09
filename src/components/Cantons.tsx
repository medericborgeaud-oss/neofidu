"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2 } from "lucide-react";
// Drapeaux retirés pour simplifier l'affichage

const cantons = [
  {
    name: "Vaud",
    code: "VD",
    services: ["Déclarations", "Comptabilité", "Gérance immobilière"],
    hasProperty: true,
  },
  {
    name: "Valais",
    code: "VS",
    services: ["Déclarations", "Comptabilité", "Gérance immobilière"],
    hasProperty: true,
  },
  {
    name: "Genève",
    code: "GE",
    services: ["Déclarations", "Comptabilité", "Conseil fiscal"],
    hasProperty: false,
  },
  {
    name: "Neuchâtel",
    code: "NE",
    services: ["Déclarations", "Comptabilité", "Conseil fiscal"],
    hasProperty: false,
  },
  {
    name: "Jura",
    code: "JU",
    services: ["Déclarations", "Comptabilité", "Conseil fiscal"],
    hasProperty: false,
  },
  {
    name: "Fribourg",
    code: "FR",
    services: ["Déclarations", "Comptabilité", "Conseil fiscal"],
    hasProperty: false,
  },
];

export function Cantons() {
  return (
    <section id="cantons" className="py-20 md:py-32 bg-gradient-to-b from-secondary/50 to-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Zone d'intervention
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Actifs sur l'ensemble de la{" "}
            <span className="text-gradient">Romandie</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Notre équipe maîtrise les subtilités réglementaires de chaque territoire cantonal.
            Profitez d'un suivi adapté à votre lieu de résidence ou d'implantation.
          </p>
        </div>

        {/* Cantons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cantons.map((canton) => (
            <div
              key={canton.code}
              className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                {/* Canton header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{canton.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>Canton de {canton.name}</span>
                    </div>
                  </div>
                </div>

                {/* Services list */}
                <div className="space-y-2 mt-4">
                  {canton.services.map((service) => (
                    <div key={service} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>

                {/* Status badge */}
                <Badge
                  variant="secondary"
                  className="mt-4 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Service disponible
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Domicilié hors de ces régions ?{" "}
            <a href="#contact" className="text-primary font-semibold hover:underline">
              Écrivez-nous
            </a>{" "}
            afin de vérifier si nous pouvons vous accompagner.
          </p>
        </div>
      </div>
    </section>
  );
}
