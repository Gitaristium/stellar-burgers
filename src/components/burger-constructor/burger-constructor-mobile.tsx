import {
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CustomConstructorElement from "../custom-ya-constructor-element/custom-constructor-element";
import styles from "./burger-constructor-mobile.module.css";

import { Key, useState } from "react";
import OrderDetails from "../modals/order-details/order-details";
import Modal from "../modals/modal/modal";
import { ingredientsPropTypes } from "../../utils/ingredients-prop-types";

export default function BurgerConstructorMobile(props: {
  isMobile: boolean;
  curIngredients: {
    bun: ingredientsPropTypes;
    ingr: ingredientsPropTypes[];
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        className={`${styles.constructor__container}`}
        style={{ marginBottom: "-32px" }}
      >
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}
          <article className={`${styles.item} ${styles.top} pt-4 pb-4`}>
            <CustomConstructorElement
              type="top"
              isLocked={true}
              text={props.curIngredients.bun.name + " (верх)"}
              price={props.curIngredients.bun.price}
              thumbnail={props.curIngredients.bun.image}
              extraClass={styles.constructor__element}
            />
          </article>

          <div className={styles.stuff}>
            <div className={styles.stuff__inner}>
              {/* пробегаемся по массиву ингредиентов и рендерим список */}
              {props.curIngredients.ingr.map(
                (e: ingredientsPropTypes, index: Key) => {
                  return (
                    <article
                      className={`${styles.item}  pt-4 pb-4`}
                      key={index}
                    >
                      <span className={styles.draggable}>
                        <DragIcon type="primary" />
                      </span>
                      <CustomConstructorElement
                        text={e.name}
                        price={e.price}
                        thumbnail={e.image}
                        extraClass={styles.constructor__element}
                      />
                    </article>
                  );
                }
              )}
            </div>
          </div>

          {/* фиксированная нижняя булка */}
          <article className={`${styles.item} ${styles.bottom} pt-4 pb-4`}>
            <CustomConstructorElement
              type="bottom"
              isLocked={true}
              text={props.curIngredients.bun.name + " (низ)"}
              price={props.curIngredients.bun.price}
              thumbnail={props.curIngredients.bun.image}
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

      {isModalOpen && (
        <Modal
          isMobile={props.isMobile}
          closeModal={() => setIsModalOpen(false)}
          title="Заказ оформлен"
        >
          <OrderDetails closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
