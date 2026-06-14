"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

interface CostSimulatorProps {
  companyName: string;
  legalForm: "RI" | "Sarl" | "SA" | string;
  formLabel: string;
}

const PRICING: Record<string, {
  base: [number, number];
  empCost: [number, number];
  txPer50: [number, number];
  tvaSurcharge: [number, number];
  fiscalCost: [number, number];
}> = {
  RI:   { base: [1300, 1700],   empCost: [0, 0],       txPer50: [200, 350],   tvaSurcharge: [400, 650],   fiscalCost: [250, 450] },
  Sarl: { base: [1900, 2700],  empCost: [250, 450],   txPer50: [250, 450],   tvaSurcharge: [450, 750],   fiscalCost: [450, 750] },
  SA:   { base: [2700, 4000],  empCost: [350, 650],   txPer50: [350, 550],   tvaSurcharge: [550, 950],   fiscalCost: [650, 1100] },
};

function formatCHF(n: number): string {
  return n.toLocaleString("fr-CH").replace(/\s/g, "'");
}

export default function CostSimulator({ companyName, legalForm, formLabel }: CostSimulatorProps) {
  const form = (legalForm === "RI" || legalForm === "Sarl" || legalForm === "SA") ? legalForm : "SA";
  const isRI = form === "RI";

  const [employees, setEmployees] = useState(isRI ? 0 : 3);
  const [transactions, setTransactions] = useState(50);
  const [tva, setTva] = useState(true);
  const [fiscal, setFiscal] = useState(true);

  const maxEmployees = isRI ? 0 : 10;

  const { low, high } = useMemo(() => {
    const p = PRICING[form];
    const txBlocks = Math.floor(transactions / 50);

    let low = p.base[0] + employees * p.empCost[0] + txBlocks * p.txPer50[0];
    let high = p.base[1] + employees * p.empCost[1] + txBlocks * p.txPer50[1];

    if (tva) {
      low += p.tvaSurcharge[0];
      high += p.tvaSurcharge[1];
    }
    if (fiscal) {
      low += p.fiscalCost[0];
      high += p.fiscalCost[1];
    }

    // Arrondir aux centaines
    low = Math.round(low / 100) * 100;
    high = Math.round(high / 100) * 100;

    return { low, high };
  }, [form, employees, transactions, tva, fiscal]);

  const services = [
    "Comptabilité",
    ...(tva ? ["TVA"] : []),
    ...(fiscal ? ["Déclaration fiscale"] : []),
  ].join(" · ");

  const devisUrl = `/demande?type=comptabilite&forme=${encodeURIComponent(form)}&societe=${encodeURIComponent(companyName)}`;

  return (
    <div className="border-2 border-emerald-500 rounded-xl p-5 bg-white">
      {/* Titre */}
      <div className="flex items-start gap-2 mb-4">
        <Calculator className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
        <h3 className="text-sm font-medium text-emerald-700 leading-snug">
          Combien coûte la comptabilité pour une {formLabel} de cette taille ?
        </h3>
      </div>

      {/* Forme juridique */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 block mb-1">Forme juridique</label>
        <div className="text-sm font-medium text-emerald-700 bg-emerald-50 rounded-md px-3 py-1.5 inline-block">
          {formLabel}
        </div>
      </div>

      {/* Slider employés */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs text-gray-500">Employés</label>
          <span className="text-xs font-medium text-gray-900">{employees}</span>
        </div>
        <input
          type="range"
          min={0}
          max={maxEmployees}
          value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          disabled={isRI}
          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed"
        />
        {isRI && (
          <p className="text-[10px] text-gray-400 mt-0.5">Pas d&apos;employé pour une RI</p>
        )}
      </div>

      {/* Slider transactions */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs text-gray-500">Transactions / mois</label>
          <span className="text-xs font-medium text-gray-900">{transactions}</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          step={10}
          value={transactions}
          onChange={(e) => setTransactions(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      {/* Séparateur */}
      <div className="border-t border-gray-100 my-3" />

      {/* Checkboxes */}
      <div className="space-y-2 mb-4">
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={tva}
            onChange={(e) => setTva(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
          />
          TVA
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={fiscal}
            onChange={(e) => setFiscal(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
          />
          Déclaration fiscale
        </label>
      </div>

      {/* Résultat */}
      <div className="bg-emerald-50 rounded-lg p-4 text-center mb-4">
        <p className="text-xs text-gray-500 mb-1">Prix moyen du marché romand</p>
        <p className="text-xl font-semibold text-gray-900">
          CHF {formatCHF(low)} – {formatCHF(high)}
          <span className="text-sm font-normal text-gray-500 ml-1">/ an</span>
        </p>
        <p className="text-[11px] text-gray-400 mt-1">{services}</p>
      </div>

      <p className="text-[11px] text-gray-400 text-center mb-4">Estimation générique à titre indicatif, basée sur des hypothèses ajustables.</p>

      {/* CTA */}
      <div className="bg-emerald-500 rounded-lg p-4 text-center">
        <p className="text-[15px] font-medium text-white mb-1">
          Pourquoi payer le prix du marché ?
        </p>
        <p className="text-xs text-emerald-100 mb-3">
          100% digital = des coûts maîtrisés.
        </p>
        <Link
          href={devisUrl}
          className="inline-block bg-white/10 border-2 border-white text-white font-semibold text-sm px-6 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          Devis gratuit
        </Link>
      </div>
    </div>
  );
}
