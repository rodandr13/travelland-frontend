import { CartItemDto } from "@/src/enities/cart/model/types";
import { apiClient } from "@/src/shared/api";
import {
  CART_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";
import { Cart, CartItem } from "@/src/shared/types/cart";

export const cartApi = {
  getCart: async () => await apiClient<Cart>(`/api/cart`),
  addItem: async (item: CartItemDto) => {
    const { data } = await apiClient<Cart>(
      `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.ADD_ITEM}`,
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
      `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.UPDATE_ITEM}${item.service_id}`,
      {
        method: "PUT",
        body: item,
        credentials: "include",
      }
    );
    return data;
  },
  removeItem: async (itemId: number) => {
    const { data } = await apiClient<Cart>(`/api/cart/items/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return data;
  },
};
