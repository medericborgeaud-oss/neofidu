import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NeoFidu - Fiduciaire Digitale en Suisse Romande";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D9488 0%, #10B981 50%, #059669 100%)",
          padding: "60px 80px",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />

        {/* Logo and brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "100px",
              height: "130px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "40px",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "60px",
                fontWeight: 800,
              }}
            >
              N
            </div>
          </div>

          {/* Brand name */}
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontSize: "90px",
                fontWeight: 800,
                color: "white",
              }}
            >
              neo
            </span>
            <span
              style={{
                fontSize: "90px",
                fontWeight: 800,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              fidu
            </span>
            <span
              style={{
                fontSize: "45px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                marginLeft: "8px",
              }}
            >
              .ch
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.95)",
            marginBottom: "40px",
          }}
        >
          Fiduciaire digitale en Suisse Romande
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            marginBottom: "30px",
          }}
        >
          {["Fiscalité", "Comptabilité", "Gérance immobilière"].map((feature) => (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#34D399",
                }}
              />
              <span
                style={{
                  fontSize: "28px",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Cantons */}
        <div
          style={{
            fontSize: "26px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "20px",
          }}
        >
          VD • VS • GE • NE • JU • FR
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "white",
          }}
        >
          www.neofidu.ch
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
