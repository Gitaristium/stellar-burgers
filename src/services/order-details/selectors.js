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

export const getOrderDetailsIsLoading = createSelector(
    (store) => store.orderDetails.status.loading,
    (data) => data
);

export const getOrderDetailsHasError = createSelector(
    (store) => store.orderDetails.status.error,
    (data) => data
);

export const getOrderDetailsRequestSuccess = createSelector(
    (store) => store.orderDetails.status.success,
    (data) => data
);
