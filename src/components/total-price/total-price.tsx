import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IngredientModel } from "../../utils/types";

export default function TotalPrice({ className }: { className: string }) {
  // получаем список конструктора из стора
  const constructorList: {
    bun: IngredientModel;
    ingr: IngredientModel[];
  } = useSelector((store: any) => store.constructorList);

  const [totalPrice, setTotalPrice] = useState(0);

  useMemo(() => {
    let count = 0;
    if (constructorList.bun) {
      count += constructorList.bun.price * 2;
    }
    if (constructorList.ingr) {
      constructorList.ingr.map((elem: IngredientModel) => {
        return (count += elem.price);
      });
    }
    setTotalPrice(count);
  }, [constructorList]);

  return <span className={className}>{totalPrice}</span>;
}
