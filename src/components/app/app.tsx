import { useEffect, useLayoutEffect, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "../../services/actions/mobile";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const {
    isMobile,
  }: {
    isMobile: boolean;
  } = useSelector((store: any) => ({
    isMobile: store.mobile,
  }));

  const dispatch = useDispatch();

  // меняем стор при проходждении брейкпойнта
  const resizeFunc = useCallback(() => {
    window.innerWidth <= 1150 && !isMobile
      ? dispatch(MOBILE_TURN_ON())
      : window.innerWidth > 1150 && isMobile && dispatch(MOBILE_TURN_OFF());
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
