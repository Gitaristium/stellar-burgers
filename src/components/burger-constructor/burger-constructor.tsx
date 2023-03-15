import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-mobile.module.css";
import { useState } from "react";
import BurgerConstructorDesktop from "./burger-constructor-desktop";
import BurgerConstructorMobile from "./burger-constructor-mobile";
import Modal from "../modals/modal/modal";
import { curIngr, curBun } from "../../utils/cur-ingredients";

export default function BurgerConstructor(props: { isMobile: boolean }) {
  // временный массив выбраных ингридиентов для конструктора
  // setcurIngredients добавиться позже
  const [curIngredients] = useState({
    bun: curBun,
    ingr: curIngr,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!props.isMobile ? (
        // для десктопа
        <BurgerConstructorDesktop
          curIngredients={curIngredients}
          isMobile={props.isMobile}
        />
      ) : (
        // для мобилки
        <section className={styles.constructor__container}>
          <div className={`${styles.sum} mt-10`}>
            <span
              className="text text_type_digits-default"
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* позже надо прикрутить рабочий калькулятор */}
              610
              <CurrencyIcon type="primary" />
            </span>
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

      {isModalOpen && (
        <Modal
          isMobile={props.isMobile}
          closeModal={() => setIsModalOpen(false)}
          title="Заказ"
        >
          <BurgerConstructorMobile
            isMobile={props.isMobile}
            curIngredients={curIngredients}
          />
        </Modal>
      )}
    </>
  );
}
