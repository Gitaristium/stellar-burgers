import { forwardRef, ForwardedRef } from "react";
import BurgerIngredientsItem from "../burger-ingredients-element/burger-ingredients-element";
import styles from "./burger-ingredients-category.module.scss";
import { IngredientModel } from "../../utils/types";

const BurgerIngredientsCategory = forwardRef(
    (
        props: {
            title: string;
            items: IngredientModel[];
            type: string;
        },
        ref: ForwardedRef<HTMLHeadingElement>
    ) => {
        return (
            <>
                <h2 className="text text_type_main-medium mb-6 pt-10" ref={ref}>
                    {props.title}
                </h2>
                <div className={`${styles.list} ml-4 mr-4 mb-2`}>
                    {/* пробегаемся по полученному из пропсов массиву, рендерим список ингредиентов */}
                    {props.items.map((item: IngredientModel) => (
                        <BurgerIngredientsItem
                            item={item}
                            type={props.type}
                            key={item._id}
                        />
                    ))}
                </div>
            </>
        );
    }
);

export default BurgerIngredientsCategory;
