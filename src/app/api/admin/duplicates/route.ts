import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Mot de passe admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

interface DuplicateGroup {
  email: string;
  cantonCode: string;
  taxYear: number;
  requests: {
    id: string;
    reference: string;
    status: string;
    created_at: string;
    paid_at: string | null;
    customerName: string;
    amount: number;
  }[];
}

// GET - Trouver les demandes en double
export async function GET(request: NextRequest) {
  try {
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
    }

    const authHeader = request.headers.get("x-admin-password");

    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json({
        error: "Supabase non configuré",
        duplicates: [],
      });
    }

    // Récupérer toutes les demandes
    const { data: requests, error } = await supabase
      .from("tax_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur récupération demandes:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Grouper par email + canton + année fiscale
    const groups: Map<string, DuplicateGroup> = new Map();

    for (const req of requests || []) {
      const email = req.customer?.email?.toLowerCase() || "";
      const cantonCode = req.fiscal?.cantonCode || "";
      const taxYear = req.fiscal?.taxYear || 0;
      const key = `${email}|${cantonCode}|${taxYear}`;

      if (!groups.has(key)) {
        groups.set(key, {
          email,
          cantonCode,
          taxYear,
          requests: [],
        });
      }

      groups.get(key)!.requests.push({
        id: req.id,
        reference: req.reference,
        status: req.status,
        created_at: req.created_at,
        paid_at: req.paid_at,
        customerName: `${req.customer?.firstName || ""} ${req.customer?.lastName || ""}`.trim(),
        amount: req.payment?.amount || 0,
      });
    }

    // Filtrer pour ne garder que les groupes avec plus d'une demande (doublons)
    const duplicates: DuplicateGroup[] = [];
    for (const group of groups.values()) {
      if (group.requests.length > 1) {
        // Trier par date de création (plus récent en premier)
        group.requests.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        duplicates.push(group);
      }
    }

    return NextResponse.json({
      duplicates,
      totalDuplicateGroups: duplicates.length,
      totalDuplicateRequests: duplicates.reduce((sum, g) => sum + g.requests.length, 0),
    });
  } catch (error) {
    console.error("Erreur recherche doublons:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE - Supprimer une demande spécifique
export async function DELETE(request: NextRequest) {
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
    const { requestId, reference } = body;

    if (!requestId && !reference) {
      return NextResponse.json(
        { error: "ID ou référence requis" },
        { status: 400 }
      );
    }

    // Vérifier que la demande existe et n'est pas payée
    let query = supabase.from("tax_requests").select("*");

    if (requestId) {
      query = query.eq("id", requestId);
    } else {
      query = query.eq("reference", reference);
    }

    const { data: existing, error: findError } = await query.single();

    if (findError || !existing) {
      return NextResponse.json(
        { error: "Demande non trouvée" },
        { status: 404 }
      );
    }

    // Sécurité: ne pas supprimer les demandes payées
    if (existing.status !== "pending" && existing.paid_at) {
      return NextResponse.json(
        {
          error: "Impossible de supprimer une demande payée",
          suggestion: "Changez d'abord le statut à 'pending' si vous êtes sûr de vouloir supprimer"
        },
        { status: 400 }
      );
    }

    // Supprimer la demande
    const { error: deleteError } = await supabase
      .from("tax_requests")
      .delete()
      .eq("id", existing.id);

    if (deleteError) {
      console.error("Erreur suppression:", deleteError);
      return NextResponse.json(
        { error: "Erreur lors de la suppression" },
        { status: 500 }
      );
    }

    console.log(`🗑️ Demande supprimée: ${existing.reference} (${existing.customer?.firstName} ${existing.customer?.lastName})`);

    return NextResponse.json({
      success: true,
      message: `Demande ${existing.reference} supprimée avec succès`,
      deleted: {
        id: existing.id,
        reference: existing.reference,
        customerName: `${existing.customer?.firstName || ""} ${existing.customer?.lastName || ""}`.trim(),
      },
    });
  } catch (error) {
    console.error("Erreur suppression demande:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
