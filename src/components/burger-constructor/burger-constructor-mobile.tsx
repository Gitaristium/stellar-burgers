import {
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CustomConstructorElement from "../custom-ya-constructor-element/custom-constructor-element";
import styles from "./burger-constructor-mobile.module.css";

import { Key, useState } from "react";
import ModalOverlay from "../modals/modal-overlay/modal-overlay";
import ModalOrderDetails from "../modals/modal-order-details/modal-order-details";

export default function BurgerConstructorMobile({
  isMobile,
  ingredients,
  curIngIds,
}: {
  isMobile: boolean;
  ingredients: any;
  curIngIds: any;
}) {
  const findElement = (type: string) => {
    return ingredients.find((item: { _id: string }) => item._id === type);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={`${styles.constructor__container}`}>
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}
          <article className={`${styles.item} ${styles.top} pt-4 pb-4`}>
            <CustomConstructorElement
              type="top"
              isLocked={true}
              text={findElement(curIngIds.bun).name + " (верх)"}
              price={findElement(curIngIds.bun).price}
              thumbnail={findElement(curIngIds.bun).image}
              extraClass={styles.constructor__element}
            />
          </article>

          <div className={styles.stuff}>
            <div className={styles.stuff__inner}>
              {/* пробегаемся по массиву ингредиентов и рендерим список */}
              {curIngIds.ing.map((id: string, index: Key) => {
                return (
                  <article className={`${styles.item}  pt-4 pb-4`} key={index}>
                    <span className={styles.draggable}>
                      <DragIcon type="primary" />
                    </span>
                    <CustomConstructorElement
                      text={findElement(id).name}
                      price={findElement(id).price}
                      thumbnail={findElement(id).image}
                      extraClass={styles.constructor__element}
                    />
                  </article>
                );
              })}
            </div>
          </div>

          {/* фиксированная нижняя булка */}
          <article className={`${styles.item} ${styles.bottom} pt-4 pb-4`}>
            <CustomConstructorElement
              type="bottom"
              isLocked={true}
              text={findElement(curIngIds.bun).name + " (низ)"}
              price={findElement(curIngIds.bun).price}
              thumbnail={findElement(curIngIds.bun).image}
              extraClass={styles.constructor__element}
            />
          </article>
        </div>

        {/* итог по сумме и "оформить" */}
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
            Оформить заказ
          </Button>
        </div>
      </section>

      <ModalOverlay
        isModalOpen={isModalOpen}
        isMobile={isMobile}
        title="Заказ оформлен"
        closeModal={() => setIsModalOpen(false)}
      >
        <ModalOrderDetails
          closeModal={() => setIsModalOpen(false)}
          isMobile={isMobile}
        />
      </ModalOverlay>
    </>
  );
}
