# KrishiMitra AI — System Architecture & Minor Project Report

**Product Name:** KrishiMitra AI  
**Tagline:** "सही सलाह, बेहतर खेती" (Better Farming Through Better Advice)  
**Project Category:** Agricultural Technology (AgriTech) & Artificial Intelligence Minor Project  
**Target Beneficiaries:** Indian Farmers (Hindi, Marathi, English)  

---

## 1. Problem Statement
Indian small and marginal landholders face severe agricultural risks due to unseasonal climate variability, lack of personalized soil-specific advisory, unscientific fertilizer overuse, and delayed pest/disease intervention. Existing government and corporate portals often present cluttered, complex interfaces predominantly in English, leading to cognitive overload and low adoption among non-technical farmers.

## 2. Project Objectives
1. **Accessible, Multi-Lingual Interface**: Design a mobile-first, distraction-free web portal in Hindi, Marathi, and English using clear agricultural iconography and Devanagari typography.
2. **Step-by-Step Guided Workflow**: Break down complex agronomic calculations across 12 navigable, digestible screens with draft state persistence.
3. **Scientific & Explainable Suitability Engine**: Deliver transparent crop suitability scores based on verified soil types, agro-seasons, water availability, and soil pH.
4. **Agromet Weather & Irrigation Intelligence**: Sync localized 5-day weather forecasts to generate crop- and stage-aware irrigation schedules, automatically advising farmers to postpone irrigation when heavy rainfall is forecasted.
5. **Foliage Health & Pest Diagnosis**: Provide on-device and backend leaf diagnosis protocols rooted in verified ICAR compendiums with transparent demo mode disclosures.
6. **Mandi & Scheme Integration**: Offer live wholesale market prices (AGMARKNET format) and direct links to official schemes (PM-KISAN, PMFBY, Soil Health Card, KCC).

---

## 3. System Architecture

```
                       ┌──────────────────────────────────────────────┐
                       │          React + TypeScript Frontend         │
                       │     (Vite, Tailwind CSS, React Router)       │
                       └──────────────────────┬───────────────────────┘
                                              │ HTTP JSON REST API
                                              ▼
                       ┌──────────────────────────────────────────────┐
                       │            FastAPI Python Backend            │
                       │   (Pydantic V2, SQLAlchemy, JWT Security)    │
                       └──────┬───────────────┬──────────────────────┬┘
                              │               │                      │
             ┌────────────────▼──┐    ┌───────▼──────────┐   ┌───────▼──────────────┐
             │ SQLite / Postgres │    │  Agromet Engine  │   │  Agronomy Knowledge  │
             │ Persistent Storage│    │ (Open-Meteo Live │   │     Base (ICAR,      │
             │ (Profiles, Farms, │    │    & Fallback)   │   │     SAUs, DPPQ&S)    │
             │   Advisories)     │    └──────────────────┘   └──────────────────────┘
             └───────────────────┘
```

---

## 4. Technology Stack

| Layer | Technologies Selected | Justification |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, React Router v7, Lucide Icons | Ultra-fast HMR, strict type safety, accessible contrast, responsive for Android smartphones. |
| **Backend** | Python 3.14, FastAPI, Pydantic V2, Uvicorn, Requests / HTTPX | Asynchronous high-performance REST endpoints, automatic OpenAPI documentation, strict payload validation. |
| **Database** | SQLAlchemy 2.0 ORM with SQLite (Development) / PostgreSQL (Production) | Clean persistence with relational models for users, profiles, farms, sessions, and alerts. |
| **External APIs** | Open-Meteo Agromet API, AGMARKNET Data Schemas, ICAR Guidelines | Keyless live weather synchronization with transparent offline fallbacks. |
| **Testing** | Pytest, FastAPI TestClient, Puppeteer Core (Headless Chromium E2E) | Automated unit testing and full-workflow end-to-end browser verification. |

---

## 5. Database Schema

### Table: `users`
- `id` (VARCHAR(36), PK): UUID
- `phone` (VARCHAR(20), UNIQUE): Farmer 10-digit mobile
- `email` (VARCHAR(100), UNIQUE): Optional email
- `full_name` (VARCHAR(100)): Name
- `hashed_password` (VARCHAR(255)): Bcrypt hash
- `role` (VARCHAR(20)): 'farmer' or 'admin'
- `is_active` (BOOLEAN): Status flag
- `created_at` (DATETIME): Timestamp

### Table: `farmer_profiles`
- `id` (VARCHAR(36), PK): UUID
- `user_id` (VARCHAR(36), FK -> users.id)
- `farmer_name` (VARCHAR(100))
- `phone` (VARCHAR(20))
- `state` (VARCHAR(100))
- `district` (VARCHAR(100))
- `village` (VARCHAR(100))
- `preferred_lang` (VARCHAR(10)): 'hi' | 'mr' | 'en'
- `total_land` (FLOAT): Landholding size
- `land_unit` (VARCHAR(20)): 'acre' | 'hectare'

### Table: `farms`
- `id` (VARCHAR(36), PK): UUID
- `profile_id` (VARCHAR(36), FK -> farmer_profiles.id)
- `soil_type` (VARCHAR(50)): 'black' | 'clay' | 'alluvial' | 'red' | 'laterite' | 'sandy'
- `ph` (FLOAT): Soil pH (3.0 - 10.0)
- `water_source` (VARCHAR(50)): 'borewell' | 'well' | 'canal' | 'rain'
- `water_availability` (VARCHAR(20)): 'low' | 'medium' | 'high'
- `irrigation_method` (VARCHAR(50)): 'drip' | 'furrow' | 'sprinkler' | 'flood'
- `current_season` (VARCHAR(20)): 'kharif' | 'rabi' | 'zaid'

### Table: `advisory_sessions`
- `id` (VARCHAR(36), PK): UUID
- `user_id` (VARCHAR(36), FK)
- `crop_id` (VARCHAR(50)): e.g. 'soybean', 'cotton'
- `crop_name` (VARCHAR(100))
- `growth_stage` (VARCHAR(50))
- `sowing_date` (VARCHAR(50))
- `allocated_area` (FLOAT)
- `suitability_score` (FLOAT)
- `farm_snapshot` (JSON): Complete serialized farm profile
- `weather_snapshot` (JSON): Weather conditions snapshot
- `irrigation_plan` (JSON): Interval, volume, method
- `advisory_output` (JSON): Multi-card agronomic recommendations
- `created_at` (DATETIME): Indexed timestamp

---

## 6. Multi-Screen Step-by-Step Workflow

```
[Screen 1: Welcome & Language]
           │
           ▼
[Screen 2: Farmer & Location Info]
           │
           ▼
[Screen 3: Farm & Soil Details] ──── (Visual soil selection & pH)
           │
           ▼
[Screen 4: Crop Selection] ───────── (10+ Indian crops, varieties, growth stages)
           │
           ▼
[Screen 5: Crop Suitability] ─────── (Explainable rule-based scoring: 0-100%)
           │
           ▼
[Screen 6: Agromet Weather] ──────── (Live Open-Meteo 5-day forecast)
           │
           ▼
[Screen 7: Irrigation Guidance] ──── (FAO-56 derived intervals & rain alerts)
           │
           ▼
[Screen 8: Leaf Photo Upload] ────── (Optional camera capture, preview, replace)
           │
           ▼
[Screen 9: Disease Diagnosis] ────── (Verified ICAR symptoms, organic care, KVK contact)
           │
           ▼
[Screen 10: Personalized Advisory] ─ (Multi-card summary, Print/PDF, Save)
           │
           ▼
[Screen 11: Advisory History] ────── (Persistent session logs & deletion)
           │
           ▼
[Screen 12: Farmer Dashboard] ────── (Quick action central & farm overview)
```

---

## 7. Automated Testing Summary

### Backend Unit & Integration Tests (Pytest)
- **Total Tests Run**: 7
- **Passed**: 7 (100% Pass Rate)
- **Verified Endpoints**:
  1. `/` and `/api/health` — OK
  2. `/api/crops/catalog` — Returns all 10 Indian crops
  3. `/api/crops/suitability` — Validates explainable rule calculation
  4. `/api/weather/forecast` — Returns live/demo 5-day forecast
  5. `/api/advisory/generate`, `/api/advisory/history`, `/api/advisory/{id}` — Full session lifecycle verified
  6. `/api/market/prices` & `/api/schemes/list` — OK
  7. `/api/auth/guest` — Immediate zero-friction evaluator token issued

### Frontend End-to-End Tests (Puppeteer & Headless Chrome)
- **Total Scenarios Verified**: 16 Pages & Workflows
- **Passed**: 16 (0 console errors)
- **Captured Artifacts**: Screenshots stored in `screenshots/km_01_welcome.png` to `km_16_admin.png`

---

## 8. Known Limitations & Future Scope

### Current Limitations
1. **On-Device Disease Inference**: Uses an agronomic heuristic classifier with transparent demo labeling. Real-time edge inference requires fine-tuned MobileNet models connected via `DISEASE_MODEL_API_URL`.
2. **Weather API Key Dependence**: Open-Meteo public endpoints have generous rate limits; enterprise deployment should configure dedicated IMD or OpenWeather API keys in `.env`.

### Future Scope
1. **Offline PWA & Service Workers**: Enable full offline voice synthesis in Marathi and Hindi without active internet.
2. **Satellite NDVI Crop Health Index**: Integrate Copernicus Sentinel-2 satellite imagery for remote canopy vigour tracking.
3. **IoT Soil Sensor Integration**: Connect LoRaWAN soil moisture probes directly into the `/api/advisory` pipeline.
