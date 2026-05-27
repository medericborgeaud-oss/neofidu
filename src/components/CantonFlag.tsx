// src/components/CantonFlag.tsx
"use client";

interface CantonFlagProps {
  canton: string;
  size?: number;
}

export function CantonFlag({ canton, size = 20 }: CantonFlagProps) {
  const h = Math.round(size * 0.82);
  switch (canton) {
    case "VD":
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau du canton de Vaud">
          <rect width="100" height="82" fill="#fff"/>
          <rect y="41" width="100" height="41" fill="#009A44"/>
          <text x="50" y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#D4A017" fontFamily="serif">LIBERTE</text>
          <text x="50" y="38" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#D4A017" fontFamily="serif">ET PATRIE</text>
        </svg>
      );
    case "GE":
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau du canton de Geneve">
          <rect width="50" height="82" fill="#FFD700"/>
          <rect x="50" width="50" height="82" fill="#CE1126"/>
          {/* Simplified eagle on gold side */}
          <path d="M25 18 C20 22 15 28 16 36 C16 42 20 48 25 52 C30 48 34 42 34 36 C35 28 30 22 25 18Z" fill="#1a1a1a"/>
          <circle cx="24" cy="26" r="1.5" fill="#CE1126"/>
          <path d="M23 28 L19 30" stroke="#CE1126" strokeWidth="1.5" fill="none"/>
          {/* Simplified key on red side */}
          <line x1="75" y1="16" x2="75" y2="62" stroke="#FFD700" strokeWidth="3"/>
          <circle cx="75" cy="20" r="6" fill="none" stroke="#FFD700" strokeWidth="2.5"/>
          <line x1="75" y1="50" x2="80" y2="50" stroke="#FFD700" strokeWidth="2.5"/>
          <line x1="75" y1="56" x2="80" y2="56" stroke="#FFD700" strokeWidth="2.5"/>
        </svg>
      );
    case "VS":
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau du canton du Valais">
          <rect width="50" height="82" fill="#fff" stroke="#e5e7eb" strokeWidth="0.5"/>
          <rect x="50" width="50" height="82" fill="#CE1126"/>
          {/* 13 stars (6-pointed) - left side red on white */}
          {[
            [17, 15], [33, 15],
            [10, 30], [25, 30], [40, 30],
            [10, 45], [25, 45], [40, 45],
            [10, 60], [25, 60], [40, 60],
            [17, 75], [33, 75],
          ].map(([cx, cy], i) => (
            <polygon key={`l${i}`} points={starPoints(cx, cy, 7)} fill="#CE1126"/>
          ))}
          {/* Right side white on red */}
          {[
            [67, 15], [83, 15],
            [60, 30], [75, 30], [90, 30],
            [60, 45], [75, 45], [90, 45],
            [60, 60], [75, 60], [90, 60],
            [67, 75], [83, 75],
          ].map(([cx, cy], i) => (
            <polygon key={`r${i}`} points={starPoints(cx, cy, 7)} fill="#fff"/>
          ))}
        </svg>
      );
    case "FR":
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau du canton de Fribourg">
          <rect width="100" height="41" fill="#1a1a1a"/>
          <rect y="41" width="100" height="41" fill="#fff" stroke="#e5e7eb" strokeWidth="0.5"/>
        </svg>
      );
    case "NE":
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau du canton de Neuchatel">
          <rect width="33.3" height="82" fill="#009A44"/>
          <rect x="33.3" width="33.4" height="82" fill="#fff"/>
          <rect x="66.7" width="33.3" height="82" fill="#CE1126"/>
          {/* White cross on red */}
          <rect x="76" y="30" width="14" height="3" rx="0.5" fill="#fff"/>
          <rect x="81.5" y="24.5" width="3" height="14" rx="0.5" fill="#fff"/>
        </svg>
      );
    case "JU":
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau du canton du Jura">
          <rect width="100" height="82" fill="#fff"/>
          {/* Right side: red and white stripes */}
          <rect x="50" y="0" width="50" height="12" fill="#CE1126"/>
          <rect x="50" y="12" width="50" height="10" fill="#fff"/>
          <rect x="50" y="22" width="50" height="10" fill="#CE1126"/>
          <rect x="50" y="32" width="50" height="10" fill="#fff"/>
          <rect x="50" y="42" width="50" height="10" fill="#CE1126"/>
          <rect x="50" y="52" width="50" height="10" fill="#fff"/>
          <rect x="50" y="62" width="50" height="10" fill="#CE1126"/>
          <rect x="50" y="72" width="50" height="10" fill="#fff"/>
          {/* Simplified bishop's crozier (crosse) on left */}
          <path d="M25 12 C25 12 18 14 18 22 C18 26 22 28 25 24 C28 20 28 16 25 12Z" fill="#CE1126"/>
          <rect x="23" y="24" width="4" height="3" fill="#CE1126"/>
          <rect x="22" y="27" width="6" height="2" fill="#CE1126"/>
          <rect x="23" y="29" width="4" height="30" fill="#CE1126"/>
          <path d="M19 59 L23 63 L25 55 L27 63 L31 59 Z" fill="#CE1126"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={h} viewBox="0 0 100 82" className="flex-shrink-0 rounded-sm" aria-label="Drapeau">
          <rect width="100" height="82" fill="#e5e7eb"/>
        </svg>
      );
  }
}

function starPoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    const innerAngle = angle + Math.PI / 6;
    points.push(`${cx + (r * 0.5) * Math.cos(innerAngle)},${cy + (r * 0.5) * Math.sin(innerAngle)}`);
  }
  return points.join(" ");
}
