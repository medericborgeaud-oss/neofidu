import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bannières publicitaires | NeoFidu",
  description: "Téléchargez nos bannières publicitaires pour promouvoir NeoFidu sur votre site.",
  robots: "noindex, nofollow",
};

export default function BannersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Bannières publicitaires NeoFidu
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Faites un clic droit sur une bannière et choisissez &ldquo;Enregistrer l&apos;image&rdquo;
          ou utilisez un outil de capture d&apos;écran pour obtenir le format souhaité.
        </p>

        {/* Leaderboard 728x90 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Leaderboard (728 × 90 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex items-center justify-between px-8 rounded-xl shadow-xl"
              style={{
                width: 728,
                height: 90,
                background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)",
                boxShadow: "0 10px 40px rgba(13, 148, 136, 0.3)",
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: "-50%",
                  right: "-10%",
                  width: 200,
                  height: 200,
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  neo<span className="text-gray-900">fidu</span>
                </span>
                <span className="text-sm text-white/80">.ch</span>
              </div>
              <div className="flex-1 text-center px-6">
                <div className="text-white font-semibold text-base">
                  Votre fiduciaire en ligne en Suisse romande
                </div>
                <div className="text-white/85 text-xs">
                  Déclaration d&apos;impôts • Comptabilité • 100% digital
                </div>
              </div>
              <div
                className="bg-white text-teal-600 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-1.5 shadow-lg"
              >
                Démarrer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            728 × 90 px — Idéal pour les en-têtes de site
          </p>
        </section>

        {/* Medium Rectangle 300x250 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Rectangle moyen (300 × 250 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex flex-col items-center justify-center text-center rounded-2xl shadow-xl"
              style={{
                width: 300,
                height: 250,
                background: "linear-gradient(180deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 10px 40px rgba(13, 148, 136, 0.3)",
                padding: 24,
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: "-30%",
                  right: "-30%",
                  width: 180,
                  height: 180,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
                neo<span className="text-gray-900">fidu</span>
              </div>
              <div className="text-white/95 font-medium text-base mb-1">
                Déclaration d&apos;impôts en ligne
              </div>
              <div className="text-white/70 text-xs mb-5">
                Suisse romande • Dès CHF 89.-
              </div>
              <div className="bg-white text-teal-600 px-7 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg relative z-10">
                Démarrer maintenant
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            300 × 250 px — Format le plus populaire
          </p>
        </section>

        {/* Wide Banner 468x60 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Bannière large (468 × 60 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex items-center justify-between px-5 rounded-xl shadow-lg"
              style={{
                width: 468,
                height: 60,
                background: "linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)",
                boxShadow: "0 8px 32px rgba(13, 148, 136, 0.25)",
              }}
            >
              <span className="text-xl font-extrabold text-white tracking-tight">
                neo<span className="text-gray-900">fidu</span>
              </span>
              <span className="text-white font-medium text-sm">
                Votre déclaration d&apos;impôts en ligne • Suisse romande
              </span>
              <span className="bg-white text-teal-600 px-4 py-2 rounded-full font-bold text-xs shadow-lg">
                Démarrer →
              </span>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            468 × 60 px — Format classique
          </p>
        </section>

        {/* Square 250x250 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Carré (250 × 250 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex flex-col items-center justify-center text-center rounded-2xl shadow-xl"
              style={{
                width: 250,
                height: 250,
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 10px 40px rgba(13, 148, 136, 0.3)",
                padding: 24,
              }}
            >
              {/* Swiss flag */}
              <div
                className="absolute rounded"
                style={{
                  top: 10,
                  right: 10,
                  width: 32,
                  height: 24,
                  background: "linear-gradient(to right, #dc2626 33%, white 33%, white 66%, #dc2626 66%)",
                  opacity: 0.9,
                }}
              />
              <div className="text-4xl font-extrabold text-white tracking-tight mb-1">
                neo<span className="text-gray-900">fidu</span>
              </div>
              <div className="text-white/70 text-sm mb-4">
                Fiduciaire digitale suisse
              </div>
              <div className="text-white font-semibold text-sm leading-relaxed mb-5">
                Déclaration d&apos;impôts<br/>simple et rapide
              </div>
              <div
                className="px-4 py-2 rounded-lg text-white text-sm mb-4"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                À partir de <strong className="text-lg font-bold">CHF 89.-</strong>
              </div>
              <span className="bg-white text-teal-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-lg">
                En savoir plus
              </span>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            250 × 250 px — Format carré
          </p>
        </section>

        {/* Mobile 320x50 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Mobile (320 × 50 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="flex items-center justify-between px-4 rounded-lg shadow-lg"
              style={{
                width: 320,
                height: 50,
                background: "linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)",
                boxShadow: "0 6px 24px rgba(13, 148, 136, 0.25)",
              }}
            >
              <span className="text-lg font-extrabold text-white tracking-tight">
                neo<span className="text-gray-900">fidu</span>
              </span>
              <span className="text-white/90 font-medium text-xs">
                Impôts en ligne
              </span>
              <span className="bg-white text-teal-600 px-3.5 py-1.5 rounded-full font-bold text-xs">
                Démarrer
              </span>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            320 × 50 px — Idéal pour mobile
          </p>
        </section>

        {/* Large Rectangle 336x280 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Grand rectangle (336 × 280 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex flex-col rounded-2xl shadow-xl"
              style={{
                width: 336,
                height: 280,
                background: "linear-gradient(180deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 10px 40px rgba(13, 148, 136, 0.3)",
                padding: 28,
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: "-20%",
                  right: "-15%",
                  width: 180,
                  height: 180,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  neo<span className="text-gray-900">fidu</span>
                </span>
                <span
                  className="text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  🇨🇭 Suisse
                </span>
              </div>
              <div className="text-white font-bold text-lg leading-tight mb-2">
                Votre déclaration d&apos;impôts, simplifiée.
              </div>
              <div className="text-white/80 text-sm leading-relaxed mb-6 flex-1">
                Confiez votre déclaration fiscale à nos experts. Service 100% en ligne pour particuliers, indépendants et entreprises en Suisse romande.
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 text-white/90 text-xs">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    100% digital
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-xs">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Dès CHF 89.-
                  </span>
                </div>
                <span className="bg-white text-teal-600 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">
                  Démarrer
                </span>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            336 × 280 px — Grand format avec détails
          </p>
        </section>

        {/* Skyscraper 160x600 */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 pl-3 border-l-4 border-teal-500">
            Skyscraper (160 × 600 px)
          </h2>
          <div className="flex justify-center mb-3">
            <div
              className="relative overflow-hidden flex flex-col items-center text-center rounded-2xl shadow-xl"
              style={{
                width: 160,
                height: 600,
                background: "linear-gradient(180deg, #0d9488 0%, #0f766e 50%, #115e59 100%)",
                boxShadow: "0 10px 40px rgba(13, 148, 136, 0.3)",
                padding: "28px 16px",
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: "15%",
                  right: "-50%",
                  width: 120,
                  height: 120,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <div className="text-2xl font-extrabold text-white tracking-tight mb-2">
                neo<span className="text-gray-900">fidu</span>
              </div>
              <div className="text-white/70 text-xs mb-8">
                Fiduciaire digitale
              </div>
              <div className="w-10 h-0.5 bg-white/30 mb-8" />
              <div className="text-white font-bold text-base leading-tight mb-4">
                Déclaration d&apos;impôts en ligne
              </div>
              <div className="flex-1 flex flex-col gap-4 mb-8">
                {["100% digital", "Tarifs affichés", "Experts certifiés", "Suisse romande"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-white/90 text-xs font-medium">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
              <span className="bg-white text-teal-600 px-5 py-3 rounded-full font-bold text-xs shadow-lg relative z-10 whitespace-nowrap">
                Démarrer →
              </span>
              <div className="text-white/60 text-[10px] mt-4">
                Dès CHF 89.-
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            160 × 600 px — Idéal pour les sidebars
          </p>
        </section>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto mt-16">
          <h3 className="text-gray-900 font-semibold text-lg mb-4">
            📋 Comment utiliser ces bannières
          </h3>
          <ol className="text-gray-600 space-y-3 list-decimal pl-6">
            <li>
              Faites une <strong>capture d&apos;écran</strong> de la bannière souhaitée
              (utilisez l&apos;outil de capture de votre système ou une extension comme &ldquo;GoFullPage&rdquo;)
            </li>
            <li>
              Enregistrez l&apos;image en format <code className="bg-gray-100 px-2 py-0.5 rounded text-teal-600 text-sm">PNG</code> ou <code className="bg-gray-100 px-2 py-0.5 rounded text-teal-600 text-sm">JPG</code>
            </li>
            <li>
              Ajoutez un <strong>lien</strong> vers <code className="bg-gray-100 px-2 py-0.5 rounded text-teal-600 text-sm">https://www.neofidu.ch</code> sur l&apos;image
            </li>
            <li>
              Code HTML exemple:
              <pre className="bg-gray-100 p-3 rounded-lg mt-2 text-xs overflow-x-auto">
{`<a href="https://www.neofidu.ch" target="_blank" rel="noopener">
  <img src="banner-neofidu.png" alt="NeoFidu - Déclaration d'impôts en ligne" />
</a>`}
              </pre>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
