import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/src/widgets/header/model/menuSlice";
import filterReducer from "@/src/features/excursion/excursionFilter/model/filtetSlice";

export const appStore = configureStore({
  reducer: {
    menu: menuReducer,
    filter: filterReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
