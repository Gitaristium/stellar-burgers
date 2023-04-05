import { NavLink } from "react-router-dom";
import styles from "./profile-nav.module.css";

export default function ProfileNav() {
  return (
    <nav className={`${styles.nav} mr-15`}>
      <ul className={styles.nav__list}>
        <li className={`${styles.nav__list_item}`}>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? styles.active : "text_color_inactive"} 
              ${styles.link} text text_type_main-medium`
            }
            to=""
            end={true}
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.nav__list_item}`}>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? styles.active : "text_color_inactive"} 
              ${styles.link} text text_type_main-medium`
            }
            to="orders"
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.nav__list_item}  mb-20`}>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? styles.active : "text_color_inactive"} 
              ${styles.link} text text_type_main-medium`
            }
            to="/login"
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <span className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </nav>
  );
}
