import { motion } from "framer-motion";

interface LoopingTypewriterProps {
  text: string;
  className?: string;
  /** seconds between each word reveal */
  stagger?: number;
  /** seconds to hold the fully-revealed sentence before looping */
  holdMs?: number;
}

/**
 * Premium word-by-word reveal with a soft neon shimmer sweeping across the
 * text on each loop. Replaces the rigid typewriter effect with something
 * far smoother and more "editorial".
 */
export function LoopingTypewriter({
  text,
  className,
  stagger = 0.06,
  holdMs = 4200,
}: LoopingTypewriterProps) {
  const words = text.split(" ");
  const revealDuration = words.length * stagger + 0.9;
  const loopDuration = revealDuration + holdMs / 1000;

  return (
    <div className={`relative text-left ${className ?? ""}`}>
      <motion.p
        className="relative inline-block leading-relaxed"
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, y: "0.6em", filter: "blur(6px)" }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: ["0.6em", "0em", "0em", "-0.3em"],
              filter: ["blur(6px)", "blur(0px)", "blur(0px)", "blur(4px)"],
            }}
            transition={{
              duration: loopDuration,
              times: [
                0,
                Math.min(0.35, (i * stagger + 0.5) / loopDuration),
                1 - 0.08,
                1,
              ],
              ease: "easeOut",
              repeat: Infinity,
              delay: i * stagger,
            }}
          >
            {word + (i < words.length - 1 ? " " : "")}
          </motion.span>
        ))}

        {/* Neon shimmer sweep */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, color-mix(in oklab, var(--primary) 55%, transparent) 50%, transparent 65%)",
            mixBlendMode: "screen",
            maskImage:
              "linear-gradient(black, black)",
          }}
          animate={{ x: ["-110%", "110%"] }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: loopDuration - 2.4,
          }}
        />
      </motion.p>
    </div>
  );
}
