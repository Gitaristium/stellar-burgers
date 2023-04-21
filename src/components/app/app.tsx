import { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
    ErrorNotFoundPage,
    FeedPage,
    ForgotPasswordPage,
    HomePage,
    IngredientDetailsPages,
    LoginPage,
    OrderDetailsPage,
    OrdersPage,
    ProfileLayoutPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
} from "../../pages";
import { USER_CHECK_AUTH } from "../../services/auth/actions";
import { INGREDIENTS_REQEST } from "../../services/ingredients-list/actions";
import { getIngredientsRequestSuccess } from "../../services/ingredients-list/selectors";
import { MOBILE_TURN_OFF, MOBILE_TURN_ON } from "../../services/mobile/actions";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import {
    ALL_PATH,
    FEED_PATH,
    FORGOT_PASS_PATH,
    HOME_PATH,
    ID_PATH,
    INGREDIENTS_PATH,
    LOGIN_PATH,
    MOBILE_BREAKPOINT,
    ORDERS_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    RESET_PASS_PATH,
    _ALL_PATH,
    _ORDERS_PATH,
} from "../../utils/vars";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loading from "../loading/loading";
import Modal from "../modals/modal/modal";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

const App: FC = () => {
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
        if (!requestSuccess) dispatch(INGREDIENTS_REQEST());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // лайфак из документации для модалок
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    // закрытие модалки
    let navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    return (
        <>
            <AppHeader />

            {requestSuccess ? (
                <main
                    className={isMobile ? "pt-4 pl-4 pr-4" : "pt-10 pl-5 pr-5"}
                >
                    <Routes location={state?.backgroundLocation || location}>
                        <Route path={HOME_PATH} element={<HomePage />} />
                        <Route
                            path={LOGIN_PATH}
                            element={<OnlyUnAuth component={<LoginPage />} />}
                        />
                        <Route
                            path={REGISTER_PATH}
                            element={
                                <OnlyUnAuth component={<RegisterPage />} />
                            }
                        />
                        <Route
                            path={FORGOT_PASS_PATH}
                            element={
                                <OnlyUnAuth
                                    component={<ForgotPasswordPage />}
                                />
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
                            element={<OrderDetailsPage />}
                        />
                        <Route
                            path={PROFILE_PATH}
                            element={
                                <OnlyAuth component={<ProfileLayoutPage />} />
                            }
                        >
                            <Route index element={<ProfilePage />} />
                            <Route
                                path={_ORDERS_PATH}
                                element={<OrdersPage />}
                            />

                            <Route
                                path={_ALL_PATH}
                                element={<ErrorNotFoundPage />}
                            />
                        </Route>
                        <Route
                            path={PROFILE_PATH + ORDERS_PATH + ID_PATH}
                            element={<OrderDetailsPage />}
                        />
                        <Route
                            path={ALL_PATH}
                            element={<ErrorNotFoundPage />}
                        />
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
            ) : (
                <Loading />
            )}
        </>
    );
};

export default App;
