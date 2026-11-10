// src/app/api/mcp/route.ts
// Serveur MCP (Model Context Protocol) de NeoFidu, transport "Streamable HTTP" sans etat :
// chaque requete POST JSON-RPC recoit une reponse JSON. Connectable depuis Claude
// (connecteur personnalise), ChatGPT (connecteurs / mode developpeur) et tout client MCP.
// URL : https://neofidu.ch/api/mcp . Lecture seule, sans authentification.

import { NextResponse } from "next/server";
import { TOOLS, callTool, SERVER_INSTRUCTIONS } from "@/lib/mcp/tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SUPPORTED = ["2025-06-18", "2025-03-26", "2024-11-05"];
const LATEST = SUPPORTED[0];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
};

type RpcId = string | number | null;
interface RpcRequest {
  jsonrpc: "2.0";
  id?: RpcId;
  method: string;
  params?: Record<string, any>;
}

const ok = (id: RpcId, result: unknown) => ({ jsonrpc: "2.0", id, result });
const err = (id: RpcId, code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } });

async function handle(msg: RpcRequest) {
  const id = msg.id ?? null;
  switch (msg.method) {
    case "initialize": {
      const requested = msg.params?.protocolVersion;
      return ok(id, {
        protocolVersion: SUPPORTED.includes(requested) ? requested : LATEST,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "neofidu", title: "NeoFidu: impôts en Suisse romande", version: "1.0.0", websiteUrl: "https://neofidu.ch" },
        instructions: SERVER_INSTRUCTIONS,
      });
    }
    case "ping":
      return ok(id, {});
    case "tools/list":
      return ok(id, { tools: TOOLS });
    case "tools/call": {
      const name = msg.params?.name;
      const args = (msg.params?.arguments ?? {}) as Record<string, unknown>;
      const res = await callTool(String(name), args);
      if (!res) return err(id, -32602, `Unknown tool: ${name}`);
      return ok(id, res);
    }
    case "resources/list":
      return ok(id, { resources: [] });
    case "prompts/list":
      return ok(id, { prompts: [] });
    default:
      return err(id, -32601, `Method not found: ${msg.method}`);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(err(null, -32700, "Parse error"), { status: 400, headers: CORS });
  }

  const messages = (Array.isArray(body) ? body : [body]) as RpcRequest[];
  const requests = messages.filter((m) => m && typeof m === "object" && m.id !== undefined && m.id !== null);

  // Notifications seules (ex. notifications/initialized) : 202 sans corps
  if (requests.length === 0) return new Response(null, { status: 202, headers: CORS });

  const responses = [];
  for (const m of requests) {
    if (m.jsonrpc !== "2.0" || typeof m.method !== "string") {
      responses.push(err(m.id ?? null, -32600, "Invalid Request"));
      continue;
    }
    try {
      responses.push(await handle(m));
    } catch (e) {
      console.error("[mcp]", e);
      responses.push(err(m.id ?? null, -32603, "Internal error"));
    }
  }
  return NextResponse.json(Array.isArray(body) ? responses : responses[0], {
    headers: { ...CORS, "Cache-Control": "no-store" },
  });
}

// Pas de flux SSE cote serveur (serveur sans etat)
export function GET() {
  return new Response("NeoFidu MCP server. Use POST (JSON-RPC 2.0, Streamable HTTP). Docs: https://neofidu.ch/connecteur-ia", {
    status: 405,
    headers: { ...CORS, Allow: "POST, OPTIONS" },
  });
}

export function DELETE() {
  return new Response(null, { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
