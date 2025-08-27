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
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-material-by-id',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    NgClass
  ],
  templateUrl: './material-by-id.component.html',
  styleUrl: './material-by-id.component.scss'
})
export class MaterialByIdComponent implements OnInit {

  materialById!: number;
  material!: MaterialDetailDto;
  isAvailable!: boolean;
  isDarkMode = false; // Store dark mode state (true or false)

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _themeService: ThemeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.materialById = data.id;
  }

  ngOnInit() {
    this.getMaterial();
    this.getTheme()
  }

  getMaterial() {
    this._materialService.getMaterial(this.materialById).subscribe({
      next: data => {
        this.material = data;
        this.isAvailable = data.isAvailable;
      }
    })
  }

  getTheme() {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }

}
