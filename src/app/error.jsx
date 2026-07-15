"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[RootErrorBoundary]:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-1 flex-col">
      <div className="container-padded flex flex-1 flex-col justify-center py-32">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          Error · Something broke
        </span>

        <div className="hairline mt-6 h-px w-full" />

        <h1 className="display-serif mt-12 max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          We hit a snag.
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink/80">
          Something on this page failed to load. The team has been
          notified. You can try again, or head back to the home page.
        </p>

        {error?.digest && (
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            Ref · {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button as="button" type="button" onClick={reset} variant="primary" withArrow>
            Try again
          </Button>
          <Button as={Link} href="/" variant="outline" withArrow>
            Back to home
          </Button>
        </div>
      </div>
    </main>
  );
}
