import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import CloseModal from "../close-modal/close-modal";
import styles from "./modal.module.css";
import { useAppSelector } from "../../../services/store/hooks";

export default function Modal(props: {
  closeModal: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const isMobile: boolean = useAppSelector((state: any) => state.mobile);

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
      {!isMobile && <ModalOverlay closeModal={props.closeModal} />}
    </>,
    document.getElementById("modals") as HTMLElement
  );
}
