import { useMemo } from "react";
import { getСonstructorList } from "../../utils/selectors";
import { IngredientModel } from "../../utils/types";
import { useAppSelector } from "../../services/store/hooks";

export default function TotalPrice({ className }: { className: string }) {
  // получаем список конструктора из стора
  const constructorList: {
    bun: IngredientModel;
    ingr: IngredientModel[];
  } = useAppSelector(getСonstructorList);

  const count = useMemo(() => {
    let count = 0;
    if (constructorList.bun) {
      count += constructorList.bun.price * 2;
    }
    if (constructorList.ingr) {
      count += constructorList.ingr.reduce((acc, elem) => acc + elem.price, 0);
    }
    return count;
  }, [constructorList]);

  return <span className={className}>{count}</span>;
}
