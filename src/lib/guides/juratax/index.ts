// Guide "Remplir sa déclaration d'impôt jurassienne avec JuraTax".
// Pour ajouter une capture d'écran : déposer le fichier dans
// public/guides/juratax/<taxYear>/ puis ajouter son nom dans availableScreenshots.
// Les blocs "screenshot" déjà présents dans les chapitres mais absents de la liste
// ne s'affichent pas : ce sont les emplacements prévus pour les captures à venir.
// Données fictives des captures : Jean Jurassien / Jeanne Jurassienne.
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
import { jurataxPillarFr } from "./pillar-fr";
import { jurataxPillarEn } from "./pillar-en";

export const jurataxGuide: GuideDefinition = {
  slug: "juratax",
  canton: "Jura",
  software: "JuraTax",
  taxYear: 2026,
  publishedAt: "2026-11-10",
  updatedAt: "2026-11-11",
  availableScreenshots: new Set<string>([
    "00-accueil.webp",
    "01-fenetre-principale.webp",
    "01-donnees-declaration.webp",
    "02-donnees-personnelles.webp",
    "02-enfants.webp",
    "02-fiche-enfant.webp",
    "02-observations.webp",
    "02-situation-personnelle.webp",
    "03-rentes.webp",
    "03-salaire.webp",
    "03-selection-revenus.webp",
    "04-deplacements.webp",
    "04-repas.webp",
    "04-sejour.webp",
    "04-selection-frais.webp",
    "04-transports-publics.webp",
    "04-autres-frais.webp",
    "04-formule-7.webp",
    "05-pilier-3a.webp",
    "06-actions.webp",
    "06-comptes.webp",
    "06-selection-titres.webp",
    "09-selection-deductions.webp",
    "06-releves-fiscaux.webp",
    "07-assurances-vie.webp",
    "07-etat-des-dettes.webp",
    "07-selection-dettes.webp",
    "07-selection-fortune.webp",
    "08-formule-4.webp",
    "08-frais-entretien.webp",
    "08-selection-rendements.webp",
    "09-deductions-forfaitaires.webp",
    "11-calcul-impot.webp",
    "11-fin.webp",
    "11-revenu-imposable.webp",
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
  pillar: { fr: jurataxPillarFr, en: jurataxPillarEn },
  cantonName: { fr: "République et Canton du Jura", en: "Republic and Canton of Jura" },
  ui: {
    fr: {
      pathLabel: "Dans JuraTax",
      ctaText:
        "NeoFidu prépare et transmet votre déclaration jurassienne pour vous, immeubles, succession non partagée et taxation ordinaire ultérieure compris, avec une vérification des déductions oubliées.",
      disclaimer:
        "Ce guide est informatif et ne remplace pas un conseil personnalisé. Les montants proviennent du Guide général 2025 du Service des contributions de la République et Canton du Jura, de ses formules officielles et de la feuille cantonale Jura de l'Administration fédérale des contributions (état février 2026), qui indique que les montants indexés restent inchangés pour la période fiscale 2026. Les captures montrent JuraTax 2025 avec des données fictives. En cas de doute, le guide général du Service des contributions fait foi.",
    },
    en: {
      pathLabel: "In JuraTax",
      ctaText:
        "NeoFidu prepares and files your Jura tax return for you, including property, undivided estates and subsequent ordinary assessment (TOU) cases, with a check for missed deductions. Service in English available.",
      disclaimer:
        "This guide is for information only and is not personalised advice. Amounts come from the 2025 general guide (« Guide général ») of the Jura cantonal tax service (Service des contributions), its official forms and the Swiss Federal Tax Administration's Jura cantonal sheet (February 2026), which states that indexed amounts remain unchanged for the 2026 tax period. JuraTax is not available in English: we quote the French labels, followed by a translation, so you can find them on screen. Screenshots show JuraTax 2025 with fictitious data. If in doubt, the tax service's general guide prevails.",
    },
  },
};
