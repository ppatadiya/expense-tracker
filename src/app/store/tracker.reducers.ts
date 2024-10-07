import { createReducer, on } from "@ngrx/store";
import { addExpense, deleteExpense, editExpense, init } from "./tracker.actions";
import type { Expense } from "../expenses/models/expense.model";

export const inititalState: Expense[] = [];


export const trackerReducer = createReducer(
    inititalState,
    on(addExpense, (state, action) => [...state, action]),
    on(editExpense, (state, action) => {
        const updatedExpenses = state.map(expense => 
            expense.id === action.id ? { ...expense, ...action } : expense);
      
        return updatedExpenses
        
    }),
    on(deleteExpense, (state, action)=> state.filter(e => e.id !== action.id)),
    on(init, (state, {expenses}) => expenses),
    

);