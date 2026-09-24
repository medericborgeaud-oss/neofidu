import type { Metadata } from "next";

// Confirmation page must not be indexed (transactional page).
// Crawling is allowed (robots.txt no longer blocks it) so Google can see this noindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
