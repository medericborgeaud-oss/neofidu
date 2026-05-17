import Link from "next/link";
import { FileText, Calculator, Briefcase, Receipt, Scale, Building2 } from "lucide-react";

interface RelatedArticlesProps {
  canton: string;
  legalForm: string;
  city: string;
}

const ARTICLES: Record<string, { title: string; description: string; href: string; icon: string }[]> = {
  cantonVD: [
    { title: "Coefficient d'impôt communal dans le canton de Vaud", description: "Comprendre le multiplicateur communal et son impact sur votre charge fiscale.", href: "/observatoire", icon: "calculator" },
    { title: "Déclaration d'impôts à Vaud : guide complet", description: "Délais, déductions et optimisations fiscales pour les contribuables vaudois.", href: "/observatoire", icon: "receipt" },
  ],
  cantonGE: [
    { title: "Impôts à Genève : barèmes et particularités", description: "Tout savoir sur la fiscalité genevoise, le quasi-résident et le bouclier fiscal.", href: "/observatoire", icon: "calculator" },
    { title: "Déclaration d'impôts à Genève", description: "Guide pratique pour remplir votre déclaration GeTax.", href: "/observatoire", icon: "receipt" },
  ],
  cantonVS: [
    { title: "Fiscalité en Valais : ce qu'il faut savoir", description: "Double barème cantonal et communal, déductions spécifiques au canton.", href: "/observatoire", icon: "calculator" },
  ],
  cantonFR: [
    { title: "Déclaration d'impôts à Fribourg", description: "Utilisation de FriTax, délais et spécificités fribourgeoises.", href: "/observatoire", icon: "receipt" },
  ],
  cantonNE: [
    { title: "Fiscalité à Neuchâtel", description: "Guide TaxMe NE et particularités neuchâteloises.", href: "/observatoire", icon: "receipt" },
  ],
  cantonJU: [
    { title: "Impôts dans le Jura", description: "JuraTax, déductions sociales et spécificités jurassiennes.", href: "/observatoire", icon: "receipt" },
  ],
  RI: [
    { title: "Créer une entreprise individuelle en Suisse", description: "Obligations légales, inscription au RC et comptabilité pour indépendants.", href: "/observatoire", icon: "briefcase" },
    { title: "Comptabilité pour indépendants : simplifiée ou partie double ?", description: "Quelle méthode comptable choisir selon votre chiffre d'affaires.", href: "/observatoire", icon: "scale" },
  ],
  Sarl: [
    { title: "Créer et gérer une Sàrl en Suisse romande", description: "Capital, organes, obligations comptables et fiscales de la Sàrl.", href: "/observatoire", icon: "building" },
    { title: "Comptabilité d'une Sàrl : obligations et bonnes pratiques", description: "Bouclement annuel, révision et déclaration fiscale pour votre société.", href: "/observatoire", icon: "briefcase" },
  ],
  SA: [
    { title: "Obligations comptables d'une SA en Suisse", description: "Révision, rapport annuel et spécificités de la société anonyme.", href: "/observatoire", icon: "building" },
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
  const articles: typeof ARTICLES.generic = [];
  const cantonKey = `canton${canton}`;
  if (ARTICLES[cantonKey]) articles.push(...ARTICLES[cantonKey]);
  if (ARTICLES[legalForm]) articles.push(...ARTICLES[legalForm]);
  articles.push(...ARTICLES.generic);
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.title)) return false;
    seen.add(a.title);
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
        Articles liés
      </div>
      <div className="space-y-2">
        {articles.map((article, i) => (
          <Link
            key={i}
            href={article.href}
            className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
          >
            <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${ICON_COLORS[article.icon] || "bg-gray-50 text-gray-500"}`}>
              {ICON_MAP[article.icon] || <FileText className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                {article.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                {article.description}
              </p>
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
