import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  calculateTotals,
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/src/enities/cart/lib/cartHelpers";
import { CartItem } from "@/src/shared/types/cart";

const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalCurrentPrice = totals.totalCurrentPrice;
      state.totalBasePrice = totals.totalBasePrice;

      saveCartToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalCurrentPrice = totals.totalCurrentPrice;
      state.totalBasePrice = totals.totalBasePrice;

      saveCartToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
