import { configureStore } from "@reduxjs/toolkit";

import { bookingReducer } from "@/src/enities/booking";
import cartReducer from "@/src/enities/cart/model/cartSlice";
import filterReducer from "@/src/widgets/excursionCatalog/model/filterSlice";

export const appStore = configureStore({
  reducer: {
    filter: filterReducer,
    booking: bookingReducer,
    cart: cartReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
