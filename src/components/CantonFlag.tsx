"use client";

interface Props { canton: string; size?: number; eager?: boolean; }

export function CantonFlag({ canton, size = 28, eager = false }: Props) {
  const c = (canton || "").toUpperCase();
  if (!c) return null;
  return (
    <img
      src={`/flags/${c.toLowerCase()}.svg`}
      alt={`Drapeau ${c}`}
      width={size}
      height={Math.round(size * 0.82)}
      style={{ border: "1px solid #000", borderRadius: 4, objectFit: "contain" }}
      loading={eager ? "eager" : "lazy"}
      {...(eager ? { fetchPriority: "low" as const } : {})}
    />
  );
}
