import { CartItemDto } from "@/src/enities/cart/model/types";
import { apiClient } from "@/src/shared/api";
import { ApiError } from "@/src/shared/api/apiClient";
import {
  CART_ENDPOINTS,
  EXTERNAL_API_BASE_URL,
} from "@/src/shared/lib/constants";
import { Cart, CartItem } from "@/src/shared/types/cart";

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const { data, status } = await apiClient<Cart>(
      `${EXTERNAL_API_BASE_URL}/cart`
    );
    if (data === null) {
      throw new ApiError("Не удалось получить корзину", status, null);
    }
    return data;
  },
  addItem: async (item: CartItemDto): Promise<Cart> => {
    const { data, status } = await apiClient<Cart>(
      `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.ADD_ITEM}`,
      {
        method: "POST",
        body: item,
        credentials: "include",
      }
    );
    if (data === null) {
      throw new ApiError("Не удалось добавить товар в корзину", status, null);
    }
    return data;
  },
  updateItem: async (item: CartItem): Promise<Cart> => {
    const { data, status } = await apiClient<Cart>(
      `${EXTERNAL_API_BASE_URL}${CART_ENDPOINTS.UPDATE_ITEM}${item.service_id}`,
      {
        method: "PUT",
        body: item,
        credentials: "include",
      }
    );
    if (data === null) {
      throw new ApiError("Не удалось обновить товар в корзине", status, null);
    }
    return data;
  },
  removeItem: async (itemId: string): Promise<Cart> => {
    const { data, status } = await apiClient<Cart>(
      `/api/cart/items/${itemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (data === null) {
      throw new ApiError("Не удалось удалить товар из корзины", status, null);
    }
    return data;
  },
};
