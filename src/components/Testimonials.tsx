"use client";

import { Card } from "@/components/ui/card";
import { Shield, Clock, FileCheck, HeadphonesIcon, Lock, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Testimonials() {
  const { isEnglish } = useLanguage();

  const engagements = isEnglish
    ? [
        {
          icon: Clock,
          title: "Guaranteed deadlines",
          description:
            "Your tax return processed within the announced deadline, or we contact you before to agree on a new date.",
        },
        {
          icon: Shield,
          title: "Data security",
          description:
            "Your documents are encrypted and stored on secure servers. We comply with Swiss LPD and European GDPR.",
        },
        {
          icon: FileCheck,
          title: "Complete verification",
          description:
            "Each declaration is reviewed by our team to optimize your deductions and avoid errors.",
        },
        {
          icon: HeadphonesIcon,
          title: "Responsive support",
          description:
            "A question? Our team responds by email. No voicemail, no endless waiting.",
        },
        {
          icon: Lock,
          title: "Professional secrecy",
          description:
            "Your information remains strictly confidential. We never share your data with third parties without your consent.",
        },
        {
          icon: BadgeCheck,
          title: "Transparent pricing",
          description:
            "The price displayed is the price paid. No hidden fees, no unexpected surprises after processing.",
        },
      ]
    : [
        {
          icon: Clock,
          title: "Délais garantis",
          description:
            "Votre déclaration traitée dans le délai annoncé, ou nous vous contactons avant pour convenir d'une nouvelle échéance.",
        },
        {
          icon: Shield,
          title: "Sécurité des données",
          description:
            "Vos documents sont chiffrés et stockés sur des serveurs sécurisés. Nous respectons la LPD suisse et le RGPD européen.",
        },
        {
          icon: FileCheck,
          title: "Vérification complète",
          description:
            "Chaque déclaration est revue par notre équipe pour optimiser vos déductions et éviter les erreurs.",
        },
        {
          icon: HeadphonesIcon,
          title: "Support réactif",
          description:
            "Une question ? Notre équipe répond rapidement par email. Pas de répondeur, pas d'attente interminable.",
        },
        {
          icon: Lock,
          title: "Secret professionnel",
          description:
            "Vos informations restent strictement confidentielles. Nous ne partageons jamais vos données avec des tiers sans votre accord.",
        },
        {
          icon: BadgeCheck,
          title: "Tarifs transparents",
          description:
            "Le prix affiché est le prix payé. Aucuns frais cachés, aucune mauvaise surprise après traitement.",
        },
      ];

  const sectionTag = isEnglish ? "Our commitments" : "Nos engagements";
  const title1 = isEnglish ? "Why choose " : "Pourquoi choisir ";
  const title2 = isEnglish ? "NeoFidu" : "NeoFidu";
  const subtitle = isEnglish
    ? "We commit to quality service, secure data handling, and transparent pricing for all our clients."
    : "Nous nous engageons à offrir un service de qualité, une gestion sécurisée de vos données et des tarifs transparents.";

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {sectionTag}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            {title1}
            <span className="text-gradient">{title2}</span> ?
          </h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        {/* Engagements grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagements.map((engagement) => (
            <Card
              key={engagement.title}
              className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-white relative overflow-hidden group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <engagement.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg mb-2">{engagement.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm">
                {engagement.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg px-8 py-6">
            <div className="text-center sm:text-left">
              <div className="font-bold text-lg">
                {isEnglish
                  ? "Ready to delegate your tax return?"
                  : "Prêt à nous confier votre déclaration ?"}
              </div>
              <div className="text-sm text-muted-foreground">
                {isEnglish
                  ? "Start your request in just a few clicks"
                  : "Démarrez votre demande en quelques clics"}
              </div>
            </div>
            <a
              href="/demande"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {isEnglish ? "Get started" : "Commencer"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
