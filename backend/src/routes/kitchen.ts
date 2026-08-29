import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';
import { KitchenLogEntry } from '../types.js';

export const kitchenRouter = Router();

// GET /api/kitchen/dashboard
kitchenRouter.get('/dashboard', (_req: Request, res: Response) => {
  res.json(store.kitchenData);
});

// POST /api/kitchen/log
kitchenRouter.post('/log', (req: Request, res: Response) => {
  const { prepared, consumed, mealType } = req.body;
  const preparedNum = Number(prepared) || 0;
  const consumedNum = Number(consumed) || 0;
  const surplus = Math.max(0, preparedNum - consumedNum);

  const newLog: KitchenLogEntry = {
    id: `LOG-${Date.now().toString().slice(-4)}`,
    mealType: mealType || 'Dinner',
    prepared: preparedNum,
    consumed: consumedNum,
    surplus,
    timestamp: 'Just now',
    status: surplus > 0 ? 'Pending Safe Dispatch' : 'Distributed',
  };

  store.kitchenData.logs.unshift(newLog);

  // If surplus is detected, auto-push to NGO feed
  if (surplus > 0) {
    const portions = surplus;
    store.ngoFeed.unshift({
      id: `DON-${Date.now().toString().slice(-4)}`,
      source: "Hostel 4 Kitchen (Live Log)",
      distance: "2.1 km away",
      distanceKm: 2.1,
      details: `${portions} Portions - Fresh Prepared Meal`,
      portions,
      foodType: "Fresh Hot Institutional Meal",
      safetyStatus: "SAFE",
      hoursLeft: 4,
      timeRemainingText: "SAFE - 4 Hours Left",
      status: "AVAILABLE",
      temperatureCelsius: 63,
      packagingType: "Thermal Food Containers",
      pickupWindow: "Ready Now • Dock 2",
      contactPerson: "Kitchen Manager",
      contactPhone: "+91 94370 12345",
      coordinates: { lat: 20.2602, lng: 85.7878 }
    });

    store.telemetry.mealsSaved += portions;
    store.telemetry.co2PreventedKg += Math.round(surplus * 0.55);
  }

  res.status(201).json({
    success: true,
    log: newLog,
    surplusDetected: surplus,
    kitchenData: store.kitchenData,
  });
});
