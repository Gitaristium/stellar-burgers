import { createReducer } from "@reduxjs/toolkit";
import { DETAILS_ADD, DETAILS_RESET } from "./actions";

export const ingredientDetailsReducer = createReducer(null, (builder) => {
  builder
    .addCase(DETAILS_ADD, (state, action) => action.payload)
    .addCase(DETAILS_RESET, () => null)
    .addDefaultCase((state) => state);
});
