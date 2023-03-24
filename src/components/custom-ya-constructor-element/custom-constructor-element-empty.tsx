import styles from "./custom-constructor-element.module.css";

export default function CustomConstructorElementEmpty({
  text,
  isLocked,
}: {
  text: string;
  isLocked: boolean;
}) {
  return (
    <>
      <div
        className={`${styles.constructor_element}
        ${isLocked ? styles.locked : ""}
       pt-4 pb-4`}
      >
        <span className={styles.constructor_element__row}>
          <span
            className={styles.constructor_element__text}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {text}
          </span>
        </span>
      </div>
    </>
  );
}
