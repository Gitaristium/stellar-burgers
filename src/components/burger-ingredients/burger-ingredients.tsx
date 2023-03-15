import { useMemo, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import { ingredientModel } from "../../utils/ingredients-model";

import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients(props: {
  isMobile: boolean;
  ingredientsList: ingredientModel[];
}) {
  // активные табы
  const [current, setCurrent] = useState("bun");

  // разбиваем полученный из пропсов массив игредиентов на категории
  const ingredientsBun = useMemo(
    () => props.ingredientsList.filter((item) => item.type === "bun"),
    [props.ingredientsList]
  );
  const ingredientsSauce = useMemo(
    () => props.ingredientsList.filter((item) => item.type === "sauce"),
    [props.ingredientsList]
  );
  const ingredientsMain = useMemo(
    () => props.ingredientsList.filter((item) => item.type === "main"),
    [props.ingredientsList]
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
            <BurgerIngredientsCategory
              title="Булки"
              items={ingredientsBun}
              isMobile={props.isMobile}
            />
            <BurgerIngredientsCategory
              title="Соусы"
              items={ingredientsSauce}
              isMobile={props.isMobile}
            />
            <BurgerIngredientsCategory
              title="Начинки"
              items={ingredientsMain}
              isMobile={props.isMobile}
            />
          </div>
        </div>
      </section>
    </>
  );
}
