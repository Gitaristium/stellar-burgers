import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-desktop.module.css";
import { Key, useState } from "react";
import OrderDetails from "../modals/order-details/order-details";
import Modal from "../modals/modal/modal";
import { ingredientsPropTypes } from "../../utils/ingredients-prop-types";

function BurgerConstructorDesktop(props: {
  isMobile: boolean;
  curIngredients: {
    bun: ingredientsPropTypes;
    ingr: ingredientsPropTypes[];
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={`${styles.constructor__container} pt-15 pb-10`}>
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}

          <article className="mr-4 ml-10">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={props.curIngredients.bun.name + " (верх)"}
              price={props.curIngredients.bun.price}
              thumbnail={props.curIngredients.bun.image}
            />
          </article>

          <div className={`custom-scroll mt-4 mb-4 pr-4 pl-10 ${styles.stuff}`}>
            <div className={styles.stuff__inner}>
              {/* пробегаемся по массиву ингредиентов и рендерим список */}
              {props.curIngredients.ingr.map(
                (e: ingredientsPropTypes, index: Key) => {
                  return (
                    <article className="mr-4 ml-10" key={index}>
                      <span className={styles.draggable}>
                        <DragIcon type="primary" />
                      </span>
                      <ConstructorElement
                        text={e.name}
                        price={e.price}
                        thumbnail={e.image}
                      />
                    </article>
                  );
                }
              )}
            </div>
          </div>

          {/* фиксированная нижняя булка */}
          <article className="mr-4 ml-10">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={props.curIngredients.bun.name + " (низ)"}
              price={props.curIngredients.bun.price}
              thumbnail={props.curIngredients.bun.image}
            />
          </article>
        </div>

        {/* итог по сумме и "оформить" */}
        <div className={`${styles.sum} mt-10 mr-4`}>
          <span className="text text_type_digits-medium">
            {/* позже надо прикрутить рабочий калькулятор */}
            610
            <CurrencyIcon type="primary" />
          </span>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => setIsModalOpen(true)}
            extraClass="remove-select ml-10"
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
BurgerConstructorDesktop.propTypes = {};
export default BurgerConstructorDesktop;
