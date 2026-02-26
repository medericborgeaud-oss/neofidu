import { Resend } from "resend";

// Lazy initialization of Resend
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

// Email de l'expéditeur (doit être vérifié sur Resend)
const FROM_EMAIL = process.env.FROM_EMAIL || "NeoFidu <noreply@neofidu.ch>";

// Types
export interface EmailData {
  to: string;
  customerName: string;
  amount: number;
  currency: string;
  service: string;
  reference: string;
  canton?: string;
  description?: string;
  taxYear?: string;
  taxpayerNumber?: string;
}

// Interface étendue pour les données fiscales complètes
export interface TaxSummaryData {
  reference: string;
  // Infos client
  customerName: string;
  customerName2?: string; // Pour les couples
  customerEmail: string;
  customerPhone?: string;
  // Adresse
  address: {
    street: string;
    npa: string;
    city: string;
  };
  // Infos fiscales
  canton: string;
  cantonCode: string;
  taxYear: string;
  taxpayerNumber?: string;
  declarationCode?: string;
  clientType: string;
  // Statut d'emploi
  employmentStatus?: string;
  employmentStatus2?: string; // Pour le conjoint
  // Situation familiale
  hasMoved?: boolean;
  hasChildren?: boolean;
  childrenCount?: number;
  // Données financières
  monthlyRent?: string;
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
  // Immobilier
  hasProperty?: boolean;
  propertyCount?: number;
  hasMortgage?: boolean;
  mortgageAmount?: string;
  hasRenovations?: boolean;
  renovationsAmount?: string;
  // Trajets
  workplaces?: {
    adult: number;
    employerName: string;
    transportMode: string;
    workplaceAddress: string;
    daysPerYear: string;
    distanceKm: string;
    employerReimbursement: boolean;
    reimbursementType: string;
    reimbursementAmount: string;
  }[];
  // Options
  deliveryMethod?: string;
  wantsReview?: boolean;
  deadline?: string;
  comments?: string;
  // Documents uploadés
  documents?: {
    category: string;
    name: string;
    url?: string;
  }[];
  // Paiement
  amount: number;
  currency: string;
  paymentMethod?: string;
  paidAt?: string;
}

// Règles de déductions par canton (résumé)
function getCantonDeductionRules(cantonCode: string): string {
  const rules: Record<string, string> = {
    VD: `
      <h4 style="margin: 12px 0 8px; color: #0d9488;">Canton de Vaud - Déductions spécifiques</h4>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Frais professionnels:</strong> Déduction forfaitaire de 3% du salaire net (min. CHF 2'000, max. CHF 4'000)</li>
        <li><strong>Frais de transport:</strong> Transports publics: coût effectif / Voiture: CHF 0.70/km (max. CHF 7'000)</li>
        <li><strong>Repas hors domicile:</strong> CHF 3'200/an si distance >10km ou pause <1h</li>
        <li><strong>3ème pilier A:</strong> Max CHF 7'056 (salarié) ou CHF 35'280 (indépendant, max 20% revenu net)</li>
        <li><strong>Frais de garde:</strong> Max CHF 7'100 par enfant</li>
        <li><strong>Dons:</strong> Déductibles jusqu'à 20% du revenu net imposable</li>
        <li><strong>Primes maladie:</strong> Déduction forfaitaire selon situation familiale</li>
      </ul>
    `,
    GE: `
      <h4 style="margin: 12px 0 8px; color: #0d9488;">Canton de Genève - Déductions spécifiques</h4>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Frais professionnels:</strong> Déduction forfaitaire de 3% du salaire net (min. CHF 600, max. CHF 1'600)</li>
        <li><strong>Frais de transport:</strong> Transports publics: abonnement annuel / Voiture: frais effectifs limités</li>
        <li><strong>Repas hors domicile:</strong> CHF 3'200/an si justifié</li>
        <li><strong>3ème pilier A:</strong> Max CHF 7'056 (salarié) ou CHF 35'280 (indépendant)</li>
        <li><strong>Frais de garde:</strong> Max CHF 4'000 par enfant (moins généreux que VD)</li>
        <li><strong>Dons:</strong> Déductibles jusqu'à 20% du revenu net imposable</li>
        <li><strong>Bouclier fiscal:</strong> Impôts cantonaux + communaux limités à 60% du revenu</li>
      </ul>
    `,
    VS: `
      <h4 style="margin: 12px 0 8px; color: #0d9488;">Canton du Valais - Déductions spécifiques</h4>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Frais professionnels:</strong> Déduction forfaitaire de 3% du salaire net (min. CHF 800, max. CHF 2'400)</li>
        <li><strong>Frais de transport:</strong> Transports publics: abonnement / Voiture: CHF 0.70/km</li>
        <li><strong>Repas hors domicile:</strong> CHF 3'200/an si justifié</li>
        <li><strong>3ème pilier A:</strong> Max CHF 7'056 (salarié) ou CHF 35'280 (indépendant)</li>
        <li><strong>Frais de garde:</strong> Max CHF 3'000 par enfant jusqu'à 14 ans</li>
        <li><strong>Dons:</strong> Déductibles jusqu'à 20% du revenu net imposable</li>
        <li><strong>Primes maladie:</strong> Déduction forfaitaire + subsides reçus</li>
      </ul>
    `,
    NE: `
      <h4 style="margin: 12px 0 8px; color: #0d9488;">Canton de Neuchâtel - Déductions spécifiques</h4>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Frais professionnels:</strong> Déduction forfaitaire ou frais effectifs</li>
        <li><strong>Frais de transport:</strong> Transports publics: coût effectif / Voiture: CHF 0.70/km</li>
        <li><strong>3ème pilier A:</strong> Max CHF 7'056 (salarié) ou CHF 35'280 (indépendant)</li>
        <li><strong>Frais de garde:</strong> Jusqu'à CHF 4'000 par enfant</li>
        <li><strong>Dons:</strong> Déductibles jusqu'à 20% du revenu net imposable</li>
        <li><strong>Impôt sur la fortune:</strong> Taux progressif, abattement pour résidence principale</li>
      </ul>
    `,
    JU: `
      <h4 style="margin: 12px 0 8px; color: #0d9488;">Canton du Jura - Déductions spécifiques</h4>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Frais professionnels:</strong> Déduction forfaitaire de 3% (min. CHF 600, max. CHF 2'400)</li>
        <li><strong>Frais de transport:</strong> Transports publics: abonnement / Voiture: limité</li>
        <li><strong>3ème pilier A:</strong> Max CHF 7'056 (salarié) ou CHF 35'280 (indépendant)</li>
        <li><strong>Frais de garde:</strong> Déductibles selon situation</li>
        <li><strong>Dons:</strong> Déductibles jusqu'à 20% du revenu net imposable</li>
        <li><strong>Note:</strong> Canton avec fiscalité avantageuse pour les familles</li>
      </ul>
    `,
    FR: `
      <h4 style="margin: 12px 0 8px; color: #0d9488;">Canton de Fribourg - Déductions spécifiques</h4>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li><strong>Frais professionnels:</strong> Déduction forfaitaire de 3% du salaire net (max. CHF 4'000)</li>
        <li><strong>Frais de transport:</strong> Transports publics: abonnement / Voiture: CHF 0.70/km (max. CHF 7'000)</li>
        <li><strong>3ème pilier A:</strong> Max CHF 7'056 (salarié) ou CHF 35'280 (indépendant)</li>
        <li><strong>Frais de garde:</strong> Max CHF 4'000 par enfant jusqu'à 14 ans</li>
        <li><strong>Dons:</strong> Déductibles jusqu'à 20% du revenu net imposable</li>
        <li><strong>Note:</strong> Taux d'imposition variant selon commune (bilingue FR/DE)</li>
      </ul>
    `,
  };
  return rules[cantonCode] || "";
}

// Template pour la fiche récapitulative fiscale complète
function getTaxSummaryHtml(data: TaxSummaryData): string {
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

  // Générer la section des trajets
  let workplacesHtml = "";
  if (data.workplaces && data.workplaces.length > 0) {
    workplacesHtml = data.workplaces.map((w, i) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; background: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          <strong>${w.adult === 1 ? data.customerName : data.customerName2 || 'Conjoint(e)'}</strong> - ${w.employerName || 'Employeur non spécifié'}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; background: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          ${transportLabels[w.transportMode] || w.transportMode}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; background: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          ${w.distanceKm || '-'} km
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; background: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          ${w.daysPerYear || '-'} jours
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; background: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          ${w.employerReimbursement ? `Oui (${w.reimbursementType === 'full' ? 'total' : 'partiel'})${w.reimbursementAmount ? ` - CHF ${w.reimbursementAmount}` : ''}` : 'Non'}
        </td>
      </tr>
    `).join('');
  }

  // Générer la section des documents
  let documentsHtml = "";
  if (data.documents && data.documents.length > 0) {
    const docsByCategory: Record<string, typeof data.documents> = {};
    data.documents.forEach(doc => {
      if (!docsByCategory[doc.category]) {
        docsByCategory[doc.category] = [];
      }
      docsByCategory[doc.category].push(doc);
    });

    documentsHtml = Object.entries(docsByCategory).map(([category, docs]) => `
      <div style="margin-bottom: 12px;">
        <strong style="color: #0d9488;">${category}:</strong>
        <ul style="margin: 4px 0 0 20px; padding: 0;">
          ${docs.map(d => `<li>${d.name}${d.url ? ` - <a href="${d.url}" style="color: #0d9488;">Télécharger</a>` : ''}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  } else {
    documentsHtml = '<p style="color: #9ca3af;">Aucun document uploadé</p>';
  }

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fiche Récapitulative Fiscale - ${data.reference}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" style="max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                      📋 Fiche Récapitulative Fiscale
                    </h1>
                    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                      Année fiscale ${data.taxYear} - Canton de ${data.canton}
                    </p>
                  </td>
                  <td style="text-align: right;">
                    <div style="background: rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px;">
                      <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 12px;">Référence</p>
                      <p style="margin: 4px 0 0; color: #ffffff; font-size: 18px; font-weight: bold; font-family: monospace;">${data.reference}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info paiement -->
          <tr>
            <td style="background: #dcfce7; padding: 16px 40px; border-bottom: 1px solid #bbf7d0;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <span style="color: #166534;">✓ Paiement confirmé</span>
                    <span style="color: #166534; margin-left: 20px;">
                      <strong>${data.currency} ${data.amount}.-</strong>
                      ${data.paymentMethod ? `(${data.paymentMethod})` : ''}
                    </span>
                  </td>
                  <td style="text-align: right; color: #166534;">
                    ${data.paidAt || new Date().toLocaleDateString('fr-CH')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Données à rentrer -->
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="margin: 0 0 20px; color: #1f2937; font-size: 20px; border-bottom: 2px solid #0d9488; padding-bottom: 10px;">
                🎯 Données à rentrer dans la déclaration
              </h2>

              <!-- Informations contribuable -->
              <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px;">Informations du contribuable</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 6px 0; width: 40%; color: #6b7280;">N° contribuable:</td>
                    <td style="padding: 6px 0; font-weight: 600; font-family: monospace; color: #0d9488;">${data.taxpayerNumber || 'Non fourni'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Code déclaration:</td>
                    <td style="padding: 6px 0; font-weight: 600; font-family: monospace;">${data.declarationCode || 'Non fourni'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Nom du contribuable:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${data.customerName}</td>
                  </tr>
                  ${data.clientType === 'couple' && data.customerName2 ? `
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Conjoint(e):</td>
                    <td style="padding: 6px 0; font-weight: 600;">${data.customerName2}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Adresse:</td>
                    <td style="padding: 6px 0;">${data.address.street}<br>${data.address.npa} ${data.address.city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Type de client:</td>
                    <td style="padding: 6px 0;">${clientTypeLabels[data.clientType] || data.clientType}</td>
                  </tr>
                  ${data.employmentStatus ? `
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Statut ${data.clientType === 'couple' ? '(contribuable 1)' : ''}:</td>
                    <td style="padding: 6px 0;">${employmentLabels[data.employmentStatus] || data.employmentStatus}</td>
                  </tr>
                  ` : ''}
                  ${data.clientType === 'couple' && data.employmentStatus2 ? `
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Statut (contribuable 2):</td>
                    <td style="padding: 6px 0;">${employmentLabels[data.employmentStatus2] || data.employmentStatus2}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280;">Contact:</td>
                    <td style="padding: 6px 0;">${data.customerEmail}<br>${data.customerPhone || ''}</td>
                  </tr>
                </table>
              </div>

              <!-- Situation familiale -->
              ${data.hasChildren ? `
              <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px; color: #92400e; font-size: 16px;">👶 Situation familiale</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 6px 0; width: 40%; color: #92400e;">Enfants à charge:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${data.childrenCount || 0} enfant(s)</td>
                  </tr>
                  ${data.hasGuardCosts ? `
                  <tr>
                    <td style="padding: 6px 0; color: #92400e;">Frais de garde annuels:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #166534;">CHF ${data.guardCosts || 0}.- (déductible)</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              ` : ''}

              <!-- Déductions et montants -->
              <div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px; color: #166534; font-size: 16px;">💰 Déductions et montants déclarés</h3>
                <table style="width: 100%;">
                  ${data.monthlyRent ? `
                  <tr>
                    <td style="padding: 6px 0; width: 50%; color: #166534;">Loyer mensuel:</td>
                    <td style="padding: 6px 0; font-weight: 600;">CHF ${data.monthlyRent}.-</td>
                  </tr>
                  ` : ''}
                  ${data.hasPillar3a ? `
                  <tr>
                    <td style="padding: 6px 0; color: #166534;">Versement 3ème pilier A:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #166534;">CHF ${data.pillar3aAmount || 0}.- ✓ Déductible</td>
                  </tr>
                  ` : ''}
                  ${data.hasDonations ? `
                  <tr>
                    <td style="padding: 6px 0; color: #166534;">Dons (organisations d'utilité publique):</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #166534;">CHF ${data.donationsAmount || 0}.- ✓ Déductible (max 20% revenu)</td>
                  </tr>
                  ` : ''}
                  ${data.hasAlimonyPaid ? `
                  <tr>
                    <td style="padding: 6px 0; color: #166534;">Pensions alimentaires versées:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #166534;">CHF ${data.alimonyPaid || 0}.- ✓ Déductible</td>
                  </tr>
                  ` : ''}
                  ${data.hasAlimonyReceived ? `
                  <tr>
                    <td style="padding: 6px 0; color: #dc2626;">Pensions alimentaires reçues:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #dc2626;">CHF ${data.alimonyReceived || 0}.- ⚠️ Imposable</td>
                  </tr>
                  ` : ''}
                  ${data.hasDebts ? `
                  <tr>
                    <td style="padding: 6px 0; color: #166534;">Dettes (intérêts déductibles):</td>
                    <td style="padding: 6px 0; font-weight: 600;">CHF ${data.debtsAmount || 0}.-</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Fortune (titres) -->
              ${data.hasStocks ? `
              <div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px; color: #1e40af; font-size: 16px;">📈 Fortune mobilière</h3>
                <p style="margin: 0; color: #1e40af;">
                  <strong>${data.stocksCount || 1} dépôt(s) de titres</strong> à déclarer (valeur au 31.12.${data.taxYear})
                </p>
              </div>
              ` : ''}

              <!-- Immobilier -->
              ${data.hasProperty ? `
              <div style="background: #fae8ff; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px; color: #86198f; font-size: 16px;">🏠 Immobilier</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 6px 0; width: 50%; color: #86198f;">Nombre de biens:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${data.propertyCount || 1} bien(s)</td>
                  </tr>
                  ${data.hasMortgage ? `
                  <tr>
                    <td style="padding: 6px 0; color: #86198f;">Dette hypothécaire:</td>
                    <td style="padding: 6px 0; font-weight: 600;">CHF ${data.mortgageAmount || 0}.- (intérêts déductibles)</td>
                  </tr>
                  ` : ''}
                  ${data.hasRenovations ? `
                  <tr>
                    <td style="padding: 6px 0; color: #86198f;">Travaux d'entretien:</td>
                    <td style="padding: 6px 0; font-weight: 600; color: #166534;">CHF ${data.renovationsAmount || 0}.- ✓ Déductible</td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              ` : ''}

              <!-- Trajets domicile-travail -->
              ${workplacesHtml ? `
              <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px;">🚗 Frais de transport domicile-travail</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <thead>
                    <tr style="background: #f3f4f6;">
                      <th style="padding: 10px 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Employeur</th>
                      <th style="padding: 10px 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Transport</th>
                      <th style="padding: 10px 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Distance</th>
                      <th style="padding: 10px 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Jours/an</th>
                      <th style="padding: 10px 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Remboursement</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${workplacesHtml}
                  </tbody>
                </table>
              </div>
              ` : ''}

              <!-- Règles cantonales -->
              ${getCantonDeductionRules(data.cantonCode)}

              <!-- Documents -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px;">📎 Documents fournis</h3>
                ${documentsHtml}
              </div>

              <!-- Commentaires -->
              ${data.comments ? `
              <div style="margin-top: 20px; background: #fffbeb; border-radius: 12px; padding: 20px;">
                <h3 style="margin: 0 0 12px; color: #92400e; font-size: 16px;">💬 Commentaires du client</h3>
                <p style="margin: 0; color: #78350f; white-space: pre-wrap;">${data.comments}</p>
              </div>
              ` : ''}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #1f2937; padding: 20px 40px; color: white;">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 14px;">
                      <strong>NeoFidu SA</strong> - Fiduciaire digitale en Suisse romande
                    </p>
                    <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.8;">
                      Fiche générée automatiquement le ${new Date().toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td style="text-align: right;">
                    <a href="https://www.neofidu.ch/admin" style="color: #10b981; text-decoration: none; font-size: 14px;">
                      Accéder au dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Fonction pour envoyer la fiche récapitulative fiscale à l'admin
export async function sendTaxSummaryEmail(data: TaxSummaryData) {
  const adminEmail = "contact@neofidu.ch";

  try {
    const result = await getResend().emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `📋 Nouvelle déclaration ${data.taxYear} - ${data.customerName} (${data.canton}) - ${data.reference}`,
      html: getTaxSummaryHtml(data),
    });

    console.log("Fiche récapitulative fiscale envoyée:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur envoi fiche fiscale:", error);
    return { success: false, error };
  }
}

// Template HTML pour l'email de confirmation de paiement
function getPaymentConfirmationHtml(data: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de paiement - NeoFidu</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 40px 40px 30px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                      neo<span style="font-weight: normal;">fidu</span><span style="font-size: 14px; opacity: 0.8;">.ch</span>
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 40px;">✓</span>
              </div>
              <h2 style="margin: 0 0 10px; color: #1f2937; font-size: 24px;">Paiement confirmé !</h2>
              <p style="margin: 0; color: #6b7280; font-size: 16px;">Merci pour votre confiance, ${data.customerName}</p>
            </td>
          </tr>

          <!-- Payment Details -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 12px; padding: 24px;">
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">Référence</span>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: monospace;">${data.reference}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">Service</span>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 500;">${data.service}</div>
                  </td>
                </tr>
                ${data.canton ? `
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">Canton</span>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 500;">${data.canton}</div>
                  </td>
                </tr>
                ` : ''}
                ${data.taxYear ? `
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">Année fiscale</span>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${data.taxYear}</div>
                  </td>
                </tr>
                ` : ''}
                ${data.taxpayerNumber ? `
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">N° contribuable</span>
                    <div style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: monospace;">${data.taxpayerNumber}</div>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 20px;">
                    <span style="color: #6b7280; font-size: 14px;">Montant payé</span>
                    <div style="color: #0d9488; font-size: 28px; font-weight: bold;">${data.currency} ${data.amount}.-</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 18px;">Prochaines étapes</h3>
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; vertical-align: top;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #16a34a; margin-right: 12px;">1</span>
                    <span style="color: #4b5563; font-size: 15px;">Un conseiller analysera votre dossier sous 24h</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; vertical-align: top;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #16a34a; margin-right: 12px;">2</span>
                    <span style="color: #4b5563; font-size: 15px;">Nous vous contacterons si des documents sont manquants</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; vertical-align: top;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; color: #16a34a; margin-right: 12px;">3</span>
                    <span style="color: #4b5563; font-size: 15px;">Votre déclaration sera établie dans les délais convenus</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tracking Section -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; background-color: #ecfdf5; border-radius: 12px; border: 1px solid #a7f3d0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; color: #065f46; font-size: 16px; font-weight: 600;">
                      📍 Suivre votre demande
                    </p>
                    <p style="margin: 0 0 16px; color: #047857; font-size: 14px; line-height: 1.5;">
                      Vous pouvez suivre l'avancement de votre demande à tout moment sur notre site en utilisant votre référence <strong>${data.reference}</strong>.
                    </p>
                    <a href="https://www.neofidu.ch/suivi" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Suivre ma demande →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                      Des questions ? Contactez-nous à <a href="mailto:contact@neofidu.ch" style="color: #0d9488; text-decoration: none;">contact@neofidu.ch</a>
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      © ${new Date().getFullYear()} NeoFidu SA - Fiduciaire digitale en Suisse romande
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Template pour l'email de confirmation de demande (comptabilité/gérance)
function getRequestConfirmationHtml(data: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demande reçue - NeoFidu</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                neo<span style="font-weight: normal;">fidu</span><span style="font-size: 14px; opacity: 0.8;">.ch</span>
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px; text-align: center;">
              <div style="width: 80px; height: 80px; background-color: #dbeafe; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 40px;">📨</span>
              </div>
              <h2 style="margin: 0 0 10px; color: #1f2937; font-size: 24px;">Demande bien reçue !</h2>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px;">Merci ${data.customerName}, nous avons bien reçu votre demande.</p>

              <table role="presentation" style="width: 100%; background-color: #f9fafb; border-radius: 12px; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Référence</p>
                    <p style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 600; font-family: monospace;">${data.reference}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 20px 20px;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Service demandé</p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500;">${data.service}</p>
                  </td>
                </tr>
              </table>

              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                Un conseiller vous contactera sous <strong>24 heures ouvrables</strong> pour discuter de vos besoins et vous proposer un devis personnalisé.
              </p>

              <!-- Tracking Section -->
              <table role="presentation" style="width: 100%; background-color: #ecfdf5; border-radius: 12px; margin: 24px 0; border: 1px solid #a7f3d0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; color: #065f46; font-size: 16px; font-weight: 600;">
                      📍 Suivre votre demande
                    </p>
                    <p style="margin: 0 0 16px; color: #047857; font-size: 14px; line-height: 1.5;">
                      Vous pouvez suivre l'avancement de votre demande à tout moment sur notre site en utilisant votre numéro de référence.
                    </p>
                    <a href="https://www.neofidu.ch/suivi" style="display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      Suivre ma demande →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                Questions ? <a href="mailto:contact@neofidu.ch" style="color: #0d9488; text-decoration: none;">contact@neofidu.ch</a>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} NeoFidu SA
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Template pour la notification admin
function getAdminNotificationHtml(data: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouveau paiement - NeoFidu Admin</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <table style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background: #1f2937; padding: 20px; color: white;">
        <h2 style="margin: 0;">🎉 Nouveau paiement reçu</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>Client:</strong> ${data.customerName}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>Email:</strong> ${data.to}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>Montant:</strong> <span style="color: #16a34a; font-weight: bold;">${data.currency} ${data.amount}.-</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>Service:</strong> ${data.service}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>Canton:</strong> ${data.canton || 'N/A'}
            </td>
          </tr>
          ${data.taxYear ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>Année fiscale:</strong> <span style="font-weight: bold; color: #0d9488;">${data.taxYear}</span>
            </td>
          </tr>
          ` : ''}
          ${data.taxpayerNumber ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
              <strong>N° contribuable:</strong> <code>${data.taxpayerNumber}</code>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0;">
              <strong>Référence:</strong> <code>${data.reference}</code>
            </td>
          </tr>
        </table>
        <p style="margin-top: 20px;">
          <a href="https://www.neofidu.ch/admin" style="background: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Voir le tableau de bord
          </a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Fonction pour envoyer l'email de confirmation de paiement
export async function sendPaymentConfirmationEmail(data: EmailData) {
  try {
    const result = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Confirmation de paiement - ${data.reference}`,
      html: getPaymentConfirmationHtml(data),
    });

    console.log("Email de confirmation envoyé:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { success: false, error };
  }
}

// Fonction pour envoyer l'email de confirmation de demande
export async function sendRequestConfirmationEmail(data: EmailData) {
  try {
    const result = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Demande reçue - ${data.reference}`,
      html: getRequestConfirmationHtml(data),
    });

    console.log("Email de demande envoyé:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { success: false, error };
  }
}

// Fonction pour notifier l'admin d'un nouveau paiement
export async function sendAdminNotificationEmail(data: EmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || "contact@neofidu.ch";

  try {
    const result = await getResend().emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `💰 Nouveau paiement: ${data.currency} ${data.amount}.- - ${data.customerName}`,
      html: getAdminNotificationHtml(data),
    });

    console.log("Notification admin envoyée:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur envoi notification admin:", error);
    return { success: false, error };
  }
}

// Types pour le formulaire de contact
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  canton: string;
  service: string;
  message: string;
}

// Template pour le formulaire de contact (notification admin)
function getContactFormHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouveau message - NeoFidu</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <table style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 20px; color: white;">
        <h2 style="margin: 0;">📬 Nouveau message de contact</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Nom complet:</strong>
              <div style="color: #1f2937; font-size: 16px; margin-top: 4px;">${data.firstName} ${data.lastName}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Email:</strong>
              <div style="color: #1f2937; font-size: 16px; margin-top: 4px;">
                <a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a>
              </div>
            </td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Téléphone:</strong>
              <div style="color: #1f2937; font-size: 16px; margin-top: 4px;">
                <a href="tel:${data.phone}" style="color: #0d9488;">${data.phone}</a>
              </div>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Canton:</strong>
              <div style="color: #1f2937; font-size: 16px; margin-top: 4px;">${data.canton}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Service demandé:</strong>
              <div style="color: #1f2937; font-size: 16px; margin-top: 4px;">${data.service}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <strong style="color: #6b7280;">Message:</strong>
              <div style="color: #1f2937; font-size: 16px; margin-top: 8px; background: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${data.message || '(Aucun message)'}</div>
            </td>
          </tr>
        </table>
        <p style="margin-top: 24px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: Votre demande NeoFidu" style="background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">
            Répondre à ${data.firstName}
          </a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
          Message reçu le ${new Date().toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Template pour notification nouvelle demande (admin)
function getNewRequestNotificationHtml(data: EmailData & { customerEmail?: string; type?: string }): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande - NeoFidu</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <table style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 20px; color: white;">
        <h2 style="margin: 0;">🎯 Nouvelle demande reçue</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <div style="background: #dcfce7; color: #166534; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <strong>Référence:</strong> ${data.reference}
        </div>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Client:</strong>
              <span style="color: #1f2937; float: right;">${data.customerName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Email:</strong>
              <span style="color: #1f2937; float: right;">
                <a href="mailto:${data.customerEmail || data.to}" style="color: #0d9488;">${data.customerEmail || data.to}</a>
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Service:</strong>
              <span style="color: #1f2937; float: right;">${data.service}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <strong style="color: #6b7280;">Canton:</strong>
              <span style="color: #1f2937; float: right;">${data.canton || 'N/A'}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #6b7280;">Montant:</strong>
              <span style="color: #0d9488; font-weight: bold; float: right; font-size: 18px;">${data.currency} ${data.amount}.-</span>
            </td>
          </tr>
        </table>
        <p style="margin-top: 24px; text-align: center;">
          <a href="https://www.neofidu.ch/admin" style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">
            Voir dans le dashboard
          </a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Fonction pour envoyer le formulaire de contact
export async function sendContactFormEmail(data: ContactFormData) {
  const adminEmail = process.env.ADMIN_EMAIL || "contact@neofidu.ch";

  try {
    const result = await getResend().emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `📬 Nouveau message de ${data.firstName} ${data.lastName} - ${data.service}`,
      html: getContactFormHtml(data),
      replyTo: data.email,
    });

    console.log("Email de contact envoyé:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur envoi email contact:", error);
    return { success: false, error };
  }
}

// Fonction pour notifier l'admin d'une nouvelle demande
export async function sendNewRequestNotificationEmail(data: EmailData & { customerEmail?: string }) {
  const adminEmail = process.env.ADMIN_EMAIL || "contact@neofidu.ch";

  try {
    const result = await getResend().emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `🎯 Nouvelle demande: ${data.service} - ${data.customerName} (${data.reference})`,
      html: getNewRequestNotificationHtml(data),
    });

    console.log("Notification nouvelle demande envoyée:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erreur envoi notification nouvelle demande:", error);
    return { success: false, error };
  }
}
