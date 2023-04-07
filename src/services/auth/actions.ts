import {
    AnyAction,
    Dispatch,
    createAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_RESET,
    AUTH_RESET_CONFIRM,
    AUTH_USER,
    AUTH_LOGOUT,
} from "../../utils/vars";
import { fetchWithRefresh, requestApi } from "../../utils/request-api";

const reducerName = "user";

// ================================
// ===== чекаем пользователя ======
// ================================
export const USER_CHECK_AUTH = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("accessToken") !== "undefined"
        ) {
            dispatch(USER_GET_INFO());
        } else {
            dispatch(USER_CHECKED());
        }
    };
};

// =========================================
// ===== маркер проверки пользователя ======
// =========================================
export const USER_CHECKED = createAction(`${reducerName}/user_checked`);

// =========================================
// ===== получаем данные пользователя ======
// =========================================
export const USER_GET_INFO = createAsyncThunk(
    `${reducerName}/get_info`,
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await fetchWithRefresh(AUTH_USER, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem("accessToken"),
            },
        });
        return response;
    }
);

// ======================================
// ===== регистрируем пользователя ======
// ======================================
export const USER_REGISTER = createAsyncThunk(
    `${reducerName}/register`,
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
    `${reducerName}/login`,
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

        return response;
    }
);

// ==================================================================================
// ====== ресет пароля - запрашиваем совпадение на сервере, пишем ответ в стор ======
// ==================================================================================
export const USER_RESET = createAsyncThunk(
    `${reducerName}/reset`,
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
    `${reducerName}/reset_confirm`,
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

// ===============================
// ===== логаут пользователя =====
// ===============================
export const USER_LOGOUT = createAsyncThunk(
    `${reducerName}/logout`,
    async () => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await requestApi(AUTH_LOGOUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });
        return response;
    }
);

// ======================================================================
// ====== отправка отредактированных данных пользователя на сервер ======
// ======================================================================
export const USER_UPDATE = createAsyncThunk(
    `${reducerName}/update`,
    async (bodySend: { name: string; email: string; password: string }) => {
        // Здесь только логика запроса и возврата данных
        // Никакой обработки ошибок
        const response = await fetchWithRefresh(AUTH_USER, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(bodySend),
        });
        return response;
    }
);
