import {Component} from '@angular/core';
import {CategoryMaterialComponent} from '../../category/category-material/category-material.component';
import {CategoryServiceComponent} from '../../category/category-service/category-service.component';


@Component({
  selector: 'app-dashboard',
  imports: [
    CategoryMaterialComponent,
    CategoryServiceComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
