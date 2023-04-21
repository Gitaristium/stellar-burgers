import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import FeedStats from "../components/feed-stats/feed-stats";
import FeedList from "../components/feed/feed";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";
import { LIST, STATS } from "../utils/vars";

const OrdersPage: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // активные табы
    const [current, setCurrent] = useState(LIST);

    const onTabClick = (tab: string) => {
        setCurrent(tab);
    };

    return (
        <>
            <h3
                className={`text text_type_main-large mb-6 ${
                    isMobile ? "align-center" : ""
                }`}
            >
                Лента заказов
            </h3>
            {isMobile && (
                <nav className="custom-tabs">
                    <Tab
                        value={LIST}
                        active={current === LIST}
                        onClick={onTabClick}
                    >
                        Заказы
                    </Tab>
                    <Tab
                        value={STATS}
                        active={current === STATS}
                        onClick={onTabClick}
                    >
                        Статистика
                    </Tab>
                </nav>
            )}
            <section className="two-columns">
                {/* для десктопа рендерим сразу два столбца без табов */}
                {/* для мобилок переключение табами между двумя столбцами */}
                {!isMobile ? (
                    <FeedList />
                ) : (
                    isMobile && current === LIST && <FeedList />
                )}
                {!isMobile ? (
                    <FeedStats />
                ) : (
                    isMobile && current === STATS && <FeedStats />
                )}
            </section>
        </>
    );
};

export default OrdersPage;
