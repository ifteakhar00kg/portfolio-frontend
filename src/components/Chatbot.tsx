import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithIfteakarBot } from "@/lib/chat.functions";

type Msg = { role: "user" | "bot"; content: string };

const INTRO: Msg = {
  role: "bot",
  content:
    "Hey! I'm **Ifteakar's personal AI assistant**. Ask me about his contact info, GitHub, education, or tech stack.",
};


function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("- ")) {
      return (
        <div key={i} className="flex gap-2 pl-1">
          <span className="text-neon">▸</span>
          <span dangerouslySetInnerHTML={{ __html: inlineFmt(line.slice(2)) }} />
        </div>
      );
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <div key={i} dangerouslySetInnerHTML={{ __html: inlineFmt(line) }} />;
  });
}

function inlineFmt(s: string) {
  const escaped = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const linkClass =
    "text-neon underline underline-offset-2 decoration-primary/60 hover:decoration-primary break-all";

  const withUrls = escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${url}</a>`,
  );

  const withEmails = withUrls.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    (email) =>
      `<a href="mailto:${email}" class="${linkClass}">${email}</a>`,
  );

  return withEmails.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-neon font-semibold">$1</strong>',
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const askBot = useServerFn(chatWithIfteakarBot);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    // Only smooth-scroll if user is already near bottom (within 60px)
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    if (isNearBottom) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;
    const nextHistory: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextHistory);
    setInput("");
    setTyping(true);

    try {
      const payload = nextHistory
        .filter((m) => m !== INTRO)
        .map((m) => ({
          role: m.role === "bot" ? ("assistant" as const) : ("user" as const),
          content: m.content,
        }));

      const result = await askBot({ data: { messages: payload } });
      const content =
        result.reply ||
        result.error ||
        "Something went wrong. Please try again.";
      setMessages((m) => [...m, { role: "bot", content }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "bot", content: "Network error. Please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };


  return (
    <>
      {/* Floating button */}
      <motion.button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-background/80 backdrop-blur-xl"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in oklab, var(--primary) 25%, transparent), 0 10px 40px -10px color-mix(in oklab, var(--primary) 60%, transparent), inset 0 0 20px color-mix(in oklab, var(--primary) 15%, transparent)",
        }}
      >
        {/* pulsing ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-primary/50"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-neon" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="h-6 w-6 text-neon" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-primary/25 bg-background/90 backdrop-blur-2xl"
            style={{
              height: "min(560px, 75vh)",
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--primary) 15%, transparent), 0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -20px color-mix(in oklab, var(--primary) 40%, transparent)",
            }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-primary/15 px-5 py-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                <Sparkles className="h-5 w-5 text-neon" />
                <motion.span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-neon"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ boxShadow: "0 0 10px var(--primary)" }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold tracking-tight">Ifteakar's Bot</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3"
              style={{ overscrollBehavior: "contain" }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm border border-primary/40 bg-primary/15 px-4 py-2.5 text-sm text-foreground"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm border border-foreground/10 bg-foreground/[0.04] px-4 py-2.5 text-sm text-foreground/90 leading-relaxed"
                    }
                  >
                    {renderMarkdown(m.content)}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-foreground/10 bg-foreground/[0.04] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-neon"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-primary/15 p-3">
              <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-foreground/[0.03] pl-4 pr-1.5 py-1.5 focus-within:border-primary/60 transition-colors">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about contact, GitHub, education…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={send}
                  disabled={!input.trim()}
                  aria-label="Send"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-neon text-background disabled:opacity-40 transition-opacity"
                  style={{ boxShadow: "0 0 20px color-mix(in oklab, var(--primary) 60%, transparent)" }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
