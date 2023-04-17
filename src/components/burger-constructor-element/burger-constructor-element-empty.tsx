import { FC } from "react";
import { useDrop } from "react-dnd";
import { INGREDIENT_ADD } from "../../services/burger-constructor/actions";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import styles from "./burger-constructor-element.module.scss";
import { getIsMobile } from "../../services/mobile/selectors";

interface IProps {
    isLocked?: boolean;
    position?: "top" | "bottom";
    extraClass?: string;
    type: string;
}

const BurgerConstructorElementEmpty: FC<IProps> = (props) => {
    const isMobile: boolean = useAppSelector(getIsMobile);

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
          ${isMobile ? styles.item : ""} 
          ${props.isLocked ? "mr-4 ml-10" : ""} 
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
                                {props.type === "bun"
                                    ? "Выбери булку"
                                    : "Выбери начинку"}
                            </span>
                        </span>
                    </div>
                </article>
            </span>
        </>
    );
};

export default BurgerConstructorElementEmpty;
