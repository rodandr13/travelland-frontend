import { createSelector } from "reselect";
import { TypeRootState } from "@/src/app/appStore";

export const selectCartState = (state: TypeRootState) => state.cart;

export const getCartItems = (key: string) =>
  createSelector([selectCartState], (cart) => cart.totalPrice);

export const selectCartItemExists = (key: string) =>
  createSelector([selectCartState], (cart) => Boolean(cart.items[key]));
