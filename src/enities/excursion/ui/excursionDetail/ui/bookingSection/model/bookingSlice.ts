import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingDetails {
  selectedDate: string | null;
  participants: number[];
  time: string | null;
}

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
        state.details[key] = { selectedDate: null, participants: [], time: "" };
      }
      state.details[key] = {
        ...state.details[key],
        ...details,
      };
    },
  },
});

export const { setVisible, setDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
