"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hasMyanmarScript } from "@/lib/myanmar";

const TYPEWRITER_SPEED = 35;

type Props = {
  slug: string;
  authorName: string;
};

export default function LetterViewer({ slug, authorName }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [content, setContent] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const letterContentRef = useRef<HTMLDivElement>(null);

  const useMyanmarFont = useMemo(() => hasMyanmarScript(content), [content]);

  const unlock = useCallback(async () => {
    setError("");
    const res = await fetch(`/api/letters/${slug}/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password.trim() }),
    });
    const data = await res.json();
    if (!data.success) {
      setError("Not quite... try again, love.");
      return;
    }
    setUnlocked(true);
    setContent(data.content ?? "");
    setLetterVisible(true);
    setTimeout(() => setShowLetter(true), 400);
  }, [slug, password]);

  const lockAgain = useCallback(() => {
    setShowLetter(false);
    setLetterVisible(false);
    setContent("");
    setShowClose(false);
    setUnlocked(false);
    setPassword("");
    setError("");
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!showLetter || !letterContentRef.current || content === "") {
      if (showLetter && letterContentRef.current && content === "") {
        setShowClose(true);
      }
      return;
    }
    const el = letterContentRef.current;
    el.innerHTML = "";
    const typed = document.createElement("span");
    typed.className = "typed";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.setAttribute("aria-hidden", "true");
    el.appendChild(typed);
    el.appendChild(cursor);
    let i = 0;
    function typeChar() {
      if (i < content.length) {
        typed.textContent += content[i];
        i++;
        setTimeout(typeChar, TYPEWRITER_SPEED);
      } else {
        cursor.remove();
        setShowClose(true);
      }
    }
    typeChar();
  }, [showLetter, content]);

  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 123, 138, 0.18), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(232, 180, 190, 0.14), transparent 45%), radial-gradient(ellipse 50% 50% at 20% 60%, rgba(201, 123, 138, 0.1), transparent 40%)",
        }}
      />
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-4 rounded-full opacity-60 animate-float-petal"
            style={{
              left: [10, 25, 40, 60, 75, 90, 15, 50, 85][i] + "%",
              bottom: i >= 6 ? 0 : undefined,
              top: i < 6 ? 0 : undefined,
              background: "var(--letter-petal)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              animationDelay: `${-i * 1.5}s`,
              animationDuration: `${18 + (i % 7)}s`,
            }}
          />
        ))}
      </div>

      <main
        ref={mainRef}
        className={`relative z-10 flex flex-col items-center min-h-screen px-6 py-8 transition-[justify-content] duration-300 ${
          letterVisible ? "justify-start pt-8" : "justify-center"
        }`}
      >
        {/* Gatekeeper */}
        <section
          className={`text-center transition-opacity duration-500 ${
            unlocked ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-letter-ink tracking-wide mb-1">
            For You Only ❤️
          </h1>
          {authorName && (
            <p className="text-letter-ink-soft text-sm mb-4">
              A letter from {authorName}
            </p>
          )}
          <p className="text-letter-ink-soft font-light text-sm mb-6">
            Unlock with the password they shared with you
          </p>
          <div className="max-w-xs mx-auto mb-2">
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              placeholder="Enter our special date..."
              className="w-full px-4 py-3 rounded-xl border border-letter-accent/35 bg-white/90 text-letter-ink placeholder:text-letter-ink-soft/80 focus:outline-none focus:border-letter-accent focus:ring-2 focus:ring-letter-accent/20 transition-all"
              aria-label="Password"
            />
          </div>
          <p className="min-h-[1.4em] text-sm text-letter-error italic mt-2">
            {error}
          </p>
          <p className="text-letter-ink-soft/70 text-xs mt-4">
            e.g. a word or date only you know
          </p>
          <button
            type="button"
            onClick={unlock}
            className="mt-6 px-6 py-2.5 rounded-xl bg-letter-accent text-white font-medium hover:bg-letter-accent/90 focus:outline-none focus:ring-2 focus:ring-letter-accent focus:ring-offset-2 transition-all"
          >
            Unlock letter
          </button>
        </section>

        {/* Letter */}
        <article
          className={`w-full max-w-2xl transition-opacity duration-500 ${
            showLetter
              ? "opacity-100 flex flex-col items-center order-first"
              : "hidden"
          }`}
        >
          <div className="letter-paper w-full rounded border border-letter-accent/20 min-h-[280px] relative overflow-hidden">
            <div
              className={`letter-content font-serif text-lg md:text-xl leading-relaxed text-letter-ink relative ${
                useMyanmarFont ? "font-myanmar" : ""
              }`}
              ref={letterContentRef}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            />
            {showClose && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={lockAgain}
                  className="px-5 py-2.5 rounded-lg border border-letter-accent/45 text-letter-ink-soft font-medium hover:text-letter-ink hover:border-letter-accent hover:bg-letter-accent/10 transition-all"
                >
                  Close & lock letter
                </button>
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
