import { createReducer } from "@reduxjs/toolkit";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "../actions/mobile";

export const mobileReducer = createReducer(false, (builder) => {
  builder
    .addCase(MOBILE_TURN_ON, (state, action) => true)
    .addCase(MOBILE_TURN_OFF, (state, action) => false)
    .addDefaultCase((state, action) => state);
});
