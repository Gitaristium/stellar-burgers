import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./close-modal.module.css";

export default function CloseModal({ closeModal }: { closeModal: () => void }) {
    return (
        <span
            className={`${styles.modal__close} remove-select`}
            onClick={closeModal}
        >
            <CloseIcon type="primary" />
        </span>
    );
}
