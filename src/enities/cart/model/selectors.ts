import { TypeRootState } from "@/src/app/appStore";
import { CartItem } from "@/src/shared/types/cart";

export const selectCart = (state: TypeRootState) => state.cart;

export const selectItemById = (
  state: TypeRootState,
  id: string
): CartItem | undefined => state.cart.items.find((item) => item.id === id);

export const itemExists = (state: TypeRootState, id: string): boolean =>
  state.cart.items.some((item) => item.id === id);
