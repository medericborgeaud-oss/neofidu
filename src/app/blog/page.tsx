"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Newspaper, Search, X } from "lucide-react";
import { blogArticles, blogCategories } from "@/lib/blog-data";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { NewsletterModal, NewsletterCTA } from "@/components/NewsletterModal";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const { isEnglish } = useLanguage();

  const filteredArticles = useMemo(() => {
    // Start with a fresh copy of all articles
    let result = [...blogArticles].filter(a => a.slug !== "premiere-declaration-impots-suisse-guide").sort((a, b) => b.date.localeCompare(a.date));

    // Filter by category
    if (activeCategory && activeCategory.trim() !== "") {
      result = result.filter((article) => {
        // Compare categories (case-insensitive for safety)
        return article.category.toLowerCase() === activeCategory.toLowerCase();
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const titleEnMatch = article.titleEn?.toLowerCase().includes(query) || false;
        const excerptMatch = article.excerpt.toLowerCase().includes(query);
        const excerptEnMatch = article.excerptEn?.toLowerCase().includes(query) || false;
        const keywordsMatch = article.keywords?.some((kw) => kw.toLowerCase().includes(query)) || false;
        return titleMatch || titleEnMatch || excerptMatch || excerptEnMatch || keywordsMatch;
      });
    }

    return result;
  }, [activeCategory, searchQuery]);

  const categories = Object.entries(blogCategories);

  // Category name translations - must match keys in blogCategories
  const categoryTranslations: Record<string, { fr: string; en: string }> = {
    fiscalite: { fr: "Fiscalité", en: "Taxation" },
    comptabilite: { fr: "Comptabilité", en: "Accounting" },
    entreprise: { fr: "Entreprise", en: "Business" },
    actualites: { fr: "Actualités", en: "News" },
    expatries: { fr: "Expatriés", en: "Expats" },
    immobilier: { fr: "Immobilier", en: "Real Estate" },
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
                <>Swiss Tax <span className="text-gradient">News</span></>
              ) : (
                <>Actualités fiscales <span className="text-gradient">Suisse</span></>
              )}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isEnglish
                ? "Stay informed about the latest tax and accounting developments in French-speaking Switzerland. Practical advice and tax analysis."
                : "Restez informé des dernières évolutions fiscales et comptables en Suisse romande. Conseils pratiques et analyses fiscales."}
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={isEnglish ? "Search articles... (e.g. withholding tax, 3rd pillar, Vaud)" : "Rechercher un article... (ex: impôt source, 3ème pilier, Vaud)"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-base rounded-full border-2 focus:border-primary shadow-sm"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground mt-3"
              >
                {filteredArticles.length === 0 ? (
                  isEnglish ? "No articles found" : "Aucun article trouvé"
                ) : (
                  <>
                    {filteredArticles.length} {filteredArticles.length === 1
                      ? (isEnglish ? "article found" : "article trouvé")
                      : (isEnglish ? "articles found" : "articles trouvés")}
                  </>
                )}
              </motion.p>
            )}
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
            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isEnglish ? "No articles found" : "Aucun article trouvé"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isEnglish
                    ? "Try different keywords or remove filters"
                    : "Essayez d'autres mots-clés ou supprimez les filtres"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
                  className="rounded-full"
                >
                  {isEnglish ? "Reset search" : "Réinitialiser la recherche"}
                </Button>
              </motion.div>
            )}
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                    {/* Cover image */}
                    {article.image && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                        />
                        <div className={`absolute bottom-0 left-0 right-0 h-1 ${blogCategories[article.category].color}`} />
                      </div>
                    )}
                    {!article.image && (
                      <div className={`h-2 ${blogCategories[article.category].color}`} />
                    )}

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
                        {isEnglish && article.titleEn ? article.titleEn : article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {isEnglish && article.excerptEn ? article.excerptEn : article.excerpt}
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
            className="mt-12 max-w-2xl mx-auto"
          >
            <NewsletterCTA onClick={() => setIsNewsletterOpen(true)} />
          </motion.div>

          {/* Newsletter Modal */}
          <NewsletterModal
            isOpen={isNewsletterOpen}
            onClose={() => setIsNewsletterOpen(false)}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
