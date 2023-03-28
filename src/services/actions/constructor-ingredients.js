import { createAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export const INGREDIENTS_ADD = createAction(
  "INGREDIENTS_ADD",
  function prepare(item) {
    return {
      payload: {
        ...item,
        uuid: uuid(),
      },
    };
  }
);

export const INGREDIENTS_REMOVE = createAction(
  "INGREDIENTS_REMOVE",
  function prepare(item) {
    return {
      payload: {
        ...item,
      },
    };
  }
);

export const INGREDIENTS_RESET = createAction("INGREDIENTS_RESET");

export const INGREDIENTS_MOVE = createAction(
  "INGREDIENTS_MOVE",
  function prepare(fromIndex, toIndex) {
    return {
      payload: {
        fromIndex,
        toIndex,
      },
    };
  }
);
