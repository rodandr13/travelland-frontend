import { createSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/src/app/appStore";

export const selectCart = (state: TypeRootState) => state.cart;

export const selectCartData = (state: TypeRootState) => state.cart.data;

export const selectIsItemInCart = (id: string) =>
  createSelector(selectCartData, (cartData) => {
    return (
      cartData?.cart_items?.some((item) => item.service_id === id) ?? false
    );
  });

export const selectItemById = (id: string) =>
  createSelector(selectCartData, (cartData) => {
    return cartData?.cart_items?.find((item) => item.service_id === id) ?? null;
  });
