"use client";

import { useState } from "react";
export default function HomePage() {
  const [password, setPassword] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password.trim(),
          authorName: authorName.trim(),
          content: content.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      window.location.href = `/success?slug=${encodeURIComponent(data.slug)}`;
    } catch {
      setError("Could not create letter. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 123, 138, 0.18), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(232, 180, 190, 0.14), transparent 45%), radial-gradient(ellipse 50% 50% at 20% 60%, rgba(201, 123, 138, 0.1), transparent 40%)",
        }}
      />
      {/* Floating petals */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-4 rounded-full opacity-60 animate-float-petal"
            style={{
              left: [10, 25, 40, 60, 75, 90, 15, 50, 85][i] + "%",
              bottom: i >= 6 ? 0 : undefined,
              top: i < 6 ? 0 : undefined,
              background: "rgba(201, 123, 138, 0.4)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              animationDelay: `${-i * 1.5}s`,
              animationDuration: `${18 + (i % 7)}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-letter-ink tracking-tight">
              Love Letter
            </h1>
            <p className="mt-2 text-letter-ink-soft font-light text-lg">
              Create a secret letter. Share the link. Only they can unlock it.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur rounded-2xl border border-pink-200/50 shadow-lg shadow-pink-900/5 p-6 md:p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="authorName"
                className="block text-sm font-medium text-letter-ink mb-1.5"
              >
                Your name
              </label>
              <input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="How you sign the letter"
                className="w-full px-4 py-3 rounded-xl border border-letter-accent/30 bg-white text-letter-ink placeholder:text-letter-ink-soft/80 focus:outline-none focus:border-letter-accent focus:ring-2 focus:ring-letter-accent/20 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-letter-ink mb-1.5"
              >
                Unlock password
              </label>
              <input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. a date or a word only they know"
                required
                className="w-full px-4 py-3 rounded-xl border border-letter-accent/30 bg-white text-letter-ink placeholder:text-letter-ink-soft/80 focus:outline-none focus:border-letter-accent focus:ring-2 focus:ring-letter-accent/20 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-letter-ink mb-1.5"
              >
                Letter content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your letter here..."
                required
                rows={12}
                className="w-full px-4 py-3 rounded-xl border border-letter-accent/30 bg-white text-letter-ink placeholder:text-letter-ink-soft/80 focus:outline-none focus:border-letter-accent focus:ring-2 focus:ring-letter-accent/20 transition-all resize-y min-h-[240px] font-serif text-lg leading-relaxed"
              />
            </div>
            {error && (
              <p className="text-sm text-letter-error italic">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-letter-accent text-white font-medium hover:bg-letter-accent/90 focus:outline-none focus:ring-2 focus:ring-letter-accent focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Creating…" : "Create your letter"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-letter-ink-soft/80">
            You’ll get a unique link to share. Only someone who knows the
            password can read the letter.
          </p>
        </div>
      </main>

    </div>
  );
}
