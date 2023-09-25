import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBrandComponent } from './product-brand.component';

const routes: Routes = [
  {path: '', component: ProductBrandComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBrandRoutingRoutingModule { }
