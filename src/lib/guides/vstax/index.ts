// Guide "Remplir sa déclaration d'impôt valaisanne avec VSTax".
// Pour ajouter une capture d'écran : déposer le fichier dans
// public/guides/vstax/<taxYear>/ puis ajouter son nom dans availableScreenshots.
// Les blocs "screenshot" déjà présents dans les chapitres mais absents de la liste
// ne s'affichent pas : ce sont les emplacements prévus pour les captures à venir.
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
import { vstaxPillarFr } from "./pillar-fr";
import { vstaxPillarEn } from "./pillar-en";

export const vstaxGuide: GuideDefinition = {
  slug: "vstax",
  canton: "Valais",
  software: "VSTax",
  taxYear: 2026,
  publishedAt: "2026-11-01",
  updatedAt: "2026-11-01",
  availableScreenshots: new Set<string>([
    "00-accueil.webp",
    "01-type-declaration.webp",
    "01-donnees-personnelles.webp",
    "02-enfants.webp",
    "03-annexe5-salaires.webp",
    "04-frais-professionnels.webp",
    "05-prevoyance.webp",
    "06-etat-des-titres.webp",
    "07-etat-des-dettes.webp",
    "08-immeubles.webp",
    "09-autres-deductions.webp",
    "11-menu-outils.webp",
    "01-menu-fichier.webp",
    "03-rentes-annexe1.webp",
    "03-page2-revenus.webp",
    "05-prestations-capital.webp",
    "05-chiffre7.webp",
    "06-saisir-titre.webp",
    "06-da1.webp",
    "07-page4-actifs.webp",
    "07-page4-passifs.webp",
    "08-immeubles-rendement.webp",
    "08-frais-entretien.webp",
    "09-page3-deductions.webp",
    "09-ifd.webp",
    "11-calcul-impot.webp",
    "11-ajouter-justificatif.webp",
    "11-justificatifs-zone.webp",
    "11-vstax-qr.webp",
    "11-depot-etape1.webp",
    "11-menu-affichage.webp",
    "11-validation.webp",
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
  pillar: { fr: vstaxPillarFr, en: vstaxPillarEn },
  cantonName: { fr: "Canton du Valais", en: "Canton of Valais" },
  ui: {
    fr: {
      pathLabel: "Dans VSTax",
      ctaText:
        "NeoFidu prépare et transmet votre déclaration valaisanne pour vous, résidences secondaires et impôt à la source compris, avec une vérification des déductions oubliées.",
      disclaimer:
        "Ce guide est informatif et ne remplace pas un conseil personnalisé. Les montants proviennent des publications officielles du Service cantonal des contributions (SCC) du Valais et de l'Administration fédérale des contributions. Les captures montrent VSTax 2025 avec des données fictives. En cas de doute, le guide officiel du SCC fait foi.",
    },
    en: {
      pathLabel: "In VSTax",
      ctaText:
        "NeoFidu prepares and files your Valais tax return for you, including holiday homes and source tax cases, with a check for missed deductions. Service in English available.",
      disclaimer:
        "This guide is for information only and is not personalised advice. Amounts come from official publications of the Valais cantonal tax service (SCC) and the Swiss Federal Tax Administration. VSTax is only available in French and German: we quote the French labels, followed by a translation, so you can find them on screen. Screenshots show VSTax 2025 with fictitious data. If in doubt, the official SCC guide prevails.",
    },
  },
};
