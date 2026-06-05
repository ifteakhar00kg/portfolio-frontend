import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  variant = "primary",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";
  const baseClass =
    "relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium tracking-wide cursor-pointer select-none overflow-hidden isolate";
  const variantClass = isPrimary
    ? "bg-[oklch(0.22_0.04_150)] text-foreground"
    : "border border-border text-foreground hover:text-primary transition-colors duration-300";

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`${baseClass} ${variantClass}`}
    >
      {isPrimary && (
        <>
          {/* continuous green sheen sweep (wibify-style) */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, transparent 25%, oklch(0.88 0.22 150 / 0.85) 50%, transparent 75%, transparent 100%)",
              backgroundSize: "220% 100%",
            }}
            animate={{ backgroundPositionX: ["120%", "-120%"] }}
            transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
          />
          {/* soft breathing inner glow */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 120%, oklch(0.88 0.22 150 / 0.55), transparent 60%)",
              mixBlendMode: "screen",
            }}
            animate={{ opacity: [0.55, 0.95, 0.55] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
          {/* outer halo pulse */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full -z-10"
            animate={{
              boxShadow: [
                "0 0 0px oklch(0.88 0.22 150 / 0)",
                "0 0 32px oklch(0.88 0.22 150 / 0.55)",
                "0 0 0px oklch(0.88 0.22 150 / 0)",
              ],
            }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </>
      )}

      {!isPrimary && (
        /* outline variant gets a subtler continuous shimmer along the border */
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "inset 0 0 0px oklch(0.88 0.22 150 / 0.0)",
              "inset 0 0 18px oklch(0.88 0.22 150 / 0.25)",
              "inset 0 0 0px oklch(0.88 0.22 150 / 0.0)",
            ],
          }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      <motion.span style={{ x: springX, y: springY }} className="relative z-10">
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
