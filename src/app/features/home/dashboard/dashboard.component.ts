import {Component, OnInit} from '@angular/core';
import {CategoryServiceComponent} from '../../category/category-service/category-service.component';
import {CategoryMaterialComponent} from '../../category/category-material/category-material.component';
import {NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    CategoryServiceComponent,
    CategoryMaterialComponent,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  isDarkMode = false;

  constructor(
    private readonly _themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }
}
