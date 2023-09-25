import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequesOptions {
  headers?: HttpHeaders,
  observe?: 'body',
  params?: HttpParams,
  reportProgress?: boolean,
  responseType?: 'json',
  withCredentials?: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    protected http: HttpClient
  ) { }

  public get<T>(endpoint: string, options?: IRequesOptions): Observable<T> {
    return this.http.get<T>(endpoint, options);
  }


  public post<T>(endpoint: string, data: any, options?: IRequesOptions): Observable<T> {
    return this.http.post<T>(endpoint, data, options);
  }


  public put<T>(endpoint: string, data: any, options?: IRequesOptions): Observable<T> {
    return this.http.put<T>(endpoint, data, options);
  }

  public delete<T>(endpoint: string, options?: IRequesOptions): Observable<T> {
    return this.http.delete<T>(endpoint, options);
  }

  public external(path: string, api?: boolean) {
    api = typeof api === 'undefined' ? false : api
    let url = ''
    url = path

    window.location.href = url;
  }
}
