// Target location: frontend/src/store/foodStore.ts
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; // adjust path if yours differs

export type ListingStatus = 'available' | 'claimed';

// Shape returned by getFoodProtocols (joined with institutions for kitchenName/kitchenLocation)
export interface FoodProtocolListing {
  id: string;
  dish: string;
  quantity: string | number;
  perishability: string;
  badgeClass: string;
  coolingRule: string;
  segregationAlert: string;
  safeWindow: string;
  targetTemp: string | number;
  vessel: string;
  status: ListingStatus;
  claimedByInstitutionId: string | null;
  createdAt: string;
  kitchenName: string;
  kitchenLocation: string;
}

// Shape the kitchen sends to createFoodProtocol — no institutionId,
// the backend derives that from req.institution
export interface CreateFoodProtocolPayload {
  dish: string;
  quantity: string | number;
  perishability: string;
  badgeClass: string;
  coolingRule: string;
  segregationAlert: string;
  safeWindow: string;
  targetTemp: string | number;
  vessel: string;
}

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

interface FoodState {
  listings: FoodProtocolListing[];
  isLoadingListings: boolean;
  isCreating: boolean;
  claimingId: string | null; // id of the listing currently being claimed, or null
  error: string | null;

  getFoodProtocols: () => Promise<void>;
  createFoodProtocol: (
    payload: CreateFoodProtocolPayload
  ) => Promise<ActionResult<FoodProtocolListing>>;
  claimFoodProtocol: (id: string) => Promise<ActionResult<FoodProtocolListing>>;
}

export const useFoodStore = create<FoodState>((set, get) => ({
  listings: [],
  isLoadingListings: false,
  isCreating: false,
  claimingId: null,
  error: null,

  // ---------- Kitchen + NGO: fetch all listings ----------
  getFoodProtocols: async () => {
    set({ isLoadingListings: true, error: null });
    try {
      const res = await axiosInstance.get('/food-protocols');
      // controller returns { success, data: listings[] }
      set({ listings: res.data.data ?? [] });
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Failed to fetch food protocol listings.';
      set({ error: message });
    } finally {
      set({ isLoadingListings: false });
    }
  },

  // ---------- Kitchen: create a listing ----------
  createFoodProtocol: async (payload) => {
    set({ isCreating: true, error: null });
    try {
      const res = await axiosInstance.post('/food-protocols', payload);
      const created = res.data.data as FoodProtocolListing;

      // prepend so the new listing shows up immediately, no refetch needed
      set((state) => ({ listings: [created, ...state.listings] }));

      return { success: true, data: created };
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Failed to create food protocol.';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ isCreating: false });
    }
  },

  // ---------- NGO: claim a listing ----------
  claimFoodProtocol: async (id) => {
    set({ claimingId: id, error: null });
    try {
      const res = await axiosInstance.post(`/food-protocols/${id}/claim`, {});
      const claimed = res.data.data as FoodProtocolListing;

      // sync with the authoritative row from the server rather than
      // just assuming the claim went through for this client
      set((state) => ({
        listings: state.listings.map((listing) =>
          listing.id === id ? { ...listing, ...claimed } : listing
        ),
      }));

      return { success: true, data: claimed };
    } catch (error: any) {
      // 409 = someone else's claim won the race on the backend's
      // WHERE status = 'available' check — refetch so this client's
      // list stops showing a listing that's already gone
      if (error.response?.status === 409) {
        get().getFoodProtocols();
      }
      const message =
        error.response?.data?.message || 'Failed to claim this listing.';
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ claimingId: null });
    }
  },
}));