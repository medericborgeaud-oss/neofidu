"use client";

import { useEffect, useState, useRef } from "react";
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Fetch commune photo from Wikipedia
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

  // Initialize Leaflet map
  useEffect(() => {
    if (!coords || !mapRef.current || mapInstanceRef.current) return;

    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return;
      const L = (window as any).L;
      if (!L) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        attributionControl: false,
      }).setView([coords.lat, coords.lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        html: '<div style="background:#0d9488;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: "",
      });
      L.marker([coords.lat, coords.lng], { icon }).addTo(map);
      mapInstanceRef.current = map;

      setTimeout(() => map.invalidateSize(), 200);
    }

    if ((window as any).L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coords]);

  return (
    <div className="grid grid-cols-2 gap-3 mb-6 rounded-lg overflow-hidden">
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

      {/* Map section */}
      <div className="relative h-[200px] bg-gray-100 rounded-lg overflow-hidden">
        {coords ? (
          <div ref={mapRef} className="w-full h-full" style={{ zIndex: 0 }} />
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
