import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import styles from "./order-details-img.module.scss";

export default function OrderDetailsImg({ img }: { img: string }) {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <img
            src={img}
            alt=""
            className={`${styles.img} ${isMobile ? styles.img__mobile : ""}`}
        />
    );
}
