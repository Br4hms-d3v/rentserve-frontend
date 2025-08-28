import {Component, Inject, OnInit} from '@angular/core';
import {MaterialService} from '../service/material.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-material-delete',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './material-delete.component.html',
  styleUrl: './material-delete.component.scss'
})
export class MaterialDeleteComponent implements OnInit {

  materialById!: number;
  message: string = '';
  messageSuccess: string = '';

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _router: Router,
    private dialogRef: MatDialogRef<MaterialDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.materialById = data.id;
  }

  ngOnInit() {
  }

  onDeleteMaterial() {

    this._materialService.deleteMaterial(this.materialById).subscribe({
        next: () => {
          this.messageSuccess = 'Le matériel a été supprimé';
          this.closeDialog();
        },
        error: () => {
          this.message = 'Erreur lors de la suppression du matériel.';
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
