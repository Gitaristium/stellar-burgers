import CloseModal from "../close-modal/close-modal";
import styles from "./modal-ingredient-details.module.css";

export default function ModalIngredientDetails({
  closeModal,
  item,
  isMobile,
}: {
  closeModal: () => void;
  item: any;
  isMobile: boolean;
}) {
  return (
    <div className={`${styles.modal} pt-15 pb-15 pl-10 pr-10`}>
      {!isMobile && (
        <>
          <CloseModal closeModal={closeModal} />
          <h3
            className="text text_type_main-large"
            style={{ textAlign: "left" }}
          >
            Детали ингредиента
          </h3>
        </>
      )}
      <img
        src={item.image_large}
        alt={item.name}
        style={{ height: "240px", width: "100%", objectFit: "contain" }}
        className="mb-4"
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
