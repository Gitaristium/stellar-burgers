import { createAction } from "@reduxjs/toolkit";

const reducerName = "ingredientDetails";

export const DETAILS_ADD = createAction(
  `${reducerName}/ingredient_add`,
  function prepare(item) {
    return {
      payload: {
        ...item,
      },
    };
  }
);
export const DETAILS_RESET = createAction(`${reducerName}/ingredient_reset`);
