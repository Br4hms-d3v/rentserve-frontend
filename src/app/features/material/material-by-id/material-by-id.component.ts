import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MaterialService} from '../service/material.service';
import {ThemeService} from '../../../core/services/theme.service';
import {MaterialDetailDto} from '../model/material-detail';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-material-by-id',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './material-by-id.component.html',
  styleUrl: './material-by-id.component.scss'
})
export class MaterialByIdComponent implements OnInit {

  materialById!: number;
  material!: MaterialDetailDto;
  isAvailable!: boolean;


  constructor(
    private readonly _materialService: MaterialService,
    private readonly _themeService: ThemeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.materialById = data.id;
  }

  ngOnInit() {
    this.getMaterial();
  }

  getMaterial() {
    this._materialService.getMaterial(this.materialById).subscribe({
      next: data => {
        this.material = data;
        this.isAvailable = data.isAvailable;
      }
    })
  }

}
