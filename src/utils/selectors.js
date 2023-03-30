// общие
export const getIsMobile = (store) => store.mobile;

// список всех игредиентов
export const getIngredientsList = (store) => store.ingredientsList.items;
export const getIngredientsIsLoading = (store) =>
  store.ingredientsList.status.loading;
export const getIngredientsHasError = (store) =>
  store.ingredientsList.status.error;
export const getIngredientsRequestSuccess = (store) =>
  store.ingredientsList.status.success;
export const getIngredientDetails = (store) => store.ingredientDetails;

// список конструктора
export const getСonstructorList = (store) => store.constructorList;

// детали заказа
export const getOrderNumber = (store) => store.orderDetails.item.order.number;
export const getOrderDetails = (store) => store.orderDetails.item;
export const getOrderDetailsIsLoading = (store) =>
  store.orderDetails.status.loading;
export const getOrderDetailsHasError = (store) =>
  store.orderDetails.status.error;
export const getOrderDetailsRequestSuccess = (store) =>
  store.orderDetails.status.success;
