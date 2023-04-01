import { useEffect, useLayoutEffect, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../../pages/constructor-page";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "../../services/mobile/actions";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { MOBILE_BREAKPOINT } from "../../utils/vars";
import { getIsMobile } from "../../services/mobile/selectors";
import { Route, Routes } from "react-router-dom";
import FeedPage from "../../pages/feed-page";
import ProfilePage from "../../pages/profile-page";

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
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  );
}
