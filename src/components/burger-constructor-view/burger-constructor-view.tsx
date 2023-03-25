import { useState, useContext } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-view-desktop.module.css";
import stylesMobile from "./burger-constructor-view-mobile.module.css";
import Modal from "../modals/modal/modal";
import OrderDetails from "../modals/order-details/order-details";
import TotalPrice from "../total-price/total-price";
import Loading from "../loading/loading";
import CustomConstructorElement from "../custom-ya-constructor-element/custom-constructor-element";
import CustomConstructorElementEmpty from "../custom-ya-constructor-element/custom-constructor-element-empty";
import { IngredientModel } from "../../utils/types";
import { BurgerConstructorContext } from "../../services/ingredients-context";
import { IsMobileContext } from "../../services/ismobile-context";

export default function BurgerConstructorView() {
  const isMobile: boolean = useContext(IsMobileContext);
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
  const closeModal = () => {
    setIsModalOpen(false);
    setIsOrderDetailsOpen(false);
    setIsNoticeOpen(false);
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
        className={`${styles.constructor__container} ${
          !isMobile ? "pt-15 pb-10" : stylesMobile.constructor__container_mb
        }`}
      >
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}

          {constructorState.bun ? (
            <article
              className={
                !isMobile
                  ? "mr-4 ml-10"
                  : `${stylesMobile.item} ${stylesMobile.top}`
              }
            >
              {!isMobile ? (
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={constructorState.bun.name + " (верх)"}
                  price={constructorState.bun.price}
                  thumbnail={constructorState.bun.image}
                />
              ) : (
                <CustomConstructorElement
                  type="top"
                  isLocked={true}
                  text={constructorState.bun.name + " (верх)"}
                  price={constructorState.bun.price}
                  thumbnail={constructorState.bun.image}
                />
              )}
            </article>
          ) : (
            <CustomConstructorElementEmpty
              text="Выбери булку"
              position="top"
              isLocked={true}
            />
          )}

          <div
            className={
              !isMobile
                ? `custom-scroll mt-4 mb-4 pr-4 pl-10 ${styles.stuff}`
                : stylesMobile.stuff
            }
          >
            {Object.keys(constructorState.ingr).length !== 0 ? (
              <div
                className={`${styles.stuff__inner} ${
                  isMobile && stylesMobile.stuff__inner_gap
                }`}
              >
                {/* пробегаемся по массиву ингредиентов и рендерим список */}
                {constructorState.ingr.map(
                  (e: IngredientModel, uuid: string) => {
                    return (
                      <article
                        className={!isMobile ? "mr-4 ml-10" : stylesMobile.item}
                        key={uuid}
                      >
                        <span className={styles.draggable}>
                          <DragIcon type="primary" />
                        </span>
                        {!isMobile ? (
                          <ConstructorElement
                            text={e.name}
                            price={e.price}
                            thumbnail={e.image}
                            handleClose={() => removeIngredient(e)}
                          />
                        ) : (
                          <CustomConstructorElement
                            isLocked={false}
                            text={e.name}
                            price={e.price}
                            thumbnail={e.image}
                            handleClose={() => removeIngredient(e)}
                          />
                        )}
                      </article>
                    );
                  }
                )}
              </div>
            ) : (
              <CustomConstructorElementEmpty text="Выбери начинку" />
            )}
          </div>

          {/* фиксированная нижняя булка */}
          {constructorState.bun ? (
            <article
              className={
                !isMobile
                  ? "mr-4 ml-10"
                  : `${stylesMobile.item} ${stylesMobile.bottom}`
              }
            >
              {!isMobile ? (
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={constructorState.bun.name + " (низ)"}
                  price={constructorState.bun.price}
                  thumbnail={constructorState.bun.image}
                />
              ) : (
                <CustomConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={constructorState.bun.name + " (низ)"}
                  price={constructorState.bun.price}
                  thumbnail={constructorState.bun.image}
                />
              )}
            </article>
          ) : (
            <CustomConstructorElementEmpty
              text="Выбери булку"
              position="bottom"
            />
          )}
        </div>

        {/* итог по сумме и "оформить" */}
        <div
          className={
            !isMobile
              ? `${styles.sum} mt-10 mr-4`
              : `${stylesMobile.sum} ${stylesMobile.sum__wide} mt-10 mr-4`
          }
        >
          <TotalPrice
            className={
              !isMobile
                ? "text text_type_digits-medium"
                : "text text_type_digits-default"
            }
          />
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size={!isMobile ? "large" : "small"}
            onClick={
              constructorState.bun &&
              Object.keys(constructorState.ingr).length !== 0
                ? openOrderDeatils
                : openNotice
            }
            extraClass={
              !isMobile ? "remove-select ml-10" : "remove-select ml-4"
            }
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          {isOrderDetailsOpen && <OrderDetails />}
          {isNoticeOpen && <Loading>Добавь ингредиентов</Loading>}
        </Modal>
      )}
    </>
  );
}
