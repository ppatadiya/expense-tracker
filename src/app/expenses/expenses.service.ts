import { Injectable, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectTrackerState } from "../store/tracker.selector";
import { Observable } from "rxjs";
import { Expense } from "./models/expense.model";


@Injectable({ providedIn: 'root' })
export class ExpensesService implements OnInit {

    expenses$: Observable<Expense[]> | undefined; // Observable for the expenses array
    expenses: Expense[] = [];

    constructor(private store: Store){}

    ngOnInit(): void {
        
    }

    getAllExpense(){
        this.expenses$ = this.store.select(selectTrackerState);
        

        // Subscribe to the Observable to get the actual value
        this.expenses$.subscribe((data) => {
        this.expenses = data; // Store the value in the component
        
        });
        return this.expenses;
    }
    


    addExpense() {
        console.log("I will add task soon to http");
    }

    deleteExpense() {
        console.log("I will delete soon to http");
        
    }

    updateLocalStorage(){
        console.log("I am in service to update local storage");
    }
    
    getExpenseById(id: string){
        
        this.getAllExpense();
        

        // Assuming you have an array of expenses and want to find an expense by its id
        const matchingExpense = this.expenses.find(expense => expense.id === id);

        if (matchingExpense) {
        
            return matchingExpense;
        } else {
            console.log("no id found in service file");
            return null;
        }

        
        
        //return  { id: '1', category: 'Grocery', remarks: 'Potato bag 4', amount: 120, expenseDate: '2024-10-05' };
    }

    getExpenseByMonth(month: string){
        
        this.getAllExpense();
        

        const filteredExpense = this.expenses.filter(expense => {
            const expenseDate = new Date(expense.expenseDate);
            return expenseDate.getMonth() + 1 === +month; // Adjust month index as needed
          });
        

        return filteredExpense;


    }
    
}