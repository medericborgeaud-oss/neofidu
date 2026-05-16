"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface CommuneMediaProps {
  city: string;
  canton: string;
}

interface GeoResult {
  lat: number;
  lng: number;
}

const CANTON_FULL: Record<string, string> = {
  VD: "Vaud", GE: "Genève", VS: "Valais", FR: "Fribourg", NE: "Neuchâtel", JU: "Jura",
  BE: "Berne", ZH: "Zurich", LU: "Lucerne", BS: "Bâle-Ville", BL: "Bâle-Campagne",
  AG: "Argovie", SO: "Soleure", TI: "Tessin", SG: "Saint-Gall", GR: "Grisons",
  TG: "Thurgovie", ZG: "Zoug", SZ: "Schwyz", SH: "Schaffhouse",
};

function latLngToTile(lat: number, lng: number, zoom: number): { x: number; y: number } {
  const n = Math.pow(2, zoom);
  const x = Math.floor((lng + 180) / 360 * n);
  const latRad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  return { x, y };
}

function getStaticMapTiles(lat: number, lng: number, zoom: number = 12) {
  const { x, y } = latLngToTile(lat, lng, zoom);
  const tiles: { url: string; dx: number; dy: number }[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({
        url: `https://tile.openstreetmap.org/${zoom}/${x + dx}/${y + dy}.png`,
        dx, dy
      });
    }
  }
  return tiles;
}

export default function CommuneMedia({ city, canton }: CommuneMediaProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoAttribution, setPhotoAttribution] = useState<string>("");
  const [coords, setCoords] = useState<GeoResult | null>(null);

  const cantonName = CANTON_FULL[canton] || canton;

  useEffect(() => {
    async function fetchPhoto() {
      const queries = [
        city + " (" + cantonName + ")",
        city + " (ville)",
        city,
      ];

      for (const query of queries) {
        try {
          const wikiRes = await fetch(
            `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
          );
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            if (wikiData.thumbnail?.source) {
              const desc = (wikiData.description || "").toLowerCase();
              const isPlace = query.includes("(") || desc.includes("commune") || desc.includes("ville") || desc.includes("canton") || desc.includes("suisse") || desc.includes("district");
              if (isPlace || query.includes("(")) {
                const hiRes = wikiData.thumbnail.source.replace(/\/\d+px-/, "/800px-");
                setPhotoUrl(hiRes);
                setPhotoAttribution("Wikimedia Commons");
                setPhotoLoading(false);
                return;
              }
            }
          }
        } catch { /* skip */ }
      }
      setPhotoLoading(false);
    }

    async function geocode() {
      try {
        const geoRes = await fetch(
          `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(city)}&type=locations&limit=1`
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.results?.[0]?.attrs) {
            const { lat, lon } = geoData.results[0].attrs;
            if (lat && lon) {
              setCoords({ lat, lng: lon });
              return;
            }
          }
        }
      } catch { /* skip */ }
      try {
        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city + ", Switzerland")}&format=json&limit=1`
        );
        if (nomRes.ok) {
          const nomData = await nomRes.json();
          if (nomData[0]) {
            setCoords({ lat: parseFloat(nomData[0].lat), lng: parseFloat(nomData[0].lon) });
          }
        }
      } catch { /* skip */ }
    }

    fetchPhoto();
    geocode();
  }, [city, canton, cantonName]);

  const tiles = coords ? getStaticMapTiles(coords.lat, coords.lng, 12) : [];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {/* Photo section */}
      <div className="relative h-[200px] bg-gray-100 rounded-lg overflow-hidden">
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt={city}
              className="w-full h-full object-cover"
            />
            {photoAttribution && <p className="absolute bottom-2 right-3 text-white/60 text-[10px]">{photoAttribution}</p>}
          </>
        ) : photoLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
            <MapPin className="w-8 h-8 text-emerald-300 mb-2" />
            <p className="text-sm font-medium text-emerald-700">{city}</p>
            <p className="text-xs text-emerald-500">{canton}</p>
          </div>
        )}
      </div>

      {/* Map section - static tile grid */}
      <div className="relative h-[200px] bg-gray-100 rounded-lg overflow-hidden">
        {coords && tiles.length > 0 ? (
          <>
            <div
              className="absolute"
              style={{
                width: "768px",
                height: "768px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 256px)",
                gridTemplateRows: "repeat(3, 256px)",
              }}
            >
              {tiles.map((tile, i) => (
                <img
                  key={i}
                  src={tile.url}
                  alt=""
                  className="w-[256px] h-[256px] block"
                  draggable={false}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border-[3px] border-white"
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#0d9488",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <p className="absolute bottom-1 right-2 text-[9px] text-gray-500/70">&copy; OpenStreetMap</p>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <MapPin className="w-6 h-6 text-gray-300 mb-1" />
            <p className="text-xs text-gray-400">Carte non disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}
