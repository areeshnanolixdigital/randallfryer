"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * LivePreview
 * Renders a fixed-resolution HTML artboard inside a responsive box.
 *
 * Two modes:
 *   • Poster (thumbnail) — when a `poster` image is supplied and the preview is
 *     not interactive, a static <img> is shown. Grids use this so a hundred
 *     cards paint instantly. (A hundred live iframes at once overwhelms the
 *     browser compositor and the artboards fail to paint at all.)
 *   • Live — otherwise the source HTML is iframed and CSS-scaled to fit. Used
 *     for the single, full-size, interactive preview on detail pages.
 *
 *   file          Public URL of the HTML artboard
 *   poster        Public URL of a static poster image (thumbnail mode)
 *   width/height  Native pixel dimensions of the artboard (e.g. 1080×1080)
 *   interactive   When false (default), pointer events are disabled so the
 *                 parent <Link> stays clickable.
 *   className     Optional class on the outer wrapper
 */
export default function LivePreview({
  file,
  width,
  height,
  interactive = false,
  className,
  title = "Live preview",
  poster,
}) {
  const boxRef = useRef(null);
  const iframeRef = useRef(null);
  const imgRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);

  const usePoster = Boolean(poster) && !interactive;

  // Measure the container so the fixed-size artboard scales to fit (live mode).
  useEffect(() => {
    if (usePoster) return;
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setScale(w / width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, usePoster]);

  // Only keep the iframe mounted while the card is near the viewport (live mode).
  useEffect(() => {
    if (usePoster) return;
    const el = boxRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setActive(entry.isIntersecting);
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [usePoster]);

  // When the iframe is torn down, drop back to the placeholder state.
  useEffect(() => {
    if (!usePoster && !active) setLoaded(false);
  }, [active, usePoster]);

  // The iframe's `load` event can fire before React attaches its onLoad handler
  // (SSR/hydration or a cached file). Catch up on mount so the preview never
  // stays stuck behind the placeholder.
  useEffect(() => {
    if (usePoster || !active) return;
    const el = iframeRef.current;
    if (!el) return;
    const markLoaded = () => setLoaded(true);
    try {
      if (el.contentDocument?.readyState === "complete") markLoaded();
    } catch {
      /* cross-origin (shouldn't happen for same-origin artboards) */
    }
    el.addEventListener("load", markLoaded);
    return () => el.removeEventListener("load", markLoaded);
  }, [active, file, usePoster]);

  // Same catch-up for the poster <img>: a cached image can finish loading
  // before React's onLoad wires up, which would leave it faded out forever.
  useEffect(() => {
    if (!usePoster) return;
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [usePoster, poster]);

  const placeholder = !loaded && (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/70">
        <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
        Loading…
      </div>
    </div>
  );

  return (
    <div
      ref={boxRef}
      className={cn(
        "relative overflow-hidden isolate",
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {placeholder}

      {usePoster ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={poster}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      ) : (
        active && (
          <iframe
            ref={iframeRef}
            src={file}
            title={title}
            scrolling="no"
            tabIndex={interactive ? 0 : -1}
            aria-hidden={interactive ? undefined : "true"}
            onLoad={() => setLoaded(true)}
            className={cn(
              "absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-500",
              interactive ? "" : "pointer-events-none",
              loaded ? "opacity-100" : "opacity-0"
            )}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${scale || 0.0001})`,
            }}
          />
        )
      )}
    </div>
  );
}
