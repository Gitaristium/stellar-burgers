import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { INGREDIENTS_ADD } from "../../services/actions/constructor-ingredients";
import {
  DETAILS_ADD,
  DETAILS_RESET,
} from "../../services/actions/ingredient-details";
import { IngredientModel } from "../../utils/types";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import Modal from "../modals/modal/modal";
import styles from "./burger-ingredients-element.module.css";

export default function BurgerIngredientsElement({
  item,
  type,
}: {
  item: IngredientModel;
  type: string;
}) {
  const isMobile: boolean = useSelector((state: any) => state.mobile);
  // получаем список конструктора из стора
  const constructorList: {
    bun: IngredientModel;
    ingr: IngredientModel[];
  } = useSelector((store: any) => store.constructorList);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  // открываем модалку добавляем игридиент в стор превью и конструктора
  const openModal = (item: Object) => {
    setIsModalOpen(true);
    dispatch(DETAILS_ADD(item));
    dispatch(INGREDIENTS_ADD(item));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(DETAILS_RESET());
  };

  // Drag&Drop
  const [{ opacity }, dragRef, dragPreview] = useDrag(
    () => ({
      type: type,
      item: item,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [item, type]
  );

  // счетчик кол-ва игредиентов к конструкторе
  const [count, setCount] = useState(0);
  useMemo(() => {
    let acc = 0;
    if (item.type === "bun" && constructorList.bun) {
      constructorList.bun._id === item._id ? setCount(2) : setCount(0);
    } else if (item.type !== "bun" && constructorList.ingr.length > 0) {
      constructorList.ingr.map((elem: IngredientModel) => {
        return elem._id === item._id ? (acc += 1) : acc;
      });
      setCount(acc);
    } else if (item.type !== "bun" && constructorList.ingr.length === 0) {
      setCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructorList]);

  return (
    <>
      <article
        className={`${styles.item} mb-8 remove-select`}
        key={item._id}
        onClick={() => openModal(item)}
        style={{ opacity }}
        ref={dragRef}
      >
        {/* единственное, позже надо прикрутить РАБОЧИЙ счетчик кол-ва выбранных ингредиентов*/}
        <Counter
          count={count}
          size={isMobile ? "small" : "default"}
          extraClass={isMobile ? "" : "m-1"}
        />
        <DragPreviewImage connect={dragPreview} src={item.image} />
        <img
          src={item.image}
          alt={item.name}
          className={`${styles.img} pl-4 pr-4 mb-1`}
        />
        <p className={`${styles.price} mb-1 text text_type_digits-default`}>
          {item.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className={`text text_type_main-default ${styles.text}`}>
          {item.name}
        </p>
      </article>

      {isModalOpen && (
        <Modal closeModal={() => closeModal()} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}
