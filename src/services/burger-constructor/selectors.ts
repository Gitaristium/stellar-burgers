import { createSelector } from "@reduxjs/toolkit";
import { TConstructor, TIngredient, TIngredientsList } from "../../utils/types";
import { RootState } from "../store/hooks";

// список конструктора
const selectors = (store: RootState): TIngredient => store.constructorList.bun;

const storeConstructorIngr = (store: RootState): TIngredientsList =>
    store.constructorList.ingr;

export const getСonstructorList = createSelector(
    selectors,
    storeConstructorIngr,
    (bun, ingr): TConstructor => ({
        bun,
        ingr,
    })
);

export const getTotalPrice = createSelector(
    selectors,
    storeConstructorIngr,
    (bun, ingr): number => {
        return (
            (bun ? bun.price * 2 : 0) +
            ingr.reduce((acc, elem): number => acc + elem.price, 0)
        );
    }
);
