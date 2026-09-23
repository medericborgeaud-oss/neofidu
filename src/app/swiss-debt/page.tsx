import { permanentRedirect } from "next/navigation";

// The English Swiss debt page now lives at /en/swiss-debt for URL consistency.
// This 301 keeps the previously indexed /swiss-debt URL working.
export default function SwissDebtLegacyRedirect() {
  permanentRedirect("/en/swiss-debt");
}
