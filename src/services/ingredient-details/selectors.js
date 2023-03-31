import { createSelector } from "reselect";

// детали ингредиента
export const storeIngredientDetails = (store) => store.ingredientDetails;

export const getIngredientDetails = createSelector(
  storeIngredientDetails,
  (data) => data
);
