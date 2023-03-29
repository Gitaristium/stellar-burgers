import { createReducer } from "@reduxjs/toolkit";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
} from "../actions/order-details";

const initialState = {
  item: {
    status: "",
    name: "",
    order: {
      number: "",
    },
  },
  status: {
    loading: false,
    error: false,
    success: false,
  },
};

export const orderDetailsReducer = createReducer(initialState, (builder) => {
  builder
    // Вызывается прямо перед выполнением запроса
    .addCase(ORDER_DETAILS_REQUEST.pending, (state) => ({
      ...state,
      status: {
        loading: true,
        error: false,
        success: false,
      },
    }))
    // Вызывается в том случае если запрос успешно выполнился
    .addCase(ORDER_DETAILS_REQUEST.fulfilled, (state, action) => ({
      // Добавляем пользователя
      item: action.payload,
      status: {
        loading: false,
        error: false,
        success: true,
      },
    }))
    // Вызывается в случае ошибки
    .addCase(ORDER_DETAILS_REQUEST.rejected, (state) => ({
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
      ...state,
      status: {
        loading: false,
        error: true,
        success: false,
      },
    }))
    .addCase(ORDER_DETAILS_RESET, () => initialState)
    .addDefaultCase((state) => state);
});
