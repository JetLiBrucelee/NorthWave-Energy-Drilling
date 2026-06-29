import rigBanner from "@assets/Screenshot_2026-06-29_at_1.01.27_PM_1782752509835.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function LogoIcon({ size = "md" }: LogoProps) {
  const dim = size === "sm" ? 30 : size === "lg" ? 56 : 50;
  return (
    <div
      style={{
        width: dim,
        height: dim,
        flexShrink: 0,
        borderRadius: 4,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <img
        src={rigBanner}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "16% center",
          display: "block",
          pointerEvents: "none",
          userSelect: "none" as const,
        }}
      />
    </div>
  );
}

export function LogoFull({ variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#f0f6fc";
  const subColor = "rgba(255,255,255,0.45)";
  return (
    <div className="flex items-center gap-3 select-none">
      <LogoIcon size="md" />
      <div className="flex flex-col leading-none">
        <span style={{ color: textColor, fontWeight: 800, fontSize: 20, letterSpacing: "0.07em" }}>
          NORTH<span style={{ color: "#3474f4" }}>WAVE</span>
        </span>
        <span style={{ color: subColor, fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase" as const, marginTop: 3 }}>
          ENERGY DRILLING
        </span>
      </div>
    </div>
  );
}
