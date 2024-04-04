import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  activeFilter: string;
}

const initialState: FilterState = {
  activeFilter: "",
};

const filtetSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setFilter } = filtetSlice.actions;
export default filtetSlice.reducer;
