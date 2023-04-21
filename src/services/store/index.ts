import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { userReducer } from "../auth/reducer";
import { burgerConstructorReducer } from "../burger-constructor/reducer";
import { constructorOrderDetailsReducer } from "../constructor-order-details/reducer";
import { ingredientsListReducer } from "../ingredients-list/reducer";
import { mobileReducer } from "../mobile/reducer";

export const rootReducer = combineReducers({
    mobile: mobileReducer,
    ingredientsList: ingredientsListReducer,
    constructorList: burgerConstructorReducer,
    constructorOrderDetails: constructorOrderDetailsReducer,
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    // middleware: [thunk, logger],
    middleware: [thunk],
});
