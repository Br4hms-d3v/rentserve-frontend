import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // Store dark mode state (default = false)
  private darkMode = new BehaviorSubject<boolean>(false);  // LightMode is default
  // Observable to listen to dark mode changes
  public darkMode$ = this.darkMode.asObservable();

  /**
   * Switch dark mode on or off
   */
  toggleTheme(): void {
    this.darkMode.next(!this.darkMode.value);
  }

  /**
   * Check if dark mode is active
   * @returns true if dark mode, false if light mode
   */
  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
