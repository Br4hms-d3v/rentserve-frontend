import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {ThemeService} from '../../../core/services/theme.service';
import {NgClass} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  isDarkMode = false;
  selectedLanguage: string = 'fr';

  constructor(private themeService: ThemeService) {
  }

  // This method runs when the component is ready. It is called automatically.
  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
  }

  // This method is for selecting a language. It takes a language as input.
  selectLanguage(language: string) {
    this.selectedLanguage = language;
    // console.log(this.selectedLanguage);
  }

  // This method is for changing the theme (light or dark).
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
