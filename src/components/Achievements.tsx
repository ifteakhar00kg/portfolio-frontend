import { motion } from "framer-motion";
import { RevealText, StaggerGroup, StaggerItem, staggerContainer, staggerItem } from "./Reveal";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

const CERTIFICATES = [
  {
    title: "Certified Spring Boot Developer",
    issuer: "Ostad",
    description: "Successfully completed a comprehensive Spring Boot Developer course, mastering enterprise-level backend architecture, REST APIs, MVC patterns, and database integrations.",
    link: "https://ostad.app/share/certificate/c40205-khandokar-ifteakar-ahmed",
  },
  {
    title: "THE INFINITY AI BUILDFEST 2026 - Participation Certificate",
    issuer: "CloudCamp Bangladesh",
    description: "Awarded for successfully participating in the Preliminary Round of THE INFINITY AI BUILDFEST 2026 and demonstrating commitment to building an AI-powered solution with real-world impact.",
    link: "https://cloudcampbd.com/verify/35338db138d725ac24e0fb41",
  }
];

function CertificateCard({ cert, index }: { cert: typeof CERTIFICATES[number]; index: number }) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative rounded-3xl p-[2px] overflow-hidden group w-full max-w-md mx-auto flex flex-col"
    >
      <motion.div
        aria-hidden
        className="absolute inset-[-50%]"
        style={{
          background:
            "conic-gradient(from 0deg, oklch(0.88 0.22 150), oklch(0.7 0.2 200), oklch(0.85 0.2 280), oklch(0.88 0.22 150))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[3rem] blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.88 0.22 150 / 0.35), transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative flex-1 flex flex-col items-center rounded-[calc(1.5rem-2px)] bg-background/70 backdrop-blur-2xl px-6 py-10 md:px-8 md:py-12 text-center overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_oklch(0.88_0.22_150_/_0.15)]"
        animate={{
          boxShadow: [
            "inset 0 0 40px oklch(0.88 0.22 150 / 0.05)",
            "inset 0 0 80px oklch(0.88 0.22 150 / 0.15)",
            "inset 0 0 40px oklch(0.88 0.22 150 / 0.05)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-neon mb-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-primary" />
          </span>
          Verified Certification
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px oklch(0.88 0.22 150 / 0.2)",
                  "0 0 40px oklch(0.88 0.22 150 / 0.4)",
                  "0 0 20px oklch(0.88 0.22 150 / 0.2)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"
            >
              <Award className="h-7 w-7 text-neon" />
            </motion.div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon text-background">
              <BadgeCheck className="h-3 w-3" />
            </div>
          </div>

          <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight min-h-[4rem] flex items-center justify-center">
            <span className="text-neon text-glow">{cert.title}</span>
          </h3>

          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Issued by <span className="text-foreground font-medium">{cert.issuer}</span>
          </p>
        </div>

        <p className="mt-4 mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground min-h-[5.5rem]">
          {cert.description}
        </p>

        <div className="mt-auto pt-6">
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-medium text-neon transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_30px_oklch(0.88_0.22_150_/_0.25)] hover:scale-105"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Verified Certificate
          </a>
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary"
              style={{
                left: `${20 + i * 22}%`,
                top: `${25 + (i % 2) * 30}%`,
                boxShadow: "0 0 8px var(--primary)",
              }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <StaggerGroup className="mb-16 text-center">
        <StaggerItem as="p" className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">
          — Achievements & Milestones
        </StaggerItem>
        <StaggerItem as="h2" className="text-4xl md:text-6xl font-bold tracking-tight">
          <RevealText>Professional </RevealText>
          <RevealText className="text-neon" delay={0.08}>Certifications</RevealText>
        </StaggerItem>
      </StaggerGroup>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto"
      >
        {CERTIFICATES.map((cert, index) => (
          <CertificateCard key={index} cert={cert} index={index} />
        ))}
      </motion.div>
    </section>
  );
}