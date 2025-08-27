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
  materialId!: number;
  isAvailable!: boolean;
  message = ''
  messageSuccess = ''

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
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

}
