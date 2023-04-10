import { Key } from "react";
import { Link } from "react-router-dom";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetailsImg from "../order-details-img/order-details-img";
import { getImagesByIngredientId } from "../../services/ingredients-list/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";
import styles from "./orders-list-element.module.scss";

export default function OrdersListElement({ item }: { item: any }) {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const images: any = useAppSelector(
        getImagesByIngredientId(item.ingredients)
    );

    return (
        <Link
            className={`${styles.item} ${!isMobile ? "p-6 mb-6" : "p-4 mb-4"}`}
            to={item.id}
        >
            <div className={`${styles.header} mb-6`}>
                <p className="text text_type_digits-default">#{item.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(item.date)} />
                </p>
            </div>
            <h3 className="text text_type_main-medium">{item.name}</h3>
            {item.status && (
                <p className="text text_type_main-default mt-2">
                    {item.status}
                </p>
            )}
            <div className={`${styles.footer} mt-6`}>
                <span className={styles.footer__images}>
                    {images.slice(0, 6).map((el: string, index: Key) => (
                        <OrderDetailsImg img={el} key={index} />
                    ))}
                    {images.length > 6 && (
                        <span
                            className={`${styles.count} ${
                                isMobile ? styles.count__mobile : ""
                            } text text_type_main-default`}
                        >
                            +{images.length - 6}
                        </span>
                    )}
                </span>
                <p
                    className={`${styles.price} text text_type_digits-default ml-6`}
                >
                    <span className="mr-2">{item.price}</span>
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </Link>
    );
}
