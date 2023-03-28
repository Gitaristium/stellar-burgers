import { createReducer } from "@reduxjs/toolkit";
import { INGREDIENTS_LOAD } from "../actions/burger-ingredients";
// import { IngredientModel } from "../../utils/types";

export const ingredientsListReducer = createReducer([], (builder) => {
  builder
    .addCase(INGREDIENTS_LOAD, (state, action) => action.payload)
    .addDefaultCase((state, action) => state);
});
