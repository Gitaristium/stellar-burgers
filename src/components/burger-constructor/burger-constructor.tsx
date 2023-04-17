import { FC, useState } from "react";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorView from "../burger-constructor-view/burger-constructor-view";
import Modal from "../modals/modal/modal";
import TotalPrice from "../total-price/total-price";
import styles from "./burger-constructor.module.scss";
import { useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";

const BurgerConstructor: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {!isMobile ? (
                // для десктопа
                <BurgerConstructorView />
            ) : (
                // для мобилки
                <>
                    <section className={styles.section}>
                        <div className={`${styles.sum} mt-10`}>
                            <TotalPrice extraClass="text text_type_digits-default" />
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
                        <Modal
                            closeModal={() => setIsModalOpen(false)}
                            title="Заказ"
                        >
                            <BurgerConstructorView />
                        </Modal>
                    )}
                </>
            )}
        </>
    );
};

export default BurgerConstructor;
