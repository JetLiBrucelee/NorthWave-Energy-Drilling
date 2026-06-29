interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function LogoIcon({ size = "md", variant = "dark" }: LogoProps) {
  const dim = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  const color = variant === "light" ? "#ffffff" : "#FF6B35";
  return (
    <svg width={dim} height={dim} viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Derrick tower outer triangle */}
      <path d="M20 2 L36 36 L4 36 Z" stroke={color} strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      {/* Upper cross brace */}
      <line x1="13.5" y1="16" x2="26.5" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Lower cross brace */}
      <line x1="9" y1="26" x2="31" y2="26" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Drill crown at apex */}
      <line x1="17" y1="5" x2="23" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Base platform */}
      <line x1="2" y1="36" x2="38" y2="36" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      {/* Wave */}
      <path d="M2 40 Q8.5 36.5 14 40 Q19.5 43.5 26 40 Q31.5 36.5 38 40" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function LogoFull({ variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f172a";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#64748b";
  const accentColor = "#FF6B35";
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="shrink-0">
        <LogoIcon size="md" variant={variant === "light" ? "light" : "dark"} />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-black tracking-[0.15em] uppercase text-[17px]"
          style={{ color: textColor, letterSpacing: "0.12em" }}
        >
          NORTH<span style={{ color: accentColor }}>WAVE</span>
        </span>
        <span
          className="text-[9px] font-bold tracking-[0.28em] uppercase mt-0.5"
          style={{ color: subColor }}
        >
          Energy Drilling
        </span>
      </div>
    </div>
  );
}
