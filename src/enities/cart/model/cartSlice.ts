import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  addCartItem,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "./thunks";

import { Cart } from "@/src/shared/types/cart";

interface CartState {
  data: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  data: null,
  loading: false,
  error: null,
};

interface ThunkConfig {
  rejectValue: string;
}

const addCommonCases = <Returned extends Cart, ThunkArg>(
  builder: ActionReducerMapBuilder<CartState>,
  thunk: AsyncThunk<Returned, ThunkArg, ThunkConfig>,
  errorMessage: string = "Unknown error"
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<Returned>) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? errorMessage;
    });
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCommonCases(builder, fetchCart, "Failed to fetch cart");
    addCommonCases(builder, addCartItem, "Failed to add item");
    addCommonCases(builder, updateCartItem, "Failed to update item");
    addCommonCases(builder, removeCartItem, "Failed to remove item");
  },
});

export default cartSlice.reducer;
