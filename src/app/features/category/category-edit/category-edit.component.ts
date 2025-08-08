import {Component, OnInit} from '@angular/core';
import {CategoryForm} from '../model/categoryForm';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CategoryDeleteComponent} from '../category-delete/category-delete.component';
import {NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, NgClass],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
  categoryId!: number;
  updateCategory!: CategoryForm
  categoryName = '';
  editCategory!: FormGroup;
  message = '';
  messageSuccess = '';
  isDarkMode = false;

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _themeService: ThemeService,
  ) {
    this.editCategory = this._fb.group({
      nameCategory: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id'));
    })

    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)

    this._categoryService.getCategory(this.categoryId).subscribe({
      next: (data) => {
        this.categoryName = data.nameCategory;
      }
    })

  }

  onSubmitEditCategory() {
    this.editCategory.markAsTouched();

    if (this.editCategory.invalid) {
      return;
    }

    this.updateCategory = this.editCategory.value;
    //console.log(this.updateCategory)

    this._categoryService.updateCategory(this.categoryId, this.updateCategory).subscribe({
      next: (data) => {
        this.categoryName = this.updateCategory.nameCategory;
        this.messageSuccess = 'La catégorie a bien été mise à jour.'
        //console.log(this.updateCategory)
      },
      error: (error) => {
        if (typeof error.error === 'string') {
          this.message = error.error.message;
          console.log(this.message)
        } else if (error.error?.message) {
          this.message = error.error.message;
          console.log(this.message)
        } else {
          this.message = 'Erreur de la mise à jour';
          console.log(this.message)
        }
      }
    })
  }

  openDialogDeleteCategory(categoryId: number) {
    this._dialog.open(CategoryDeleteComponent, {
      width: '500px',
      height: '300px',
      data: {id: categoryId}
    })

  }


}
