import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_RESET,
  AUTH_RESET_CONFIRM,
} from "../../utils/vars";
import { requestApi } from "../../utils/request-api";

const reducerName = "user";

// ======================================
// ===== регистрируем пользователя ======
// ======================================

export const USER_REGISTER = createAsyncThunk(
  `${reducerName}/user_register`,
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (bodySend: { email: string; password: string; name: string }) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const response = await requestApi(AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySend),
    });
    return response;
  }
);

// ====================================
// ===== авторизация пользователя =====
// ====================================

export const USER_LOGIN = createAsyncThunk(
  `${reducerName}/user_login`,
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (bodySend: { email: string; password: string }) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const response = await requestApi(AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySend),
    });

    console.log(response);

    return response;
  }
);

// ==================================================================================
// ====== ресет пароля - запрашиваем совпадение на сервере, пишем ответ в стор ======
// ==================================================================================

export const USER_RESET = createAsyncThunk(
  `${reducerName}/user_reset`,
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (bodySend: { email: string }) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const response = await requestApi(AUTH_RESET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySend),
    });
    return response;
  }
);

// ========================================================================
// ===== ресет пароля - отправка нового пароля пользователя на сервер =====
// ========================================================================

export const USER_RESET_CONFIRM = createAsyncThunk(
  `${reducerName}/user_reset_confirm`,
  // отображается в dev tools и должно быть уникально у каждого Thunk
  async (bodySend: { password: string; token: string }) => {
    // Здесь только логика запроса и возврата данных
    // Никакой обработки ошибок
    const response = await requestApi(AUTH_RESET_CONFIRM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySend),
    });
    return response;
  }
);

export const USER_LOGOUT = createAction(`${reducerName}/user_logout`);
