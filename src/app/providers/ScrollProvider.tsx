"use client";

import { createContext, ReactNode, RefObject, useContext, useRef } from "react";

const ScrollContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  return (
    <ScrollContext.Provider value={targetRef}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  return useContext(ScrollContext);
};
