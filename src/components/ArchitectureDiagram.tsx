import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./Reveal";

function Node({
  label,
  sub,
  className = "",
}: {
  label: string;
  sub: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={`relative rounded-xl border border-primary/30 bg-foreground/[0.03] px-4 py-3 backdrop-blur-sm ${className}`}
      style={{ boxShadow: "0 0 30px -10px var(--primary)" }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70">{sub}</p>
      <p className="font-display text-sm font-semibold text-foreground md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

export function ArchitectureDiagram() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-100px" }}
      className="relative mt-24 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-10 backdrop-blur-sm overflow-hidden"
    >
      <motion.div
        variants={staggerItem}
        className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
            — System Architecture
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            How I build <span className="text-neon">systems</span>
          </h3>
        </div>
        <p className="max-w-sm text-sm text-foreground/60">
          A typical request flow through one of my full-stack architectures.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
      >
        <div className="flex justify-center md:justify-start">
          <Node label="React / Next.js" sub="Client" />
        </div>

        <Connector delay={0.2} />

        <div className="flex justify-center">
          <Node label="Spring Boot" sub="REST API" />
        </div>

        <Connector delay={0.6} />

        <div className="flex flex-col justify-center gap-4 md:items-end">
          <Node label="MySQL / PostgreSQL" sub="Database" className="w-full md:w-auto" />
          <Node label="LLM / AI Model" sub="Intelligence" className="w-full md:w-auto" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Connector({ delay }: { delay: number }) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative flex h-10 items-center justify-center md:h-1"
    >
      <div className="relative h-px w-full overflow-hidden md:w-24">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--primary) 0 6px, transparent 6px 12px)",
            opacity: 0.35,
          }}
        />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"
          style={{ boxShadow: "0 0 12px var(--primary), 0 0 24px var(--primary)" }}
        />
      </div>
    </motion.div>
  );
}
