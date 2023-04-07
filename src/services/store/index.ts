import { configureStore } from "@reduxjs/toolkit";
import type {} from "redux-thunk/extend-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { mobileReducer } from "../mobile/reducer";
import { ingredientsListReducer } from "../ingredients-list/reducer";
import { burgerConstructorReducer } from "../burger-constructor/reducer";
import { orderDetailsReducer } from "../order-details/reducer";
import { userReducer } from "../auth/reducer";

export const store = configureStore({
    reducer: {
        mobile: mobileReducer,
        ingredientsList: ingredientsListReducer,
        constructorList: burgerConstructorReducer,
        orderDetails: orderDetailsReducer,
        user: userReducer,
    },
    middleware: [thunk, logger],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
