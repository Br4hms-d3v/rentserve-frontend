import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [
    NgClass
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  isDarkMode = false;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
  }

}
