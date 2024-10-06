export const ACCESS_TOKEN_LIFETIME = 60 * 15;
export const REFRESH_TOKEN_LIFETIME = 60 * 60 * 24 * 7;

export const INTERNAL_API_BASE_URL =
  process.env.NEXT_PUBLIC_INTERNAL_API_BASE_URL || "";
export const EXTERNAL_API_BASE_URL =
  process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || "";

export const AUTH_ENDPOINTS = {
  REFRESH: "/api/auth/refresh",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REGISTER: "/api/auth/register",
  ME: "/api/auth/me",
};

export const ORDER_ENDPOINTS = {
  CREATE: "/api/order",
  GET_ALL: "/api/order",
};

export const ADULT_CATEGORY_ID = "40746088-7530-4514-b94e-d0df8560e8de";
