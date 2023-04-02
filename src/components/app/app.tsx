import { useEffect, useLayoutEffect, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import {
  HomePage,
  NotFoundPage,
  FeedPage,
  ProfilePage,
  IngredientDetailsPages,
} from "../../pages";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "../../services/mobile/actions";
import { INGREDIENTS_REQEST } from "../../services/ingredients-list/actions";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { INGREDIENTS, MOBILE_BREAKPOINT } from "../../utils/vars";
import { getIsMobile } from "../../services/mobile/selectors";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getIngredientsRequestSuccess } from "../../services/ingredients-list/selectors";
import Modal from "../modals/modal/modal";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";

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

  // получаем данные по API, если еще не получены
  const requestSuccess: boolean = useAppSelector(getIngredientsRequestSuccess);
  useEffect(() => {
    if (!requestSuccess) dispatch(INGREDIENTS_REQEST(INGREDIENTS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // лайфак из документации для модалок
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  // закрытие модалки
  let navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };
  return (
    <>
      <AppHeader />
      <main className={isMobile ? "pt-4 pl-4 pr-4" : "pt-10 pl-5 pr-5"}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<NotFoundPage />} />
          <Route path="/reset-password" element={<NotFoundPage />} />
          <Route path="/register" element={<NotFoundPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsPages />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<NotFoundPage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="orders" element={<NotFoundPage />} />
            <Route path="orders/:id" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Show the modal when a `backgroundLocation` is set */}
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  closeModal={() => closeModal()}
                  title="Детали ингредиента"
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </>
  );
}
