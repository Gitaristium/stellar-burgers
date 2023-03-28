import { useCallback, useState } from "react";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-view.module.css";
import Modal from "../modals/modal/modal";
import OrderDetails from "../modals/order-details/order-details";
import TotalPrice from "../total-price/total-price";
import Loading from "../loading/loading";
import { IngredientModel } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_DETAILS_RESET } from "../../services/actions/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { INGREDIENTS_MOVE } from "../../services/actions/constructor-ingredients";
import BurgerConstructorElementEmpty from "../burger-constructor-element/burger-constructor-element-empty";

export default function BurgerConstructorView() {
  const isMobile: boolean = useSelector((state: any) => state.mobile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dispatch = useDispatch();

  // получаем список конструктора из стора
  const constructorList: {
    bun: IngredientModel;
    ingr: IngredientModel[];
  } = useSelector((store: any) => store.constructorList);

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
    dispatch(ORDER_DETAILS_RESET());
  };

  //сортировка списка в конструкторе
  const findItem = useCallback(
    (id: string) => {
      const item = constructorList.ingr.filter(
        (c) => `${c.uuid}` === id
      )[0] as IngredientModel;
      return {
        item,
        index: constructorList.ingr.indexOf(item),
      };
    },
    [constructorList.ingr]
  );

  const moveItem = useCallback(
    (id: string, atIndex: number) => {
      const { index } = findItem(id);
      dispatch(INGREDIENTS_MOVE(index, atIndex));
    },
    [findItem, dispatch]
  );

  const [, drop] = useDrop(() => ({ accept: "ingr" }));

  return (
    <>
      <section
        className={`${styles.constructor__container} ${
          !isMobile ? `${styles.desktop} pt-15 pb-10` : styles.mobile
        }`}
      >
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}
          {constructorList.bun ? (
            <BurgerConstructorElement
              ingredient={constructorList.bun}
              isLocked={true}
              position="top"
              type="bun"
              moveItem={moveItem}
              findItem={findItem}
            />
          ) : (
            <BurgerConstructorElementEmpty
              isLocked={true}
              position="top"
              type="bun"
            />
          )}
          <div
            className={`${styles.stuff} ${
              !isMobile ? "custom-scroll mt-4 mb-4 pr-4 pl-10" : ""
            }`}
          >
            {/* список конструктора */}
            <div className={styles.stuff__inner}>
              {constructorList.ingr.length > 0 ? (
                <>
                  <DndProvider backend={HTML5Backend}>
                    <span className={styles.stuff__inner_span} ref={drop}>
                      {/* пробегаемся по массиву ингредиентов и рендерим список */}
                      {constructorList.ingr.map(
                        (e: IngredientModel, uuid: number, index) => {
                          return (
                            <BurgerConstructorElement
                              key={uuid}
                              ingredient={e}
                              isLocked={false}
                              extraClass=""
                              type="ingredients"
                              moveItem={moveItem}
                              findItem={findItem}
                            />
                          );
                        }
                      )}
                    </span>
                  </DndProvider>
                </>
              ) : (
                <BurgerConstructorElementEmpty
                  isLocked={false}
                  extraClass=""
                  type="ingredients"
                />
              )}
            </div>
          </div>

          {/* фиксированная нижняя булка */}
          {constructorList.bun ? (
            <BurgerConstructorElement
              ingredient={constructorList.bun}
              isLocked={true}
              position="bottom"
              type="bun"
              moveItem={moveItem}
              findItem={findItem}
            />
          ) : (
            <BurgerConstructorElementEmpty
              isLocked={true}
              position="bottom"
              type="bun"
            />
          )}
        </div>

        {/* итог по сумме и "оформить" */}
        <div className={`${styles.sum} mt-10 mr-4`}>
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
              constructorList.bun &&
              Object.keys(constructorList.ingr).length !== 0
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
