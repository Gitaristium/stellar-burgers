import { useContext, useMemo, useState } from "react";
import { BurgerConstructorContext } from "../../services/ingredients-context";
import { IngredientModel } from "../../utils/types";

export default function TotalPrice({ className }: { className: string }) {
  const [constructorState] = useContext(BurgerConstructorContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useMemo(() => {
    let count = 0;
    if (constructorState.bun) {
      count += constructorState.bun.price * 2;
    }
    if (constructorState.ingr) {
      constructorState.ingr.map((elem: IngredientModel) => {
        return (count += elem.price);
      });
    }
    setTotalPrice(count);
  }, [constructorState]);

  return <span className={className}>{totalPrice}</span>;
}
