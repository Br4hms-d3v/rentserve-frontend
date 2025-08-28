import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MaterialDto} from '../model/material';
import {MaterialDetailDto} from '../model/material-detail';
import {MaterialForm} from '../model/material-form';

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

  getMaterial(id: number) {
    const headers = this.getAuthHeader();
    return this._http.get<MaterialDetailDto>(this.apiUrl + '/' + id, {headers})
  }

  editMaterial(id: number | null | undefined, form: MaterialForm) {
    const headers = this.getAuthHeader();
    return this._http.put<MaterialForm>(this.apiUrl + '/' + id + '/edit', form, {headers})
  }

  deleteMaterial(id: number | undefined) {
    const headers = this.getAuthHeader();
    return this._http.delete(this.apiUrl + '/' + id + '/delete', {headers})
  }

}
