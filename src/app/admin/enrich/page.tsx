"use client";

import { useState, useRef, useCallback } from "react";

interface Progress {
  processed: number;
  total: number;
  enriched: number;
  errors: number;
  noPersons: number;
  current?: string;
}

interface LogEntry {
  time: string;
  text: string;
  type: "info" | "success" | "error" | "warning";
}

export default function EnrichPage() {
  const [status, setStatus] = useState<"idle" | "counting" | "running" | "done">("idle");
  const [total, setTotal] = useState<number | null>(null);
  const [progress, setProgress] = useState<Progress>({
    processed: 0, total: 0, enriched: 0, errors: 0, noPersons: 0,
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [testResult, setTestResult] = useState<any>(null);
  const abortRef = useRef<AbortController | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((text: string, type: LogEntry["type"] = "info") => {
    const time = new Date().toLocaleTimeString("fr-CH");
    setLogs((prev) => [...prev, { time, text, type }]);
    setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  // Count companies to enrich
  const handleCount = async () => {
    setStatus("counting");
    try {
      const resp = await fetch("/api/enrich-persons");
      const data = await resp.json();
      setTotal(data.total);
      addLog(`${data.total} entreprises à enrichir`, "info");
    } catch (e: any) {
      addLog(`Erreur: ${e.message}`, "error");
    }
    setStatus("idle");
  };

  // Run enrichment (test or full)
  const handleRun = async (mode: "test" | "run") => {
    setStatus("running");
    setTestResult(null);
    setLogs([]);

    addLog(mode === "test"
      ? "Lancement du test sur 1 entreprise..."
      : "Lancement de l'enrichissement complet...",
      "info"
    );

    abortRef.current = new AbortController();

    try {
      const resp = await fetch("/api/enrich-persons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
        signal: abortRef.current.signal,
      });

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            switch (event.type) {
              case "start":
                setProgress((p) => ({ ...p, total: event.total }));
                addLog(`Début: ${event.total} entreprise(s) à traiter`, "info");
                break;

              case "progress":
                setProgress({
                  processed: event.processed,
                  total: event.total,
                  enriched: event.enriched,
                  errors: event.errors,
                  noPersons: event.noPersons,
                  current: event.current,
                });
                break;

              case "test_result":
                setTestResult(event);
                addLog(`Test: ${event.company} (${event.uid})`, "info");
                if (event.extractedPersons?.length > 0) {
                  for (const p of event.extractedPersons) {
                    addLog(`  → ${p.initials} | ${p.name} | ${p.role}`, "success");
                  }
                } else {
                  addLog("  → Aucune personne trouvée", "warning");
                }
                addLog(`Clés Zefix: ${event.rawKeys?.join(", ")}`, "info");
                break;

              case "done":
                setProgress({
                  processed: event.processed,
                  total: event.processed,
                  enriched: event.enriched,
                  errors: event.errors,
                  noPersons: event.noPersons,
                });
                addLog(
                  `Terminé! ${event.enriched} enrichies, ${event.noPersons} sans personnes, ${event.errors} erreurs`,
                  event.errors > 0 ? "warning" : "success"
                );
                break;

              case "error":
                addLog(`Erreur: ${event.message}`, "error");
                break;
            }
          } catch {}
        }
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        addLog(`Erreur: ${e.message}`, "error");
      }
    }

    setStatus("done");
  };

  const handleStop = () => {
    abortRef.current?.abort();
    addLog("Arrêté par l'utilisateur", "warning");
    setStatus("done");
  };

  const pct = progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4, color: "#0f172a" }}>
        Enrichissement Zefix → Personnes
      </h1>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 32 }}>
        Récupère les noms des personnes inscrites au RC depuis l&apos;API Zefix et les enregistre dans Supabase.
      </p>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button
          onClick={handleCount}
          disabled={status === "running"}
          style={{
            padding: "10px 20px", borderRadius: 8, border: "1px solid #e2e8f0",
            background: "white", cursor: status === "running" ? "not-allowed" : "pointer",
            fontSize: 14, color: "#334155",
          }}
        >
          {status === "counting" ? "Comptage..." : "Compter les entreprises"}
        </button>

        <button
          onClick={() => handleRun("test")}
          disabled={status === "running"}
          style={{
            padding: "10px 20px", borderRadius: 8, border: "1px solid #fed7aa",
            background: "#fff7ed", cursor: status === "running" ? "not-allowed" : "pointer",
            fontSize: 14, color: "#9a3412", fontWeight: 500,
          }}
        >
          Tester (1 entreprise)
        </button>

        {status !== "running" ? (
          <button
            onClick={() => handleRun("run")}
            disabled={status === "running"}
            style={{
              padding: "10px 20px", borderRadius: 8, border: "none",
              background: "#0d9488", cursor: "pointer",
              fontSize: 14, color: "white", fontWeight: 500,
            }}
          >
            Lancer l&apos;enrichissement
          </button>
        ) : (
          <button
            onClick={handleStop}
            style={{
              padding: "10px 20px", borderRadius: 8, border: "none",
              background: "#ef4444", cursor: "pointer",
              fontSize: 14, color: "white", fontWeight: 500,
            }}
          >
            Arrêter
          </button>
        )}
      </div>

      {/* Count result */}
      {total !== null && status !== "running" && (
        <div style={{
          padding: 16, borderRadius: 8, background: "#f0fdfa", border: "1px solid #99f6e4",
          marginBottom: 24, fontSize: 14, color: "#0f766e",
        }}>
          <strong>{total.toLocaleString("fr-CH")}</strong> entreprises avec zefix_uid et sans personnes
        </div>
      )}

      {/* Progress bar */}
      {(status === "running" || status === "done") && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748b", marginBottom: 6 }}>
            <span>{progress.current ? `En cours: ${progress.current}` : ""}</span>
            <span>{progress.processed} / {progress.total} ({pct}%)</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "#e2e8f0", overflow: "hidden" }}>
            <div
              style={{
                height: "100%", borderRadius: 4,
                background: status === "done" ? "#10b981" : "#0d9488",
                width: `${pct}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
            {[
              { label: "Traitées", value: progress.processed, color: "#334155" },
              { label: "Enrichies", value: progress.enriched, color: "#059669" },
              { label: "Sans personnes", value: progress.noPersons, color: "#d97706" },
              { label: "Erreurs", value: progress.errors, color: "#dc2626" },
            ].map((s) => (
              <div key={s.label} style={{
                padding: 12, borderRadius: 8, background: "#f8fafc",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test result */}
      {testResult && (
        <div style={{
          padding: 16, borderRadius: 8, background: "#fffbeb", border: "1px solid #fde68a",
          marginBottom: 24, fontSize: 13,
        }}>
          <strong style={{ color: "#92400e" }}>Réponse Zefix pour: {testResult.company}</strong>
          <pre style={{
            marginTop: 8, padding: 12, borderRadius: 6, background: "#fefce8",
            overflow: "auto", fontSize: 12, lineHeight: 1.5, color: "#78350f",
          }}>
            {JSON.stringify(testResult.rawPersons, null, 2)}
          </pre>
        </div>
      )}

      {/* Logs */}
      {logs.length > 0 && (
        <div style={{
          border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden",
        }}>
          <div style={{
            padding: "8px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
            fontSize: 12, fontWeight: 500, color: "#64748b",
          }}>
            Journal ({logs.length} entrées)
          </div>
          <div style={{
            maxHeight: 300, overflow: "auto", padding: 12,
            fontFamily: "ui-monospace, monospace", fontSize: 12, lineHeight: 1.8,
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{
                color: log.type === "error" ? "#dc2626"
                  : log.type === "success" ? "#059669"
                  : log.type === "warning" ? "#d97706"
                  : "#475569",
              }}>
                <span style={{ color: "#94a3b8" }}>{log.time}</span> {log.text}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      )}

      {/* Estimated time */}
      {total !== null && total > 0 && status === "idle" && (
        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 16 }}>
          Temps estimé : ~{Math.ceil((total * 0.5) / 60)} minutes pour {total.toLocaleString("fr-CH")} entreprises
        </p>
      )}
    </div>
  );
          }
