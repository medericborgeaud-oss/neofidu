// Guide "Remplir sa déclaration d'impôt genevoise avec GeTax".
// Pour ajouter une capture d'écran : déposer le fichier dans
// public/guides/getax/<taxYear>/ puis ajouter son nom dans availableScreenshots.
import type { GuideDefinition } from "../types";
import { avantDeCommencer } from "./chapters/01-avant-de-commencer";
import { situationPersonnelle } from "./chapters/02-situation-personnelle";
import { salaire } from "./chapters/03-salaire";
import { fraisProfessionnels } from "./chapters/04-frais-professionnels";
import { prevoyance } from "./chapters/05-prevoyance";
import { comptesTitres } from "./chapters/06-comptes-titres";
import { fortuneDettes } from "./chapters/07-fortune-dettes";
import { immeubles } from "./chapters/08-immeubles";
import { deductions } from "./chapters/09-deductions";
import { impotSource } from "./chapters/10-impot-source-tou";
import { verifierEnvoyer } from "./chapters/11-verifier-envoyer";
import { getaxPillarFr } from "./pillar-fr";
import { getaxPillarEn } from "./pillar-en";

export const getaxGuide: GuideDefinition = {
  slug: "getax",
  canton: "Genève",
  software: "GeTax",
  taxYear: 2026,
  publishedAt: "2026-10-28",
  updatedAt: "2026-10-28",
  availableScreenshots: new Set<string>([
    "00-mode-formulaire.webp",
    "01-identifiants.webp",
    "01-menu-fichier.webp",
    "02-enfant.webp",
    "02-bareme.webp",
    "03-salaire.webp",
    "04-frais-professionnels.webp",
    "05-pilier-3a.webp",
    "06-types-titres.webp",
    "06b-compte.webp",
    "08-valeur-locative.webp",
    "08b-entretien.webp",
    "09-assurance-maladie.webp",
    "09b-frais-medicaux-dons.webp",
    "09c-autres-deductions.webp",
    "11-justificatifs.webp",
    "11b-calcul-impot.webp",
    "11c-deposer.webp",
  ]),
  chapters: [
    avantDeCommencer,
    situationPersonnelle,
    salaire,
    fraisProfessionnels,
    prevoyance,
    comptesTitres,
    fortuneDettes,
    immeubles,
    deductions,
    impotSource,
    verifierEnvoyer,
  ],
  pillar: { fr: getaxPillarFr, en: getaxPillarEn },
  cantonName: { fr: "Canton de Genève", en: "Canton of Geneva" },
  ui: {
    fr: {
      pathLabel: "Dans GeTax",
      ctaText:
        "NeoFidu prépare et dépose votre déclaration genevoise pour vous, impôt à la source et TOU compris, avec une vérification des déductions oubliées.",
      disclaimer:
        "Ce guide est informatif et ne remplace pas un conseil personnalisé. Les montants proviennent des publications officielles de l'Administration fiscale cantonale (AFC) de Genève et de l'Administration fédérale des contributions. Les captures montrent GeTax 2025 avec des données fictives. En cas de doute, les instructions officielles de l'AFC font foi.",
    },
    en: {
      pathLabel: "In GeTax",
      ctaText:
        "NeoFidu prepares and files your Geneva tax return for you, including source tax and TOU cases, with a check for missed deductions. Service in English available.",
      disclaimer:
        "This guide is for information only and is not personalised advice. Amounts come from official publications of the Geneva cantonal tax administration (AFC) and the Swiss Federal Tax Administration. GeTax offers an English interface, but the return itself is French: we quote the French labels, followed by a translation, so you can find them on screen. Screenshots show GeTax 2025 with fictitious data. If in doubt, the official AFC instructions prevail.",
    },
  },
};
