import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from '../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-category-delete',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    NgClass,
    MatDialogTitle
  ],
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.scss'
})
export class CategoryDeleteComponent implements OnInit {

  categoryId!: number;
  categoryName = '';
  message = '';
  messageSuccess = '';
  isDarkMode = false;

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _themeService: ThemeService,
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    @Inject(MatDialogRef) private dialogRef: MatDialogRef<CategoryDeleteComponent>
  ) {
  }

  ngOnInit(): void {
    this.categoryId = this.data.id;
    console.log(this.categoryId)

    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)

    this._categoryService.getCategory(this.categoryId).subscribe({
      next: (data) => {
        this.categoryName = data.nameCategory;
      }
    })
  }

  onClickDeleteCategory() {
    this._categoryService.deleteCategory(this.categoryId).subscribe({
      next: (data) => {
        this.messageSuccess = 'La catégorie a bien été supprimé'
        this._router.navigate(['/dashboard'])
        this.dialogRef.close();
      },
      error: (error) => {
        if (error.status === 400 || error.status === 404) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur lors de la suppression';
        }
      }
    })
  }

}
