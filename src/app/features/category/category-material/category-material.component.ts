import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CategoryService} from '../service/category.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {CategoryDto} from '../model/category';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-category-material',
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule
  ],
  templateUrl: './category-material.component.html',
  styleUrl: './category-material.component.scss'
})

export class CategoryMaterialComponent implements AfterViewInit {

  message: string = 'Nous ne trouvons pas la catégorie';
  displayedColumns: string[] = ['position', 'nameOfCategoryMat'];
  // @ts-ignore
  dataSourceMat: MatTableDataSource<{ position: number, nameOfCategoryMat: string }> = new MatTableDataSource<{
    position: number,
    nameOfCategoryMat: string
  }>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private readonly _categoryService: CategoryService) {
    this._categoryService.getCategoriesMaterial().subscribe({
      next: (categoriesMat: CategoryDto[]) => {
        // Mappage des données
        this.dataSourceMat.data = categoriesMat.map((categoryMat, index) => ({
          position: index + 1,  // Position commence à 1
          nameOfCategoryMat: categoryMat.nameCategory   // Nom de la catégorie
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

}
