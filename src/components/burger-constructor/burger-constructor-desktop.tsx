import { useContext } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-desktop.module.css";
import { useState } from "react";
import OrderDetails from "../modals/order-details/order-details";
import Modal from "../modals/modal/modal";
import { ingredientModel } from "../../utils/ingredients-model";
import { BurgerConstructorContext } from "../../services/ingredients-context";
import TotalPrice from "../total-price/total-price";
import Loading from "../loading/loading";

function BurgerConstructorDesktop() {
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
      <section className={`${styles.constructor__container} pt-15 pb-10`}>
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}

          {constructorState.bun ? (
            <article className="mr-4 ml-10">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={constructorState.bun.name + " (верх)"}
                price={constructorState.bun.price}
                thumbnail={constructorState.bun.image}
              />
            </article>
          ) : (
            <article className="mr-4 ml-10">
              <div className="constructor-element constructor-element_pos_top">
                <span
                  className="constructor-element__row"
                  style={{ height: 48, justifyContent: "center" }}
                >
                  Выбери булку
                </span>
              </div>
            </article>
          )}

          <div className={`custom-scroll mt-4 mb-4 pr-4 pl-10 ${styles.stuff}`}>
            {Object.keys(constructorState.ingr).length !== 0 ? (
              <div className={styles.stuff__inner}>
                {/* пробегаемся по массиву ингредиентов и рендерим список */}
                {constructorState.ingr.map(
                  (e: ingredientModel, key: string) => {
                    return (
                      <article className="mr-4 ml-10" key={key}>
                        <span className={styles.draggable}>
                          <DragIcon type="primary" />
                        </span>
                        <ConstructorElement
                          text={e.name}
                          price={e.price}
                          thumbnail={e.image}
                          handleClose={() => removeIngredient(e)}
                        />
                      </article>
                    );
                  }
                )}
              </div>
            ) : (
              <article className="mt-auto mb-auto">
                <div className="constructor-element">
                  <span
                    className="constructor-element__row"
                    style={{ height: 48, justifyContent: "center" }}
                  >
                    Выбери начинку
                  </span>
                </div>
              </article>
            )}
          </div>

          {/* фиксированная нижняя булка */}
          {constructorState.bun ? (
            <article className="mr-4 ml-10">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={constructorState.bun.name + " (низ)"}
                price={constructorState.bun.price}
                thumbnail={constructorState.bun.image}
              />
            </article>
          ) : (
            <article className="mr-4 ml-10">
              <div className="constructor-element constructor-element_pos_bottom">
                <span
                  className="constructor-element__row"
                  style={{ height: 48, justifyContent: "center" }}
                >
                  Выбери булку
                </span>
              </div>
            </article>
          )}
        </div>

        {/* итог по сумме и "оформить" */}
        <div className={`${styles.sum} mt-10 mr-4`}>
          {/* позже надо прикрутить рабочий калькулятор */}
          <TotalPrice className="text text_type_digits-medium" />
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={
              constructorState.bun &&
              Object.keys(constructorState.ingr).length !== 0
                ? openOrderDeatils
                : openNotice
            }
            extraClass="remove-select ml-10"
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
BurgerConstructorDesktop.propTypes = {};
export default BurgerConstructorDesktop;
