import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function BlogArticleNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <div className="pt-28 pb-20 container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            Cet article n'existe pas ou a été supprimé. Découvrez nos autres contenus sur la fiscalité et la comptabilité suisse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="rounded-full">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">Accueil</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
