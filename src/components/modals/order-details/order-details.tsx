import { useState, useEffect } from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import vector1 from "../../../images/order-accpeted/vector1.svg";
import vector2 from "../../../images/order-accpeted/vector2.svg";
import vector3 from "../../../images/order-accpeted/vector3.svg";
import Loading from "../../loading/loading";
import { requestApi } from "../../../utils/request-api";
import { useDispatch, useSelector } from "react-redux";
import { IngredientModel, OrderDetailsModel } from "../../../utils/types";
import { ORDER_LIST_ADD } from "../../../services/actions/orders-list";
import { ORDER_DETAILS_ADD } from "../../../services/actions/order-details";
import { INGREDIENTS_RESET } from "../../../services/actions/constructor-ingredients";

export default function OrderDetails() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });

  // получаем список конструктора из стора
  // и достаем полученную по API инфу о заказе
  const {
    constructorList,
    orderDetails,
  }: {
    constructorList: {
      bun: IngredientModel;
      ingr: IngredientModel[];
    };
    orderDetails: OrderDetailsModel;
  } = useSelector((store: any) => ({
    constructorList: store.constructorList,
    orderDetails: store.orderDetails.details,
  }));

  const dispatch = useDispatch();

  // получаем данные заказа по API
  useEffect(() => {
    setState({ hasError: false, isLoading: true });

    const getOrderDetails = () => {
      let ids = constructorList.ingr.map((x: any) => x._id);

      ids.push(constructorList.bun._id, constructorList.bun._id);

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
          dispatch(ORDER_DETAILS_ADD(res, constructorList));
          dispatch(ORDER_LIST_ADD(res, constructorList));
          dispatch(INGREDIENTS_RESET());
          setState({ ...state, isLoading: false });
        })
        .catch((error) => {
          setState({ hasError: true, isLoading: false });
          console.log("ERROR: " + error);
        });
    };
    if (constructorList.bun) {
      getOrderDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
