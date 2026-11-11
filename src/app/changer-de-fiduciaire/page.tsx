import { ChangerFiduciaireContent } from "./ChangerFiduciaireContent";

export const metadata = {
  title: "Changer de fiduciaire : second avis gratuit et reprise clé en main",
  description:
    "Payez-vous trop cher votre fiduciaire ? Second avis gratuit sur votre facture en 48 h. Si vous changez, on prépare la lettre de transfert et on reprend votre dossier, sans rupture.",
  alternates: {
    canonical: "https://neofidu.ch/changer-de-fiduciaire",
    languages: {
      "fr-CH": "https://neofidu.ch/changer-de-fiduciaire",
      "en-CH": "https://neofidu.ch/en/changer-de-fiduciaire",
      "x-default": "https://neofidu.ch/changer-de-fiduciaire",
    },
  },
};

export default function ChangerFiduciairePage() {
  return <ChangerFiduciaireContent />;
}
