export default function SitePaused() {
  return (
    <main className="bg-bone flex min-h-screen w-full flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-ink-mute mb-4 text-xs tracking-[0.3em] uppercase">
        Temporarily Offline
      </p>
      <h1 className="font-display text-ink text-3xl font-medium sm:text-4xl">
        This site is paused for now
      </h1>
      <p className="text-ink-mute mt-4 max-w-md text-sm sm:text-base">
        We&apos;re not taking visitors at the moment. Please check back soon.
      </p>
    </main>
  );
}
