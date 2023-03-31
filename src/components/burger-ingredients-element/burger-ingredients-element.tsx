import { useMemo } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_ADD } from "../../services/burger-constructor/actions";
import { DETAILS_ADD } from "../../services/ingredient-details/actions";
import styles from "./burger-ingredients-element.module.css";
import { ConstructorModel, IngredientModel } from "../../utils/types";
import { getСonstructorList } from "../../services/burger-constructor/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";

export default function BurgerIngredientsElement({
  item,
  type,
}: {
  item: IngredientModel;
  type: string;
}) {
  const isMobile: boolean = useAppSelector((state: any) => state.mobile);

  // получаем список конструктора из стора
  const constructorList: ConstructorModel = useAppSelector(getСonstructorList);

  const dispatch = useAppDispatch();

  // добавляем игридиент в стор превью и конструктора
  // модалка откроется из компонента <BurgerIngredients/>
  const openModal = (item: Object) => {
    dispatch(DETAILS_ADD(item));
    dispatch(INGREDIENT_ADD(item));
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
  const count = useMemo(() => {
    let count = 0;
    if (item.type === "bun" && constructorList.bun) {
      constructorList.bun._id === item._id ? (count = 2) : (count = 0);
    } else if (item.type !== "bun" && constructorList.ingr.length > 0) {
      constructorList.ingr.map((elem: IngredientModel) => {
        return elem._id === item._id ? (count += 1) : count;
      });
    } else if (item.type !== "bun" && constructorList.ingr.length === 0) {
      count = 0;
    }
    return count;
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
    </>
  );
}
