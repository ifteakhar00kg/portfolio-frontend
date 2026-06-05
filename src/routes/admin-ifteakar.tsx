import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Loader2, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";

export const Route = createFileRoute("/admin-ifteakar")({
  component: AdminDashboard,
});

function AdminDashboard() {
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
      const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": "ifteakar_super_secret_token_2026"
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setForm({ title: "", description: "", technologies: "", githubLink: "", liveLink: "" });
        }, 2000);
      } else {
        throw new Error(data.message || "Unauthorized or invalid configuration");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-border/60 bg-card/40 p-8 shadow-2xl backdrop-blur-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Hello, <span className="text-neon">Ifteakar</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-8">Upload a new scalable architecture to your portfolio database.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Project Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-none rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Technologies (Comma Separated)</label>
            <input
              type="text"
              required
              placeholder="Java, Spring Boot, React, PostgreSQL"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              className="w-full rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">GitHub Link</label>
              <input
                type="url"
                value={form.githubLink}
                onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                className="w-full rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Live / API Link</label>
              <input
                type="url"
                value={form.liveLink}
                onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                className="w-full rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>

          {status === "error" && (
            <p className="text-xs text-destructive bg-destructive/10 py-2 px-4 rounded-xl text-center">
              ⚠️ Connection error. Please verify your Spring Boot service or token authentication.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground disabled:opacity-70 mt-4 transition-transform hover:scale-[1.01]"
          >
            {status === "sending" && (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Persisting to DB...
              </span>
            )}
            {status === "success" && (
              <span className="inline-flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={16} /> Broadcasted Successfully!
              </span>
            )}
            {(status === "idle" || status === "error") && (
              <span className="inline-flex items-center gap-2">
                Publish Project <Plus size={14} />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}