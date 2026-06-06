import { motion } from "framer-motion";
import { SocialLinks } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Ifteakar<span className="text-neon">.</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Backend Developer & AI Integration Enthusiast
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SocialLinks />
          </motion.div>

          {/* Contact / Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center md:text-right"
          >
            <a
              href="mailto:contact@ifteakar.dev"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              contact@ifteakar.dev
            </a>
            <p className="mt-1 text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Khandokar Ifteakar Ahmed. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
