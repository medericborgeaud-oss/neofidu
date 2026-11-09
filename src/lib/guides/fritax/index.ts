// Guide "Remplir sa déclaration d'impôt fribourgeoise avec FriTax".
// Pour ajouter une capture d'écran : déposer le fichier dans
// public/guides/fritax/<taxYear>/ puis ajouter son nom dans availableScreenshots.
// Les blocs "screenshot" déjà présents dans les chapitres mais absents de la liste
// ne s'affichent pas : ce sont les emplacements prévus pour les captures à venir.
// Données fictives des captures : Jean Fribourgeois / Jeanne Fribourgeoise.
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
import { fritaxPillarFr } from "./pillar-fr";
import { fritaxPillarEn } from "./pillar-en";

export const fritaxGuide: GuideDefinition = {
  slug: "fritax",
  canton: "Fribourg",
  software: "FriTax",
  taxYear: 2026,
  publishedAt: "2026-11-07",
  updatedAt: "2026-11-09",
  availableScreenshots: new Set<string>([
    "00-accueil.webp",
    "01-assistant.webp",
    "01-code-fritax.webp",
    "01-formulaires.webp",
    "01-import-annee-precedente.webp",
    "01-import-fichier.webp",
    "01-numero-chapitre.webp",
    "01-type-declaration.webp",
    "02-enfants.webp",
    "02-fiche-enfant.webp",
    "02-situation-personnelle.webp",
    "03-salaire.webp",
    "04-annexe03-page2.webp",
    "04-annexe03-transport.webp",
    "05-pilier-3a.webp",
    "05-prevoyance.webp",
    "06-da1-rus.webp",
    "06-e-releve.webp",
    "06-etat-des-titres.webp",
    "06-liste-des-cours.webp",
    "07-assurances.webp",
    "07-etat-des-dettes.webp",
    "08-etat-des-immeubles.webp",
    "08-frais-entretien.webp",
    "09-frais-de-garde.webp",
    "09-frais-medicaux-dons.webp",
    "09-primes-assurance.webp",
    "11-calcul-impot.webp",
    "11-envoi-electronique.webp",
    "11-pieces-justificatives.webp",
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
  pillar: { fr: fritaxPillarFr, en: fritaxPillarEn },
  cantonName: { fr: "Canton de Fribourg", en: "Canton of Fribourg" },
  ui: {
    fr: {
      pathLabel: "Dans FriTax",
      ctaText:
        "NeoFidu prépare et transmet votre déclaration fribourgeoise pour vous, immeubles et taxation ordinaire ultérieure compris, avec une vérification des déductions oubliées. Service en français et en allemand.",
      disclaimer:
        "Ce guide est informatif et ne remplace pas un conseil personnalisé. Les montants proviennent des publications officielles du Service cantonal des contributions (SCC) du canton de Fribourg et de l'Administration fédérale des contributions. Les captures montrent FriTax 2025 avec des données fictives. En cas de doute, les instructions générales du SCC font foi.",
    },
    en: {
      pathLabel: "In FriTax",
      ctaText:
        "NeoFidu prepares and files your Fribourg tax return for you, including property and subsequent ordinary assessment (TOU) cases, with a check for missed deductions. Service in English available.",
      disclaimer:
        "This guide is for information only and is not personalised advice. Amounts come from official publications of the Fribourg cantonal tax service (SCC) and the Swiss Federal Tax Administration. FriTax is available in French and German only: we quote the French labels, followed by a translation, so you can find them on screen. Screenshots show FriTax 2025 with fictitious data. If in doubt, the SCC's general instructions prevail.",
    },
  },
};
