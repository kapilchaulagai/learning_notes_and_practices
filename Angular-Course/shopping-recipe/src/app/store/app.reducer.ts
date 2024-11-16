import { combineReducers } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/auth.reducer";
import { State, shoppingListReducer } from "../shopping-list/shopping-list.reducer";

export interface AppState {
    shoppingList: State;
    auth: AuthState
}

export const appReducer = combineReducers(
    {
        shoppingList: shoppingListReducer,
        auth: authReducer
    }
)