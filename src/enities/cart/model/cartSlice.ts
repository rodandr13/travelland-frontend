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

      state.totalPrice = Object.values(state.items).reduce((total, item) => {
        const prices = item.prices?.prices;
        const participants = item.participants;

        if (prices && participants) {
          return (
            total +
            participants.reduce((sum, participant, index) => {
              if (prices.length > index) {
                return sum + participant.count * (prices[index]?.price || 0);
              }
              return sum;
            }, 0)
          );
        }

        return total;
      }, 0);

      state.totalQuantity = Object.keys(state.items).length;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.items[key]) {
        delete state.items[key];

        state.totalPrice = Object.values(state.items).reduce((total, item) => {
          const prices = item.prices?.prices;
          const participants = item.participants;

          if (prices && participants) {
            return (
              total +
              participants.reduce((sum, participant, index) => {
                if (prices.length > index) {
                  return sum + participant.count * (prices[index]?.price || 0);
                }
                return sum;
              }, 0)
            );
          }

          return total;
        }, 0);

        state.totalQuantity = Object.keys(state.items).length;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
