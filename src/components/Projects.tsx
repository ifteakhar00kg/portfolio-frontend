import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { RevealText, StaggerGroup, StaggerItem, staggerContainer, staggerItem } from "./Reveal";
import { LoopingTypewriter } from "./LoopingTypewriter";

// ব্যাকএন্ডের মডেলের সাথে মিল রেখে টাইপ
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string; // ব্যাকএন্ড থেকে কমা-সেপারেটেড স্ট্রিং আসে
  githubLink: string;
  liveLink: string;
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div variants={staggerItem} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 md:p-10 backdrop-blur-sm transition-shadow duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_-10px_var(--primary)]"
      >
        <div style={{ transform: "translateZ(40px)" }} className="relative flex h-full flex-col">
          <div className="flex items-start justify-between mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-primary/80">
              0{index + 1} / API
            </span>
            <div className="rounded-full border border-foreground/15 p-2 text-foreground/70 group-hover:border-primary group-hover:text-neon">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-neon transition-colors">
            {project.title}
          </h3>
          <p className="text-foreground/70 mb-8 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.split(",").map((s) => (
              <span key={s} className="px-3 py-1 rounded-full border border-foreground/10 text-xs text-foreground/70">
                {s.trim()}
              </span>
            ))}
          </div>
          <div className="mt-auto">
            <a
              href={project.liveLink || project.githubLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-medium text-neon transition-all hover:bg-primary hover:text-primary-foreground"
            >
              View Project <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // আপনার ব্যাকএন্ডের এন্ডপয়েন্ট
    fetch("http://localhost:8083/api/v1/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <section id="work" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <StaggerGroup className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <StaggerItem as="p" className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">— Selected Work</StaggerItem>
          <StaggerItem as="h2" className="text-4xl md:text-6xl font-bold tracking-tight">
            <RevealText>Recent </RevealText>
            <RevealText className="text-neon" delay={0.08}>projects</RevealText>
          </StaggerItem>
        </div>
      </StaggerGroup>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px", amount: 0.15 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {projects.map((p, i) => (
          <TiltCard key={p.id} project={p} index={i} />
        ))}
      </motion.div>
      <ArchitectureDiagram />
    </section>
  );
}