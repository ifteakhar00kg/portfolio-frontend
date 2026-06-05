import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { RevealText } from "./Reveal";

type Skill = { name: string; value: number };

const LANGUAGES_RINGS: Skill[] = [
  { name: "Java", value: 90 },
  { name: "Python", value: 80 },
];
const LANGUAGES_TAGS = ["C / C++", "JavaScript"];

const FRAMEWORKS: Skill[] = [
  { name: "Spring Boot", value: 85 },
  { name: "React / Next.js", value: 75 },
];

const DATABASES: Skill[] = [
  { name: "MySQL", value: 85 },
  { name: "PostgreSQL", value: 85 },
];

const TOOLS = ["Docker", "GitHub", "IntelliJ", "Postman", "VS Code", "PyCharm"];

// ---------- Shared variants ----------
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      mass: 0.7,
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16, mass: 0.5 },
  },
};

const ringVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 18 },
  },
};

const viewport = { once: false, amount: 0.25, margin: "-100px" } as const;

// ---------- Circular progress (variant-driven) ----------
function CircularProgress({ value, label }: { value: number; label: string }) {
  const size = 110;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div variants={ringVariants} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="color-mix(in oklab, var(--foreground) 10%, transparent)"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            className="text-primary"
            style={{
              filter:
                "drop-shadow(0 0 6px color-mix(in oklab, var(--primary) 60%, transparent))",
            }}
            strokeDasharray={circumference}
            variants={{
              hidden: { strokeDashoffset: circumference },
              show: {
                strokeDashoffset: offset,
                transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />
        </svg>
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
          }}
          animate={{ rotate: 360 }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        >
          <div
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neon"
            style={{ boxShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)" }}
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 200, damping: 16 },
              },
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 backdrop-blur"
            style={{
              boxShadow:
                "0 0 16px color-mix(in oklab, var(--primary) 30%, transparent)",
            }}
          >
            <span className="font-display text-base font-bold text-neon">
              {label.charAt(0)}
            </span>
            <motion.span
              className="absolute inset-0 rounded-full border border-primary/50"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>
      <p className="text-xs text-foreground/80 font-medium tracking-wide text-center">
        {label}
      </p>
    </motion.div>
  );
}

// ---------- Category card with staggered children ----------
function CategoryCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-xl transition-shadow duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_oklch(0.88_0.22_150/0.45)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, oklch(0.88 0.22 150 / 0.12), transparent 70%)",
        }}
      />
      <div className="relative">
        <motion.p
          variants={itemVariants}
          className="font-display text-sm uppercase tracking-[0.25em] text-primary/80 mb-6"
        >
          {title}
        </motion.p>
        {children}
      </div>
    </motion.div>
  );
}

// ---------- Neon tag (variant-driven) ----------
function NeonTag({ children, pro = false }: { children: ReactNode; pro?: boolean }) {
  if (pro) {
    return (
      <motion.span
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-1.5 text-sm font-medium text-neon"
        style={{ boxShadow: "0 0 18px oklch(0.88 0.22 150 / 0.35)" }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary/60"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative">{children}</span>
        <span className="relative rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          Pro
        </span>
      </motion.span>
    );
  }
  return (
    <motion.span
      variants={itemVariants}
      whileHover={{ y: -2, borderColor: "var(--primary)" }}
      className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-3.5 py-1.5 text-sm text-foreground/80 backdrop-blur transition-colors hover:text-neon hover:shadow-[0_0_14px_oklch(0.88_0.22_150/0.3)]"
    >
      {children}
    </motion.span>
  );
}

// ---------- Vibe Badge ----------
function VibeBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.7 }}
      className="mb-12 flex justify-center"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className="relative"
      >
        <motion.div
          aria-hidden
          className="absolute -inset-4 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.22 150 / 0.5), transparent 70%)",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative inline-flex items-center gap-3 rounded-full border border-primary/60 bg-background/70 px-6 py-3 backdrop-blur-xl"
          animate={{
            boxShadow: [
              "0 0 20px oklch(0.88 0.22 150 / 0.3)",
              "0 0 40px oklch(0.88 0.22 150 / 0.55)",
              "0 0 20px oklch(0.88 0.22 150 / 0.3)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg"
          >
            🔥
          </motion.span>
          <span className="font-display text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-neon text-glow">
            Best at Vibe Coding
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ---------- Section ----------
export function Skills() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3"
        >
          — Skills
        </motion.p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          <RevealText>What I work </RevealText>
          <RevealText className="text-neon" delay={0.15}>with</RevealText>
        </h2>
      </div>

      <VibeBadge />

      <div className="grid gap-6 md:grid-cols-2">
        <CategoryCard title="Languages">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {LANGUAGES_RINGS.map((s) => (
              <CircularProgress key={s.name} value={s.value} label={s.name} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES_TAGS.map((t) => (
              <NeonTag key={t}>{t}</NeonTag>
            ))}
          </div>
        </CategoryCard>

        <CategoryCard title="Frameworks">
          <div className="grid grid-cols-2 gap-4">
            {FRAMEWORKS.map((s) => (
              <CircularProgress key={s.name} value={s.value} label={s.name} />
            ))}
          </div>
        </CategoryCard>

        <CategoryCard title="Databases">
          <div className="grid grid-cols-2 gap-4">
            {DATABASES.map((s) => (
              <CircularProgress key={s.name} value={s.value} label={s.name} />
            ))}
          </div>
        </CategoryCard>

        <CategoryCard title="Tools & AI">
          <div className="flex flex-wrap gap-2.5">
            <NeonTag pro>Lovable</NeonTag>
            {TOOLS.map((t) => (
              <NeonTag key={t}>{t}</NeonTag>
            ))}
          </div>
        </CategoryCard>
      </div>
    </section>
  );
}
