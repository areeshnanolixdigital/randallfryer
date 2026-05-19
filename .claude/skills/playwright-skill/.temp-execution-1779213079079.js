
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
    
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 800 });

// Dark hero (event detail) — top of page
await page.goto('http://localhost:3001/events/harborlight-town-hall', { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/cw-nav-dark-top.png', clip: { x: 0, y: 0, width: 1440, height: 90 } });
console.log('saved dark-top');

// Light hero (home) — top of page
await page.goto('http://localhost:3001/', { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/cw-nav-light-top.png', clip: { x: 0, y: 0, width: 1440, height: 90 } });
console.log('saved light-top');

// Dark hero — scrolled (solid navbar)
await page.goto('http://localhost:3001/events/harborlight-town-hall', { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 800));
await page.waitForTimeout(700);
await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/cw-nav-dark-solid.png', clip: { x: 0, y: 0, width: 1440, height: 90 } });
console.log('saved dark-solid');

await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
