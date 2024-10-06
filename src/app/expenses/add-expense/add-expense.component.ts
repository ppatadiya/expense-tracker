import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EXPENSE_CATEGORIES } from '../data/expense-categories-data';

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

  constructor(private fb: FormBuilder) {
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
  
  
}

}
