export const ACCESS_TOKEN_LIFETIME = 60 * 15;
export const REFRESH_TOKEN_LIFETIME = 60 * 60 * 24 * 7;

export const INTERNAL_API_BASE_URL =
  process.env.NEXT_PUBLIC_INTERNAL_API_BASE_URL || "";
export const EXTERNAL_API_BASE_URL =
  process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || "";

export const AUTH_ENDPOINTS = {
  REFRESH: "/auth/refresh",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  ME: "/auth/me",
};

export const ORDER_ENDPOINTS = {
  CREATE: "/order",
  GET_ALL: "/order",
};

export const PAYMENT_ENDPOINTS = {
  STATUS: "/payment/status",
};

export const CART_ENDPOINTS = {
  GET_CART: "/cart",
  ADD_ITEM: "/cart/items",
  DELETE_ITEM: "/cart/items",
  UPDATE_ITEM: "/cart/items",
};

export const ADULT_CATEGORY_ID = "40746088-7530-4514-b94e-d0df8560e8de";
