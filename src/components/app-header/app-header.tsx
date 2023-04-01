import { useEffect, useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerBtn from "./burger-btn";
import logoMobile from "../../images/logo__mobile.svg";
import styles from "./app-header.module.css";
import { useAppSelector } from "../../services/store/hooks";

export default function AppHeader() {
  const isMobile: boolean = useAppSelector((state: any) => state.mobile);

  // дла определения цвета иконов в меню
  const matchContructor = useMatch("/");
  const matchFeed = useMatch("/feed");
  const matchProfile = useMatch("/profile");

  // для меню для мобилок
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // тоглим меню для мобилок при клике по кнопке бургера
  const clickBurger = () => setIsMenuOpen(!isMenuOpen);

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
            <span
              className={`${styles.logo__mobile} ml-3 mr-3
              ${isMenuOpen ? styles.hide : ""}`}
            >
              <img src={logoMobile} alt="logo" />
            </span>
            <BurgerBtn click={clickBurger} isMenuOpen={isMenuOpen} />
          </>
        ) : (
          // лого для десктопа
          <span className={styles.logo}>
            <Logo />
          </span>
        )}

        <nav
          className={`${styles.nav} ${isMobile && styles.menu__mobile} ${
            isMenuOpen && styles.active
          }`}
        >
          {isMobile && (
            <p
              className={`${styles.nav__title} text text_type_main-medium mt-4 mb-4 ml-5 mr-5`}
            >
              Меню
            </p>
          )}
          <ul className={styles.list}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? styles.active : "text_color_inactive"} 
              ${styles.link} text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
              }
              to="/"
            >
              <BurgerIcon type={matchContructor ? "primary" : "secondary"} />
              <span className="ml-2">Конструктор</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${isActive ? styles.active : "text_color_inactive"} 
              ${styles.link} text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
              }
              to="/feed"
            >
              <ListIcon type={matchFeed ? "primary" : "secondary"} />
              <span className="ml-2">Лента заказов</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `${isActive ? styles.active : "text_color_inactive"}
              ${styles.link} ${!isMobile && styles.profile} 
              text text_type_main-default  mt-4 mb-4 ml-5 mr-5`
              }
              to="/profile"
            >
              <ProfileIcon type={matchProfile ? "primary" : "secondary"} />
              <span className="ml-2">Личный кабинет</span>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
