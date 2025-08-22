import {Routes} from '@angular/router';
import {MaterialByCategoryComponent} from './material-by-category/material-by-category.component';

export const material_routes: Routes = [
  {path: ':nameOfCategory', component:MaterialByCategoryComponent }
]
