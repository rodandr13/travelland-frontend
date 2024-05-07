import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/src/widgets/header/model/menuSlice";
import filterReducer from "@/src/features/excursion/excursionFilter/model/filtetSlice";
import bookingReducer from "@/src/enities/excursion/ui/excursionDetail/ui/bookingSection/model/bookingSlice";
import basketReducer from "@/src/enities/basket/model/basketSlice";

export const appStore = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
    booking: bookingReducer,
    basket: basketReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
