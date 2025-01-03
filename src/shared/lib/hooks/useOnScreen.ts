import { RefObject, useEffect, useState } from "react";

export const useOnScreen = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  rootMargin = "0px"
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: 0.2,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
