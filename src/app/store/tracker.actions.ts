import { createAction, props } from "@ngrx/store";
import { type Expense } from "../expenses/models/expense.model";

export const addExpense = createAction(
    '[Expense] Add',
    props<Expense>()
);

export const addExpenseSuccess = createAction(
    '[Expense] Add Expense Success',
    props<{ expense: Expense }>()
  );

export const deleteExpense = createAction(
    '[Expense] Delete',
    props<{valueofmychoice: number}>()
);