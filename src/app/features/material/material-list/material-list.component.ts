import {Component, OnInit} from '@angular/core';
import {MaterialDto} from '../model/material';
import {MaterialService} from '../service/material.service';
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../core/services/auth.service';
import {MaterialByIdComponent} from '../material-by-id/material-by-id.component';
import {MatDialog} from '@angular/material/dialog';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-material-list',
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatPaginator,
    MatButtonModule,
    MatMenuModule,
    NgClass,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss'
})
export class MaterialListComponent implements OnInit {

  materials: MaterialDto[] = [];
  message = '';
  role: string | undefined;

  pagedMaterials: any[] = [];
  pageSize = 25;
  pageIndex = 0;

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

}
