import { AuthService, GuestService, OpenAPI, RolesService, RoomsService, UsersService } from "@/api/openapi";

export const authApi = AuthService
export const guestApi = GuestService
export const usersApi = UsersService
export const rolesApi = RolesService
export const roomsApi = RoomsService

export const setAuthToken = (token: string) => {
  OpenAPI.HEADERS = {
    ...OpenAPI.HEADERS,
    Authorization: `Bearer ${token}`,
  };
};

export const clearAuthToken = () => {
  if (OpenAPI.HEADERS && typeof OpenAPI.HEADERS === 'object') {
    const { Authorization, ...remainingHeaders } = OpenAPI.HEADERS;
    OpenAPI.HEADERS = remainingHeaders;
  }
};

OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';