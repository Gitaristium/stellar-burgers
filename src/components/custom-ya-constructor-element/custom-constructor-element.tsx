import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./custom-constructor-element.module.css";

export default function CustomConstructorElement({
  text,
  thumbnail,
  price,
  type,
  isLocked,
  extraClass,
  handleClose,
}: {
  text: string;
  thumbnail: string;
  price: number;
  type?: "top" | "bottom";
  isLocked?: boolean;
  extraClass?: string;
  handleClose?: () => void;
}) {
  return (
    <>
      {!isLocked && (
        <div
          className={styles.constructor_element__delete_btn}
          onClick={handleClose}
        >
          <DeleteIcon type="primary" />
        </div>
      )}
      <div
        className={`${styles.constructor_element}
      ${type === "top" ? styles.constructor_element_pos_top : ""}
      ${type === "bottom" ? styles.constructor_element_pos_bottom : ""}
      ${isLocked ? styles.locked : ""}
       pt-4 pb-4`}
      >
        <span className={styles.constructor_element__row}>
          <span className={styles.constructor_element__action}>
            {isLocked ? (
              <LockIcon type="secondary" />
            ) : (
              <DragIcon type="primary" />
            )}
          </span>
          <img
            className={styles.constructor_element__image}
            src={thumbnail}
            alt={text}
          />
          <span className={styles.constructor_element__text}>{text}</span>
          <span className={styles.constructor_element__price}>
            {price}
            <CurrencyIcon type="primary" />
          </span>
        </span>
      </div>
    </>
  );
}
