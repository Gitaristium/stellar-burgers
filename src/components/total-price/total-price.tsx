import { getTotalPrice } from "../../services/burger-constructor/selectors";
import { useAppSelector } from "../../services/store/hooks";

export default function TotalPrice({ className }: { className: string }) {
  const price: number = useAppSelector(getTotalPrice);

  return <span className={className}>{price}</span>;
}
