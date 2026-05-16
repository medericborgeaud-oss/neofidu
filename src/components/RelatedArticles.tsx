import Link from "next/link";
import { FileText, Calculator, Briefcase, Receipt, Scale, Building2 } from "lucide-react";

interface RelatedArticlesProps {
  canton: string;
  legalForm: string;
  city: string;
}

const ARTICLES: Record<string, { title: string; description: string; href: string; icon: string }[]> = {
  cantonVD: [
    { title: "Coefficient d'imp\u00f4t communal dans le canton de Vaud", description: "Comprendre le multiplicateur communal et son impact sur votre charge fiscale.", href: "/blog/coefficient-impot-communal-vaud", icon: "calculator" },
    { title: "D\u00e9claration d'imp\u00f4ts \u00e0 Vaud : guide complet", description: "D\u00e9lais, d\u00e9ductions et optimisations fiscales pour les contribuables vaudois.", href: "/vaud", icon: "receipt" },
  ],
  cantonGE: [
    { title: "Imp\u00f4ts \u00e0 Gen\u00e8ve : bar\u00e8mes et particularit\u00e9s", description: "Tout savoir sur la fiscalit\u00e9 genevoise, le quasi-r\u00e9sident et le bouclier fiscal.", href: "/geneve", icon: "calculator" },
    { title: "D\u00e9claration d'imp\u00f4ts \u00e0 Gen\u00e8ve", description: "Guide pratique pour remplir votre d\u00e9claration GeTax.", href: "/geneve", icon: "receipt" },
  ],
  cantonVS: [
    { title: "Fiscalit\u00e9 en Valais : ce qu'il faut savoir", description: "Double bar\u00e8me cantonal et communal, d\u00e9ductions sp\u00e9cifiques au canton.", href: "/valais", icon: "calculator" },
  ],
  cantonFR: [
    { title: "D\u00e9claration d'imp\u00f4ts \u00e0 Fribourg", description: "Utilisation de FriTax, d\u00e9lais et sp\u00e9cificit\u00e9s fribourgeoises.", href: "/fribourg", icon: "receipt" },
  ],
  cantonNE: [
    { title: "Fiscalit\u00e9 \u00e0 Neuch\u00e2tel", description: "Guide TaxMe NE et particularit\u00e9s neuch\u00e2teloises.", href: "/neuchatel", icon: "receipt" },
  ],
  cantonJU: [
    { title: "Imp\u00f4ts dans le Jura", description: "JuraTax, d\u00e9ductions sociales et sp\u00e9cificit\u00e9s jurassiennes.", href: "/jura", icon: "receipt" },
  ],
  RI: [
    { title: "Cr\u00e9er une entreprise individuelle en Suisse", description: "Obligations l\u00e9gales, inscription au RC et comptabilit\u00e9 pour ind\u00e9pendants.", href: "/independants", icon: "briefcase" },
    { title: "Comptabilit\u00e9 pour ind\u00e9pendants : simplifi\u00e9e ou partie double ?", description: "Quelle m\u00e9thode comptable choisir selon votre chiffre d'affaires.", href: "/independants", icon: "scale" },
  ],
  Sarl: [
    { title: "Cr\u00e9er et g\u00e9rer une S\u00e0rl en Suisse romande", description: "Capital, organes, obligations comptables et fiscales de la S\u00e0rl.", href: "/sarl", icon: "building" },
    { title: "Comptabilit\u00e9 d'une S\u00e0rl : obligations et bonnes pratiques", description: "Bouclement annuel, r\u00e9vision et d\u00e9claration fiscale pour votre soci\u00e9t\u00e9.", href: "/sarl", icon: "briefcase" },
  ],
  SA: [
    { title: "Obligations comptables d'une SA en Suisse", description: "R\u00e9vision, rapport annuel et sp\u00e9cificit\u00e9s de la soci\u00e9t\u00e9 anonyme.", href: "/sa", icon: "building" },
  ],
  generic: [
    { title: "Fiduciaire en ligne : pourquoi choisir NeoFidu ?", description: "Tarifs transparents, gestion digitale et expertise romande.", href: "/", icon: "filetext" },
  ],
};

const ICON_MAP: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5" />,
  receipt: <Receipt className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  scale: <Scale className="w-5 h-5" />,
  building: <Building2 className="w-5 h-5" />,
  filetext: <FileText className="w-5 h-5" />,
};

const ICON_COLORS: Record<string, string> = {
  calculator: "bg-violet-50 text-violet-600",
  receipt: "bg-amber-50 text-amber-600",
  briefcase: "bg-emerald-50 text-emerald-600",
  scale: "bg-blue-50 text-blue-600",
  building: "bg-rose-50 text-rose-600",
  filetext: "bg-teal-50 text-teal-600",
};

function getArticlesForCompany(canton: string, legalForm: string) {
  const articles: { title: string; description: string; href: string; icon: string }[] = [];
  const cantonKey = `canton${canton}`;
  if (ARTICLES[cantonKey]) articles.push(...ARTICLES[cantonKey]);
  if (ARTICLES[legalForm]) articles.push(...ARTICLES[legalForm]);
  articles.push(...ARTICLES.generic);
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.href)) return false;
    seen.add(a.href);
    return true;
  }).slice(0, 3);
}

export default function RelatedArticles({ canton, legalForm, city }: RelatedArticlesProps) {
  const articles = getArticlesForCompany(canton, legalForm);
  if (articles.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
        <FileText className="w-3 h-3" />
        Articles li\u00e9s
      </div>
      <div className="space-y-2">
        {articles.map((article, i) => (
          <Link key={i} href={article.href}
            className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_COLORS[article.icon] || "bg-gray-50 text-gray-500"}`}>
              {ICON_MAP[article.icon] || <FileText className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                {article.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{article.description}</p>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
  }
