import { useEffect, useMemo, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import Loading from "../loading/loading";
import Modal from "../modals/modal/modal";
import IngredientDetails from "../modals/ingredient-details/ingredient-details";
import { INGREDIENTS_REQEST } from "../../services/ingredients-list/actions";
import { BUN, SAUCE, MAIN, INGREDIENTS } from "../../utils/vars";
import styles from "./burger-ingredients.module.css";
import { DETAILS_RESET } from "../../services/ingredient-details/actions";
import { getIsMobile } from "../../services/mobile/selectors";
import {
  getIngredientsList,
  getIngredientsIsLoading,
  getIngredientsHasError,
  getIngredientsRequestSuccess,
} from "../../services/ingredients-list/selectors";
import { getIngredientDetails } from "../../services/ingredient-details/selectors";

import { IngredientModel } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";

export default function BurgerIngredients() {
  // булин для мобилок
  const isMobile: boolean = useAppSelector(getIsMobile);
  // список всех ингредиентов, полученных по API
  const ingredientsList: IngredientModel[] = useAppSelector(getIngredientsList);
  const isLoading: boolean = useAppSelector(getIngredientsIsLoading);
  const hasError: boolean = useAppSelector(getIngredientsHasError);
  const requestSuccess: boolean = useAppSelector(getIngredientsRequestSuccess);

  // получаем информацию об ингредиенте для детального просмотра
  const ingredientDetails: IngredientModel =
    useAppSelector(getIngredientDetails);

  // чистим стор детального просмотра
  // модалка сама закроется
  const closeModal = () => {
    dispatch(DETAILS_RESET());
  };

  // активные табы
  const [current, setCurrent] = useState("bun");

  // разбиваем полученный из пропсов массив игредиентов на категории
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

  // получаем данные по API
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(INGREDIENTS_REQEST(INGREDIENTS));
  }, [dispatch]);

  const scrollBoxRef = useRef<HTMLDivElement | null>(null);
  const navTabsRef = useRef<HTMLHeadingElement | null>(null);
  const bunsRef = useRef<HTMLHeadingElement | null>(null);
  const saucesRef = useRef<HTMLHeadingElement | null>(null);
  const mainsRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const navTabsTop = navTabsRef.current?.getBoundingClientRect().bottom;

    const scrollIngredients = () => {
      const bunsTop = bunsRef.current?.getBoundingClientRect().top;
      const saucesTop = saucesRef.current?.getBoundingClientRect().top;
      const mainsTop = mainsRef.current?.getBoundingClientRect().top;

      if (navTabsTop && bunsTop && saucesTop && mainsTop) {
        const bunsActive = bunsTop - navTabsTop;
        const saucesActive = saucesTop - navTabsTop;
        const mainsActive = mainsTop - navTabsTop;

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
      scrollBoxRef.current?.removeEventListener("scroll", scrollIngredients);
    };
  }, [isLoading, isMobile]);

  return (
    <>
      <section className={`${styles.ingredients} ingredients`}>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>

        {/* стандартная вилка рендера */}
        {isLoading && <Loading>Загрузка данных</Loading>}
        {hasError && <Loading>Ошибка загрузки Х_Х</Loading>}
        {requestSuccess && ingredientsList?.length > 0 && (
          <>
            <nav className={styles.nav} ref={navTabsRef}>
              <Tab value={BUN} active={current === BUN} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab
                value="sauce"
                active={current === "sauce"}
                onClick={setCurrent}
              >
                Соусы
              </Tab>
              <Tab value={MAIN} active={current === MAIN} onClick={setCurrent}>
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

      {ingredientDetails && (
        <Modal closeModal={() => closeModal()} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}
