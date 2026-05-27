"use client";

interface Props {
  canton: string;
  size?: number;
}

const FLAG_URLS: Record<string, string> = {
  GE: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Canton_of_Geneva.svg/{w}px-Flag_of_Canton_of_Geneva.svg.png",
  VD: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Canton_of_Vaud.svg/{w}px-Flag_of_Canton_of_Vaud.svg.png",
  VS: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Canton_of_Valais.svg/{w}px-Flag_of_Canton_of_Valais.svg.png",
  FR: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Canton_of_Fribourg.svg/{w}px-Flag_of_Canton_of_Fribourg.svg.png",
  NE: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Flag_of_Canton_of_Neuch%C3%A2tel.svg/{w}px-Flag_of_Canton_of_Neuch%C3%A2tel.svg.png",
  JU: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_Canton_of_Jura.svg/{w}px-Flag_of_Canton_of_Jura.svg.png",
};

export function CantonFlag({ canton, size = 28 }: Props) {
  const c = (canton || "").toUpperCase();
  const template = FLAG_URLS[c];
  if (!template) return null;

  const px = Math.round(size * 2);
  const src = template.replace("{w}", String(px));

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Drapeau ${c}`}
      width={size}
      height={Math.round(size * 0.82)}
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 2,
        objectFit: "contain",
      }}
      loading="lazy"
    />
  );
}
