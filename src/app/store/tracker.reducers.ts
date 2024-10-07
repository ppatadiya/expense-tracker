import { createReducer, on } from "@ngrx/store";
import { addExpense, deleteExpense, editExpense, init } from "./tracker.actions";
import type { Expense } from "../expenses/models/expense.model";


//const inititalState = 50;


export const inititalState: Expense[] = [];


export const trackerReducer = createReducer(
    inititalState,
    on(addExpense, (state, action) => {
        console.log(state);
        console.log(action);
        const updatedExpenses = [...state, action];
        return updatedExpenses
        
    }),
    on(editExpense, (state, action) => {
        console.log(state);
        console.log(action);
        const updatedExpenses = state.map(expense => 
            expense.id === action.id ? { ...expense, ...action } : expense);

        console.log(updatedExpenses);
        return updatedExpenses
        
    }),
    on(deleteExpense, (state, action)=>{
        console.log("I will match index and delete that one");
        
        console.log(state);
        console.log(action);

        return state.filter(e => e.id !== action.id);

        /*const tempData: Expense[] = [{ id: '1000', category: 'eeeeee', remarks: 'poooootato', amount: 1200, expenseDate: new Date('2024-10-05') }];
        return tempData*/
    }),
    on(init, (state, {expenses}) => {
        console.log(state);
        console.log(expenses);
        
        return expenses;
        
    }),
    

);