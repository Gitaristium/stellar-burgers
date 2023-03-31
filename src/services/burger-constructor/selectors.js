import { createSelector } from "reselect";

// список конструктора
const storeConstructorBun = (store) => store.constructorList.bun;
const storeConstructorIngr = (store) => store.constructorList.ingr;

export const getСonstructorList = createSelector(
  storeConstructorBun,
  storeConstructorIngr,
  (bun, ingr) => ({
    bun,
    ingr,
  })
);

export const getTotalPrice = createSelector(
  storeConstructorBun,
  storeConstructorIngr,
  (bun, ingr) => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingr.reduce((acc, elem) => acc + elem.price, 0)
    );
  }
);
