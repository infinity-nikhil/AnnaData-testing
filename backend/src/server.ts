import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import "dotenv/config";

import { kitchenRouter } from './routes/kitchen.js';
import { ngoRouter } from './routes/ngo.js';
import { visionRouter } from './routes/vision.js';
import { telemetryRouter } from './routes/telemetry.js';
import { contactRouter } from './routes/contact.js';

//
import institutionRoutes from "./routes/institutions.routes.js";
import { foodProtocolRouter } from './routes/foodProtocol.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));
app.use(express.json());
app.use(cookieParser());


// API Route Mounts
app.use('/api/kitchen', kitchenRouter);
app.use('/api/ngo', ngoRouter);
app.use('/api/vision', visionRouter);
app.use('/api/telemetry', telemetryRouter);
app.use('/api/contact', contactRouter);

// server.ts — one mount, not four
app.use('/api/institutions', institutionRoutes);
app.use('/api/food-protocols', foodProtocolRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'AnnaData Circular Food Grid Core API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AnnaData Core API Server active on http://localhost:${PORT}`);
});
