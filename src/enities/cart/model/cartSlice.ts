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
      state.items[key] = { ...state.items[key], ...details };

      const prices = state.items[key].prices?.prices;
      const participants = state.items[key].participants;

      if (prices && participants) {
        participants.forEach((participant, index) => {
          if (prices.length > index) {
            state.totalPrice += participant.count * (prices[index]?.price || 0);
          }
        });
      }

      state.totalQuantity++;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.items[key]) {
        const prices = state.items[key].prices?.prices;
        const participants = state.items[key].participants;

        if (prices && participants) {
          participants.forEach((participant, index) => {
            if (prices.length > index) {
              state.totalPrice -=
                participant.count * (prices[index]?.price || 0);
            }
          });
        }

        state.totalQuantity--;
        delete state.items[key];
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
