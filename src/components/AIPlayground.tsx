import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Terminal, Send, Loader2, Sparkles, ChevronRight } from "lucide-react";

export function AIPlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { sentiment: string; confidence: string }>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setHistory((prev) => [...prev, `> ${input}`]);

    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({ sentiment: "Positive", confidence: "98%" });
      setHistory((prev) => [...prev, `{ "Sentiment": "Positive", "Confidence": "98%" }`]);
      setInput("");
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const demoSentences = [
    "The product exceeded my expectations!",
    "Service was slow and unprofessional.",
    "An average experience overall.",
  ];

  return (
    <section
      id="ai-playground"
      ref={ref}
      className="relative py-32 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">
          — Interactive Demo
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          AI <span className="text-neon">Playground</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-foreground/[0.02] backdrop-blur-xl"
        style={{
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--primary) 8%, transparent), 0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-3 border-b border-foreground/10 px-6 py-4">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-4">
            <Terminal className="h-3.5 w-3.5" />
            <span>sentiment-analysis ~ bash</span>
          </div>
          <motion.div
            className="ml-auto flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="h-3 w-3 text-neon" />
            <span className="text-neon">Live</span>
          </motion.div>
        </div>

        {/* Terminal body */}
        <div className="p-6 md:p-8 min-h-[300px] flex flex-col">
          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 space-y-1"
          >
            <p className="text-xs text-muted-foreground font-mono">
              $ sentiment-analyzer --version v1.0.0
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              $ model: transformer-based-nlp
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              $ status: <span className="text-neon">ready</span>
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Type a sentence to analyze sentiment...
            </p>
          </motion.div>

          {/* History */}
          <AnimatePresence>
            {history.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2 font-mono text-sm"
              >
                {line.startsWith(">") ? (
                  <span className="text-primary/80">{line}</span>
                ) : (
                  <span className="text-neon">{line}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading state */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-3 mb-4 font-mono text-sm text-muted-foreground"
              >
                <Loader2 className="h-4 w-4 animate-spin text-neon" />
                <span>Analyzing sentiment vectors...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mb-6 rounded-xl border border-primary/30 bg-primary/10 p-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-neon" />
                  <span className="text-xs uppercase tracking-wider text-neon font-medium">
                    Analysis Complete
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-background/50 p-4 border border-foreground/10">
                    <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
                    <p className="text-xl font-bold text-neon">{result.sentiment}</p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4 border border-foreground/10">
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <p className="text-xl font-bold text-neon">{result.confidence}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer to push input down */}
          <div className="flex-1 min-h-[40px]" />

          {/* Input area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-end gap-3"
          >
            <div className="relative flex-1">
              <ChevronRight className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a sentence to analyze sentiment..."
                className="w-full rounded-xl border border-foreground/15 bg-background/60 py-3.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 font-mono"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !input.trim()}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_-5px_var(--primary)] disabled:opacity-40 disabled:hover:shadow-none"
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Analyze</span>
            </motion.button>
          </motion.div>

          {/* Quick suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            <span className="text-xs text-muted-foreground">Try:</span>
            {demoSentences.map((sentence) => (
              <button
                key={sentence}
                onClick={() => setInput(sentence)}
                className="rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-neon"
              >
                {sentence}
              </button>
            ))}
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 text-center text-xs text-muted-foreground/60"
          >
            Production version connects to Spring Boot backends and LLM APIs.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
