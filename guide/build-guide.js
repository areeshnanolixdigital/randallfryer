/**
 * Build the lead-magnet PDF from its HTML source.
 *
 *   node guide/build-guide.js
 *
 * Renders guide/looking-ahead-house-district-28.html with Chromium and writes
 * public/looking-ahead-house-district-28.pdf.
 *
 * Chromium converts every <a href> into a real PDF link annotation, so the URLs
 * on the closing page are clickable in the finished guide. The previous PDF was
 * printed from a source whose URLs were plain text, which is why it shipped with
 * zero /Link annotations.
 *
 * Requires playwright, which lives in .claude/skills/playwright-skill.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(__dirname, 'looking-ahead-house-district-28.html');
const OUT = path.join(ROOT, 'public', 'looking-ahead-house-district-28.pdf');

(async () => {
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch {
    ({ chromium } = require(path.join(ROOT, '.claude/skills/playwright-skill/node_modules/playwright')));
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('file:///' + SRC.replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 90000 });
  // Webfonts and the cover photo must be decoded before the print snapshot.
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))
    );
  });
  await page.waitForTimeout(600);

  await page.pdf({
    path: OUT,
    width: '8.5in',
    height: '11in',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });

  await browser.close();

  // Report what actually landed in the file.
  const buf = fs.readFileSync(OUT, 'latin1');
  const count = (re) => (buf.match(re) || []).length;
  console.log('wrote', path.relative(ROOT, OUT), '·', Math.round(fs.statSync(OUT).size / 1024) + 'KB');
  console.log('  pages          :', count(/\/Type\s*\/Page[^s]/g));
  console.log('  link annots    :', count(/\/Subtype\s*\/Link/g));
  console.log('  URI actions    :', count(/\/URI/g));
})();
