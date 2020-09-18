import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as PeopleActions from './people.actions'
import { PeopleService } from '../service/people.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';

@Injectable()
export class PeopleEffects {

    constructor(public store: Store<any>, private actions$: Actions, public peopleSrvice: PeopleService) {

    }
    people$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleActions.createPeopleStart),
            tap(actions => {
                this.peopleSrvice.createPeople(actions.people).then(res => {
                    console.log({ ...actions.people, id: res.id })
                    this.store.dispatch(PeopleActions.createPeople({ people: { ...actions.people, id: res.id } }))
                })


            }),

        ), { dispatch: false }

    )

    peoples$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleActions.getAllPeopleStart),

            tap(actions => {
                this.peopleSrvice.getAllPeople().then(res => {
                    res.subscribe(res => {
                        console.log(res)
                        this.store.dispatch(PeopleActions.getAllPeople({ people: res }))
                    })
                    this.peopleSrvice.getLoadingStatus();
                })


            }),

        ), { dispatch: false }

    )


}

