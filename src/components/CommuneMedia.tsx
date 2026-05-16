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

export default function CommuneMedia({ city, canton }: CommuneMediaProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoAttribution, setPhotoAttribution] = useState<string>("");
  const [coords, setCoords] = useState<GeoResult | null>(null);

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const wikiRes = await fetch(
          `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city + " (" + canton + ")")}`
        );
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.thumbnail?.source) {
            const hiRes = wikiData.thumbnail.source.replace(/\/\d+px-/, "/800px-");
            setPhotoUrl(hiRes);
            setPhotoAttribution("Wikimedia Commons");
            setPhotoLoading(false);
            return;
          }
        }
        const wikiRes2 = await fetch(
          `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`
        );
        if (wikiRes2.ok) {
          const wikiData2 = await wikiRes2.json();
          if (wikiData2.thumbnail?.source && wikiData2.description?.toLowerCase().includes("commune")) {
            const hiRes2 = wikiData2.thumbnail.source.replace(/\/\d+px-/, "/800px-");
            setPhotoUrl(hiRes2);
            setPhotoAttribution("Wikimedia Commons");
          }
        }
      } catch {}
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
      } catch {}
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
      } catch {}
    }

    fetchPhoto();
    geocode();
  }, [city, canton]);

  // Build OpenStreetMap embed URL
  const mapUrl = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.02},${coords.lat - 0.015},${coords.lng + 0.02},${coords.lat + 0.015}&layer=mapnik&marker=${coords.lat},${coords.lng}`
    : null;

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
              loading="lazy"
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

      {/* Map section - iframe embed (no JS dependency) */}
      <div className="relative h-[200px] bg-gray-100 rounded-lg overflow-hidden">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            title={`Carte de ${city}`}
          />
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
