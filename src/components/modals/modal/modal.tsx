import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import CloseModal from "../close-modal/close-modal";
import styles from "./modal.module.css";

export default function Modal(props: {
  isMobile?: boolean;
  closeModal: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} p-10 pb-15`}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {props.title}
          </h3>
          <CloseModal closeModal={props.closeModal} />
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
      {!props.isMobile && <ModalOverlay closeModal={props.closeModal} />}
    </>,
    document.body
  );
}
