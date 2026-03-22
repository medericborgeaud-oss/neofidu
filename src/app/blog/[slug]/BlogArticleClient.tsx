"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Share2, ArrowRight, Check, Copy } from "lucide-react";
import { BlogArticle, blogCategories } from "@/lib/blog-data";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { useState } from "react";

interface BlogArticleClientProps {
  article: BlogArticle;
  otherArticles: BlogArticle[];
}

export default function BlogArticleClient({ article, otherArticles }: BlogArticleClientProps) {
  const [copied, setCopied] = useState(false);
  const { isEnglish } = useLanguage();
  const categoryInfo = blogCategories[article.category];

  const handleShare = async () => {
    const url = `https://www.neofidu.ch/blog/${article.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url,
        });
      } catch (err) {
        // User cancelled or error, fallback to copy
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <BreadcrumbLight
            items={[
              { label: "Blog", href: "/blog" },
              { label: categoryInfo.name, href: `/blog?category=${article.category}` },
              { label: article.title.length > 40 ? `${article.title.substring(0, 40)}...` : article.title },
            ]}
            className="mb-8"
          />

          <div className="max-w-3xl mx-auto">
            {/* Cover image */}
            {article.image && (
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl mb-8">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  unoptimized
                />
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${categoryInfo.color}`} />
              </div>
            )}

            {/* Article header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className={`mb-4 ${categoryInfo.color} text-white`}>
                {categoryInfo.name}
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {isEnglish && article.titleEn ? article.titleEn : article.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {isEnglish && article.excerptEn ? article.excerptEn : article.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString("fr-CH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min de lecture</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-primary transition-colors ml-auto"
                  aria-label="Partager l'article"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Copié!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Partager</span>
                    </>
                  )}
                </button>
              </div>
            </motion.header>

            {/* Article content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none mb-12 prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-teal-50 mb-8">
                <h3 className="text-xl font-bold mb-2">Besoin d'accompagnement ?</h3>
                <p className="text-muted-foreground mb-6">
                  Notre équipe est à votre disposition pour vous accompagner dans vos démarches fiscales et comptables.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="rounded-full">
                    <Link href="/demande">Déposer une demande</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/#contact">Nous contacter</Link>
                  </Button>
                </div>
              </Card>

              {/* Quick links - expanded */}
              <div className="bg-secondary/30 rounded-xl p-6 mb-12">
                <h4 className="font-semibold mb-4">Liens utiles</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium mb-2">Outils gratuits</p>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/simulateur/impots" className="text-primary hover:underline">
                          → Simulateur d'impôts
                        </Link>
                      </li>
                      <li>
                        <Link href="/simulateur/3eme-pilier" className="text-primary hover:underline">
                          → Calculateur 3ème pilier
                        </Link>
                      </li>
                      <li>
                        <Link href="/simulateur/baisse-loyer" className="text-primary hover:underline">
                          → Calculateur baisse de loyer
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-2">Services</p>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/tarifs" className="text-primary hover:underline">
                          → Nos tarifs
                        </Link>
                      </li>
                      <li>
                        <Link href="/demande" className="text-primary hover:underline">
                          → Déposer une demande
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="text-primary hover:underline">
                          → Consulter la FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-muted-foreground font-medium mb-2">Nos régions</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/cantons/geneve" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Genève</Link>
                    <Link href="/cantons/vaud" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Vaud</Link>
                    <Link href="/cantons/fribourg" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Fribourg</Link>
                    <Link href="/cantons/valais" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Valais</Link>
                    <Link href="/cantons/neuchatel" className="px-3 py-1 bg-white rounded-full text-sm hover:bg-primary hover:text-white transition-colors">Neuchâtel</Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related articles */}
            {otherArticles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                aria-label="Articles similaires"
              >
                <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {otherArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.id} href={`/blog/${relatedArticle.slug}`}>
                      <Card className="p-4 h-full hover:shadow-lg transition-all duration-300 group">
                        <Badge
                          variant="secondary"
                          className={`mb-2 ${blogCategories[relatedArticle.category].color} text-white text-xs`}
                        >
                          {blogCategories[relatedArticle.category].name}
                        </Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <span className="text-primary text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Lire <ArrowRight className="w-3 h-3" />
                        </span>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
