import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";
import { ORDERS } from "../../utils/vars";
import { INGREDIENTS_RESET } from "../burger-constructor/actions";

const reducerName = "orderDetails";

export const ORDER_DETAILS_REQUEST = createAsyncThunk(
  `${reducerName}/details_request`,
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (data: { ingredients: string[] }, { dispatch }) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const response = await requestApi(ORDERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response) dispatch(INGREDIENTS_RESET());
    return response;
  }
);

export const ORDER_DETAILS_RESET = createAction(`${reducerName}/details_reset`);
