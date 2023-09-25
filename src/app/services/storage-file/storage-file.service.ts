import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { StorageFile } from 'src/app/models/storage-file';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class StorageFileService extends BaseService<StorageFile>{

  
  constructor(public http: HttpService, private router: Router) {
    super(http);
    super.controller = "upload";
   }

  // upload anh
  uploadBanner(payload: any, option?: object) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}${this.controller}`, payload);
  }

  // upload anh
  deleteBanner(payload: any, option?: object) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}${this.controller}/deleteBanner`, payload);
  }
}
