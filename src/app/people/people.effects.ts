import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
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
            // switchMap(actions => this.peopleSrvice.createPeople(actions.people).pipe(
            //     tap(r => { console.log(r) }),
            //     map(res => PeopleActions.createPeople({ people: { ...actions.people, id: res.id } }),
            //         // catchError(error => of(new FindAddressesRejected(error)))
            //     )

            // )),
            tap(actions => {
                this.peopleSrvice.createPeople(actions.people).then(res => {
                    console.log({ ...actions.people, id: res.id })
                    let idUser = JSON.parse(localStorage.getItem("user"));
                    this.store.dispatch(PeopleActions.createPeople({ people: { ...actions.people, id: res.id, ownerId: idUser.uid, ownerEmail: idUser.email } }))
                })


            }),

            // this.peopleSrvice.createPeople(actions.people).then(res => {
            //     this.peopleSrvice.getAllPeople().pipe(
            //         map(results => PeopleActions.getAllPeople({ people: results })),
            //         // catchError(error => of(new FindAddressesRejected(error)))
            //     )
            // })


        ), { dispatch: false }

    )

    peoples$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleActions.getAllPeopleStart),

            switchMap(actions => this.peopleSrvice.getAllPeople().pipe(

                map(results => PeopleActions.getAllPeople({ people: results }),
                    // catchError(error => of(new FindAddressesRejected(error)))
                )

            ))

        )

    )
}

