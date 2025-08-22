import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MaterialService} from '../service/material.service';
import {MaterialDto} from '../model/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-material-by-category',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './material-by-category.component.html',
  styleUrl: './material-by-category.component.scss'
})
export class MaterialByCategoryComponent implements OnInit {

  materialsByCategory: MaterialDto[] = [];
  nameOfCategory!: string;
  message = '';
  messageSuccess = '';

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.nameOfCategory = this._route.snapshot.paramMap.get('nameOfCategory') ?? '';

    this._materialService.getMaterialsByCategory(this.nameOfCategory).subscribe({
      next: (data: MaterialDto[]) => {
        this.materialsByCategory = data;
      },
      error: (error) => {
        if (typeof error.error) {
          this.message = error.error.message;
        } else if (error.error?.message) {
          this.message = error.error.message;
        } else {
          this.message = "Erreur lors de l'affichage";
        }
      }

    })
  }

}
