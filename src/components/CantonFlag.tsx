"use client";

interface Props {
  canton: string;
  size?: number;
}

const FLAG_URLS: Record<string, string> = {
  GE: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Canton_of_Geneva.svg",
  VD: "https://upload.wikimedia.org/wikipedia/commons/d/df/Flag_of_Canton_of_Vaud.svg",
  VS: "https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Canton_of_Valais.svg",
  FR: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_Canton_of_Fribourg.svg",
  NE: "https://upload.wikimedia.org/wikipedia/commons/5/57/Flag_of_Canton_of_Neuch%C3%A2tel.svg",
  JU: "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_Canton_of_Jura.svg",
};

export function CantonFlag({ canton, size = 28 }: Props) {
  const c = (canton || "").toUpperCase();
  const src = FLAG_URLS[c];
  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Drapeau ${c}`}
      width={size}
      height={Math.round(size * 0.82)}
      style={{
        
        
        objectFit: "contain",
      }}
      loading="lazy"
    />
  );
}
