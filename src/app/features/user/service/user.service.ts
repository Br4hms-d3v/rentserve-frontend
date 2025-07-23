import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UpdateUserForm} from '../models/update-user';
import {UserDto} from '../models/userDto';
import {ChangePasswordForm} from '../models/change-password';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl + environment.userEndPoint;

  private getAuthHeaders(): HttpHeaders {
    const userJson = localStorage.getItem('currentUser');
    let token = '';

    if (userJson) {
      const user = JSON.parse(userJson);
      token = user.token;
    }

    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  getUser(id: number) {
    const headers = this.getAuthHeaders();
    return this._http.get<UserDto>(this.apiUrl + '/' + id, {headers});
  }

  editUser(id: number | null | undefined, form: UpdateUserForm) {
    const headers = this.getAuthHeaders();
    return this._http.put<UpdateUserForm>(this.apiUrl + '/' + id + "/edit", form, {headers});
  }


  changePassword(id: number | undefined, form: ChangePasswordForm) {
    const headers = this.getAuthHeaders();
    return this._http.patch<ChangePasswordForm>(this.apiUrl + '/' + id + "/change-password", form, {headers});
  }

  deleteUser(id: string | number) {
    const headers = this.getAuthHeaders();
    return this._http.delete(this.apiUrl + '/' + id + "/delete", {headers});
  }

}
