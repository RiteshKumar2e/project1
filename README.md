# 🚑 AI-Powered Rural Emergency Assistance Platform

> **A mission-critical, AI-assisted first-aid guidance and healthcare triage web platform designed specifically for rural and remote communities.**

When someone in a remote village or rural area faces a medical emergency, hospitals, doctors, and ambulances may be hours away. This platform provides **instant, safe, step-by-step first-aid guidance** and helps connect with emergency medical services as quickly as possible.

---

## 🌟 Key Features

1. **🚨 Instant Emergency Home Flow**
   - High-contrast, large touch-target interface designed for stressful situations.
   - One-tap access to **Start Emergency Help**, **Call 112**, and **Find Nearest Hospital**.
2. **🎙️ Multimodal Symptom Input (Voice + Text + Direct Selection)**
   - Voice symptom description via browser Web Speech API (English & Hindi).
   - Natural language symptom input with keyword fallbacks.
   - 1-click direct selection across 14 curated emergency categories.
3. **🤖 Structured AI Triage with Deterministic Safety Rules Engine**
   - Integrates Google Gemini 2.0 API for natural language understanding.
   - **Safety Rules Engine** strictly overrides AI for life-threatening keywords (e.g. cardiac arrest, unconsciousness, heavy bleeding, venomous bites).
   - Absolute guardrails: **No definitive diagnosis claims, no drug prescriptions, no dangerous procedures**.
4. **📋 Step-by-Step Interactive First-Aid Guidance**
   - Large text, numbered instructions, progress tracking, and emergency icons.
   - Crucial safety warnings & "Do NOTs" for every category.
   - Verified instructional videos from trusted public health authorities (Red Cross, WHO, St John Ambulance, NHS).
5. **🏥 Nearest Healthcare Facility Finder**
   - Uses OpenStreetMap (OSM) and Overpass API to query nearby District Hospitals, Community Health Centres (CHCs), and Primary Health Centres (PHCs).
   - Calculates distance, estimated travel time, provides turn-by-turn directions and direct call capability.
6. **📶 Offline-First Rural Resilience (PWA)**
   - Bundles complete offline first-aid knowledge base in the client.
   - Real-time online/offline indicator.
   - Works 100% offline for all first-aid procedures and emergency numbers.
7. **🌐 Multilingual Support (English + हिन्दी)**
   - Instant language switcher in header.
   - Expandable architecture for additional Indian regional languages (Bengali, Marathi, Tamil, Telugu, Kannada, Gujarati, Odia).
8. **✨ Interactive Demo Mode**
   - 5 pre-configured demo scenarios (Chest pain, Severe bleeding, Unconsciousness, Choking, Minor burn) to test platform capabilities safely.
9. **📊 Anonymous Analytics Dashboard**
   - Tracks emergency frequencies, severity distributions, and system uptime with zero PII stored.

---

## 🏗️ Architecture

```
rural-emergency-assistance/
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable emergency UI components
│   │   │   ├── Header.jsx
│   │   │   ├── EmergencyButton.jsx
│   │   │   ├── SeverityBadge.jsx
│   │   │   ├── VoiceInput.jsx
│   │   │   ├── StepCard.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   ├── FacilityCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── OfflineIndicator.jsx
│   │   │   ├── SafetyDisclaimer.jsx
│   │   │   ├── DemoModeBanner.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/              # 8 Dedicated application screens
│   │   │   ├── HomePage.jsx
│   │   │   ├── EmergencyInputPage.jsx
│   │   │   ├── AssessmentPage.jsx
│   │   │   ├── FirstAidGuidePage.jsx
│   │   │   ├── HealthcareFinderPage.jsx
│   │   │   ├── EmergencyServicesPage.jsx
│   │   │   ├── FirstAidLibraryPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── data/               # Offline first-aid knowledge base, i18n & demos
│   │   ├── services/           # API, Speech, and Geolocation services
│   │   ├── hooks/              # Custom React hooks (online status, speech, GPS)
│   │   ├── contexts/           # Language context (EN / HI)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── controllers/            # Emergency, Facility, Dashboard controllers
│   ├── routes/                 # Express API routes
│   ├── services/               # Gemini AI service & Safety rules engine
│   ├── data/                   # Curated first-aid knowledge base & videos
│   ├── models/                 # Sequelize/SQLite schema for anonymous session tracking
│   ├── middleware/             # Rate limiter & Error handler
│   ├── server.js
│   └── package.json
│
├── .env.example
├── README.md
└── package.json
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- (Optional) **Gemini API Key**: from [Google AI Studio](https://aistudio.google.com/apikey). *If omitted, the platform automatically utilizes its built-in deterministic keyword categorization engine.*

### 1. Clone & Install Dependencies
Run from the project root:

```bash
# Install root, backend, and frontend dependencies
npm run install:all
```

Alternatively, install individually:
```bash
# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Environment Configuration
Create a `.env` file in the root or `backend/` directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit your `.env`:
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
EMERGENCY_NUMBER=112
```

### 3. Run Development Servers
From the root folder, launch both frontend and backend concurrently:

```bash
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/emergency/analyze` | Analyzes symptom description via Gemini AI + Safety Engine |
| `GET` | `/api/emergency/categories` | Returns all 14 supported emergency categories |
| `GET` | `/api/emergency/category/:id` | Returns complete first-aid steps, warnings & videos for a category |
| `GET` | `/api/facilities/nearby?lat=..&lng=..` | Searches nearby hospitals, CHCs, and PHCs via Overpass API |
| `GET` | `/api/dashboard/stats` | Returns anonymous emergency triage analytics & system status |
| `GET` | `/api/health` | Health check endpoint |

---

## 🛡️ Safety & Privacy Architecture

- **Deterministic Safety Overrides**: If the user inputs keywords indicating a life-threatening scenario (e.g. *stopped breathing*, *severe bleeding*, *chest pain*, *snake bite*), the severity is automatically escalated to **🔴 Critical** regardless of AI output.
- **Strictly No Medical Prescriptions**: Dosages and drug prescriptions are strictly prohibited and sanitized.
- **Zero PII Storage**: Emergency session logs record only category, severity level, and timestamp. Symptom text and personal details are never stored.

---

## 📦 Production Build & Deployment

### Build Frontend
```bash
cd frontend && npm run build
```
The optimized bundle will be generated in `frontend/dist/`.

### Start Backend Production Server
```bash
cd backend && npm start
```

---

## 📄 License & Credits
- First-aid guidance structured in accordance with public emergency protocols from **British Red Cross**, **WHO**, and **St John Ambulance**.
- Designed for high accessibility across mobile, tablet, and desktop viewports.
