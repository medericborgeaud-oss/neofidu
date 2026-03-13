"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  // Generate BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.neofidu.ch",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://www.neofidu.ch${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual breadcrumb navigation */}
      <nav
        aria-label="Fil d'Ariane"
        className={`flex items-center text-sm ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {/* Home link */}
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Accueil</span>
            </Link>
          </li>

          {/* Separator and items */}
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-white/50 mx-1" />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Light variant for non-hero sections
export function BreadcrumbLight({ items, className = "" }: BreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.neofidu.ch",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://www.neofidu.ch${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav
        aria-label="Fil d'Ariane"
        className={`flex items-center text-sm ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Accueil</span>
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={item.label} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-1" />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
