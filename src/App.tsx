import { useEffect, useState } from "react";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import { ingredients } from "./utils/data.js";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth <= 1150 ? setIsMobile(true) : setIsMobile(false);
    });

    return () => {
      window.removeEventListener("resize", () => {
        window.innerWidth <= 1150 ? setIsMobile(true) : setIsMobile(false);
      });
    };
  });

  return (
    <>
      <AppHeader isMobile={isMobile} />
      <main className={isMobile ? "pt-4 pl-2 pr-2" : "pt-10 pl-5 pr-5"}>
        <div className="content two-columns">
          <BurgerIngredients ingredients={ingredients} isMobile={isMobile} />
          <BurgerConstructor ingredients={ingredients} isMobile={isMobile} />
        </div>
      </main>
    </>
  );
}
