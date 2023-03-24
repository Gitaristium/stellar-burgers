import { useContext } from "react";
import {
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import CustomConstructorElement from "../custom-ya-constructor-element/custom-constructor-element";
import CustomConstructorElementEmpty from "../custom-ya-constructor-element/custom-constructor-element-empty";
import styles from "./burger-constructor-mobile.module.css";

import { Key, useState } from "react";
import OrderDetails from "../modals/order-details/order-details";
import Modal from "../modals/modal/modal";
import { ingredientModel } from "../../utils/ingredients-model";
import { BurgerConstructorContext } from "../../services/ingredients-context";
import TotalPrice from "../total-price/total-price";
import Loading from "../loading/loading";

export default function BurgerConstructorMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const openOrderDeatils = () => {
    setIsModalOpen(true);
    setIsOrderDetailsOpen(true);
  };
  const openNotice = () => {
    setIsModalOpen(true);
    setIsNoticeOpen(true);
  };

  const [constructorState, updateConstructorState] = useContext(
    BurgerConstructorContext
  );

  const removeIngredient = (item: Object) => {
    updateConstructorState({ type: "remove", payload: item });
  };

  return (
    <>
      <section
        className={`${styles.constructor__container}`}
        style={{ marginBottom: "-32px" }}
      >
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}
          <article className={`${styles.item} ${styles.top}`}>
            {constructorState.bun ? (
              <CustomConstructorElement
                type="top"
                isLocked={true}
                text={constructorState.bun.name + " (верх)"}
                price={constructorState.bun.price}
                thumbnail={constructorState.bun.image}
                extraClass={styles.constructor__element}
              />
            ) : (
              <CustomConstructorElementEmpty
                text="Выбери булку"
                isLocked={true}
              />
            )}
          </article>

          <div className={styles.stuff}>
            {Object.keys(constructorState.ingr).length !== 0 ? (
              <div className={styles.stuff__inner}>
                {/* пробегаемся по массиву ингредиентов и рендерим список */}
                {constructorState.ingr.map((e: ingredientModel, index: Key) => {
                  return (
                    <article className={`${styles.item}`} key={index}>
                      <span className={styles.draggable}>
                        <DragIcon type="primary" />
                      </span>
                      <CustomConstructorElement
                        isLocked={false}
                        text={e.name}
                        price={e.price}
                        thumbnail={e.image}
                        extraClass={styles.constructor__element}
                        handleClose={() => removeIngredient(e)}
                      />
                    </article>
                  );
                })}
              </div>
            ) : (
              <CustomConstructorElementEmpty
                text="Выбери начинку"
                isLocked={true}
              />
            )}
          </div>

          {/* фиксированная нижняя булка */}
          <article className={`${styles.item} ${styles.bottom}`}>
            {constructorState.bun ? (
              <CustomConstructorElement
                type="bottom"
                isLocked={true}
                text={constructorState.bun.name + " (низ)"}
                price={constructorState.bun.price}
                thumbnail={constructorState.bun.image}
                extraClass={styles.constructor__element}
              />
            ) : (
              <CustomConstructorElementEmpty
                text="Выбери булку"
                isLocked={true}
              />
            )}
          </article>
        </div>

        {/* итог по сумме и "оформить" */}
        <div className={`${styles.sum} mt-10 mr-4`}>
          <TotalPrice className="text text_type_digits-default" />
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="small"
            onClick={
              constructorState.bun &&
              Object.keys(constructorState.ingr).length !== 0
                ? openOrderDeatils
                : openNotice
            }
            extraClass="remove-select ml-4"
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          {isOrderDetailsOpen && <OrderDetails />}
          {isNoticeOpen && <Loading>Добавь ингредиентов</Loading>}
        </Modal>
      )}
    </>
  );
}
