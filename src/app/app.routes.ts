import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: 'rent-serve', pathMatch: 'full'},
  {path: 'rent-serve', component: HomeComponent}
];
