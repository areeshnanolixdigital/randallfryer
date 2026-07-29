
const { chromium, firefox, webkit, devices } = require('playwright');
const helpers = require('./lib/helpers');

// Extra headers from environment variables (if configured)
const __extraHeaders = helpers.getExtraHeadersFromEnv();

/**
 * Utility to merge environment headers into context options.
 * Use when creating contexts with raw Playwright API instead of helpers.createContext().
 * @param {Object} options - Context options
 * @returns {Object} Options with extraHTTPHeaders merged in
 */
function getContextOptionsWithHeaders(options = {}) {
  if (!__extraHeaders) return options;
  return {
    ...options,
    extraHTTPHeaders: {
      ...__extraHeaders,
      ...(options.extraHTTPHeaders || {})
    }
  };
}

(async () => {
  try {
    
const OUT='C:/Users/Dev/AppData/Local/Temp/claude/C--Users-Dev-Documents-GitHub-randallfryer/ce5a2644-3719-4cae-99d2-dae9c242183d/scratchpad';
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ bypassCSP:true });
await ctx.route('**/posters/**', r=>r.continue({ headers: { ...r.request().headers(), 'cache-control':'no-cache' } }));
const p = await ctx.newPage();
await p.setViewportSize({ width: 1600, height: 1100 });
await p.goto('http://localhost:3000/social-media-posts', { waitUntil:'networkidle', timeout:90000 });
const d = p.locator('button:has-text("DECLINE"), button:has-text("Decline")').first();
if (await d.count()) { await d.click(); await p.waitForTimeout(400); }
await p.locator('#gallery button[aria-pressed]', { hasText:'Story' }).first().click();
await p.waitForTimeout(1500);
for(let y=0;y<1600;y+=400){await p.mouse.wheel(0,400);await p.waitForTimeout(250);}
await p.waitForTimeout(1800);
await p.locator('#gallery').scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
const bb=await p.locator('#gallery').boundingBox();
await p.screenshot({path:OUT+'/stories-fixed.png',clip:{x:0,y:Math.max(0,bb.y+40),width:1600,height:820}});
console.log('saved');
await b.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
