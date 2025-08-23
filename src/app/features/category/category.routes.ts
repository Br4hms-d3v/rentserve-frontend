import {Routes} from '@angular/router';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {authGuard} from '../../core/guard/auth.guard';

export const category_routes: Routes = [
  {path: ':id/edit-category', component: CategoryEditComponent, canActivate: [authGuard]},
]
