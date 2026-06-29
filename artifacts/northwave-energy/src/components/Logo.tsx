interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function LogoIcon({ size = "md", variant = "dark" }: LogoProps) {
  const dim = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  const color = variant === "light" ? "#ffffff" : "#0ca8e3";
  return (
    <svg width={dim} height={dim} viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 2 L36 36 L4 36 Z" stroke={color} strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <line x1="13.5" y1="16" x2="26.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="9" y1="26" x2="31" y2="26" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="17" y1="5" x2="23" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="2" y1="36" x2="38" y2="36" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M2 40 Q8.5 36.5 14 40 Q19.5 43.5 26 40 Q31.5 36.5 38 40" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function LogoFull({ variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#f0f6fc";
  const subColor = variant === "light" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.5)";
  const accentColor = "#0ca8e3";
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="shrink-0">
        <LogoIcon size="md" variant="light" />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className="font-bold text-[17px] tracking-tight"
          style={{ color: textColor, letterSpacing: "0.04em" }}
        >
          NORTH<span style={{ color: accentColor }}>WAVE</span>
        </span>
        <span
          className="text-[9px] font-semibold tracking-[0.2em] uppercase mt-0.5"
          style={{ color: subColor }}
        >
          Energy Drilling
        </span>
      </div>
    </div>
  );
}
