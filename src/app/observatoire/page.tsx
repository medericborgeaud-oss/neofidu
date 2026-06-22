import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Building2, MapPin, ArrowRight, Database, ShieldCheck, TrendingDown, Lightbulb, UserPlus } from "lucide-react";

const nf = (n: number) => new Intl.NumberFormat("fr-CH").format(n);

// ── Tracés SVG des 6 cantons romands (générés depuis la topologie officielle datamaps/Swisstopo) ──
const CANTON_VIEWBOX = "0 0 480 380";
const CANTON_GEO: Record<string, { d: string; cx: number; cy: number }> = {"GE":{"d":"M90,274L90,275L91,279L91,279L93,283L93,284L95,285L98,284L99,284L99,289L96,293L86,300L78,309L73,311L68,309L61,309L55,311L51,313L53,308L54,306L55,304L52,301L50,298L51,295L55,293L64,288L64,288L64,288L64,288L66,289L66,289L67,289L71,288L71,286L71,284L71,282L72,276L73,274L75,269L76,270L83,276Z","cx":75,"cy":293},"JU":{"d":"M258,27L259,28L259,28L265,31L269,34L270,36L271,38L271,38L272,39L273,39L281,41L284,41L285,41L286,41L287,42L289,45L291,47L289,49L288,50L288,51L289,51L292,52L291,52L282,55L266,54L264,53L264,52L263,51L263,51L263,51L262,52L262,53L261,54L260,54L259,55L258,55L257,56L256,57L252,59L249,59L247,60L234,57L233,59L234,60L233,61L233,62L231,63L231,63L231,64L231,65L231,66L232,67L231,68L223,69L219,69L218,69L217,70L217,71L217,71L216,72L215,73L215,75L214,76L212,78L210,79L208,80L207,82L205,82L202,82L200,83L194,87L193,88L192,89L191,88L190,88L189,87L185,86L183,86L183,85L186,80L191,76L201,68L200,63L201,58L204,55L205,55L206,55L209,52L210,51L212,51L213,50L214,47L213,45L210,43L208,41L205,43L187,44L188,41L190,38L192,35L196,33L196,29L198,28L200,28L203,26L205,24L206,22L205,20L204,17L204,14L206,13L208,12L209,12L210,12L212,13L216,14L223,13L227,13L229,15L229,15L231,15L235,14L232,21L233,24L236,26L241,28L241,28L242,29L242,30L243,30L244,30L250,28L254,27Z","cx":230,"cy":46},"NE":{"d":"M185,86L188,88L190,90L191,92L191,93L191,94L191,96L190,98L190,99L190,99L190,100L189,100L189,101L189,103L189,103L212,96L213,95L213,98L216,99L220,101L221,103L222,103L222,104L222,104L221,104L221,104L221,105L221,105L221,105L221,106L221,106L221,108L221,109L221,109L221,110L221,110L221,111L221,111L220,111L220,111L219,112L218,113L215,114L214,115L214,116L213,119L212,121L211,125L199,134L194,139L189,143L172,157L170,151L170,150L169,149L169,147L169,146L169,144L168,143L167,142L166,141L167,139L166,136L157,141L153,145L151,146L146,148L139,152L137,154L136,154L134,155L127,155L124,155L124,154L125,151L124,149L122,145L121,143L124,135L131,131L147,126L157,118L161,113L159,109L161,105L162,104L166,103L167,101L167,101L169,100L169,96L174,94L183,86Z","cx":174,"cy":123},"VS":{"d":"M430,225L425,231L423,233L419,234L418,234L418,234L417,235L418,235L418,236L418,236L417,238L416,239L416,241L416,242L416,243L416,243L410,245L406,247L402,250L401,253L402,254L403,255L403,257L402,259L400,261L399,262L394,264L387,274L384,276L377,278L374,279L371,282L370,284L369,286L369,287L373,290L377,299L378,307L375,314L368,319L366,320L363,320L362,321L361,324L360,326L360,329L360,335L359,335L358,338L358,339L356,341L355,342L353,343L343,345L340,347L339,350L338,354L335,354L335,355L335,357L335,358L334,359L333,360L332,360L329,359L325,359L318,356L316,356L315,357L314,357L312,357L312,356L309,352L307,350L304,349L289,345L286,346L285,348L283,351L280,351L276,353L267,359L262,361L251,360L249,361L244,363L235,367L231,368L226,368L221,367L218,365L211,357L210,356L209,353L208,349L206,345L206,343L205,342L195,331L191,329L190,330L189,331L188,332L186,331L185,330L185,330L185,329L185,327L185,327L185,325L185,323L185,323L185,322L187,320L188,319L188,317L186,315L174,312L172,308L174,301L176,293L182,283L178,277L173,271L170,266L171,264L175,259L176,255L176,253L179,253L186,255L187,254L189,255L191,258L192,260L192,261L191,262L191,264L192,266L194,267L196,267L197,269L198,272L199,274L208,291L211,296L213,298L214,300L220,297L225,294L229,289L230,288L233,285L235,282L237,279L238,278L237,275L237,274L240,271L242,269L247,266L248,264L248,263L248,263L249,262L249,262L254,260L255,260L255,261L255,262L255,264L255,264L255,265L256,265L257,265L263,264L266,261L268,259L268,259L268,259L271,258L277,258L281,259L281,260L282,260L283,260L284,260L290,257L292,255L290,254L289,253L292,251L297,249L298,249L300,248L300,247L300,246L300,246L301,245L301,245L305,245L315,250L316,250L335,237L336,237L339,237L340,237L343,236L349,232L353,229L353,228L354,227L354,227L354,226L353,225L353,224L353,224L353,224L353,223L354,223L358,220L362,220L375,222L376,223L380,225L384,225L384,225L384,226L384,226L384,227L385,227L386,228L387,228L394,226L398,225L405,221L407,219L409,218L410,216L411,215L412,214L413,209L414,206L414,204L415,202L418,199L420,198L421,199L421,200L421,201L421,202L421,205L421,207L419,211L419,212L420,213L420,215L421,219L424,222Z","cx":296,"cy":296},"FR":{"d":"M174,184L173,184L173,184L172,183L171,182L171,181L171,180L172,180L173,179L174,177L175,177L176,178L176,180L176,181L175,183ZM190,179L189,181L188,182L187,183L186,182L184,182L183,181L181,181L180,183L178,183L177,183L177,182L178,181L178,181L180,180L181,179L182,178L183,176L184,175L185,174L186,173L186,173L187,173L188,175L189,175L190,176L191,177ZM172,157L189,143L195,149L196,150L196,151L196,151L196,150L195,150L195,150L194,151L193,151L193,151L193,152L193,152L193,152L194,152L195,153L197,154L197,155L197,155L196,157L195,158L195,159L195,160L195,160L194,165L194,165L195,166L196,165L197,165L197,166L197,166L196,167L195,170L195,170L194,170L193,171L193,171L190,171L190,171L189,170L188,170L188,169L187,170L186,170L185,170L184,171L183,171L182,171L182,171L180,170L179,170L179,170L178,170L176,169L176,169L176,168L177,168L177,167L177,167L177,166L177,166L176,166L176,166L175,166L174,164L173,162ZM243,137L242,137L242,137L242,137L241,136L243,136L243,136L243,137ZM244,220L240,224L231,226L229,228L228,229L226,232L224,233L223,234L219,235L217,235L217,236L214,238L212,240L212,240L212,241L211,243L208,245L207,244L207,244L207,243L206,242L206,241L205,240L205,239L205,237L204,235L195,228L193,228L192,227L190,230L188,231L187,231L185,232L184,231L183,231L181,229L180,226L182,223L182,223L184,223L185,223L186,223L187,224L188,224L188,223L192,219L193,218L193,217L193,217L192,217L191,218L191,217L190,217L188,215L187,214L186,214L185,215L183,215L181,214L181,214L180,214L179,215L178,214L178,214L179,213L178,212L178,211L178,211L179,211L179,210L179,210L179,209L179,208L178,205L178,203L178,202L179,199L181,199L183,197L185,197L187,197L188,197L188,196L188,196L188,196L188,196L189,193L194,186L198,180L199,178L199,178L197,177L196,177L196,177L196,176L196,175L198,175L198,174L199,174L203,168L203,165L204,162L204,162L205,161L206,160L207,159L208,158L208,157L208,157L207,157L207,157L206,157L206,156L205,154L205,153L206,152L206,151L206,150L206,149L205,149L205,149L204,149L204,149L204,149L203,149L203,150L203,150L203,151L203,151L202,151L202,150L200,147L199,146L198,146L194,139L199,134L209,147L210,149L211,150L213,153L214,155L214,155L216,154L218,152L218,152L219,151L219,150L219,148L220,147L220,146L221,146L221,146L222,146L222,147L222,146L223,145L224,145L224,144L223,144L222,143L222,143L219,137L218,135L217,127L229,126L237,123L240,122L241,122L242,123L242,123L242,123L242,124L243,126L243,127L241,129L240,129L238,130L238,131L238,131L239,133L239,133L240,134L240,136L240,138L240,139L239,141L238,143L239,143L239,144L240,144L241,143L249,146L261,147L262,152L261,153L260,155L259,155L258,155L257,155L257,154L257,154L257,154L256,153L255,154L255,155L255,156L256,158L256,162L254,169L253,172L253,178L254,181L254,183L255,184L255,184L258,185L258,186L260,187L260,188L261,188L261,188L262,188L263,188L263,189L263,189L264,190L264,190L265,190L265,191L265,192L264,198L264,198L264,199L263,201L261,200L260,200L258,199L257,200L256,202L256,208L256,211L256,213L255,214L254,214L253,215L250,215Z","cx":220,"cy":184},"VD":{"d":"M189,143L194,139L198,146L199,146L200,147L202,150L202,151L203,151L203,151L203,150L203,150L203,149L204,149L204,149L204,149L205,149L205,149L206,149L206,150L206,151L206,152L205,153L205,154L206,156L206,157L207,157L207,157L208,157L208,157L208,158L207,159L206,160L205,161L204,162L204,162L203,165L203,168L199,174L198,174L198,175L196,175L196,176L196,177L196,177L197,177L199,178L199,178L198,180L194,186L189,193L188,196L188,196L188,196L188,196L188,197L187,197L185,197L183,197L181,199L179,199L178,202L178,203L178,205L179,208L179,209L179,210L179,210L179,211L178,211L178,211L178,212L179,213L178,214L178,214L179,215L180,214L181,214L181,214L183,215L185,215L186,214L187,214L188,215L190,217L191,217L191,218L192,217L193,217L193,217L193,218L192,219L188,223L188,224L187,224L186,223L185,223L184,223L182,223L182,223L180,226L181,229L183,231L184,231L185,232L187,231L188,231L190,230L192,227L193,228L195,228L204,235L205,237L205,239L205,240L206,241L206,242L207,243L207,244L207,244L208,245L211,243L212,241L212,240L212,240L214,238L217,236L217,235L219,235L223,234L224,233L226,232L228,229L229,228L231,226L240,224L244,220L245,222L245,223L245,223L246,224L246,225L246,226L246,228L246,230L245,231L244,234L243,235L243,235L243,236L243,239L243,241L242,242L241,244L239,245L238,246L239,248L239,249L239,251L239,252L238,258L239,259L241,261L242,261L243,262L243,263L242,264L242,265L242,269L240,271L237,274L237,275L238,278L237,279L235,282L233,285L230,288L229,289L225,294L220,297L214,300L213,298L211,296L208,291L199,274L198,272L197,269L196,267L194,267L192,266L191,264L191,262L192,261L192,260L191,258L189,255L187,254L186,255L179,253L176,253L175,251L174,249L172,248L149,242L139,242L130,244L117,252L112,254L107,254L102,255L98,260L93,265L90,270L89,273L90,274L83,276L76,270L75,269L78,263L77,261L76,257L73,255L66,251L65,250L67,248L67,247L67,245L67,244L67,243L66,242L66,241L66,240L67,239L68,237L74,228L79,221L78,220L75,217L75,214L77,212L97,193L108,187L109,186L113,181L118,179L120,177L122,175L122,173L122,170L121,169L120,167L120,166L120,165L122,158L123,156L124,155L127,155L134,155L136,154L137,154L139,152L146,148L151,146L153,145L157,141L166,136L167,139L166,141L167,142L168,143L169,144L169,146L169,147L169,149L170,150L170,151L172,157L173,162L174,164L175,166L176,166L176,166L177,166L177,166L177,167L177,167L177,168L176,168L176,169L176,169L178,170L179,170L179,170L180,170L182,171L182,171L183,171L184,171L185,170L186,170L187,170L188,169L188,170L189,170L190,171L190,171L193,171L193,171L194,170L195,170L195,170L196,167L197,166L197,166L197,165L196,165L195,166L194,165L194,165L195,160L195,160L195,159L195,158L196,157L197,155L197,155L197,154L195,153L194,152L193,152L193,152L193,152L193,151L193,151L194,151L195,150L195,150L196,150L196,151L196,151L196,150L195,149ZM190,179L191,177L190,176L189,175L188,175L187,173L186,173L186,173L185,174L184,175L183,176L182,178L181,179L180,180L178,181L178,181L177,182L177,183L178,183L180,183L181,181L183,181L184,182L186,182L187,183L188,182L189,181ZM174,184L175,183L176,181L176,180L176,178L175,177L174,177L173,179L172,180L171,180L171,181L171,182L172,183L173,184L173,184ZM199,134L211,125L217,127L218,135L219,137L222,143L222,143L223,144L224,144L224,145L223,145L222,146L222,147L222,146L221,146L221,146L220,146L220,147L219,148L219,150L219,151L218,152L218,152L216,154L214,155L214,155L213,153L211,150L210,149L209,147Z","cx":156,"cy":217}};

function mix(t: number): string {
  const a = [225, 245, 238];
  const b = [15, 110, 86];
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

// ── Données de l'observatoire (instantané registre du commerce / Zefix, 2026) ──
const TOTAL = 185545;

const FORMS = [
  { label: "Sàrl", count: 70649, color: "#0d9488", pct: 38.1 },
  { label: "SA", count: 57834, color: "#0ea5e9", pct: 31.2 },
  { label: "Raison individuelle", count: 46403, color: "#f59e0b", pct: 25.0 },
  { label: "Fondations", count: 4684, color: "#8b5cf6", pct: 2.5 },
  { label: "Associations", count: 4108, color: "#ec4899", pct: 2.2 },
  { label: "Coopératives", count: 1867, color: "#64748b", pct: 1.0 },
];

const CANTONS = [
  { code: "VD", name: "Vaud", count: 63316, tax: "14,00 %", slug: "vaud" },
  { code: "GE", name: "Genève", count: 51639, tax: "14,70 %", slug: "geneve" },
  { code: "VS", name: "Valais", count: 31770, tax: "12,03 %", slug: "valais" },
  { code: "FR", name: "Fribourg", count: 23587, tax: "13,87 %", slug: "fribourg" },
  { code: "NE", name: "Neuchâtel", count: 10539, tax: "13,57 %", slug: "neuchatel" },
  { code: "JU", name: "Jura", count: 4694, tax: "16,00 %", slug: "jura" },
];

const TAX_BARS = [
  { code: "VS", name: "Valais", rate: 12.03, best: true },
  { code: "NE", name: "Neuchâtel", rate: 13.57, best: false },
  { code: "FR", name: "Fribourg", rate: 13.87, best: false },
  { code: "VD", name: "Vaud", rate: 14.0, best: false },
  { code: "GE", name: "Genève", rate: 14.7, best: false },
  { code: "JU", name: "Jura", rate: 16.0, best: false },
];

const COMMUNES = [
  { name: "Genève", count: 23595, slug: "geneve-ge" },
  { name: "Lausanne", count: 9259, slug: "lausanne-vd" },
  { name: "Sion", count: 3812, slug: "sion-vs" },
  { name: "Fribourg", count: 3125, slug: "fribourg-fr" },
  { name: "Neuchâtel", count: 2927, slug: "neuchatel-ne" },
  { name: "Carouge", count: 2590, slug: "carouge-ge" },
  { name: "Nyon", count: 1973, slug: "nyon-vd" },
  { name: "Martigny", count: 1952, slug: "martigny-vs" },
  { name: "La Chaux-de-Fonds", count: 1830, slug: "la-chaux-de-fonds-ne" },
  { name: "Montreux", count: 1680, slug: "montreux-vd" },
  { name: "Lancy", count: 1658, slug: "lancy-ge" },
  { name: "Vernier", count: 1599, slug: "vernier-ge" },
];

export const metadata: Metadata = {
  title: "Observatoire romand des entreprises 2026 : statistiques par canton et forme juridique | NeoFidu",
  description:
    "Le tissu économique de Suisse romande en chiffres : 185'545 entreprises inscrites au registre du commerce, répartition par canton (VD, GE, VS, FR, NE, JU) et par forme juridique, fiscalité et carte de densité.",
  alternates: { canonical: "https://neofidu.ch/observatoire" },
  openGraph: {
    title: "Observatoire romand des entreprises | NeoFidu",
    description: "Statistiques du tissu économique romand : par canton, par forme juridique, fiscalité et carte de densité.",
  },
};

export default function ObservatoirePage() {
  const maxCanton = Math.max(...CANTONS.map((c) => c.count));
  const ranking = [...CANTONS].sort((a, b) => b.count - a.count);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto px-4 pt-28 pb-20">
          {/* HERO */}
          <section className="mb-10">
            <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">
              Données économiques · Suisse romande
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              L&apos;Observatoire romand des <span className="text-gradient">entreprises</span>
            </h1>
            <div className="bg-white rounded-2xl border shadow-sm p-6 max-w-4xl">
              <div className="flex flex-wrap items-end gap-x-5 gap-y-1 mb-5">
                <div className="text-4xl md:text-5xl font-bold text-primary leading-none">{nf(TOTAL)}</div>
                <div className="text-muted-foreground pb-1">
                  entreprises inscrites au registre du commerce dans les 6 cantons romands
                </div>
              </div>
              <div className="flex w-full h-8 rounded-lg overflow-hidden">
                {FORMS.map((f) => (
                  <div key={f.label} style={{ width: `${f.pct}%`, background: f.color }} title={`${f.label} : ${nf(f.count)}`} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
                {FORMS.map((f) => (
                  <span key={f.label} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: f.color }} />
                    {f.label} <strong className="font-medium">{nf(f.count)}</strong>
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary shrink-0" />
                <span><strong className="text-foreground font-medium">94 %</strong> du tissu romand : des Sàrl, des SA ou des raisons individuelles.</span>
              </p>
              <p className="mt-3 pt-3 border-t text-xs text-muted-foreground flex items-start gap-2">
                <UserPlus className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Les raisons individuelles sont comptées d&apos;après leur inscription au registre du commerce (Zefix) ; beaucoup d&apos;indépendants sous CHF 100&apos;000 de chiffre d&apos;affaires n&apos;y figurent pas.</span>
              </p>
            </div>
          </section>

          {/* FISCALITÉ — accroche conversion */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-primary/5 to-teal-50 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Votre société paie-t-elle trop d&apos;impôts ?</h2>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                En Suisse romande, l&apos;impôt sur le bénéfice 2026 va d&apos;environ <strong>12 % en Valais</strong> à <strong>16 % dans le Jura</strong>.
                À cela s&apos;ajoute la structure de votre société : un bon arbitrage salaire / dividende et une prévoyance optimisée peuvent réduire nettement la charge.
              </p>
              <div className="space-y-2 mb-6 max-w-2xl">
                {TAX_BARS.map((t) => (
                  <div key={t.code} className="flex items-center gap-3">
                    <span className="w-8 text-sm font-medium">{t.code}</span>
                    <span className="hidden sm:block w-24 text-sm text-muted-foreground">{t.name}</span>
                    <span className="flex-1 h-4 rounded-full bg-white overflow-hidden">
                      <span className="block h-full rounded-full" style={{ width: `${Math.round((t.rate / 16) * 100)}%`, background: t.best ? "#0f6e56" : "#9fbfb8" }} />
                    </span>
                    <span className="w-20 text-right text-sm font-medium">
                      {t.rate.toFixed(2).replace(".", ",")} %{t.best ? " ✓" : ""}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border p-5 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex-1 min-w-[220px]">
                  <div className="font-semibold">Payez-vous le bon prix pour votre comptabilité ?</div>
                  <div className="text-sm text-muted-foreground">Envoyez votre dernière facture de fiduciaire — en 48 h, on vous dit si vous pouvez payer moins, sans engagement.</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link href="/demande?type=comptabilite" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:opacity-90 transition">
                    Second avis gratuit <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground text-center">Gratuit · Confidentiel · Sous 48 h</span>
                </div>
              </div>
            </div>
          </section>

          {/* CARTE + CLASSEMENT */}
          <section className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-1">Densité par canton</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Toutes les formes inscrites au registre du commerce (raisons individuelles comprises).
              </p>
              <svg viewBox={CANTON_VIEWBOX} className="w-full h-auto" role="img" aria-label="Carte de la densité d'entreprises par canton romand">
                {CANTONS.map((c) => {
                  const g = CANTON_GEO[c.code];
                  if (!g) return null;
                  const t = c.count / maxCanton;
                  const textColor = t > 0.5 ? "#ffffff" : "#0f172a";
                  const subColor = t > 0.5 ? "#e2e8f0" : "#475569";
                  return (
                    <g key={c.code}>
                      <path d={g.d} fill={mix(t)} stroke="#ffffff" strokeWidth={1.5}>
                        <title>{`${c.name} — ${nf(c.count)} entreprises`}</title>
                      </path>
                      <text x={g.cx} y={g.cy} textAnchor="middle" fontSize="16" fontWeight="600" fill={textColor}>{c.code}</text>
                      <text x={g.cx} y={g.cy + 16} textAnchor="middle" fontSize="11" fill={subColor}>{nf(c.count)}</text>
                    </g>
                  );
                })}
              </svg>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span>Moins</span>
                <div className="h-2 flex-1 rounded-full" style={{ background: "linear-gradient(to right, #e1f5ee, #0f6e56)" }} />
                <span>Plus</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Classement des cantons</h2>
              <div className="space-y-3">
                {ranking.map((c) => {
                  const pct = Math.round((c.count / maxCanton) * 100);
                  return (
                    <div key={c.code} className="flex items-center gap-3">
                      <span className="w-8 text-sm font-medium">{c.code}</span>
                      <span className="hidden sm:block w-24 text-sm text-muted-foreground">{c.name}</span>
                      <span className="flex-1 h-3.5 rounded-full bg-secondary overflow-hidden">
                        <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="w-14 text-right text-sm font-medium">{nf(c.count)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* TOP COMMUNES */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-1">Top communes par nombre d&apos;entreprises</h2>
            <p className="text-muted-foreground mb-5">
              Communes romandes comptant le plus de sociétés inscrites (hors raisons individuelles) — cliquez pour ouvrir la page de la commune.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {COMMUNES.map((c) => (
                <Link key={c.slug} href={`/communes/${c.slug}`} className="flex items-center justify-between bg-white rounded-xl border px-4 py-3 shadow-sm hover:border-primary/30 transition">
                  <span className="text-primary font-medium">{c.name}</span>
                  <span className="text-sm text-muted-foreground">{nf(c.count)}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* CANTONS EN DÉTAIL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-1">Les cantons en détail</h2>
            <p className="text-muted-foreground mb-5">
              Entreprises (raisons individuelles comprises), impôt sur le bénéfice 2026 et accès à la fiscalité de chaque canton.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CANTONS.map((c) => (
                <Link key={c.code} href={`/cantons/${c.slug}`} className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {c.name}</span>
                    <span className="text-sm text-muted-foreground">{nf(c.count)}</span>
                  </div>
                  <div className="text-sm mb-3">Impôt sur le bénéfice : <strong>{c.tax}</strong></div>
                  <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Fiscalité {c.name} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* LIENS INTERNES */}
          <section className="mb-12">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="text-muted-foreground">Aller plus loin :</span>
              <Link href="/creation-entreprise" className="text-primary hover:underline">Créer une entreprise</Link>
              <Link href="/associations-fondations" className="text-primary hover:underline">Associations &amp; fondations</Link>
              <Link href="/blog/raison-individuelle-ou-sarl-quand-creer-structure" className="text-primary hover:underline">RI ou Sàrl ?</Link>
              <Link href="/communes" className="text-primary hover:underline">Explorer par commune</Link>
            </div>
          </section>

          {/* MÉTHODOLOGIE */}
          <section className="mb-12 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Méthodologie &amp; sources</h2>
            <div className="space-y-4 text-muted-foreground text-sm">
              <p className="flex items-start gap-3">
                <Database className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Chiffres établis à partir des données publiques du registre du commerce suisse (Zefix / LINDAS) pour les six cantons romands. Les taux d&apos;imposition du bénéfice 2026 sont indicatifs (source : comparatif cantonal 2026) ; la charge réelle dépend de la commune et du bénéfice.</span>
              </p>
              <p className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Cet observatoire présente uniquement des <strong>statistiques agrégées</strong>, dans le respect de la protection des données (LPD). Pour toute question : <a href="mailto:contact@neofidu.ch" className="text-primary underline">contact@neofidu.ch</a>.</span>
              </p>
            </div>
          </section>

          {/* CTA FINAL */}
          <section>
            <div className="bg-gradient-to-br from-primary/5 to-teal-50 rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Une fiduciaire qui vous fait payer le juste prix</h2>
              <p className="text-muted-foreground mb-6">
                Comptabilité, fiscalité, création d&apos;entreprise, associations &amp; fondations — 100 % en ligne, partout en Romandie.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/demande?type=comptabilite" className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:opacity-90 transition">
                  Second avis gratuit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/creation-entreprise" className="inline-flex items-center gap-2 bg-white border rounded-full px-6 py-3 font-medium hover:border-primary/40 transition">
                  Créer mon entreprise
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
