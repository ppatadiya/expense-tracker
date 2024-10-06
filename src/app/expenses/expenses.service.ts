import { Injectable, OnInit } from "@angular/core";
import { EXPENSES } from "./data/expenses-data";


@Injectable({ providedIn: 'root' })
export class ExpensesService implements OnInit {

    private expenses = EXPENSES;

    constructor() {}

    ngOnInit(): void {
        console.log(this.expenses);
        
    }

    addExpense() {
        console.log("I will add task soon to http");
    }

    deleteExpense() {
        console.log("I will delete soon to http");
        
    }
    
}