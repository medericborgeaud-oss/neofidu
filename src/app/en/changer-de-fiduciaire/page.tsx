import { ChangerFiduciaireContent } from "../../changer-de-fiduciaire/ChangerFiduciaireContent";

export const metadata = {
  title: { absolute: "Switch fiduciary in Switzerland: free second opinion and turnkey takeover | NeoFidu" },
  description:
    "Are you overpaying your fiduciary? Free second opinion on your invoice within 48h. If you switch, we prepare the transfer letter and take over your file, without disruption.",
  alternates: {
    canonical: "https://neofidu.ch/en/changer-de-fiduciaire",
    languages: {
      "fr-CH": "https://neofidu.ch/changer-de-fiduciaire",
      "en-CH": "https://neofidu.ch/en/changer-de-fiduciaire",
      "x-default": "https://neofidu.ch/changer-de-fiduciaire",
    },
  },
};

export default function ChangerFiduciaireEnPage() {
  return <ChangerFiduciaireContent en />;
}
