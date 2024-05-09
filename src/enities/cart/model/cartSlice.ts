import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingDetails } from "@/src/shared/types/booking";

interface CartState {
  items: Record<string, BookingDetails>;
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: {},
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ key: string; details: Partial<BookingDetails> }>
    ) => {
      const { key, details } = action.payload;
      if (state.items[key]) {
        state.items[key] = { ...state.items[key], ...details };
        if (state.items[key].prices) {
          const prices = state.items[key].prices?.prices;
          const participants = state.items[key].participants;
          if (prices && participants) {
            for (let i = 0; i < participants.length; i++) {
              state.totalPrice += participants[i] * (prices[i].price || 0);
            }
          }
        }
        state.totalQuantity++;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.items[key]) {
        const prices = state.items[key].prices?.prices;
        const participants = state.items[key].participants;
        if (prices && participants) {
          for (let i = 0; i < participants.length; i++) {
            state.totalPrice -= participants[i] * prices[i].price;
          }
        }
        state.totalQuantity--;
        delete state.items[key];
      }
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
