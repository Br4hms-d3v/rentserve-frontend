import {Routes} from '@angular/router';
import {MaterialByCategoryComponent} from './material-by-category/material-by-category.component';
import {MaterialListComponent} from './material-list/material-list.component';
import {authGuard} from '../../core/guard/auth.guard';

export const material_routes: Routes = [
  {path: ':nameOfCategory', component: MaterialByCategoryComponent, canActivate: [authGuard]},
  {path: 'list/all', component: MaterialListComponent, canActivate: [authGuard]}
]
