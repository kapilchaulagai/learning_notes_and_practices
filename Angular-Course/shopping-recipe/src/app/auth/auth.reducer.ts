import { createReducer, on } from "@ngrx/store";
import { User } from "./user.model";

export interface AuthState {
    user: User
};

const initialState = {
    user: null,
}

export const authReducer = createReducer(
    initialState
);