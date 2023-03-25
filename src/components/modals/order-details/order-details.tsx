import { useState, useEffect, useContext } from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import vector1 from "../../../images/order-accpeted/vector1.svg";
import vector2 from "../../../images/order-accpeted/vector2.svg";
import vector3 from "../../../images/order-accpeted/vector3.svg";
import Loading from "../../loading/loading";
import { requestApi } from "../../../utils/request-api";
import { OrderDetailsContext } from "../../../services/order-details-context";
import { BurgerConstructorContext } from "../../../services/ingredients-context";

export default function OrderDetails() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });

  const [constructorState] = useContext(BurgerConstructorContext);
  const [orderDetails, setOrderDetails] = useContext(OrderDetailsContext);

  // получаем данные заказа по API
  useEffect(() => {
    setState({ hasError: false, isLoading: true });

    const getOrderDetails = () => {
      let ids = constructorState.ingr.map((x: any) => x._id);

      ids.push(constructorState.bun._id, constructorState.bun._id);

      let sendIngrArr = {
        ingredients: ids,
      };

      requestApi("orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendIngrArr),
      })
        .then((res) => {
          setOrderDetails(res);
          setState({ ...state, isLoading: false });
        })
        .catch((error) => {
          setState({ hasError: true, isLoading: false });
          console.log("ERROR: " + error);
        });
    };
    if (constructorState.bun) {
      getOrderDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructorState]);

  return (
    <div className={`${styles.modal} p-10`}>
      {/* стандартная вилка рендера */}
      {state.isLoading && <Loading>Загрузка данных</Loading>}
      {state.hasError && <Loading>Ошибка загрузки Х_Х</Loading>}
      {!state.isLoading && !state.hasError && (
        <>
          <p
            className={`${styles.order__num} text text_type_digits-large mb-8`}
          >
            {orderDetails.order.number}
          </p>
          <p className="text text_type_main-medium mb-15">
            идентификатор заказа
          </p>
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
      )}
    </div>
  );
}
