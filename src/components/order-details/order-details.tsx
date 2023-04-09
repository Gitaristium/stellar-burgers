import { Link } from "react-router-dom";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { getImagesByIngredientId } from "../../services/ingredients-list/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";

export default function OrderDetails({ item }: { item: any }) {
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
                <p className="text text_type_main-default mt-2 mb-6">
                    {item.status}
                </p>
            )}
            <div className={styles.footer}>
                <div>
                    {images.map((el: string) => (
                        <img
                            src={el}
                            alt=""
                            key={el}
                            className={`${styles.img} ${
                                isMobile ? styles.img__mobile : ""
                            }`}
                        />
                    ))}
                </div>
                <div
                    className={`${styles.price} text text_type_digits-default ml-6`}
                >
                    <span className="mr-2">{item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    );
}
