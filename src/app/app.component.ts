import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AccountService } from './services/account/account.service';
import { LoadingService } from './services/loading.service';
import { LocalStorageService } from './ultils/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StoreManagement';

  loading = false;
  isLogin = false;


  constructor(
    private accountSV: AccountService,
    private localStrSV: LocalStorageService,
    private loadingSV: LoadingService,
    private router: Router
  ) {
    // this.loadingSV.busy();
  }

  ngOnInit() {
    this.loadCurrentUser();
    this.accountSV.currentUser$.subscribe(
      res => {
        if (res?.Token) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
          this.router.navigateByUrl("/");
        }
      }
    )
  }

  
  // Lấy thông tin user đăng nhập
  loadCurrentUser() {
    const token = this.localStrSV.get('token');
    this.accountSV.loadCurrentUser(token).subscribe(() => {
      this.isLogin = true;
    }, error => {
      console.error(error);
    });
  }

}
