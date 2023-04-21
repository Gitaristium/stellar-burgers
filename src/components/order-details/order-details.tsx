import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, Key } from "react";
import { useMatch, useParams } from "react-router-dom";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { feedData } from "../../utils/feed-data";
import { ordersData } from "../../utils/orders-data";
import {
    ALL_PATH,
    FEED_PATH,
    ORDERS_PATH,
    PROFILE_PATH,
} from "../../utils/vars";
import Loading from "../loading/loading";
import OrderDetailsElement from "../order-details-element/order-details-element";
import styles from "./order-details.module.scss";

const OrderDetails: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    const feedMatch = useMatch(FEED_PATH + ALL_PATH);
    const ordersMatch = useMatch(PROFILE_PATH + ORDERS_PATH + ALL_PATH);
    const { id } = useParams();

    // ЭТО ПРЯМ СИЛЬНО ВРЕМЕННОЕ РЕШЕНИЕ
    // когда дойдем до загрузки данных заказов по API -
    // надо будет перенести в селекторы
    const orderDetails = feedMatch
        ? feedData.find((el) => el.id === id)
        : ordersMatch
        ? ordersData.find((el) => el.id === id)
        : null;

    return (
        <>
            {orderDetails ? (
                <section
                    className={`${styles.section} ${
                        !isMobile ? "mt-15" : "mt-4"
                    } ${
                        isMobile ? styles.section__mobile : ""
                    } ml-auto mr-auto`}
                >
                    <p
                        className={`${!isMobile ? "mb-10" : "mb-6"} ${
                            !isMobile ? "align-center" : ""
                        } text text_type_digits-default`}
                    >
                        #{orderDetails.number}
                    </p>
                    <h3
                        className={`${
                            !isMobile ? "mb-3" : "mb-2"
                        } text text_type_main-medium`}
                    >
                        {orderDetails.name}
                    </h3>
                    <p
                        className={`${
                            !isMobile ? "mb-15" : "mb-6"
                        } text text_type_main-default`}
                    >
                        {orderDetails.status}
                    </p>
                    <h3
                        className={`${
                            !isMobile ? "mb-6" : "mb-4"
                        } text text_type_main-medium`}
                    >
                        Состав:
                    </h3>
                    <div
                        className={`${styles.ingredients} ${
                            !isMobile
                                ? "pr-6 mb-10"
                                : styles.ingredients__mobile
                        } custom-scroll`}
                    >
                        {orderDetails.ingredients.map(
                            (id: string, index: Key) => (
                                <OrderDetailsElement itemId={id} key={index} />
                            )
                        )}
                    </div>
                    <span
                        className={`${styles.footer} ${
                            isMobile ? styles.footer__mobile : ""
                        }`}
                    >
                        <p className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(orderDetails.date)} />
                        </p>
                        <p
                            className={`${styles.price} text text_type_digits-default ml-6`}
                        >
                            <span className="mr-2">{orderDetails.price}</span>
                            <CurrencyIcon type="primary" />
                        </p>
                    </span>
                </section>
            ) : (
                <Loading>Казна опустела, милорд</Loading>
            )}
        </>
    );
};

export default OrderDetails;
