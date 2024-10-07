import { Component, OnInit } from '@angular/core';
import { EXPENSES } from './data/expenses-data';
import type { Expense } from './models/expense.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteExpense } from '../store/tracker.actions';
import { selectTrackerState } from '../store/tracker.selector';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {

  expenses$: Observable<Expense[]> | undefined; // Observable for the expenses array

  expenses: Expense[] = [];

  constructor(private store: Store){}

  ngOnInit(): void {
    

    this.expenses$ = this.store.select(selectTrackerState);
    console.log(this.expenses$);

    // Subscribe to the Observable to get the actual value
    this.expenses$.subscribe((data) => {
      this.expenses = data; // Store the value in the component
      console.log(this.expenses); // Log the value received from the store
    });
    

    
  }

  deleteExpense() {
    console.log("Let's delete expense");
    this.store.dispatch(deleteExpense({valueofmychoice: 2}));
    
  }

}
