import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoryDto} from '../model/category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiBaseUrl + environment.categoryEndPoint;

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

  constructor(private readonly _http: HttpClient) {
  }

  getCategoriesMaterial(): Observable<CategoryDto[]> {
    const headers = this.getAuthHeader();
    return this._http.get<CategoryDto[]>(this.apiUrl + '/material', {headers})
  }

}
