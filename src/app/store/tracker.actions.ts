import { createAction, props } from "@ngrx/store";
import { type Expense } from "../expenses/models/expense.model";

/*export const init = createAction(
    '[Counter] Init',
    props{Expense[]>()
);*/

export const addExpense = createAction(
    '[Expense] Add',
    props<Expense>()
);

export const deleteExpense = createAction(
    '[Expense] Delete',
    props<Expense>()
);