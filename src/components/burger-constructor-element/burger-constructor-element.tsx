import { useDrag, useDrop } from "react-dnd";
import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  INGREDIENT_ADD,
  INGREDIENT_REMOVE,
} from "../../services/burger-constructor/actions";
import styles from "./burger-constructor-element.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { IngredientModel } from "../../utils/types";

export default function BurgerConstructorElement(props: {
  ingredient: IngredientModel;
  isLocked?: boolean;
  position?: "top" | "bottom";
  extraClass?: string;
  type: string;
  moveItem: (id: string, to: number) => void;
  findItem: (id: string) => { index: number };
}) {
  const isMobile: boolean = useAppSelector((state: any) => state.mobile);

  // ловим drag&drop
  const dispatch = useAppDispatch();
  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: props.type,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item) {
      dispatch(INGREDIENT_ADD(item));
    },
  });

  const removeIngredient = () => {
    dispatch(INGREDIENT_REMOVE(props.ingredient));
  };

  //сортируем список ингредиентов
  const uuid = props.ingredient.uuid;
  const originalIndex = props.findItem(uuid).index;
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "ingr",
      item: { uuid, originalIndex },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (item, monitor) => {
        const { uuid: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          props.moveItem(droppedId, originalIndex);
        }
      },
    }),
    [props.ingredient.uuid, originalIndex, props.moveItem]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "ingr",
      hover({ uuid: draggedId }: any) {
        if (draggedId !== uuid) {
          const { index: overIndex } = props.findItem(uuid);
          props.moveItem(draggedId, overIndex);
        }
      },
    }),
    [props.findItem, props.moveItem]
  );

  return (
    <>
      <span ref={(node) => drag(drop(node))} style={{ opacity }}>
        <article
          className={`
          ${!isMobile ? "mr-4 ml-10" : styles.item} 
        `}
          ref={dropTarget}
        >
          {!props.isLocked && props.ingredient && (
            <span
              className={`${styles.drag__icon} ${
                isMobile && styles.drag__icon_mobile
              }`}
            >
              <DragIcon type="secondary" />
            </span>
          )}
          {!props.isLocked && isMobile && props.ingredient && (
            <span className={styles.delete__icon_mobile}>
              <DeleteIcon type="primary" onClick={removeIngredient} />
            </span>
          )}
          <div
            className={`constructor-element constructor-element_pos_${
              props.position
            }
          ${styles.drop__target}
          ${isMobile ? styles.item__element : ""} 
          ${isOver ? styles.drop__hover : ""}
          ${canDrop ? styles.drop__can : ""}
            `}
          >
            <span className="constructor-element__row">
              {props.ingredient ? (
                <>
                  <img
                    className="constructor-element__image"
                    src={props.ingredient.image}
                    alt={props.ingredient.name}
                  />
                  <span className="constructor-element__text">
                    {props.ingredient.name}
                  </span>
                  <span className="constructor-element__price">
                    {props.ingredient.price}
                    <CurrencyIcon type="primary" />
                    {!isMobile && (
                      <>
                        {props.isLocked ? (
                          <LockIcon type="secondary" />
                        ) : (
                          <span className={styles.delete__icon}>
                            <DeleteIcon
                              type="secondary"
                              onClick={removeIngredient}
                            />
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </>
              ) : (
                <span className={styles.empty__text}>
                  {props.type === "bun" ? "Выбери булку" : "Выбери начинку"}
                </span>
              )}
            </span>
          </div>
        </article>
      </span>
    </>
  );
}
