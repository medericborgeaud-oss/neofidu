"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  X,
  Mail,
  Sparkles,
  PiggyBank,
  TrendingDown,
  Bell,
  CheckCircle2,
  Gift,
  Loader2,
  BadgePercent,
  Lightbulb,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const { isEnglish } = useLanguage();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const benefits = isEnglish
    ? [
        { icon: PiggyBank, text: "Tips to save money in Switzerland" },
        { icon: TrendingDown, text: "Tax optimization strategies" },
        { icon: Calendar, text: "Important tax deadlines reminders" },
        { icon: Gift, text: "Exclusive offers & discounts" },
      ]
    : [
        { icon: PiggyBank, text: "Astuces pour économiser en Suisse" },
        { icon: TrendingDown, text: "Stratégies d'optimisation fiscale" },
        { icon: Calendar, text: "Rappels des échéances fiscales" },
        { icon: Gift, text: "Offres exclusives & réductions" },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form after closing
        setTimeout(() => {
          setIsSuccess(false);
          setEmail("");
          setFirstName("");
        }, 300);
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="relative w-full max-w-lg overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-primary via-emerald-600 to-teal-600 p-8 pb-12">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300/20 rounded-full blur-xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {isEnglish ? "Join our Newsletter" : "Rejoignez notre Newsletter"}
                      </h2>
                      <p className="text-white/80 text-sm">
                        {isEnglish ? "Free tips, straight to your inbox" : "Conseils gratuits, directement dans votre boîte mail"}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                    <Lightbulb className="w-4 h-4 text-yellow-300" />
                    <span className="text-white text-sm font-medium">
                      {isEnglish
                        ? "Discover how to save more in Switzerland!"
                        : "Découvrez comment économiser plus en Suisse !"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 -mt-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {isEnglish ? "Welcome aboard!" : "Bienvenue à bord !"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isEnglish
                        ? "Check your inbox to confirm your subscription."
                        : "Vérifiez votre boîte mail pour confirmer votre inscription."}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Benefits */}
                    <Card className="bg-gradient-to-br from-secondary/50 to-emerald-50/50 border-0 p-4 mb-6">
                      <p className="text-sm font-semibold mb-3 text-foreground">
                        {isEnglish ? "What you'll receive:" : "Ce que vous recevrez :"}
                      </p>
                      <ul className="space-y-2">
                        {benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                              <benefit.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-muted-foreground">{benefit.text}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="newsletter-firstName" className="text-sm font-medium">
                          {isEnglish ? "First name" : "Prénom"}
                        </Label>
                        <Input
                          id="newsletter-firstName"
                          type="text"
                          placeholder={isEnglish ? "John" : "Jean"}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="mt-1.5"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="newsletter-email" className="text-sm font-medium">
                          {isEnglish ? "Email address" : "Adresse email"}
                        </Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="newsletter-email"
                            type="email"
                            placeholder={isEnglish ? "john@example.com" : "jean@exemple.ch"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg"
                        >
                          {error}
                        </motion.p>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-full py-6 text-base font-semibold bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            {isEnglish ? "Subscribing..." : "Inscription..."}
                          </>
                        ) : (
                          <>
                            <Bell className="w-5 h-5 mr-2" />
                            {isEnglish ? "Subscribe for free" : "S'inscrire gratuitement"}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        {isEnglish
                          ? "No spam, unsubscribe anytime. ~2 emails per month."
                          : "Pas de spam, désabonnement à tout moment. ~2 emails par mois."}
                      </p>
                    </form>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Newsletter CTA Card component for the blog page
export function NewsletterCTA({ onClick }: { onClick: () => void }) {
  const { isEnglish } = useLanguage();

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
      onClick={onClick}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-emerald-50 to-teal-50" />

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-teal-300/20 rounded-full blur-xl" />

      {/* Floating icons animation */}
      <div className="absolute top-4 right-4 opacity-20">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <PiggyBank className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-12 opacity-20">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        >
          <BadgePercent className="w-6 h-6 text-emerald-600" />
        </motion.div>
      </div>

      <div className="relative p-8">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
            <Mail className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3 h-3" />
              {isEnglish ? "FREE TIPS" : "ASTUCES GRATUITES"}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {isEnglish
                ? "Save more money in Switzerland"
                : "Économisez plus en Suisse"}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-4">
              {isEnglish
                ? "Receive exclusive tips to reduce your taxes and save money every month."
                : "Recevez des astuces exclusives pour réduire vos impôts et économiser chaque mois."}
            </p>

            {/* Benefits preview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: TrendingDown, label: isEnglish ? "Tax tips" : "Astuces fiscales" },
                { icon: PiggyBank, label: isEnglish ? "Savings" : "Économies" },
                { icon: Calendar, label: isEnglish ? "Deadlines" : "Échéances" },
              ].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-white/80 text-sm text-muted-foreground px-3 py-1.5 rounded-full border border-border/50"
                >
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                  {item.label}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Button className="rounded-full group-hover:bg-primary/90 transition-colors">
              {isEnglish ? "Subscribe for free" : "S'inscrire gratuitement"}
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
