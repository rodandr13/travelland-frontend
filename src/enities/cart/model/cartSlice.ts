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
    updateItem: (state, action: PayloadAction<CartItem>) => {
      const updatedItem = action.payload;
      const index = state.items.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.items[index] = updatedItem;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalCurrentPrice = totals.totalCurrentPrice;
        state.totalBasePrice = totals.totalBasePrice;

        saveCartToLocalStorage(state);
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalCurrentPrice = 0;
      state.totalBasePrice = 0;

      saveCartToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, updateItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
