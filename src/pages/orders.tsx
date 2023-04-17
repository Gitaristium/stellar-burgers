import { FC } from "react";
import OrdersList from "../components/orders-list/order-list";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

const OrdersPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    return (
        <>
            {isMobile && (
                <h3 className="text text_type_main-large mb-6 align-center">
                    История заказов
                </h3>
            )}
            <OrdersList />
        </>
    );
};

export default OrdersPage;
