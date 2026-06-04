import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Aggressive crawlers that ignore robots.txt
const BLOCKED_BOTS = [
  "MJ12bot",
  "AhrefsBot",
  "SemrushBot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "PetalBot",
  "Bytespider",
];

// Security middleware for the application
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const userAgent = request.headers.get("user-agent") || "";

  // ===== 0. BLOCK AGGRESSIVE CRAWLERS =====
  // These bots ignore robots.txt and hammer /observatoire/ routes
  if (pathname.startsWith("/observatoire")) {
    const isBlockedBot = BLOCKED_BOTS.some(bot => userAgent.includes(bot));
    if (isBlockedBot) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // ===== 1. ADMIN PROTECTION =====
  // Protect admin routes with basic authentication
  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    try {
      // Verify basic auth credentials
      const base64Credentials = authHeader.split(" ")[1];
      if (!base64Credentials) {
        throw new Error("No credentials");
      }

      const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
      const [username, password] = credentials.split(":");

      const validUsername = process.env.ADMIN_USERNAME || "admin";
      const validPassword = process.env.ADMIN_PASSWORD || "neofidu2024";

      if (username !== validUsername || password !== validPassword) {
        return new NextResponse("Authentication required", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Admin Area"',
          },
        });
      }
    } catch {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }
  }

  // ===== 2. BLOCK OBVIOUS ATTACK PATHS =====
  // Only block very obvious attack paths, not general patterns
  const lowerPath = pathname.toLowerCase();
  const blockedExactPaths = [
    "/wp-admin",
    "/wp-login.php",
    "/xmlrpc.php",
    "/phpmyadmin",
    "/.env",
    "/.git",
  ];

  if (blockedExactPaths.some(blocked => lowerPath === blocked || lowerPath.startsWith(blocked + "/"))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/observatoire/:path*",
  ],
};
