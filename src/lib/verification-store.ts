// Store des codes de vérification (en production, utiliser Redis ou une base de données)

interface VerificationCode {
  code: string;
  reference: string;
  email: string;
  expiresAt: Date;
  attempts: number;
  verified: boolean;
}

// Store global pour les codes de vérification
const verificationCodes: Map<string, VerificationCode> = new Map();

// Générer un code à 6 chiffres
export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Créer un nouveau code de vérification
export function createVerificationCode(reference: string, email: string): string {
  const code = generateCode();
  const key = `${reference}-${email}`.toLowerCase();

  verificationCodes.set(key, {
    code,
    reference,
    email,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expire dans 10 minutes
    attempts: 0,
    verified: false,
  });

  // Nettoyer les anciens codes toutes les 5 minutes
  cleanupExpiredCodes();

  return code;
}

// Vérifier un code
export function verifyCode(reference: string, email: string, code: string): { valid: boolean; error?: string } {
  const key = `${reference}-${email}`.toLowerCase();
  const verification = verificationCodes.get(key);

  if (!verification) {
    return { valid: false, error: "Aucun code envoyé pour cette référence" };
  }

  if (verification.expiresAt < new Date()) {
    verificationCodes.delete(key);
    return { valid: false, error: "Le code a expiré. Veuillez en demander un nouveau." };
  }

  if (verification.attempts >= 5) {
    verificationCodes.delete(key);
    return { valid: false, error: "Trop de tentatives. Veuillez demander un nouveau code." };
  }

  verification.attempts++;

  if (verification.code !== code) {
    return { valid: false, error: `Code incorrect. ${5 - verification.attempts} tentative(s) restante(s).` };
  }

  verification.verified = true;
  return { valid: true };
}

// Vérifier si un accès est autorisé (code déjà vérifié)
export function isAccessAuthorized(reference: string, email: string): boolean {
  const key = `${reference}-${email}`.toLowerCase();
  const verification = verificationCodes.get(key);

  if (!verification) return false;
  if (verification.expiresAt < new Date()) {
    verificationCodes.delete(key);
    return false;
  }

  return verification.verified;
}

// Nettoyer les codes expirés
function cleanupExpiredCodes(): void {
  const now = new Date();
  for (const [key, verification] of verificationCodes.entries()) {
    if (verification.expiresAt < now) {
      verificationCodes.delete(key);
    }
  }
}

// Obtenir le dernier code pour le mode démo (NE PAS UTILISER EN PRODUCTION)
export function getLastCodeForDemo(reference: string, email: string): string | null {
  const key = `${reference}-${email}`.toLowerCase();
  const verification = verificationCodes.get(key);
  return verification?.code || null;
}
