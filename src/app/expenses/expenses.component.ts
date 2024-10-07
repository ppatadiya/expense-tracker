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


  
  expenses$ = this.store.select(selectTrackerState);
  groupedExpenses: { [key: string]: { expenses: Expense[], totalAmount: number } } = {};

  expenses: Expense[] = [];

  selectedMonth: string = (new Date().getMonth() + 1).toString().padStart(2, '0');
  totalAmount: number = 0;
  

  constructor(private store: Store){}

  ngOnInit(): void {
    this.expenses$.subscribe(expenses => {
      this.expenses = expenses;
      this.filterExpenses();
    });
    

  }

  filterExpenses() {
    console.log('Selected month:', this.selectedMonth);

    this.expenses = this.expensesService.getExpenseByMonth(this.selectedMonth);
    console.log(this.expenses);

    this.totalAmount = this.expenses.reduce((acc, expense) => acc + expense.amount, 0);

      // Group expenses by category and calculate the total amount for each category
      this.groupedExpenses = this.expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = { expenses: [], totalAmount: 0 };
        }
        acc[expense.category].expenses.push(expense);
        acc[expense.category].totalAmount += expense.amount; // Calculate total for the category
        return acc;
      }, {} as { [key: string]: { expenses: Expense[], totalAmount: number } });

      console.log('Grouped expenses with totals:', this.groupedExpenses);

  }
  

  deleteExpense(expenseToDelete: Expense) {
    console.log("Let's delete expense");
    console.log(expenseToDelete);
    
    
    this.store.dispatch(deleteExpense(expenseToDelete));
    
  }



}
