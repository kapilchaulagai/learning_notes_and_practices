import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";
import { addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient } from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState = {
    ingredients: [
        new Ingredient('Apples', 3),
        new Ingredient('Tomatoes', 7),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};
export const shoppingListReducer = createReducer(
    initialState,
    on(addIngredient, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action.ingredient]
        };
    }),
    on(addIngredients, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.ingredients]
        };
    }),
    on(deleteIngredient, (state, action) => {
        return {
            ...state, ingredients: state.ingredients.filter((ing, ingIndex) => {
                return ingIndex !== state.editedIngredientIndex;
            }),
            editedIngredient: null,
            editedIngredientIndex: -1,
        }
    }),
    on(updateIngredient, (state, action) => {
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
            ...ingredient,
            ...action.newIngredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

        return {
            ...state,
            ingredients: updatedIngredients,
            editedIngredient: null,
            editedIngredientIndex: -1,
        }
    }),
    on(startEdit, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: action.index,
            editedIngredient: state.ingredients[action.index]
        }
    }),
    on(stopEdit, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredient: null
        };
    }),
);