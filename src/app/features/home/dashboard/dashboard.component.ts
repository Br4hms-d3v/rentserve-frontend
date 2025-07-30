import {Component} from '@angular/core';
import {CategoryServiceComponent} from '../../category/category-service/category-service.component';
import {CategoryMaterialComponent} from '../../category/category-material/category-material.component';


@Component({
  selector: 'app-dashboard',
  imports: [
    CategoryServiceComponent,
    CategoryMaterialComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
