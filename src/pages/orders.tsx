import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

export default function OrdersPage() {
    const isMobile: boolean = useAppSelector(getIsMobile);
    return (
        <>
            {isMobile && (
                <h3 className="text text_type_main-large mb-6 align-center">
                    История заказов
                </h3>
            )}
            <span>content here</span>
        </>
    );
}
