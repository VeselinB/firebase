import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as Actions from './people.actions'

import { People } from '../model/people'

export interface Peoples extends EntityState<People> { }

export const adapter: EntityAdapter<People> = createEntityAdapter<People>();


export const initialState: Peoples = adapter.getInitialState();

export const peopleReducer = createReducer(
    initialState,
    on(Actions.createPeople, (state, { people }) => {
        console.log(state)
        return adapter.addOne(people, state);
    }),

    on(Actions.getAllPeople, (state, { people }) => {
        console.log(state)
        return adapter.addMany(people, state);
    }),
    on(Actions.removePeople, (state, { id }) => {

        return adapter.removeOne(id, state);
    }),
    on(Actions.updatePeople, (state, { update }) => {

        return adapter.upsertOne(update, state);

    }),
)
//Selectors:
export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectPeopleState = createFeatureSelector<Peoples>('people');
export const selectPeopleEntities = createSelector(
    selectPeopleState,
    selectEntities
);
export function reducer(state: Peoples | undefined, action: Action) {
    return peopleReducer(state, action);
}