// import {Component, OnInit} from '@angular/core';
// import {MatButton} from '@angular/material/button';
// import {FormControl, ReactiveFormsModule} from '@angular/forms';
// import {MaterialDetailDto} from '../model/material-detail';
// import {CategoryDto} from '../../category/model/category';
// import {map, Observable, startWith} from 'rxjs';
// import {CategoryService} from '../../category/service/category.service';
// import {MaterialService} from '../service/material.service';
// import {ActivatedRoute} from '@angular/router';
// import {MatFormField, MatInput} from '@angular/material/input';
// import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
// import {AsyncPipe, NgForOf} from '@angular/common';
//
//
// @Component({
//   selector: 'app-material-edit',
//   imports: [
//     MatButton,
//     MatFormField,
//     MatInput,
//     ReactiveFormsModule,
//     MatAutocompleteTrigger,
//     MatAutocomplete,
//     MatOption,
//     AsyncPipe,
//     NgForOf
//
//   ],
//   templateUrl: './material-edit.component.html',
//   styleUrl: './material-edit.component.scss'
// })
// export class MaterialEditComponent implements OnInit {
//
//   materialForm = new FormControl('');
//   categories: CategoryDto[] = [];
//   materialIdDto!: MaterialDetailDto;
//   materialId!: number;
//   filteredCategories!: Observable<CategoryDto[]>;
//
//   constructor(
//     private readonly _categoryService: CategoryService,
//     private readonly _materialService: MaterialService,
//     private readonly _route: ActivatedRoute,
//   ) {
//   }
//
//   ngOnInit() {
//     this._route.params.subscribe(params => {
//       this.materialId = params['id'];
//     });
//
//     this.getCategories();
//     this.getMaterial();
//   }
//
//   getMaterial() {
//     this._materialService.getMaterial(this.materialId).subscribe({
//         next: data => {
//           this.materialIdDto = data;
//         }
//       }
//     )
//   }
//
//   getCategories() {
//     this._categoryService.getCategories().subscribe({
//       next: data => {
//         this.categories = data;
//
//         if (this.categories && this.categories.length > 0) {
//           this.materialForm.setValue(this.categories[1].nameCategory);
//         }
//
//         this.filteredCategories = this.materialForm.valueChanges.pipe(
//           startWith(''),
//           map(value => this._filter(value || ''))
//         );
//
//       }
//     });
//
//   }
//
//
//   private _filter(value: string) {
//     const filterValue = value.toLowerCase();
//     return this.categories;
//   }
//
//
// }


import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MaterialForm} from '../model/material-form';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialService} from '../service/material.service';
import {ActivatedRoute} from '@angular/router';
import {MaterialDetailDto} from '../model/material-detail';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CategoryDto} from '../../category/model/category';
import {CategoryService} from '../../category/service/category.service';
import {map, Observable, startWith} from 'rxjs';


@Component({
  selector: 'app-material-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.scss'
})
export class MaterialEditComponent implements OnInit {

  materialDto!: MaterialDetailDto;
  updateMaterialForm!: MaterialForm;
  editMaterialForm!: FormGroup;
  categoryDto!: CategoryDto[];
  filteredCategories: Observable<any[]> | undefined;
  materialId!: number;
  isAvailable!: boolean;
  message = ''
  messageSuccess = ''

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _categoryService: CategoryService,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
  ) {
    this.editMaterialForm = this._fb.group({
      nameMaterial: ['', Validators.required],
      category: ['', Validators.required],
      isAvailable: [true]
    });
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.materialId = params['id'];
    })

    this.getMaterial();
    this.getCategories();

  }

  getMaterial() {
    this._materialService.getMaterial(this.materialId).subscribe({
      next: data => {
        this.materialDto = data;
        this.isAvailable = data.isAvailable;
        this.editMaterialForm.get('nameMaterial')?.patchValue(this.materialDto.nameMaterial);
        this.editMaterialForm.get('category')?.patchValue(this.materialDto.category);
        this.editMaterialForm.get('isAvailable')?.patchValue(this.materialDto.isAvailable);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  getCategories() {
    this._categoryService.getCategories().subscribe({
      next: data => {
        this.categoryDto = data;
        this.filteredCategories = this.editMaterialForm.get('category')?.valueChanges.pipe(
          startWith(''),
          map((value: string) => this._filterCategories(value || ''))
        )
        console.log(this.categoryDto);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private _filterCategories(value: string) {
    const filterValue = value.toLowerCase();
    return this.categoryDto.filter(category =>
      category.nameCategory.toLowerCase()
        .includes(filterValue));
  }


}
