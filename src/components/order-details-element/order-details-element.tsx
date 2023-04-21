import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { getIngredientById } from "../../services/ingredients-list/selectors";
import { useAppSelector } from "../../services/store/hooks";
import Loading from "../loading/loading";
import OrderDetailsImg from "../order-details-img/order-details-img";
import styles from "./order-details-element.module.scss";

interface IProps {
    itemId: string;
}

const OrderDetailsElement: FC<IProps> = ({ itemId }) => {
    const item = useAppSelector(getIngredientById(itemId as string));

    return (
        <>
            {!item ? (
                <Loading />
            ) : (
                <article className={`${styles.item} mb-4`}>
                    <OrderDetailsImg img={item.image_mobile} />
                    <h3
                        className={`${styles.title} text text_type_main-default ml-4 mr-4`}
                    >
                        {item.name}
                    </h3>
                    <p
                        className={`${styles.price} text text_type_digits-default`}
                    >
                        <span className="mr-2">2 x</span>
                        <span className="mr-2"> {item.price}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                </article>
            )}
        </>
    );
};

export default OrderDetailsElement;
