"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SwissTaxMap } from "@/components/SwissTaxMap";
import { SimulatorInternalLinks } from "@/components/SimulatorInternalLinks";
import { MapPin, ArrowRight, Info, TrendingDown, Building, Users, Calculator } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function CarteImpotsPageClient() {
  const { t, isEnglish } = useLanguage();

  const cantonRankings = [
    { name: isEnglish ? "Zug" : "Zoug", rate: "5.1%", rank: 1, region: t("simulators.taxMapPage.centralSwiss") },
    { name: "Schwyz", rate: "7.2%", rank: 2, region: t("simulators.taxMapPage.centralSwiss") },
    { name: isEnglish ? "Nidwalden" : "Nidwald", rate: "7.5%", rank: 3, region: t("simulators.taxMapPage.centralSwiss") },
    { name: "Obwald", rate: "8.1%", rank: 4, region: t("simulators.taxMapPage.centralSwiss") },
    { name: "Uri", rate: "8.4%", rank: 5, region: t("simulators.taxMapPage.centralSwiss") },
    { name: "Appenzell RI", rate: "8.8%", rank: 6, region: t("simulators.taxMapPage.easternSwiss") },
  ];

  const faqs = [
    { question: t("simulators.taxMapPage.faq1Q"), answer: t("simulators.taxMapPage.faq1A") },
    { question: t("simulators.taxMapPage.faq2Q"), answer: t("simulators.taxMapPage.faq2A") },
    { question: t("simulators.taxMapPage.faq3Q"), answer: t("simulators.taxMapPage.faq3A") },
    { question: t("simulators.taxMapPage.faq4Q"), answer: t("simulators.taxMapPage.faq4A") },
    { question: t("simulators.taxMapPage.faq5Q"), answer: t("simulators.taxMapPage.faq5A") },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">
                {t("simulators.taxMapPage.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("simulators.taxMapPage.title")}
              <br />
              <span className="text-emerald-400">{t("simulators.taxMapPage.titleHighlight")}</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("simulators.taxMapPage.description")}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-4 py-3">
                <p className="text-emerald-300 text-sm">{t("simulators.taxMapPage.lowestTaxCanton")}</p>
                <p className="text-white font-bold text-lg">{isEnglish ? "Zug" : "Zoug"} : 5.1%</p>
              </div>
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3">
                <p className="text-red-300 text-sm">{t("simulators.taxMapPage.highestTaxCanton")}</p>
                <p className="text-white font-bold text-lg">{isEnglish ? "Geneva" : "Genève"} : 14.8%</p>
              </div>
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl px-4 py-3">
                <p className="text-amber-300 text-sm">{t("simulators.taxMapPage.maxGap")}</p>
                <p className="text-white font-bold text-lg">x2.9</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-8 bg-white" id="carte">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {t("simulators.taxMapPage.mapTitle")}
          </h2>
          <SwissTaxMap />
        </div>
      </section>

      {/* Top 6 Cantons Ranking */}
      <section className="py-12 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            {t("simulators.taxMapPage.top6Title")}
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("simulators.taxMapPage.top6Desc")}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {cantonRankings.map((canton) => (
              <Card key={canton.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    canton.rank === 1 ? "bg-emerald-500" :
                    canton.rank === 2 ? "bg-emerald-400" :
                    canton.rank === 3 ? "bg-teal-500" : "bg-teal-400"
                  }`}>
                    {canton.rank}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{canton.name}</p>
                    <p className="text-muted-foreground text-sm">{canton.region}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-bold text-xl text-emerald-600">{canton.rate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to read the map */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              {t("simulators.taxMapPage.howToReadTitle")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t("simulators.taxMapPage.greenCantons")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("simulators.taxMapPage.greenDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t("simulators.taxMapPage.yellowCantons")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("simulators.taxMapPage.yellowDesc")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <Building className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{t("simulators.taxMapPage.redCantons")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("simulators.taxMapPage.redDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {t("simulators.taxMapPage.methodologyTitle")}
                    </h3>
                    <div className="space-y-2 text-muted-foreground text-sm">
                      <p>{t("simulators.taxMapPage.methodologyDesc1")}</p>
                      <p>{t("simulators.taxMapPage.methodologyDesc2")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {t("simulators.taxMapPage.faqTitle")}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <SimulatorInternalLinks currentPage="carte-impots" />
    </main>
  );
}
