import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookingDetails } from "@/src/shared/types/booking";

interface BookingState {
  visible: boolean;
  details: Record<string, BookingDetails>;
}

const initialState: BookingState = {
  visible: false,
  details: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setDetails: (
      state,
      action: PayloadAction<{ key: string; details: Partial<BookingDetails> }>
    ) => {
      const { key, details } = action.payload;
      if (!state.details[key]) {
        state.details[key] = {
          image: "",
          title: "",
          selectedDate: "",
          participants: [],
          time: "",
          prices: {
            prices: [],
            basePrice: [],
          },
          totalPrice: 0,
        };
      }
      state.details[key] = {
        ...state.details[key],
        ...details,
      };
      if (state.details[key].participants && state.details[key].prices) {
        const prices = state.details[key].prices?.prices;
        const participants = state.details[key].participants;
        for (let i = 0; i < participants.length; i++) {
          if (prices && state.details[key].participants) {
            let totalPrice = 0;
            for (let i = 0; i < state.details[key].participants.length; i++) {
              const participantCount =
                state.details[key].participants[i].count || 0;
              const price = prices[i]?.price || 0;
              totalPrice += participantCount * price;
            }
            state.details[key].totalPrice = totalPrice;
          }
        }
      }
    },
  },
});

export const { setVisible, setDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
