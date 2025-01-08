// thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

import { cartApi } from "@/enities/cart";
import { CartItemDto } from "@/enities/cart/model/types";
import { ApiError } from "@/shared/api/apiClient";
import { Cart, CartItem } from "@/shared/types/cart";

interface ThunkConfig {
  rejectValue: string;
}

export const fetchCart = createAsyncThunk<Cart, void, ThunkConfig>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartApi.getCart();
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message || "Не удалось загрузить корзину");
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message || "Не удалось загрузить корзину");
      }

      return rejectWithValue("Неизвестная ошибка при загрузке корзины");
    }
  }
);

export const addCartItem = createAsyncThunk<Cart, CartItemDto, ThunkConfig>(
  "cart/addItem",
  async (newItem: CartItemDto, { rejectWithValue }) => {
    try {
      return await cartApi.addItem(newItem);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message || "Не удалось добавить товар");
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message || "Не удалось добавить товар");
      }

      return rejectWithValue("Неизвестная ошибка при добавлении товара");
    }
  }
);

export const updateCartItem = createAsyncThunk<Cart, CartItem, ThunkConfig>(
  "cart/updateItem",
  async (updatedItem: CartItem, { rejectWithValue }) => {
    try {
      return await cartApi.updateItem(updatedItem);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message || "Не удалось обновить товар");
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message || "Не удалось обновить товар");
      }

      return rejectWithValue("Неизвестная ошибка при обновлении товара");
    }
  }
);

export const removeCartItem = createAsyncThunk<Cart, string, ThunkConfig>(
  "cart/removeItem",
  async (itemId: string, { rejectWithValue }) => {
    try {
      return await cartApi.removeItem(itemId);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.message || "Не удалось удалить товар");
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message || "Не удалось удалить товар");
      }

      return rejectWithValue("Неизвестная ошибка при удалении товара");
    }
  }
);
