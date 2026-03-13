"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { blogArticles, blogCategories } from "@/lib/blog-data";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { isEnglish } = useLanguage();

  const filteredArticles = activeCategory
    ? blogArticles.filter((article) => article.category === activeCategory)
    : blogArticles;

  const categories = Object.entries(blogCategories);

  // Category name translations
  const categoryTranslations: Record<string, { fr: string; en: string }> = {
    declaration: { fr: "Déclaration", en: "Tax Return" },
    deductions: { fr: "Déductions", en: "Deductions" },
    immobilier: { fr: "Immobilier", en: "Property" },
    prevoyance: { fr: "Prévoyance", en: "Pension" },
    entreprise: { fr: "Entreprise", en: "Business" },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <BreadcrumbLight
            items={[
              { label: "Blog" },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>Tax <span className="text-gradient">News</span></>
              ) : (
                <>Actualités <span className="text-gradient">fiscales</span></>
              )}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isEnglish
                ? "Stay informed about the latest tax and accounting developments in French-speaking Switzerland. Practical advice and tax analysis."
                : "Restez informé des dernières évolutions fiscales et comptables en Suisse romande. Conseils pratiques et analyses fiscales."}
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              className="rounded-full"
            >
              {isEnglish ? "All articles" : "Tous les articles"}
            </Button>
            {categories.map(([key, value]) => (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                onClick={() => setActiveCategory(key)}
                className="rounded-full"
              >
                {categoryTranslations[key]
                  ? (isEnglish ? categoryTranslations[key].en : categoryTranslations[key].fr)
                  : value.name}
              </Button>
            ))}
          </motion.div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                    {/* Category color bar */}
                    <div className={`h-2 ${blogCategories[article.category].color}`} />

                    <div className="p-6">
                      {/* Category badge */}
                      <Badge
                        variant="secondary"
                        className={`mb-4 ${blogCategories[article.category].color} text-white`}
                      >
                        {categoryTranslations[article.category]
                          ? (isEnglish ? categoryTranslations[article.category].en : categoryTranslations[article.category].fr)
                          : blogCategories[article.category].name}
                      </Badge>

                      {/* Title */}
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString(isEnglish ? "en-GB" : "fr-CH")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>

                      {/* Read more */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          {isEnglish ? "Read article" : "Lire l'article"}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-sm"
          >
            <Link href="/faq" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              {isEnglish ? "Frequently Asked Questions (FAQ)" : "Questions fréquentes (FAQ)"}
            </Link>
            <Link href="/#tarifs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              {isEnglish ? "View our pricing" : "Consulter nos tarifs"}
            </Link>
            <Link href="/suivi" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              {isEnglish ? "Track my request" : "Suivre ma demande"}
            </Link>
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-teal-50">
              <h3 className="text-xl font-bold mb-2">
                {isEnglish ? "Stay informed" : "Restez informé"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isEnglish
                  ? "Receive our latest articles and tax tips directly in your mailbox."
                  : "Recevez nos derniers articles et conseils fiscaux directement dans votre boîte mail."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link href="/#contact">
                    {isEnglish ? "Subscribe to newsletter" : "S'inscrire à la newsletter"}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/demande">
                    {isEnglish ? "Submit a request" : "Déposer une demande"}
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
