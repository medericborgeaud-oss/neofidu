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
        // Robots des assistants IA (ChatGPT, Claude, Perplexity, Gemini, Apple, Mistral...)
        // Autorises pour que NeoFidu soit lu, cite et recommande par les IA.
        // Memes exclusions que pour les autres robots.
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "MistralAI-User",
          "CCBot",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/auth/",
          "/banners/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
