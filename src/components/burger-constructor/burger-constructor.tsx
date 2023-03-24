import { useState, useContext } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-mobile.module.css";
import BurgerConstructorDesktop from "./burger-constructor-desktop";
import BurgerConstructorMobile from "./burger-constructor-mobile";
import Modal from "../modals/modal/modal";
import { IsMobileContext } from "../../services/ismobile-context";
import TotalPrice from "../total-price/total-price";

export default function BurgerConstructor() {
  const isMobile: boolean = useContext(IsMobileContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!isMobile ? (
        // для десктопа
        <BurgerConstructorDesktop />
      ) : (
        // для мобилки
        <section className={styles.constructor__container}>
          <div className={`${styles.sum} mt-10`}>
            {/* позже надо прикрутить рабочий калькулятор */}
            <TotalPrice className="text text_type_digits-default" />
            <CurrencyIcon type="primary" />
            <Button
              htmlType="button"
              type="primary"
              size="small"
              onClick={() => setIsModalOpen(true)}
              extraClass="remove-select ml-4"
            >
              Смотреть заказ
            </Button>
          </div>
        </section>
      )}

      {isModalOpen && isMobile && (
        <Modal closeModal={() => setIsModalOpen(false)} title="Заказ">
          <BurgerConstructorMobile />
        </Modal>
      )}
    </>
  );
}
