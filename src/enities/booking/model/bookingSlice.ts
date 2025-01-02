import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "@/src/shared/types/cart";

interface BookingState {
  visible: boolean;
  details: Partial<Record<string, CartItem>>;
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
      state.details[cartItem.service_id] = cartItem;
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
          cart_item_options: [],
          total_current_price: 0,
          total_base_price: 0,
        };
      }

      state.details[key] = {
        ...state.details[key],
        ...details,
      };

      const currentDetails = state.details[key];

      let totalCurrentPrice = 0;
      let totalBasePrice = 0;
      const participants = currentDetails.cart_item_options;

      participants.forEach((participant) => {
        const participantCount = participant.quantity ?? 0;
        const currentPrice = participant?.current_price ?? 0;
        const basePrice = participant?.base_price ?? 0;
        totalCurrentPrice += participantCount * currentPrice;
        totalBasePrice += participantCount * basePrice;
      });

      currentDetails.total_current_price = totalCurrentPrice;
      currentDetails.total_base_price = totalBasePrice;
    },
    resetDetails: (state) => {
      state.details = initialState.details;
    },
  },
});

export const {
  setVisible,
  setDetails,
  resetDetails,
  setIsEditing,
  setDetailsFromCart,
} = bookingSlice.actions;

export default bookingSlice.reducer;
