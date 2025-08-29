import {Component, OnInit} from '@angular/core';
import {MaterialDto} from '../model/material';
import {MaterialService} from '../service/material.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../core/services/auth.service';
import {MaterialByIdComponent} from '../material-by-id/material-by-id.component';
import {MatDialog} from '@angular/material/dialog';
import {MaterialDeleteComponent} from '../material-delete/material-delete.component';
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchMaterialPipe} from '../../../core/pipes/search-material.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-material-list',
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatIconModule,
    RouterLink,
    NgClass,
    MatPaginator,
    ReactiveFormsModule,
    FormsModule,
    SearchMaterialPipe,
    MatFormFieldModule,
    MatInputModule

  ],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss'
})
export class MaterialListComponent implements OnInit {

  materials: MaterialDto[] = [];
  message = '';
  role: string | undefined;

  pagedMaterials: MaterialDto[] = [];
  pageSize = 25;
  pageIndex = 0;

  searchMaterial: string = '';
  sort: string = 'asc';

  isDarkMode = false;

  constructor(
    private readonly _materialService: MaterialService,
    private readonly _authService: AuthService,
    private readonly _themeService: ThemeService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.getMaterials();
    this.getRole();
    this.getTheme();
  }

  getMaterials() {
    this._materialService.getMaterials().subscribe({
      next: (data: MaterialDto[]) => {
        this.materials = data;
        this.paginatorMaterials();
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

  getRole() {
    this._authService.currentUser$.subscribe(user => {
      if (user) {
        this.role = user.role;
      }
    })
  }

  private paginatorMaterials() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedMaterials = this.materials.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginatorMaterials();
  }

  getTheme() {
    this.isDarkMode = this._themeService.isDarkMode(); // Get current theme (dark or light)
    this._themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }

  openDetailDialog(id: number) {
    this.dialog.open(MaterialByIdComponent, {
      data: {id: id}
    })
  }

  openDeleteDialog(id: number, nameMaterial: string) {
    this.dialog.open(MaterialDeleteComponent, {
      data: {id: id, nameMaterial: nameMaterial}
    })
  }

  onSort() {
    // Si l'ordre de tri est ascendant, on passe à l'ordre descendant
    if (this.sort === 'asc') {
      this.sort = 'desc';

      // Tri des matériaux par nom (ordre décroissant)
      this.materials.sort((a, b) => {
        return b.nameMaterial.localeCompare(a.nameMaterial); // Tri décroissant
      });

    } else {
      // Si l'ordre de tri est descendant, on passe à l'ordre ascendant
      this.sort = 'asc';

      // Tri des matériaux par nom (ordre croissant)
      this.materials.sort((a, b) => {
        return a.nameMaterial.localeCompare(b.nameMaterial); // Tri croissant
      });
    }

    // Recalcule les matériaux paginés après le tri
    this.paginatorMaterials();

    // Affichage du mode de tri dans la console (pour débogage)
    console.log('Sort order:', this.sort);
  }


}
