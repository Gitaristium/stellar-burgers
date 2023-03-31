import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";

const reducerName = "orederDetails";

export const ORDER_DETAILS_REQUEST = createAsyncThunk(
  `${reducerName}/details_request`,
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (
    data: { URL: string; bodySend: { ingredients: string[] } },
    thunkAPI
  ) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const { URL, bodySend } = data;
    const response = await requestApi(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySend),
    });
    return response;
  }
);

export const ORDER_DETAILS_RESET = createAction(`${reducerName}/details_reset`);
