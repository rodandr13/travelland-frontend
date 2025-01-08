import { createSelector } from "@reduxjs/toolkit";

import { TypeRootState } from "@/app/appStore";

export const selectBookingState = (state: TypeRootState) => state.booking;

export const selectBookingDetails = (state: TypeRootState) =>
  state.booking.details;

export const selectBookingDetailsById = (id: string) =>
  createSelector(selectBookingDetails, (details) => {
    return details[id] || null;
  });

export const selectExcursionIsEditing = (id: string) =>
  createSelector(selectBookingState, (booking) => booking.isEditing[id]);

export const selectVisibility = () =>
  createSelector(selectBookingState, (booking) => booking.visible);
