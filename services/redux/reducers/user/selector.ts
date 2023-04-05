import { createDraftSafeSelector } from "@reduxjs/toolkit";

const selectSelf = (state) => state;

export const selectUserInfo = createDraftSafeSelector(
  selectSelf,
  (state) => state.user.data
)