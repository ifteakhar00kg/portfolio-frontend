import { useEffect, useRef } from "react";

/**
 * Live-coding background: drifting neon-green code snippets on a canvas.
 * Fixed, full-viewport, behind all content. Low opacity so the UI stays sharp.
 */
const SNIPPETS = [
  "@RestController",
  "@SpringBootApplication",
  "@Autowired",
  "public class UserService {",
  "const [state, setState] = useState();",
  "useEffect(() => { ... }, []);",
  "export default function App() {}",
  "npm run dev",
  "git commit -m \"vibe\"",
  "docker compose up -d",
  "SELECT * FROM users;",
  "async function fetchData() {}",
  "return <Component />;",
  "if (err) throw new Error();",
  "@GetMapping(\"/api/v1\")",
  "Map<String, Object> ctx = new HashMap<>();",
  "kubectl apply -f deploy.yaml",
  "0xDEADBEEF",
  "import { motion } from \"framer-motion\";",
  "while(true) { build(); ship(); }",
  "POST /api/auth/login 200 OK",
  "interface User { id: string; }",
  "Optional<User> findById(UUID id);",
  "@Transactional",
  "redis-cli PING",
  "yarn build --prod",
  "npx tsc --noEmit",
  "throw new RuntimeException();",
  "Stream.of(items).map(...).toList();",
  "const router = useRouter();",
  "ssh root@server",
  "curl -X POST https://api",
  "{ status: 'ok' }",
  "Promise.all([...])",
  "Thread.sleep(1000);",
  "@Override",
  "ctx.commit();",
];

type Drop = {
  x: number;
  y: number;
  vy: number;
  text: string;
  alpha: number;
  size: number;
};

export function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let drops: Drop[] = [];
    let lastTime = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scaled to viewport area
      const target = Math.min(70, Math.floor((width * height) / 28000));
      drops = Array.from({ length: target }, () => spawn(true));
    };

    const spawn = (initial = false): Drop => {
      const size = 11 + Math.random() * 5;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -20 - Math.random() * 200,
        vy: 18 + Math.random() * 40, // px/sec
        text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
        alpha: 0.25 + Math.random() * 0.25, // 25% – 50%
        size,
      };
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 12px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      ctx.shadowColor = "rgba(57,255,150,0.6)";
      ctx.shadowBlur = 10;

      for (const d of drops) {
        d.y += d.vy * dt;
        if (d.y > height + 20) {
          Object.assign(d, spawn(false));
          d.x = Math.random() * width;
        }
        ctx.font = `500 ${d.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.fillStyle = `rgba(80, 255, 160, ${d.alpha})`;
        ctx.fillText(d.text, d.x, d.y);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame((t) => {
      lastTime = t;
      tick(t);
    });

    const onVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (rafRef.current == null) {
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Glassmorphism overlay: keeps foreground UI sharp & readable */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
      {/* Subtle vignette / glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(57,255,150,0.06), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(57,255,150,0.04), transparent 60%)",
        }}
      />
    </div>
  );
}

export default CodeRainBackground;
