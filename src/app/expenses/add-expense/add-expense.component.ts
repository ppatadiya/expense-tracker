import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EXPENSE_CATEGORIES } from '../data/expense-categories-data';
import { Store } from '@ngrx/store';
import { addExpense } from '../../store/tracker.actions';
import { Expense } from '../models/expense.model';
import { selectTrackerState } from '../../store/tracker.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-or-update-expense',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {

  categories = EXPENSE_CATEGORIES;
  expenseForm: any;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      remarks: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      expenseDate: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    console.log(this.categories);
    
  }


onSubmit() {
  console.log("let's submit expense");
  console.log(this.expenseForm.value);

  const expenseDataToAdd: Expense = 
    { id: Date.now().toString(),
      category: this.expenseForm.value.category,
      remarks: this.expenseForm.value.remarks,
      amount: this.expenseForm.value.amount,
      expenseDate: this.expenseForm.value.expenseDate}
  ;

  this.store.dispatch(addExpense(expenseDataToAdd));

  this.expenseForm.reset();

  this.showModal = true;

  const confirmAddAnother = confirm('Expense added successfully! Do you want to add another expense?');
  if (confirmAddAnother) {
    // Logic to open a new form or reset the form for another expense
    
  } else {
    this.router.navigate(['../']); // Redirect to another page when "no" is confirmed
  }
  
  
}

}
