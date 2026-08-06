/**
 * Regenerate the gallery poster thumbnails.
 *
 * The /social-media-posts grid does not iframe a hundred artboards at once —
 * it paints a static poster per card (see LivePreview). Those posters are
 * committed to the repo, so any time an artboard changes they have to be
 * re-rendered or the gallery keeps showing the previous artwork.
 *
 * Needs Playwright on the module path (`npm i -D playwright`, or run this file
 * from a directory that already resolves it and pass --root).
 *
 * Usage:
 *   npm run build && npx next start -p 3210
 *   node scripts/build-posters.mjs --base http://localhost:3210
 *
 * Options:
 *   --base <url>     server serving /public (default http://localhost:3000)
 *   --only <substr>  only rebuild artboards whose path contains <substr>
 *   --root <dir>     repo root (default: the directory above this script)
 */
import { chromium } from "playwright";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const QUALITY = 82;

const arg = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const BASE = arg("--base", "http://localhost:3000").replace(/\/$/, "");
const ONLY = arg("--only", null);
const ROOT = path.resolve(
  arg("--root", path.join(path.dirname(fileURLToPath(import.meta.url)), "..")),
);

const ARTBOARDS = path.join(ROOT, "public/social-media-posts");
const POSTERS = path.join(ARTBOARDS, "posters");

/** Every artboard under /public/social-media-posts, excluding the posters themselves. */
async function findArtboards(dir = ARTBOARDS) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (full === POSTERS) continue;
    if (entry.isDirectory()) out.push(...(await findArtboards(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const artboards = (await findArtboards())
  .map((f) => path.relative(ARTBOARDS, f).split(path.sep).join("/"))
  .filter((rel) => !ONLY || rel.includes(ONLY))
  .sort();

if (!artboards.length) {
  console.error("no artboards matched");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
const failed = [];

for (const [i, rel] of artboards.entries()) {
  const url = `${BASE}/social-media-posts/${rel}`;
  try {
    await page.setViewportSize({ width: 1080, height: 1080 });
    const res = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    if (!res || !res.ok()) throw new Error(`HTTP ${res ? res.status() : "no response"}`);

    // Artboards declare their own native size on .stage — read it, then size the
    // viewport to match so the element screenshot is 1:1 with no scaling.
    const box = await page.evaluate(() => {
      const el = document.querySelector(".stage");
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { width: Math.round(r.width), height: Math.round(r.height) };
    });
    if (!box) throw new Error("no .stage element");

    await page.setViewportSize(box);
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForLoadState("networkidle");

    const stage = await page.$(".stage");
    const shot = await stage.screenshot({ type: "jpeg", quality: QUALITY });

    const out = path.join(POSTERS, rel.replace(/\.html$/, ".jpg"));
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, shot);

    console.log(
      `${String(i + 1).padStart(3)}/${artboards.length}  ${rel.padEnd(46)} ${box.width}x${box.height}  ${(shot.length / 1024).toFixed(0)}KB`,
    );
  } catch (err) {
    failed.push({ rel, message: err.message });
    console.error(`${String(i + 1).padStart(3)}/${artboards.length}  ${rel}  FAILED — ${err.message}`);
  }
}

await browser.close();

console.log(`\n${artboards.length - failed.length}/${artboards.length} posters written`);
if (failed.length) {
  console.error("failed:", failed);
  process.exit(1);
}
