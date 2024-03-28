import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: {},
});

export type TypeRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
