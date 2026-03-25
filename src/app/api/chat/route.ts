import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant fiscal de NeoFidu, une fiduciaire 100% en ligne en Suisse romande. Tu aides les visiteurs avec leurs questions fiscales et les guides vers les bons services.

SERVICES ET TARIFS:
- Déclaration d'impôts Basique: dès CHF 50 (personne seule, situation simple)
- Déclaration d'impôts Confort: dès CHF 100 (famille, propriétaire, dépenses pro)
- Déclaration d'impôts Intégral: dès CHF 150 (patrimoine diversifié)
- Suisses de l'étranger: dès CHF 100
- Comptabilité indépendants/freelances: dès CHF 500/an
- Comptabilité PME (Sàrl/SA): dès CHF 300/mois
- Création d'entreprise: RI dès CHF 290, Sàrl dès CHF 990, SA dès CHF 1'490
- Gérance immobilière: dès 5% des loyers

OPTIONS SUPPLÉMENTAIRES (s'ajoutent à la déclaration):
- Couple: +CHF 20 | Enfant: +CHF 10/enfant
- Bien immobilier: +CHF 50/bien | Actions (≥3): +CHF 20
- Traitement prioritaire 7 jours: +CHF 20
- Traitement express 48h: +CHF 120

CANTONS COUVERTS: Vaud, Genève, Valais, Fribourg, Neuchâtel, Jura

DÉLAIS STANDARD: 10 jours ouvrés après réception de tous les documents

RÈGLES:
- Réponds en français par défaut, en anglais si le visiteur écrit en anglais
- Sois concis, chaleureux et professionnel
- Pour obtenir un devis précis, invite à remplir le formulaire sur neofidu.ch/demande
- Tu fournis de l'information générale — pas de conseil fiscal définitif
- Si une question dépasse tes connaissances, redirige vers le contact sur neofidu.ch/contact
- Les prix sont des points de départ selon la complexité de la situation`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ message: data.content[0].text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
