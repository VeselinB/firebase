import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { People } from '../model/people';

//import { People } from '../users/user.reducer';

export const getAllPeopleStart = createAction('[People] Get All People Start');
export const getAllPeople = createAction('[People]Get All People', props<{ people: any }>());

export const createPeople = createAction('[People] Create People', props<{ people: People }>());
export const createPeopleStart = createAction('[People] Create People Start', props<{ people: People }>());

export const removePeople = createAction('[People] Remove People', props<{ id }>());

export const updatePeople = createAction('[People] Update People', props<{ update: People }>());
// export const updateUser = createAction('[Users] Update People Start', props<{ update: User }>());
// export const removeUser = createAction('[Users] Remove People Start', props<{ id }>());

//export const loadUsers = createAction('[User/API] Load Users', props<{ users: User[] }>());