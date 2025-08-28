import {Component, Inject, OnInit} from '@angular/core';
import {MaterialService} from '../service/material.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-material-delete',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgClass
  ],
  templateUrl: './material-delete.component.html',
  styleUrl: './material-delete.component.scss'
})
export class MaterialDeleteComponent implements OnInit {

  materialById!: number;
  nameMaterial!: string;
  message: string = '';
  messageSuccess: string = '';
  isDarkMode = false; // Store dark mode state (true or false)

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _router: Router,
    private readonly _themeService: ThemeService,
    private dialogRef: MatDialogRef<MaterialDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.materialById = data.id;
    this.nameMaterial = data.nameMaterial;
  }

  ngOnInit() {
    this.getTheme();
  }

  getTheme() {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }

  onDeleteMaterial() {

    this._materialService.deleteMaterial(this.materialById).subscribe({
        next: () => {
          this.messageSuccess = 'Le matériel a été supprimé';
          this.closeDialog();
        },
        error: (error) => {
          if (typeof error.error) {
            this.message = error.error.message;
          } else if (error.error?.message) {
            this.message = error.error.message;
          } else {
            this.message = 'Erreur lors de la suppression du matériel.';
          }
        }
      }
    )

  }

  closeDialog() {
    this._router.navigate(['/material/list/all']).then(() => {
      window.location.reload();
    });
    this.dialogRef.close();
  }


}
