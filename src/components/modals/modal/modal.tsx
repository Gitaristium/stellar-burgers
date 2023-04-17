import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import CloseModal from "../close-modal/close-modal";
import styles from "./modal.module.scss";
import { useAppSelector } from "../../../services/store/hooks";
import { getIsMobile } from "../../../services/mobile/selectors";

interface IProps {
    closeModal: () => void;
    title?: string;
    children: ReactNode;
}

const Modal: FC<IProps> = (props) => {
    const isMobile: boolean = useAppSelector(getIsMobile);

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
};

export default Modal;
