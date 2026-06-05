import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
  pulse?: boolean;
}

export function SocialIcon({ href, label, children, pulse = false }: SocialIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.4);
    y.set(relY * 0.4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary/40 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_20px_oklch(0.88_0.22_150/0.35)] ${pulse ? "animate-whatsapp-pulse" : ""}`}
    >
      <motion.span style={{ x: springX, y: springY }} className="relative z-10">
        {children}
      </motion.span>
    </motion.a>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <SocialIcon href="https://github.com/ifteakhar00kg" label="GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </SocialIcon>

      <SocialIcon href="https://www.linkedin.com/in/khandokarifteakar/" label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </SocialIcon>

      <SocialIcon href="https://wa.me/8801632220987" label="WhatsApp" pulse>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm7.04 9.91c0 3.88-3.16 7.04-7.04 7.04-1.43 0-2.82-.43-4-1.23l-.29-.18-3.06.8.82-2.98-.19-.31A7.05 7.05 0 015 11.91c0-3.88 3.16-7.04 7.04-7.04 1.88 0 3.65.73 4.98 2.06 1.33 1.33 2.06 3.1 2.06 4.98zm-4.09-2.22c-.15-.35-.54-.48-.89-.32l-.02.01c-.35.15-.54.48-.32.89.15.35.54.48.89.32.35-.15.54-.48.32-.89zm1.22.61c-.15-.35-.54-.48-.89-.32-.35.15-.54.48-.32.89.15.35.54.48.89.32.35-.15.54-.48.32-.89zm-5.37 3.86c1.36 1.36 3.43 1.76 4.64.96.4-.27.51-.8.24-1.2-.27-.4-.8-.51-1.2-.24-.62.41-2.03.1-2.84-.71-.81-.81-1.12-2.22-.71-2.84.27-.4.16-.93-.24-1.2-.4-.27-.93-.16-1.2.24-.8 1.21-.4 3.28.96 4.64l.35.35z"/>
        </svg>
      </SocialIcon>
    </div>
  );
}
