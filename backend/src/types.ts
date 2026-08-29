export interface KitchenForecast {
  todayPrediction: number;
  predictionTags: string[];
  confidenceScore: number;
  temperature: string;
  rainfallProbability: string;
  campusAttendance: string;
}

export interface KitchenScan {
  item: string;
  estimatedKg: number;
  confidence: number;
  timestamp: string;
  category: string;
  recommendedNgoMatch: string;
  temperatureSafeHrs: number;
}

export interface KitchenLogEntry {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  prepared: number;
  consumed: number;
  surplus: number;
  timestamp: string;
  status: 'Distributed' | 'Logged' | 'Pending Safe Dispatch';
}

export interface KitchenDashboardData {
  kitchenName: string;
  location: string;
  role: 'KITCHEN_ADMIN';
  forecast: KitchenForecast;
  efficiencyScore: number;
  weeklySavingsKg: number;
  co2OffsetKg: number;
  recentScan: KitchenScan;
  logs: KitchenLogEntry[];
}

export interface NgoDonationCard {
  id: string;
  source: string;
  distance: string;
  distanceKm: number;
  details: string;
  portions: number;
  foodType: string;
  safetyStatus: 'SAFE' | 'URGENT';
  hoursLeft: number;
  timeRemainingText: string;
  status: 'AVAILABLE' | 'CLAIMED' | 'DISPATCHED' | 'DELIVERED';
  claimedBy?: string;
  claimedAt?: string;
  temperatureCelsius: number;
  packagingType: string;
  pickupWindow: string;
  contactPerson: string;
  contactPhone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PlatformTelemetry {
  mealsSaved: number;
  activeNgos: number;
  co2PreventedKg: number;
  matchAccuracyPct: number;
  avgDispatchMins: number;
  resourceValueSavedInr: number;
}
