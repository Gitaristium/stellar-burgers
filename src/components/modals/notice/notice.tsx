import ReactDOM from "react-dom";
import styles from "./notice.module.scss";

export default function Notice(props: { text: string; type?: "error" }) {
    return ReactDOM.createPortal(
        <div
            className={`${styles.notice} ${
                props.type === "error" ? styles.error : ""
            }`}
        >
            <p className="text text_type_main-default">{props.text}</p>
        </div>,
        document.getElementById("notices") as HTMLElement
    );
}
