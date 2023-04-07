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
import { INGREDIENTS, MOBILE_BREAKPOINT } from "../../utils/vars";
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
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/login"
                        element={<OnlyUnAuth component={<LoginPage />} />}
                    />
                    <Route
                        path="/register"
                        element={<OnlyUnAuth component={<RegisterPage />} />}
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <OnlyUnAuth component={<ForgotPasswordPage />} />
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <OnlyUnAuth component={<ResetPasswordPage />} />
                        }
                    />
                    <Route
                        path="/ingredients/:id"
                        element={<IngredientDetailsPages />}
                    />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/feed/:id" element={<ErrorNotFoundPage />} />
                    <Route
                        path="/profile/*"
                        element={<OnlyAuth component={<ProfileLayoutPage />} />}
                    >
                        <Route index element={<ProfilePage />} />
                        <Route path="orders" element={<OrdersPage />} />
                        <Route
                            path="orders/:id"
                            element={<OrderDetailsPage />}
                        />
                        <Route path="*" element={<ErrorNotFoundPage />} />
                    </Route>
                    <Route path="*" element={<ErrorNotFoundPage />} />
                </Routes>

                {/* показываем модалку, если есть `backgroundLocation` */}
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
