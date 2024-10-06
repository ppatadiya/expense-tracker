import { Routes } from '@angular/router';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: ExpensesComponent,
        title: 'All Expenses'
    },
    {
        path: 'add-expense',
        component: AddExpenseComponent,
        title: 'Add Expense'
    },
    {
        path: 'edit-expense',
        component: EditExpenseComponent,
        title: 'Edit Expense'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
