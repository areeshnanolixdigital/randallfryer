const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3003';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const trackCalls = [];
  await page.exposeFunction('__recordFbq', (args) => trackCalls.push(args));

  // Instrument fbq before page scripts run
  await page.addInitScript(() => {
    Object.defineProperty(window, 'fbq', {
      configurable: true,
      set(v) {
        const wrapped = function () {
          const args = Array.from(arguments);
          try { window.__recordFbq(args); } catch (e) {}
          return v.apply(this, arguments);
        };
        Object.assign(wrapped, v);
        Object.defineProperty(window, 'fbq', {
          value: wrapped, writable: true, configurable: true,
        });
      },
      get() { return undefined; },
    });
  });

  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.fbq === 'function');
  await page.waitForTimeout(1200);

  console.log('Initial fbq calls:', JSON.stringify(trackCalls));
  trackCalls.length = 0;

  // Try to navigate via App Router client-side link. Discover an internal link.
  const internal = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a[href]'))
      .map(el => el.getAttribute('href'))
      .find(h => h && h.startsWith('/') && !h.startsWith('//') && h !== '/');
    return a || null;
  });
  console.log('Client-side nav target:', internal);

  if (internal) {
    await page.evaluate((href) => {
      const el = Array.from(document.querySelectorAll('a[href]')).find(a => a.getAttribute('href') === href);
      el && el.click();
    }, internal);
    await page.waitForTimeout(1500);
    console.log('After SPA nav fbq calls:', JSON.stringify(trackCalls));
  }

  await browser.close();
})();
