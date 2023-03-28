import { createReducer } from "@reduxjs/toolkit";
import {
  ORDER_DETAILS_ADD,
  ORDER_DETAILS_RESET,
} from "../actions/order-details";

const initialState = {
  details: {
    name: "",
    order: {},
    success: "",
  },
  content: {
    bun: {},
    ingr: [],
  },
};

export const orderDetailsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ORDER_DETAILS_ADD, (state, action) => action.payload)
    .addCase(ORDER_DETAILS_RESET, (state, action) => initialState)
    .addDefaultCase((state, action) => state);
});
