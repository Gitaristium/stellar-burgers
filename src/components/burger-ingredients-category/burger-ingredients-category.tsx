import { useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalIngredientDetails from "../modals/modal-ingredient-details/modal-ingredient-details";
import styles from "./burger-ingredients-category.module.css";
import Modal from "../modals/modal/modal";

export default function BurgerIngredientsCategory(props: {
  title: string;
  items: { _id: string; image: string; name: string; price: string }[];
  isMobile: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemForModal, setItemForModal] = useState(Object);

  const openModal = (item: Object) => {
    setIsModalOpen(true);
    setItemForModal(item);
  };
  return (
    <>
      <h2 className="text text_type_main-medium mb-6">{props.title}</h2>
      <div className={`${styles.category__list} ml-4 mr-4 mb-2`}>
        {/* пробегаемся по полученному из пропсов массиву, рендерим список ингредиентов */}
        {props.items.map(
          (item: {
            _id: string;
            image: string;
            name: string;
            price: string;
          }) => {
            return (
              <article
                className={`${styles.item} mb-8 remove-select`}
                key={item._id}
                onClick={() => openModal(item)}
              >
                {/* единственное, позже надо прикрутить РАБОЧИЙ счетчик кол-ва выбранных ингредиентов*/}
                <Counter
                  count={2}
                  size={props.isMobile ? "small" : "default"}
                  extraClass={props.isMobile ? "" : "m-1"}
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
          }
        )}
      </div>

      {isModalOpen && (
        <Modal
          isMobile={props.isMobile}
          closeModal={() => setIsModalOpen(false)}
          title="Детали ингредиента"
        >
          <ModalIngredientDetails
            item={itemForModal}
            isMobile={props.isMobile}
          />
        </Modal>
      )}
    </>
  );
}
