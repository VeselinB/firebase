import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule, Route } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { MaterialModule } from '../material/material.module';
import { CreatePeopleComponent } from './components/create-people/create-people.component';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './people.effects';
import { peopleReducer, reducer } from './people.reducer';
import { DialogComponent } from './components/dialog/dialog.component';

const routes: Route[] = [
  { path: 'people', component: PeopleComponent },
  { path: 'createPeople', component: CreatePeopleComponent },

];

@NgModule({
  declarations: [PeopleComponent, CreatePeopleComponent, DialogComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('people', reducer),
    EffectsModule.forFeature([PeopleEffects]),

  ],
  entryComponents: [DialogComponent, CreatePeopleComponent]
})
export class PeopleModule { }
