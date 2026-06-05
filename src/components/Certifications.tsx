import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Award, Languages, Headphones } from "lucide-react";
import { RevealText, Reveal } from "./Reveal";

const CERTIFICATIONS = [
  {
    title: "IELTS Academic",
    score: "Overall Band Score 6",
    details: [
      { label: "Listening", value: "6.0", icon: Headphones },
      { label: "Reading", value: "6.0", icon: Languages },
      { label: "Writing", value: "6.0", icon: Award },
      { label: "Speaking", value: "6.0", icon: Globe },
    ],
    date: "2024",
    color: "oklch(0.88 0.22 150)",
  },
];

function GlassCard({
  cert,
  index,
  inView,
}: {
  cert: (typeof CERTIFICATIONS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-foreground/[0.02] backdrop-blur-xl p-8 md:p-10 transition-all duration-500 hover:border-primary/50"
        style={{
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 8%, transparent), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Animated glow orb */}
        <motion.div
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)`,
          }}
        />

        <div className="relative flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"
                style={{
                  boxShadow: "0 0 30px color-mix(in oklab, var(--primary) 20%, transparent)",
                }}
              >
                <Globe className="h-8 w-8 text-neon" />
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: "0 0 20px color-mix(in oklab, var(--primary) 40%, transparent)",
                  }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-neon transition-colors duration-500">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{cert.date}</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden md:flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2"
            >
              <Award className="h-4 w-4 text-neon" />
              <span className="text-sm font-medium text-neon">Verified</span>
            </motion.div>
          </div>

          {/* Score highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-8 backdrop-blur-sm"
          >
            <motion.p
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2"
            >
              Overall Score
            </motion.p>
            <motion.p
              className="font-display text-5xl md:text-6xl font-bold text-neon text-glow"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 150 }}
            >
              6.0
            </motion.p>
            <p className="text-sm text-foreground/70 mt-2">{cert.score}</p>
          </motion.div>

          {/* Breakdown grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cert.details.map((detail, i) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                >
                  <Icon className="h-5 w-5 text-primary/80" />
                  <p className="text-lg font-semibold text-foreground">{detail.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {detail.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative py-32 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <div className="mb-16 text-center">
        <Reveal as="p" className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">
          — Certifications
        </Reveal>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          <RevealText>Language </RevealText>
          <RevealText className="text-neon" delay={0.12}>Proficiency</RevealText>
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {CERTIFICATIONS.map((cert, i) => (
          <GlassCard key={cert.title} cert={cert} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
