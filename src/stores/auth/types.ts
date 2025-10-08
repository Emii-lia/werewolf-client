import { UserResponse } from "@/api/openapi";

export interface IUser {
  id: string;
  username: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}

export interface IAuthActions {
  setAuth: (user: IUser, token: string, isGuest?: boolean) => void;
  clearAuth: () => void;
  logout: () => void;
  initializeAuth: () => void;
}

export type IAuthStore = IAuthState & IAuthActions;
