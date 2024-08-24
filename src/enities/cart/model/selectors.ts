import { createSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/src/app/appStore";
import { CartItem } from "@/src/shared/types/cart";

export const selectCart = (state: TypeRootState) => state.cart;

export const selectItemById = createSelector(
  [selectCart, (_: TypeRootState, id: string) => id],
  (cart, id): CartItem | undefined => cart.items.find((item) => item.id === id)
);

export const itemExists = createSelector(
  [selectCart, (_: TypeRootState, id: string) => id],
  (cart, id): boolean => cart.items.some((item) => item.id === id)
);
