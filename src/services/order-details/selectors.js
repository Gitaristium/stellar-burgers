import { createSelector } from "reselect";

// детали заказа
const storeOrderDetails = (store) => store.orderDetails.item;

export const getOrderDetails = createSelector(
  storeOrderDetails,
  (data) => data
);
export const getOrderNumber = createSelector(
  storeOrderDetails,
  (data) => data.order.number
);

const storeOrderDetailsIsLoading = (store) => store.orderDetails.status.loading;
export const getOrderDetailsIsLoading = createSelector(
  storeOrderDetailsIsLoading,
  (data) => data
);

const storeOrderDetailsHasError = (store) => store.orderDetails.status.error;
export const getOrderDetailsHasError = createSelector(
  storeOrderDetailsHasError,
  (data) => data
);

const storeOrderDetailsRequestSuccess = (store) =>
  store.orderDetails.status.success;
export const getOrderDetailsRequestSuccess = createSelector(
  storeOrderDetailsRequestSuccess,
  (data) => data
);
