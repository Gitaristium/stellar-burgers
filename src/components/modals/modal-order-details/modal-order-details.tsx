import styles from "./modal-order-details.module.css";
import vector1 from "../../../images/order-accpeted/vector1.svg";
import vector2 from "../../../images/order-accpeted/vector2.svg";
import vector3 from "../../../images/order-accpeted/vector3.svg";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CloseModal from "../close-modal/close-modal";
// import useAnimNum from "../../../hooks/order-count";

export default function ModalOrderDetails(props: {
  isMobile?: boolean;
  closeModal: () => void;
}) {
  return (
    <div className={`${styles.modal} pt-30 pb-30 pl-10 pr-10`}>
      {!props.isMobile && <CloseModal closeModal={props.closeModal} />}
      <p className={`${styles.order__num} text text_type_digits-large mb-8`}>
        034536
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
    </div>
  );
}
