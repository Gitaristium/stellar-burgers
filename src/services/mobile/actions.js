import { createAction } from "@reduxjs/toolkit";

const reducerName = "mobile";

// глобальненько на всё приложение
export const MOBILE_TURN_ON = createAction(`${reducerName}/turn_on`);
export const MOBILE_TURN_OFF = createAction(`${reducerName}/turn_off`);
