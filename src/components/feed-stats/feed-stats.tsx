import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import styles from "./feed-stats.module.scss";

export default function FeedStats() {
    const isMobile: boolean = useAppSelector(getIsMobile);

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div className={`${styles.inner} ${isMobile ? "pt-5" : ""}`}>
                <div className={`${styles.status} mb-15`}>
                    <span className={`${styles.status__column} mr-9`}>
                        <h4 className="text text_type_main-medium mb-6">
                            Готовы:
                        </h4>
                        <p className="text text_type_digits-default mb-2">
                            034533
                        </p>
                        <p className="text text_type_digits-default mb-2">
                            034532
                        </p>
                        <p className="text text_type_digits-default mb-2">
                            034530
                        </p>
                        <p className="text text_type_digits-default mb-2">
                            034527
                        </p>
                        <p className="text text_type_digits-default mb-2">
                            034525
                        </p>
                    </span>
                    <span className={styles.status__column}>
                        <h4 className="text text_type_main-medium mb-6">
                            В работе:
                        </h4>
                        <p className="text text_type_digits-default mb-2">
                            034538
                        </p>
                        <p className="text text_type_digits-default mb-2">
                            034541
                        </p>
                        <p className="text text_type_digits-default mb-2">
                            034542
                        </p>
                    </span>
                </div>
                <div className="mb-15">
                    <h4 className="text text_type_main-medium">
                        Выполнено за все время:
                    </h4>
                    <p className="text text_type_digits-large">28752</p>
                </div>
                <div>
                    <h4 className="text text_type_main-medium">
                        Выполнено за сегодня:
                    </h4>
                    <p className="text text_type_digits-large mb-6">138</p>
                </div>
            </div>
        </section>
    );
}
