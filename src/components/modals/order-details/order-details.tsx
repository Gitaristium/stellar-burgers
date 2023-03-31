import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import vector1 from "../../../images/order-accpeted/vector1.svg";
import vector2 from "../../../images/order-accpeted/vector2.svg";
import vector3 from "../../../images/order-accpeted/vector3.svg";
import { getOrderNumber } from "../../../services/order-details/selectors";
import { useAppSelector } from "../../../services/store/hooks";

export default function OrderDetails() {
  // получаем номер заказ из стора
  const orderNumber: number = useAppSelector(getOrderNumber);

  return (
    <div className={`${styles.modal} p-10`}>
      <>
        <p className={`${styles.order__num} text text_type_digits-large mb-8`}>
          {orderNumber}
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <div className={`${styles.done} mb-15 ml-auto mr-auto`}>
          <img src={vector1} alt="" className={styles.done__round} />
          <img src={vector2} alt="" className={styles.done__round} />
          <img src={vector3} alt="" className={styles.done__round} />
          <CheckMarkIcon type="primary" />
        </div>
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </>
    </div>
  );
}
