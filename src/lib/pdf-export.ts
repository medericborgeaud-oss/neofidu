import { jsPDF } from "jspdf";

interface TaxRequestForPDF {
  reference: string;
  createdAt: string;
  status: string;
  payment: {
    amount: number;
    currency: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    birthDate?: string;
    maritalStatus?: string;
    firstName2?: string;
    lastName2?: string;
    birthDate2?: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      npa: string;
      city: string;
    };
  };
  fiscal: {
    canton: string;
    cantonCode: string;
    taxYear: number;
    taxpayerNumber?: string;
    declarationCode?: string;
    clientType: string;
    employmentStatus?: string;
    occupationRate?: string;
    employmentStatus2?: string;
    occupationRate2?: string;
  };
  situation: {
    hasMoved?: boolean;
    hasChildren?: boolean;
    childrenCount?: number;
    monthlyRent?: string;
    landlordName?: string;
    landlordAddress?: string;
  };
  financial: {
    hasPillar3a?: boolean;
    pillar3aAmount?: string;
    hasStocks?: boolean;
    stocksCount?: number;
    hasGuardCosts?: boolean;
    guardCosts?: string;
    hasAlimonyReceived?: boolean;
    alimonyReceived?: string;
    hasAlimonyPaid?: boolean;
    alimonyPaid?: string;
    hasDonations?: boolean;
    donationsAmount?: string;
    hasDebts?: boolean;
    debtsAmount?: string;
  };
  property: {
    hasProperty?: boolean;
    propertyCount?: number;
    hasMortgage?: boolean;
    mortgageAmount?: string;
    hasRenovations?: boolean;
    renovationsAmount?: string;
  };
  workplaces: {
    adult: number;
    employerName: string;
    transportMode: string;
    workplaceAddress: string;
    daysPerYear: string;
    distanceKm: string;
    carJustification?: string;
  }[];
  options: {
    deliveryMethod?: string;
    wantsReview?: boolean;
    deadline?: string;
    comments?: string;
  };
  documents: {
    category: string;
    name: string;
    url?: string;
    uploadedAt: string;
  }[];
}

// Labels
const maritalStatusLabels: Record<string, string> = {
  single: "Célibataire",
  married: "Marié(e)",
  divorced: "Divorcé(e)",
  widowed: "Veuf/Veuve",
  separated: "Séparé(e)",
  partnership: "Partenariat enregistré",
};

const clientTypeLabels: Record<string, string> = {
  private: "Particulier",
  independent: "Indépendant",
  couple: "Couple",
};

const employmentLabels: Record<string, string> = {
  employed: "Salarié(e)",
  retired: "Retraité(e)",
  unemployed: "Au chômage",
};

const transportModeLabels: Record<string, string> = {
  train: "Transports publics",
  car: "Voiture",
  bike: "Vélo / À pied",
  none: "Télétravail",
};

const documentCategoryLabels: Record<string, string> = {
  salary: "Certificat de salaire",
  pension: "Attestation de rente",
  unemployment: "Attestation chômage",
  business: "Comptes & bilan",
  bank: "Relevés bancaires",
  stocks: "Relevés de titres",
  insurance: "Primes maladie",
  pillar3a: "Pilier 3a",
  guard: "Frais de garde",
  alimonyReceived: "Pension reçue",
  alimonyPaid: "Pension versée",
  debts: "Attestation dettes",
  mortgage: "Hypothèque",
  renovations: "Travaux",
  property: "Documents immo",
  donations: "Dons",
  other: "Autres",
};

function formatDate(dateString?: string): string {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("fr-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Generate the PDF document (internal function)
 */
function generatePDFDocument(request: TaxRequestForPDF): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Colors
  const primaryColor: [number, number, number] = [13, 148, 136]; // Teal
  const grayColor: [number, number, number] = [100, 100, 100];
  const blackColor: [number, number, number] = [0, 0, 0];
  const lightGray: [number, number, number] = [240, 240, 240];

  // Helper functions
  const addNewPageIfNeeded = (neededSpace: number) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  const drawSectionHeader = (title: string) => {
    addNewPageIfNeeded(15);
    doc.setFillColor(...primaryColor);
    doc.rect(margin, y, contentWidth, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 3, y + 5.5);
    y += 12;
    doc.setTextColor(...blackColor);
  };

  const drawRow = (label: string, value: string, indent: number = 0) => {
    addNewPageIfNeeded(7);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text(label, margin + indent, y);
    doc.setTextColor(...blackColor);
    doc.setFont("helvetica", "bold");
    // Truncate long values
    const maxValueWidth = contentWidth - 70 - indent;
    const truncatedValue = doc.splitTextToSize(value || "-", maxValueWidth)[0];
    doc.text(truncatedValue, margin + 70 + indent, y);
    y += 6;
  };

  const drawSubHeader = (title: string) => {
    addNewPageIfNeeded(10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(title, margin, y);
    y += 6;
    doc.setTextColor(...blackColor);
  };

  // ===== HEADER WITH LOGO =====
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, "F");

  // Draw logo (white version for dark background)
  // Logo icon
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 8, 14, 18, 2, 2, "F");

  // Document lines inside logo
  doc.setFillColor(...primaryColor);
  doc.roundedRect(margin + 2.5, 12, 7, 1, 0.5, 0.5, "F");
  doc.roundedRect(margin + 2.5, 15, 9, 1, 0.5, 0.5, "F");
  doc.roundedRect(margin + 2.5, 18, 8, 1, 0.5, 0.5, "F");

  // Checkmark in logo
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1.5);
  doc.setLineCap("round");
  doc.setLineJoin("round");
  doc.line(margin + 4, 22, margin + 6, 24);
  doc.line(margin + 6, 24, margin + 11, 19);

  // Logo text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("neofidu", margin + 18, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(".ch", margin + 50, 20);

  // Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("FICHE RÉCAPITULATIVE", margin, 32);

  // Subtitle
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Déclaration fiscale ${request.fiscal.taxYear} - ${request.fiscal.canton}`, margin, 37);

  // Reference and date on the right
  doc.setFontSize(9);
  doc.text(`Réf: ${request.reference}`, pageWidth - margin - 35, 32);
  doc.text(`Créé le: ${formatDate(request.createdAt)}`, pageWidth - margin - 35, 37);

  y = 50;

  // ===== CLIENT =====
  drawSectionHeader("INFORMATIONS CLIENT");

  const fullName = request.customer.firstName2
    ? `${request.customer.firstName} ${request.customer.lastName} & ${request.customer.firstName2} ${request.customer.lastName2}`
    : `${request.customer.firstName} ${request.customer.lastName}`;
  drawRow("Nom", fullName);
  drawRow("Date de naissance", formatDate(request.customer.birthDate));
  if (request.customer.birthDate2) {
    drawRow("Naissance conjoint", formatDate(request.customer.birthDate2));
  }
  drawRow("État civil", maritalStatusLabels[request.customer.maritalStatus || ""] || request.customer.maritalStatus || "-");
  drawRow("Email", request.customer.email);
  if (request.customer.phone) {
    drawRow("Téléphone", request.customer.phone);
  }
  drawRow("Adresse", `${request.customer.address.street}, ${request.customer.address.npa} ${request.customer.address.city}`);
  y += 3;

  // ===== FISCAL =====
  drawSectionHeader("INFORMATIONS FISCALES");

  drawRow("Canton", `${request.fiscal.canton} (${request.fiscal.cantonCode})`);
  drawRow("Année fiscale", String(request.fiscal.taxYear));
  drawRow("Type de client", clientTypeLabels[request.fiscal.clientType] || request.fiscal.clientType);
  if (request.fiscal.taxpayerNumber) {
    drawRow("N° contribuable", request.fiscal.taxpayerNumber);
  }
  if (request.fiscal.declarationCode) {
    drawRow("Code déclaration", request.fiscal.declarationCode);
  }

  // Employment status with occupation rate
  if (request.fiscal.employmentStatus) {
    const empLabel = employmentLabels[request.fiscal.employmentStatus] || request.fiscal.employmentStatus;
    const occRate = request.fiscal.occupationRate ? ` (${request.fiscal.occupationRate}%)` : "";
    drawRow("Statut emploi", empLabel + occRate);
  }
  if (request.fiscal.employmentStatus2) {
    const empLabel2 = employmentLabels[request.fiscal.employmentStatus2] || request.fiscal.employmentStatus2;
    const occRate2 = request.fiscal.occupationRate2 ? ` (${request.fiscal.occupationRate2}%)` : "";
    drawRow("Statut conjoint", empLabel2 + occRate2);
  }
  y += 3;

  // ===== SITUATION =====
  drawSectionHeader("SITUATION PERSONNELLE");

  drawRow("Déménagement", request.situation.hasMoved ? "Oui" : "Non");
  drawRow("Enfants à charge", request.situation.hasChildren ? `Oui (${request.situation.childrenCount || 0})` : "Non");
  if (request.situation.monthlyRent) {
    drawRow("Loyer mensuel", `CHF ${request.situation.monthlyRent}.-`);
  }
  if (request.situation.landlordName) {
    drawRow("Bailleur / Gérance", request.situation.landlordName);
  }
  if (request.situation.landlordAddress) {
    drawRow("Adresse bailleur", request.situation.landlordAddress);
  }
  y += 3;

  // ===== FINANCIAL =====
  drawSectionHeader("SITUATION FINANCIÈRE");

  let hasFinancialInfo = false;
  if (request.financial.hasPillar3a) {
    drawRow("3ème pilier A", `CHF ${request.financial.pillar3aAmount || "?"}.-`);
    hasFinancialInfo = true;
  }
  if (request.financial.hasStocks) {
    drawRow("Actions/Titres", `${request.financial.stocksCount || "?"} position(s)`);
    hasFinancialInfo = true;
  }
  if (request.financial.hasGuardCosts) {
    drawRow("Frais de garde", `CHF ${request.financial.guardCosts || "?"}.-`);
    hasFinancialInfo = true;
  }
  if (request.financial.hasAlimonyReceived) {
    drawRow("Pension reçue", `CHF ${request.financial.alimonyReceived || "?"}.-`);
    hasFinancialInfo = true;
  }
  if (request.financial.hasAlimonyPaid) {
    drawRow("Pension versée", `CHF ${request.financial.alimonyPaid || "?"}.-`);
    hasFinancialInfo = true;
  }
  if (request.financial.hasDonations) {
    drawRow("Dons", `CHF ${request.financial.donationsAmount || "?"}.-`);
    hasFinancialInfo = true;
  }
  if (request.financial.hasDebts) {
    drawRow("Dettes", `CHF ${request.financial.debtsAmount || "?"}.-`);
    hasFinancialInfo = true;
  }
  if (!hasFinancialInfo) {
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...grayColor);
    doc.text("Aucune information financière spécifique", margin, y);
    y += 6;
  }
  y += 3;

  // ===== PROPERTY =====
  if (request.property) {
    drawSectionHeader("IMMOBILIER");

    drawRow("Propriétaire", request.property.hasProperty ? "Oui" : "Non");
    if (request.property.hasProperty) {
      if (request.property.propertyCount) {
        drawRow("Nombre de biens", String(request.property.propertyCount));
      }
      if (request.property.hasMortgage) {
        drawRow("Hypothèque", request.property.mortgageAmount ? `CHF ${request.property.mortgageAmount}.-` : "Oui");
      }
      if (request.property.hasRenovations) {
        drawRow("Travaux", request.property.renovationsAmount ? `CHF ${request.property.renovationsAmount}.-` : "Oui");
      }
    }
    y += 3;
  }

  // ===== WORKPLACES =====
  if (request.workplaces && request.workplaces.length > 0) {
    drawSectionHeader("TRAJETS PROFESSIONNELS");

    request.workplaces.forEach((wp, index) => {
      const adultName = wp.adult === 1
        ? `${request.customer.firstName} ${request.customer.lastName}`
        : `${request.customer.firstName2 || "Conjoint"} ${request.customer.lastName2 || ""}`;

      drawSubHeader(`${adultName} - Lieu ${index + 1}`);

      if (wp.employerName) drawRow("Employeur", wp.employerName, 5);
      drawRow("Mode transport", transportModeLabels[wp.transportMode] || wp.transportMode, 5);
      if (wp.workplaceAddress) drawRow("Adresse travail", wp.workplaceAddress, 5);
      if (wp.daysPerYear) drawRow("Jours/an", wp.daysPerYear, 5);
      if (wp.distanceKm) drawRow("Distance aller", `${wp.distanceKm} km`, 5);
      if (wp.carJustification) {
        drawRow("Justif. voiture", wp.carJustification, 5);
      }
      y += 2;
    });
    y += 3;
  }

  // ===== OPTIONS =====
  drawSectionHeader("OPTIONS DE LIVRAISON");

  const deliveryLabel = request.options.deliveryMethod === "email" ? "Électronique" :
                        request.options.deliveryMethod === "post" ? "Courrier postal" : "Électronique";
  drawRow("Mode de livraison", deliveryLabel);
  drawRow("Révision souhaitée", request.options.wantsReview ? "Oui" : "Non");
  drawRow("Délai", request.options.deadline === "express" ? "Express (48h)" :
                   request.options.deadline === "extended" ? "Prioritaire (7j)" : "Standard (10j)");
  if (request.options.comments) {
    y += 2;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);
    doc.text("Commentaires:", margin, y);
    y += 5;
    doc.setTextColor(...blackColor);
    const commentLines = doc.splitTextToSize(request.options.comments, contentWidth - 10);
    doc.text(commentLines, margin + 5, y);
    y += commentLines.length * 4 + 2;
  }
  y += 3;

  // ===== DOCUMENTS =====
  drawSectionHeader("DOCUMENTS FOURNIS");

  if (request.documents && request.documents.length > 0) {
    request.documents.forEach((doc_item) => {
      addNewPageIfNeeded(7);
      const categoryLabel = documentCategoryLabels[doc_item.category] || doc_item.category;
      const docDate = formatDate(doc_item.uploadedAt);
      const hasUrl = !!doc_item.url;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      // Category badge
      doc.setFillColor(hasUrl ? 220 : 255, hasUrl ? 240 : 220, hasUrl ? 220 : 220);
      doc.roundedRect(margin, y - 3, 25, 5, 1, 1, "F");
      doc.setTextColor(hasUrl ? 20 : 180, hasUrl ? 100 : 60, hasUrl ? 80 : 60);
      doc.setFontSize(7);
      doc.text(categoryLabel.substring(0, 12), margin + 1, y);

      // File name
      doc.setTextColor(...blackColor);
      doc.setFontSize(9);
      const fileName = doc_item.name.length > 40 ? doc_item.name.substring(0, 37) + "..." : doc_item.name;
      doc.text(fileName, margin + 28, y);

      // Status
      doc.setTextColor(...grayColor);
      doc.setFontSize(8);
      doc.text(hasUrl ? `OK ${docDate}` : "! Manquant", pageWidth - margin - 25, y);

      y += 6;
    });
  } else {
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...grayColor);
    doc.text("Aucun document fourni", margin, y);
    y += 6;
  }

  // ===== FOOTER =====
  const footerY = pageHeight - 10;
  doc.setDrawColor(...lightGray);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  doc.setFont("helvetica", "normal");
  doc.text(`NeoFidu Sàrl - Crettaz 1, 1854 Leysin - Fiche générée le ${new Date().toLocaleDateString("fr-CH")}`, margin, footerY);
  doc.text(`Montant: CHF ${request.payment.amount}.-`, pageWidth - margin - 35, footerY);

  return doc;
}

/**
 * Generate PDF and return as Blob URL for preview
 */
export function generatePDFPreview(request: TaxRequestForPDF): string {
  const doc = generatePDFDocument(request);
  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
}

/**
 * Get the filename for the PDF
 */
export function getPDFFileName(request: TaxRequestForPDF): string {
  return `NeoFidu_${request.reference}_${request.fiscal.taxYear}.pdf`;
}

/**
 * Download the PDF directly
 */
export function downloadPDF(request: TaxRequestForPDF): void {
  const doc = generatePDFDocument(request);
  const fileName = getPDFFileName(request);
  doc.save(fileName);
}

/**
 * Legacy function - exports and downloads PDF directly
 * @deprecated Use generatePDFPreview() and downloadPDF() instead
 */
export function exportTaxRequestToPDF(request: TaxRequestForPDF): void {
  downloadPDF(request);
}
