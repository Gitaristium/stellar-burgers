import { createAction } from "@reduxjs/toolkit";

export const DETAILS_ADD = createAction("DETAILS_ADD", function prepare(item) {
  return {
    payload: {
      ...item,
    },
  };
});
export const DETAILS_RESET = createAction("DETAILS_RESET");
