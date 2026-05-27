"use client";

interface Props {
  canton: string;
  size?: number;
}

const BD = "#d1d5db";

function star5(cx: number, cy: number, r: number): string {
  const p: string[] = [];
  const ri = r * 0.382;
  for (let i = 0; i < 5; i++) {
    const a1 = (i * 72 - 90) * Math.PI / 180;
    const a2 = (i * 72 + 36 - 90) * Math.PI / 180;
    p.push(`${(cx + r * Math.cos(a1)).toFixed(1)},${(cy + r * Math.sin(a1)).toFixed(1)}`);
    p.push(`${(cx + ri * Math.cos(a2)).toFixed(1)},${(cy + ri * Math.sin(a2)).toFixed(1)}`);
  }
  return p.join(" ");
}

export function CantonFlag({ canton, size = 28 }: Props) {
  const c = (canton || "").toUpperCase();
  const w = size;
  const h = Math.round(size * 0.82);
  const bdr = (
    <rect x="0.5" y="0.5" width="99" height="81" fill="none" stroke={BD} strokeWidth="1" rx="1" />
  );

  if (c === "GE") {
    return (
      <svg width={w} height={h} viewBox="0 0 100 82" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="82" fill="#FFCC00" />
        <rect x="50" width="50" height="82" fill="#ED1C24" />
        <path d="M48 8c-2-1-5-2-7 0-1 1-1 3 1 4l3 1c-2 1-5 1-6 3-2 2 0 4 2 4h2c-2 2-6 4-7 7-1 2 1 4 4 3-2 2-5 6-4 9 1 3 3 3 5 1-1 3-3 6-2 9s4 3 5 1l2-5c0 3-1 7 0 10s4 3 5 0l1-12v22h-9c-1 2-1 4 1 4h8v8h5V8z" fill="#1A1A1A" />
        <circle cx="39" cy="11" r="1.2" fill="#FFCC00" />
        <path d="M37 9l-4 2.5 3 1.5z" fill="#ED1C24" />
        <g transform="translate(75,41)">
          <rect x="-1.8" y="-25" width="3.6" height="50" rx="1" fill="#FFCC00" />
          <circle cx="0" cy="-25" r="7" fill="none" stroke="#FFCC00" strokeWidth="3" />
          <rect x="1.8" y="15" width="7" height="2.5" fill="#FFCC00" />
          <rect x="1.8" y="19" width="5" height="2.5" fill="#FFCC00" />
          <rect x="1.8" y="23" width="7" height="2.5" fill="#FFCC00" />
        </g>
        {bdr}
      </svg>
    );
  }

  if (c === "VD") {
    return (
      <svg width={w} height={h} viewBox="0 0 100 82" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="41" fill="#FFFFFF" />
        <rect y="41" width="100" height="41" fill="#00913F" />
        <text x="50" y="24" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="serif" fill="#9B7E2E">
          LIBERTÃ
        </text>
        <text x="50" y="36" textAnchor="middle" fontSize="8" fontWeight="bold" fontFamily="serif" fill="#9B7E2E">
          ET PATRIE
        </text>
        {bdr}
      </svg>
    );
  }

  if (c === "VS") {
    const rows = [1, 2, 3, 4, 3];
    const sr = 5;
    const sy = 10;
    const gap = 13;
    const els: React.ReactElement[] = [];
    let k = 0;
    rows.forEach((n, ri) => {
      const y = sy + ri * gap;
      const tw = (n - 1) * 14;
      for (let i = 0; i < n; i++) {
        const x = 50 - tw / 2 + i * 14;
        const onRed = x >= 50;
        els.push(
          <polygon
            key={k++}
            points={star5(x, y, sr)}
            fill={onRed ? "#FFF" : "#ED1C24"}
            stroke={onRed ? "#FFF" : "#ED1C24"}
            strokeWidth="0.5"
          />
        );
      }
    });
    return (
      <svg width={w} height={h} viewBox="0 0 100 82" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="82" fill="#FFF" />
        <rect x="50" width="50" height="82" fill="#ED1C24" />
        {els}
        {bdr}
      </svg>
    );
  }

  if (c === "FR") {
    return (
      <svg width={w} height={h} viewBox="0 0 100 82" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="41" fill="#1A1A1A" />
        <rect y="41" width="100" height="41" fill="#FFFFFF" />
        {bdr}
      </svg>
    );
  }

  if (c === "NE") {
    return (
      <svg width={w} height={h} viewBox="0 0 100 82" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="27.33" fill="#00913F" />
        <rect y="27.33" width="100" height="27.34" fill="#FFFFFF" />
        <rect y="54.67" width="100" height="27.33" fill="#ED1C24" />
        {bdr}
      </svg>
    );
  }

  if (c === "JU") {
    const sh = 82 / 7;
    return (
      <svg width={w} height={h} viewBox="0 0 100 82" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="82" fill="#FFFFFF" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x="50" y={i * sh} width="50" height={sh} fill={i % 2 === 0 ? "#ED1C24" : "#FFFFFF"} />
        ))}
        <path d="M25 72V18" stroke="#ED1C24" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M25 18c0-8 10-12 12-4 1 5-3 8-6 8" fill="none" stroke="#ED1C24" strokeWidth="3.5" strokeLinecap="round" />
        {bdr}
      </svg>
    );
  }

  return null;
}
