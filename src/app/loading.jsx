export default function Loading() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col">
      <div className="container-padded flex flex-1 flex-col justify-center py-32">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          Loading
        </span>

        <div className="mt-8 h-px w-full origin-left animate-[buildLine_1.4s_ease-in-out_infinite] bg-ink/15" />

        <div className="mt-12 grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
            <span className="block h-[clamp(2.5rem,7vw,6rem)] w-[80%] animate-pulse rounded-soft bg-ink/8" />
            <span className="block h-[clamp(2.5rem,7vw,6rem)] w-[60%] animate-pulse rounded-soft bg-ink/8" />
            <span className="mt-4 block h-4 w-[55%] animate-pulse rounded bg-ink/10" />
            <span className="block h-4 w-[40%] animate-pulse rounded bg-ink/10" />
          </div>

          <div className="col-span-12 lg:col-span-4">
            <span className="block aspect-[4/5] w-full animate-pulse rounded-card bg-ink/10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes buildLine {
          0%, 100% { transform: scaleX(0.3); opacity: 0.4 }
          50% { transform: scaleX(1); opacity: 1 }
        }
      `}</style>
    </main>
  );
}
