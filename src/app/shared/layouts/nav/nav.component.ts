import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {NgClass} from '@angular/common';
import {ThemeService} from '../../../core/services/theme.service';


@Component({
  selector: 'app-nav',
  imports: [MatToolbar, MatIcon, MatFabButton, NgClass],
  templateUrl: './nav.component.html',
  styleUrl:
    './nav.component.scss'
})

export class NavComponent implements OnInit {

  isDarkMode = false;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
  }

}
