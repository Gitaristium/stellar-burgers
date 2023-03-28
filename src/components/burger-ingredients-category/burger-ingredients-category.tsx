import styles from "./burger-ingredients-category.module.css";
import { IngredientModel } from "../../utils/types";

import BurgerIngredientsItem from "../burger-ingredients-element/burger-ingredients-element";

export default function BurgerIngredientsCategory(props: {
  title: string;
  items: IngredientModel[];
  extraRef?: any;
  type: string;
}) {
  return (
    <>
      <h2
        className="text text_type_main-medium mb-6 pt-10"
        ref={props.extraRef}
      >
        {props.title}
      </h2>
      <div className={`${styles.category__list} ml-4 mr-4 mb-2`}>
        {/* пробегаемся по полученному из пропсов массиву, рендерим список ингредиентов */}
        {props.items.map((item: IngredientModel) => {
          return (
            <BurgerIngredientsItem
              item={item}
              type={props.type}
              key={item._id}
            />
          );
        })}
      </div>
    </>
  );
}
