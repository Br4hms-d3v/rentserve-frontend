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
  private _currentUser !: BehaviorSubject<UserModel>; // Save the current user (as an observable)

  constructor(private readonly _http: HttpClient) {
    let potentialUser = localStorage.getItem('currentUser'); // Try to read user from localStorage
    this._currentUser = new BehaviorSubject<UserModel>(potentialUser ? JSON.parse(potentialUser) : null); // If user exists, set it; if not, use null
  }

  // Get the current user value (not observable)
  get currentUser(): UserModel {
    return this._currentUser.value;
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
        localStorage.setItem('currentUser', JSON.stringify(data.token));
      }
    ));
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  register(form: RegistrationModel): Observable<UserModel> {
    return this._http.post<UserModel>(this.apiUrl + "/registration", form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(tap(
      (data) => {
        this._currentUser.next(data);
        localStorage.setItem('currentUser', JSON.stringify(data.token));
      }
    ))
  }

  /**
   * Logout user by removing localStorage
   */
  logout() {
    localStorage.removeItem('currentUser');
  }

}
