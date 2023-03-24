import { useState, useContext } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import styles from "./burger-ingredients-category.module.css";
import Modal from "../modals/modal/modal";
import { ingredientModel } from "../../utils/ingredients-model";
import { IsMobileContext } from "../../services/ismobile-context";
import { BurgerConstructorContext } from "../../services/ingredients-context";
import uuid from "react-uuid";

export default function BurgerIngredientsCategory(props: {
  title: string;
  items: ingredientModel[];
}) {
  const isMobile: boolean = useContext(IsMobileContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemForModal, setItemForModal] = useState(Object);

  const [, updateConstructorState] = useContext(BurgerConstructorContext);

  const openModal = (item: Object) => {
    setIsModalOpen(true);
    setItemForModal(item);
    updateConstructorState({ type: "add", payload: { ...item, uuid: uuid() } });
  };

  return (
    <>
      <h2 className="text text_type_main-medium mb-6">{props.title}</h2>
      <div className={`${styles.category__list} ml-4 mr-4 mb-2`}>
        {/* пробегаемся по полученному из пропсов массиву, рендерим список ингредиентов */}
        {props.items.map((item: ingredientModel) => {
          return (
            <article
              className={`${styles.item} mb-8 remove-select`}
              key={item._id}
              onClick={() => openModal(item)}
            >
              {/* единственное, позже надо прикрутить РАБОЧИЙ счетчик кол-ва выбранных ингредиентов*/}
              <Counter
                count={2}
                size={isMobile ? "small" : "default"}
                extraClass={isMobile ? "" : "m-1"}
              />
              <img
                src={item.image}
                alt={item.name}
                className={`${styles.img} pl-4 pr-4 mb-1`}
              />
              <p
                className={`${styles.price} mb-1 text text_type_digits-default`}
              >
                {item.price}
                <CurrencyIcon type="primary" />
              </p>
              <p
                className="text text_type_main-default"
                style={{ textAlign: "center" }}
              >
                {item.name}
              </p>
            </article>
          );
        })}
      </div>

      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          title="Детали ингредиента"
        >
          <IngredientDetails item={itemForModal} />
        </Modal>
      )}
    </>
  );
}
