import { Injectable, OnInit } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ExpensesService {

    constructor() {}


    addExpense() {
        console.log("I will add task soon to http");
    }

    deleteExpense() {
        console.log("I will delete soon to http");
        
    }

    updateLocalStorage(){
        console.log("I am in service to update local storage");
    }
    
}