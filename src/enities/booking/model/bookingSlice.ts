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
        state.details[cartItem.service_id] = cartItem;
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
          service_id: "",
          service_type: "",
          slug: "",
          image_lqip: "",
          image_src: "",
          title: "",
          date: "",
          time: "",
          options: [],
          total_current_price: 0,
          total_base_price: 0,
        };
      }

      state.details[key] = {
        ...state.details[key],
        ...details,
      };

      const currentDetails = state.details[key];

      if (currentDetails.options) {
        let totalCurrentPrice = 0;
        let totalBasePrice = 0;
        const participants = currentDetails.options;

        participants.forEach((participant) => {
          if (participant && participant.current_price) {
            const participantCount = participant.quantity || 0;
            const currentPrice = participant?.current_price || 0;
            const basePrice = participant?.base_price || 0;
            totalCurrentPrice += participantCount * currentPrice;
            totalBasePrice += participantCount * basePrice;
          }
        });

        currentDetails.total_current_price = totalCurrentPrice;
        currentDetails.total_base_price = totalBasePrice;
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
