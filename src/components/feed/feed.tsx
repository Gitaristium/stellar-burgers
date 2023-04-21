import { FC } from "react";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { feedData } from "../../utils/feed-data";
import OrdersListElement from "../orders-list-element/orders-list-element";
import styles from "./feed.module.scss";

const FeedList: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div
                className={`${styles.inner} ${
                    !isMobile ? "pr-4" : "pt-5"
                } pb-4`}
            >
                {feedData.map((item) => (
                    <OrdersListElement item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
};

export default FeedList;
