import { createReducer } from "@reduxjs/toolkit";
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_RESET,
  USER_RESET_CONFIRM,
} from "./actions";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  isAuthChecked: false,
  status: {
    register: {
      loading: false,
      error: false,
      success: false,
    },
    login: {
      loading: false,
      error: false,
      success: false,
    },
    reset: {
      loading: false,
      error: false,
      success: false,
    },
    reset_confirm: {
      loading: false,
      error: false,
      success: false,
    },
  },
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // ======================================
    // ===== регистрируем пользователя ======
    // ======================================

    // Вызывается прямо перед выполнением запроса
    .addCase(USER_REGISTER.pending, (state) => ({
      ...state,
      isAuthChecked: true,
      status: {
        ...state.status,
        register: {
          loading: true,
          error: false,
          success: false,
        },
      },
    }))
    // Вызывается в том случае если запрос успешно выполнился
    .addCase(USER_REGISTER.fulfilled, (state, action) => {
      // пишем токены в localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        // Добавляем пользователя
        ...state,
        user: action.payload.user,
        status: {
          ...state.status,
          register: {
            loading: false,
            error: false,
            success: true,
          },
        },
      };
    })
    // Вызывается в случае ошибки
    .addCase(USER_REGISTER.rejected, (state) => ({
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
      ...state,
      status: {
        ...state.status,
        register: {
          loading: false,
          error: true,
          success: false,
        },
      },
    }))

    // ==================================================================================
    // ====== ресет пароля - запрашиваем совпадение на сервере, пишем ответ в стор ======
    // ==================================================================================

    // Вызывается прямо перед выполнением запроса
    .addCase(USER_RESET.pending, (state) => ({
      ...state,
      isAuthChecked: false,
      status: {
        ...state.status,
        reset: {
          loading: true,
          error: false,
          success: false,
        },
      },
    }))
    // Вызывается в том случае если запрос успешно выполнился
    .addCase(USER_RESET.fulfilled, (state, action) => ({
      ...state,
      status: {
        ...state.status,
        reset: {
          loading: false,
          error: false,
          success: true,
        },
      },
    }))
    // Вызывается в случае ошибки
    .addCase(USER_RESET.rejected, (state) => ({
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
      ...state,
      status: {
        ...state.status,
        reset: {
          loading: false,
          error: true,
          success: false,
        },
      },
    }))

    // ====================================
    // ===== авторизация пользователя =====
    // ====================================

    // Вызывается прямо перед выполнением запроса
    .addCase(USER_LOGIN.pending, (state) => ({
      ...state,
      isAuthChecked: true,
      status: {
        ...state.status,
        login: {
          loading: true,
          error: false,
          success: false,
        },
      },
    }))
    // Вызывается в том случае если запрос успешно выполнился
    .addCase(USER_LOGIN.fulfilled, (state, action) => {
      // пишем токены в localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        // Добавляем пользователя
        ...state,
        user: action.payload.user,
        status: {
          ...state.status,
          login: {
            loading: false,
            error: false,
            success: true,
          },
        },
      };
    })
    // Вызывается в случае ошибки
    .addCase(USER_LOGIN.rejected, (state) => ({
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
      ...state,
      login: {
        ...state.status,
        reset: {
          loading: false,
          error: true,
          success: false,
        },
      },
    }))

    // ========================================================================
    // ===== ресет пароля - отправка нового пароля пользователя на сервер =====
    // ========================================================================

    // Вызывается прямо перед выполнением запроса
    .addCase(USER_RESET_CONFIRM.pending, (state) => ({
      ...state,
      isAuthChecked: true,
      status: {
        ...state.status,
        reset_confirm: {
          loading: true,
          error: false,
          success: false,
        },
      },
    }))
    // Вызывается в том случае если запрос успешно выполнился
    .addCase(USER_RESET_CONFIRM.fulfilled, (state, action) => ({
      ...state,
      status: {
        ...state.status,
        reset_confirm: {
          loading: false,
          error: false,
          success: true,
        },
      },
    }))
    // Вызывается в случае ошибки
    .addCase(USER_RESET_CONFIRM.rejected, (state) => ({
      // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
      ...state,
      status: {
        ...state.status,
        reset_confirm: {
          loading: false,
          error: true,
          success: false,
        },
      },
    }))

    .addCase(USER_LOGIN, () => initialState)
    .addCase(USER_LOGOUT, () => initialState)
    .addDefaultCase((state) => state);
});
