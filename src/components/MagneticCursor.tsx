import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 800, damping: 35, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 800, damping: 35, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-all");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
      );
      setHover(interactive);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hover ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="h-2 w-2 rounded-full bg-primary"
          style={{ boxShadow: "0 0 12px var(--primary), 0 0 24px var(--primary)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hover ? 1.6 : 1,
            opacity: hover ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="h-9 w-9 rounded-full border border-primary/60"
          style={{ boxShadow: "0 0 20px oklch(0.88 0.22 150 / 0.25)" }}
        />
      </motion.div>
    </>
  );
}
