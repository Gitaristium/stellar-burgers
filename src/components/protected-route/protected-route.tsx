import { getIsAuthChecked, getUser } from "../../services/auth/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../loading/loading";
import { LOGIN_PATH } from "../../utils/vars";
import { ReactNode } from "react";

const ProtectedRoute = ({
    onlyAuth = true,
    component,
}: {
    onlyAuth?: boolean;
    component: any;
}) => {
    const isAuthChecked = useAppSelector(getIsAuthChecked);
    const user = useAppSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        // запрос в процессе
        return <Loading>Загрузка</Loading>;
    }

    if (user && !onlyAuth) {
        // пользователь авторизован, но роут для неавторизованных пользователей
        // редирект на главную или на location.state.from
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!user && onlyAuth) {
        // пользователь неавторизован, но роут для авторизованных пользователей
        return <Navigate to={LOGIN_PATH} state={{ from: location }} />;
    }

    // авторизация пользователя и доступ к роуту совпадают`
    return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactNode }) => (
    <ProtectedRoute onlyAuth={false} component={component} />
);
