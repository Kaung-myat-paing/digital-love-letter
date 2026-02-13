"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (slug) setFullUrl(`${window.location.origin}/letter/${slug}`);
  }, [slug]);

  const copyLink = useCallback(() => {
    if (!fullUrl) return;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullUrl]);

  if (!slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-letter-ink-soft">No letter found.</p>
        <Link
          href="/"
          className="mt-4 text-letter-accent hover:underline font-medium"
        >
          Create a letter
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 123, 138, 0.18), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(232, 180, 190, 0.14), transparent 45%)",
        }}
      />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <span className="text-5xl" role="img" aria-label="envelope">
              💌
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-letter-ink mb-2">
            Your letter is ready
          </h1>
          <p className="text-letter-ink-soft mb-8">
            Share this link. Only someone who knows the password can open it.
          </p>
          <div className="bg-white/90 rounded-xl border border-letter-accent/30 p-4 mb-6">
            <p className="text-sm text-letter-ink-soft mb-1 break-all font-mono text-left">
              {fullUrl || `.../letter/${slug}`}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              type="button"
              onClick={copyLink}
              className="flex-1 py-3.5 rounded-xl bg-letter-accent text-white font-medium hover:bg-letter-accent/90 focus:outline-none focus:ring-2 focus:ring-letter-accent focus:ring-offset-2 transition-all"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link
              href={fullUrl || `/letter/${slug}`}
              className="flex-1 py-3.5 rounded-xl bg-white border-2 border-letter-accent text-letter-accent font-medium hover:bg-letter-accent/5 focus:outline-none focus:ring-2 focus:ring-letter-accent focus:ring-offset-2 transition-all text-center"
            >
              Go to letter
            </Link>
          </div>
          <Link
            href="/"
            className="inline-block mt-2 text-letter-ink-soft hover:text-letter-accent font-medium transition-colors"
          >
            Create another letter
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-letter-ink-soft">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
