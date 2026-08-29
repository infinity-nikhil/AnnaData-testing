// Target location: frontend/src/store/authStore.ts
// Delete the old authStore.js once this is in place.
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'; // adjust path if yours differs

export type InstitutionType = 'kitchen' | 'ngo';

export interface Institution {
  id: string;
  type: InstitutionType;
  organizationName: string;
  location: string;
  capacityValue: number;
  contactPhone: string;
  contactName?: string;
  contactEmail?: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface RegisterInstitutionPayload {
  type: InstitutionType;
  organizationName: string;
  location: string;
  capacityValue: number;
  contactPhone: string;
  contactName?: string;
  contactEmail?: string;
}

type RegisterResult =
  | { success: true; data: Institution }
  | { success: false; error: string };

interface AuthState {
  authInstitution: Institution | null;
  isRegistering: boolean;
  isCheckingAuth: boolean;
  registerInstitution: (payload: RegisterInstitutionPayload) => Promise<RegisterResult>;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authInstitution: null,
  isRegistering: false,
  isCheckingAuth: true,

  registerInstitution: async (payload) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post('/institutions', payload);
      set({ authInstitution: res.data.data });
      return { success: true, data: res.data.data };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Failed to register institution. Please try again.';
      return { success: false, error: message };
    } finally {
      set({ isRegistering: false });
    }
  },

  //declared but not used 

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authInstitution: res.data.data });
    } catch {
      set({ authInstitution: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: () => {
    set({ authInstitution: null });
  },
}));