import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { DragPreviewImage, useDrag } from "react-dnd";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { INGREDIENT_ADD } from "../../services/burger-constructor/actions";
import styles from "./burger-ingredients-element.module.css";
import { ConstructorModel, IngredientModel } from "../../utils/types";
import { getСonstructorList } from "../../services/burger-constructor/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";

export default function BurgerIngredientsElement({
    item,
    type,
}: {
    item: IngredientModel;
    type: string;
}) {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // получаем список конструктора из стора
    const constructorList: ConstructorModel =
        useAppSelector(getСonstructorList);
    const location = useLocation();
    const dispatch = useAppDispatch();

    // добавляем игридиент в конструктор
    // модалка откроется из компонента <App/>
    const addIngredient = (item: IngredientModel) => {
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
            constructorList.ingr.map((elem: IngredientModel) =>
                elem._id === item._id ? (count += 1) : count
            );
        } else if (item.type !== "bun" && constructorList.ingr.length === 0) {
            count = 0;
        }
        return count;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [constructorList]);

    return (
        <>
            <DragPreviewImage connect={dragPreview} src={item.image} />
            <Link
                to={`/ingredients/${item._id}`}
                state={{ backgroundLocation: location }}
                className={`${styles.item} mb-8 remove-select`}
                key={item._id}
                onClick={isMobile ? () => addIngredient(item) : undefined}
                style={{ opacity }}
                ref={dragRef}
            >
                {count > 0 && (
                    <Counter
                        count={count}
                        size={isMobile ? "small" : "default"}
                        extraClass={isMobile ? "" : "m-1"}
                    />
                )}
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
                <p className={`text text_type_main-default ${styles.text}`}>
                    {item.name}
                </p>
            </Link>
        </>
    );
}
