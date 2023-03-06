import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-mobile.module.css";
import { useState } from "react";
import ModalOverlay from "../modals/modal-overlay/modal-overlay";
import BurgerConstructorDesktop from "./burger-constructor-desktop";
import BurgerConstructorMobile from "./burger-constructor-mobile";

export default function BurgerConstructor({
  ingredients,
  isMobile,
}: {
  ingredients: any;
  isMobile: boolean;
}) {
  // временный массив выбраных ингридиентов для конструктора
  const [curIngIds] = useState({
    bun: "60666c42cc7b410027a1a9b1",
    ing: [
      "60666c42cc7b410027a1a9bf",
      "60666c42cc7b410027a1a9ba",
      "60666c42cc7b410027a1a9b6",
      "60666c42cc7b410027a1a9b5",
      "60666c42cc7b410027a1a9b8",
      "60666c42cc7b410027a1a9be",
    ],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!isMobile ? (
        // для десктопа
        <BurgerConstructorDesktop
          ingredients={ingredients}
          curIngIds={curIngIds}
          isMobile={isMobile}
        />
      ) : (
        // для мобилки
        <section className={styles.constructor__container}>
          <div className={`${styles.sum} mt-10 mr-4`}>
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

      <ModalOverlay
        isModalOpen={isModalOpen}
        isMobile={isMobile}
        title="Заказ"
        closeModal={() => setIsModalOpen(false)}
      >
        <BurgerConstructorMobile
          isMobile={isMobile}
          ingredients={ingredients}
          curIngIds={curIngIds}
        />
      </ModalOverlay>
    </>
  );
}
