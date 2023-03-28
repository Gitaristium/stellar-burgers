import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { mobileReducer } from "./services/reducers/mobile";
import { ingredientsListReducer } from "./services/reducers/burger-ingredients";
import { constructorListReducer } from "./services/reducers/constructor-ingredients";
import { ingredientDetailsReducer } from "./services/reducers/ingredient-details";
import { orderListReducer } from "./services/reducers/orders-list";
import { orderDetailsReducer } from "./services/reducers/order-details";

const store = configureStore({
  reducer: {
    mobile: mobileReducer,
    ingredientsList: ingredientsListReducer,
    constructorList: constructorListReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
  },
  middleware: [thunk, logger],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
