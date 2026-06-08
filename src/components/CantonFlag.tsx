"use client";

interface Props {
  canton: string;
  size?: number;
  eager?: boolean;
}

const FLAG_CODES = ["GE", "VD", "VS", "FR", "NE", "JU"];

export function CantonFlag({ canton, size = 28, eager = false }: Props) {
  const c = (canton || "").toUpperCase();
  if (!FLAG_CODES.includes(c)) return null;
  const src = `/flags/${c.toLowerCase()}.svg`;
  return (
    <img
      src={src}
      alt={`Drapeau ${c}`}
      width={size}
      height={Math.round(size * 0.82)}
      style={{ border: "1px solid #e5e7eb", borderRadius: 4, objectFit: "contain" }}
      loading={eager ? "eager" : "lazy"}
      {...(eager ? { fetchPriority: "low" as const } : {})}
    />
  );
}
