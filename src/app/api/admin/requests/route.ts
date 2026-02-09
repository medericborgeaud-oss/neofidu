import { NextRequest, NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  getAllTaxRequests as getSupabaseRequests,
  getTaxRequestStats as getSupabaseStats,
  getCombinedStats,
  getAllGenericRequests,
  updateTaxRequestStatus,
  addStatusHistory,
  getAllStatusHistory,
  getRequestsPerDay,
  getRequestsPerCanton,
  TaxRequestDB,
  GenericRequestDB,
  StatusHistoryEntry
} from "@/lib/supabase";
import { Resend } from "resend";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Mot de passe admin
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "neofidu-admin-2024";

// Resend pour les emails
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Données de démonstration enrichies
function getDemoRequests(): TaxRequestDB[] {
  const now = new Date();
  return [
    {
      id: "tax_demo_001",
      reference: "NF-DEMO001A",
      status: "paid",
      created_at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
      updated_at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
      paid_at: new Date(now.getTime() - 1000 * 60 * 28).toISOString(),
      payment: {
        amount: 162,
        currency: "CHF",
        method: "card",
        stripePaymentIntentId: "pi_demo_001",
      },
      customer: {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        phone: "+41 79 123 45 67",
        address: {
          street: "Rue de la Gare 12",
          npa: "1003",
          city: "Lausanne",
        },
      },
      fiscal: {
        canton: "Vaud",
        cantonCode: "VD",
        taxYear: 2024,
        taxpayerNumber: "12345678",
        declarationCode: "ABC123",
        clientType: "couple",
        employmentStatus: "employed",
        employmentStatus2: "employed",
      },
      situation: {
        hasMoved: false,
        hasChildren: true,
        childrenCount: 2,
        monthlyRent: "2500",
      },
      financial: {
        hasPillar3a: true,
        pillar3aAmount: "7056",
        hasStocks: true,
        stocksCount: 3,
        hasGuardCosts: true,
        guardCosts: "12000",
        hasAlimonyReceived: false,
        hasAlimonyPaid: false,
        hasDonations: true,
        donationsAmount: "500",
        hasDebts: false,
      },
      property: {
        hasProperty: false,
      },
      workplaces: [
        {
          adult: 1,
          employerName: "Swisscom SA",
          transportMode: "train",
          workplaceAddress: "Berne",
          daysPerYear: "220",
          distanceKm: "100",
          employerReimbursement: false,
          reimbursementType: "",
          reimbursementAmount: "",
        },
        {
          adult: 2,
          employerName: "CHUV",
          transportMode: "car",
          workplaceAddress: "Lausanne",
          daysPerYear: "200",
          distanceKm: "15",
          employerReimbursement: true,
          reimbursementType: "partial",
          reimbursementAmount: "100",
        },
      ],
      options: {
        deliveryMethod: "email",
        wantsReview: true,
        deadline: "normal",
        comments: "Merci de m'appeler si vous avez des questions.",
      },
      documents: [
        { category: "salary", name: "Certificat de salaire 2024 - Jean.pdf", uploadedAt: new Date().toISOString() },
        { category: "salary", name: "Certificat de salaire 2024 - Marie.pdf", uploadedAt: new Date().toISOString() },
        { category: "bank", name: "Relevés bancaires UBS.pdf", uploadedAt: new Date().toISOString() },
        { category: "insurance", name: "Attestation assurance maladie.pdf", uploadedAt: new Date().toISOString() },
        { category: "pillar3a", name: "Attestation 3ème pilier.pdf", uploadedAt: new Date().toISOString() },
        { category: "stocks", name: "Relevé titres.pdf", uploadedAt: new Date().toISOString() },
        { category: "childcare", name: "Factures crèche 2024.pdf", uploadedAt: new Date().toISOString() },
        { category: "donations", name: "Reçus dons.pdf", uploadedAt: new Date().toISOString() },
      ],
    },
    {
      id: "tax_demo_002",
      reference: "NF-DEMO002B",
      status: "in_progress",
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      updated_at: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
      paid_at: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      payment: {
        amount: 108,
        currency: "CHF",
        method: "twint",
        stripePaymentIntentId: "pi_demo_002",
      },
      customer: {
        firstName: "Marie",
        lastName: "Martin",
        email: "marie.martin@example.com",
        phone: "+41 78 987 65 43",
        address: {
          street: "Avenue de Champel 45",
          npa: "1206",
          city: "Genève",
        },
      },
      fiscal: {
        canton: "Genève",
        cantonCode: "GE",
        taxYear: 2024,
        taxpayerNumber: "87654321",
        clientType: "private",
        employmentStatus: "employed",
      },
      situation: {
        hasMoved: true,
        hasChildren: false,
        monthlyRent: "1800",
      },
      financial: {
        hasPillar3a: true,
        pillar3aAmount: "7056",
        hasStocks: false,
        hasGuardCosts: false,
        hasAlimonyReceived: false,
        hasAlimonyPaid: true,
        alimonyPaid: "18000",
        hasDonations: false,
        hasDebts: false,
      },
      property: {
        hasProperty: false,
      },
      workplaces: [
        {
          adult: 1,
          employerName: "UBS Geneva",
          transportMode: "bus",
          workplaceAddress: "Genève",
          daysPerYear: "230",
          distanceKm: "5",
          employerReimbursement: false,
          reimbursementType: "",
          reimbursementAmount: "",
        },
      ],
      options: {
        deliveryMethod: "email",
        wantsReview: false,
        deadline: "urgent",
      },
      documents: [
        { category: "salary", name: "Certificat de salaire.pdf", uploadedAt: new Date().toISOString() },
        { category: "bank", name: "Relevés bancaires.pdf", uploadedAt: new Date().toISOString() },
        { category: "insurance", name: "Assurance maladie.pdf", uploadedAt: new Date().toISOString() },
        { category: "pillar3a", name: "3ème pilier.pdf", uploadedAt: new Date().toISOString() },
        { category: "alimony", name: "Jugement pension alimentaire.pdf", uploadedAt: new Date().toISOString() },
      ],
    },
    {
      id: "tax_demo_003",
      reference: "NF-DEMO003C",
      status: "completed",
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      updated_at: new Date(now.getTime() - 1000 * 60 * 60 * 12).toISOString(),
      paid_at: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      payment: {
        amount: 195,
        currency: "CHF",
        method: "card",
        stripePaymentIntentId: "pi_demo_003",
      },
      customer: {
        firstName: "Pierre",
        lastName: "Blanc",
        email: "pierre.blanc@example.com",
        phone: "+41 76 555 44 33",
        address: {
          street: "Route de Sion 78",
          npa: "1950",
          city: "Sion",
        },
      },
      fiscal: {
        canton: "Valais",
        cantonCode: "VS",
        taxYear: 2023,
        taxpayerNumber: "11223344",
        declarationCode: "XYZ789",
        clientType: "independent",
        employmentStatus: "employed",
      },
      situation: {
        hasMoved: false,
        hasChildren: true,
        childrenCount: 1,
        monthlyRent: "0",
      },
      financial: {
        hasPillar3a: true,
        pillar3aAmount: "35280",
        hasStocks: true,
        stocksCount: 5,
        hasGuardCosts: false,
        hasAlimonyReceived: false,
        hasAlimonyPaid: false,
        hasDonations: true,
        donationsAmount: "1000",
        hasDebts: true,
        debtsAmount: "15000",
      },
      property: {
        hasProperty: true,
        propertyCount: 1,
        hasMortgage: true,
        mortgageAmount: "450000",
        hasRenovations: true,
        renovationsAmount: "25000",
      },
      workplaces: [],
      options: {
        deliveryMethod: "postal",
        wantsReview: true,
        deadline: "normal",
        comments: "Indépendant, comptabilité jointe.",
      },
      documents: [
        { category: "business", name: "Bilan 2023.pdf", uploadedAt: new Date().toISOString() },
        { category: "business", name: "Compte de résultat 2023.pdf", uploadedAt: new Date().toISOString() },
        { category: "bank", name: "Relevés bancaires privés.pdf", uploadedAt: new Date().toISOString() },
        { category: "bank", name: "Relevés bancaires professionnels.pdf", uploadedAt: new Date().toISOString() },
        { category: "insurance", name: "Assurance maladie.pdf", uploadedAt: new Date().toISOString() },
        { category: "pillar3a", name: "3ème pilier.pdf", uploadedAt: new Date().toISOString() },
        { category: "stocks", name: "Portefeuille titres.pdf", uploadedAt: new Date().toISOString() },
        { category: "property", name: "Hypothèque.pdf", uploadedAt: new Date().toISOString() },
        { category: "renovations", name: "Factures travaux.pdf", uploadedAt: new Date().toISOString() },
        { category: "donations", name: "Reçus dons.pdf", uploadedAt: new Date().toISOString() },
        { category: "debts", name: "Attestation dettes.pdf", uploadedAt: new Date().toISOString() },
      ],
    },
    {
      id: "tax_demo_004",
      reference: "NF-DEMO004D",
      status: "paid",
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
      updated_at: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
      paid_at: new Date(now.getTime() - 1000 * 60 * 60 * 3).toISOString(),
      payment: {
        amount: 76,
        currency: "CHF",
        method: "twint",
        stripePaymentIntentId: "pi_demo_004",
      },
      customer: {
        firstName: "Sophie",
        lastName: "Rouge",
        email: "sophie.rouge@example.com",
        address: {
          street: "Rue du Château 5",
          npa: "2000",
          city: "Neuchâtel",
        },
      },
      fiscal: {
        canton: "Neuchâtel",
        cantonCode: "NE",
        taxYear: 2024,
        taxpayerNumber: "55667788",
        clientType: "private",
        employmentStatus: "retired",
      },
      situation: {
        hasMoved: false,
        hasChildren: false,
        monthlyRent: "1200",
      },
      financial: {
        hasPillar3a: false,
        hasStocks: false,
        hasGuardCosts: false,
        hasAlimonyReceived: true,
        alimonyReceived: "24000",
        hasAlimonyPaid: false,
        hasDonations: false,
        hasDebts: false,
      },
      property: {
        hasProperty: false,
      },
      workplaces: [],
      options: {
        deliveryMethod: "email",
        wantsReview: false,
        deadline: "normal",
      },
      documents: [
        { category: "pension", name: "Attestation AVS.pdf", uploadedAt: new Date().toISOString() },
        { category: "pension", name: "Attestation LPP.pdf", uploadedAt: new Date().toISOString() },
        { category: "bank", name: "Relevés bancaires.pdf", uploadedAt: new Date().toISOString() },
        { category: "insurance", name: "Assurance maladie.pdf", uploadedAt: new Date().toISOString() },
        { category: "alimony", name: "Convention pension.pdf", uploadedAt: new Date().toISOString() },
      ],
    },
    {
      id: "tax_demo_005",
      reference: "NF-DEMO005E",
      status: "delivered",
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
      updated_at: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
      paid_at: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
      payment: {
        amount: 54,
        currency: "CHF",
        method: "card",
        stripePaymentIntentId: "pi_demo_005",
      },
      customer: {
        firstName: "Luc",
        lastName: "Vert",
        email: "luc.vert@example.com",
        phone: "+41 79 111 22 33",
        address: {
          street: "Boulevard de Pérolles 20",
          npa: "1700",
          city: "Fribourg",
        },
      },
      fiscal: {
        canton: "Fribourg",
        cantonCode: "FR",
        taxYear: 2024,
        taxpayerNumber: "99887766",
        clientType: "private",
        employmentStatus: "unemployed",
      },
      situation: {
        hasMoved: false,
        hasChildren: false,
        monthlyRent: "950",
      },
      financial: {
        hasPillar3a: false,
        hasStocks: false,
        hasGuardCosts: false,
        hasAlimonyReceived: false,
        hasAlimonyPaid: false,
        hasDonations: false,
        hasDebts: false,
      },
      property: {
        hasProperty: false,
      },
      workplaces: [],
      options: {
        deliveryMethod: "email",
        wantsReview: false,
        deadline: "normal",
      },
      documents: [
        { category: "unemployment", name: "Attestation chômage.pdf", uploadedAt: new Date().toISOString() },
        { category: "bank", name: "Relevés bancaires.pdf", uploadedAt: new Date().toISOString() },
        { category: "insurance", name: "Assurance maladie.pdf", uploadedAt: new Date().toISOString() },
      ],
    },
  ];
}

// Transform snake_case dates to camelCase for frontend compatibility
function transformRequestForFrontend(request: TaxRequestDB) {
  return {
    ...request,
    // Transform date fields from snake_case to camelCase
    createdAt: request.created_at,
    updatedAt: request.updated_at,
    paidAt: request.paid_at,
  };
}

// GET - Récupérer toutes les demandes
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");

    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // Utiliser Supabase si configuré
    if (isSupabaseConfigured()) {
      const [taxRequests, genericRequests, stats, history, chartDataDaily, chartDataCanton] = await Promise.all([
        getSupabaseRequests(),
        getAllGenericRequests(),
        getCombinedStats(),
        getAllStatusHistory(50),
        getRequestsPerDay(30),
        getRequestsPerCanton(),
      ]);

      // Transform tax requests for frontend compatibility (camelCase dates)
      const transformedTaxRequests = taxRequests.map(req => ({
        ...transformRequestForFrontend(req),
        requestType: "tax" as const,
      }));

      // Transform generic requests (accounting, property) for frontend compatibility
      const transformedGenericRequests = genericRequests.map(req => ({
        id: req.id,
        reference: req.reference,
        requestType: req.type,
        status: req.status === "received" ? "paid" : req.status, // Map 'received' to 'paid' for display
        createdAt: req.created_at,
        updatedAt: req.updated_at,
        paidAt: req.created_at, // Use created_at as paidAt for generic requests
        payment: {
          amount: req.amount || 0,
          currency: "CHF",
          method: "pending",
        },
        customer: {
          firstName: req.customer_name?.split(" ")[0] || "",
          lastName: req.customer_name?.split(" ").slice(1).join(" ") || "",
          email: req.customer_email || "",
          phone: req.customer_phone || "",
          address: {
            street: req.data?.street as string || "",
            npa: req.data?.npa as string || "",
            city: req.data?.city as string || "",
          },
        },
        fiscal: {
          canton: req.canton || "",
          cantonCode: req.canton?.substring(0, 2)?.toUpperCase() || "",
          taxYear: new Date().getFullYear(),
          clientType: req.type === "accounting" ? "business" : "property",
        },
        situation: {},
        financial: {},
        property: {},
        workplaces: [],
        options: {
          comments: req.data?.comments as string || "",
        },
        documents: req.documents || [],
        // Extra data for display
        companyName: req.data?.companyName as string || "",
        propertyAddress: req.data?.propertyAddress as string || "",
        selectedServices: req.data?.selectedServices as string[] || [],
      }));

      // Combine all requests, sorted by date
      const allRequests = [...transformedTaxRequests, ...transformedGenericRequests]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return NextResponse.json({
        requests: allRequests,
        stats,
        statusHistory: history,
        chartData: {
          daily: chartDataDaily,
          byCanton: chartDataCanton,
        },
        demo: false,
      });
    }

    // Sinon retourner les données de démo
    const demoRequests = getDemoRequests();
    // Transform demo requests for frontend compatibility
    const transformedDemoRequests = demoRequests.map(req => ({
      ...transformRequestForFrontend(req),
      requestType: "tax" as const,
    }));

    // Add demo accounting and property requests
    const now = new Date();
    const demoAccountingRequests = [
      {
        id: "acc_demo_001",
        reference: "NF-CPT-DEMO01",
        requestType: "accounting" as const,
        status: "received",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
        paidAt: null,
        payment: { amount: 0, currency: "CHF", method: "pending" },
        customer: {
          firstName: "Marc",
          lastName: "Entreprise",
          email: "marc@entreprise.ch",
          phone: "+41 79 333 44 55",
          address: { street: "Rue du Commerce 15", npa: "1003", city: "Lausanne" },
        },
        fiscal: {
          canton: "Vaud",
          cantonCode: "VD",
          taxYear: 2024,
          clientType: "business",
        },
        situation: {},
        financial: {},
        property: {},
        workplaces: [],
        options: { comments: "Nouvelle entreprise, besoin de mise en place comptabilité" },
        documents: [
          { category: "accounting", name: "Extrait RC.pdf", uploadedAt: now.toISOString() },
          { category: "accounting", name: "Comptabilité existante.xlsx", uploadedAt: now.toISOString() },
        ],
        companyName: "TechStartup Sàrl",
        selectedServices: ["Tenue de comptabilité", "Déclarations TVA", "Bilan annuel"],
      },
    ];

    const demoPropertyRequests = [
      {
        id: "prop_demo_001",
        reference: "NF-GI-DEMO01",
        requestType: "property" as const,
        status: "received",
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 8).toISOString(),
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 8).toISOString(),
        paidAt: null,
        payment: { amount: 1620, currency: "CHF", method: "pending" },
        customer: {
          firstName: "Claire",
          lastName: "Immobilier",
          email: "claire.immo@email.ch",
          phone: "+41 78 111 22 33",
          address: { street: "Avenue de la Gare 5", npa: "1950", city: "Sion" },
        },
        fiscal: {
          canton: "Valais",
          cantonCode: "VS",
          taxYear: 2024,
          clientType: "property",
        },
        situation: {},
        financial: {},
        property: {},
        workplaces: [],
        options: { comments: "Appartement en location, recherche gérance complète" },
        documents: [],
        propertyAddress: "Rue des Alpes 12, 1950 Sion",
      },
    ];

    // Combine all demo requests
    const allDemoRequests = [...transformedDemoRequests, ...demoAccountingRequests, ...demoPropertyRequests]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Générer des données de démo pour les graphiques
    const chartNow = new Date();
    const demoChartDaily = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(chartNow);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const count = Math.floor(Math.random() * 5);
      demoChartDaily.push({
        date: dateStr,
        count,
        revenue: count * (50 + Math.floor(Math.random() * 100)),
      });
    }

    const demoChartCanton = [
      { canton: "VD", count: 12, revenue: 1850 },
      { canton: "GE", count: 8, revenue: 1200 },
      { canton: "VS", count: 6, revenue: 890 },
      { canton: "NE", count: 4, revenue: 540 },
      { canton: "FR", count: 3, revenue: 420 },
      { canton: "JU", count: 2, revenue: 280 },
    ];

    const demoHistory: StatusHistoryEntry[] = [
      {
        id: "hist_demo_1",
        request_id: "tax_demo_002",
        request_reference: "NF-DEMO002B",
        old_status: "paid",
        new_status: "in_progress",
        changed_at: new Date(chartNow.getTime() - 1000 * 60 * 60).toISOString(),
        changed_by: "admin",
        notification_sent: true,
      },
      {
        id: "hist_demo_2",
        request_id: "tax_demo_003",
        request_reference: "NF-DEMO003C",
        old_status: "in_progress",
        new_status: "completed",
        changed_at: new Date(chartNow.getTime() - 1000 * 60 * 60 * 12).toISOString(),
        changed_by: "admin",
        notification_sent: true,
      },
      {
        id: "hist_demo_3",
        request_id: "tax_demo_005",
        request_reference: "NF-DEMO005E",
        old_status: "completed",
        new_status: "delivered",
        changed_at: new Date(chartNow.getTime() - 1000 * 60 * 60 * 6).toISOString(),
        changed_by: "admin",
        notification_sent: true,
      },
    ];

    return NextResponse.json({
      requests: allDemoRequests,
      stats: {
        total: allDemoRequests.length,
        paid: demoRequests.filter(r => r.status !== "pending").length,
        pending: demoRequests.filter(r => r.status === "pending").length + 2, // +2 for accounting/property
        inProgress: demoRequests.filter(r => r.status === "in_progress").length,
        completed: demoRequests.filter(r => r.status === "completed" || r.status === "delivered").length,
        totalRevenue: demoRequests.reduce((sum, r) => sum + r.payment.amount, 0),
        byType: {
          tax: demoRequests.length,
          accounting: 1,
          property: 1,
        },
      },
      statusHistory: demoHistory,
      chartData: {
        daily: demoChartDaily,
        byCanton: demoChartCanton,
      },
      demo: true,
    });
  } catch (error) {
    console.error("Erreur récupération demandes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des demandes" },
      { status: 500 }
    );
  }
}

// PATCH - Modifier le statut d'une demande
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-password");

    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, sendNotification, oldStatus } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID et statut requis" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "paid", "in_progress", "completed", "delivered"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Statut invalide" },
        { status: 400 }
      );
    }

    // Mode démo
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Mode démo - statut non modifié en base de données",
        demo: true,
      });
    }

    // Mettre à jour en base de données
    const updatedRequest = await updateTaxRequestStatus(id, status);

    if (!updatedRequest) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour" },
        { status: 500 }
      );
    }

    // Ajouter à l'historique des statuts
    if (oldStatus && oldStatus !== status) {
      await addStatusHistory(
        id,
        updatedRequest.reference,
        oldStatus,
        status,
        "admin",
        sendNotification || false
      );
    }

    // Envoyer une notification email si demandé
    if (sendNotification && resend && updatedRequest.customer.email) {
      const statusLabels: Record<string, string> = {
        paid: "Payée",
        in_progress: "En cours de traitement",
        completed: "Terminée",
        delivered: "Livrée",
      };

      const statusMessages: Record<string, string> = {
        paid: "Votre paiement a été confirmé. Nous allons commencer le traitement de votre dossier.",
        in_progress: "Notre équipe travaille actuellement sur votre déclaration d'impôts.",
        completed: "Votre déclaration d'impôts est prête ! Elle sera bientôt envoyée.",
        delivered: "Votre déclaration d'impôts a été envoyée. Merci de votre confiance !",
      };

      try {
        await resend.emails.send({
          from: "NeoFidu <noreply@neofidu.ch>",
          to: updatedRequest.customer.email,
          subject: `Mise à jour de votre demande ${updatedRequest.reference}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
                .status-badge { display: inline-block; background: #10B981; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; margin: 10px 0; }
                .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">NeoFidu</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Mise à jour de votre demande</p>
                </div>
                <div class="content">
                  <p>Bonjour ${updatedRequest.customer.firstName},</p>

                  <p>Le statut de votre demande <strong>${updatedRequest.reference}</strong> a été mis à jour :</p>

                  <p style="text-align: center;">
                    <span class="status-badge">${statusLabels[status] || status}</span>
                  </p>

                  <p>${statusMessages[status] || ""}</p>

                  <p><strong>Rappel de votre demande :</strong></p>
                  <ul>
                    <li>Canton : ${updatedRequest.fiscal.canton}</li>
                    <li>Année fiscale : ${updatedRequest.fiscal.taxYear}</li>
                    <li>Type : ${updatedRequest.fiscal.clientType === "couple" ? "Couple" : updatedRequest.fiscal.clientType === "independent" ? "Indépendant" : "Particulier"}</li>
                  </ul>

                  <p>Vous pouvez suivre l'avancement de votre demande sur notre site avec votre référence.</p>

                  <p>Cordialement,<br><strong>L'équipe NeoFidu</strong></p>
                </div>
                <div class="footer">
                  <p>© 2026 NeoFidu - Fiduciaire digitale en Suisse romande</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Erreur envoi email notification:", emailError);
        // On ne bloque pas la mise à jour si l'email échoue
      }
    }

    return NextResponse.json({
      success: true,
      request: updatedRequest,
      notificationSent: sendNotification && !!resend,
    });
  } catch (error) {
    console.error("Erreur mise à jour statut:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du statut" },
      { status: 500 }
    );
  }
}
