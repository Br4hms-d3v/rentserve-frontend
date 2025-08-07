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
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-nav',
  imports: [MatToolbar, MatIcon, MatFabButton, NgClass, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl:
    './nav.component.scss'
})

export class NavComponent implements OnInit {

  isDarkMode = false;
  firstname: string | null | undefined;
  isAuthenticated: boolean = false;
  userId: number | undefined;

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
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isAuthenticated = !!user;
        this.firstname = user.firstName;
        this.userId = user.id;
      } else {
        this.isAuthenticated = false;
        this.firstname = null;
        this.userId = undefined;
      }
    })

  }

  // Open modal for login
  openLoginModal() {
    this.dialog.open(LoginComponent, {
      // width: '400px',
      // height: '400px',
      data: {}
    });
  }

  // Log out with redirection to home
  logout() {
    this.authService.logout();
    this.firstname = null;
    this.userId = undefined;
    this.isAuthenticated = false;
    this._router.navigate(['']).then(r => false);
  }

}
