"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calculator,
  Home,
  ArrowRight,
  CreditCard,
} from "lucide-react";

export function Pricing() {
  return (
    <section id="tarifs" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Nos tarifs
          </h2>
          <p className="text-lg text-gray-600">
            Transparents, sans surprise. Tous les détails sur notre page dédiée.
          </p>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Déclaration d'impôts */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-emerald-100">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5">
              <FileText className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Déclaration d&apos;impôts
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Particuliers &amp; indépendants
            </p>
            <p className="text-3xl font-bold text-emerald-600 mb-1">
              dès CHF 50.-
            </p>
            <p className="text-xs text-gray-400 mb-6">TTC • 3 formules disponibles</p>
            <Link href="/demande">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                Déposer une demande
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          {/* Comptabilité */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-emerald-100">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Calculator className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Comptabilité
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              RI, Sàrl, SA
            </p>
            <p className="text-3xl font-bold text-emerald-600 mb-1">
              dès CHF 500.-
            </p>
            <p className="text-xs text-gray-400 mb-6">HT/an • Indépendants &amp; PME</p>
            <Link href="/demande">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                Déposer une demande
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          {/* Gérance immobilière */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-100">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Home className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Gérance immobilière
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Vaud &amp; Valais
            </p>
            <p className="text-3xl font-bold text-orange-500 mb-1">
              Sur devis
            </p>
            <p className="text-xs text-gray-400 mb-6">Gestion locative &amp; technique</p>
            <Link href="/contact">
              <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                Nous contacter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Link to full pricing page + payment methods */}
        <div className="text-center space-y-4">
          <Link
            href="/tarifs"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-lg transition-colors"
          >
            Voir tous nos tarifs en détail
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>

          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CreditCard className="w-4 h-4" />
              <span>Visa / Mastercard</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-400">PayPal</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-400">Klarna</span>
          </div>
        </div>
      </div>
    </section>
  );
}
