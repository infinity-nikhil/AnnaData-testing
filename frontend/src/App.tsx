import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ImpactTicker } from './components/ImpactTicker';
import { HowItWorks } from './components/HowItWorks';
import { KitchenDashboard } from './components/KitchenDashboard';
import { NgoDashboard } from './components/NgoDashboard';
import { RegistrationModal } from './components/RegistrationModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Data models and mock initialization
import { mockKitchenData, mockNgoFeed, mockTelemetry } from './data/mockData';
import { KitchenDashboardData, NgoDonationCard, PlatformTelemetry } from './types/data';

export const App: React.FC = () => {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'landing' | 'kitchen' | 'ngo'>('landing');

  // ============================================================================
  // REACT STATE VARIABLES INITIALIZED WITH MOCK DATA
  // ============================================================================
  const [kitchenData, setKitchenData] = useState<KitchenDashboardData>(mockKitchenData);
  const [ngoFeed, setNgoFeed] = useState<NgoDonationCard[]>(mockNgoFeed);
  const [telemetry, setTelemetry] = useState<PlatformTelemetry>(mockTelemetry);

  // Modal States
  const [registrationModal, setRegistrationModal] = useState<{ isOpen: boolean; type: 'kitchen' | 'ngo' }>({
    isOpen: false,
    type: 'kitchen',
  });

  // Global Notification Toast State
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'alert' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'alert' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  /**
   * ============================================================================
   * BACKEND API INTEGRATION USEEFFECT HOOK
   * Below is the production useEffect fetch block for backend integration.
   * ============================================================================
   *
   * useEffect(() => {
   *   const fetchKitchenData = async () => {
   *     try {
   *       const res = await fetch('/api/kitchen/dashboard');
   *       if (res.ok) {
   *         const data: KitchenDashboardData = await res.json();
   *         setKitchenData(data);
   *       }
   *     } catch (err) {
   *       console.error('Error fetching /api/kitchen/dashboard:', err);
   *     }
   *   };
   *
   *   const fetchNgoFeed = async () => {
   *     try {
   *       const res = await fetch('/api/ngo/feed');
   *       if (res.ok) {
   *         const data: NgoDonationCard[] = await res.json();
   *         setNgoFeed(data);
   *       }
   *     } catch (err) {
   *       console.error('Error fetching /api/ngo/feed:', err);
   *     }
   *   };
   *
   *   fetchKitchenData();
   *   fetchNgoFeed();
   * }, []);
   */

  // Scroll smoothly to Impact Section
  const handleScrollToImpact = () => {
    const el = document.getElementById('impact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Broadcast surplus food from Kitchen / Vision to NGO Live Radar
  const handleBroadcastSurplus = (surplusKg: number, details: string) => {
    const portions = Math.max(25, Math.round(surplusKg * 4.2));
    const newCard: NgoDonationCard = {
      id: `DON-${Date.now().toString().slice(-4)}`,
      source: "Hostel 4 Kitchen (Live Broadcast)",
      distance: "2.1 km away",
      distanceKm: 2.1,
      details: `${portions} Portions - ${details}`,
      portions,
      foodType: details,
      safetyStatus: "SAFE",
      hoursLeft: 4,
      timeRemainingText: "SAFE - 4 Hours Left",
      status: "AVAILABLE",
      temperatureCelsius: 64,
      packagingType: "Thermal Food Containers",
      pickupWindow: "Ready Now • Dock 2",
      contactPerson: "Kitchen Manager",
      contactPhone: "+91 94370 12345",
      coordinates: {
        lat: 20.2602,
        lng: 85.7878,
      },
    };

    setNgoFeed((prev) => [newCard, ...prev]);
    setTelemetry((prev) => ({
      ...prev,
      mealsSaved: prev.mealsSaved + portions,
      co2PreventedKg: prev.co2PreventedKg + Math.round(surplusKg * 2.5),
    }));

    showNotification(`New Donation Broadcast: ${portions} portions published to NGO Live Radar!`);
    
    // Confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#ffffff'],
    });
  };

  // Handle NGO Volunteer claiming a donation
  const handleClaimFood = (id: string) => {
    setNgoFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: 'CLAIMED', timeRemainingText: 'CLAIMED • Pickup in 30 Mins' }
          : item
      )
    );

    showNotification(`Donation ${id} claimed! Kitchen notified for instant pickup.`);
    
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#00f59b', '#38bdf8'],
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1917] flex flex-col selection:bg-[#0F5132] selection:text-white">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenKitchenReg={() => setRegistrationModal({ isOpen: true, type: 'kitchen' })}
        onOpenNgoReg={() => setRegistrationModal({ isOpen: true, type: 'ngo' })}
      />

      {/* Global Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-[#0F5132] border border-[#0B3A24] text-white shadow-lg backdrop-blur-md text-xs font-semibold flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D9534F] animate-ping" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Conditional View Rendering */}
      {currentView === 'landing' && (
        <main className="flex-1 flex flex-col">
          {/* SECTION 1: THE HERO (The "Apple" Reveal) */}
          <HeroSection
            onRegisterKitchen={() => setCurrentView('kitchen')}
            onJoinNgo={() => setCurrentView('ngo')}
            onScrollToImpact={handleScrollToImpact}
          />

          {/* SECTION 2: LIVE IMPACT TICKER (The Parallax Transition) */}
          <ImpactTicker telemetry={telemetry} />

          {/* SECTION 3: HOW IT WORKS (Scroll-Appear Features) */}
          <HowItWorks
            onTryKitchenForecast={() => setCurrentView('kitchen')}
            onViewLiveRadar={() => setCurrentView('ngo')}
          />

          {/* SECTION 4: CONTACT US (User Details & Regional Operations) */}
          <ContactSection />

          {/* SECTION 5: THE FOOTER */}
          <Footer />
        </main>
      )}

      {/* VIEW 1: KITCHEN DASHBOARD (Role: KITCHEN_ADMIN) - Tablet-Optimized */}
      {currentView === 'kitchen' && (
        <main className="flex-1">
          <KitchenDashboard
            data={kitchenData}
            onUpdateKitchenData={(updated) => setKitchenData((prev) => ({ ...prev, ...updated }))}
            onBroadcastSurplusToNgo={handleBroadcastSurplus}
            onBackToLanding={() => setCurrentView('landing')}
          />
          <Footer />
        </main>
      )}

      {/* VIEW 2: NGO DASHBOARD (Role: NGO_VOLUNTEER) - Mobile-Optimized */}
      {currentView === 'ngo' && (
        <main className="flex-1">
          <NgoDashboard
            feed={ngoFeed}
            onClaimFood={handleClaimFood}
            onBackToLanding={() => setCurrentView('landing')}
          />
          <Footer />
        </main>
      )}

      {/* Registration Onboarding Modal */}
      <RegistrationModal
        isOpen={registrationModal.isOpen}
        type={registrationModal.type}
        onClose={() => setRegistrationModal({ isOpen: false, type: 'kitchen' })}
        onSuccess={(role) => setCurrentView(role)}
      />

    </div>
  );
};
