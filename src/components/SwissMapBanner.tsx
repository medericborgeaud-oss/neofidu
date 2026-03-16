"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, TrendingDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function SwissMapBanner() {
  const { isEnglish } = useLanguage();

  return (
    <section className="py-6 bg-transparent">
      <div className="container mx-auto px-4">
        <Link href="/simulateur/carte-impots" className="block group">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-teal-500 rounded-xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            <div className="relative flex flex-col items-center gap-5 md:gap-6">
              {/* Swiss Map - Static Image */}
              <div className="flex-shrink-0 w-[160px] h-[110px] md:w-[180px] md:h-[125px] relative overflow-hidden group-hover:scale-105 transition-transform duration-500 drop-shadow-lg">
                <Image
                  src="/swiss-tax-map.png"
                  alt="Carte des impôts suisses"
                  fill
                  className="object-contain brightness-110"
                  priority
                />
              </div>

              {/* Content - Centered */}
              <div className="flex-1 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    {isEnglish ? "Interactive Swiss Tax Map" : "Carte interactive des impôts"}
                  </h3>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    {isEnglish ? "26 cantons" : "26 cantons"}
                  </span>
                </div>

                <p className="text-white/90 text-base md:text-lg mb-4 max-w-2xl mx-auto">
                  {isEnglish
                    ? "Compare tax rates across all Swiss cantons and find the best place to live based on your situation."
                    : "Comparez les taux d'imposition des 26 cantons et trouvez le meilleur endroit où vivre."}
                </p>

                {/* Tax comparison pills */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-300"></div>
                    <span className="text-sm text-white font-medium">Zoug 5.1%</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-300"></div>
                    <span className="text-sm text-white font-medium">Vaud 12.2%</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-300"></div>
                    <span className="text-sm text-white font-medium">
                      {isEnglish ? "Geneva" : "Genève"} 14.8%
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-base px-5 py-2.5 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-white/95 transition-all duration-300">
                  {isEnglish ? "Explore the map" : "Explorer la carte"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
