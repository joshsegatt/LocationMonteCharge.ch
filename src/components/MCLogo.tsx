import { cn } from '../lib/utils';

/**
 * MCLogo — Logótipo oficial BatiMove / Monte-Charge Suisse
 * Componente único partilhado por App.tsx e HeroReferenceTier.tsx
 */
export const MCLogo = ({ size = 36, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("filter drop-shadow-[0_2px_8px_rgba(5,50,41,0.25)]", className)}
    aria-label="Logo Monte-Charge BatiMove"
    role="img"
  >
    <rect x="15" y="70" width="70" height="6" rx="3" fill="#053229" />
    <path
      d="M15 70V55C15 52.2386 17.2386 50 20 50H45C47.7614 50 50 52.2386 50 55V70H15Z"
      fill="#053229"
    />
    <rect x="25" y="55" width="15" height="8" rx="1.5" fill="#FFFFFF" />
    <g transform="translate(45 65) rotate(-35)">
      <rect x="0" y="-3" width="40" height="6" rx="3" fill="#E10600" />
      <rect x="35" y="-3" width="30" height="6" rx="3" fill="#00A388" />
      <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#053229" strokeWidth="1.5" />
    </g>
    <circle cx="28" cy="76" r="8" fill="#021813" stroke="#00A388" strokeWidth="2.5" />
    <circle cx="28" cy="76" r="3" fill="#E10600" />
    <circle cx="72" cy="76" r="8" fill="#021813" stroke="#00A388" strokeWidth="2.5" />
    <circle cx="72" cy="76" r="3" fill="#E10600" />
  </svg>
);
