import {Component, OnInit, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CategoryService} from '../service/category.service';
import {MatPaginator} from '@angular/material/paginator';
import {CategoryDto} from '../model/category';

@Component({
  selector: 'app-category-material',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
  ],
  templateUrl: './category-material.component.html',
  styleUrl: './category-material.component.scss'
})

export class CategoryMaterialComponent implements OnInit {

  displayedColumns: string[] = ['position', 'nameOfCategory'];
  // @ts-ignore
  dataSource: MatTableDataSource<{ position: number, nameOfCategory: string }> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private readonly _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this._categoryService.getCategoriesMaterial().subscribe({
      next: (categories: CategoryDto[]) => {

        const categoriesWithPosition = categories.map((category, index) => ({
          position: index + 1,  // Position commence à 1
          nameOfCategory: category.nameCategory   // Nom de la catégorie
        }));
        console.log(categoriesWithPosition);
        // Assurez-vous que dataSource a bien les données
        this.dataSource.data = categoriesWithPosition;

        // Configurez le paginator et le sort
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
