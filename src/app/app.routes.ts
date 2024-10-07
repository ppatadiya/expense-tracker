import { Routes } from '@angular/router';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpcomingFeaturesComponent } from './upcoming-features/upcoming-features.component';

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
        path: 'edit-expense/:id',
        component: AddExpenseComponent,
        title: 'Edit Expense'
    },
    {
        path: 'upcoming-features',
        component: UpcomingFeaturesComponent,
        title: 'Next Version'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
