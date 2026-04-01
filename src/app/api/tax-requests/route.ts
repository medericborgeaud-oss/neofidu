import { NextRequest, NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  createTaxRequest as createSupabaseRequest,
  getAllTaxRequests as getSupabaseRequests,
  getTaxRequestStats as getSupabaseStats,
  findExistingRequest,
} from "@/lib/supabase";
import {
  createTaxRequest as createMemoryRequest,
  getAllTaxRequests as getMemoryRequests,
  getTaxRequestStats as getMemoryStats,
} from "@/lib/tax-requests-store";
import { performSpamCheck, getClientIP } from "@/lib/spam-protection";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// POST - Créer une nouvelle demande de déclaration fiscale
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Anti-spam protection
    const clientIP = getClientIP(request.headers);
    const spamCheck = performSpamCheck({
      ip: clientIP,
      honeypot: body._honeypot,
      formLoadedAt: body._formToken,
    });

   if (spamCheck.isSpam) {
      console.warn(`🚫 Spam detected from ${clientIP}: ${spamCheck.reason}`);
      // IMPORTANT: Ne PAS retourner success:true pour du spam
      // sinon le front-end croit que la demande a été sauvegardée
      return NextResponse.json(
        {
          success: false,
          error: "Votre soumission a été bloquée par notre protection anti-spam. Veuillez rafraîchir la page et réessayer.",
          spamBlocked: true,
        },
        { status: 429 }
      );
    }

    // ===== VALIDATION DES DONNÉES OBLIGATOIRES =====
    const validationErrors: string[] = [];

    // Champs obligatoires
    if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
      validationErrors.push("Email invalide ou manquant");
    }
    if (!body.canton && !body.cantonCode) {
      validationErrors.push("Canton manquant");
    }
    if (!body.firstName || typeof body.firstName !== "string" || body.firstName.trim().length < 2) {
      validationErrors.push("Prénom invalide ou manquant");
    }
    if (!body.lastName || typeof body.lastName !== "string" || body.lastName.trim().length < 2) {
      validationErrors.push("Nom invalide ou manquant");
    }
    if (!body.taxpayerNumber || typeof body.taxpayerNumber !== "string") {
      validationErrors.push("Numéro de contribuable manquant");
    }

    // Validation du montant (minimum CHF 50)
    const amount = Number(body.amount);
    if (isNaN(amount) || amount < 50) {
      validationErrors.push("Montant invalide (minimum CHF 50)");
    }
    if (amount > 10000) {
      validationErrors.push("Montant trop élevé (maximum CHF 10'000)");
    }

    // Validation de l'année fiscale
    const currentYear = new Date().getFullYear();
    const taxYearValue = Number(body.taxYear);
    if (isNaN(taxYearValue) || taxYearValue < 2020 || taxYearValue > currentYear) {
      validationErrors.push(`Année fiscale invalide (2020-${currentYear})`);
    }

    // Validation du type de client
    const validClientTypes = ["private", "independent", "couple"];
    if (body.clientType && !validClientTypes.includes(body.clientType)) {
      validationErrors.push("Type de client invalide");
    }

    // Pour les couples, vérifier les infos du conjoint
    if (body.clientType === "couple") {
      if (!body.firstName2 || !body.lastName2) {
        validationErrors.push("Informations du conjoint manquantes");
      }
    }

    // Si des erreurs de validation, retourner 400
    if (validationErrors.length > 0) {
      console.warn("❌ Validation échouée:", validationErrors);
      return NextResponse.json(
        {
          error: "Données invalides",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // ===== PRÉVENTION DES DOUBLONS ET MISE À JOUR =====
    // Vérifier si une demande existe déjà pour cet email + année fiscale + canton
    const email = body.email?.toLowerCase()?.trim();
    const taxYear = body.taxYear || new Date().getFullYear() - 1;
    const cantonCode = body.cantonCode || body.canton;

    // Vérifier si une référence existante a été envoyée (mise à jour)
    const existingReference = body.existingReference;

    if (email && cantonCode && isSupabaseConfigured()) {
      const existingRequest = await findExistingRequest(email, taxYear, cantonCode);

      // IMPORTANT: On ne traite comme "existante" QUE si on trouve vraiment la demande dans Supabase
      // Si existingReference est fournie mais la demande n'existe pas, on crée une nouvelle demande
      if (existingRequest) {
        // Si de nouveaux documents sont fournis, les ajouter à la demande existante
        const newDocuments = body.documents || [];
        if (newDocuments.length > 0) {
          try {
            // Récupérer les documents existants
            const existingDocs = existingRequest.documents || [];

            // Fusionner les nouveaux documents avec les existants (éviter les doublons par nom)
            const existingDocNames = new Set(existingDocs.map((d: { name: string }) => d.name));
            const uniqueNewDocs = newDocuments.filter((d: { name: string }) => !existingDocNames.has(d.name));

            const allDocuments = [
              ...existingDocs,
              ...uniqueNewDocs.map((doc: { category: string; name: string; url?: string }) => ({
                ...doc,
                uploadedAt: new Date().toISOString(),
              })),
            ];

            // Mettre à jour dans Supabase
            const { updateTaxRequestDocuments } = await import("@/lib/supabase");
            await updateTaxRequestDocuments(existingRequest.id, allDocuments);

            console.log(`📎 Documents mis à jour pour ${existingRequest.reference}: ${uniqueNewDocs.length} nouveaux, ${allDocuments.length} total`);
          } catch (updateError) {
            console.error("Erreur mise à jour documents:", updateError);
          }
        }

        // Une demande existe déjà - retourner la référence existante
        console.log(`⚠️ Demande existante trouvée pour ${email} (${cantonCode} ${taxYear}): ${existingRequest.reference}`);
        return NextResponse.json({
          success: true,
          reference: existingRequest.reference,
          id: existingRequest.id,
          storage: "supabase",
          existing: true,
          documentsUpdated: newDocuments.length > 0,
          message: "Une demande existe déjà pour cette année fiscale. Référence récupérée.",
        });
      }

      // Si existingReference est fournie mais demande non trouvée, log et créer nouvelle demande
      if (existingReference) {
        console.warn(`⚠️ Référence localStorage ${existingReference} non trouvée dans Supabase pour ${email}. Création d'une nouvelle demande.`);
      }
    }
    // ===================================

    const requestData = {
      status: "pending" as const,
      paid_at: undefined,
      payment: {
        amount: body.amount || 0,
        currency: body.currency || "CHF",
        method: body.paymentMethod,
      },
      customer: {
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        birthDate: body.birthDate,
        maritalStatus: body.maritalStatus,
        firstName2: body.firstName2,
        lastName2: body.lastName2,
        birthDate2: body.birthDate2,
        email: email || "",
        phone: body.phone,
        address: {
          street: body.street || "",
          npa: body.npa || "",
          city: body.city || "",
        },
        // Résidence à l'étranger
        livesAbroad: body.livesAbroad || false,
        countryOfResidence: body.countryOfResidence,
        abroadAddress: body.abroadAddress,
      },
      fiscal: {
        canton: body.cantonName || body.canton || "",
        cantonCode: cantonCode || "",
        taxYear: taxYear,
        taxpayerNumber: body.taxpayerNumber,
        declarationCode: body.declarationCode,
        clientType: body.clientType || "private",
        familyStatus: body.familyStatus,
        isIndependent: body.isIndependent || false,
        isIndependent2: body.isIndependent2 || false,
        employmentStatus: body.employmentStatus,
        occupationRate: body.occupationRate,
        employmentStatus2: body.employmentStatus2,
        occupationRate2: body.occupationRate2,
      },
      situation: {
        hasMoved: body.hasMoved,
        hasChildren: body.hasChildren,
        childrenCount: body.childrenCount,
        // Détails des enfants (prénom, date naissance, garde, etc.)
        children: body.children || [],
        monthlyRent: body.monthlyRent,
        // Identité bailleur (exigence NE, FR, JU)
        landlordName: body.landlordName,
        landlordAddress: body.landlordAddress,
      },
      financial: {
        hasPillar3a: body.hasPillar3a,
        pillar3aAmount: body.pillar3aAmount,
        hasStocks: body.hasStocks,
        stocksCount: body.stocksCount,
        hasSoldStocks: body.hasSoldStocks,
        soldStocksDetails: body.soldStocksDetails,
        hasGuardCosts: body.hasGuardCosts,
        guardCosts: body.guardCosts,
        hasMealsOutside: body.hasMealsOutside,
        mealsOutsideDays: body.mealsOutsideDays,
        hasAlimonyReceived: body.hasAlimonyReceived,
        alimonyReceived: body.alimonyReceived,
        hasAlimonyPaid: body.hasAlimonyPaid,
        alimonyPaid: body.alimonyPaid,
        hasDonations: body.hasDonations,
        donationsAmount: body.donationsAmount,
        hasDebts: body.hasDebts,
        debtsAmount: body.debtsAmount,
      },
      // Données spécifiques aux indépendants (adulte 1)
      business: body.isIndependent ? {
        businessType: body.businessType,
        businessStartDate: body.businessStartDate,
        hasIDE: body.hasIDE,
        ideNumber: body.ideNumber,
        isRegisteredRC: body.isRegisteredRC,
        hasVAT: body.hasVAT,
        vatNumber: body.vatNumber,
        hasAVSIndependent: body.hasAVSIndependent,
        avsIndependentAmount: body.avsIndependentAmount,
        hasLPPVoluntary: body.hasLPPVoluntary,
        lppVoluntaryAmount: body.lppVoluntaryAmount,
        hasHomeOffice: body.hasHomeOffice,
        homeOfficePercent: body.homeOfficePercent,
        homeOfficeAmount: body.homeOfficeAmount,
        hasBusinessVehicle: body.hasBusinessVehicle,
        businessVehiclePercent: body.businessVehiclePercent,
        businessVehicleExpenses: body.businessVehicleExpenses,
        // Comptabilité
        hasBusinessAccounts: body.hasBusinessAccounts,
        businessRevenue: body.businessRevenue,
        businessExpenses: body.businessExpenses,
      } : undefined,
      // Données spécifiques aux indépendants (adulte 2 / conjoint)
      business2: body.isIndependent2 ? {
        businessType: body.businessType2,
        businessStartDate: body.businessStartDate2,
        hasIDE: body.hasIDE2,
        ideNumber: body.ideNumber2,
        isRegisteredRC: body.isRegisteredRC2,
        hasVAT: body.hasVAT2,
        vatNumber: body.vatNumber2,
        hasAVSIndependent: body.hasAVSIndependent2,
        avsIndependentAmount: body.avsIndependentAmount2,
        hasLPPVoluntary: body.hasLPPVoluntary2,
        lppVoluntaryAmount: body.lppVoluntaryAmount2,
        hasHomeOffice: body.hasHomeOffice2,
        homeOfficePercent: body.homeOfficePercent2,
        homeOfficeAmount: body.homeOfficeAmount2,
        hasBusinessVehicle: body.hasBusinessVehicle2,
        businessVehiclePercent: body.businessVehiclePercent2,
        businessVehicleExpenses: body.businessVehicleExpenses2,
        // Comptabilité
        hasBusinessAccounts: body.hasBusinessAccounts2,
        businessRevenue: body.businessRevenue2,
        businessExpenses: body.businessExpenses2,
      } : undefined,
      property: {
        hasProperty: body.hasProperty,
        propertyCount: body.propertyCount,
        // Détails de chaque bien immobilier
        properties: body.properties || [],
        hasSoldProperty: body.hasSoldProperty,
        soldPropertyDetails: body.soldPropertyDetails,
        hasMortgage: body.hasMortgage,
        mortgageAmount: body.mortgageAmount,
        hasRenovations: body.hasRenovations,
        renovationsAmount: body.renovationsAmount,
      },
      workplaces: body.workplaces || [],
      options: {
        deliveryMethod: body.deliveryMethod,
        wantsReview: body.wantsReview,
        deadline: body.deadline,
        comments: body.comments,
      },
      documents: (body.documents || []).map((doc: { category: string; name: string; url?: string }) => ({
        ...doc,
        uploadedAt: new Date().toISOString(),
      })),
    };

    // Essayer Supabase d'abord (OBLIGATOIRE en production)
    if (isSupabaseConfigured()) {
      try {
        const supabaseRequest = await createSupabaseRequest(requestData);
        if (supabaseRequest) {
          console.log("📋 Demande fiscale créée dans Supabase:", supabaseRequest.reference);
          return NextResponse.json({
            success: true,
            reference: supabaseRequest.reference,
            id: supabaseRequest.id,
            storage: "supabase",
          });
        }

        // 🔴 CRITIQUE: Supabase configuré mais création échouée (retour null)
        console.error("❌ CRITIQUE: createSupabaseRequest a retourné null - demande NON sauvegardée!");
        console.error("❌ Email client:", requestData.customer.email);
        console.error("❌ Montant:", requestData.payment.amount, requestData.payment.currency);

        // En production, on NE DOIT PAS tomber en fallback mémoire
        // car la demande serait perdue au prochain déploiement
        return NextResponse.json(
          {
            error: "Erreur de sauvegarde de la demande. Veuillez réessayer.",
            details: "La base de données n'a pas pu enregistrer votre demande.",
          },
          { status: 500 }
        );
      } catch (supabaseError) {
        console.error("❌ CRITIQUE: Exception Supabase:", supabaseError);
        return NextResponse.json(
          {
            error: "Erreur de connexion à la base de données. Veuillez réessayer.",
          },
          { status: 500 }
        );
      }
    }

    // Fallback sur le store en mémoire (UNIQUEMENT si Supabase n'est PAS configuré - dev local)
    console.warn("⚠️ Supabase non configuré - utilisation du store en mémoire (dev uniquement)");

    const memoryRequest = createMemoryRequest({
      status: "pending",
      payment: requestData.payment,
      customer: requestData.customer,
      fiscal: {
        ...requestData.fiscal,
        clientType: requestData.fiscal.clientType as "private" | "independent" | "couple",
        employmentStatus: requestData.fiscal.employmentStatus as "employed" | "retired" | "unemployed" | undefined,
        employmentStatus2: requestData.fiscal.employmentStatus2 as "employed" | "retired" | "unemployed" | undefined,
      },
      situation: requestData.situation,
      financial: requestData.financial,
      property: requestData.property,
      workplaces: requestData.workplaces,
      options: requestData.options,
      documents: requestData.documents.map((d: { category: string; name: string; url?: string; uploadedAt: string }) => ({
        ...d,
        uploadedAt: new Date(d.uploadedAt),
      })),
    });

    console.log("📋 Demande fiscale créée en mémoire:", memoryRequest.reference);
    console.warn("⚠️ ATTENTION: Données en mémoire - seront perdues au redémarrage du serveur");

    return NextResponse.json({
      success: true,
      reference: memoryRequest.reference,
      id: memoryRequest.id,
      storage: "memory",
      warning: "Données stockées en mémoire uniquement - Configurez Supabase pour la persistance",
    });
  } catch (error) {
    console.error("Erreur création demande fiscale:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la demande" },
      { status: 500 }
    );
  }
}

// GET - Obtenir toutes les demandes (admin)
export async function GET(request: NextRequest) {
  try {
    // Vérifier le mot de passe admin
    const adminPassword = request.headers.get("x-admin-password");
    if (!process.env.ADMIN_PASSWORD) {
      console.error("❌ ADMIN_PASSWORD non configuré");
      return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
    }
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (adminPassword !== expectedPassword) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Essayer Supabase d'abord
    if (isSupabaseConfigured()) {
      const requests = await getSupabaseRequests();
      const stats = await getSupabaseStats();

      return NextResponse.json({
        requests,
        stats,
        storage: "supabase",
      });
    }

    // Fallback sur le store en mémoire
    const requests = getMemoryRequests();
    const stats = getMemoryStats();

    return NextResponse.json({
      requests: requests.map(r => ({
        ...r,
        created_at: r.createdAt.toISOString(),
        updated_at: r.updatedAt.toISOString(),
        paid_at: r.paidAt?.toISOString(),
      })),
      stats,
      storage: "memory",
      warning: "Données stockées en mémoire - Configurez Supabase pour la persistance",
    });
  } catch (error) {
    console.error("Erreur récupération demandes fiscales:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des demandes" },
      { status: 500 }
    );
  }
}
