import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestApi } from "../../utils/request-api";

const reducerName = "ingredientsList";

export const INGREDIENTS_REQEST = createAsyncThunk(
    `${reducerName}/request`,
    async (URL: string, thunkAPI) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(URL, null);
        return response.data;
    }
);
