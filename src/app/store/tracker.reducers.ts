import { createReducer, on } from "@ngrx/store";
import { addExpense, deleteExpense } from "./tracker.actions";

const inititalState = 0;

export const trackerReducer = createReducer(
    inititalState,
    on(addExpense, (state, action) => {
        console.log(state);
        console.log(action);
        return state + action.valueofmychoice
    }),
    on(deleteExpense, (state, action)=>{
        console.log(state);
        console.log(action);
        return state + action.valueofmychoice
    }),
    

);