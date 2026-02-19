const { chromium } = require("playwright");

const URL = "https://play-detonaralph.netlify.app/";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });

  console.log("Bot rodando: clicando só no inimigo...");

  while (true) {
    // clica em TODAS as squares que estiverem com class "enemy"
    const enemySquares = await page.$$(".square.enemy");

    for (const sq of enemySquares) {
      await sq.click({ force: true });
    }

    await page.waitForTimeout(10);
  }
}

main().catch(console.error);
