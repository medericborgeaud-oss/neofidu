import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Site public - pas de protection par mot de passe
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
