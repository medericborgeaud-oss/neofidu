"use client";

import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marc Dubois",
    role: "Entrepreneur indépendant",
    canton: "Vaud",
    image: "MD",
    rating: 5,
    text: "Service impeccable ! Ma déclaration d'impôt a été traitée en une semaine. L'équipe est réactive et les tarifs sont transparents. Je recommande vivement NeoFidu.",
  },
  {
    name: "Sophie Laurent",
    role: "Directrice de Sàrl",
    canton: "Genève",
    image: "SL",
    rating: 5,
    text: "Enfin une fiduciaire qui comprend les besoins des PME ! La comptabilité mensuelle est suivie avec rigueur et les conseils fiscaux nous ont permis d'optimiser notre charge d'impôt.",
  },
  {
    name: "Jean-Pierre Carron",
    role: "Retraité",
    canton: "Valais",
    image: "JC",
    rating: 5,
    text: "Très satisfait du service. Tout se fait en ligne, c'est pratique et moderne. Ma déclaration a été établie correctement et j'ai même obtenu un remboursement inattendu.",
  },
  {
    name: "Isabelle Favre",
    role: "Profession libérale",
    canton: "Neuchâtel",
    image: "IF",
    rating: 5,
    text: "Je suis cliente depuis 3 ans et le service est toujours au rendez-vous. L'approche digitale me convient parfaitement et les délais sont respectés.",
  },
  {
    name: "Thomas Reymond",
    role: "Propriétaire immobilier",
    canton: "Vaud",
    image: "TR",
    rating: 5,
    text: "NeoFidu gère mes déclarations fiscales et la comptabilité de mes immeubles. Professionnels, disponibles et compétents. Un partenaire de confiance.",
  },
  {
    name: "Claire Bonvin",
    role: "Salariée",
    canton: "Fribourg",
    image: "CB",
    rating: 5,
    text: "Prix très compétitif pour un service de qualité. J'apprécie la simplicité du processus en ligne et la réactivité en cas de question.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Ils nous font <span className="text-gradient">confiance</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez ce que nos clients pensent de nos services.
            Leur satisfaction est notre priorité.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-white relative overflow-hidden ${
                index === 0 ? "lg:col-span-1" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Text */}
              <p className="text-muted-foreground mt-4 mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.canton}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl shadow-lg px-8 py-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-xl">4.9/5</span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-left">
              <div className="font-bold">Plus de 2000 clients satisfaits</div>
              <div className="text-sm text-muted-foreground">en Suisse romande</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
