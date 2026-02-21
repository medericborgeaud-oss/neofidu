import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bannière pour Chatimont | NeoFidu",
  description: "Bannière publicitaire NeoFidu pour le site chatimont.ch",
  robots: "noindex, nofollow",
};

export default function ChatimontBannerPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Bannière pour Chatimont.ch
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Bannières optimisées pour le footer du site chatimont.ch.
          Faites une capture d&apos;écran de la bannière souhaitée.
        </p>

        {/* Option 1: Full width banner - Style Chatimont */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-blue-800">
            Option 1 : Bannière pleine largeur (1200 × 100 px)
          </h2>
          <p className="text-gray-500 text-sm mb-4 pl-3">
            Style coordonné avec chatimont.ch - bleu foncé
          </p>
          <div className="flex justify-center mb-3 overflow-x-auto">
            <div
              className="relative overflow-hidden flex items-center justify-between px-10 rounded-lg"
              style={{
                width: 1200,
                height: 100,
                background: "linear-gradient(135deg, #314975 0%, #1e3a5f 50%, #152a45 100%)",
                boxShadow: "0 4px 20px rgba(49, 73, 117, 0.3)",
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute rounded-full opacity-10"
                style={{
                  top: "-60%",
                  right: "10%",
                  width: 200,
                  height: 200,
                  background: "white",
                }}
              />
              <div
                className="absolute rounded-full opacity-5"
                style={{
                  bottom: "-80%",
                  left: "5%",
                  width: 150,
                  height: 150,
                  background: "white",
                }}
              />

              {/* Partner badge */}
              <div className="flex items-center gap-4">
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                >
                  PARTENAIRE
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  neo<span style={{ color: "#14b8a6" }}>fidu</span>
                  <span className="text-white/60 text-base font-normal ml-1">.ch</span>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 text-center px-8">
                <div className="text-white font-semibold text-lg">
                  Déclaration d&apos;impôts 100% en ligne
                </div>
                <div className="text-white/70 text-sm">
                  Fiduciaire digitale suisse • Dès CHF 89.- • Vaud, Valais, Genève, Fribourg
                </div>
              </div>

              {/* CTA */}
              <div
                className="px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
                style={{
                  background: "#14b8a6",
                  color: "white",
                  boxShadow: "0 4px 15px rgba(20, 184, 166, 0.4)"
                }}
              >
                Faire ma déclaration
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            1200 × 100 px — Idéal pour footer pleine largeur
          </p>
        </section>

        {/* Option 2: Compact banner */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-blue-800">
            Option 2 : Bannière compacte (800 × 80 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex items-center justify-between px-6 rounded-lg"
              style={{
                width: 800,
                height: 80,
                background: "linear-gradient(90deg, #314975 0%, #1e3a5f 100%)",
                boxShadow: "0 4px 20px rgba(49, 73, 117, 0.25)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(20, 184, 166, 0.2)" }}
                >
                  <svg className="w-6 h-6" style={{ color: "#14b8a6" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white tracking-tight">
                    neo<span style={{ color: "#14b8a6" }}>fidu</span>
                  </div>
                  <div className="text-white/60 text-xs">Partenaire recommandé</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white font-medium text-base">
                  Déclaration d&apos;impôts en ligne
                </div>
                <div className="text-white/60 text-xs">
                  Vaud • Valais • Genève • Fribourg — Dès CHF 89.-
                </div>
              </div>

              <div
                className="px-6 py-2.5 rounded-full font-bold text-sm"
                style={{
                  background: "#14b8a6",
                  color: "white",
                }}
              >
                Démarrer →
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            800 × 80 px — Format compact
          </p>
        </section>

        {/* Option 3: Minimal elegant */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-blue-800">
            Option 3 : Style minimal élégant (900 × 70 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex items-center justify-center gap-8 px-8 rounded-xl"
              style={{
                width: 900,
                height: 70,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: "#314975", color: "white" }}
                >
                  Partenaire
                </span>
                <span className="text-2xl font-extrabold tracking-tight" style={{ color: "#314975" }}>
                  neo<span style={{ color: "#14b8a6" }}>fidu</span>
                </span>
              </div>

              <div className="h-8 w-px bg-gray-300" />

              <div className="text-gray-600 text-sm">
                <span className="font-medium">Déclaration d&apos;impôts en ligne</span>
                <span className="text-gray-400 mx-2">•</span>
                <span>Suisse romande</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="font-semibold" style={{ color: "#14b8a6" }}>Dès CHF 89.-</span>
              </div>

              <div
                className="px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-1.5"
                style={{
                  background: "#14b8a6",
                  color: "white",
                }}
              >
                Découvrir
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            900 × 70 px — Style light, s&apos;intègre partout
          </p>
        </section>

        {/* Option 4: Card style for sidebar */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-blue-800">
            Option 4 : Format carte (300 × 250 px)
          </h2>
          <p className="text-gray-500 text-sm mb-4 pl-3">
            Idéal pour sidebar ou section partenaires
          </p>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex flex-col items-center justify-center text-center rounded-2xl"
              style={{
                width: 300,
                height: 250,
                background: "linear-gradient(180deg, #314975 0%, #1e3a5f 100%)",
                boxShadow: "0 8px 30px rgba(49, 73, 117, 0.3)",
                padding: 24,
              }}
            >
              {/* Decorative circle */}
              <div
                className="absolute rounded-full"
                style={{
                  top: "-25%",
                  right: "-20%",
                  width: 140,
                  height: 140,
                  background: "rgba(20, 184, 166, 0.15)",
                }}
              />

              <div
                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4"
                style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
              >
                Partenaire recommandé
              </div>

              <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
                neo<span style={{ color: "#14b8a6" }}>fidu</span>
              </div>

              <div className="text-white/90 font-medium text-sm mb-1">
                Déclaration d&apos;impôts en ligne
              </div>
              <div className="text-white/60 text-xs mb-5">
                Fiduciaire digitale suisse
              </div>

              <div
                className="w-full py-3 rounded-full font-bold text-sm text-center"
                style={{
                  background: "#14b8a6",
                  color: "white",
                }}
              >
                Dès CHF 89.- →
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            300 × 250 px — Format carte partenaire
          </p>
        </section>

        {/* Option 5: Simple text link style */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-blue-800">
            Option 5 : Style lien discret (600 × 50 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="flex items-center justify-center gap-4 px-6 rounded-lg"
              style={{
                width: 600,
                height: 50,
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
              }}
            >
              <span className="text-gray-500 text-xs">Partenaire fiscal :</span>
              <span className="text-xl font-bold tracking-tight" style={{ color: "#314975" }}>
                neo<span style={{ color: "#14b8a6" }}>fidu</span>
              </span>
              <span className="text-gray-500 text-sm">
                — Déclaration d&apos;impôts en ligne dès CHF 89.-
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#14b8a6" }}
              >
                En savoir plus →
              </span>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            600 × 50 px — Très discret, style lien texte
          </p>
        </section>

        {/* Code to provide */}
        <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto mt-16">
          <h3 className="text-gray-900 font-semibold text-lg mb-4">
            📋 Code HTML à intégrer sur chatimont.ch
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Après avoir choisi et capturé votre bannière, voici le code HTML à utiliser :
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`<!-- Bannière partenaire NeoFidu -->
<a href="https://www.neofidu.ch?ref=chatimont"
   target="_blank"
   rel="noopener"
   style="display: block; text-align: center; margin: 20px auto;">
  <img
    src="VOTRE_IMAGE_BANNIERE.png"
    alt="NeoFidu - Déclaration d'impôts en ligne en Suisse romande"
    style="max-width: 100%; height: auto; border-radius: 8px;"
  />
</a>`}
          </pre>
          <p className="text-gray-500 text-xs mt-4">
            💡 Le paramètre <code className="bg-gray-100 px-1 rounded">?ref=chatimont</code> permet de suivre les visites depuis votre site.
          </p>
        </div>
      </div>
    </div>
  );
}
