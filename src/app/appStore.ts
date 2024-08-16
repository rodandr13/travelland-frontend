import { configureStore } from "@reduxjs/toolkit";

import bookingReducer from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import filterReducer from "@/src/widgets/excursionCatalog/model/filterSlice";
import menuReducer from "@/src/widgets/header/model/menuSlice";

export const appStore = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
    booking: bookingReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
