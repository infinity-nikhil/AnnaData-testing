import { KitchenDashboardData, NgoDonationCard, PlatformTelemetry } from '../types/data';

/**
 * ============================================================================
 * MOCK DATA STRUCTURES FOR ANNADATA SYSTEM
 * ============================================================================
 */

export const mockKitchenData: KitchenDashboardData = {
  kitchenName: "Hostel 4 Main Mess",
  location: "SOA Campus, Bhubaneswar, Odisha",
  role: "KITCHEN_ADMIN",
  forecast: {
    todayPrediction: 1140,
    predictionTags: ["Heavy Rain", "Exams Week"],
    confidenceScore: 98.2,
    temperature: "24°C Monsoon",
    rainfallProbability: "88%",
    campusAttendance: "Reduced (-14% due to rainy exam schedule)"
  },
  efficiencyScore: 92, // Resource Efficiency Score: 92%
  weeklySavingsKg: 340,
  co2OffsetKg: 850,
  recentScan: {
    item: "Rice & Dal Surplus Batch",
    estimatedKg: 12,
    confidence: 97.4,
    timestamp: "10 mins ago",
    category: "Freshly Cooked Staples",
    recommendedNgoMatch: "Asha Kiran Shelter (2.5 km)",
    temperatureSafeHrs: 4
  },
  logs: [
    {
      id: "LOG-8821",
      mealType: "Lunch",
      prepared: 1200,
      consumed: 1145,
      surplus: 55,
      timestamp: "Today, 14:15",
      status: "Distributed"
    },
    {
      id: "LOG-8820",
      mealType: "Breakfast",
      prepared: 950,
      consumed: 938,
      surplus: 12,
      timestamp: "Today, 09:30",
      status: "Distributed"
    },
    {
      id: "LOG-8819",
      mealType: "Dinner",
      prepared: 1300,
      consumed: 1210,
      surplus: 90,
      timestamp: "Yesterday, 21:45",
      status: "Distributed"
    }
  ]
};

export const mockNgoFeed: NgoDonationCard[] = [
  {
    id: "DON-101",
    source: "SOA Hostel 4 Kitchen, Bhubaneswar",
    distance: "2.5 km away",
    distanceKm: 2.5,
    details: "50 Portions - Rice & Dal",
    portions: 50,
    foodType: "Cooked Steamed Rice & Toor Dal",
    safetyStatus: "SAFE",
    hoursLeft: 4,
    timeRemainingText: "SAFE - 4 Hours Left",
    status: "AVAILABLE",
    temperatureCelsius: 62,
    packagingType: "Insulated Stainless Steel Food Crates",
    pickupWindow: "Ready Now • Gate 2 Loading Dock",
    contactPerson: "Chef Rajesh Mohanty",
    contactPhone: "+91 94370 12345",
    coordinates: {
      lat: 20.2602,
      lng: 85.7878
    }
  },
  {
    id: "DON-102",
    source: "KIIT Central Dining Hall, Patia, Bhubaneswar",
    distance: "1.2 km away",
    distanceKm: 1.2,
    details: "85 Portions - Veg Pulao & Mix Veg",
    portions: 85,
    foodType: "Warm Vegetable Pulao & Paneer Subzi",
    safetyStatus: "URGENT",
    hoursLeft: 1,
    timeRemainingText: "URGENT - 1 Hour Left",
    status: "AVAILABLE",
    temperatureCelsius: 58,
    packagingType: "Sealed Aluminum Trays",
    pickupWindow: "Immediate • Service Entrance A",
    contactPerson: "Manager S. K. Patnaik",
    contactPhone: "+91 94371 98765",
    coordinates: {
      lat: 20.3533,
      lng: 85.8175
    }
  },
  {
    id: "DON-103",
    source: "Infocity Tech Park Hub, Chandrasekharpur, Bhubaneswar",
    distance: "3.8 km away",
    distanceKm: 3.8,
    details: "40 Portions - Roti, Paneer & Sabzi",
    portions: 40,
    foodType: "Fresh Wheat Rotis & Shahi Paneer",
    safetyStatus: "SAFE",
    hoursLeft: 3.5,
    timeRemainingText: "SAFE - 3.5 Hours Left",
    status: "AVAILABLE",
    temperatureCelsius: 64,
    packagingType: "Hygienic Casseroles",
    pickupWindow: "Ready Now • Main Cafeteria Hub",
    contactPerson: "Pooja Sharma",
    contactPhone: "+91 98610 54321",
    coordinates: {
      lat: 20.3588,
      lng: 85.8066
    }
  },
  {
    id: "DON-104",
    source: "Saheed Nagar Community Center, Bhubaneswar",
    distance: "4.5 km away",
    distanceKm: 4.5,
    details: "110 Portions - Khichdi & Tomato Chutney",
    portions: 110,
    foodType: "Nutritious Dal Khichdi & Sweet Chutney",
    safetyStatus: "URGENT",
    hoursLeft: 1,
    timeRemainingText: "URGENT - 1 Hour Left",
    status: "AVAILABLE",
    temperatureCelsius: 55,
    packagingType: "Food-Grade Thermal Barrels",
    pickupWindow: "Urgent Pickup Required • Gate 1",
    contactPerson: "Amitabh Dash",
    contactPhone: "+91 94372 33445",
    coordinates: {
      lat: 20.2885,
      lng: 85.8452
    }
  }
];

export const mockTelemetry: PlatformTelemetry = {
  mealsSaved: 1240,
  activeNgos: 8,
  co2PreventedKg: 4500,
  matchAccuracyPct: 98.4,
  avgDispatchMins: 14,
  resourceValueSavedInr: 320000
};

/**
 * ============================================================================
 * REQUIRED API FETCHING TEMPLATE:
 * Below is the production useEffect fetch pattern for backend integration.
 * In production, the mock states are replaced with live REST / WebSocket feeds.
 * ============================================================================
 *
 * useEffect(() => {
 *   // 1. Fetch Kitchen Dashboard Telemetry & AI Forecast
 *   const fetchKitchenData = async () => {
 *     try {
 *       const response = await fetch('/api/kitchen/dashboard', {
 *         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
 *       });
 *       if (!response.ok) throw new Error('Failed to fetch kitchen data');
 *       const data: KitchenDashboardData = await response.json();
 *       setKitchenData(data);
 *     } catch (err) {
 *       console.error('Kitchen API error, falling back to cached state:', err);
 *     }
 *   };
 *
 *   // 2. Fetch Live NGO Food Radar Feed
 *   const fetchNgoFeed = async () => {
 *     try {
 *       const response = await fetch('/api/ngo/feed', {
 *         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
 *       });
 *       if (!response.ok) throw new Error('Failed to fetch NGO feed');
 *       const data: NgoDonationCard[] = await response.json();
 *       setNgoFeed(data);
 *     } catch (err) {
 *       console.error('NGO Feed API error, falling back to cached state:', err);
 *     }
 *   };
 *
 *   fetchKitchenData();
 *   fetchNgoFeed();
 *
 *   // Optional: WebSocket / Server-Sent Events for real-time live radar updates
 *   // const socket = new WebSocket('wss://api.annadata.org/v1/live-radar');
 *   // socket.onmessage = (event) => {
 *   //   const newDonation = JSON.parse(event.data);
 *   //   setNgoFeed((prev) => [newDonation, ...prev]);
 *   // };
 *   // return () => socket.close();
 * }, []);
 *
 */
