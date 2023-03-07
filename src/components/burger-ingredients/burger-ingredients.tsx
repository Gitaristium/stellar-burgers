import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";

import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients({
  ingredients,
  isMobile,
}: {
  ingredients: any;
  isMobile: boolean;
}) {
  // активные табы
  const [current, setCurrent] = useState("bun");

  // разбиваем полученный из пропсов массив игредиентов на категории
  const ingredientsBun = ingredients.filter(
    (item: { type: string }) => item.type === "bun"
  );
  const ingredientsSauce = ingredients.filter(
    (item: { type: string }) => item.type === "sauce"
  );
  const ingredientsMain = ingredients.filter(
    (item: { type: string }) => item.type === "main"
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
              isMobile={isMobile}
            />
            <BurgerIngredientsCategory
              title="Соусы"
              items={ingredientsSauce}
              isMobile={isMobile}
            />
            <BurgerIngredientsCategory
              title="Начинки"
              items={ingredientsMain}
              isMobile={isMobile}
            />
          </div>
        </div>
      </section>
    </>
  );
}
