"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  FileText,
  ArrowRight,
  Calendar,
  Users,
  Building2,
  Briefcase,
  Sparkles,
  BookOpen,
  Calculator,
} from "lucide-react";
import { Suspense } from "react";

function ThankYouContent() {
  const { isEnglish } = useLanguage();
  const searchParams = useSearchParams();
  const companyType = searchParams.get("type") || "other";

  // Map company type to readable name
  const companyTypeLabels: Record<string, { fr: string; en: string; icon: typeof Users }> = {
    ri: { fr: "Raison individuelle", en: "Sole Proprietorship", icon: Users },
    sarl: { fr: "Sàrl", en: "LLC", icon: Building2 },
    sa: { fr: "SA", en: "Corporation", icon: Briefcase },
    other: { fr: "Entreprise", en: "Company", icon: Building2 },
  };

  const typeInfo = companyTypeLabels[companyType] || companyTypeLabels.other;
  const TypeIcon = typeInfo.icon;

  const nextSteps = isEnglish
    ? [
        {
          icon: Phone,
          title: "Free call",
          description: "A Neofidu expert will contact you to discuss your project and answer your questions.",
        },
        {
          icon: FileText,
          title: "Personalized quote",
          description: "You'll receive a detailed quote tailored to your situation, with no commitment.",
        },
        {
          icon: Calendar,
          title: "Planning & launch",
          description: "Together, we'll define the timeline and start the formation process.",
        },
      ]
    : [
        {
          icon: Phone,
          title: "Appel gratuit",
          description: "Un expert Neofidu vous contacte pour discuter de votre projet et répondre à vos questions.",
        },
        {
          icon: FileText,
          title: "Devis personnalisé",
          description: "Vous recevrez un devis détaillé adapté à votre situation, sans engagement.",
        },
        {
          icon: Calendar,
          title: "Planification & lancement",
          description: "Ensemble, nous définirons le calendrier et lancerons les démarches de création.",
        },
      ];

  const resources = isEnglish
    ? [
        {
          icon: BookOpen,
          title: "Company Creation Guide",
          description: "Everything you need to know about starting a business in Switzerland",
          href: "/blog/creer-entreprise-suisse-2026",
        },
        {
          icon: Calculator,
          title: "Tax Simulator",
          description: "Estimate your taxes as a self-employed person",
          href: "/simulateur/impots",
        },
      ]
    : [
        {
          icon: BookOpen,
          title: "Guide création d'entreprise",
          description: "Tout ce qu'il faut savoir pour créer son entreprise en Suisse",
          href: "/blog/creer-entreprise-suisse-2026",
        },
        {
          icon: Calculator,
          title: "Simulateur d'impôts",
          description: "Estimez vos impôts en tant qu'indépendant",
          href: "/simulateur/impots",
        },
      ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative w-24 h-24 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-amber-400" />
              </motion.div>
            </motion.div>

            <Badge className="mb-4 bg-violet-100 text-violet-700 py-2 px-4">
              <TypeIcon className="w-4 h-4 mr-2" />
              {isEnglish ? typeInfo.en : typeInfo.fr}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {isEnglish ? (
                <>
                  Thank you for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">request!</span>
                </>
              ) : (
                <>
                  Merci pour votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">demande !</span>
                </>
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {isEnglish
                ? "Your request has been received. Our team will contact you to discuss your company creation project."
                : "Votre demande a bien été reçue. Notre équipe vous contactera pour discuter de votre projet de création d'entreprise."}
            </p>
          </motion.div>

          {/* Confirmation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <Card className="overflow-hidden border-violet-200">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {isEnglish ? "Confirmation email sent" : "Email de confirmation envoyé"}
                    </h2>
                    <p className="text-white/80 text-sm">
                      {isEnglish
                        ? "Check your inbox for details about your request"
                        : "Vérifiez votre boîte mail pour les détails de votre demande"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900">
                      {isEnglish ? "Fast response" : "Réponse rapide"}
                    </p>
                    <p className="text-sm text-amber-700">
                      {isEnglish
                        ? "Monday to Friday, 9am to 6pm"
                        : "Du lundi au vendredi, de 9h à 18h"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              {isEnglish ? "What happens next?" : "Et maintenant ?"}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow border-t-4 border-t-violet-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-bold">
                        {index + 1}
                      </div>
                      <step.icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Useful Resources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-xl font-bold text-center mb-6">
              {isEnglish ? "While you wait..." : "En attendant..."}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <Link key={index} href={resource.href}>
                  <Card className="p-5 h-full hover:shadow-lg transition-all hover:border-violet-300 group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                        <resource.icon className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-violet-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Link href="/">
              <Button variant="outline" size="lg" className="px-8">
                {isEnglish ? "Back to homepage" : "Retour à l'accueil"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
