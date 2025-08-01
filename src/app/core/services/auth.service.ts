import {Injectable} from '@angular/core';
import {environment} from '../../environment/environment';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {UserModel} from '../../features/auth/model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginModel} from '../../features/auth/model/login';
import {RegistrationModel} from '../../features/auth/model/registration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiBaseUrl + environment.authEndPoint; // API base URL + endpoint for auth (login)
  _currentUser !: BehaviorSubject<UserModel | null>; // Save the current user (as an observable)

  constructor(private readonly _http: HttpClient) {
    let potentialUser = localStorage.getItem('currentUser'); // Try to read user from localStorage
    this._currentUser = new BehaviorSubject<UserModel | null>(potentialUser ? JSON.parse(potentialUser) : null); // If user exists, set it; if not, use null
  }

  // Get the current user value (not observable)
  get currentUser$(): Observable<UserModel | null> {
    return this._currentUser.asObservable();
  }

  getCurrentUserId(): number | null {
    return this._currentUser.getValue()?.id ?? null;
  }

  getToken(): string | null {
    const currentUser = this._currentUser.getValue();
    if(currentUser) {
      console.log('Token dans AuthService', currentUser.token);
      return currentUser.token;
    }
    return null;
  }

  updateUserFirstname(firstName: string) {
    if (this._currentUser.value) {
      this._currentUser.value.firstName = firstName;

      localStorage.setItem('currentUser', JSON.stringify(this._currentUser.value));

      this._currentUser.next(this._currentUser.value);
    }
  }

  /**
   * Send login request to the backend
   * @param form - login form with username and password
   * @returns Observable with user data
   */
  login(form: LoginModel): Observable<UserModel> {
    return this._http.post<UserModel>(this.apiUrl + "/login", form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Send as JSON
      }),
      withCredentials: true // Send cookies
    }).pipe(tap(
      (data) => {
        // Save user in memory
        this._currentUser.next(data);
        // Save user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(data));
        localStorage.setItem('token', data.token);
      }
    ));
  }

  register(form: RegistrationModel): Observable<UserModel> {
    return this._http.post<UserModel>(this.apiUrl + "/registration", form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(tap(
      (data) => {
        this._currentUser.next(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
      }
    ))
  }

  /**
   * Logout user by removing localStorage
   */
  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
  }

}
