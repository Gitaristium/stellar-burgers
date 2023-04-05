import { createSelector } from "reselect";

// ==========================
// ===== маркер запроса =====
// ==========================
const storeIsAuthChecked = (store) => store.user.status.isAuthChecked;
export const getIsAuthChecked = createSelector(
  storeIsAuthChecked,
  (data) => data
);

// =========================================
// ===== статус запроса на регистрацию =====
// =========================================
const storeUserRegisterIsLoading = (store) =>
  store.user.status.register.loading;
export const getUserRegisterIsLoading = createSelector(
  storeUserRegisterIsLoading,
  (data) => data
);
const storeUserRegisterHasError = (store) => store.user.status.register.error;
export const getUserRegisterHasError = createSelector(
  storeUserRegisterHasError,
  (data) => data
);
const storeUserRegisterRequestSuccess = (store) =>
  store.user.status.register.success;
export const getUserRegisterRequestSuccess = createSelector(
  storeUserRegisterRequestSuccess,
  (data) => data
);

// =========================================
// ===== статус запроса на авторизацию =====
// =========================================
const storeUserLoginIsLoading = (store) => store.user.status.login.loading;
export const getUserLoginIsLoading = createSelector(
  storeUserLoginIsLoading,
  (data) => data
);
const storeUserLoginHasError = (store) => store.user.status.login.error;
export const getUserLoginHasError = createSelector(
  storeUserLoginHasError,
  (data) => data
);
const storeUserLoginRequestSuccess = (store) => store.user.status.login.success;
export const getUserLoginRequestSuccess = createSelector(
  storeUserLoginRequestSuccess,
  (data) => data
);

// ====================================================
// ===== статус запроса на восстановаление пароля =====
// ====================================================
const storeUserResetIsLoading = (store) => store.user.status.reset.loading;
export const getUserResetIsLoading = createSelector(
  storeUserResetIsLoading,
  (data) => data
);
const storeUserResetHasError = (store) => store.user.status.reset.error;
export const getUserResetHasError = createSelector(
  storeUserResetHasError,
  (data) => data
);
const storeUserResetRequestSuccess = (store) => store.user.status.reset.success;
export const getUserResetRequestSuccess = createSelector(
  storeUserResetRequestSuccess,
  (data) => data
);

// ==================================================
// ===== статус запроса на запись нового пароля =====
// ==================================================
const storeUserResetConfirmIsLoading = (store) =>
  store.user.status.reset_confirm.loading;
export const getUserResetConfirmIsLoading = createSelector(
  storeUserResetConfirmIsLoading,
  (data) => data
);
const storeUserResetConfirmHasError = (store) =>
  store.user.status.reset_confirm.error;
export const getUserResetConfirmHasError = createSelector(
  storeUserResetConfirmHasError,
  (data) => data
);
const storeUserResetConfirmRequestSuccess = (store) =>
  store.user.status.reset_confirm.success;
export const getUserResetConfirmRequestSuccess = createSelector(
  storeUserResetConfirmRequestSuccess,
  (data) => data
);

// =============================================================
// ===== плучение данный пользователя для страницы профиля =====
// =============================================================
const storeUserName = (store) => store.user.user.name;
export const getUserName = createSelector(storeUserName, (data) => data);
const storeUserEmail = (store) => store.user.user.email;
export const getUserEmail = createSelector(storeUserEmail, (data) => data);
