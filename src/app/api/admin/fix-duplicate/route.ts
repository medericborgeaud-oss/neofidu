import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Mot de passe admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// POST - Corriger une demande en doublon
// Body: { keepReference, deleteReference, paymentIntentId }
export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
    }

    const authHeader = request.headers.get("x-admin-password");

    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json({ error: "Supabase non configuré" }, { status: 500 });
    }

    const body = await request.json();
    const { keepReference, deleteReference, paymentIntentId } = body;

    if (!keepReference || !deleteReference) {
      return NextResponse.json(
        { error: "keepReference et deleteReference requis" },
        { status: 400 }
      );
    }

    // 1. Récupérer la demande à garder
    const { data: keepRequest, error: findError } = await supabase
      .from("tax_requests")
      .select("*")
      .eq("reference", keepReference)
      .single();

    if (findError || !keepRequest) {
      return NextResponse.json(
        { error: `Demande ${keepReference} non trouvée` },
        { status: 404 }
      );
    }

    // 2. Mettre à jour la demande à garder
    const updatedPayment = {
      ...keepRequest.payment,
      stripePaymentIntentId: paymentIntentId || keepRequest.payment?.stripePaymentIntentId,
    };

    const { error: updateError } = await supabase
      .from("tax_requests")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        payment: updatedPayment,
        updated_at: new Date().toISOString(),
      })
      .eq("reference", keepReference);

    if (updateError) {
      console.error("Erreur mise à jour:", updateError);
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour" },
        { status: 500 }
      );
    }

    console.log(`✅ Demande ${keepReference} mise à jour: status=paid, paymentIntentId=${paymentIntentId}`);

    // 3. Supprimer la demande en double
    const { error: deleteError } = await supabase
      .from("tax_requests")
      .delete()
      .eq("reference", deleteReference);

    if (deleteError) {
      console.error("Erreur suppression:", deleteError);
      return NextResponse.json(
        {
          error: "Demande mise à jour mais erreur lors de la suppression du doublon",
          keepUpdated: true,
          deleteError: deleteError.message,
        },
        { status: 500 }
      );
    }

    console.log(`🗑️ Demande ${deleteReference} supprimée`);

    return NextResponse.json({
      success: true,
      message: `Demande ${keepReference} mise à jour (status=paid) et doublon ${deleteReference} supprimé`,
      kept: {
        reference: keepReference,
        status: "paid",
        paymentIntentId: paymentIntentId,
      },
      deleted: {
        reference: deleteReference,
      },
    });
  } catch (error) {
    console.error("Erreur correction doublon:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
