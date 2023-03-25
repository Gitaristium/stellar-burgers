import { useEffect, useLayoutEffect, useState, useReducer } from "react";
import Loading from "../loading/loading";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { requestApi } from "../../utils/request-api";
import { IngredientModel } from "../../utils/types";
import { IsMobileContext } from "../../services/ismobile-context";
import {
  IngredientsListContext,
  BurgerConstructorContext,
} from "../../services/ingredients-context";
import { OrderDetailsContext } from "../../services/order-details-context";
// import { curIngr, curBun } from "./utils/cur-ingredients";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: String,
    order: Object,
    success: String,
  });
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });

  //reducer для конструктора
  const initialState = {
    bun: null,
    ingr: [],
  };

  // функция-редьюсер
  // изменяет состояния в зависимости от типа переданного action
  const reducer = (
    state: { bun: IngredientModel; ingr: IngredientModel[] },
    action: any
  ) => {
    switch (action.type) {
      case "add":
        switch (action.payload.type) {
          case "bun":
            return (state = {
              ...state,
              bun: action.payload,
            });
          default:
            return (state = {
              ...state,
              ingr: [...state.ingr, action.payload],
            });
        }
      case "remove":
        switch (action.payload.type) {
          case "bun":
            return state;
          default:
            return (state = {
              ...state,
              ingr: state.ingr.filter((el) => el.uuid !== action.payload.uuid),
            });
        }
      case "reset":
        return initialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  };

  const [constructorState, updateConstructorState] = useReducer(
    reducer,
    initialState
  );

  const resizeFunc = () => {
    window.innerWidth <= 1150 ? setIsMobile(true) : setIsMobile(false);
  };

  // перед рендером надо узнать разрешение экрана
  useLayoutEffect(() => {
    resizeFunc();
  }, []);

  // вешаем лисенер на ресайз
  useEffect(() => {
    window.addEventListener("resize", resizeFunc, { passive: true });

    // снимаем лисенер на ресайз
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  });

  // получаем данные по API
  useEffect(() => {
    const getIngredients = () => {
      setState({ hasError: false, isLoading: true });
      requestApi("ingredients", null)
        .then((res) => {
          setIngredientsList(res.data);
          setState({ ...state, isLoading: false });
        })
        .catch((error) => {
          setState({ hasError: true, isLoading: false });
          console.log("ERROR: " + error);
        });
    };

    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* стандартная вилка рендера */}
      {state.isLoading && <Loading>Загрузка данных</Loading>}
      {state.hasError && <Loading>Ошибка загрузки Х_Х</Loading>}
      {!state.isLoading &&
        !state.hasError &&
        Object.keys(ingredientsList).length !== 0 && (
          <>
            <IsMobileContext.Provider value={isMobile}>
              <AppHeader />
              <main className={isMobile ? "pt-4 pl-2 pr-2" : "pt-10 pl-5 pr-5"}>
                {/* тут в последствии будет роут */}
                <div className="content two-columns">
                  <IngredientsListContext.Provider value={ingredientsList}>
                    <BurgerConstructorContext.Provider
                      value={[constructorState, updateConstructorState]}
                    >
                      <OrderDetailsContext.Provider
                        value={[orderDetails, setOrderDetails]}
                      >
                        <BurgerIngredients />
                        <BurgerConstructor />
                      </OrderDetailsContext.Provider>
                    </BurgerConstructorContext.Provider>
                  </IngredientsListContext.Provider>
                </div>
              </main>
            </IsMobileContext.Provider>
          </>
        )}
    </>
  );
}
