import {Component, OnInit} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ThemeService} from '../../../core/services/theme.service';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from '../../auth/registration/registration.component';

@Component({
  selector: 'app-home',
  providers: [],
  imports: [
    NgClass,
    MatGridListModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatDatepickerModule,
    NgOptimizedImage, ReactiveFormsModule, RegistrationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isDarkMode = false; // Store dark mode state (true or false)

  // Inject the theme service (for dark mode)
  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode(); // Get current theme (dark or light)
    this.themeService.darkMode$.subscribe((mode: boolean) => this.isDarkMode = mode); // Watch changes in dark mode (reactive)
  }

}
