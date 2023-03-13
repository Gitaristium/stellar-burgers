import styles from "./ingredient-details.module.css";

export default function IngredientDetails(props: {
  item: {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
  };
  isMobile: boolean;
}) {
  return (
    <div className={styles.modal}>
      <img
        src={props.item.image_large}
        alt={props.item.name}
        style={{ height: "240px", width: "100%", objectFit: "contain" }}
        className="mb-4"
      />
      <p className="text text_type_main-medium mb-8">{props.item.name}</p>
      <ul className={styles.desc}>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.item.calories}
          </p>
        </li>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.item.proteins}
          </p>
        </li>
        <li className={`${styles.desc__column} mr-10`}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.item.fat}
          </p>
        </li>
        <li className={styles.desc__column}>
          <p className="text text_type_main-default text_color_inactive mb-3">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.item.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
