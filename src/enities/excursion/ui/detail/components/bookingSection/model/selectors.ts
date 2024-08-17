import { createSelector } from "reselect";

import { TypeRootState } from "@/src/app/appStore";

export const selectBookingState = (state: TypeRootState) => state.booking;

export const selectVisibility = createSelector(
  [selectBookingState],
  (bookingState) => bookingState.visible
);

export const selectDetailsByKey = (key: string) =>
  createSelector(
    [selectBookingState],
    (bookingState) => bookingState.details[key]
  );

export const selectExcursionIsEditing = (key: string) =>
  createSelector(
    [selectBookingState],
    (bookingState) => bookingState.isEditing[key]
  );

export const selectParticipantsByKey = (key: string) =>
  createSelector([selectDetailsByKey(key)], (details) =>
    details ? details.participants : []
  );

export const selectTimeByKey = (key: string) =>
  createSelector([selectDetailsByKey(key)], (details) =>
    details ? details.selectedTime : null
  );

export const selectDateByKey = (key: string) =>
  createSelector([selectDetailsByKey(key)], (details) =>
    details ? details.selectedDate : null
  );

export const selectPricesByKey = (key: string) =>
  createSelector([selectDetailsByKey(key)], (details) =>
    details ? details.participants : null
  );
