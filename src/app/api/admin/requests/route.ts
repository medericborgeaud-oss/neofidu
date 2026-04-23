import { NextRequest, NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  getAllTaxRequests as getSupabaseRequests,
  getTaxRequestStats as getSupabaseStats,
  getCombinedStats,
  getAllGenericRequests,
  updateTaxRequestStatus,
  updateGenericRequestStatus,
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
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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
        method: "card",
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
        method: "card",
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
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
    }

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
      // Show ALL tax requests including pending ones
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
        // Accounting-specific fields
        billingFrequency: req.data?.billingFrequency as string || "",
        activity: req.data?.activity as string || "",
        employeesCount: req.data?.employeesCount as number || 0,
        annualRevenue: req.data?.annualRevenue as string || "",
        monthlyTransactions: req.data?.monthlyTransactions as string || "",
        isVatRegistered: req.data?.isVatRegistered as boolean || false,
        currentAccountingSoftware: req.data?.currentAccountingSoftware as string || "",
        businessType: req.data?.businessType as string || "",
        // Creation-specific fields
        companyType: req.data?.companyType as string || "",
        companyTypeName: req.data?.companyTypeName as string || "",
        projectDescription: req.data?.projectDescription as string || "",
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

    // Sinon, essayer de récupérer les demandes depuis le store en mémoire
    // Import du store en mémoire
    const { getAllTaxRequests: getMemoryRequests, getTaxRequestStats: getMemoryStats } = await import("@/lib/tax-requests-store");
    const memoryRequests = getMemoryRequests();
    const memoryStats = getMemoryStats();

    // Si des demandes existent en mémoire, les afficher
    if (memoryRequests.length > 0) {
      console.log(`[ADMIN] ${memoryRequests.length} demande(s) trouvée(s) en mémoire`);

      const transformedMemoryRequests = memoryRequests.map(req => ({
        id: req.id,
        reference: req.reference,
        requestType: "tax" as const,
        status: req.status,
        createdAt: req.createdAt.toISOString(),
        updatedAt: req.updatedAt.toISOString(),
        paidAt: req.paidAt?.toISOString(),
        payment: req.payment,
        customer: req.customer,
        fiscal: req.fiscal,
        situation: req.situation,
        financial: req.financial,
        property: req.property,
        workplaces: req.workplaces,
        options: req.options,
        documents: req.documents.map(d => ({
          ...d,
          uploadedAt: d.uploadedAt.toISOString(),
        })),
      }));

      return NextResponse.json({
        requests: transformedMemoryRequests,
        stats: memoryStats,
        statusHistory: [],
        chartData: {
          daily: [],
          byCanton: [],
        },
        demo: false,
        storage: "memory",
        warning: "⚠️ Données stockées en mémoire - Configurez Supabase pour la persistance",
      });
    }

    // Sinon retourner les données de démo
    console.log("[ADMIN] Aucune demande en mémoire, affichage des données de démo");
    const demoRequests = getDemoRequests();
    // Transform demo requests for frontend compatibility
    // IMPORTANT: Only show PAID tax requests (filter out "pending" status)
    const paidDemoRequests = demoRequests.filter(req => req.status !== "pending");
    const transformedDemoRequests = paidDemoRequests.map(req => ({
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
        billingFrequency: "annual",
        activity: "Services informatiques",
        employeesCount: 3,
        annualRevenue: "CHF 250'000.-",
        businessType: "sarl",
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
        paid: paidDemoRequests.length, // Only paid tax requests
        pending: demoAccountingRequests.length + demoPropertyRequests.length, // Accounting/property requests awaiting processing
        inProgress: paidDemoRequests.filter(r => r.status === "in_progress").length,
        completed: paidDemoRequests.filter(r => r.status === "completed" || r.status === "delivered").length,
        totalRevenue: paidDemoRequests.reduce((sum, r) => sum + r.payment.amount, 0),
        byType: {
          tax: paidDemoRequests.length, // Only paid tax requests
          accounting: demoAccountingRequests.length,
          property: demoPropertyRequests.length,
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
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
    }

    const authHeader = request.headers.get("x-admin-password");

    if (authHeader !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, sendNotification, oldStatus, requestType } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID et statut requis" },
        { status: 400 }
      );
    }

    // Valid statuses for both tax and generic requests
    const validStatuses = ["pending", "paid", "in_progress", "completed", "received", "processing", "done"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Statut invalide. Statuts autorisés: pending, paid, in_progress, completed, received, processing, done" },
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

    // Determine if this is a tax request or a generic request
    const isTaxRequest = requestType === "tax" || !requestType || id.startsWith("tax_");
    const isGenericRequest = requestType === "accounting" || requestType === "property" || requestType === "creation" || id.startsWith("acc_") || id.startsWith("prop_") || id.startsWith("cre_");

    let updatedRequest: TaxRequestDB | null = null;
    let updatedGenericRequest: GenericRequestDB | null = null;
    let customerEmail: string | undefined;
    let customerFirstName: string | undefined;
    let requestReference: string | undefined;

    console.log(`[ADMIN API] Mise à jour statut: id=${id}, status=${status}, requestType=${requestType}, isGenericRequest=${isGenericRequest}`);

    if (isGenericRequest) {
      // Update generic request (accounting/property)
      console.log(`[ADMIN API] Tentative mise à jour générique: id=${id}, nouveau status=${status}`);
      updatedGenericRequest = await updateGenericRequestStatus(id, status);
      console.log(`[ADMIN API] Résultat mise à jour générique:`, updatedGenericRequest
        ? `OK - ref=${updatedGenericRequest.reference}, status retourné=${updatedGenericRequest.status}`
        : "ÉCHEC - null retourné");
      if (updatedGenericRequest) {
        customerEmail = updatedGenericRequest.customer_email;
        customerFirstName = updatedGenericRequest.customer_name?.split(" ")[0];
        requestReference = updatedGenericRequest.reference;
      }
    } else {
      // Update tax request
      updatedRequest = await updateTaxRequestStatus(id, status);
      console.log(`[ADMIN API] Résultat mise à jour fiscale:`, updatedRequest ? `OK - ${updatedRequest.reference}, nouveau statut: ${updatedRequest.status}` : "ÉCHEC");
      if (updatedRequest) {
        customerEmail = updatedRequest.customer.email;
        customerFirstName = updatedRequest.customer.firstName;
        requestReference = updatedRequest.reference;
      }
    }

    // If both failed, try the other type
    if (!updatedRequest && !updatedGenericRequest) {
      // Try generic if tax failed
      if (!isGenericRequest) {
        updatedGenericRequest = await updateGenericRequestStatus(id, status);
        if (updatedGenericRequest) {
          customerEmail = updatedGenericRequest.customer_email;
          customerFirstName = updatedGenericRequest.customer_name?.split(" ")[0];
          requestReference = updatedGenericRequest.reference;
        }
      }
      // Try tax if generic failed
      if (!updatedGenericRequest && !isGenericRequest) {
        updatedRequest = await updateTaxRequestStatus(id, status);
        if (updatedRequest) {
          customerEmail = updatedRequest.customer.email;
          customerFirstName = updatedRequest.customer.firstName;
          requestReference = updatedRequest.reference;
        }
      }
    }

    if (!updatedRequest && !updatedGenericRequest) {
      console.error(`[ADMIN API] Demande non trouvée pour id=${id}, requestType=${requestType}`);
      return NextResponse.json(
        {
          error: "Demande non trouvée dans la base de données. Elle a peut-être été créée avant la configuration de Supabase.",
          suggestion: "Vérifiez que la demande existe dans Supabase ou recréez-la."
        },
        { status: 404 }
      );
    }

    // Ajouter à l'historique des statuts (only for tax requests with proper reference)
    if (oldStatus && oldStatus !== status && requestReference) {
      await addStatusHistory(
        id,
        requestReference,
        oldStatus,
        status,
        "admin",
        sendNotification || false
      );
    }

    // Envoyer une notification email si demandé
    if (sendNotification && resend && customerEmail) {
      // Tous les statuts en français
      const statusLabels: Record<string, string> = {
        // Statuts demandes fiscales
        pending: "En attente de paiement",
        paid: "Payée",
        in_progress: "En cours de traitement",
        completed: "Terminée",
        delivered: "Livrée",
        // Statuts demandes comptabilité / gérance immobilière
        received: "Reçue",
        processing: "En traitement",
        done: "Terminée",
      };

      const statusMessages: Record<string, string> = {
        // Messages pour demandes fiscales
        pending: "Votre demande est en attente de paiement.",
        paid: "Votre paiement a été confirmé. Nous allons commencer le traitement de votre dossier.",
        in_progress: "Notre équipe travaille actuellement sur votre déclaration d'impôts.",
        completed: "Votre déclaration d'impôts est terminée et prête à être envoyée.",
        delivered: "Votre déclaration d'impôts a été envoyée. Merci de votre confiance !",
        // Messages pour demandes comptabilité / gérance
        received: "Votre demande a bien été reçue. Un conseiller vous contactera rapidement.",
        processing: "Notre équipe travaille actuellement sur votre dossier.",
        done: "Votre dossier est terminé. Merci de votre confiance !",
      };

      try {
        // Get request details for email
        const emailDetails = updatedRequest ? {
          canton: updatedRequest.fiscal.canton,
          taxYear: updatedRequest.fiscal.taxYear,
          clientType: updatedRequest.fiscal.clientType,
        } : updatedGenericRequest ? {
          canton: updatedGenericRequest.canton || "N/A",
          taxYear: new Date().getFullYear(),
          clientType: updatedGenericRequest.type === "accounting" ? "Comptabilité" : "Gérance immobilière",
        } : null;

        await resend.emails.send({
          from: "NeoFidu <noreply@neofidu.ch>",
          to: customerEmail,
          subject: `Mise à jour de votre demande ${requestReference}`,
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
                  <p>Bonjour ${customerFirstName || ""},</p>

                  <p>Le statut de votre demande <strong>${requestReference}</strong> a été mis à jour :</p>

                  <p style="text-align: center;">
                    <span class="status-badge">${statusLabels[status] || status}</span>
                  </p>

                  <p>${statusMessages[status] || ""}</p>

                  ${emailDetails ? `
                  <p><strong>Rappel de votre demande :</strong></p>
                  <ul>
                    <li>Canton : ${emailDetails.canton}</li>
                    <li>Année : ${emailDetails.taxYear}</li>
                    <li>Type : ${emailDetails.clientType === "couple" ? "Couple" : emailDetails.clientType === "independent" ? "Indépendant" : emailDetails.clientType === "private" ? "Particulier" : emailDetails.clientType}</li>
                  </ul>
                  ` : ""}

                  <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 20px; margin: 24px 0;">
                    <p style="margin: 0 0 12px; color: #065f46; font-size: 16px; font-weight: 600;">
                      📍 Suivre votre demande
                    </p>
                    <p style="margin: 0 0 16px; color: #047857; font-size: 14px; line-height: 1.5;">
                      Rendez-vous sur notre page de suivi et entrez votre référence <strong>${requestReference}</strong> pour voir l'avancement de votre dossier.
                    </p>
                    <a href="https://www.neofidu.ch/suivi" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Suivre ma demande →
                    </a>
                  </div>

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
      request: updatedRequest || updatedGenericRequest,
      requestType: updatedRequest ? "tax" : (updatedGenericRequest?.type || "generic"),
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
