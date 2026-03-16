"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, TrendingDown, TrendingUp } from "lucide-react";

const cantonData: Record<string, {
  name: string;
  nameFr: string;
  taxBurden: number;
  rank: number;
  communeMin: { name: string; rate: number };
  communeMax: { name: string; rate: number };
}> = {
  AG: { name: "Aargau", nameFr: "Argovie", taxBurden: 10.9, rank: 13, communeMin: { name: "Geltwil", rate: 7.8 }, communeMax: { name: "Full-Reuenthal", rate: 13.6 } },
  AI: { name: "Appenzell I.Rh.", nameFr: "Appenzell Rh.-Int.", taxBurden: 8.8, rank: 6, communeMin: { name: "Oberegg", rate: 8.2 }, communeMax: { name: "Appenzell", rate: 9.4 } },
  AR: { name: "Appenzell A.Rh.", nameFr: "Appenzell Rh.-Ext.", taxBurden: 9.5, rank: 8, communeMin: { name: "Teufen", rate: 8.6 }, communeMax: { name: "Urnäsch", rate: 10.8 } },
  BE: { name: "Bern", nameFr: "Berne", taxBurden: 13.3, rank: 21, communeMin: { name: "Deisswil", rate: 9.8 }, communeMax: { name: "Schelten", rate: 17.2 } },
  BL: { name: "Basel-Landschaft", nameFr: "Bâle-Campagne", taxBurden: 13.0, rank: 20, communeMin: { name: "Biel-Benken", rate: 10.8 }, communeMax: { name: "Langenbruck", rate: 15.4 } },
  BS: { name: "Basel-Stadt", nameFr: "Bâle-Ville", taxBurden: 14.5, rank: 25, communeMin: { name: "Bettingen", rate: 12.8 }, communeMax: { name: "Basel", rate: 14.8 } },
  FR: { name: "Fribourg", nameFr: "Fribourg", taxBurden: 12.4, rank: 18, communeMin: { name: "Greng", rate: 9.2 }, communeMax: { name: "Châtel-sur-Montsalvens", rate: 15.8 } },
  GE: { name: "Genève", nameFr: "Genève", taxBurden: 14.8, rank: 26, communeMin: { name: "Genthod", rate: 11.2 }, communeMax: { name: "Avully", rate: 17.6 } },
  GL: { name: "Glarus", nameFr: "Glaris", taxBurden: 9.2, rank: 7, communeMin: { name: "Glarus Nord", rate: 8.8 }, communeMax: { name: "Glarus Süd", rate: 9.8 } },
  GR: { name: "Graubünden", nameFr: "Grisons", taxBurden: 10.4, rank: 11, communeMin: { name: "Rongellen", rate: 6.8 }, communeMax: { name: "Bregaglia", rate: 14.2 } },
  JU: { name: "Jura", nameFr: "Jura", taxBurden: 13.9, rank: 23, communeMin: { name: "Haute-Sorne", rate: 11.8 }, communeMax: { name: "Damphreux", rate: 16.4 } },
  LU: { name: "Luzern", nameFr: "Lucerne", taxBurden: 10.6, rank: 12, communeMin: { name: "Meggen", rate: 8.2 }, communeMax: { name: "Romoos", rate: 13.8 } },
  NE: { name: "Neuchâtel", nameFr: "Neuchâtel", taxBurden: 13.6, rank: 22, communeMin: { name: "St-Blaise", rate: 11.2 }, communeMax: { name: "Les Verrières", rate: 16.8 } },
  NW: { name: "Nidwalden", nameFr: "Nidwald", taxBurden: 7.5, rank: 3, communeMin: { name: "Hergiswil", rate: 6.9 }, communeMax: { name: "Wolfenschiessen", rate: 8.4 } },
  OW: { name: "Obwalden", nameFr: "Obwald", taxBurden: 8.1, rank: 4, communeMin: { name: "Sarnen", rate: 7.6 }, communeMax: { name: "Lungern", rate: 9.1 } },
  SG: { name: "St. Gallen", nameFr: "Saint-Gall", taxBurden: 11.8, rank: 16, communeMin: { name: "Mörschwil", rate: 8.4 }, communeMax: { name: "Wildhaus", rate: 14.6 } },
  SH: { name: "Schaffhausen", nameFr: "Schaffhouse", taxBurden: 10.1, rank: 10, communeMin: { name: "Stetten", rate: 8.5 }, communeMax: { name: "Buch", rate: 12.2 } },
  SO: { name: "Solothurn", nameFr: "Soleure", taxBurden: 11.2, rank: 14, communeMin: { name: "Kammersrohr", rate: 8.4 }, communeMax: { name: "Mümliswil", rate: 14.2 } },
  SZ: { name: "Schwyz", nameFr: "Schwytz", taxBurden: 7.2, rank: 2, communeMin: { name: "Wollerau", rate: 5.8 }, communeMax: { name: "Muotathal", rate: 9.2 } },
  TG: { name: "Thurgau", nameFr: "Thurgovie", taxBurden: 9.8, rank: 9, communeMin: { name: "Bottighofen", rate: 7.2 }, communeMax: { name: "Hohentannen", rate: 12.4 } },
  TI: { name: "Ticino", nameFr: "Tessin", taxBurden: 12.1, rank: 17, communeMin: { name: "Collina d'Oro", rate: 8.8 }, communeMax: { name: "Bedretto", rate: 15.2 } },
  UR: { name: "Uri", nameFr: "Uri", taxBurden: 8.4, rank: 5, communeMin: { name: "Seedorf", rate: 7.8 }, communeMax: { name: "Realp", rate: 9.6 } },
  VD: { name: "Vaud", nameFr: "Vaud", taxBurden: 14.2, rank: 24, communeMin: { name: "Jouxtens-Mézery", rate: 10.2 }, communeMax: { name: "Rivaz", rate: 17.8 } },
  VS: { name: "Valais", nameFr: "Valais", taxBurden: 12.7, rank: 19, communeMin: { name: "Bagnes", rate: 9.6 }, communeMax: { name: "Fieschertal", rate: 16.4 } },
  ZG: { name: "Zug", nameFr: "Zoug", taxBurden: 5.1, rank: 1, communeMin: { name: "Baar", rate: 4.8 }, communeMax: { name: "Neuheim", rate: 5.6 } },
  ZH: { name: "Zürich", nameFr: "Zurich", taxBurden: 11.5, rank: 15, communeMin: { name: "Kilchberg", rate: 8.1 }, communeMax: { name: "Maschwanden", rate: 14.8 } },
};

function getTaxColor(taxBurden: number): string {
  if (taxBurden <= 6) return "#10b981";
  if (taxBurden <= 8) return "#22c55e";
  if (taxBurden <= 10) return "#84cc16";
  if (taxBurden <= 12) return "#eab308";
  if (taxBurden <= 14) return "#f97316";
  return "#ef4444";
}

// Separate component for the SVG map to prevent re-renders
const SwissMapSVG = memo(function SwissMapSVG({ onCantonSelect }: { onCantonSelect: (code: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const callbackRef = useRef(onCantonSelect);

  // Update the callback ref without causing re-renders
  useEffect(() => {
    callbackRef.current = onCantonSelect;
  }, [onCantonSelect]);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    fetch("/switzerland-map.svg")
      .then((res) => res.text())
      .then((svgContent) => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = svgContent;
        const svg = containerRef.current.querySelector("svg");

        if (svg) {
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
          svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
          svg.style.display = "block";

          const paths = svg.querySelectorAll("path[id^='CH-']");
          paths.forEach((path) => {
            const id = path.getAttribute("id")?.replace("CH-", "") || "";
            const canton = cantonData[id];
            if (canton) {
              const pathEl = path as SVGPathElement;
              pathEl.style.fill = getTaxColor(canton.taxBurden);
              pathEl.style.cursor = "pointer";
              pathEl.style.transition = "opacity 0.2s, stroke-width 0.2s";
              pathEl.style.stroke = "white";
              pathEl.style.strokeWidth = "0.5";

              pathEl.addEventListener("mouseenter", () => {
                pathEl.style.opacity = "0.8";
                pathEl.style.stroke = "#000";
                pathEl.style.strokeWidth = "2";
              });

              pathEl.addEventListener("mouseleave", () => {
                pathEl.style.opacity = "1";
                pathEl.style.stroke = "white";
                pathEl.style.strokeWidth = "0.5";
              });

              pathEl.addEventListener("click", (e) => {
                e.stopPropagation();
                callbackRef.current(id);
              });
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error loading SVG:", err);
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ aspectRatio: "620 / 400", minHeight: "400px", maxWidth: "800px", margin: "0 auto" }}
    />
  );
});

export function SwissTaxMap() {
  const [selectedCanton, setSelectedCanton] = useState<string | null>(null);

  const cantonInfo = selectedCanton ? cantonData[selectedCanton] : null;

  const handleCantonSelect = useCallback((code: string) => {
    setSelectedCanton(code);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-sm text-muted-foreground">Impots bas</span>
        <div className="flex gap-1">
          {[5, 8, 10, 12, 14, 16].map((rate) => (
            <div
              key={rate}
              className="w-6 h-4 rounded"
              style={{ backgroundColor: getTaxColor(rate) }}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">Impots eleves</span>
      </div>

      <div className="relative">
        {/* Carte centrée et agrandie */}
        <div className="w-full max-w-4xl mx-auto bg-slate-50 rounded-xl p-4 md:p-6">
          <SwissMapSVG onCantonSelect={handleCantonSelect} />
        </div>

        {/* Card d'info - positionnée en overlay sur desktop */}
        <Card className="w-full lg:w-80 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:mr-4 mt-4 lg:mt-0 shadow-xl">
          <CardContent className="p-6">
            {cantonInfo ? (
              <>
                <h3 className="text-2xl font-bold mb-1">{cantonInfo.nameFr}</h3>
                <p className="text-muted-foreground mb-4">{cantonInfo.name}</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Charge fiscale moyenne
                    </p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: getTaxColor(cantonInfo.taxBurden) }}
                    >
                      {cantonInfo.taxBurden.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Classement suisse
                    </p>
                    <p className="text-xl font-semibold">
                      {cantonInfo.rank}
                      <sup>e</sup> / 26
                    </p>
                  </div>
                  <div className="pt-4 border-t space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Communes extremes
                    </p>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {cantonInfo.communeMin.name}
                        </p>
                      </div>
                      <span className="font-bold text-emerald-600">
                        {cantonInfo.communeMin.rate}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {cantonInfo.communeMax.name}
                        </p>
                      </div>
                      <span className="font-bold text-red-600">
                        {cantonInfo.communeMax.rate}%
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Cliquez sur un canton</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Classement des cantons</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Object.entries(cantonData)
            .sort((a, b) => a[1].rank - b[1].rank)
            .map(([code, canton]) => (
              <button
                key={code}
                type="button"
                onClick={() => setSelectedCanton(code)}
                className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                  selectedCanton === code
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:bg-secondary/50"
                }`}
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: getTaxColor(canton.taxBurden) }}
                >
                  {canton.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{canton.nameFr}</p>
                  <p className="text-xs text-muted-foreground">
                    {canton.taxBurden}%
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
