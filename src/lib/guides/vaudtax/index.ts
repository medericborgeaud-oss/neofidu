// Guide "Remplir sa déclaration d'impôt vaudoise avec VaudTax".
// Pour ajouter une capture d'écran : déposer le fichier dans
// public/guides/vaudtax/<taxYear>/ puis ajouter son nom dans availableScreenshots.
import type { GuideDefinition } from "../types";
import { avantDeCommencer } from "./chapters/01-avant-de-commencer";
import { situationPersonnelle } from "./chapters/02-situation-personnelle";
import { salaire } from "./chapters/03-salaire";
import { fraisProfessionnels } from "./chapters/04-frais-professionnels";
import { assurancesPrevoyance } from "./chapters/05-assurances-prevoyance";
import { comptesTitres } from "./chapters/06-comptes-titres";
import { fortuneDettes } from "./chapters/07-fortune-dettes";
import { logement } from "./chapters/08-logement";
import { deductionsFamille } from "./chapters/09-deductions-famille";
import { autresDeductions } from "./chapters/10-autres-deductions";
import { verifierEnvoyer } from "./chapters/11-verifier-envoyer";
import { vaudtaxPillarFr } from "./pillar-fr";
import { vaudtaxPillarEn } from "./pillar-en";

export const vaudtaxGuide: GuideDefinition = {
  slug: "vaudtax",
  canton: "Vaud",
  software: "VaudTax",
  taxYear: 2026,
  publishedAt: "2026-10-28",
  updatedAt: "2026-10-28",
  availableScreenshots: new Set<string>([
    "00-vue-ensemble.webp",
    "00-mode-saisie.webp",
    "01-connexion.webp",
    "02-enfants.webp",
    "03-certificat-salaire.webp",
    "04-frais-professionnels.webp",
    "05-pilier-3a.webp",
    "06-etat-des-titres.webp",
    "06b-compte-solde.webp",
    "08-immeuble.webp",
    "11-outils.webp",
  ]),
  chapters: [
    avantDeCommencer,
    situationPersonnelle,
    salaire,
    fraisProfessionnels,
    assurancesPrevoyance,
    comptesTitres,
    fortuneDettes,
    logement,
    deductionsFamille,
    autresDeductions,
    verifierEnvoyer,
  ],
  pillar: { fr: vaudtaxPillarFr, en: vaudtaxPillarEn },
  cantonName: { fr: "Canton de Vaud", en: "Canton of Vaud" },
  ui: {
    fr: {
      pathLabel: "Dans VaudTax",
      ctaText:
        "NeoFidu prépare et dépose votre déclaration vaudoise pour vous, avec une vérification des déductions oubliées.",
      disclaimer:
        "Ce guide est informatif et ne remplace pas un conseil personnalisé. Les montants proviennent des publications officielles de l'Administration cantonale des impôts (ACI) du canton de Vaud. En cas de doute, les instructions officielles de l'ACI font foi.",
    },
    en: {
      pathLabel: "In VaudTax",
      ctaText:
        "NeoFidu prepares and files your Vaud tax return for you, including a check for missed deductions. Service in English available.",
      disclaimer:
        "This guide is for information only and is not personalised advice. Amounts come from official publications of the Vaud cantonal tax administration (ACI). VaudTax itself is in French: we quote the French labels so you can find them on screen. If in doubt, the official ACI instructions prevail.",
    },
  },
};
