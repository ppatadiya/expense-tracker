import { Component, OnInit } from '@angular/core';
import { EXPENSES } from './data/expenses-data';
import type { Expense } from './models/expense.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteExpense } from '../store/tracker.actions';



@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {

  expenses: Expense[] = [];

  constructor(private store: Store){}

  ngOnInit(): void {
    this.expenses = EXPENSES; // Assign the dummy data to the expenses array when component loads
    console.log(this.expenses);
    
  }

  deleteExpense() {
    console.log("Let's delete expense");
    this.store.dispatch(deleteExpense({valueofmychoice: 2}));
    
    
  }

}
