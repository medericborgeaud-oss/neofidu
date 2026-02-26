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

export function CantonIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Map of Switzerland */}
      <path d="M20 50 Q30 30 50 25 Q70 20 80 35 Q90 50 85 65 Q80 80 60 85 Q40 90 25 75 Q15 65 20 50"
            fill="#e5e7eb" stroke="#10b981" strokeWidth="2"/>
      {/* Location pins */}
      <circle cx="40" cy="50" r="6" fill="#10b981"/>
      <circle cx="60" cy="45" r="6" fill="#ef4444"/>
      <circle cx="55" cy="65" r="6" fill="#eab308"/>
      <circle cx="35" cy="40" r="4" fill="#16a34a"/>
      <circle cx="70" cy="55" r="4" fill="#f43f5e"/>
      <circle cx="45" cy="70" r="4" fill="#334155"/>
      {/* Pin drops */}
      <path d="M40 45 L40 35" stroke="#10b981" strokeWidth="2"/>
      <circle cx="40" cy="33" r="3" fill="#10b981"/>
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
