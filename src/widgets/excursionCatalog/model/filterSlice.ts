import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  activeFilter: string;
}

const initialState: FilterState = {
  activeFilter: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
