import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {UpdateUserForm} from '../models/update-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl + environment.authEndPoint;

  constructor(
    private http: HttpClient
  ) {
  }

  editUser(id: string | number, form: UpdateUserForm) {
    return this.http.post<UpdateUserForm>(this.apiUrl + "/edit/" + id, form);
  }


}
