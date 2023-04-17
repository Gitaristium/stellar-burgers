import { FC } from "react";
import OrdersListElement from "../orders-list-element/orders-list-element";
import { feedData } from "../../utils/feed-data";
import styles from "./feed.module.scss";
import { useAppSelector } from "../../services/store/hooks";
import { getIsMobile } from "../../services/mobile/selectors";

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
