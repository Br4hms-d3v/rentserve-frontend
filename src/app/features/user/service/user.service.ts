import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {UpdateUserForm} from '../models/update-user';
import {ChangePasswordForm} from '../models/change-password';
import {UserDto} from '../models/userDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl + environment.userEndPoint;

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  getUser(id: number) {
    return this._http.get<UserDto>(this.apiUrl + '/' + id);
  }

  editUser(id: number | null | undefined, form: UpdateUserForm) {
    return this._http.put<UpdateUserForm>(this.apiUrl + '/' + id + "/edit", form);
  }

  changePassword(id: number | undefined, form: ChangePasswordForm) {
    return this._http.patch<ChangePasswordForm>(this.apiUrl + '/' + id + "/change-password", form);
  }

  deleteUser(id: string | number) {
    return this._http.delete(this.apiUrl + id + "/delete");
  }

}
