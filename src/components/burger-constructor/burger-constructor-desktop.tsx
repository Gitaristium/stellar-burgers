import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-desktop.module.css";
import { Key, useState } from "react";
import ModalOrderDetails from "../modals/modal-order-details/modal-order-details";
import Modal from "../modals/modal/modal";

export default function BurgerConstructorDesktop(props: {
  ingredients: any;
  curIngIds: any;
  isMobile: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findElement = (type: string) => {
    return props.ingredients.find((item: { _id: string }) => item._id === type);
  };

  return (
    <>
      <section className={`${styles.constructor__container} pt-15 pb-10`}>
        <div className={styles.constructor__list}>
          {/* фиксированная верхняя булка */}
          <article className="mr-4 ml-10">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={findElement(props.curIngIds.bun).name + " (верх)"}
              price={findElement(props.curIngIds.bun).price}
              thumbnail={findElement(props.curIngIds.bun).image}
            />
          </article>

          <div className={`custom-scroll mt-4 mb-4 pr-4 pl-10 ${styles.stuff}`}>
            <div className={styles.stuff__inner}>
              {/* пробегаемся по массиву ингредиентов и рендерим список */}
              {props.curIngIds.ing.map((id: string, index: Key) => {
                return (
                  <article className="mr-4 ml-10" key={index}>
                    <span className={styles.draggable}>
                      <DragIcon type="primary" />
                    </span>
                    <ConstructorElement
                      text={findElement(id).name}
                      price={findElement(id).price}
                      thumbnail={findElement(id).image}
                    />
                  </article>
                );
              })}
            </div>
          </div>

          {/* фиксированная нижняя булка */}
          <article className="mr-4 ml-10">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={findElement(props.curIngIds.bun).name + " (низ)"}
              price={findElement(props.curIngIds.bun).price}
              thumbnail={findElement(props.curIngIds.bun).image}
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
          <ModalOrderDetails closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
