import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import Link from "next/link";
import {
  FileSearch, Clock, ShieldCheck, CheckCircle2, ArrowRight, Scale, Lock,
} from "lucide-react";

export const metadata = {
  title: "Second avis gratuit sur votre facture de fiduciaire | NeoFidu",
  description:
    "Payez-vous trop cher votre fiduciaire ? Envoyez votre dernière facture, on vous dit en 48h si vous pouvez économiser. Gratuit, confidentiel, sans engagement.",
};

const steps = [
  { icon: FileSearch, title: "1. Vous envoyez", text: "Votre dernière facture ou devis de fiduciaire, plus 2-3 infos sur votre société (forme juridique, employés, TVA)." },
  { icon: Scale, title: "2. On analyse", text: "Un spécialiste diplômé décortique votre offre poste par poste : comptabilité, TVA, bouclement, salaires, conseils." },
  { icon: Clock, title: "3. Vous recevez votre comparatif", text: "Sous 48 h : ce que vous payez, ce que ça coûterait chez NeoFidu, et les postes en trop. À vous de décider." },
];

const benefits = [
  "Un comparatif poste par poste de votre facture actuelle",
  "Une estimation chiffrée de votre budget chez NeoFidu",
  "Les postes que vous payez peut-être en trop",
  "Un avis honnête : si vous êtes déjà au bon prix, on vous le dit",
];

const faq = [
  { q: "C'est vraiment gratuit ?", a: "Oui. Aucun frais, aucun engagement. Vous recevez votre comparatif et vous en faites ce que vous voulez." },
  { q: "Et si je suis déjà bien chez ma fiduciaire ?", a: "On vous le dira franchement. Au moins, vous aurez la confirmation que vous payez le juste prix." },
  { q: "Mes documents sont-ils confidentiels ?", a: "Absolument. Vos pièces ne servent qu'à établir votre comparatif, sont traitées de façon sécurisée et ne sont jamais partagées." },
  { q: "Suis-je obligé de changer de fiduciaire ?", a: "Non, jamais. Et si vous décidez de nous rejoindre, on gère toute la reprise de dossier à votre place, en quelques jours." },
];

export default function SecondAvisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight items={[{ label: "Entreprises", href: "/entreprises" }, { label: "Second avis gratuit" }]} className="mb-8" />

          <section className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Comptabilité entreprise</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5">Payez-vous trop cher votre <span className="text-gradient">fiduciaire</span> ?</h1>
            <p className="text-lg text-muted-foreground mb-8">Envoyez-nous votre dernière facture. En 48 h, on vous dit en toute transparence si vous pourriez payer moins — sans engagement, et sans changer si vous êtes déjà au bon prix.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition">Demander mon second avis gratuit <ArrowRight className="w-4 h-4" /></Link>
            <p className="text-xs text-muted-foreground mt-3">Gratuit · Confidentiel · Réponse sous 48 h · Sans engagement</p>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">Comment ça marche</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Ce que vous recevez, sans rien payer</h2>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4">Pourquoi on ose la comparaison</h2>
            <p className="text-muted-foreground">Parce qu'on affiche nos prix publiquement. Les tarifs des fiduciaires varient du simple au triple pour les mêmes prestations — beaucoup d'entreprises paient sans le savoir l'addition d'un bureau physique et d'heures non justifiées. Notre modèle 100 % digital permet souvent 20 à 40 % d'économie à prestations égales. Le second avis vous permet juste de le vérifier, sans risque.</p>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
              <Lock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Vos données sont protégées</h3>
                <p className="text-sm text-muted-foreground">Votre facture et vos informations sont traitées de façon strictement confidentielle, utilisées uniquement pour établir votre comparatif, et jamais transmises à des tiers. Traitement sécurisé, conforme à la LPD.</p>
              </div>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border p-5 shadow-sm">
                  <h3 className="font-medium mb-1">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/5 to-teal-50 rounded-2xl p-8">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">En 48 h, sachez si vous payez trop cher.</h2>
              <p className="text-muted-foreground mb-6">Joignez votre dernière facture de fiduciaire, on s'occupe du reste.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition">Demander mon second avis gratuit <ArrowRight className="w-4 h-4" /></Link>
              <p className="text-xs text-muted-foreground mt-3">Gratuit · Confidentiel · Sans engagement</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
