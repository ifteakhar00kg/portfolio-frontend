const ITEMS = [
  "Java",
  "Spring Boot",
  "React",
  "Next.js",
  "Docker",
  "MySQL",
  "PostgreSQL",
  "AI Integration",
];

export function TechMarquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-background/60 py-6 backdrop-blur-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent"
      />
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="group flex items-center gap-12 font-display text-2xl font-medium tracking-tight text-foreground/30 transition-colors duration-300 hover:text-neon md:text-3xl"
            style={{ textShadow: "0 0 0 transparent" }}
          >
            <span className="transition-all duration-300 group-hover:[text-shadow:0_0_24px_var(--primary)]">
              {item}
            </span>
            <span className="text-primary/40">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
