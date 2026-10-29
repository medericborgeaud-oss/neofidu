import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://neofidu.ch";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/auth/",
          "/banners/",
        ],
      },
      {
        // Les photos du fondateur ne doivent pas servir de vignette dans Google
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/auth/",
          "/banners/",
          "/mederic-borgeaud-avatar.png",
          "/mederic-borgeaud-avatar.jpg",
          "/mederic-borgeaud.jpg",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
