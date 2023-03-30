import { useEffect, useLayoutEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "../../services/actions/mobile";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { MOBILE_BREAKPOINT } from "../../utils/vars";
import { getIsMobile } from "../../utils/selectors";

export default function App() {
  const isMobile: boolean = useAppSelector(getIsMobile);

  const dispatch = useAppDispatch();

  // меняем стор при проходждении брейкпойнта
  const resizeFunc = useCallback(() => {
    window.innerWidth <= MOBILE_BREAKPOINT && !isMobile
      ? dispatch(MOBILE_TURN_ON())
      : window.innerWidth > MOBILE_BREAKPOINT &&
        isMobile &&
        dispatch(MOBILE_TURN_OFF());
  }, [dispatch, isMobile]);

  // перед рендером надо узнать разрешение экрана
  useLayoutEffect(() => {
    resizeFunc();
  }, [resizeFunc]);

  // вешаем лисенер на ресайз
  useEffect(() => {
    window.addEventListener("resize", resizeFunc, { passive: true });

    // снимаем лисенер на ресайз
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  });

  return (
    <>
      <AppHeader />
      <main className={isMobile ? "pt-4 pl-4 pr-4" : "pt-10 pl-5 pr-5"}>
        {/* тут в последствии будет роут */}
        <div className="content two-columns">
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
    </>
  );
}
