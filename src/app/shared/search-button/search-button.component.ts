import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-search-button',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.scss'
})
export class SearchButtonComponent {

  searchQuery: string = '';

  onSearch() {
    console.log("onSearch");
  }

}
