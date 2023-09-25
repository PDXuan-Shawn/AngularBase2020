import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent implements OnInit {
  currentUser$: Observable<User>;
  constructor(private accountSV: AccountService, protected toastSV: ToastService) { 
    super(toastSV);
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountSV.currentUser$;
  }


  logout() {
    this.accountSV.logout();
  }

  showToast() {
    this.showDanger('Chưa phát triển');
  }

}
