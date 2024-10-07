import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import type { Expense } from './models/expense.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteExpense } from '../store/tracker.actions';
import { selectTrackerState } from '../store/tracker.selector';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from './expenses.service';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



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
  @ViewChild('myChart', { static: false }) myChartElement!: ElementRef<HTMLCanvasElement>;

  myChart: Chart | null = null;
  selectedMonth: string = (new Date().getMonth() + 1).toString().padStart(2, '0');
  totalAmount: number = 0;
  

  constructor(private store: Store){}

  ngOnInit(): void {

    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    this.expenses$.subscribe(expenses => {
      this.expenses = expenses;
      this.filterExpenses();
    });
    

  }

  filterExpenses() {
    
    this.expenses = this.expensesService.getExpenseByMonth(this.selectedMonth);
    
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

      if (this.expenses.length > 0) {
        this.generateChart();
      }
      

  }

  deleteExpense(expenseToDelete: Expense) {
    
    this.store.dispatch(deleteExpense(expenseToDelete));
    
  }

  generateChart(){
    
    // Destroy the existing chart instance if it exists
    if (this.myChart) {
      this.myChart.destroy();
    }
    
    const chartData = {
      labels: Object.keys(this.groupedExpenses), // Categories as labels
      datasets: [
        {
          label: 'Total Spend',
          data: Object.values(this.groupedExpenses).map(group => group.totalAmount), // Only map totalAmount
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    // Create a new chart instance and assign it to myChart
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
    

  }

}


