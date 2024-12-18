import { create } from 'zustand';
import { User } from '@/shared/types/auth';
import { getMe } from '@/shared/api/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await getMe();
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
  setUser: (user) => set({ user }),
  reset: () => set(initialState),
})); 