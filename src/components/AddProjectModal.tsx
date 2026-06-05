import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Loader2, CheckCircle2 } from "lucide-react";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddProjectModal({ open, onClose, onSuccess }: AddProjectModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setForm({ title: "", description: "", technologies: "", githubLink: "", liveLink: "" });
          onSuccess();
          onClose();
        }, 2000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card/60 p-8 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/40 p-2 text-muted-foreground hover:border-primary hover:text-neon"
            >
              <X size={16} />
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-6">Add New Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full resize-none rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  required
                  placeholder="Java, Spring Boot, React"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">GitHub Link</label>
                  <input
                    type="url"
                    value={form.githubLink}
                    onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Live / API Link</label>
                  <input
                    type="url"
                    value={form.liveLink}
                    onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                    className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              {status === "error" && (
                <p className="text-xs text-destructive bg-destructive/10 py-2 px-4 rounded-xl text-center">
                  ⚠️ Failed to add project. Check your backend connection.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground disabled:opacity-70 mt-4"
              >
                <AnimatePresence mode="wait">
                  {status === "sending" && (
                    <motion.span key="sending" className="inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Saving to Database...
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="success" className="inline-flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={16} /> Successfully Added!
                    </motion.span>
                  )}
                  {(status === "idle" || status === "error") && (
                    <motion.span key="idle" className="inline-flex items-center gap-2">
                      Save Project <Plus size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}