"use client";

import { Provider } from "react-redux";
import { appStore } from "@/src/app/appStore";
import { ReactNode } from "react";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={appStore}>{children}</Provider>;
};
