import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './users/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/people/people', pathMatch: 'full'

  },
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then((m) => m.PeopleModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./users/auth/auth.module').then((m) => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
