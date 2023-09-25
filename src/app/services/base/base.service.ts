import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { BaseEntity } from 'src/app/models/base-entity';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService< T extends BaseEntity> {
  baseUrl = environment.apiUrl;
  protected controller = "test";
  constructor(
    protected http: HttpService
  ) { }


  // lấy all bản ghi 
  getAll(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}${this.controller}/getAll`);
  }

  // lấy bản ghi theo khóa chính
  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}${this.controller}/getById/${id}`);
  } 

  // thêm mới, update, xóa bản ghi 
  save(payload: T, option?: object) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}${this.controller}/save`, payload);
  }

}
