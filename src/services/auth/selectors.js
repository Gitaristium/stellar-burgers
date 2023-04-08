import { createSelector } from "reselect";

// ==========================
// ===== маркер запроса =====
// ==========================
export const getIsAuthChecked = createSelector(
    (store) => store.user.isAuthChecked,
    (data) => data
);

// =========================================
// ===== статус запроса пользотвателя =====
// =========================================
export const getUserGetInfoIsLoading = createSelector(
    (store) => store.user.status.get_info.loading,
    (data) => data
);
export const getUserGetInfoHasError = createSelector(
    (store) => store.user.status.get_info.error,
    (data) => data
);
export const getUserGetInfoRequestSuccess = createSelector(
    (store) => store.user.status.get_info.success,
    (data) => data
);

// =========================================
// ===== статус запроса на регистрацию =====
// =========================================
export const getUserRegisterIsLoading = createSelector(
    (store) => store.user.status.register.loading,
    (data) => data
);
export const getUserRegisterHasError = createSelector(
    (store) => store.user.status.register.error,
    (data) => data
);
export const getUserRegisterRequestSuccess = createSelector(
    (store) => store.user.status.register.success,
    (data) => data
);

// =========================================
// ===== статус запроса на авторизацию =====
// =========================================
export const getUserLoginIsLoading = createSelector(
    (store) => store.user.status.login.loading,
    (data) => data
);
export const getUserLoginHasError = createSelector(
    (store) => store.user.status.login.error,
    (data) => data
);
export const getUserLoginRequestSuccess = createSelector(
    (store) => store.user.status.login.success,
    (data) => data
);

// ====================================================
// ===== статус запроса на восстановаление пароля =====
// ====================================================
export const getUserResetIsLoading = createSelector(
    (store) => store.user.status.reset.loading,
    (data) => data
);
export const getUserResetHasError = createSelector(
    (store) => store.user.status.reset.error,
    (data) => data
);
export const getUserResetRequestSuccess = createSelector(
    (store) => store.user.status.reset.success,
    (data) => data
);

// ==================================================
// ===== статус запроса на запись нового пароля =====
// ==================================================
export const getUserResetConfirmIsLoading = createSelector(
    (store) => store.user.status.reset_confirm.loading,
    (data) => data
);
export const getUserResetConfirmHasError = createSelector(
    (store) => store.user.status.reset_confirm.error,
    (data) => data
);
export const getUserResetConfirmRequestSuccess = createSelector(
    (store) => store.user.status.reset_confirm.success,
    (data) => data
);

// ============================================================
// ===== статус запроса на обновление данных пользователя =====
// ============================================================
export const getUserUpdateIsLoading = createSelector(
    (store) => store.user.status.update.loading,
    (data) => data
);
export const getUserUpdateHasError = createSelector(
    (store) => store.user.status.update.error,
    (data) => data
);
export const getUserUpdateRequestSuccess = createSelector(
    (store) => store.user.status.update.success,
    (data) => data
);

// =======================================================================
// ===== получение данных пользователя из стора для страницы профиля =====
// =======================================================================
export const getUser = createSelector(
    (store) => store.user.user,
    (data) => data
);
export const getUserName = createSelector(
    (store) => store.user.user?.name,
    (data) => data
);
export const getUserEmail = createSelector(
    (store) => store.user.user?.email,
    (data) => data
);
