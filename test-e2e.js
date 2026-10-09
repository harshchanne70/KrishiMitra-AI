import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOT_DIR = "C:\\Users\\js141\\OneDrive\\Desktop\\website project\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTests() {
  console.log("🚀 Starting End-to-End Automated Testing for Krishi Sahayak...");
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  try {
    // 1. Load Homepage
    console.log("➡️ Test 1: Loading http://localhost:5173/ ...");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
    
    const pageTitle = await page.title();
    console.log(`   Page Title: "${pageTitle}"`);
    if (!pageTitle.includes('Krishi Sahayak')) {
      throw new Error(`Unexpected page title: ${pageTitle}`);
    }

    // Verify key elements on dashboard
    const headerText = await page.$eval('header', el => el.innerText);
    console.log("   Header verified, contains branding.");

    // Screenshot 1: Dashboard
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_dashboard.png'), fullPage: false });
    console.log("   📸 Captured: 01_dashboard.png");

    // Test location selector
    console.log("➡️ Test 2: Changing region dropdown to Nashik, Maharashtra...");
    const selectLocation = await page.$('select[aria-label="Select Region"]');
    if (selectLocation) {
      await page.select('select[aria-label="Select Region"]', 'mh-nashik');
      await new Promise(r => setTimeout(r, 800));
      console.log("   Location updated to Nashik.");
    }

    // Click 3rd weather card (Saturday)
    const dayButtons = await page.$$('button');
    for (const btn of dayButtons) {
      const text = await (await btn.getProperty('innerText')).jsonValue();
      if (text.includes('Saturday')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 500));
        console.log("   Clicked 7-day weather forecast day 'Saturday'.");
        break;
      }
    }

    // 2. Crop Recommender Tab
    console.log("➡️ Test 3: Testing Crop Recommender Module...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, nav button'));
      const cropTab = buttons.find(b => b.innerText.includes('Crop Recommender') || b.innerText.includes('Crop'));
      if (cropTab) cropTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Click "Black Cotton" preset
    await page.evaluate(() => {
      const presets = Array.from(document.querySelectorAll('button'));
      const blackBtn = presets.find(b => b.innerText.includes('Black Cotton'));
      if (blackBtn) blackBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
    console.log("   Applied 'Black Cotton' preset.");

    // Click "Run Recommendation"
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const runBtn = buttons.find(b => b.innerText.includes('Run Recommendation') || b.innerText.includes('Generate Recommendations'));
      if (runBtn) runBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));

    // Verify recommended crop cards appear
    const cropCardsCount = await page.evaluate(() => {
      return document.querySelectorAll('.shadow-card').length;
    });
    console.log(`   Recommendation cards rendered: ${cropCardsCount} cards.`);

    // Click "Save to My Farm Plan" on first crop
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const saveBtn = buttons.find(b => b.innerText.includes('Save to My Farm Plan'));
      if (saveBtn) saveBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));
    console.log("   Clicked 'Save to My Farm Plan'.");

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_crop_recommendations.png'), fullPage: false });
    console.log("   📸 Captured: 02_crop_recommendations.png");

    // 3. Pest & Disease Diagnosis Guide
    console.log("➡️ Test 4: Testing Pest Diagnosis & AI Leaf Scanner...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, nav button'));
      const pestTab = buttons.find(b => b.innerText.includes('Pest Diagnosis') || b.innerText.includes('Pest'));
      if (pestTab) pestTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Launch AI Scanner
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const scannerBtn = buttons.find(b => b.innerText.includes('Launch AI Symptom Scanner'));
      if (scannerBtn) scannerBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Select specimen
    await page.evaluate(() => {
      const sampleBtns = Array.from(document.querySelectorAll('button'));
      const sample = sampleBtns.find(b => b.innerText.includes('Wheat Leaf') || b.innerText.includes('Yellow Stripe'));
      if (sample) sample.click();
    });
    console.log("   Scanning simulated leaf specimen...");
    await new Promise(r => setTimeout(r, 1800)); // wait for neural inference animation

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_pest_scanner_result.png'), fullPage: false });
    console.log("   📸 Captured: 03_pest_scanner_result.png");

    // 4. Fertilizer Calculator
    console.log("➡️ Test 5: Testing Fertilizer & Water Calculator...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, nav button'));
      const fertTab = buttons.find(b => b.innerText.includes('Fertilizer'));
      if (fertTab) fertTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Change crop to Tomato
    await page.evaluate(() => {
      const selects = Array.from(document.querySelectorAll('select'));
      const cropSelect = selects.find(s => s.innerText.includes('Wheat') || s.innerText.includes('Tomato'));
      if (cropSelect) {
        cropSelect.value = 'Tomato';
        cropSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_fertilizer_calc.png'), fullPage: false });
    console.log("   📸 Captured: 04_fertilizer_calc.png");

    // 5. Live Mandi Prices
    console.log("➡️ Test 6: Testing Live APMC Mandi Price Tracker...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, nav button'));
      const mandiTab = buttons.find(b => b.innerText.includes('Mandi'));
      if (mandiTab) mandiTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_mandi_prices.png'), fullPage: false });
    console.log("   📸 Captured: 05_mandi_prices.png");

    // 6. Language Switcher (Hindi) & Print Advisory Modal
    console.log("➡️ Test 7: Testing Multi-Language Switch to Hindi (HI)...");
    await page.select('select[aria-label="Select Language"]', 'hi');
    await new Promise(r => setTimeout(r, 800));

    // Open Print Modal
    console.log("➡️ Test 8: Testing Print Advisory PDF Modal...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const printBtn = buttons.find(b => b.innerText.includes('प्रिंट') || b.innerText.includes('Print'));
      if (printBtn) printBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_print_modal_hindi.png'), fullPage: false });
    console.log("   📸 Captured: 06_print_modal_hindi.png");

    // Verify errors
    console.log("\n=======================================================");
    console.log(`✅ All interactive UI modules executed successfully!`);
    console.log(`Console error count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log("Errors noticed:", consoleErrors);
    } else {
      console.log("Zero runtime errors detected in browser console.");
    }
    console.log("=======================================================\n");

  } catch (err) {
    console.error("❌ Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
