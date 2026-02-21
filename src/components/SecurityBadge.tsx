"use client";

import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface SecurityBadgeProps {
  variant?: "compact" | "full";
  className?: string;
}

export function SecurityBadge({ variant = "compact", className = "" }: SecurityBadgeProps) {
  const { isEnglish } = useLanguage();

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span className="text-green-700 font-medium">
            {isEnglish ? "SSL Secured" : "SSL Sécurisé"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">
            {isEnglish ? "Encrypted" : "Chiffré"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-green-800 mb-1">
            {isEnglish ? "Your documents are protected" : "Vos documents sont protégés"}
          </h4>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isEnglish ? "SSL/TLS 256-bit encryption" : "Chiffrement SSL/TLS 256-bit"}
            </li>
            <li className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isEnglish ? "Secure cloud storage" : "Stockage cloud sécurisé"}
            </li>
            <li className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isEnglish ? "Swiss data protection (LPD)" : "Protection des données suisse (LPD)"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SecurityBadgeInline({ className = "" }: { className?: string }) {
  const { isEnglish } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
      <span>
        {isEnglish
          ? "Your data is encrypted and protected"
          : "Vos données sont chiffrées et protégées"}
      </span>
    </div>
  );
}
