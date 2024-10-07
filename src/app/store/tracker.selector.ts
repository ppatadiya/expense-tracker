import { createFeatureSelector } from '@ngrx/store';
import { Expense } from '../expenses/models/expense.model';

export const selectTrackerState = createFeatureSelector<Expense[]>('tracker');
