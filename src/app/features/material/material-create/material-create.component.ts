import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryDto} from '../../category/model/category';
import {MaterialService} from '../service/material.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {map, Observable, startWith} from 'rxjs';
import {CategoryService} from '../../category/service/category.service';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {AsyncPipe, NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-material-create',
  imports: [
    MatFormField,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatSlideToggle,
    MatButton,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './material-create.component.html',
  styleUrl: './material-create.component.scss'
})
export class MaterialCreateComponent implements OnInit {

  newMaterialForm!: FormGroup;
  categoryDto!: CategoryDto[];
  filteredCategories: Observable<CategoryDto[]> | undefined;
  isDarkMode = false; // Store dark mode state (true or false)
  message!: string;
  messageSuccess!: string;

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _categoryService: CategoryService,
    private readonly _fb: FormBuilder,
    private readonly _themeService: ThemeService,
  ) {

  }

  ngOnInit() {
    this.newForm()
    this.getCategories();
    this.getTheme();
  }

  newForm() {
    this.newMaterialForm = this._fb.group({
      category: ['', Validators.required],
      nameMaterial: ['', Validators.required],
      isAvailable: [false],
    })
  }

  getCategories() {
    this._categoryService.getCategories().subscribe({
      next: data => {
        this.categoryDto = data.sort((a,b) => {
          return a.nameCategory.localeCompare(b.nameCategory);
        });
        this.filteredCategories = this.newMaterialForm.get('category')?.valueChanges.pipe(
          startWith(''),
          map((value: string) => this._filterCategories(value || ''))
        )
        console.log(this.categoryDto);
      },
      error: (err) => {
        this.message = "Une erreur est survenue.";
        // console.log(err);
      }
    })
  }

  private _filterCategories(value: string) {
    const filterValue = value.toLowerCase();
    return this.categoryDto.filter(category =>
      category.nameCategory.toLowerCase()
        .includes(filterValue));
  }

  onSubmitNewMaterial() {

    this._materialService.createMaterial(this.newMaterialForm.value).subscribe({
      next: () => {
        this.messageSuccess = "Le matériel a bien été sauvegardé"
        this.newMaterialForm.clearValidators(); // Clear the validator
        this.newMaterialForm.reset(); // Clear the form
      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur de la sauvegarde;';
        }
      }
    })
  }

  getTheme() {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }
}
