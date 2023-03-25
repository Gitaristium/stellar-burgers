import { useContext, useState } from "react";

import BurgerConstructorView from "../burger-constructor-view/burger-constructor-view";
import stylesMobile from "../burger-constructor-view/burger-constructor-view-mobile.module.css";
import { IsMobileContext } from "../../services/ismobile-context";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modals/modal/modal";
import TotalPrice from "../total-price/total-price";

export default function BurgerConstructor() {
  const isMobile: boolean = useContext(IsMobileContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!isMobile ? (
        // для десктопа
        <BurgerConstructorView />
      ) : (
        // для мобилки
        <>
          <section className={stylesMobile.constructor__container}>
            <div className={`${stylesMobile.sum} mt-10`}>
              <TotalPrice className="text text_type_digits-default" />
              <CurrencyIcon type="primary" />
              <Button
                htmlType="button"
                type="primary"
                size="small"
                onClick={() => setIsModalOpen(true)}
                extraClass="remove-select ml-4"
              >
                Смотреть заказ
              </Button>
            </div>
          </section>

          {isModalOpen && isMobile && (
            <Modal closeModal={() => setIsModalOpen(false)} title="Заказ">
              <BurgerConstructorView />
            </Modal>
          )}
        </>
      )}
    </>
  );
}
