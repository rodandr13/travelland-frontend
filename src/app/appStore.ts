import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/src/widgets/header/model/menuSlice";

export const appStore = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
