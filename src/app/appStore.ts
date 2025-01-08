import { configureStore } from "@reduxjs/toolkit";

import { bookingReducer } from "@/enities/booking";
import cartReducer from "@/enities/cart/model/cartSlice";
import filterReducer from "@/widgets/excursionCatalog/model/filterSlice";

export const appStore = configureStore({
  reducer: {
    filter: filterReducer,
    booking: bookingReducer,
    cart: cartReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
