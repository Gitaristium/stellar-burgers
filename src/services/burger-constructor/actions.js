import { createAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const reducerName = "burgerConstructor";

export const INGREDIENT_ADD = createAction(
    `${reducerName}/add`,
    function prepare(item) {
        return {
            payload: {
                ...item,
                uuid: uuid(),
            },
        };
    }
);

export const INGREDIENT_REMOVE = createAction(
    `${reducerName}/remove`,
    function prepare(item) {
        return {
            payload: {
                ...item,
            },
        };
    }
);

export const INGREDIENTS_RESET = createAction(
    `${reducerName}/ingredients_reset`
);

export const INGREDIENT_MOVE = createAction(
    `${reducerName}/move`,
    function prepare(fromIndex, toIndex) {
        return {
            payload: {
                fromIndex,
                toIndex,
            },
        };
    }
);
