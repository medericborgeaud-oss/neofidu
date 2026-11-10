// src/lib/communes-fusionnees.ts
// Communes encore presentes dans la table Supabase "communes" mais qui n'existent plus
// (fusions entrees en vigueur avant la periode fiscale 2026). Elles sont exclues des
// listes, du sitemap et du simulateur, et leurs pages redirigent (301, voir next.config.js).
// Cible : la commune issue de la fusion si elle a une fiche, sinon la liste des communes.

export const COMMUNES_FUSIONNEES: Record<string, string> = {
  "auboranges-fr": "/communes/rue-fr",
  "chapelle-glane-fr": "/communes/rue-fr",
  "ecublens-fr-fr": "/communes/rue-fr",
  "montet-glane-fr": "/communes/ursy-fr",
  "ulmiz-fr": "/communes/gurmels-fr",
  "fetigny-fr": "/communes",
  "menieres-fr": "/communes",
  "grolley-fr": "/communes",
  "ponthaux-fr": "/communes",
  "enges-ne": "/communes",
  "hauterive-ne-ne": "/communes",
  "la-tene-ne": "/communes",
  "saint-blaise-ne": "/communes",
};

export const SLUGS_FUSIONNES = new Set(Object.keys(COMMUNES_FUSIONNEES));

export function isCommuneFusionnee(slug: string | null | undefined): boolean {
  return !!slug && SLUGS_FUSIONNES.has(slug);
}
