import { createSelector } from "reselect";

// список всех игредиентов
const storeIngredientsList = (store) => store.ingredientsList.items;
export const getIngredientsList = createSelector(
    storeIngredientsList,
    (data) => data
);

// получаем игредиент из общего списка по id
export const getIngredientById = (id) =>
    createSelector(storeIngredientsList, (data) =>
        data.find((el) => el._id === id)
    );

// получаем массив картинок игредиент из общего списка по id
export const getImagesByIngredientId = (ids) =>
    createSelector(storeIngredientsList, (data) =>
        ids.map((id) => data.find((el) => el._id === id).image_mobile)
    );

export const getIngredientsIsLoading = createSelector(
    (store) => store.ingredientsList.status.loading,
    (data) => data
);

export const getIngredientsHasError = createSelector(
    (store) => store.ingredientsList.status.error,
    (data) => data
);

export const getIngredientsRequestSuccess = createSelector(
    (store) => store.ingredientsList.status.success,
    (data) => data
);
