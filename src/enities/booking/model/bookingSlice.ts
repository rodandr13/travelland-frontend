import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "@/src/shared/types/cart";

interface BookingState {
  visible: boolean;
  details: Record<string, CartItem>;
  isEditing: Record<string, boolean>;
  isOrderSuccess: boolean | null;
  orderError: string | null;
}

const initialState: BookingState = {
  visible: false,
  details: {},
  isEditing: {},
  isOrderSuccess: null,
  orderError: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setDetailsFromCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      if (cartItem) {
        state.details[cartItem.id] = cartItem;
      }
    },
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
          slug: "",
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
    setOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.isOrderSuccess = action.payload;
      state.orderError = null;
    },
    setOrderError: (state, action: PayloadAction<string>) => {
      state.isOrderSuccess = false;
      state.orderError = action.payload;
    },
    resetOrderStatus: (state) => {
      state.isOrderSuccess = null;
      state.orderError = null;
    },
  },
});

export const {
  setVisible,
  setDetails,
  resetDetails,
  setIsEditing,
  setDetailsFromCart,
  setOrderSuccess,
  setOrderError,
  resetOrderStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;
