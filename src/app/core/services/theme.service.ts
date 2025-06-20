import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new BehaviorSubject<boolean>(false);  // Par défaut, mode sombre
  public darkMode$ = this.darkMode.asObservable();

  toggleTheme(): void {
    this.darkMode.next(!this.darkMode.value);
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
