// src/components/CommuneTaxEstimates.tsx
// Section "Combien d'impots paie-t-on a <commune> ?" des fiches communes (FR/EN).
// Composant serveur : chiffres pre-calcules (calculateur officiel AFC), aucun JS client.

import Link from "next/link";
import { Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PROFILS,
  PROFIL_LABELS,
  formatChf,
  rangFr,
  rankEn,
  type CommuneImpots,
} from "@/lib/commune-impots";

interface Props {
  lang: "fr" | "en";
  communeNom: string;
  communeSlug: string;
  cantonName: string;
  impots: CommuneImpots | null;
}

const ESTV_URL = "https://swisstaxcalculator.estv.admin.ch/";

export function CommuneTaxEstimates({ lang, communeNom, communeSlug, cantonName, impots }: Props) {
  const fr = lang === "fr";
  const simHref = `${fr ? "" : "/en"}/simulateur/impots?commune=${encodeURIComponent(communeSlug)}`;

  const cta = (
    <div className="bg-emerald-50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
      <div>
        <p className="text-sm font-medium text-emerald-800">
          {fr ? "Votre situation est différente ?" : "Your situation is different?"}
        </p>
        <p className="text-xs text-emerald-600">
          {fr ? `Simulateur gratuit avec les taux de ${communeNom}` : `Free simulator with ${communeNom} rates`}
        </p>
      </div>
      <Link href={simHref}>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm whitespace-nowrap">
          {fr ? "Simuler mes impôts" : "Simulate my taxes"}
        </Button>
      </Link>
    </div>
  );

  if (!impots) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {fr ? `Estimation fiscale à ${communeNom}` : `Tax estimate in ${communeNom}`}
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            {fr
              ? "L'impôt dépend de votre revenu, de votre situation familiale et de vos déductions."
              : "Tax depends on your income, family situation and deductions."}
          </p>
          {cta}
        </Card>
      </section>
    );
  }

  const ref = impots.profils.seul100;
  const n = impots.nbCommunesCanton;
  const lead = fr
    ? `En ${impots.annee}, une personne seule avec un salaire brut de CHF 100'000 paie environ CHF ${formatChf(ref.total)} d'impôt sur le revenu à ${communeNom} (impôts fédéral, cantonal et communal). ${communeNom} se classe ${rangFr(ref.rang)} sur ${n} communes du canton de ${cantonName} (1 = la moins imposée), pour une médiane cantonale de CHF ${formatChf(ref.medianeCanton)}.`
    : `In ${impots.annee}, a single person earning a gross salary of CHF 100,000 pays about CHF ${formatChf(ref.total, "en")} in income tax in ${communeNom} (federal, cantonal and municipal taxes). ${communeNom} ranks ${rankEn(ref.rang)} out of ${n} municipalities in the canton of ${cantonName} (1st = lowest tax), against a cantonal median of CHF ${formatChf(ref.medianeCanton, "en")}.`;

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            {fr
              ? `Combien d'impôts paie-t-on à ${communeNom} en ${impots.annee} ?`
              : `How much tax do you pay in ${communeNom} in ${impots.annee}?`}
          </h2>
        </div>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{lead}</p>

        {/* Desktop : tableau complet */}
        <table className="hidden sm:table w-full text-sm">
          <caption className="sr-only">
            {fr
              ? `Impôt sur le revenu ${impots.annee} à ${communeNom} par profil, en CHF`
              : `${impots.annee} income tax in ${communeNom} by profile, in CHF`}
          </caption>
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-2 pr-3 font-medium">{fr ? "Profil" : "Profile"}</th>
              <th className="py-2 px-2 font-medium text-right">{fr ? "Fédéral" : "Federal"}</th>
              <th className="py-2 px-2 font-medium text-right">Canton</th>
              <th className="py-2 px-2 font-medium text-right">{fr ? "Commune" : "Municipality"}</th>
              <th className="py-2 pl-2 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {PROFILS.map((p) => {
              const r = impots.profils[p];
              return (
                <tr key={p} className="border-b last:border-0 align-top">
                  <td className="py-2 pr-3 text-gray-700">{PROFIL_LABELS[p][lang]}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{formatChf(r.federal, lang)}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{formatChf(r.cantonal, lang)}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{formatChf(r.communal, lang)}</td>
                  <td className="py-2 pl-2 text-right tabular-nums font-semibold text-gray-900">
                    {formatChf(r.total, lang)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile : une ligne par profil, total en evidence */}
        <ul className="sm:hidden divide-y border-y">
          {PROFILS.map((p) => {
            const r = impots.profils[p];
            return (
              <li key={p} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-gray-700">{PROFIL_LABELS[p][lang]}</p>
                  <p className="text-sm font-semibold text-gray-900 tabular-nums whitespace-nowrap">
                    CHF {formatChf(r.total, lang)}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 tabular-nums">
                  {fr ? "Fédéral" : "Federal"} {formatChf(r.federal, lang)} · Canton {formatChf(r.cantonal, lang)} ·{" "}
                  {fr ? "Commune" : "Municipality"} {formatChf(r.communal, lang)}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="text-sm mt-4">
          <Link href={`${fr ? "" : "/en"}/barometre-fiscal`} className="text-blue-600 underline">
            {fr
              ? "Comparer avec les 657 communes romandes : baromètre fiscal 2026"
              : "Compare with all 657 French-speaking municipalities: 2026 tax barometer"}
          </Link>
        </p>
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          {fr ? (
            <>
              Montants annuels en CHF, période fiscale {impots.annee}. Impôt sur le revenu uniquement (sans impôt sur la
              fortune ni impôt ecclésiastique), déductions standard. Source :{" "}
              <a href={ESTV_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                calculateur fiscal de l&apos;Administration fédérale des contributions (AFC)
              </a>
              .
            </>
          ) : (
            <>
              Annual amounts in CHF, {impots.annee} tax period. Income tax only (no wealth tax or church tax), standard
              deductions. Source:{" "}
              <a href={ESTV_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                tax calculator of the Swiss Federal Tax Administration (FTA)
              </a>
              .
            </>
          )}
        </p>
        {cta}
      </Card>
    </section>
  );
}
