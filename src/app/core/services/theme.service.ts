import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkModeSubject = new BehaviorSubject<boolean>(false);  // Par défaut, mode sombre
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  toggleTheme(): void {
    this.isDarkModeSubject.next(!this.isDarkModeSubject.value);
  }

  getThemeState(): boolean {
    return this.isDarkModeSubject.value;
  }
}
