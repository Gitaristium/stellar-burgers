import { useMemo, useState, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { ingredientModel } from "../../utils/ingredients-model";
import { IngredientsListContext } from "../../services/ingredients-context";

import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients() {
  // список всех ингредиентов, полученных по API
  const ingredientsList: ingredientModel[] = useContext(IngredientsListContext);

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

  return (
    <>
      <section className={`${styles.ingredients} ingredients`}>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>

        <nav className={styles.nav}>
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </nav>

        <div className={`${styles.container} custom-scroll`}>
          <div className={`${styles.inner} pt-10 pb-10`}>
            <BurgerIngredientsCategory title="Булки" items={ingredientsBun} />
            <BurgerIngredientsCategory title="Соусы" items={ingredientsSauce} />
            <BurgerIngredientsCategory
              title="Начинки"
              items={ingredientsMain}
            />
          </div>
        </div>
      </section>
    </>
  );
}
