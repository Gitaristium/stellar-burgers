import { useEffect } from "react";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({
  closeModal,
}: {
  closeModal: () => void;
}) {
  useEffect(() => {
    const onKeypress = (e: any) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", onKeypress);

    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  });

  return <div className={styles.overlay} onClick={closeModal}></div>;
}
