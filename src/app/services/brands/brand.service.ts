import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductBrand } from 'src/app/models/product-brand';
import { BaseService } from '../base/base.service';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<ProductBrand>{

  constructor(public http : HttpService, private router: Router) {
    super(http);
    super.controller = "productbrand";
   }
}
