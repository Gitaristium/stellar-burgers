import { createSelector } from "reselect";

// детали заказа
const storeOrderDetails = (store) => store.constructorOrderDetails.item;

export const getConstructorOrderDetails = createSelector(
    storeOrderDetails,
    (data) => data
);
export const getConstructorOrderNumber = createSelector(
    storeOrderDetails,
    (data) => data.order.number
);

export const getConstructorOrderDetailsIsLoading = createSelector(
    (store) => store.constructorOrderDetails.status.loading,
    (data) => data
);

export const getConstructorOrderDetailsHasError = createSelector(
    (store) => store.constructorOrderDetails.status.error,
    (data) => data
);

export const getConstructorOrderDetailsRequestSuccess = createSelector(
    (store) => store.constructorOrderDetails.status.success,
    (data) => data
);
