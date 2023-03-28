import { createAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export const ORDER_LIST_ADD = createAction(
  "ORDER_LIST_ADD",
  function prepare(api, item) {
    return {
      payload: {
        uuid: uuid(),
        details: api,
        content: item,
      },
    };
  }
);
