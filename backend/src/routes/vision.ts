import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';

export const visionRouter = Router();

// POST /api/vision/scan
visionRouter.post('/scan', (req: Request, res: Response) => {
  const { sampleType } = req.body;

  const estimates: Record<string, { item: string; estimatedKg: number; confidence: number; volumeLiters: number; safeHrs: number }> = {
    rice: { item: "Steamed Basmati Rice Container", estimatedKg: 12, confidence: 97.4, volumeLiters: 18.5, safeHrs: 4 },
    dal: { item: "Yellow Dal Tadka Vat", estimatedKg: 8.5, confidence: 96.1, volumeLiters: 10.2, safeHrs: 3.5 },
    roti: { item: "Wheat Rotis / Chapatis Stack", estimatedKg: 6, confidence: 98.2, volumeLiters: 9.0, safeHrs: 2.5 }
  };

  const detected = estimates[sampleType] || estimates['rice'];

  res.json({
    success: true,
    ...detected,
    model: "YOLO-Food-v8.4-Volumetric",
    detectedAt: new Date().toISOString()
  });
});

// POST /api/vision/broadcast
visionRouter.post('/broadcast', (req: Request, res: Response) => {
  const { item, estimatedKg } = req.body;
  const portions = Math.max(25, Math.round(Number(estimatedKg || 12) * 4.2));

  const newDonation = {
    id: `DON-${Date.now().toString().slice(-4)}`,
    source: "Hostel 4 Kitchen (Vision Broadcast)",
    distance: "2.5 km away",
    distanceKm: 2.5,
    details: `${portions} Portions - ${item || '12kg Rice'}`,
    portions,
    foodType: item || 'Steamed Basmati Rice',
    safetyStatus: 'SAFE' as const,
    hoursLeft: 4,
    timeRemainingText: 'SAFE - 4 Hours Left',
    status: 'AVAILABLE' as const,
    temperatureCelsius: 64,
    packagingType: 'Thermal Insulated Crates',
    pickupWindow: 'Ready Now • Loading Bay B',
    contactPerson: 'Chef Rajesh Mohanty',
    contactPhone: '+91 94370 12345',
    coordinates: { lat: 20.2602, lng: 85.7878 }
  };

  store.ngoFeed.unshift(newDonation);
  store.telemetry.mealsSaved += portions;
  store.telemetry.co2PreventedKg += Math.round(Number(estimatedKg || 12) * 2.5);

  res.status(201).json({
    success: true,
    donation: newDonation,
    telemetry: store.telemetry
  });
});
