import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService  extends BaseService<Product>{

  constructor(public http: HttpService, private router: Router) {
    super(http);
    super.controller = "product";
   }
}
