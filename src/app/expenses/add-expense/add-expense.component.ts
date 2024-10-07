import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EXPENSE_CATEGORIES } from '../data/expense-categories-data';
import { Store } from '@ngrx/store';
import { addExpense, editExpense } from '../../store/tracker.actions';
import { Expense } from '../models/expense.model';
import { selectTrackerState } from '../../store/tracker.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../expenses.service';

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

  isEditMode: boolean = false;
  expenseId: string | null = null;

  constructor(private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpensesService
  ) {
    this.expenseForm = this.fb.group({
      id: [''],
      category: ['', Validators.required],
      remarks: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      expenseDate: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Check if we're in edit mode (if the route contains an 'id')
    this.route.paramMap.subscribe(params => {
      this.expenseId = params.get('id');  // Get the 'id' from the route if present

      if (this.expenseId) {
        this.isEditMode = true;
        this.loadExpenseData(this.expenseId);  // Load existing expense data for editing
      }
    });

  }

  // Load existing expense data
  loadExpenseData(id: string): void {
    const expense = this.expenseService.getExpenseById(id);  // Fetch from service or state
    if (expense) {
      this.expenseForm.patchValue({
        id: expense.id,
        category: expense.category,
        amount: expense.amount,
        remarks: expense.remarks,
        expenseDate: expense.expenseDate
      });
    }
    else {
      alert("Expense not found for this id, please select another expese to edit");
      this.router.navigate(['../']); // Redirect to another page when "no" is confirmed
    }
  }


  onSubmit() {
    const expenseDataToAdd: Expense =
      {
        id: this.isEditMode ? this.expenseForm.value.id : Date.now().toString(),
        category: this.expenseForm.value.category,
        remarks: this.expenseForm.value.remarks,
        amount: this.expenseForm.value.amount,
        expenseDate: this.expenseForm.value.expenseDate
      };

    if (this.isEditMode) {
      
      this.store.dispatch(editExpense(expenseDataToAdd));
      alert("Expense Saved");
      this.router.navigate(['../']);
      
    }
    else {

      this.store.dispatch(addExpense(expenseDataToAdd));
      this.showModal = true;

      const confirmAddAnother = confirm('Expense added successfully! Do you want to add another expense?');
      if (confirmAddAnother) {
        

      } else {
        this.router.navigate(['../']); // Redirect to another page when "no" is confirmed
      }

    }

    this.expenseForm.reset();

  }

}
