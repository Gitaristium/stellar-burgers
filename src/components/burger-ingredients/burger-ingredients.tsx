import { useEffect, useMemo, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { IngredientModel } from "../../utils/types";
import styles from "./burger-ingredients.module.css";
import Loading from "../loading/loading";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request-api";
import { INGREDIENTS_LOAD } from "../../services/actions/burger-ingredients";

export default function BurgerIngredients() {
  // булин для мобилок
  // список всех ингредиентов, полученных по API
  const {
    isMobile,
    ingredientsList,
  }: {
    isMobile: boolean;
    ingredientsList: IngredientModel[];
  } = useSelector((store: any) => ({
    isMobile: store.mobile,
    ingredientsList: store.ingredientsList,
  }));

  // активные табы
  const [current, setCurrent] = useState("bun");

  // разбиваем полученный из пропсов массив игредиентов на категории
  const ingredientsBun = useMemo(
    () => ingredientsList.filter((item) => item.type === "bun"),
    [ingredientsList]
  );
  const ingredientsSauce = useMemo(
    () => ingredientsList.filter((item) => item.type === "sauce"),
    [ingredientsList]
  );
  const ingredientsMain = useMemo(
    () => ingredientsList.filter((item) => item.type === "main"),
    [ingredientsList]
  );

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });

  const dispatch = useDispatch();

  // получаем данные по API
  useEffect(() => {
    const getIngredients = () => {
      setState({ hasError: false, isLoading: true });
      requestApi("ingredients", null)
        .then((res) => {
          dispatch(INGREDIENTS_LOAD(res.data));
          setState({ ...state, isLoading: false });
        })
        .catch((error) => {
          setState({ hasError: true, isLoading: false });
          console.log("ERROR: " + error);
        });
    };

    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBox = useRef<HTMLDivElement | null>(null);
  const navTabs = useRef<HTMLElement | null>(null);
  const buns = useRef<HTMLElement | null>(null);
  const sauces = useRef<HTMLElement | null>(null);
  const mains = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const navTabsTop = navTabs.current?.getBoundingClientRect().bottom;

    const scrollIngredients = () => {
      const bunsTop = buns.current?.getBoundingClientRect().top;
      const saucesTop = sauces.current?.getBoundingClientRect().top;
      const mainsTop = mains.current?.getBoundingClientRect().top;

      if (navTabsTop && bunsTop && saucesTop && mainsTop) {
        const bunsActive = bunsTop - navTabsTop;
        const saucesActive = saucesTop - navTabsTop;
        const mainsActive = mainsTop - navTabsTop;

        if (bunsActive <= 0 && saucesActive > 0 && mainsActive > 0) {
          setCurrent("bun");
        }
        if (bunsActive < 0 && saucesActive <= 0 && mainsActive > 0) {
          setCurrent("sauce");
        }
        if (bunsActive < 0 && saucesActive < 0 && mainsActive <= 0) {
          setCurrent("main");
        }
      }
    };

    // вешаем лисанер
    scrollBox.current?.addEventListener("scroll", scrollIngredients, {
      passive: true,
    });
    // снимаем лисенер
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollBox.current?.removeEventListener("scroll", scrollIngredients);
    };
  }, [state.isLoading, isMobile]);

  // useEffect(() => {
  //   if (current === "bun") {
  //     buns.current?.scrollIntoView();
  //   }
  //   if (current === "sauce") {
  //     sauces.current?.scrollIntoView();
  //   }
  //   if (current === "main") {
  //     mains.current?.scrollIntoView();
  //   }
  // }, [current]);

  return (
    <>
      <section className={`${styles.ingredients} ingredients`}>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>

        {/* стандартная вилка рендера */}
        {state.isLoading && <Loading>Загрузка данных</Loading>}
        {state.hasError && <Loading>Ошибка загрузки Х_Х</Loading>}
        {!state.isLoading &&
        !state.hasError &&
        Object.keys(ingredientsList).length !== 0 ? (
          <>
            <nav className={styles.nav} ref={navTabs}>
              <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab
                value="sauce"
                active={current === "sauce"}
                onClick={setCurrent}
              >
                Соусы
              </Tab>
              <Tab
                value="main"
                active={current === "main"}
                onClick={setCurrent}
              >
                Начинки
              </Tab>
            </nav>
            <div
              className={`${styles.container} custom-scroll`}
              ref={scrollBox}
            >
              <div className={styles.inner}>
                <BurgerIngredientsCategory
                  title="Булки"
                  items={ingredientsBun}
                  extraRef={buns}
                  type="bun"
                />
                <BurgerIngredientsCategory
                  title="Соусы"
                  items={ingredientsSauce}
                  extraRef={sauces}
                  type="ingredients"
                />
                <BurgerIngredientsCategory
                  title="Начинки"
                  items={ingredientsMain}
                  extraRef={mains}
                  type="ingredients"
                />
              </div>
            </div>
          </>
        ) : (
          !state.isLoading && <Loading>Казна опустела, Милорд</Loading>
        )}
      </section>
    </>
  );
}
