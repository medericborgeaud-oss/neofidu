"use client";

interface Props { canton: string; size?: number; eager?: boolean; }

const F: Record<string, string> = {
  GE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"><rect width="6" height="10" fill="#FFCC00"/><rect x="6" width="6" height="10" fill="#CE1126"/></svg>',
  VD: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"><rect width="12" height="5" fill="#009A44"/><rect y="5" width="12" height="5" fill="#fff"/></svg>',
  VS: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"><rect width="12" height="5" fill="#fff"/><rect y="5" width="12" height="5" fill="#CE1126"/></svg>',
  FR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"><rect width="12" height="10" fill="#fff"/><polygon points="0,0 12,0 0,10" fill="#000"/></svg>',
  NE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"><rect width="4" height="10" fill="#009A44"/><rect x="4" width="4" height="10" fill="#fff"/><rect x="8" width="4" height="10" fill="#CE1126"/></svg>',
  JU: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10"><rect width="12" height="10" fill="#fff"/><rect y="5" width="12" height="5" fill="#CE1126"/></svg>',
};

export function CantonFlag({ canton, size = 28, eager = false }: Props) {
  const c = (canton || "").toUpperCase();
  const svg = F[c];
  if (!svg) return null;
  return (
    <img
      src={`data:image/svg+xml,${encodeURIComponent(svg)}`}
      alt={`Drapeau ${c}`}
      width={size}
      height={Math.round(size * 0.82)}
      style={{ border: "1px solid #e5e7eb", borderRadius: 4, objectFit: "contain" }}
      loading={eager ? "eager" : "lazy"}
      {...(eager ? { fetchPriority: "low" as const } : {})}
    />
  );
}
