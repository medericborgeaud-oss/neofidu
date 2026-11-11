import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreadcrumbLight } from "@/components/Breadcrumb";
import Link from "next/link";
import {
  FileSearch, Clock, ShieldCheck, CheckCircle2, ArrowRight, Scale, Lock,
  PenLine, FolderInput, ClipboardCheck, PlayCircle, AlertTriangle, CalendarClock,
  Unlock, Download, BadgeCheck, Receipt,
} from "lucide-react";

// Page fusionnée "Second avis gratuit" + "Changer de fiduciaire" (FR et EN).

const content = {
  fr: {
    base: "",
    breadcrumb: [{ label: "Entreprises", href: "/entreprises" }, { label: "Changer de fiduciaire" }],
    banner: "Fin d'exercice en vue : le meilleur moment pour changer de fiduciaire, c'est avant le prochain bouclement.",
    kicker: "Second avis gratuit · Reprise de dossier",
    h1a: "Changer de ",
    h1b: "fiduciaire",
    h1c: ", sans stress et sans rupture",
    lead: "Envoyez-nous votre dernière facture de fiduciaire. En 48 h, vous savez si vous payez trop cher. Si vous décidez de changer, on s'occupe de toute la reprise : vous n'avez qu'à signer.",
    cta: "Demander mon second avis gratuit",
    cta2: "Voir les tarifs",
    ctaNote: "Gratuit · Confidentiel · Réponse sous 48 h · Sans engagement",
    s1Title: "Étape 1 : votre second avis gratuit",
    steps: [
      { icon: FileSearch, title: "1. Vous envoyez", text: "Votre dernière facture ou devis de fiduciaire, plus 2-3 infos sur votre société (forme juridique, employés, TVA)." },
      { icon: Scale, title: "2. On analyse", text: "Un spécialiste diplômé décortique votre offre poste par poste : comptabilité, TVA, bouclement, salaires, conseils." },
      { icon: Clock, title: "3. Vous recevez votre comparatif", text: "Sous 48 h : ce que vous payez, ce que ça coûterait chez NeoFidu, et les postes en trop. À vous de décider." },
    ],
    benefitsTitle: "Ce que vous recevez, sans rien payer",
    benefits: [
      "Un comparatif poste par poste de votre facture actuelle",
      "Une estimation chiffrée de votre budget chez NeoFidu",
      "Les postes que vous payez peut-être en trop",
      "Un avis honnête : si vous êtes déjà au bon prix, on vous le dit",
    ],
    signsTitle: "Les signes qu'il est temps de changer",
    signs: [
      "Vos comptes annuels arrivent des mois après la clôture",
      "Vos factures ne détaillent pas ce qui a été fait, ou comptent des heures difficiles à justifier",
      "Chaque question est facturée, ou reste sans réponse",
      "Vous faites vous-même une partie du travail (saisie, classement, relances)",
      "Personne ne vous propose d'optimisation fiscale",
      "Vos honoraires augmentent sans explication",
    ],
    fearsTitle: "Changer de fiduciaire, ce n'est pas un divorce",
    fearsLead: "Le frein est presque toujours psychologique. Voici les craintes qu'on entend le plus, et ce qui se passe vraiment.",
    fears: [
      { q: "« Je vais devoir me justifier auprès de mon comptable. »", a: "Non. On prépare la lettre de transfert, vous la signez, c'est tout. On vérifie aussi avec vous le préavis prévu dans votre contrat actuel." },
      { q: "« Je vais perdre mon historique. »", a: "On récupère le grand livre, la balance, les décomptes TVA et les bouclements précédents. Rien ne se perd." },
      { q: "« Ce n'est pas le bon moment. »", a: "L'idéal est la fin d'un exercice ou d'une période TVA, mais une reprise est possible toute l'année." },
      { q: "« C'est beaucoup de paperasse. »", a: "Tout se fait en ligne. Votre part se limite à signer la lettre de transfert et à nous indiquer votre fiduciaire actuelle." },
    ],
    s2Title: "Étape 2 : si vous changez, la reprise en 4 étapes",
    takeover: [
      { icon: PenLine, title: "1. Vous signez", text: "La lettre de transfert que nous préparons pour vous, avec les coordonnées de votre fiduciaire actuelle." },
      { icon: FolderInput, title: "2. On récupère", text: "Nous demandons directement le grand livre, la balance, les décomptes TVA, les bouclements et les dossiers salaires." },
      { icon: ClipboardCheck, title: "3. On contrôle", text: "Nous reprenons et vérifions les comptes. Vous recevez un état des lieux écrit de votre comptabilité." },
      { icon: PlayCircle, title: "4. On démarre", text: "Le suivi continue sans interruption, avec un spécialiste diplômé et des échéances tenues." },
    ],
    timingTitle: "Quand changer ?",
    timing: "Le plus simple est de changer au début d'un nouvel exercice (souvent le 1er janvier) ou d'une nouvelle période TVA : la nouvelle fiduciaire démarre sur une base propre. Mais si votre situation actuelle vous coûte du temps ou de l'argent, inutile d'attendre.",
    guaranteesTitle: "Nos engagements",
    guarantees: [
      { icon: Unlock, title: "Sans durée minimale", text: "Mandat résiliable par e-mail pour la fin du mois suivant." },
      { icon: Download, title: "Vos données vous appartiennent", text: "Export complet de votre comptabilité à tout moment." },
      { icon: Receipt, title: "Prix publics", text: "Forfaits affichés sur notre page Tarifs, avec des seuils clairs." },
      { icon: BadgeCheck, title: "Aucune surprise", text: "Aucun supplément facturé sans votre accord préalable." },
    ],
    whyTitle: "Pourquoi on ose la comparaison",
    why: "Parce qu'on affiche nos prix publiquement. Les tarifs des fiduciaires varient du simple au triple pour les mêmes prestations : beaucoup d'entreprises paient sans le savoir l'addition d'un bureau physique et d'heures non justifiées. Notre modèle 100 % digital permet souvent 20 à 40 % d'économie à prestations égales. Le second avis vous permet juste de le vérifier, sans risque.",
    dataTitle: "Vos données sont protégées",
    data: "Votre facture et vos informations sont traitées de façon strictement confidentielle, utilisées uniquement pour établir votre comparatif, et jamais transmises à des tiers. Traitement sécurisé, conforme à la LPD.",
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Le second avis est-il vraiment gratuit ?", a: "Oui. Aucun frais, aucun engagement. Vous recevez votre comparatif et vous en faites ce que vous voulez." },
      { q: "Et si je suis déjà bien chez ma fiduciaire ?", a: "On vous le dira franchement. Au moins, vous aurez la confirmation que vous payez le juste prix." },
      { q: "Suis-je obligé de changer après le second avis ?", a: "Non, jamais. Le second avis est un comparatif, pas un engagement." },
      { q: "Dois-je prévenir moi-même mon ancienne fiduciaire ?", a: "Non. Vous signez la lettre de transfert que nous préparons, et nous prenons contact avec elle pour récupérer vos dossiers." },
      { q: "Combien de temps prend la reprise ?", a: "Une fois les documents reçus de votre fiduciaire actuelle, la reprise se fait en quelques jours. Le délai dépend surtout de sa réactivité et du préavis de votre contrat." },
      { q: "Peut-on changer en cours d'année ?", a: "Oui. La fin d'un exercice ou d'une période TVA est plus simple, mais nous reprenons des dossiers toute l'année." },
      { q: "Mes documents sont-ils confidentiels ?", a: "Absolument. Vos pièces ne servent qu'à établir votre comparatif, sont traitées de façon sécurisée et ne sont jamais partagées." },
      { q: "Et si je veux quitter NeoFidu plus tard ?", a: "Votre mandat est résiliable pour la fin du mois suivant, sans durée minimale, et vous récupérez l'intégralité de votre comptabilité." },
    ],
    finalTitle: "En 48 h, sachez si vous payez trop cher.",
    finalText: "Joignez votre dernière facture de fiduciaire, on s'occupe du reste.",
    finalNote: "Gratuit · Confidentiel · Sans engagement",
  },
  en: {
    base: "/en",
    breadcrumb: [{ label: "Businesses", href: "/en/entreprises" }, { label: "Switch fiduciary" }],
    banner: "Year-end is coming: the best time to switch fiduciary is before your next closing.",
    kicker: "Free second opinion · File takeover",
    h1a: "Switch ",
    h1b: "fiduciary",
    h1c: ", stress-free and without disruption",
    lead: "Send us your latest fiduciary invoice. Within 48h, you know whether you are overpaying. If you decide to switch, we handle the whole takeover: all you do is sign.",
    cta: "Request my free second opinion",
    cta2: "See pricing",
    ctaNote: "Free · Confidential · Answer within 48h · No commitment",
    s1Title: "Step 1: your free second opinion",
    steps: [
      { icon: FileSearch, title: "1. You send", text: "Your latest fiduciary invoice or quote, plus 2-3 details about your company (legal form, employees, VAT)." },
      { icon: Scale, title: "2. We analyse", text: "A qualified specialist breaks down your offer item by item: accounting, VAT, year-end closing, payroll, advice." },
      { icon: Clock, title: "3. You get your comparison", text: "Within 48h: what you pay, what it would cost at NeoFidu, and the items you are overpaying. The decision is yours." },
    ],
    benefitsTitle: "What you get, free of charge",
    benefits: [
      "An item-by-item comparison of your current invoice",
      "A costed estimate of your budget at NeoFidu",
      "The items you may be overpaying",
      "An honest opinion: if your price is already fair, we will tell you",
    ],
    signsTitle: "Signs it is time to switch",
    signs: [
      "Your annual accounts arrive months after year-end",
      "Your invoices do not detail the work done, or bill hours that are hard to justify",
      "Every question is billed, or goes unanswered",
      "You do part of the work yourself (data entry, filing, reminders)",
      "Nobody suggests any tax optimisation",
      "Your fees go up without explanation",
    ],
    fearsTitle: "Switching fiduciary is not a divorce",
    fearsLead: "What holds people back is almost always psychological. Here are the fears we hear most, and what really happens.",
    fears: [
      { q: "“I will have to explain myself to my accountant.”", a: "No. We prepare the transfer letter, you sign it, that is all. We also check the notice period in your current contract with you." },
      { q: "“I will lose my history.”", a: "We retrieve the general ledger, trial balance, VAT returns and previous closings. Nothing is lost." },
      { q: "“This is not the right time.”", a: "The end of a financial year or VAT period is ideal, but a takeover is possible all year round." },
      { q: "“It is a lot of paperwork.”", a: "Everything is done online. Your part is to sign the transfer letter and tell us who your current fiduciary is." },
    ],
    s2Title: "Step 2: if you switch, the takeover in 4 steps",
    takeover: [
      { icon: PenLine, title: "1. You sign", text: "The transfer letter we prepare for you, with your current fiduciary's contact details." },
      { icon: FolderInput, title: "2. We retrieve", text: "We request the general ledger, trial balance, VAT returns, closings and payroll files directly." },
      { icon: ClipboardCheck, title: "3. We check", text: "We take over and review the accounts. You receive a written status report on your bookkeeping." },
      { icon: PlayCircle, title: "4. We start", text: "Follow-up continues without interruption, with a qualified specialist and deadlines met." },
    ],
    timingTitle: "When to switch?",
    timing: "The simplest is to switch at the start of a new financial year (often 1 January) or a new VAT period: the new fiduciary starts from a clean base. But if your current situation is costing you time or money, there is no point waiting.",
    guaranteesTitle: "Our commitments",
    guarantees: [
      { icon: Unlock, title: "No minimum term", text: "Mandate can be cancelled by email for the end of the following month." },
      { icon: Download, title: "Your data belongs to you", text: "Full export of your accounts at any time." },
      { icon: Receipt, title: "Public prices", text: "Packages shown on our Pricing page, with clear limits." },
      { icon: BadgeCheck, title: "No surprises", text: "No extra charge without your prior agreement." },
    ],
    whyTitle: "Why we dare to compare",
    why: "Because we publish our prices. Fiduciary fees can vary threefold for the same services: many companies unknowingly pay for a physical office and unjustified hours. Our 100% digital model often saves 20 to 40% for the same services. The second opinion simply lets you check, risk-free.",
    dataTitle: "Your data is protected",
    data: "Your invoice and information are handled in strict confidence, used only to prepare your comparison, and never passed on to third parties. Secure processing, compliant with the Swiss FADP.",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is the second opinion really free?", a: "Yes. No fees, no commitment. You receive your comparison and do whatever you want with it." },
      { q: "What if I am already happy with my fiduciary?", a: "We will tell you frankly. At least you will have confirmation that you are paying a fair price." },
      { q: "Do I have to switch after the second opinion?", a: "No, never. The second opinion is a comparison, not a commitment." },
      { q: "Do I have to notify my former fiduciary myself?", a: "No. You sign the transfer letter we prepare, and we contact them to retrieve your files." },
      { q: "How long does the takeover take?", a: "Once we have received the documents from your current fiduciary, the takeover takes a few days. Timing mainly depends on their responsiveness and your contract's notice period." },
      { q: "Can I switch during the year?", a: "Yes. The end of a financial year or VAT period is simpler, but we take over files all year round." },
      { q: "Are my documents confidential?", a: "Absolutely. Your documents are only used to prepare your comparison, are handled securely and are never shared." },
      { q: "What if I want to leave NeoFidu later?", a: "Your mandate can be cancelled for the end of the following month, with no minimum term, and you get your complete accounts back." },
    ],
    finalTitle: "Within 48h, find out if you are overpaying.",
    finalText: "Attach your latest fiduciary invoice, we take care of the rest.",
    finalNote: "Free · Confidential · No commitment",
  },
};

export function ChangerFiduciaireContent({ en = false }: { en?: boolean }) {
  const c = en ? content.en : content.fr;
  const demande = `${c.base}/demande?type=comptabilite`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: en ? "How to switch fiduciary in Switzerland" : "Comment changer de fiduciaire en Suisse",
    step: c.takeover.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title.replace(/^\d+\.\s*/, ""),
      text: s.text,
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Header />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BreadcrumbLight items={c.breadcrumb} className="mb-6" />

          <div className="max-w-4xl mx-auto mb-10 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3 flex items-center gap-3 text-sm text-amber-900">
            <CalendarClock className="w-5 h-5 shrink-0 text-amber-600" />
            <span>{c.banner}</span>
          </div>

          <section className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">{c.kicker}</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5">{c.h1a}<span className="text-gradient">{c.h1b}</span>{c.h1c}</h1>
            <p className="text-lg text-muted-foreground mb-8">{c.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={demande} className="inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition">{c.cta} <ArrowRight className="w-4 h-4" /></Link>
              <Link href={`${c.base}/tarifs`} className="inline-flex items-center justify-center gap-2 border border-primary/30 text-primary rounded-full px-8 py-4 font-medium hover:bg-primary/5 transition">{c.cta2}</Link>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{c.ctaNote}</p>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">{c.s1Title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {c.steps.map((s, i) => (
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

          <section className="max-w-5xl mx-auto mb-16 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">{c.benefitsTitle}</h2>
              <ul className="space-y-3">
                {c.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">{c.signsTitle}</h2>
              <ul className="space-y-3">
                {c.signs.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-3">{c.fearsTitle}</h2>
            <p className="text-muted-foreground text-center mb-8">{c.fearsLead}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {c.fears.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl border p-5 shadow-sm">
                  <h3 className="font-medium mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">{c.s2Title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.takeover.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">{c.timingTitle}</h3>
              <p className="text-sm text-muted-foreground">{c.timing}</p>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">{c.guaranteesTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.guarantees.map((g, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <g.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{g.title}</h3>
                  <p className="text-sm text-muted-foreground">{g.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4">{c.whyTitle}</h2>
            <p className="text-muted-foreground">{c.why}</p>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
              <Lock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">{c.dataTitle}</h3>
                <p className="text-sm text-muted-foreground">{c.data}</p>
              </div>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{c.faqTitle}</h2>
            <div className="space-y-4">
              {c.faq.map((item, i) => (
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
              <h2 className="text-2xl font-bold mb-2">{c.finalTitle}</h2>
              <p className="text-muted-foreground mb-6">{c.finalText}</p>
              <Link href={demande} className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition">{c.cta} <ArrowRight className="w-4 h-4" /></Link>
              <p className="text-xs text-muted-foreground mt-3">{c.finalNote}</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
