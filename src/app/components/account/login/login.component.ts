import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  hide = true;

  constructor(
    private accountSV: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected toastSV: ToastService
  ) {
    super(toastSV);
  }
  signInForm: FormGroup;

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams[`returnUrl`] || '/overview';
    this.initLoginForm();
  }



  
  initLoginForm() {
    this.signInForm = this.formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.email
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ]
    });
    new FormControl("", Validators.required, this.isUserNameDuplicated);
  }


  /**
   * Gọi service login nếu ok -< direct về màn home 
   */
  async onSubmit() {
    try {
      const loginDto = {
        Email: this.signInForm.value["username"],
        Password: this.signInForm.value["password"]
      }
      const result = await this.accountSV.login(loginDto, this.returnUrl).toPromise();
      if (result && result.Success) {
        this.showSuccess('Well come');
      } else {
        this.showDanger('Wrong username or password');
      }
    } catch (e) {
      this.showDanger('Opps, error occurred!');
      console.error(e);
    }
  }

  validateForm() {

  }

  isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of(null);
  }

}
