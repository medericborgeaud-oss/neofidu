/**
 * Protection anti-spam et sécurité pour les formulaires
 * Utilise plusieurs techniques : honeypot, rate limiting, timestamp validation, input sanitization
 */

// Store pour le rate limiting (en mémoire - suffisant pour une instance)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requêtes par minute par IP
const MIN_SUBMISSION_TIME = 3000; // Minimum 3 secondes pour remplir un formulaire
const MAX_SUBMISSION_TIME = 30 * 60 * 1000; // Maximum 30 minutes

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

/**
 * Vérifie si la requête est du spam basé sur le honeypot
 * Le champ honeypot doit être vide (les bots le remplissent automatiquement)
 */
export function checkHoneypot(honeypotValue: string | undefined | null): SpamCheckResult {
  if (honeypotValue && honeypotValue.trim() !== "") {
    console.warn("🍯 Honeypot triggered - spam detected");
    return { isSpam: true, reason: "honeypot" };
  }
  return { isSpam: false };
}

/**
 * Vérifie le rate limiting par IP
 */
export function checkRateLimit(ip: string): SpamCheckResult {
  const now = Date.now();
  const key = `rate:${ip}`;

  const existing = rateLimitStore.get(key);

  if (existing) {
    // Réinitialiser si la fenêtre est passée
    if (now > existing.resetAt) {
      rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
      return { isSpam: false };
    }

    // Incrémenter le compteur
    existing.count++;

    if (existing.count > RATE_LIMIT_MAX_REQUESTS) {
      console.warn(`🚫 Rate limit exceeded for IP: ${ip}`);
      return { isSpam: true, reason: "rate_limit" };
    }
  } else {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  }

  // Nettoyer les anciennes entrées périodiquement
  if (Math.random() < 0.1) {
    cleanupRateLimitStore();
  }

  return { isSpam: false };
}

/**
 * Vérifie le timestamp de soumission
 * Le formulaire ne doit pas être soumis trop rapidement (bot) ni trop tard (token expiré)
 */
export function checkTimestamp(formLoadedAt: number | undefined | null): SpamCheckResult {
  if (!formLoadedAt) {
    // Si pas de timestamp, on laisse passer (compatibilité)
    return { isSpam: false };
  }

  const now = Date.now();
  const elapsed = now - formLoadedAt;

  if (elapsed < MIN_SUBMISSION_TIME) {
    console.warn(`⚡ Form submitted too fast: ${elapsed}ms`);
    return { isSpam: true, reason: "too_fast" };
  }

  if (elapsed > MAX_SUBMISSION_TIME) {
    console.warn(`⏰ Form submission token expired: ${elapsed}ms`);
    return { isSpam: true, reason: "token_expired" };
  }

  return { isSpam: false };
}

/**
 * Vérifie plusieurs indicateurs de spam
 */
export function performSpamCheck(params: {
  ip: string;
  honeypot?: string | null;
  formLoadedAt?: number | null;
}): SpamCheckResult {
  // 1. Vérifier le honeypot
  const honeypotCheck = checkHoneypot(params.honeypot);
  if (honeypotCheck.isSpam) return honeypotCheck;

  // 2. Vérifier le rate limiting
  const rateLimitCheck = checkRateLimit(params.ip);
  if (rateLimitCheck.isSpam) return rateLimitCheck;

  // 3. Vérifier le timestamp
  const timestampCheck = checkTimestamp(params.formLoadedAt);
  if (timestampCheck.isSpam) return timestampCheck;

  return { isSpam: false };
}

/**
 * Génère un token de timestamp pour le formulaire
 */
export function generateFormToken(): number {
  return Date.now();
}

/**
 * Nettoie les anciennes entrées du rate limit store
 */
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Obtient l'IP du client depuis les headers de la requête
 */
export function getClientIP(headers: Headers): string {
  // Vercel/Netlify forwarded IP
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // Real IP header
  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback
  return "unknown";
}

// =============================================
// INPUT VALIDATION & SANITIZATION
// =============================================

/**
 * Patterns dangereux à bloquer
 */
const DANGEROUS_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi, // Script tags
  /javascript:/gi, // JavaScript protocol
  /on\w+\s*=/gi, // Event handlers (onclick, onerror, etc.)
  /data:\s*text\/html/gi, // Data URLs with HTML
  /<\s*iframe/gi, // Iframes
  /<\s*object/gi, // Object tags
  /<\s*embed/gi, // Embed tags
  /<\s*link/gi, // Link tags (can load external CSS)
  /<\s*meta/gi, // Meta tags
  /expression\s*\(/gi, // CSS expressions
  /url\s*\(\s*["']?\s*javascript/gi, // JavaScript in CSS url()
];

/**
 * Patterns SQL injection à bloquer
 */
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|UNION|DECLARE)\b)/gi,
  /('|"|;|--|\||\*|=)/g, // Only block if combined with SQL keywords
  /\b(OR|AND)\b\s+\d+\s*=\s*\d+/gi, // OR 1=1, AND 1=1
];

/**
 * Sanitize une chaîne de caractères en supprimant les balises HTML dangereuses
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return "";

  let sanitized = input.trim();

  // Supprimer les caractères de contrôle
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Échapper les caractères HTML dangereux
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

  return sanitized;
}

/**
 * Valide une adresse email
 */
export function validateEmail(email: string | undefined | null): ValidationResult {
  if (!email) {
    return { isValid: false, error: "Email requis" };
  }

  const trimmed = email.trim().toLowerCase();

  // Vérifier la longueur
  if (trimmed.length > 254) {
    return { isValid: false, error: "Email trop long" };
  }

  // Pattern email simple mais efficace
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailPattern.test(trimmed)) {
    return { isValid: false, error: "Format email invalide" };
  }

  return { isValid: true, sanitizedValue: trimmed };
}

/**
 * Valide un numéro de téléphone suisse
 */
export function validatePhone(phone: string | undefined | null): ValidationResult {
  if (!phone) {
    return { isValid: true, sanitizedValue: "" }; // Phone is often optional
  }

  // Supprimer les espaces et caractères de formatage
  const cleaned = phone.replace(/[\s\-\.\(\)]/g, "");

  // Pattern pour téléphones suisses (+41, 0041, ou format local)
  const swissPhonePattern = /^(\+41|0041|0)?[1-9][0-9]{8}$/;

  if (!swissPhonePattern.test(cleaned)) {
    return { isValid: false, error: "Format téléphone invalide" };
  }

  return { isValid: true, sanitizedValue: cleaned };
}

/**
 * Valide un code postal suisse (NPA)
 */
export function validateNPA(npa: string | undefined | null): ValidationResult {
  if (!npa) {
    return { isValid: true, sanitizedValue: "" }; // NPA might be optional
  }

  const cleaned = npa.trim();

  // NPA suisse: 4 chiffres entre 1000 et 9999
  const npaPattern = /^[1-9][0-9]{3}$/;

  if (!npaPattern.test(cleaned)) {
    return { isValid: false, error: "NPA invalide (4 chiffres)" };
  }

  return { isValid: true, sanitizedValue: cleaned };
}

/**
 * Vérifie si un texte contient des patterns dangereux (XSS, injection)
 */
export function containsDangerousPatterns(input: string | undefined | null): boolean {
  if (!input) return false;

  // Vérifier les patterns XSS
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      console.warn(`⚠️ Dangerous pattern detected: ${pattern}`);
      return true;
    }
  }

  // Vérifier les patterns SQL injection (seulement si mots-clés SQL présents)
  const hasSQLKeywords = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b/i.test(input);
  if (hasSQLKeywords) {
    console.warn(`⚠️ SQL keywords detected in input`);
    return true;
  }

  return false;
}

/**
 * Valide et sanitize un champ texte général
 */
export function validateTextField(
  value: string | undefined | null,
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { required = false, minLength = 0, maxLength = 10000, fieldName = "Champ" } = options;

  if (!value || value.trim() === "") {
    if (required) {
      return { isValid: false, error: `${fieldName} requis` };
    }
    return { isValid: true, sanitizedValue: "" };
  }

  const trimmed = value.trim();

  // Vérifier la longueur
  if (trimmed.length < minLength) {
    return { isValid: false, error: `${fieldName} trop court (min ${minLength} caractères)` };
  }

  if (trimmed.length > maxLength) {
    return { isValid: false, error: `${fieldName} trop long (max ${maxLength} caractères)` };
  }

  // Vérifier les patterns dangereux
  if (containsDangerousPatterns(trimmed)) {
    return { isValid: false, error: "Caractères non autorisés détectés" };
  }

  return { isValid: true, sanitizedValue: sanitizeString(trimmed) };
}

/**
 * Valide un montant en CHF
 */
export function validateAmount(amount: string | number | undefined | null): ValidationResult {
  if (amount === undefined || amount === null || amount === "") {
    return { isValid: true, sanitizedValue: "" };
  }

  const numValue = typeof amount === "string" ? parseFloat(amount.replace(/['\s]/g, "")) : amount;

  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: "Montant invalide" };
  }

  if (numValue > 100000000) { // Max 100 million
    return { isValid: false, error: "Montant trop élevé" };
  }

  return { isValid: true, sanitizedValue: numValue.toString() };
}
