import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BookingDetails } from "@/src/shared/types/booking";

interface BookingState {
  visible: boolean;
  details: Record<string, BookingDetails>;
  isEditing: Record<string, boolean>;
  tempDetails: Record<string, Partial<BookingDetails>>;
}

const initialState: BookingState = {
  visible: false,
  details: {},
  isEditing: {},
  tempDetails: {},
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
      if (!value) {
        delete state.tempDetails[key];
      }
    },
    setDetails: (
      state,
      action: PayloadAction<{ key: string; details: Partial<BookingDetails> }>
    ) => {
      const { key, details } = action.payload;

      if (!state.isEditing[key]) {
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
      } else {
        if (!state.tempDetails[key]) {
          state.tempDetails[key] = { ...state.details[key] };
        }
        state.tempDetails[key] = {
          ...state.tempDetails[key],
          ...details,
        } as BookingDetails;
      }

      const currentDetails = state.isEditing[key]
        ? state.tempDetails[key]
        : state.details[key];

      if (currentDetails.participants && currentDetails.prices) {
        const { prices } = currentDetails.prices;
        const participants = currentDetails.participants;
        let totalPrice = 0;

        participants.forEach((participant, index) => {
          if (participant && prices && prices.length > index) {
            const participantCount = participant.count || 0;
            const price = prices[index]?.price || 0;
            totalPrice += participantCount * price;
          }
        });
        currentDetails.totalPrice = totalPrice;
      }
    },
    saveChanges: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.tempDetails[key]) {
        const tempDetail = state.tempDetails[key];
        state.details[key] = {
          title: tempDetail.title ?? "",
          image: tempDetail.image ?? { src: "", lqip: "" },
          selectedDate: tempDetail.selectedDate ?? "",
          participants: tempDetail.participants ?? [],
          time: tempDetail.time ?? "",
          prices: tempDetail.prices ?? { prices: [], basePrice: [] },
          totalPrice: tempDetail.totalPrice ?? 0,
        };
        delete state.tempDetails[key];
        state.isEditing[key] = false;
      }
    },
    cancelEditing: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state.tempDetails[key];
      state.isEditing[key] = false;
    },
    resetDetails: (state) => {
      state.details = initialState.details;
      state.tempDetails = {};
    },
  },
});

export const {
  setVisible,
  setDetails,
  resetDetails,
  setIsEditing,
  saveChanges,
  cancelEditing,
} = bookingSlice.actions;

export default bookingSlice.reducer;
