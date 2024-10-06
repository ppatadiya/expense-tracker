import { createAction, props } from "@ngrx/store";

export const addExpense = createAction(
    '[Expense] Add',
    props<{valueofmychoice: number}>()
);

export const deleteExpense = createAction(
    '[Expense] Delete',
    props<{valueofmychoice: number}>()
);