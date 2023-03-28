import { createReducer } from "@reduxjs/toolkit";
import { ORDER_LIST_ADD } from "../actions/orders-list";

const initialState = [];

export const orderListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ORDER_LIST_ADD, (state, action) => {
      return [...state, action.payload];
    })
    .addDefaultCase((state, action) => state);
});
