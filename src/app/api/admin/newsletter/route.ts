import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({
        subscribers: [],
        total: 0,
        message: "Supabase non configuré - les abonnés ne sont pas stockés"
      });
    }

    const { data: subscribers, error, count } = await supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact" })
      .order("subscribed_at", { ascending: false });

    if (error) {
      // Table doesn't exist yet
      if (error.code === "42P01") {
        return NextResponse.json({
          subscribers: [],
          total: 0,
          tableExists: false,
          message: "La table newsletter_subscribers n'existe pas encore. Créez-la avec le SQL fourni."
        });
      }
      console.error("Error fetching subscribers:", error);
      return NextResponse.json(
        { error: "Erreur lors de la récupération des abonnés" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscribers: subscribers || [],
      total: count || 0,
      tableExists: true
    });

  } catch (error) {
    console.error("Newsletter admin API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase non configuré" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID requis" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting subscriber:", error);
      return NextResponse.json(
        { error: "Erreur lors de la suppression" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Newsletter delete API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
