import { ImageResponse } from "next/og";
import { blogArticles } from "@/lib/blog-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_LABELS: Record<string, string> = {
  impots: "Impôts & Fiscalité",
  entreprise: "Création d'entreprise",
  immobilier: "Immobilier",
  expats: "Expats & Frontaliers",
  epargne: "3ème Pilier & Épargne",
  pilier3: "3ème Pilier & Épargne",
  pme: "Comptabilité PME",
  tva: "TVA & Obligations",
  loyer: "Loyer & Immobilier",
  fraude: "Fiscalité Suisse",
  famille: "Fiscalité Famille",
};

export default function Image({ params }: { params: { slug: string } }) {
  const article = blogArticles.find((a) => a.slug === params.slug);
  const title = article?.title ?? "Blog NeoFidu";
  const category = article?.category ?? "";
  const categoryLabel = CATEGORY_LABELS[category] ?? "Fiscalité Suisse";
  const fontSize = title.length > 45 ? 48 : title.length > 32 ? 58 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          background:
            "linear-gradient(135deg, #1E3A8A 0%, #312E81 55%, #4C1D95 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />
        {/* Decorative circle bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "40px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            display: "flex",
          }}
        />
        {/* Bottom rainbow bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "5px",
            background:
              "linear-gradient(to right, #60A5FA 0%, #818CF8 40%, #A78BFA 70%, #F472B6 100%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px 72px 68px 72px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Top row: Swiss cross + Blog label | NeoFidu brand */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#EF4444",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "900",
                }}
              >
                +
              </div>
              <span
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "15px",
                  letterSpacing: "0.2em",
                  fontWeight: "600",
                }}
              >
                BLOG
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  color: "white",
                  fontSize: "30px",
                  fontWeight: "800",
                  letterSpacing: "-0.5px",
                }}
              >
                Neo
              </span>
              <span
                style={{
                  color: "#93C5FD",
                  fontSize: "30px",
                  fontWeight: "800",
                  letterSpacing: "-0.5px",
                }}
              >
                Fidu
              </span>
            </div>
          </div>

          {/* Article title */}
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize,
              fontWeight: "800",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>

          {/* Bottom row: category badge | domain */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
                padding: "8px 22px",
                borderRadius: "20px",
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
              {categoryLabel}
            </div>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "18px" }}>
              neofidu.ch
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
