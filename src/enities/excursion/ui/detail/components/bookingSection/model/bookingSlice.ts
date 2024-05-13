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
          image: {
            src: "",
            lqip: "",
          },
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
        const { prices } = state.details[key].prices;
        const participants = state.details[key].participants;
        let totalPrice = 0;

        participants.forEach((participant, index) => {
          if (participant && prices && prices.length > index) {
            const participantCount = participant.count || 0;
            const price = prices[index]?.price || 0;
            totalPrice += participantCount * price;
          }
        });
        state.details[key].totalPrice = totalPrice;
      }
    },
  },
});

export const { setVisible, setDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
