import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { RotatingText } from "./RotatingText";
import { ContactModal } from "./ContactModal";
import { SocialLinks } from "./SocialIcon";
import { getLenis } from "./SmoothScroll";
import { staggerContainer, staggerItem } from "./Reveal";


// Cinematic ease-in-out cubic-bezier (approx cubic-bezier(0.65, 0, 0.35, 1))
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -88,
      duration: 1.4,
      easing: easeInOutCubic,
    });
  } else {
    // Fallback: manual rAF tween so we control duration + easing precisely.
    const startY = window.scrollY;
    const targetY =
      el.getBoundingClientRect().top + window.scrollY - 88;
    const distance = targetY - startY;
    const duration = 1000;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

const ROTATING = [
  "Scalable Spring Boot APIs",
  "AI-Integrated Web Apps",
  "Secure Backend Systems",
  "React & Next.js Interfaces",
];

export function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[40rem] w-[40rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.22 150 / 0.5), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.22 150 / 0.6), transparent 70%)" }}
      />

      {/* nav */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl font-semibold tracking-tight"
        >
          Ifteakar<span className="text-neon">.</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden gap-8 text-sm text-muted-foreground md:flex"
        >
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection("work"); }} className="hover:text-foreground transition-colors cursor-pointer">Work</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }} className="hover:text-foreground transition-colors cursor-pointer">About</a>
          <button onClick={() => setContactOpen(true)} className="hover:text-foreground transition-colors cursor-pointer">Contact</button>
        </motion.div>
      </nav>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 pb-20 pt-8 text-center md:px-12 md:pt-20"
      >
          <motion.p
            variants={staggerItem}
            className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            — Portfolio / 2026
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs text-neon"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for work
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hello, I'm{" "}
            <span className="italic text-neon text-glow">Ifteakar</span>
            <span className="text-neon">.</span>
            <br />
            <span className="text-foreground/90">I build </span>
            <RotatingText words={ROTATING} />
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Backend Developer & AI Integration Enthusiast based in Dhaka.
            Crafting resilient systems and intelligent products at the edge of
            engineering and design.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-4 pt-2"
          >
            <MagneticButton variant="primary" href="#resume">
              Download Resume ↓
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => setContactOpen(true)}>
              Contact Me →
            </MagneticButton>
          </motion.div>

          <motion.div variants={staggerItem} className="pt-2">
            <SocialLinks />
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-6 flex items-center gap-6 border-t border-border/60 pt-6"
          >
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">5+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Years</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">40+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Projects</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">∞</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Curiosity</p>
            </div>
          </motion.div>
      </motion.div>


      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll ↓
        </motion.div>
      </motion.div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
