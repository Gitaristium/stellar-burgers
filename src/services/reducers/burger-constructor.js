import { createReducer } from "@reduxjs/toolkit";
import {
  INGREDIENT_ADD,
  INGREDIENT_REMOVE,
  INGREDIENTS_RESET,
  INGREDIENT_MOVE,
} from "../actions/burger-constructor";
// import { IngredientModel } from "../../utils/types";

const initialState = {
  bun: null,
  ingr: [],
};

export const burgerConstructorReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(INGREDIENTS_RESET, () => initialState)
      .addCase(INGREDIENT_MOVE, (state, action) => {
        state.ingr.splice(
          action.payload.toIndex,
          0,
          state.ingr.splice(action.payload.fromIndex, 1)[0]
        );
      })
      .addMatcher(
        (action) =>
          action.type === INGREDIENT_ADD.type && action.payload.type === "bun",
        (state, action) => ({ ...state, bun: action.payload })
      )
      .addMatcher(
        (action) =>
          action.type === INGREDIENT_ADD.type && action.payload.type !== "bun",
        (state, action) => ({ ...state, ingr: [...state.ingr, action.payload] })
      )
      .addMatcher(
        (action) =>
          action.type === INGREDIENT_REMOVE.type &&
          action.payload.type === "bun",
        (state) => state
      )
      .addMatcher(
        (action) =>
          action.type === INGREDIENT_REMOVE.type &&
          action.payload.type !== "bun",
        (state, action) => ({
          ...state,
          ingr: state.ingr.filter((el) => el.uuid !== action.payload.uuid),
        })
      )
      .addDefaultCase((state) => state);
  }
);
