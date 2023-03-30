import { createReducer } from "@reduxjs/toolkit";
import {
  INGREDIENTS_ADD,
  INGREDIENTS_REMOVE,
  INGREDIENTS_RESET,
  INGREDIENTS_MOVE,
} from "../actions/constructor-ingredients";
// import { IngredientModel } from "../../utils/types";

const initialState = {
  bun: null,
  ingr: [],
};

export const constructorListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(INGREDIENTS_RESET, () => initialState)
    .addCase(INGREDIENTS_MOVE, (state, action) => {
      state.ingr.splice(
        action.payload.toIndex,
        0,
        state.ingr.splice(action.payload.fromIndex, 1)[0]
      );
    })
    .addMatcher(
      (action) =>
        action.type === INGREDIENTS_ADD.type && action.payload.type === "bun",
      (state, action) => ({ ...state, bun: action.payload })
    )
    .addMatcher(
      (action) =>
        action.type === INGREDIENTS_ADD.type && action.payload.type !== "bun",
      (state, action) => ({ ...state, ingr: [...state.ingr, action.payload] })
    )
    .addMatcher(
      (action) =>
        action.type === INGREDIENTS_REMOVE.type &&
        action.payload.type === "bun",
      (state) => state
    )
    .addMatcher(
      (action) =>
        action.type === INGREDIENTS_REMOVE.type &&
        action.payload.type !== "bun",
      (state, action) => ({
        ...state,
        ingr: state.ingr.filter((el) => el.uuid !== action.payload.uuid),
      })
    )
    .addDefaultCase((state) => state);
});
