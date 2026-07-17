const { chromium } = require("playwright");

const TARGET_URL = "http://localhost:3000";
const OUT = "C:/Users/ibad5/AppData/Local/Temp/claude/d--Github-randallfryer/df944866-0889-418a-b15b-be0913cc29a2/scratchpad";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${TARGET_URL}/social-media-posts`, { waitUntil: "networkidle", timeout: 30000 });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.getElementById("feed").scrollIntoView();
    window.scrollBy(0, 200);
  });
  await page.waitForTimeout(2000);

  const card = page.locator("#feed article").nth(1);
  await card.hover();
  await page.waitForTimeout(800);
  const cursor = await card.evaluate((el) => getComputedStyle(el).cursor);
  console.log("cursor on card:", cursor);
  await page.screenshot({ path: `${OUT}/card-hover.png` });
  console.log("card-hover.png saved");

  await browser.close();
})();
