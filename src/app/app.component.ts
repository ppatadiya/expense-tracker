import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { Store } from '@ngrx/store';
import { Expense } from './expenses/models/expense.model';
import { EXPENSES } from './expenses/data/expenses-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  ngOnInit(): void {
    
    /*const expenseDataToAdd: Expense = 
            { id: Date.now().toString(),
              category: '44444444443434',
              remarks: '3232333343',
              amount: 50,
              expenseDate: new Date('2024/10/18')
            };*/

    const storedExpenses = localStorage.getItem('expenses');

    // Declare the variable outside the if-else block
    let expenseDataToAdd: Expense[] = [];

    // Check if storedExpenses is not null
    if (storedExpenses) {
      // Parse the JSON string into an array of Expense objects
      expenseDataToAdd = JSON.parse(storedExpenses);

      // Log the parsed expenses to the console
      console.log(expenseDataToAdd);
    } else {
      console.log('No expenses found in local storage.');

      expenseDataToAdd = EXPENSES;
      
    }
    
  
    console.log(expenseDataToAdd);
    
    //this.store.dispatch(init(expenseDataToAdd));
    
  }

  constructor(private store: Store){}

}
