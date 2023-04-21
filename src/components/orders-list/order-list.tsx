import { FC } from "react";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { ordersData } from "../../utils/orders-data";
import OrdersListElement from "../orders-list-element/orders-list-element";
import styles from "./order-list.module.scss";

const OrdersList: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div className={`${styles.inner} ${!isMobile ? "pr-4" : ""} pb-4`}>
                {ordersData.map((item) => (
                    <OrdersListElement item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
};

export default OrdersList;
