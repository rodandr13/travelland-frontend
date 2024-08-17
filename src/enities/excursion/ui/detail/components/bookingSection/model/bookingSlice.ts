import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "@/src/shared/types/cart";

interface BookingState {
  visible: boolean;
  details: Record<string, CartItem>;
  isEditing: Record<string, boolean>;
}

const initialState: BookingState = {
  visible: false,
  details: {},
  isEditing: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setIsEditing: (
      state,
      action: PayloadAction<{ key: string; value: boolean }>
    ) => {
      const { key, value } = action.payload;
      state.isEditing[key] = value;
    },
    setDetails: (
      state,
      action: PayloadAction<{ key: string; details: Partial<CartItem> }>
    ) => {
      const { key, details } = action.payload;

      if (!state.details[key]) {
        state.details[key] = {
          id: "",
          type: "",
          image: {
            src: "",
            lqip: "",
          },
          title: "",
          selectedDate: "",
          participants: [],
          selectedTime: "",
          totalCurrentPrice: 0,
          totalBasePrice: 0,
        };
      }

      state.details[key] = {
        ...state.details[key],
        ...details,
      };

      const currentDetails = state.details[key];

      if (currentDetails.participants) {
        let totalCurrentPrice = 0;
        let totalBasePrice = 0;
        const participants = currentDetails.participants;

        participants.forEach((participant) => {
          if (participant && participant.currentPrice) {
            const participantCount = participant.count || 0;
            const currentPrice = participant?.currentPrice || 0;
            const basePrice = participant?.basePrice || 0;
            totalCurrentPrice += participantCount * currentPrice;
            totalBasePrice += participantCount * basePrice;
          }
        });

        currentDetails.totalCurrentPrice = totalCurrentPrice;
        currentDetails.totalBasePrice = totalBasePrice;
      }
    },
    resetDetails: (state) => {
      state.details = initialState.details;
    },
  },
});

export const { setVisible, setDetails, resetDetails, setIsEditing } =
  bookingSlice.actions;

export default bookingSlice.reducer;
