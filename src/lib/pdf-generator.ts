// @ts-nocheck
import PdfPrinter from "pdfmake";
import type { TaxSummaryData } from "./email";

// Define fonts - use standard fonts for serverless environments
const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

// Labels for translations
const transportLabels: Record<string, string> = {
  train: "Transports publics",
  car: "Voiture",
  bike: "Vélo / À pied",
  none: "Pas de trajet (télétravail)",
};

const clientTypeLabels: Record<string, string> = {
  private: "Client privé",
  independent: "Indépendant",
  couple: "Couple marié",
};

const employmentLabels: Record<string, string> = {
  employed: "Salarié(e)",
  retired: "Retraité(e)",
  unemployed: "Au chômage",
};

const deliveryLabels: Record<string, string> = {
  email: "Par email",
  postal: "Par courrier postal",
  both: "Email + Courrier postal",
};

// Helper function to create a section header
function sectionHeader(title: string) {
  return {
    table: {
      widths: ["*"],
      body: [
        [
          {
            text: title,
            style: "sectionHeader",
            border: [false, false, false, true],
            borderColor: ["#0d9488", "#0d9488", "#0d9488", "#0d9488"],
          },
        ],
      ],
    },
    margin: [0, 15, 0, 10] as [number, number, number, number],
  };
}

// Helper function to create a data row
function dataRow(
  label: string,
  value: string | number | undefined | null,
  highlight: boolean = false
) {
  return {
    columns: [
      {
        text: label,
        width: 180,
        style: "label",
      },
      {
        text: value?.toString() || "Non renseigné",
        width: "*",
        style: highlight ? "valueHighlight" : "value",
      },
    ],
    margin: [0, 3, 0, 3] as [number, number, number, number],
  };
}

// Helper to create a checkbox item
function checkboxItem(
  checked: boolean | undefined,
  label: string,
  value?: string
) {
  const icon = checked ? "✓" : "✗";
  const color = checked ? "#16a34a" : "#9ca3af";
  return {
    columns: [
      {
        text: icon,
        width: 20,
        color: color,
        bold: true,
      },
      {
        text: label,
        width: 150,
        style: "label",
      },
      {
        text: value || (checked ? "Oui" : "Non"),
        width: "*",
        style: checked ? "valueHighlight" : "value",
      },
    ],
    margin: [0, 4, 0, 4] as [number, number, number, number],
  };
}

// Generate PDF Buffer
export async function generateTaxSummaryPDF(data: TaxSummaryData): Promise<Buffer> {
  const printer = new PdfPrinter(fonts);

  // Build content array
  const content: any[] = [
    // Title
    {
      text: "FICHE RÉCAPITULATIVE FISCALE",
      style: "title",
      alignment: "center",
      margin: [0, 0, 0, 5] as [number, number, number, number],
    },
    {
      text: `Année fiscale ${data.taxYear} - Canton de ${data.canton}`,
      style: "subtitle",
      alignment: "center",
      margin: [0, 0, 0, 20] as [number, number, number, number],
    },

    // Payment confirmation box
    {
      table: {
        widths: ["*"],
        body: [
          [
            {
              text: [
                { text: "✓ PAIEMENT CONFIRMÉ - ", bold: true },
                { text: `${data.currency} ${data.amount}.-` },
                { text: ` | ${data.paidAt || new Date().toLocaleDateString("fr-CH")}` },
              ],
              fillColor: "#dcfce7",
              color: "#166534",
              alignment: "center",
              margin: [10, 10, 10, 10] as [number, number, number, number],
            },
          ],
        ],
      },
      margin: [0, 0, 0, 20] as [number, number, number, number],
    },

    // Section 1: Informations contribuable
    sectionHeader("1. INFORMATIONS DU CONTRIBUABLE"),
    dataRow("Type de client", clientTypeLabels[data.clientType] || data.clientType),
    { text: "", margin: [0, 5, 0, 5] as [number, number, number, number] },

    // Contribuable principal
    {
      text: "Contribuable principal",
      style: "subsectionHeader",
      margin: [0, 5, 0, 8] as [number, number, number, number],
    },
    dataRow("Nom complet", data.customerName, true),
    dataRow("Email", data.customerEmail),
    dataRow("Téléphone", data.customerPhone),
    dataRow(
      "Statut professionnel",
      data.employmentStatus
        ? employmentLabels[data.employmentStatus] || data.employmentStatus
        : undefined
    ),
  ];

  // Conjoint si couple
  if (data.clientType === "couple" && data.customerName2) {
    content.push(
      { text: "", margin: [0, 10, 0, 0] as [number, number, number, number] },
      {
        text: "Conjoint(e)",
        style: "subsectionHeader",
        margin: [0, 5, 0, 8] as [number, number, number, number],
      },
      dataRow("Nom complet", data.customerName2, true),
      dataRow(
        "Statut professionnel",
        data.employmentStatus2
          ? employmentLabels[data.employmentStatus2] || data.employmentStatus2
          : undefined
      )
    );
  }

  // Adresse
  content.push(
    { text: "", margin: [0, 10, 0, 0] as [number, number, number, number] },
    {
      text: "Adresse",
      style: "subsectionHeader",
      margin: [0, 5, 0, 8] as [number, number, number, number],
    },
    dataRow("Rue", data.address.street),
    dataRow("NPA / Ville", `${data.address.npa} ${data.address.city}`),

    // Section 2: Informations fiscales
    sectionHeader("2. INFORMATIONS FISCALES"),
    dataRow("N° contribuable", data.taxpayerNumber, true),
    dataRow("Code déclaration", data.declarationCode),
    dataRow("Canton", `${data.canton} (${data.cantonCode})`),
    dataRow("Année fiscale", data.taxYear, true),

    // Section 3: Situation personnelle
    sectionHeader("3. SITUATION PERSONNELLE"),
    checkboxItem(data.hasMoved, "Déménagement en cours d'année"),
    checkboxItem(
      data.hasChildren,
      "Enfants à charge",
      data.hasChildren ? `${data.childrenCount || 0} enfant(s)` : undefined
    )
  );

  if (data.hasChildren && data.hasGuardCosts) {
    content.push(
      dataRow(
        "Frais de garde annuels",
        data.guardCosts ? `CHF ${data.guardCosts}.- (déductible)` : undefined
      )
    );
  }

  // Section 4: Logement
  content.push(
    sectionHeader("4. LOGEMENT"),
    dataRow(
      "Loyer mensuel",
      data.monthlyRent ? `CHF ${data.monthlyRent}.-` : undefined
    ),

    // Section 5: Prévoyance et déductions
    sectionHeader("5. PRÉVOYANCE ET DÉDUCTIONS FISCALES"),
    checkboxItem(
      data.hasPillar3a,
      "3ème Pilier A",
      data.hasPillar3a ? `CHF ${data.pillar3aAmount || 0}.- (déductible)` : undefined
    ),
    checkboxItem(
      data.hasDonations,
      "Dons",
      data.hasDonations
        ? `CHF ${data.donationsAmount || 0}.- (déductible max 20%)`
        : undefined
    ),
    checkboxItem(
      data.hasAlimonyPaid,
      "Pensions alimentaires versées",
      data.hasAlimonyPaid ? `CHF ${data.alimonyPaid || 0}.- (déductible)` : undefined
    ),
    checkboxItem(
      data.hasAlimonyReceived,
      "Pensions alimentaires reçues",
      data.hasAlimonyReceived
        ? `CHF ${data.alimonyReceived || 0}.- (IMPOSABLE)`
        : undefined
    ),
    checkboxItem(
      data.hasDebts,
      "Dettes (intérêts déductibles)",
      data.hasDebts ? `CHF ${data.debtsAmount || 0}.-` : undefined
    ),

    // Section 6: Fortune mobilière
    sectionHeader("6. FORTUNE MOBILIÈRE"),
    checkboxItem(
      data.hasStocks,
      "Titres / Actions",
      data.hasStocks
        ? `${data.stocksCount || 1} dépôt(s) à déclarer (valeur au 31.12.${data.taxYear})`
        : undefined
    ),

    // Section 7: Immobilier
    sectionHeader("7. IMMOBILIER"),
    checkboxItem(
      data.hasProperty,
      "Propriétaire immobilier",
      data.hasProperty ? `${data.propertyCount || 1} bien(s)` : undefined
    )
  );

  if (data.hasProperty) {
    content.push(
      checkboxItem(
        data.hasMortgage,
        "Dette hypothécaire",
        data.hasMortgage ? `CHF ${data.mortgageAmount || 0}.-` : undefined
      ),
      checkboxItem(
        data.hasRenovations,
        "Travaux d'entretien",
        data.hasRenovations
          ? `CHF ${data.renovationsAmount || 0}.- (déductible)`
          : undefined
      )
    );
  }

  // Section 8: Trajets domicile-travail
  if (data.workplaces && data.workplaces.length > 0) {
    content.push(sectionHeader("8. TRAJETS DOMICILE-TRAVAIL"));

    content.push({
      table: {
        headerRows: 1,
        widths: ["auto", "*", "auto", "auto", "auto"],
        body: [
          [
            { text: "Personne", style: "tableHeader" },
            { text: "Employeur", style: "tableHeader" },
            { text: "Transport", style: "tableHeader" },
            { text: "Distance", style: "tableHeader" },
            { text: "Jours/an", style: "tableHeader" },
          ],
          ...data.workplaces.map((w) => [
            {
              text:
                w.adult === 1
                  ? data.customerName.split(" ")[0]
                  : data.customerName2?.split(" ")[0] || "Conjoint",
              style: "tableCell",
            },
            { text: w.employerName || "-", style: "tableCell" },
            {
              text: transportLabels[w.transportMode] || w.transportMode,
              style: "tableCell",
            },
            { text: `${w.distanceKm || "-"} km`, style: "tableCell" },
            { text: `${w.daysPerYear || "-"} j`, style: "tableCell" },
          ]),
        ],
      },
      margin: [0, 10, 0, 10] as [number, number, number, number],
    });

    // Additional details for each workplace
    data.workplaces.forEach((w, i) => {
      content.push({
        text: [
          { text: `Trajet ${i + 1}: `, bold: true },
          `Adresse: ${w.workplaceAddress || "Non renseignée"} | `,
          `Remboursement employeur: ${
            w.employerReimbursement
              ? `Oui (${w.reimbursementType === "full" ? "total" : "partiel"}${
                  w.reimbursementAmount ? ` - CHF ${w.reimbursementAmount}` : ""
                })`
              : "Non"
          }`,
        ],
        style: "small",
        margin: [0, 2, 0, 2] as [number, number, number, number],
      });
    });
  }

  // Section 9: Options et préférences
  content.push(
    sectionHeader("9. OPTIONS ET PRÉFÉRENCES"),
    dataRow(
      "Mode de livraison",
      data.deliveryMethod
        ? deliveryLabels[data.deliveryMethod] || data.deliveryMethod
        : undefined
    ),
    checkboxItem(data.wantsReview, "Souhaite une relecture avant envoi"),
    dataRow("Délai souhaité", data.deadline)
  );

  // Section 10: Commentaires
  if (data.comments) {
    content.push(
      sectionHeader("10. COMMENTAIRES DU CLIENT"),
      {
        text: data.comments,
        style: "comments",
        margin: [0, 5, 0, 10] as [number, number, number, number],
      }
    );
  }

  // Section 11: Documents fournis
  content.push(sectionHeader("11. DOCUMENTS FOURNIS"));

  if (data.documents && data.documents.length > 0) {
    // Group documents by category
    const docsByCategory: Record<string, typeof data.documents> = {};
    data.documents.forEach((doc) => {
      if (!docsByCategory[doc.category]) {
        docsByCategory[doc.category] = [];
      }
      docsByCategory[doc.category].push(doc);
    });

    Object.entries(docsByCategory).forEach(([category, docs]) => {
      content.push({
        text: category.toUpperCase(),
        style: "docCategory",
        margin: [0, 8, 0, 4] as [number, number, number, number],
      });
      docs.forEach((d) => {
        content.push({
          columns: [
            { text: "•", width: 15 },
            { text: d.name, width: "*" },
          ],
          margin: [10, 2, 0, 2] as [number, number, number, number],
        });
        if (d.url) {
          content.push({
            text: d.url,
            link: d.url,
            style: "docLink",
            margin: [25, 0, 0, 4] as [number, number, number, number],
          });
        }
      });
    });
  } else {
    content.push({
      text: "Aucun document uploadé",
      style: "muted",
      margin: [0, 5, 0, 10] as [number, number, number, number],
    });
  }

  // Generation timestamp
  content.push({
    text: `Document généré le ${new Date().toLocaleDateString("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    style: "timestamp",
    alignment: "center",
    margin: [0, 30, 0, 0] as [number, number, number, number],
  });

  const docDefinition = {
    pageSize: "A4" as const,
    pageMargins: [40, 60, 40, 60] as [number, number, number, number],

    // Header
    header: {
      columns: [
        {
          text: "neofidu.ch",
          style: "headerLogo",
          margin: [40, 20, 0, 0] as [number, number, number, number],
        },
        {
          text: `Référence: ${data.reference}`,
          alignment: "right" as const,
          style: "headerRef",
          margin: [0, 20, 40, 0] as [number, number, number, number],
        },
      ],
    },

    // Footer
    footer: (currentPage: number, pageCount: number) => ({
      columns: [
        {
          text: `NeoFidu SA - Fiduciaire digitale en Suisse romande`,
          style: "footer",
          margin: [40, 20, 0, 0] as [number, number, number, number],
        },
        {
          text: `Page ${currentPage} / ${pageCount}`,
          alignment: "right" as const,
          style: "footer",
          margin: [0, 20, 40, 0] as [number, number, number, number],
        },
      ],
    }),

    // Content
    content,

    // Styles
    styles: {
      headerLogo: {
        fontSize: 14,
        bold: true,
        color: "#0d9488",
      },
      headerRef: {
        fontSize: 10,
        color: "#6b7280",
      },
      title: {
        fontSize: 20,
        bold: true,
        color: "#1f2937",
      },
      subtitle: {
        fontSize: 12,
        color: "#6b7280",
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        color: "#0d9488",
      },
      subsectionHeader: {
        fontSize: 10,
        bold: true,
        color: "#374151",
      },
      label: {
        fontSize: 9,
        color: "#6b7280",
      },
      value: {
        fontSize: 9,
        color: "#1f2937",
      },
      valueHighlight: {
        fontSize: 9,
        bold: true,
        color: "#0d9488",
      },
      tableHeader: {
        fontSize: 8,
        bold: true,
        color: "#374151",
        fillColor: "#f3f4f6",
      },
      tableCell: {
        fontSize: 8,
        color: "#1f2937",
      },
      small: {
        fontSize: 8,
        color: "#6b7280",
      },
      comments: {
        fontSize: 9,
        color: "#1f2937",
        italics: true,
      },
      docCategory: {
        fontSize: 9,
        bold: true,
        color: "#374151",
      },
      docLink: {
        fontSize: 8,
        color: "#0d9488",
      },
      muted: {
        fontSize: 9,
        color: "#9ca3af",
        italics: true,
      },
      footer: {
        fontSize: 8,
        color: "#9ca3af",
      },
      timestamp: {
        fontSize: 8,
        color: "#9ca3af",
        italics: true,
      },
    },
  };

  // Generate PDF
  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  // Convert to buffer
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.on("error", reject);
    pdfDoc.end();
  });
}
