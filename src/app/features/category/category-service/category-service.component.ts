import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator} from '@angular/material/paginator';
import {CategoryService} from '../service/category.service';
import {CategoryDto} from '../model/category';

@Component({
  selector: 'app-category-service',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
  ],
  templateUrl: './category-service.component.html',
  styleUrl: './category-service.component.scss'
})

export class CategoryServiceComponent implements OnInit {

  message: string = 'Nous ne trouvons pas la catégorie';
  displayedColumns: string[] = ['position', 'nameOfCategoryServ'];
  // @ts-ignore
  dataSourceService: MatTableDataSource<{ position: number, nameOfCategoryServ: string }> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private readonly _categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this._categoryService.getCategoriesService().subscribe({
      next: (categoriesServ: CategoryDto[]) => {
        // Map
        this.dataSourceService.data = categoriesServ.map((categoryServ, index) => ({
          position: index + 1,  // Position commence à 1
          nameOfCategoryServ: categoryServ.nameCategory   // Nom de la catégorie
        }));
        // Configurez le paginator et le sort
        // @ts-ignore
        this.dataSourceService.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceService.filter = filterValue.trim().toLowerCase();
  }

}
