# AnnaData — AI-Driven Circular Economy for Food Security

> Full-Stack Platform: High-End React Landing Page & Dashboards + Express REST API Backend.

```
AnnaData/
├── frontend/             # React 18, Tailwind CSS, Framer Motion, Lucide Icons, Vite
│   ├── src/
│   │   ├── components/   # Hero, ImpactTicker, HowItWorks, KitchenDashboard, NgoDashboard, Modals
│   │   ├── data/         # Mock data & API fetch templates
│   │   ├── types/        # TypeScript data models
│   │   ├── App.tsx       # Main portal orchestrator
│   │   ├── index.css     # Dark Premium theme, neon emerald glows, typography
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts    # Configured with /api proxy to http://localhost:5000
│   └── package.json
│
├── backend/              # Node.js, Express, TypeScript REST API
│   ├── src/
│   │   ├── routes/       # /api/kitchen, /api/ngo, /api/vision, /api/telemetry
│   │   ├── data/         # In-memory store initialized with seed state
│   │   ├── types.ts      # Shared backend types
│   │   └── server.ts     # Express server (Port 5000)
│   ├── tsconfig.json
│   └── package.json
│
├── package.json          # Root workspace scripts
└── README.md
```

---

## 🚀 Running the Project

### Option A: Run From Root
```bash
# Start Frontend Development Server (Port 3000)
npm run dev:frontend

# Start Backend API Server (Port 5000)
npm run dev:backend

# Build Both Projects for Production
npm run build
```

### Option B: Run Directly Inside Each Folder
```bash
# 1. Frontend
cd frontend
npm run dev

# 2. Backend
cd backend
npm run dev
```

---

## 📡 Backend API Endpoints

- `GET  /api/kitchen/dashboard` — Returns today's AI forecast (1,140 meals, Heavy Rain, Exams Week), efficiency score (92%), and logs.
- `POST /api/kitchen/log` — Logs prepared/consumed actuals, calculates surplus, and auto-broadcasts to NGO radar.
- `GET  /api/ngo/feed` — Returns available food rescue cards with safety status countdown badges.
- `POST /api/ngo/claim/:id` — Claims food donation for immediate rescue dispatch.
- `POST /api/vision/scan` — Volumetric computer vision simulation endpoint.
- `POST /api/vision/broadcast` — Broadcasts container scan to live radar.
- `GET  /api/telemetry` — Real-time metrics (1,240 Meals Saved, 8 Active NGOs, 4,500 kg CO2 Prevented).
