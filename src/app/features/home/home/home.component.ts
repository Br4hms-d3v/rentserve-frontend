import {Component, OnInit} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-home',
  providers: [],
  imports: [
    NgClass,
    MatGridListModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatDatepickerModule,
    MatButton, NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isDarkMode = false;
  hide = true;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode);
  }

}
