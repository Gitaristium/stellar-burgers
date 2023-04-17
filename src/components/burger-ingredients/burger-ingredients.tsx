import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import Loading from "../loading/loading";
import Modal from "../modals/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { BUN, SAUCE, MAIN, INGREDIENTS } from "../../utils/vars";
import styles from "./burger-ingredients.module.scss";
import { getIsMobile } from "../../services/mobile/selectors";
import {
    getIngredientsList,
    getIngredientsIsLoading,
    getIngredientsHasError,
    getIngredientsRequestSuccess,
} from "../../services/ingredients-list/selectors";

import { IngredientModel } from "../../utils/types";
import { useAppSelector } from "../../services/store/hooks";

const BurgerIngredients: FC = () => {
    // булин для мобилок
    const isMobile: boolean = useAppSelector(getIsMobile);
    // список всех ингредиентов, полученных по API
    const ingredientsList: IngredientModel[] =
        useAppSelector(getIngredientsList);
    const isLoading: boolean = useAppSelector(getIngredientsIsLoading);
    const hasError: boolean = useAppSelector(getIngredientsHasError);
    const requestSuccess: boolean = useAppSelector(
        getIngredientsRequestSuccess
    );

    // разбиваем массив игредиентов на категории
    const ingredientsBun = useMemo(
        () => ingredientsList?.filter((item) => item.type === BUN),
        [ingredientsList]
    );
    const ingredientsSauce = useMemo(
        () => ingredientsList?.filter((item) => item.type === SAUCE),
        [ingredientsList]
    );
    const ingredientsMain = useMemo(
        () => ingredientsList?.filter((item) => item.type === MAIN),
        [ingredientsList]
    );

    // чистим стор детального просмотра
    // модалка сама закроется
    const closeModal = () => {
        // dispatch(DETAILS_RESET());
    };

    // активные табы
    const [current, setCurrent] = useState(BUN);

    const scrollBoxRef = useRef<HTMLDivElement | null>(null);
    const bunsRef = useRef<HTMLHeadingElement | null>(null);
    const saucesRef = useRef<HTMLHeadingElement | null>(null);
    const mainsRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const scrollBoxTop = scrollBoxRef.current?.getBoundingClientRect().top;
        const scrollIngredients = () => {
            const bunsTop = bunsRef.current?.getBoundingClientRect().top;
            const saucesTop = saucesRef.current?.getBoundingClientRect().top;
            const mainsTop = mainsRef.current?.getBoundingClientRect().top;

            if (scrollBoxTop && bunsTop && saucesTop && mainsTop) {
                const bunsActive = bunsTop - scrollBoxTop;
                const saucesActive = saucesTop - scrollBoxTop;
                const mainsActive = mainsTop - scrollBoxTop;

                if (bunsActive <= 0 && saucesActive > 0 && mainsActive > 0) {
                    setCurrent(BUN);
                }
                if (bunsActive < 0 && saucesActive <= 0 && mainsActive > 0) {
                    setCurrent(SAUCE);
                }
                if (bunsActive < 0 && saucesActive < 0 && mainsActive <= 0) {
                    setCurrent(MAIN);
                }
            }
        };

        // вешаем лисанер
        scrollBoxRef.current?.addEventListener("scroll", scrollIngredients, {
            passive: true,
        });
        // снимаем лисенер
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            scrollBoxRef.current?.removeEventListener(
                "scroll",
                scrollIngredients
            );
        };
    }, [isLoading, isMobile]);

    const onTabClick = (tab: string) => {
        setCurrent(tab);
        let refActive = null;
        if (tab === BUN) refActive = bunsRef.current;
        if (tab === SAUCE) refActive = saucesRef.current;
        if (tab === MAIN) refActive = mainsRef.current;

        refActive?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section className={styles.section}>
                <h1
                    className={`${styles.title} text text_type_main-large mb-5`}
                >
                    Соберите бургер
                </h1>

                {/* стандартная вилка рендера */}
                {isLoading && <Loading>Загрузка данных</Loading>}
                {hasError && <Loading>Ошибка загрузки Х_Х</Loading>}
                {requestSuccess && ingredientsList?.length > 0 && (
                    <>
                        <nav className="custom-tabs">
                            <Tab
                                value={BUN}
                                active={current === BUN}
                                onClick={onTabClick}
                            >
                                Булки
                            </Tab>
                            <Tab
                                value={SAUCE}
                                active={current === SAUCE}
                                onClick={onTabClick}
                            >
                                Соусы
                            </Tab>
                            <Tab
                                value={MAIN}
                                active={current === MAIN}
                                onClick={onTabClick}
                            >
                                Начинки
                            </Tab>
                        </nav>
                        <div
                            className={`${styles.container} custom-scroll`}
                            ref={scrollBoxRef}
                        >
                            <div className={styles.inner}>
                                <BurgerIngredientsCategory
                                    title="Булки"
                                    items={ingredientsBun}
                                    ref={bunsRef}
                                    type={BUN}
                                />
                                <BurgerIngredientsCategory
                                    title="Соусы"
                                    items={ingredientsSauce}
                                    ref={saucesRef}
                                    type={INGREDIENTS}
                                />
                                <BurgerIngredientsCategory
                                    title="Начинки"
                                    items={ingredientsMain}
                                    ref={mainsRef}
                                    type={INGREDIENTS}
                                />
                            </div>
                        </div>
                    </>
                )}
                {requestSuccess && ingredientsList?.length === 0 && (
                    <Loading>Казна опустела, Милорд</Loading>
                )}
            </section>

            {false && (
                <Modal
                    closeModal={() => closeModal()}
                    title="Детали ингредиента"
                >
                    <IngredientDetails />
                </Modal>
            )}
        </>
    );
};

export default BurgerIngredients;
