import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = false;
  themeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      isDark => {
        this.isDarkMode = isDark;
      })
    ;
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
