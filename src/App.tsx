import { useEffect, useLayoutEffect, useState } from "react";
import Loading from "./components/loading/loading";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import { NORMA_API } from "./utils/burger-api";
import { checkReponse } from "./utils/check-reponse";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });

  // перед рендером надо узнать разрешение экрана
  useLayoutEffect(() => {
    window.innerWidth <= 1150 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  // вешаем лисенер на ресайз
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 1150 ? setIsMobile(true) : setIsMobile(false);
    });

    // снимаем лисенер на ресайз
    return () => {
      window.removeEventListener("resize", () => {
        window.innerWidth <= 1150 ? setIsMobile(true) : setIsMobile(false);
      });
    };
  });

  // получаем данные по API
  useEffect(() => {
    const getIngredients = async () => {
      setState({ hasError: false, isLoading: true });
      fetch(`${NORMA_API}/ingredients`)
        .then(checkReponse)
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
            <AppHeader isMobile={isMobile} />
            <main className={isMobile ? "pt-4 pl-2 pr-2" : "pt-10 pl-5 pr-5"}>
              {/* тут в последствии будет роут */}
              <div className="content two-columns">
                <BurgerIngredients
                  isMobile={isMobile}
                  ingredientsList={ingredientsList}
                />
                <BurgerConstructor isMobile={isMobile} />
              </div>
            </main>
          </>
        )}
    </>
  );
}
