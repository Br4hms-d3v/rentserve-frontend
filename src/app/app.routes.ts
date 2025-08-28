import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then(r => r.home_routes)
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.routes').then(r => r.user_routes)
  },
  {
    path: 'category',
    loadChildren: () => import('./features/category/category.routes').then(r => r.category_routes)
  },
  {
    path: 'material',
    loadChildren: () => import('./features/material/material.routes').then(r => r.material_routes)
  }
];
