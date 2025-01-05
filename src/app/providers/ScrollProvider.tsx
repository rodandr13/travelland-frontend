"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ScrollContextType {
  setRef: (node: HTMLDivElement | null) => void;
  node: HTMLDivElement | null;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    setNode(node);
  }, []);

  return (
    <ScrollContext.Provider value={{ setRef, node }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
