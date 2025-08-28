import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoryDto} from '../model/category';
import {Observable} from 'rxjs';
import {CategoryForm} from '../model/categoryForm';

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

  getCategories() {
    const headers = this.getAuthHeader();
    return this._http.get<CategoryDto[]>(this.apiUrl + '/list', {headers: headers})
  }

  getCategoriesMaterial(): Observable<CategoryDto[]> {
    const headers = this.getAuthHeader();
    return this._http.get<CategoryDto[]>(this.apiUrl + '/material', {headers})
  }

  getCategoriesService(): Observable<CategoryDto[]> {
    const headers = this.getAuthHeader();
    return this._http.get<CategoryDto[]>(this.apiUrl + '/service', {headers})
  }

  getCategory(id: number | undefined): Observable<CategoryDto> {
    const headers = this.getAuthHeader();
    return this._http.get<CategoryDto>(this.apiUrl + '/' + id, {headers})
  }

  updateCategory(id: number | undefined, form: CategoryForm) {
    const headers = this.getAuthHeader();
    return this._http.put<CategoryForm>(this.apiUrl + '/' + id + '/edit', form, {headers})
  }

  deleteCategory(id: number) {
    const headers = this.getAuthHeader();
    return this._http.delete(this.apiUrl + '/' + id, {headers});
  }

}
