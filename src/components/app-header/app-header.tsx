import { FC, useEffect, useState } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerBtn from "./burger-btn";
import logoMobile from "../../images/logo__mobile.svg";
import styles from "./app-header.module.scss";
import { useAppSelector } from "../../services/store/hooks";
import ProfileNav from "../profile-nav/profile-nav";
import { FEED_PATH, HOME_PATH, PROFILE_PATH } from "../../utils/vars";
import { getIsMobile } from "../../services/mobile/selectors";

const AppHeader: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // дла определения цвета иконов в меню
    const matchContructor = useMatch("/");
    const matchFeed = useMatch("/feed");
    const matchProfile = useMatch("/profile/*");

    // для меню для мобилок
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    // тоглим меню для мобилок при клике по кнопке бургера
    const clickBurger = () => setIsMenuOpen(!isMenuOpen);
    const clickProfile = () => setIsSubMenuOpen(!isSubMenuOpen);

    // закрвыаем меню для мобилок изменении роута
    useEffect(() => {
        setIsMenuOpen(false);
    }, [matchContructor, matchFeed, matchProfile]);

    return (
        <header className={styles.header}>
            <div className={`pt-4 pb-4 ${styles.container}`}>
                {isMobile ? (
                    // лого для мобилок
                    <>
                        <Link
                            className={`${styles.logo__mobile} ml-3 mr-3 ${
                                isMenuOpen ? styles.hide : ""
                            }`}
                            to={HOME_PATH}
                        >
                            <img src={logoMobile} alt="logo" />
                        </Link>
                        <BurgerBtn
                            click={clickBurger}
                            isMenuOpen={isMenuOpen}
                        />
                    </>
                ) : (
                    // лого для десктопа
                    <Link className={styles.logo} to={HOME_PATH}>
                        <Logo />
                    </Link>
                )}

                <nav
                    className={`${styles.nav} ${
                        isMobile && styles.nav__mobile
                    } ${isMenuOpen && styles.active}`}
                >
                    {isMobile && (
                        <p
                            className={`${styles.nav__title} text text_type_main-medium mt-4 mb-4 ml-5 mr-5`}
                        >
                            Меню
                        </p>
                    )}
                    <ul className={styles.list}>
                        {/* мобильное меню */}
                        {isMobile && (
                            <>
                                <li>
                                    <span
                                        className={`${
                                            matchProfile
                                                ? styles.active
                                                : "text_color_inactive"
                                        } ${
                                            styles.link
                                        } text text_type_main-default  mt-4 mb-4 ml-5 mr-5 remove-select `}
                                        onClick={clickProfile}
                                    >
                                        <ProfileIcon
                                            type={
                                                matchProfile
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                        />
                                        <span className="ml-2 mr-2">
                                            Личный кабинет
                                        </span>
                                        {isSubMenuOpen ? (
                                            <ArrowUpIcon
                                                type={
                                                    matchProfile
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                type={
                                                    matchProfile
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                            />
                                        )}
                                    </span>
                                </li>

                                <ProfileNav isSubMenuOpen={isSubMenuOpen} />
                            </>
                        )}

                        {/* основное меню */}
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? styles.active
                                            : "text_color_inactive"
                                    } ${
                                        styles.link
                                    } text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
                                }
                                to={HOME_PATH}
                            >
                                <BurgerIcon
                                    type={
                                        matchContructor
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <span className="ml-2">Конструктор</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    `${
                                        isActive
                                            ? styles.active
                                            : "text_color_inactive"
                                    } ${
                                        styles.link
                                    } text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
                                }
                                to={FEED_PATH}
                            >
                                <ListIcon
                                    type={matchFeed ? "primary" : "secondary"}
                                />
                                <span className="ml-2">Лента заказов</span>
                            </NavLink>
                        </li>
                        {!isMobile && (
                            <li className={styles.profile}>
                                <NavLink
                                    className={({ isActive }) =>
                                        `${
                                            isActive
                                                ? styles.active
                                                : "text_color_inactive"
                                        } ${
                                            styles.link
                                        } text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
                                    }
                                    to={PROFILE_PATH}
                                >
                                    <ProfileIcon
                                        type={
                                            matchProfile
                                                ? "primary"
                                                : "secondary"
                                        }
                                    />
                                    <span className="ml-2">Личный кабинет</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
