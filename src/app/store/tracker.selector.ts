import { createFeatureSelector } from '@ngrx/store';
import { Expense } from '../expenses/models/expense.model';

export const selectExpense = (state: {tracker: number}) => state.tracker;


// Feature selector for the tracker slice of state
export const selectTrackerState = createFeatureSelector<Expense[]>('tracker');
