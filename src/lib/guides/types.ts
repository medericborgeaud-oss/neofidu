// Types partagés pour les guides "remplir sa déclaration d'impôt" canton par canton.
// Un guide = une page pilier + des chapitres. Chaque chapitre existe en FR et en EN.
// Le texte accepte un mini-markdown : **gras** et [lien](/chemin). Rien d'autre.

export type GuideLocale = "fr" | "en";

export type GuideBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  /** Chemin de clics dans le logiciel, ex. ["Activités salariées (codes 100 à 120)", "Afficher", "Principale, accessoire..."] */
  | { type: "path"; items: string[] }
  | { type: "callout"; tone: "tip" | "warning" | "info"; title?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  /** Capture d'écran : rendue uniquement si `file` figure dans AVAILABLE_SCREENSHOTS du guide. */
  | { type: "screenshot"; file: string; alt: string; caption?: string };

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideChapterContent {
  /** Titre H1 affiché */
  title: string;
  /** Titre court pour la navigation et le fil d'Ariane */
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Réponse courte en tête de page (bloc "En bref"), pensée pour Google et les LLM */
  summary: string[];
  blocks: GuideBlock[];
  faq: GuideFaq[];
  keywords: string[];
}

export interface GuideChapter {
  slug: string;
  /** Temps de lecture estimé en minutes */
  readTime: number;
  fr: GuideChapterContent;
  en: GuideChapterContent;
}

export interface GuideDefinition {
  /** Segment d'URL : /guide/<slug> */
  slug: string;
  canton: string;
  software: string;
  /** Période fiscale couverte par les chiffres */
  taxYear: number;
  /** Date ISO de dernière mise à jour éditoriale */
  updatedAt: string;
  publishedAt: string;
  pillar: { fr: GuideChapterContent; en: GuideChapterContent };
  chapters: GuideChapter[];
  /** Fichiers présents dans /public/guides/<slug>/ */
  availableScreenshots: Set<string>;
}
