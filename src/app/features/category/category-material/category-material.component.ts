import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CategoryService} from '../service/category.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {CategoryDto} from '../model/category';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {CategoryDeleteComponent} from '../category-delete/category-delete.component';
import {MatDialog} from '@angular/material/dialog';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-category-material',
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterLink, MatButton, NgClass
  ],
  templateUrl: './category-material.component.html',
  styleUrl: './category-material.component.scss'
})

export class CategoryMaterialComponent implements AfterViewInit, OnInit {

  isDarkMode = false;
  message: string = 'Nous ne trouvons pas la catégorie';
  displayedColumns: string[] = [];
  role: string | undefined;
  // @ts-ignore
  dataSourceMat: MatTableDataSource<{
    position: number,
    nameOfCategoryMat: string,
    idCategory: number
  }> = new MatTableDataSource<{
    position: number,
    nameOfCategoryMat: string
    idCategory: number;
  }>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _authService: AuthService,
    private readonly _themeService: ThemeService,
    private readonly _dialog: MatDialog) {
    this._categoryService.getCategoriesMaterial().subscribe({
      next: (categoriesMat: CategoryDto[]) => {
        // Mappage des données
        this.dataSourceMat.data = categoriesMat.map((categoryMat, index) => ({
          position: index + 1,  // Position commence à 1
          nameOfCategoryMat: categoryMat.nameCategory,
          idCategory: categoryMat.id,// Nom de la catégorie
        }));

      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur lors de la mise à jour';
        }
      }
    });
  }

  ngOnInit() {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)

    this._authService.currentUser$.subscribe(user => {
      if (user) {
        this.role = user.role;
      }
    });
    this.setDisplayedColumns();
  }

  setDisplayedColumns() {
    this.displayedColumns = ['position', 'nameOfCategoryMat'];

    if (this.role === 'ADMIN' || this.role === 'MODERATOR') {
      this.displayedColumns.push('editCategoryMat');
    }

    if (this.role === 'ADMIN') {
      // ['position', 'nameOfCategoryMat','editCategoryMat', 'deleteCategoryMat'];
      this.displayedColumns.push('deleteCategoryMat');
    }

  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSourceMat.paginator = this.paginator;
    // @ts-ignore
    this.dataSourceMat.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMat.filter = filterValue.trim().toLowerCase();
  }

  openDialogDeleteCategory(id: number) {
    this._dialog.open(CategoryDeleteComponent, {
      width: '500px',
      height: '300px',
      data: {id: id}
    })

  }

}
