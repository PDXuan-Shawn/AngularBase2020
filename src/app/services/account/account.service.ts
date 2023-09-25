import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/ultils/local-storage';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<User> {
  private currentUserSource: ReplaySubject<User> = new ReplaySubject<User>();
  currentUser$ = this.currentUserSource.asObservable();
  constructor(public http: HttpService, private router: Router, private localStrSV: LocalStorageService) {
    super(http);
    super.controller = "auth";
  }

  /**
   * Lấy thông tin user hiện tại 
   * @param token 
   * @returns 
   */
  loadCurrentUser(token: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}${this.controller}`, { headers }).pipe(
      tap((user: User) => {
        if (user) {
          this.localStrSV.set('token', user.Token);
          this.currentUserSource.next(user);
        } else {
          if(this.currentUserSource) {
            this.currentUserSource.next(new User());
          }
        }
      }, err => {
        if(this.currentUserSource) {
          this.currentUserSource.next(new User());
        }
      })
    );
  }


  /**
   * Đăng nhập ứng dụng
   * @param values 
   * @returns 
   */
  login(values: any, firstUrl: any) {
    return this.http.post<ApiResponse>(`${this.baseUrl}${this.controller}/login`, values).pipe(
      tap((res: ApiResponse) => {
        if (res && res.Success && res.Data) {
          this.router.navigateByUrl(firstUrl);
          const user: User = res.Data;
          this.localStrSV.set('token', user.Token);
          this.currentUserSource.next(user);
        }
      })
    );
  }


  /**
   * Đăng ký tài khoản 
   * @param values 
   * @returns 
   */
  register(values: any) {
    return this.http.post<User>(`${this.baseUrl}${this.controller}/register`, values).pipe(
      tap((user: User) => {
        if (user) {
          this.localStrSV.set('token', user.Token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  /**
   * Đăng xuất tài khoản 
   */
  logout() {
    this.localStrSV.reomveAll();
    this.currentUserSource.next();
    this.router.navigateByUrl('/');
  }

  /**
   * Check xem tài khoản tồn tại hay chưa
   */
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
}

