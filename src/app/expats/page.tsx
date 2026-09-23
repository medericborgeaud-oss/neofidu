import { permanentRedirect } from "next/navigation";

// The English expat page now lives at /en/expats for URL consistency.
// This 301 keeps the previously indexed /expats URL working.
export default function ExpatsLegacyRedirect() {
  permanentRedirect("/en/expats");
}
