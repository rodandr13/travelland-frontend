import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Cart } from "@/src/shared/types/cart";

import {
  addCartItem,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "./thunks";

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

const addCommonCases = (
  builder: ActionReducerMapBuilder<CartState>,
  thunk: any,
  errorMessage: string = "Unknown error"
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<Cart>) => {
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
    addCommonCases(builder, fetchCart);
    addCommonCases(builder, updateCartItem, "Failed to update item");
    addCommonCases(builder, removeCartItem, "Failed to remove item");
    addCommonCases(builder, addCartItem, "Failed to add item");
  },
});

export default cartSlice.reducer;
