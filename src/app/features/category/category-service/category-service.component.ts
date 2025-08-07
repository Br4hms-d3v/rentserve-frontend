import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator} from '@angular/material/paginator';
import {CategoryService} from '../service/category.service';
import {CategoryDto} from '../model/category';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {CategoryDeleteComponent} from '../category-delete/category-delete.component';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-category-service',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
    MatButton,
    RouterLink,
  ],
  templateUrl: './category-service.component.html',
  styleUrl: './category-service.component.scss'
})

export class CategoryServiceComponent implements OnInit {

  message: string = 'Nous ne trouvons pas la catégorie';
  displayedColumns: string[] = [];
  role: string | undefined;
  // @ts-ignore
  dataSourceService: MatTableDataSource<{
    position: number,
    nameOfCategoryServ: string,
    idCategory: number
  }> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private readonly _categoryService: CategoryService, private readonly _autService: AuthService, private readonly _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._autService.currentUser$.subscribe(user => {
      if (user) {
        this.role = user.role
      }
    });

    this.setDisplayedColumns();

    this._categoryService.getCategoriesService().subscribe({
      next: (categoriesServ: CategoryDto[]) => {
        // Map
        this.dataSourceService.data = categoriesServ.map((categoryServ, index) => ({
          position: index + 1,  // Position commence à 1
          nameOfCategoryServ: categoryServ.nameCategory,   // Nom de la catégorie
          idCategory: categoryServ.id
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

  setDisplayedColumns() {
    this.displayedColumns = ['position', 'nameOfCategoryServ'];

    if (this.role === 'ADMIN' || this.role === 'MODERATOR') {
      this.displayedColumns.push('editCategoryServ');
    }

    if (this.role === 'ADMIN') {
      // ['position', 'nameOfCategoryMat','editCategoryMat', 'deleteCategoryMat'];
      this.displayedColumns.push('deleteCategoryServ');
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceService.filter = filterValue.trim().toLowerCase();
  }

  openDialogDeleteCategory(id: number) {
    this._dialog.open(CategoryDeleteComponent, {
      width: '500px',
      height: '300px',
      data: {id: id}
    })

  }

}
