import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";

export const INGREDIENTS_REQEST = createAsyncThunk(
  "INGREDIENTS_REQEST",
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (URL: string, thunkAPI) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const response = await requestApi(URL, null);
    return response.data;
  }
);
