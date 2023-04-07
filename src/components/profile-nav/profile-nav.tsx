import { NavLink } from "react-router-dom";
import styles from "./profile-nav.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { USER_LOGOUT } from "../../services/auth/actions";
import { ORDERS_PATH, PROFILE_PATH } from "../../utils/vars";

export default function ProfileNav({
    isSubMenuOpen,
}: {
    isSubMenuOpen?: boolean;
}) {
    const isMobile: boolean = useAppSelector((state: any) => state.mobile);
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(USER_LOGOUT());
    };
    return (
        <nav
            className={`${styles.nav} mr-15 ${
                isMobile ? styles.nav__submenu : ""
            } ${isMobile ? "ml-8" : ""} ${isSubMenuOpen ? styles.active : ""}`}
        >
            <ul className={styles.nav__list}>
                <li
                    className={`${styles.nav__list_item} ${
                        isMobile ? styles.mobile : ""
                    }`}
                >
                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? styles.active : "text_color_inactive"
                            } 
              ${styles.link} text ${
                                !isMobile
                                    ? "text_type_main-medium"
                                    : "text_type_main-default   mt-4 mb-4 ml-5 mr-5"
                            }`
                        }
                        to={PROFILE_PATH}
                        end={true}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className={`${styles.nav__list_item}`}>
                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? styles.active : "text_color_inactive"
                            } 
              ${styles.link} text ${
                                !isMobile
                                    ? "text_type_main-medium"
                                    : "text_type_main-default   mt-4 mb-4 ml-5 mr-5"
                            }`
                        }
                        to={PROFILE_PATH + ORDERS_PATH}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={`${styles.nav__list_item}  mb-20`}>
                    <span
                        className={`${styles.link} text_color_inactive  text ${
                            !isMobile
                                ? "text_type_main-medium"
                                : "text_type_main-default   mt-4 mb-4 ml-5 mr-5"
                        }`}
                        onClick={logout}
                    >
                        Выход
                    </span>
                </li>
            </ul>
            {!isMobile && (
                <span className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            )}
        </nav>
    );
}
