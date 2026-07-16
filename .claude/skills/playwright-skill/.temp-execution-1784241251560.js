
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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const DIR = 'C:/Users/ibad5/AppData/Local/Temp/claude/d--Github-randallfryer/722b1f7f-2b61-4404-bd36-6c5bcb1177a8/scratchpad';
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(4000);
await page.locator('h1').first().screenshot({ path: DIR + '/hero-italic-fixed.png' });
console.log('📸 saved');
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
