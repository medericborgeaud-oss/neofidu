"use client";

import { Card } from "@/components/ui/card";
import { Award, Clock, Shield, Heart, User } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function About() {
  const { isEnglish } = useLanguage();

  const values = isEnglish
    ? [
        {
          icon: Shield,
          title: "Confidentiality",
          description: "Every piece of information transmitted benefits from secure processing and absolute discretion.",
        },
        {
          icon: Clock,
          title: "Punctuality",
          description: "Strict adherence to agreed deadlines for each of your cases.",
        },
        {
          icon: Award,
          title: "Expertise",
          description: "Deep mastery of tax specificities for each Swiss Romand canton.",
        },
        {
          icon: Heart,
          title: "Attentiveness",
          description: "Trusting relationship and personalized follow-up despite a fully digital service.",
        },
      ]
    : [
        {
          icon: Shield,
          title: "Confidentialité",
          description: "Chaque information transmise bénéficie d'un traitement sécurisé et d'une discrétion absolue.",
        },
        {
          icon: Clock,
          title: "Ponctualité",
          description: "Respect scrupuleux des échéances convenues pour chacun de vos dossiers.",
        },
        {
          icon: Award,
          title: "Savoir-faire",
          description: "Maîtrise approfondie des particularités fiscales propres à chaque canton romand.",
        },
        {
          icon: Heart,
          title: "Écoute",
          description: "Relation de confiance et suivi individualisé malgré une prestation entièrement dématérialisée.",
        },
      ];

  const sectionTitle = isEnglish ? "ABOUT US" : "Qui sommes-nous";
  const mainTitle1 = isEnglish ? "The fiduciary" : "La fiduciaire";
  const mainTitle2 = isEnglish ? "reinvented" : "réinventée";

  const founderStory = isEnglish
    ? `NeoFidu was founded with a clear vision: to make people's lives easier by offering quality fiduciary services without having to spend a fortune. Tired of seeing families and entrepreneurs struggle with complex tax returns or pay exorbitant fees for basic services, we decided to create an accessible and transparent alternative.`
    : `NeoFidu a été fondée avec une vision claire : faciliter la vie des gens en offrant des services fiduciaires de qualité sans qu'ils aient à dépenser une fortune. Lassé de voir des familles et des entrepreneurs se débattre avec des déclarations d'impôts complexes ou payer des honoraires exorbitants pour des prestations basiques, nous avons décidé de créer une alternative accessible et transparente.`;

  const description1 = isEnglish
    ? "Based in the Chablais Vaudois, NeoFidu was created with the ambition to democratize access to fiduciary services through digital technology and a clear pricing policy."
    : "Basée dans le Chablais vaudois, NeoFidu a été créée avec l'ambition de démocratiser l'accès aux prestations fiduciaires grâce au numérique et à une politique tarifaire claire.";

  const description3 = isEnglish
    ? "Our goal: to free you from administrative hassles while maximizing your tax savings and ensuring impeccable accounting."
    : "Notre objectif : vous libérer des tracas administratifs tout en maximisant vos économies d'impôt et en assurant une comptabilité irréprochable.";

  const stats = isEnglish
    ? [
        { value: "10+", label: "Years of experience" },
        { value: "2000+", label: "Completed mandates" },
        { value: "98%", label: "Client retention rate" },
      ]
    : [
        { value: "10+", label: "Ans d'activité" },
        { value: "2000+", label: "Mandats réalisés" },
        { value: "98%", label: "Taux de fidélisation" },
      ];

  const strong2 = isEnglish ? "over a decade of practice" : "plus d'une décennie de pratique";

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white to-secondary/30 content-auto">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {sectionTitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              {mainTitle1}{" "}
              <span className="text-gradient">{mainTitle2}</span>
            </h2>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                {description1}
              </p>

              <p>
                {isEnglish ? "With " : "Avec "}
                <strong className="text-foreground">{strong2}</strong>
                {isEnglish
                  ? " in the Swiss tax field, we guide both households and entrepreneurs established in the cantons of Vaud, Valais, Geneva, Neuchâtel, Jura and Fribourg."
                  : " dans le domaine fiscal romand, nous guidons aussi bien les ménages que les entrepreneurs implantés dans les cantons de Vaud, Valais, Genève, Neuchâtel, Jura et Fribourg."}
              </p>

              <p>
                {description3}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 ${
                  index === 0 ? "sm:translate-y-4" : ""
                } ${
                  index === 3 ? "sm:-translate-y-4" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-bold mb-2">{value.title}</p>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Founder story - at bottom */}
        <div className="mt-16 bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {founderStory}
              </p>
              <p className="mt-3 text-sm font-medium text-foreground">
                — {isEnglish ? "The NeoFidu Team" : "L'équipe NeoFidu"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
