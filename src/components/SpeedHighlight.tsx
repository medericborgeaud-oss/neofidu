"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Upload, FileCheck, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export function SpeedHighlight() {
  const { isEnglish } = useLanguage();

  const title = isEnglish
    ? "Your tax return in 5 minutes"
    : "Votre déclaration d'impôts en 5 minutes";

  const subtitle = isEnglish
    ? "No more headaches. Our simplified process lets you submit everything in record time."
    : "Fini les casse-têtes. Notre processus simplifié vous permet de tout déposer en un temps record.";

  const steps = isEnglish
    ? [
        {
          icon: Timer,
          time: "2 min",
          title: "Fill the form",
          description: "Answer a few simple questions about your situation",
        },
        {
          icon: Upload,
          time: "2 min",
          title: "Upload documents",
          description: "Drag & drop your tax documents securely",
        },
        {
          icon: FileCheck,
          time: "1 min",
          title: "Pay & relax",
          description: "We handle everything, you receive your completed return",
        },
      ]
    : [
        {
          icon: Timer,
          time: "2 min",
          title: "Remplissez le formulaire",
          description: "Répondez à quelques questions simples sur votre situation",
        },
        {
          icon: Upload,
          time: "2 min",
          title: "Uploadez vos documents",
          description: "Glissez-déposez vos documents fiscaux en toute sécurité",
        },
        {
          icon: FileCheck,
          time: "1 min",
          title: "Payez et relaxez",
          description: "Nous nous occupons de tout, vous recevez votre déclaration",
        },
      ];

  const ctaText = isEnglish ? "Start now" : "Commencer maintenant";
  const ctaSubtext = isEnglish ? "It only takes 5 minutes!" : "Ça ne prend que 5 minutes!";

  return (
    <section className="py-16 bg-gradient-to-b from-white to-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full px-4 py-2 mb-4 shadow-lg">
            <Zap className="w-5 h-5 text-white" />
            <span className="text-white font-bold">Express</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title.split("5 minutes")[0]}
            <span className="text-gradient">5 minutes</span>
            {title.split("5 minutes")[1]}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {index + 1}
                </div>

                {/* Time badge */}
                <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-sm font-bold mb-4">
                  <Timer className="w-4 h-4" />
                  {step.time}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Arrow for non-last items */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-semibold shadow-xl group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <Link href="/demande">
              {ctaText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-muted-foreground mt-3 flex items-center justify-center gap-2">
            <Timer className="w-4 h-4" />
            {ctaSubtext}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
