import { configureStore } from "@reduxjs/toolkit";
import type {} from "redux-thunk/extend-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { mobileReducer } from "../reducers/mobile";
import { ingredientsListReducer } from "../reducers/burger-ingredients";
import { constructorListReducer } from "../reducers/constructor-ingredients";
import { ingredientDetailsReducer } from "../reducers/ingredient-details";
import { orderDetailsReducer } from "../reducers/order-details";

export const store = configureStore({
  reducer: {
    mobile: mobileReducer,
    ingredientsList: ingredientsListReducer,
    constructorList: constructorListReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
  },
  middleware: [thunk, logger],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;