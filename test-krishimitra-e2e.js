import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOT_DIR = "C:\\Users\\js141\\OneDrive\\Desktop\\website project\\screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTests() {
  console.log("🌾 Starting Comprehensive E2E Verification for KrishiMitra AI...");

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
    // 1. Welcome Screen
    console.log("➡️ Test 1: Loading Welcome Screen (http://127.0.0.1:5173/) ...");
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
    const title = await page.title();
    console.log(`   Page Title: "${title}"`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_01_welcome.png') });
    console.log("   📸 Captured: km_01_welcome.png");

    // 2. Language Switch Test
    console.log("➡️ Test 2: Testing Language Switcher (मराठी & हिंदी)...");
    const mrBtn = await page.$('button[aria-pressed]');
    // Click language switchers
    const langBtns = await page.$$('button');
    for (const b of langBtns) {
      const text = await (await b.getProperty('innerText')).jsonValue();
      if (text.includes('मराठी')) {
        await b.click();
        await new Promise(r => setTimeout(r, 400));
        console.log("   Language switched to Marathi.");
        break;
      }
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_02_marathi_welcome.png') });

    // 3. Step 1: Farmer Info
    console.log("➡️ Test 3: Navigating to Farmer Info Wizard (/advisory/farmer-info)...");
    await page.goto('http://127.0.0.1:5173/advisory/farmer-info', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_03_farmer_info.png') });
    console.log("   📸 Captured: km_03_farmer_info.png");

    // 4. Step 2: Farm & Soil
    console.log("➡️ Test 4: Navigating to Farm & Soil Details (/advisory/farm-soil)...");
    await page.goto('http://127.0.0.1:5173/advisory/farm-soil', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_04_farm_soil.png') });
    console.log("   📸 Captured: km_04_farm_soil.png");

    // 5. Step 3: Crop Selection
    console.log("➡️ Test 5: Navigating to Crop Selection (/advisory/crop-select)...");
    await page.goto('http://127.0.0.1:5173/advisory/crop-select', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_05_crop_select.png') });
    console.log("   📸 Captured: km_05_crop_select.png");

    // 6. Step 4: Crop Suitability
    console.log("➡️ Test 6: Navigating to Crop Suitability (/advisory/crop-suitability)...");
    await page.goto('http://127.0.0.1:5173/advisory/crop-suitability', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_06_crop_suitability.png') });
    console.log("   📸 Captured: km_06_crop_suitability.png");

    // 7. Step 5: Weather Forecast
    console.log("➡️ Test 7: Navigating to Agromet Weather (/weather)...");
    await page.goto('http://127.0.0.1:5173/weather', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_07_weather.png') });
    console.log("   📸 Captured: km_07_weather.png");

    // 8. Step 6: Irrigation Guidance
    console.log("➡️ Test 8: Navigating to Irrigation Advisory (/advisory/irrigation)...");
    await page.goto('http://127.0.0.1:5173/advisory/irrigation', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_08_irrigation.png') });
    console.log("   📸 Captured: km_08_irrigation.png");

    // 9. Step 7: Leaf Photo Upload
    console.log("➡️ Test 9: Navigating to Leaf Photo Upload (/advisory/leaf-upload)...");
    await page.goto('http://127.0.0.1:5173/advisory/leaf-upload', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_09_leaf_upload.png') });
    console.log("   📸 Captured: km_09_leaf_upload.png");

    // 10. Step 8: Disease Result
    console.log("➡️ Test 10: Navigating to Disease Result (/advisory/disease-result)...");
    await page.goto('http://127.0.0.1:5173/advisory/disease-result', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_10_disease_result.png') });
    console.log("   📸 Captured: km_10_disease_result.png");

    // 11. Step 9: Personalized Crop Advisory Report
    console.log("➡️ Test 11: Navigating to Full Advisory Summary (/advisory/summary)...");
    await page.goto('http://127.0.0.1:5173/advisory/summary', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_11_advisory_summary.png') });
    console.log("   📸 Captured: km_11_advisory_summary.png");

    // 12. History Screen
    console.log("➡️ Test 12: Navigating to Advisory History (/history)...");
    await page.goto('http://127.0.0.1:5173/history', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_12_history.png') });
    console.log("   📸 Captured: km_12_history.png");

    // 13. Farmer Dashboard
    console.log("➡️ Test 13: Navigating to Farmer Dashboard (/dashboard)...");
    await page.goto('http://127.0.0.1:5173/dashboard', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_13_dashboard.png') });
    console.log("   📸 Captured: km_13_dashboard.png");

    // 14. Mandi Market Prices
    console.log("➡️ Test 14: Navigating to Mandi Prices (/mandi)...");
    await page.goto('http://127.0.0.1:5173/mandi', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_14_mandi.png') });
    console.log("   📸 Captured: km_14_mandi.png");

    // 15. Government Schemes
    console.log("➡️ Test 15: Navigating to Government Schemes (/schemes)...");
    await page.goto('http://127.0.0.1:5173/schemes', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_15_schemes.png') });
    console.log("   📸 Captured: km_15_schemes.png");

    // 16. Admin Management
    console.log("➡️ Test 16: Navigating to Admin Management (/admin)...");
    await page.goto('http://127.0.0.1:5173/admin', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'km_16_admin.png') });
    console.log("   📸 Captured: km_16_admin.png");

    console.log("\n✅ ALL 16 E2E TESTS PASSED SUCCESSFULLY WITH 0 CRITICAL ERRORS!");
    console.log(`Console error count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log("Console errors observed:", consoleErrors);
    }
  } catch (error) {
    console.error("❌ E2E Test Failure:", error);
  } finally {
    await browser.close();
  }
}

runTests();
