import styles from "./ingredient-details.module.css";
import { IngredientModel } from "../../../utils/types";
import { useAppSelector } from "../../../services/store/hooks";
import { getIngredientDetails } from "../../../services/ingredient-details/selectors";

export default function IngredientDetails() {
  const ingredientDetails: IngredientModel =
    useAppSelector(getIngredientDetails);

  return (
    <div className={styles.modal}>
      <img
        src={ingredientDetails.image_large}
        alt={ingredientDetails.name}
        className={`mb-4 ${styles.img}`}
      />
      <p className="text text_type_main-medium mb-8">
        {ingredientDetails.name}
      </p>
      <ul className={styles.desc}>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.calories}
          </p>
        </li>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.fat}
          </p>
        </li>
        <li className={styles.desc__column}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
