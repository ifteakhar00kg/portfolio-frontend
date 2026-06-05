import { useState } from "react";
// react-github-calendar কে Named Import করা হয়েছে
import { GitHubCalendar } from "react-github-calendar"; 
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// Reveal কে Named Import করা হয়েছে 
import { Reveal } from "./Reveal"; 

// named export রাখা হয়েছে যাতে index.tsx এর সাথে ম্যাচ করে
export function GithubContributions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });

  const username = "ifteakhar00kg";

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const years = [currentYear, currentYear - 1, currentYear - 2];

  const customTheme = {
    light: ["#1a1a24", "#0e4429", "#006d32", "#26a641", "#39d353"],
    dark: [
      "oklch(0.22 0.006 240)",
      "color-mix(in oklab, var(--primary) 25%, oklch(0.18 0.006 240))",
      "color-mix(in oklab, var(--primary) 50%, oklch(0.18 0.006 240))",
      "color-mix(in oklab, var(--primary) 75%, oklch(0.18 0.006 240))",
      "var(--primary)",
    ],
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16 md:px-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 backdrop-blur-sm md:p-10"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
              — Live Activity
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              GitHub <span className="text-neon">contributions</span>
            </h3>
            <p className="text-xs text-foreground/40 mt-1">
              @{username}'s live coding stats
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-foreground/50">Filter Year:</span>
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(Number(value))}
            >
              <SelectTrigger className="w-[110px] bg-background/50 border-foreground/10 text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-foreground/10">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="text-xs">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative overflow-x-auto pt-2 scrollbar-none flex justify-center">
          <div className="min-w-[800px] w-full p-4 bg-background/20 rounded-2xl border border-foreground/5 flex justify-center">
            <GitHubCalendar
              username={username}
              year={selectedYear}
              theme={customTheme}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              hideTotalCount={false}
              hideColorLegend={false}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}