import { TypeRootState } from "@/src/app/appStore";

export const selectCart = (state: TypeRootState) => state.cart;

export const selectItemById = (state: TypeRootState, id: string) =>
  state.cart.items.find((item) => item.id === id);
