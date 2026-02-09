import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NeoFidu - Fiduciaire Digitale Suisse";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D9488 0%, #10B981 50%, #059669 100%)",
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

        {/* Icon */}
        <div
          style={{
            width: "120px",
            height: "150px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "80px",
              fontWeight: 800,
            }}
          >
            N
          </span>
        </div>

        {/* Brand name */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: "20px" }}>
          <span
            style={{
              fontSize: "100px",
              fontWeight: 800,
              color: "white",
            }}
          >
            neo
          </span>
          <span
            style={{
              fontSize: "100px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            fidu
          </span>
          <span
            style={{
              fontSize: "50px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              marginLeft: "10px",
            }}
          >
            .ch
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "38px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            marginBottom: "30px",
          }}
        >
          Fiduciaire digitale en Suisse Romande
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "50px",
          }}
        >
          {["Fiscalité", "Comptabilité", "Gérance"].map((feature) => (
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
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#34D399",
                }}
              />
              <span
                style={{
                  fontSize: "26px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
