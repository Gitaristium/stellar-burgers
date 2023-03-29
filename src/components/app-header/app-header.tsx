import { useState } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderMenu from "../app-header-menu/app-header-menu";
import BurgerBtn from "../app-header-menu/burger-btn";
import logoMobile from "../../images/logo__mobile.svg";
import styles from "./app-header.module.css";
import { useAppSelector } from "../../services/store/hooks";

export default function AppHeader() {
  const isMobile: boolean = useAppSelector((state: any) => state.mobile);

  // стэйт для активного меню
  const [curLink, setCurLink] = useState("constructor");

  // для меню для мобилок
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // кликаем по меню
  // устанавливаем новый стэйс активного меню
  // закрвыаем меню для мобилок
  const clickLink = (elem: string) => {
    setCurLink(elem);
    setIsMenuOpen(false);
  };

  // тоглим меню для мобилок при клике по кнопке бургера
  const clickBurger = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={`pt-4 pb-4 ${styles.container}`}>
        {isMobile ? (
          // лого для мобилок
          <>
            <span
              className={`${styles.logo__mobile} ml-3 mr-3"} ${
                isMenuOpen ? styles.hide : ""
              }`}
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
            <AppHeaderMenu
              curLink={curLink}
              link="constructor"
              text="Конструктор"
              onClick={() => clickLink("constructor")}
              className="mr-2"
            >
              <BurgerIcon
                type={curLink === "constructor" ? "primary" : "secondary"}
              />
            </AppHeaderMenu>

            <AppHeaderMenu
              curLink={curLink}
              link="feed"
              text="Лента заказов"
              onClick={() => clickLink("feed")}
              className=""
            >
              <ListIcon type={curLink === "feed" ? "primary" : "secondary"} />
            </AppHeaderMenu>

            <AppHeaderMenu
              curLink={curLink}
              link="profile"
              text="Личный кабинет"
              onClick={() => clickLink("profile")}
              className={styles.profile}
            >
              <ProfileIcon
                type={curLink === "profile" ? "primary" : "secondary"}
              />
            </AppHeaderMenu>
          </ul>
        </nav>
      </div>
    </header>
  );
}
