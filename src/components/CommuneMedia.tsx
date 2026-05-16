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
  const [photoAttribution, setPhotoAttribution] = useState<string>("");
  const [photoLoading, setPhotoLoading] = useState(true);
  const [coords, setCoords] = useState<GeoResult | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

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
            const hiRes = wikiData2.thumbnail.source.replace(/\/\d+px-/, "/800px-");
            setPhotoUrl(hiRes);
            setPhotoAttribution("Wikimedia Commons");
            setPhotoLoading(false);
            return;
          }
        }
        setPhotoLoading(false);
      } catch {
        setPhotoLoading(false);
      }
    }
    fetchPhoto();
  }, [city, canton]);

  useEffect(() => {
    async function geocode() {
      try {
        const res = await fetch(
          `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${encodeURIComponent(city)}&type=locations&limit=1&sr=4326`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const attrs = data.results[0].attrs;
            setCoords({ lat: attrs.lat, lng: attrs.lon });
          }
        }
      } catch {}
    }
    geocode();
  }, [city]);

  useEffect(() => {
    if (!coords || !mapRef.current || mapInstanceRef.current) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      if (!mapRef.current || mapInstanceRef.current) return;
      const L = (window as any).L;
      const map = L.map(mapRef.current, {
        zoomControl: true, scrollWheelZoom: false, dragging: true, attributionControl: false,
      }).setView([coords.lat, coords.lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap", maxZoom: 18,
      }).addTo(map);
      const markerIcon = L.divIcon({
        className: "custom-marker",
        html: '<div style="width:28px;height:28px;background:#0d9488;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>',
        iconSize: [28, 28], iconAnchor: [14, 28],
      });
      L.marker([coords.lat, coords.lng], { icon: markerIcon }).addTo(map);
      L.control.attribution({ prefix: false, position: "bottomright" })
        .addAttribution('<a href="https://openstreetmap.org" target="_blank" rel="noopener" style="font-size:10px;color:#94a3b8;">OpenStreetMap</a>')
        .addTo(map);
      mapInstanceRef.current = map;
      setTimeout(() => map.invalidateSize(), 100);
    };
    document.head.appendChild(script);
    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, [coords]);

  return (
    <div className="grid grid-cols-2 border-b">
      <div className="relative h-[200px] overflow-hidden bg-gray-100">
        {photoLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : photoUrl ? (
          <>
            <img src={photoUrl} alt={`Vue de ${city}, ${canton}`} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="text-white text-xs font-medium">{city}, {canton}</p>
              {photoAttribution && <p className="text-white/60 text-[10px]">{photoAttribution}</p>}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
            <MapPin className="w-8 h-8 text-emerald-300 mb-2" />
            <p className="text-sm font-medium text-emerald-700">{city}</p>
            <p className="text-xs text-emerald-500">{canton}</p>
          </div>
        )}
      </div>
      <div className="relative h-[200px] bg-gray-100">
        {coords ? (
          <div ref={mapRef} className="w-full h-full" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
                                                                                  }
