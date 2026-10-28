// Source unique des correspondances FR -> EN utilisées par les boutons de langue.
// Ajouter ici toute nouvelle page qui possède une version /en.

// Pages FR qui ont exactement la même adresse sous /en.
export const EN_TWIN_EXACT = new Set<string>([
  "/",
  "/associations-fondations",
  "/blog",
  "/cantons",
  "/communes",
  "/conditions-generales",
  "/contact",
  "/creation-entreprise",
  "/demande",
  "/entreprises",
  "/expats",
  "/faq",
  "/guide/deductions-fiscales",
  "/guide/getax",
  "/guide/vaudtax",
  "/independants",
  "/mentions-legales",
  "/observatoire",
  "/politique-confidentialite",
  "/second-avis",
  "/simulateur",
  "/simulateur/3eme-pilier",
  "/simulateur/baisse-loyer",
  "/simulateur/carte-impots",
  "/simulateur/gain-immobilier",
  "/simulateur/impots",
  "/simulateur/retraite",
  "/simulateur/salaire-net",
  "/simulateur/valeur-locative",
  "/suisses-de-letranger",
  "/suivi",
  "/tarifs",
]);

// Sections dont toutes les sous-pages existent aussi sous /en.
export const EN_TWIN_PREFIXES = ["/blog/", "/communes/", "/cantons/", "/guide/vaudtax/", "/guide/getax/"];

// Paires dont l'adresse diffère entre FR et EN.
const FR_TO_EN_SPECIAL: Record<string, string> = {
  "/dette-suisse": "/en/swiss-debt",
  "/suisses-etranger": "/en/expats",
};
const EN_TO_FR_SPECIAL: Record<string, string> = {
  "/en/swiss-debt": "/dette-suisse",
};

export function isEnglishPath(p: string | null | undefined): boolean {
  return p === "/en" || (p?.startsWith("/en/") ?? false);
}

/** Adresse anglaise d'une page FR, ou null si aucune version anglaise n'existe. */
export function toEnPath(p: string | null | undefined): string | null {
  if (!p || isEnglishPath(p)) return null;
  if (FR_TO_EN_SPECIAL[p]) return FR_TO_EN_SPECIAL[p];
  if (EN_TWIN_EXACT.has(p)) return p === "/" ? "/en" : "/en" + p;
  if (EN_TWIN_PREFIXES.some((prefix) => p.startsWith(prefix))) return "/en" + p;
  return null;
}

/** Adresse française d'une page EN. */
export function toFrPath(p: string): string {
  if (EN_TO_FR_SPECIAL[p]) return EN_TO_FR_SPECIAL[p];
  return p === "/en" ? "/" : p.replace(/^\/en/, "");
}

/** Cible du bouton de langue : la page jumelle, ou l'accueil de l'autre langue à défaut. */
export function languageToggleTarget(p: string | null | undefined): string {
  if (isEnglishPath(p)) return toFrPath(p as string);
  return toEnPath(p) ?? "/en";
}
