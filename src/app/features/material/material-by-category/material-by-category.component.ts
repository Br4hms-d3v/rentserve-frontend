import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MaterialService} from '../service/material.service';
import {MaterialDto} from '../model/material';
import {ActivatedRoute} from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-material-by-category',
  imports: [MatCardModule, MatButtonModule, MatPaginatorModule, NgClass],
  templateUrl: './material-by-category.component.html',
  styleUrl: './material-by-category.component.scss'
})
export class MaterialByCategoryComponent implements OnInit {

  materialsByCategory: MaterialDto[] = [];
  nameOfCategory!: string;
  message = '';
  messageSuccess = '';

  isDarkMode = false;

  pagedMaterials: any[] = [];
  pageSize = 25;
  pageIndex = 0;

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _route: ActivatedRoute,
    private readonly _themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.getMaterialsByCategory();
    this.getTheme();
  }

  getMaterialsByCategory() {
    this.nameOfCategory = this._route.snapshot.paramMap.get('nameOfCategory') ?? '';

    this._materialService.getMaterialsByCategory(this.nameOfCategory).subscribe({
      next: (data: MaterialDto[]) => {
        this.materialsByCategory = data;
        this.paginatorMaterialByCategory();
      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = "Erreur lors de l'affichage";
        }
      }

    })
  }

  private paginatorMaterialByCategory(){
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedMaterials = this.materialsByCategory.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginatorMaterialByCategory(); // ✅ recalcul des cartes visibles
  }

  getTheme(){
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }

}
