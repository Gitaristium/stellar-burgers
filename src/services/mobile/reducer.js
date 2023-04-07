import { createReducer } from "@reduxjs/toolkit";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "./actions";

export const mobileReducer = createReducer(false, (builder) => {
    builder
        .addCase(MOBILE_TURN_ON, () => true)
        .addCase(MOBILE_TURN_OFF, () => false)
        .addDefaultCase((state) => state);
});
