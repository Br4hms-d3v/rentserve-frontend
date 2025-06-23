import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  providers: [],
  imports: [
    NgClass,
    MatGridListModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatDatepickerModule,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
  }


}
