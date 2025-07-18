import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule, MatFabButton} from '@angular/material/button';
import {ThemeService} from '../../../core/services/theme.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../../features/auth/login/login.component';
import {NgClass} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav',
  imports: [MatToolbar, MatIcon, MatFabButton, NgClass, MatButtonModule, MatMenuModule],
  templateUrl: './nav.component.html',
  styleUrl:
    './nav.component.scss'
})

export class NavComponent implements OnInit {

  isDarkMode = false;
  firstname: string | undefined;

  constructor(
    private themeService: ThemeService,
    private dialog: MatDialog,
    private authService: AuthService,
    private readonly _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
    this.firstname = localStorage.getItem('authFirstname') || undefined;
  }

  // Open modal for login
  openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      height: '400px',
      data: {}
    });
  }

  // Authenticated user for display something
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  // Log out with redirection to home
  logout() {
    this.authService.logout();
    localStorage.removeItem('authFirstname');
    localStorage.removeItem('aut');
    this._router.navigate(['']).then(r => false);
  }

}
