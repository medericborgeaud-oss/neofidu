"use client";

export function TaxIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <rect x="40" y="20" width="100" height="140" rx="8" fill="white" stroke="#10b981" strokeWidth="2"/>
      <rect x="50" y="40" width="60" height="6" rx="3" fill="#e5e7eb"/>
      <rect x="50" y="55" width="80" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="50" y="65" width="70" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="50" y="75" width="75" height="4" rx="2" fill="#e5e7eb"/>
      {/* Checkmark circle */}
      <circle cx="150" cy="130" r="30" fill="#10b981"/>
      <path d="M138 130L146 138L162 122" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Calculator */}
      <rect x="20" y="100" width="50" height="70" rx="6" fill="#0d9488" opacity="0.9"/>
      <rect x="26" y="108" width="38" height="16" rx="3" fill="#99f6e4"/>
      <circle cx="32" cy="135" r="5" fill="#14b8a6"/>
      <circle cx="45" cy="135" r="5" fill="#14b8a6"/>
      <circle cx="58" cy="135" r="5" fill="#14b8a6"/>
      <circle cx="32" cy="150" r="5" fill="#14b8a6"/>
      <circle cx="45" cy="150" r="5" fill="#14b8a6"/>
      <circle cx="58" cy="150" r="5" fill="#f59e0b"/>
      {/* Coins */}
      <ellipse cx="165" cy="75" rx="20" ry="8" fill="#fbbf24"/>
      <ellipse cx="165" cy="70" rx="20" ry="8" fill="#fcd34d"/>
      <ellipse cx="165" cy="65" rx="20" ry="8" fill="#fde68a"/>
      <text x="160" y="68" fontSize="10" fill="#92400e" fontWeight="bold">CHF</text>
    </svg>
  );
}

export function AccountingIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chart */}
      <rect x="30" y="40" width="120" height="100" rx="8" fill="white" stroke="#0d9488" strokeWidth="2"/>
      {/* Bars */}
      <rect x="45" y="100" width="20" height="30" rx="3" fill="#99f6e4"/>
      <rect x="75" y="80" width="20" height="50" rx="3" fill="#5eead4"/>
      <rect x="105" y="60" width="20" height="70" rx="3" fill="#14b8a6"/>
      {/* Line chart */}
      <path d="M45 95 L65 75 L85 85 L105 55 L125 65" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="45" cy="95" r="4" fill="#0d9488"/>
      <circle cx="65" cy="75" r="4" fill="#0d9488"/>
      <circle cx="85" cy="85" r="4" fill="#0d9488"/>
      <circle cx="105" cy="55" r="4" fill="#0d9488"/>
      <circle cx="125" cy="65" r="4" fill="#0d9488"/>
      {/* Pie chart */}
      <circle cx="160" cy="140" r="35" fill="#e5e7eb"/>
      <path d="M160 140 L160 105 A35 35 0 0 1 190 155 Z" fill="#10b981"/>
      <path d="M160 140 L190 155 A35 35 0 0 1 140 170 Z" fill="#14b8a6"/>
      <circle cx="160" cy="140" r="15" fill="white"/>
      {/* Person */}
      <circle cx="170" cy="50" r="15" fill="#fcd34d"/>
      <rect x="155" y="70" width="30" height="35" rx="8" fill="#0d9488"/>
    </svg>
  );
}

// NeoFidu Logo Icon (document with checkmark)
export function CantonIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#10b981" opacity="0.08"/>
      {/* Document icon */}
      <rect x="28" y="18" width="44" height="64" rx="6" fill="url(#logoGradientIcon)"/>
      {/* Document lines */}
      <rect x="36" y="30" width="22" height="4" rx="2" fill="white" opacity="0.9"/>
      <rect x="36" y="40" width="28" height="4" rx="2" fill="white" opacity="0.7"/>
      <rect x="36" y="50" width="25" height="4" rx="2" fill="white" opacity="0.5"/>
      {/* Checkmark */}
      <path d="M40 62 L48 70 L62 56" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Option 1: Croix Suisse (Swiss Cross) - Clean and professional
export function CantonIllustrationCross({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#10b981" opacity="0.1"/>
      <circle cx="50" cy="50" r="38" fill="white" stroke="#10b981" strokeWidth="2"/>
      {/* Swiss cross */}
      <rect x="44" y="28" width="12" height="44" rx="2" fill="#10b981"/>
      <rect x="28" y="44" width="44" height="12" rx="2" fill="#10b981"/>
      {/* Small location dot */}
      <circle cx="75" cy="25" r="8" fill="#0d9488"/>
      <circle cx="75" cy="25" r="4" fill="white"/>
    </svg>
  );
}

// Option 2: Document fiscal avec pin de localisation
export function CantonIllustrationDoc({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <rect x="20" y="15" width="50" height="70" rx="4" fill="white" stroke="#10b981" strokeWidth="2"/>
      <rect x="28" y="28" width="34" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="28" y="38" width="28" height="3" rx="1.5" fill="#e5e7eb"/>
      <rect x="28" y="46" width="30" height="3" rx="1.5" fill="#e5e7eb"/>
      <rect x="28" y="54" width="24" height="3" rx="1.5" fill="#e5e7eb"/>
      {/* Location pin */}
      <g transform="translate(60, 50)">
        <circle cx="15" cy="15" r="18" fill="#10b981" opacity="0.15"/>
        <path d="M15 5 C10 5 6 9 6 14 C6 21 15 30 15 30 C15 30 24 21 24 14 C24 9 20 5 15 5Z" fill="#10b981"/>
        <circle cx="15" cy="14" r="5" fill="white"/>
      </g>
    </svg>
  );
}

// Option 3: Bâtiment institutionnel
export function CantonIllustrationBuilding({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="50" cy="50" r="42" fill="#10b981" opacity="0.1"/>
      {/* Building */}
      <path d="M50 20 L75 35 L75 75 L25 75 L25 35 Z" fill="white" stroke="#10b981" strokeWidth="2"/>
      {/* Roof triangle */}
      <path d="M25 35 L50 20 L75 35" stroke="#10b981" strokeWidth="2" fill="none"/>
      {/* Columns */}
      <rect x="32" y="45" width="6" height="25" fill="#10b981" opacity="0.3"/>
      <rect x="47" y="45" width="6" height="25" fill="#10b981" opacity="0.3"/>
      <rect x="62" y="45" width="6" height="25" fill="#10b981" opacity="0.3"/>
      {/* Door */}
      <rect x="44" y="58" width="12" height="17" rx="6" fill="#10b981"/>
      {/* Flag */}
      <line x1="50" y1="20" x2="50" y2="10" stroke="#10b981" strokeWidth="2"/>
      <rect x="50" y="10" width="12" height="8" fill="#10b981"/>
    </svg>
  );
}

export function SuccessIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Confetti */}
      <rect x="30" y="40" width="8" height="8" rx="1" fill="#fbbf24" transform="rotate(15 30 40)"/>
      <rect x="160" y="50" width="8" height="8" rx="1" fill="#10b981" transform="rotate(-20 160 50)"/>
      <rect x="50" y="150" width="6" height="6" rx="1" fill="#f43f5e" transform="rotate(30 50 150)"/>
      <rect x="150" y="140" width="6" height="6" rx="1" fill="#8b5cf6" transform="rotate(-15 150 140)"/>
      <circle cx="170" cy="80" r="4" fill="#10b981"/>
      <circle cx="35" cy="100" r="3" fill="#fbbf24"/>
      <circle cx="165" cy="120" r="5" fill="#f43f5e"/>
      {/* Main circle */}
      <circle cx="100" cy="100" r="60" fill="#10b981" opacity="0.1"/>
      <circle cx="100" cy="100" r="45" fill="#10b981" opacity="0.2"/>
      <circle cx="100" cy="100" r="35" fill="#10b981"/>
      {/* Checkmark */}
      <path d="M80 100 L95 115 L125 85" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Stars */}
      <path d="M45 60 L48 66 L55 67 L50 72 L51 79 L45 76 L39 79 L40 72 L35 67 L42 66 Z" fill="#fbbf24"/>
      <path d="M155 30 L157 34 L162 35 L158 38 L159 43 L155 41 L151 43 L152 38 L148 35 L153 34 Z" fill="#fbbf24"/>
    </svg>
  );
}

export function PaymentIllustration({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Credit card */}
      <rect x="30" y="60" width="120" height="80" rx="10" fill="linear-gradient(135deg, #10b981 0%, #0d9488 100%)"/>
      <rect x="30" y="60" width="120" height="80" rx="10" fill="#10b981"/>
      <rect x="30" y="80" width="120" height="20" fill="#0d9488"/>
      <rect x="40" y="110" width="40" height="8" rx="2" fill="#99f6e4"/>
      <rect x="40" y="125" width="60" height="6" rx="2" fill="white" opacity="0.5"/>
      <circle cx="130" cy="120" r="12" fill="#fbbf24" opacity="0.8"/>
      <circle cx="120" cy="120" r="12" fill="#f59e0b"/>
      {/* Phone with payment */}
      <rect x="120" y="40" width="60" height="100" rx="8" fill="#1f2937"/>
      <rect x="125" y="50" width="50" height="80" rx="4" fill="white"/>
      <circle cx="150" cy="75" r="15" fill="#10b981" opacity="0.2"/>
      <path d="M143 75 L148 80 L158 70" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
      <rect x="135" y="100" width="30" height="6" rx="2" fill="#e5e7eb"/>
      <rect x="140" y="112" width="20" height="4" rx="1" fill="#e5e7eb"/>
      {/* Lock */}
      <circle cx="45" cy="50" r="15" fill="#fbbf24"/>
      <rect x="38" y="48" width="14" height="12" rx="2" fill="#1f2937"/>
      <path d="M41 48 V44 A4 4 0 0 1 49 44 V48" stroke="#1f2937" strokeWidth="2" fill="none"/>
    </svg>
  );
}
