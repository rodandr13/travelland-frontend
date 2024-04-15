import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  visible: boolean;
}

const initialState: BookingState = {
  visible: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { setVisible } = bookingSlice.actions;
export default bookingSlice.reducer;
