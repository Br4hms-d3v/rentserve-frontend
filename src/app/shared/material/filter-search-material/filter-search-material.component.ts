import {Component} from '@angular/core';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-filter-search-material',
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './filter-search-material.component.html',
  styleUrl: './filter-search-material.component.scss'
})
export class FilterSearchMaterialComponent {

}
