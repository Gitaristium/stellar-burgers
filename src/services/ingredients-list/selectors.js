import { createSelector } from "reselect";

// список всех игредиентов
const storeIngredientsList = (store) => store.ingredientsList.items;
export const getIngredientsList = createSelector(
  storeIngredientsList,
  (data) => data
);

const storeIngredientsIsLoading = (store) =>
  store.ingredientsList.status.loading;
export const getIngredientsIsLoading = createSelector(
  storeIngredientsIsLoading,
  (data) => data
);

const storeIngredientsHasError = (store) => store.ingredientsList.status.error;
export const getIngredientsHasError = createSelector(
  storeIngredientsHasError,
  (data) => data
);

const storeIngredientsRequestSuccess = (store) =>
  store.ingredientsList.status.success;
export const getIngredientsRequestSuccess = createSelector(
  storeIngredientsRequestSuccess,
  (data) => data
);
