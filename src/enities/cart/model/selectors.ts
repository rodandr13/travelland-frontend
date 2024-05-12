import { createSelector } from "reselect";

import { TypeRootState } from "@/src/app/appStore";

export const selectCartState = (state: TypeRootState) => state.cart;

export const selectCart = createSelector([selectCartState], (cart) => cart);

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const getTotalQuantity = createSelector(
  [selectCartState],
  (cart) => cart.totalQuantity
);

export const getTotalPrice = createSelector(
  [selectCartState],
  (cart) => cart.totalPrice
);

export const selectCartItemExists = (key: string) =>
  createSelector([selectCartState], (cart) =>
    Boolean(cart.items && cart.items[key])
  );
