import { createAction } from "@reduxjs/toolkit";

export const ORDER_DETAILS_ADD = createAction(
  "ORDER_DETAILS_ADD",
  function prepare(api, item) {
    return {
      payload: {
        details: api,
        content: item,
      },
    };
  }
);
export const ORDER_DETAILS_RESET = createAction("DETAILS_RESET");
