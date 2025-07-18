import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren:() => import('./features/home/home.routes').then(r => r.home_routes)
  },
];
