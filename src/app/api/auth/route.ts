import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!SITE_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    if (password === SITE_PASSWORD) {
      const response = NextResponse.json({ success: true });

      response.cookies.set("site_auth", SITE_PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Mot de passe incorrect" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
