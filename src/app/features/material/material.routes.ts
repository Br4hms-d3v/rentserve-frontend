import {Routes} from '@angular/router';
import {MaterialByCategoryComponent} from './material-by-category/material-by-category.component';
import {MaterialListComponent} from './material-list/material-list.component';
import {authGuard} from '../../core/guard/auth.guard';
import {MaterialEditComponent} from './material-edit/material-edit.component';
import {MaterialCreateComponent} from './material-create/material-create.component';

export const material_routes: Routes = [
  {path: ':nameOfCategory', component: MaterialByCategoryComponent, canActivate: [authGuard]},
  {path: 'list/all', component: MaterialListComponent, canActivate: [authGuard]},
  {path: ':id/edit', component: MaterialEditComponent, canActivate: [authGuard]},
  {path: 'create/new-material', component: MaterialCreateComponent, canActivate: [authGuard]},
]
