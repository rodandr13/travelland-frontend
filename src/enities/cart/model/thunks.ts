import { createAsyncThunk } from "@reduxjs/toolkit";

import { cartApi } from "@/src/enities/cart";
import { CartItemDto } from "@/src/enities/cart/model/types";
import { CartItem } from "@/src/shared/types/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await cartApi.getCart();
  return data;
});

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async (newItem: CartItemDto) => {
    return await cartApi.addItem(newItem);
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async (params: { updatedItem: CartItem }) => {
    return await cartApi.updateItem(params.updatedItem);
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId: number) => {
    return await cartApi.removeItem(itemId);
  }
);
