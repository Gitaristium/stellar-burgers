import { useContext } from "react";
import styles from "./custom-constructor-element.module.css";
import { IsMobileContext } from "../../services/ismobile-context";

export default function CustomConstructorElementEmpty({
  text,
  isLocked,
  position,
}: {
  text: string;
  isLocked?: boolean;
  position?: string;
}) {
  const isMobile: boolean = useContext(IsMobileContext);
  return (
    <>
      {isMobile ? (
        <>
          <article
            className={`${styles.constructor_element}
          ${isLocked ? styles.locked : ""}
          pt-4 pb-4`}
          >
            <span className={styles.constructor_element__row}>
              <span className={styles.constructor_element__text__empty}>
                {text}
              </span>
            </span>
          </article>
        </>
      ) : (
        <article className={position ? "mr-4 ml-10" : "mt-auto mb-auto"}>
          <div
            className={`constructor-element constructor-element_pos_${position}`}
          >
            <span className={`constructor-element__row ${styles.empty}`}>
              {text}
            </span>
          </div>
        </article>
      )}
    </>
  );
}
// className={!isMobile ? "mr-4 ml-10" : stylesMobile.item}
