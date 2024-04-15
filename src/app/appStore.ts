import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/src/widgets/header/model/menuSlice";
import filterReducer from "@/src/features/excursion/excursionFilter/model/filtetSlice";
import bookingReducer from "@/src/enities/excursion/ui/excursionDetail/ui/bookingSection/model/bookingSlice";

export const appStore = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
    booking: bookingReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
