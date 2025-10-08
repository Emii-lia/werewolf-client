import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { setAuthToken, clearAuthToken } from '@/api/apiClient';

import type { IAuthStore, IUser } from './types';

export const useAuthStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isGuest: false,

      // Actions
      setAuth: (user: IUser, token: string, isGuest = false) => {
        setAuthToken(token);
        if (typeof document !== 'undefined') {
          document.cookie = `auth-token=${token}; path=/`;
        }
        set({
          user,
          token,
          isAuthenticated: true,
          isGuest,
        });
      },

      clearAuth: () => {
        clearAuthToken();
        if (typeof document !== 'undefined') {
          document.cookie = `auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isGuest: false,
        });
      },

      logout: () => {
        get().clearAuth();
      },

      initializeAuth: () => {
        const { token } = get();
        if (token) {
          setAuthToken(token);
          set({ isAuthenticated: true });
          if (typeof document !== 'undefined') {
            document.cookie = `auth-token=${token}; path=/`;
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state, error) => {
        if (state?.token) {
          setAuthToken(state.token);
        }
        if (error) {
          console.error('Failed to rehydrate auth state:', error);
        }
      },
    }
  )
);
