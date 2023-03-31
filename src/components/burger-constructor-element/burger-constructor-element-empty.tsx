import { useDrop } from "react-dnd";
import { INGREDIENT_ADD } from "../../services/actions/burger-constructor";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import styles from "./burger-constructor-element.module.css";

export default function BurgerConstructorElementEmpty(props: {
  isLocked?: boolean;
  position?: "top" | "bottom";
  extraClass?: string;
  type: string;
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

  return (
    <>
      <span ref={dropTarget}>
        <article
          className={`
          ${!isMobile ? "mr-4 ml-10" : styles.item} 
        `}
        >
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
              <span className={styles.empty__text}>
                {props.type === "bun" ? "Выбери булку" : "Выбери начинку"}
              </span>
            </span>
          </div>
        </article>
      </span>
    </>
  );
}
