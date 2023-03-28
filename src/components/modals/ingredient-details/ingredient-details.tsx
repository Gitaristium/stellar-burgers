import styles from "./ingredient-details.module.css";
import { IngredientModel } from "../../../utils/types";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const item: IngredientModel = useSelector(
    (store: any) => store.ingredientDetails
  );

  return (
    <div className={styles.modal}>
      <img
        src={item.image_large}
        alt={item.name}
        className={`mb-4 ${styles.img}`}
      />
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <ul className={styles.desc}>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </p>
        </li>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.proteins}
          </p>
        </li>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.fat}
          </p>
        </li>
        <li className={styles.desc__column}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {item.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
