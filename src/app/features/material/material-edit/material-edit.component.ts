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
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-material-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.scss'
})
export class MaterialEditComponent implements OnInit {

  materialDto!: MaterialDetailDto;
  updateMaterialForm!: MaterialForm;
  editMaterialForm!: FormGroup;
  materialId!: number;
  isAvailable!: boolean;
  message = ''
  messageSuccess = ''
  isDarkMode = false; // Store dark mode state (true or false)

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _themeService: ThemeService,
  ) {
    this.editMaterialForm = this._fb.group({
      nameMaterial: ['', Validators.required],
      category: ['', Validators.required],
      isAvailable: [true]
    })
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.materialId = params['id'];
      // console.log(this.materialId);
    })

    this.getMaterial();
    this.getTheme();

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

  onSubmitEditMaterial() {
    this.editMaterialForm.markAsTouched();

    if (this.editMaterialForm.invalid) {
      return;
    }

    let editMaterial: MaterialForm = {
      category: this.editMaterialForm.get('category')?.value,
      nameMaterial: this.editMaterialForm.get('nameMaterial')?.value,
      isAvailable: this.editMaterialForm.get('isAvailable')?.value
    }
    console.log(editMaterial);

    this._materialService.editMaterial(this.materialId, editMaterial).subscribe({
      next: (data) => {
        this.updateMaterialForm = data;
        this.editMaterialForm.patchValue(this.updateMaterialForm);
        this.messageSuccess = 'La mise à jour a été effectué avec succès.'
      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Erreur lors de la mise à jour!;';
        }
      }
    })
  }

  getTheme() {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }

}
