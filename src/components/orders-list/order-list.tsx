import OrderDetails from "../order-details/order-details";
import { ordersData } from "../../utils/orders-data";
import styles from "./order-list.module.css";
import { useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";

export default function OrdersList() {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div className={`${styles.inner} ${!isMobile ? "pr-4" : ""} pb-4`}>
                {ordersData.map((item) => (
                    <OrderDetails item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}
