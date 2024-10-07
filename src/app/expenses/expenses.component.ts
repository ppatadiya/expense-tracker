import { Component, inject, OnInit } from '@angular/core';
import { EXPENSES } from './data/expenses-data';
import type { Expense } from './models/expense.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteExpense } from '../store/tracker.actions';
import { selectTrackerState } from '../store/tracker.selector';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from './expenses.service';



@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {

  private expensesService = inject(ExpensesService);


  expenses$: Observable<Expense[]> | undefined; // Observable for the expenses array

  expenses: Expense[] = [];

  selectedMonth: string = (new Date().getMonth() + 1).toString().padStart(2, '0');

  constructor(private store: Store){}

  ngOnInit(): void {

    this.filterExpenses();

  }

  filterExpenses() {
    console.log('Selected month:', this.selectedMonth);

    this.expenses = this.expensesService.getExpenseByMonth(this.selectedMonth);
    console.log(this.expenses);
    
    // Implement your filtering logic here
  }
  

  deleteExpense(expenseToDelete: Expense) {
    console.log("Let's delete expense");
    console.log(expenseToDelete);
    
    
    this.store.dispatch(deleteExpense(expenseToDelete));
    
  }

}
