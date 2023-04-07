import { useEffect, useLayoutEffect, useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
    HomePage,
    ErrorNotFoundPage,
    FeedPage,
    ProfileLayoutPage,
    IngredientDetailsPages,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    OrdersPage,
    OrderDetailsPage,
} from "../../pages";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { USER_CHECK_AUTH } from "../../services/auth/actions";
import { MOBILE_TURN_ON, MOBILE_TURN_OFF } from "../../services/mobile/actions";
import { INGREDIENTS_REQEST } from "../../services/ingredients-list/actions";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
    INGREDIENTS,
    MOBILE_BREAKPOINT,
    ALL_PATH,
    HOME_PATH,
    LOGIN_PATH,
    REGISTER_PATH,
    FORGOT_PASS_PATH,
    RESET_PASS_PATH,
    INGREDIENTS_PATH,
    ID_PATH,
    FEED_PATH,
    PROFILE_PATH,
    _ORDERS_PATH,
    _ALL_PATH,
} from "../../utils/vars";
import { getIsMobile } from "../../services/mobile/selectors";
import { getIngredientsRequestSuccess } from "../../services/ingredients-list/selectors";

export default function App() {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();

    // проверяем токен пользователя
    useEffect(() => {
        dispatch(USER_CHECK_AUTH());
    }, [dispatch]);

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

    // получаем данные игредиентов по API, если еще не получены
    const requestSuccess: boolean = useAppSelector(
        getIngredientsRequestSuccess
    );
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
                    <Route path={HOME_PATH} element={<HomePage />} />
                    <Route
                        path={LOGIN_PATH}
                        element={<OnlyUnAuth component={<LoginPage />} />}
                    />
                    <Route
                        path={REGISTER_PATH}
                        element={<OnlyUnAuth component={<RegisterPage />} />}
                    />
                    <Route
                        path={FORGOT_PASS_PATH}
                        element={
                            <OnlyUnAuth component={<ForgotPasswordPage />} />
                        }
                    />
                    <Route
                        path={RESET_PASS_PATH}
                        element={
                            <OnlyUnAuth component={<ResetPasswordPage />} />
                        }
                    />
                    <Route
                        path={INGREDIENTS_PATH + ID_PATH}
                        element={<IngredientDetailsPages />}
                    />
                    <Route path={FEED_PATH} element={<FeedPage />} />
                    <Route
                        path={FEED_PATH + ID_PATH}
                        element={<ErrorNotFoundPage />}
                    />
                    <Route
                        path={PROFILE_PATH + ALL_PATH}
                        element={<OnlyAuth component={<ProfileLayoutPage />} />}
                    >
                        <Route index element={<ProfilePage />} />
                        <Route path={_ORDERS_PATH} element={<OrdersPage />} />
                        <Route
                            path={_ORDERS_PATH + ID_PATH}
                            element={<OrderDetailsPage />}
                        />
                        <Route
                            path={_ALL_PATH}
                            element={<ErrorNotFoundPage />}
                        />
                    </Route>
                    <Route path={ALL_PATH} element={<ErrorNotFoundPage />} />
                </Routes>

                {/* показываем модалку, если есть `backgroundLocation` */}
                {state?.backgroundLocation && (
                    <Routes>
                        <Route
                            path={INGREDIENTS_PATH + ID_PATH}
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
