export interface IngredientModel {
  find(arg0: (el: any) => boolean): unknown;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid: string;
}

export interface ConstructorModel {
  bun: IngredientModel;
  ingr: IngredientModel[];
}

export interface OrderDetailsModel {
  name: string;
  order: {
    number: number;
  };
  success: string;
}
