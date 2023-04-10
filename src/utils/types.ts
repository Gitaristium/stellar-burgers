export interface IngredientModel {
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

export interface ConstructorOrderDetailsModel {
    name: string;
    order: {
        number: number;
    };
    success: string;
}

export interface OrderDetailsModel {
    id: string;
    number: string;
    date: string;
    name: string;
    price: string;
    ingredients: string[];
}
