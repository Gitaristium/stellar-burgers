import styles from "./burger-btn.module.css";

export default function BurgerBtn({
  isMenuOpen,
  click,
}: {
  isMenuOpen: boolean;
  click: Function;
}) {
  return (
    <div
      className={`${styles.burger} ${
        isMenuOpen && styles.active
      } mr-3 remove-select`}
      onClick={() => click()}
    >
      <div className={styles.burger__btn}></div>
    </div>
  );
}
