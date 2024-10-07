import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { addExpense, deleteExpense, editExpense, init } from "./tracker.actions";
import { tap, withLatestFrom } from "rxjs";
import { selectTrackerState } from "./tracker.selector";
import { ExpensesService } from "../expenses/expenses.service";


@Injectable()
export class TrackerEffects {

    private expensesService = inject(ExpensesService);

    addExpense = createEffect(
        () => this.actions$.pipe(
            ofType(addExpense),
            withLatestFrom(this.store.select(selectTrackerState)),
            tap(([action, tracker])=>{
                

                localStorage.setItem('expenses', JSON.stringify(tracker));


                
                
                
                // To Do
                //this.expensesService.updateLocalStorage();
                
            })
        ),
        {
            dispatch: false
        }
    );

    editExpense = createEffect(
        () => this.actions$.pipe(
            ofType(editExpense),
            withLatestFrom(this.store.select(selectTrackerState)),
            tap(([action, tracker])=>{
               

                localStorage.setItem('expenses', JSON.stringify(tracker));


                
                
                
                // To Do
                //this.expensesService.updateLocalStorage();
                
            })
        ),
        {
            dispatch: false
        }
    );

    deleteExpense = createEffect(
        () => this.actions$.pipe(
            ofType(deleteExpense),
            withLatestFrom(this.store.select(selectTrackerState)),
            tap(([action, tracker])=>{
                
                
                localStorage.setItem('expenses', JSON.stringify(tracker));
                

                this.expensesService.deleteExpense();
                
            })
        ),
        {
            dispatch: false
        }
    );

    initExpense = createEffect(
        () => this.actions$.pipe(
            ofType(init),
            withLatestFrom(this.store.select(selectTrackerState)),
            tap(([action, tracker])=>{
                console.log(action);
                console.log(tracker);
                
                localStorage.setItem('expenses', JSON.stringify(tracker));

            })
        ),
        {
            dispatch: false
        }
    );

    constructor(private actions$: Actions, private store: Store<{tracker: number}>){}
}