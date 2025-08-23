import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MaterialDto} from '../model/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private apiUrl = environment.apiBaseUrl + environment.materialEndPoint;

  private getAuthHeader() {
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

  getMaterialsByCategory(nameCategory: string | undefined) {
    const headers = this.getAuthHeader();
    return this._http.get<MaterialDto[]>(this.apiUrl + '/category/' + nameCategory, {headers})
  }

  getMaterials() {
    const headers = this.getAuthHeader();
    return this._http.get<MaterialDto[]>(this.apiUrl + '/list', {headers})
  }

}
