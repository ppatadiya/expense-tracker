import { createReducer, on } from "@ngrx/store";
import { addExpense, deleteExpense } from "./tracker.actions";
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
    on(deleteExpense, (state, action)=>{
        console.log("I will match index and delete that one");
        
        console.log(state);
        console.log(action);

        return state.filter(e => e.id !== action.id);

        /*const tempData: Expense[] = [{ id: '1000', category: 'eeeeee', remarks: 'poooootato', amount: 1200, expenseDate: new Date('2024-10-05') }];
        return tempData*/
    }),
    /*on(init, (state, action) => {
        console.log(state);
        console.log(action);
        console.log("in begining of app");
        //const updatedExpenses = [...state, action];
        const tempData: Expense[] = [{ id: '1000', category: 'eeeeee', remarks: 'poooootato', amount: 1200, expenseDate: new Date('2024-10-05') },
                                    { id: '1000', category: 'eeeeee', remarks: 'poooootato', amount: 1200, expenseDate: new Date('2024-10-05') },];
        return tempData
        
    }),*/
    

);