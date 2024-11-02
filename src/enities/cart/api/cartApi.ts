import { CartItemDto } from "@/src/enities/cart/model/types";
import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  INTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";
import { Cart, CartItem } from "@/src/shared/types/cart";

export const cartApi = {
  getCart: () => apiClient<Cart>(`/api/cart`),
  addItem: async (item: CartItemDto) => {
    const { data } = await apiClient<Cart>(
      `${EXTERNAL_API_BASE_URL}/api/cart/items`,
      {
        method: "POST",
        body: item,
        credentials: "include",
      }
    );
    return data;
  },
  updateItem: async (item: CartItem) => {
    const { data } = await apiClient<Cart>(
      `${EXTERNAL_API_BASE_URL}/api/cart/items/${item.service_id}`,
      {
        method: "PUT",
        body: item,
        credentials: "include",
      }
    );
    return data;
  },
  removeItem: async (itemId: number) => {
    const { data } = await apiClient<Cart>(
      `${INTERNAL_API_BASE_URL}/api/cart/items/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    return data;
  },
};
