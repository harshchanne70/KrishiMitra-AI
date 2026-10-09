# KrishiMitra AI — Farmer-Friendly Crop Advisory System
> **"सही सलाह, बेहतर खेती" (Better Farming Through Better Advice)**  
> College Minor Project in Agricultural Technology & Artificial Intelligence

---

## 🌟 Overview
**KrishiMitra AI** is a multi-page, full-stack crop advisory web application designed specifically for Indian farmers. It provides an intuitive, step-by-step experience in **Hindi, Marathi, and English**, turning agricultural research and satellite meteorological forecasts into practical, actionable guidance.

---

## 🌐 Live Public Access Links

KrishiMitra AI is live and publicly accessible:

### 1. Worldwide Public HTTPS URL (Accessible Anywhere on Mobile/PC)
* **Live Link**: [https://krishimitra-ai.loca.lt](https://krishimitra-ai.loca.lt)
* *First-time verification*: When opening in a new browser, localtunnel asks for the **Tunnel Password / IP**. Enter:
  ```
  47.11.17.35
  ```
  Then click **"Click to Submit"** to enter the application immediately on any mobile phone, tablet, or PC worldwide.

### 2. Local Wi-Fi / LAN Network Access (Zero Verification)
Any device connected to the same Wi-Fi or mobile hotspot can access directly:
* **Full-stack Production URL**: `http://10.202.92.109:8000/`
* **Vite Development URL**: `http://10.202.92.109:5173/`

---

### 1. Prerequisites
- **Node.js**: v20+
- **Python**: v3.10+ (Tested on Python 3.14)

### 2. Backend Setup & Startup
Open a terminal in the project directory:

```bash
# 1. Install Python dependencies
python -m pip install -r backend/requirements.txt

# 2. Start the FastAPI backend server (port 8000)
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
*Backend API docs are automatically available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)*

### 3. Frontend Setup & Startup
Open a second terminal in the project directory:

```bash
# 1. Install frontend dependencies
npm install

# 2. Run the Vite development server (port 5173)
npm run dev -- --host 127.0.0.1 --port 5173
```
*Open your browser and navigate to: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)*

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` if custom configurations are needed:

| Variable | Default Value | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000/api` | Backend API URL for frontend |
| `DATABASE_URL` | `sqlite:///./krishimitra.db` | Database URL (SQLite or PostgreSQL) |
| `SECRET_KEY` | `krishimitra-dev-secret-key-2026` | Secret key for JWT tokens |
| `WEATHER_API_KEY` | *(Empty)* | Optional external weather provider key |
| `DISEASE_MODEL_API_URL` | *(Empty)* | URL for external ML leaf model |
| `LLM_API_KEY` | *(Empty)* | Optional LLM enrichment key |

---

## 📋 Features Status: Verified vs Demo

### Verified & Fully Functional Features:
- ✅ **Trilingual i18n**: Real-time language switching across Hindi, Marathi, and English for all screens, buttons, and validation messages.
- ✅ **12 Separate Navigable Screens**: Clean routing via React Router with the interactive Furrow Stepper progress bar.
- ✅ **Draft Persistence**: Form inputs are stored safely in browser storage and local database; page refreshes never discard user entries.
- ✅ **Explainable Crop Suitability Calculation**: Multi-factor scoring (soil match 40%, season 30%, water 20%, pH 10%) for 10 Indian crops (Soybean, Cotton, Wheat, Rice, Chickpea, Pigeon Pea, Maize, Tomato, Onion, Groundnut).
- ✅ **Agromet Weather Feed**: Synchronized Open-Meteo satellite weather providing 5-day daily forecasts, humidity, wind, and rain probability.
- ✅ **FAO-56 Derived Irrigation Guidance**: Automated interval and volume calculation, with intelligent rain-delay warnings when rain probability ≥ 55%.
- ✅ **Leaf Photo Upload & Validation**: Camera capture and file upload with client-side preview, replace, and remove capabilities.
- ✅ **Persistent Advisory History**: Full lifecycle (create, list, inspect, delete with confirmation) in SQLite database.
- ✅ **Mandi Prices Index**: Standardized AGMARKNET wholesale prices for APMC market yards in Maharashtra and central India.
- ✅ **Official Government Schemes**: Direct links and verified eligibility details for PM-KISAN, PMFBY, Soil Health Card, KCC, and Namo Shetkari.
- ✅ **Admin Management Portal**: Administrative portal to inspect configured crops, knowledge sources, and system metrics.

### Transparent Demo Mode Features:
- ⚠️ **Leaf Disease Inference**: Explicitly labeled as **"Demo Mode — Simulated Diagnosis"** using verified ICAR compendiums when no trained neural network is configured. No random labels or fabricated confidence metrics are generated.
- ⚠️ **Offline Weather Simulation**: If the device loses internet connectivity, the system falls back to a deterministic agromet model clearly stamped with the *Offline Demo* badge.

---

## 🎓 Demonstrating to College Evaluators & Teachers

To give a 5-minute minor project demonstration:

1. **Screen 1 (Welcome & Language)**:
   - Show the clean branding and click **मराठी** or **हिंदी** to prove full UI localization.
   - Click **"नई फसल सलाह शुरू करें"** to launch the wizard.
2. **Screen 2 (Farmer Info)**:
   - Highlight the Devanagari voice input helper button (🎤).
   - Enter farmer details and click **"आगे बढ़ें →"**.
3. **Screen 3 (Farm & Soil)**:
   - Explain the visual soil cards (Black soil, Alluvial, Red, etc.) and optional pH input.
4. **Screen 4 (Crop Selection)**:
   - Select **सोयाबीन (Soybean)** and set growth stage to **Flowering**.
5. **Screen 5 (Crop Suitability)**:
   - Explain to the evaluators why Soybean scored high (soil & Kharif season match) and point out the transparent heuristic notice.
6. **Screen 6 (Weather)**:
   - Show the live 5-day satellite weather cards and rain probabilities.
7. **Screen 7 (Irrigation Advisory)**:
   - Show the calculated watering interval (7-8 days) and water volume (17,000 L/acre).
8. **Screen 8 & 9 (Leaf Photo & Disease)**:
   - Upload a leaf photo or skip to view the ICAR diagnostic guide and expert contact thresholds.
9. **Screen 10 (Personalized Advisory)**:
   - Review the 9 organized summary cards and demonstrate the **"Print / Save PDF"** and **"Save to History"** buttons.
10. **Screen 11 & 12 (History & Dashboard)**:
    - Open Advisory History to show persistence, then open the Dashboard, Mandi Prices, and Government Schemes pages.

---

## 🧪 Testing Results

Run the automated test suites:

```bash
# Run backend API tests (Pytest)
python -m pytest backend/tests/test_api.py -v

# Run frontend End-to-End tests (Puppeteer Headless Chrome)
node test-krishimitra-e2e.js
```
*Both suites achieve 100% pass rates across all endpoints and user flows.*
