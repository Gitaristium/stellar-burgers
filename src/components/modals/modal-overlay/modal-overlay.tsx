import ReactDOM from "react-dom";
import { JSXElementConstructor, ReactElement } from "react";
import styles from "./modal-overlay.module.css";
import CloseModal from "../close-modal/close-modal";

export default function ModalOverlay(props: {
  isModalOpen: boolean;
  isMobile: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) {
  if (!props.isModalOpen) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      {props.isMobile ? (
        <>
          <h2 className="text text_type_main-large pt-4 pr-2 pb-4 pl-2">
            {props.title}
          </h2>
          <CloseModal closeModal={props.closeModal} />
          <div className={`${styles.content} pl-2 pr-2`}>{props.children}</div>
        </>
      ) : (
        <>{props.children}</>
      )}
    </div>,
    document.body
  );
}
