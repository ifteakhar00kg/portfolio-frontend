import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// ===== Shared stagger system (used site-wide) =====
export const staggerViewport = { once: false, margin: "-100px" } as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.5 },
  },
};

export function StaggerGroup({
  children,
  className,
  as: Tag = "div",
  amount = 0.15,
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "span" | "ul" | "p";
  amount?: number;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px", amount }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren,
            delayChildren,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "li" | "a";
  y?: number;
}) {
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.5 },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wibify-style scroll reveal: soft fade + upward slide with a buttery cubic
 * ease. Designed to be paired with Lenis smooth scroll.
 *
 * Uses `whileInView` so the animation kicks in the moment the element enters
 * the viewport — keeps perf light (no extra observers) and feels natural while
 * scrolling.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.85,
  once = false,
  amount = 0.2,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  /** Fraction of element that must be in view before triggering (0-1). */
  amount?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "p" | "h1" | "h2" | "h3";
}) {
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word reveal used for headings — mirrors the wibify hero / section
 * title intro. Splits the provided string on whitespace and staggers each
 * word with a small mask-style upward slide.
 */
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 0.7 },
  },
};

export function RevealText({
  children,
  className,
  stagger = 0.07,
  delay = 0,
  once = false,
  amount = 0.4,
}: {
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const words = children.split(/(\s+)/);

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "-100px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ paddingBottom: "0.12em" }}
          >
            <motion.span variants={wordVariants} className="inline-block">
              {w}
            </motion.span>
          </span>
        ),
      )}
    </motion.span>
  );
}
