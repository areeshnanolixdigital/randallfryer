
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
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3001/endorsements', { waitUntil: 'load' });
await page.waitForTimeout(1800);
// Scroll the page so the last CTA section comes into view & bottom hairline can build
const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y <= h; y += 350) { await page.evaluate(y => window.scrollTo(0,y), y); await page.waitForTimeout(120); }
// Now scroll to the footer top so we see the CTA section + the footer boundary
await page.evaluate(() => {
  const footer = document.querySelector('footer');
  if (footer) footer.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollBy(0, -500));
await page.waitForTimeout(800);
await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/cw-endorsements-cta.png' });
console.log('saved');
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
