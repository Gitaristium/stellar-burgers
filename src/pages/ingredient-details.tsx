import IngredientDetails from "../components/modals/ingredient-details/ingredient-details";
import Loading from "../components/loading/loading";
import NotFoundPage from "./404";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";
import { IngredientModel } from "../utils/types";
import {
  getIngredientById,
  getIngredientsRequestSuccess,
} from "../services/ingredients-list/selectors";
import { useParams } from "react-router-dom";

export default function IngredientDetailsPages() {
  const isMobile: boolean = useAppSelector(getIsMobile);
  const requestSuccess: boolean = useAppSelector(getIngredientsRequestSuccess);

  const { id } = useParams();

  const ingredientDetails: IngredientModel = useAppSelector(
    getIngredientById(id)
  );

  return (
    <>
      {/* если данные по API еще не получены, то рендерим прелоадер */}
      {!requestSuccess && <Loading>Грузим детали</Loading>}
      {/* если данные по API получены, то находим нужный ингредиент*/}
      {requestSuccess && ingredientDetails && (
        <>
          <h3
            className={`text text_type_main-large align-center ${
              !isMobile ? "mt-20" : "mt-10"
            }`}
          >
            Детали ингредиента
          </h3>
          <IngredientDetails />
        </>
      )}
      {/* если нужный ингредиент не нашелся - рендерим 404 */}
      {requestSuccess && !ingredientDetails && <NotFoundPage />}
    </>
  );
}
