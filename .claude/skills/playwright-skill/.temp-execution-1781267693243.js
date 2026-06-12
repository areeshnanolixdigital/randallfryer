const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const CAMPAIGN_DIR = 'C:/Users/General/Documents/GitHub/capitalwatch/campaign';
const SCREENSHOT_DIR = path.join(CAMPAIGN_DIR, 'previews');

if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const feedFiles = fs.readdirSync(path.join(CAMPAIGN_DIR, 'feed'))
  .filter(f => f.endsWith('.html'))
  .sort();
const storyFiles = fs.readdirSync(path.join(CAMPAIGN_DIR, 'story'))
  .filter(f => f.endsWith('.html'))
  .sort();

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = { feed: [], story: [], errors: [] };

  for (const file of feedFiles) {
    const url = 'file:///' + path.join(CAMPAIGN_DIR, 'feed', file).replace(/\\/g, '/');
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 1180 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(900);
      const stage = page.locator('.stage').first();
      const box = await stage.boundingBox();
      const screenshot = path.join(SCREENSHOT_DIR, file.replace('.html', '.png'));
      await stage.screenshot({ path: screenshot });
      results.feed.push({ file, w: Math.round(box?.width), h: Math.round(box?.height) });
      if (errs.length) results.errors.push({ file, errs });
    } catch (e) {
      results.errors.push({ file, err: e.message });
    } finally {
      await ctx.close();
    }
  }

  for (const file of storyFiles) {
    const url = 'file:///' + path.join(CAMPAIGN_DIR, 'story', file).replace(/\\/g, '/');
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 2020 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(900);
      const stage = page.locator('.stage').first();
      const box = await stage.boundingBox();
      const screenshot = path.join(SCREENSHOT_DIR, file.replace('.html', '.png'));
      await stage.screenshot({ path: screenshot });
      results.story.push({ file, w: Math.round(box?.width), h: Math.round(box?.height) });
      if (errs.length) results.errors.push({ file, errs });
    } catch (e) {
      results.errors.push({ file, err: e.message });
    } finally {
      await ctx.close();
    }
  }

  console.log('FEED RESULTS:');
  results.feed.forEach(r => console.log(`  ${r.file} -> ${r.w}x${r.h}`));
  console.log('\nSTORY RESULTS:');
  results.story.forEach(r => console.log(`  ${r.file} -> ${r.w}x${r.h}`));
  console.log('\nERRORS:');
  if (results.errors.length === 0) console.log('  none');
  else results.errors.forEach(e => console.log('  ', JSON.stringify(e)));

  await browser.close();
})();
