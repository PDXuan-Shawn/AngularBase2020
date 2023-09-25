import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { PagerModule } from 'src/app/shared/controls/pager/pager.module';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PopupAddProductComponent } from './popup-add-product/popup-add-product.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { TextBoxModule } from 'src/app/shared/controls/text-box/text-box.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';



@NgModule({
  declarations: [ProductsComponent, ProductItemComponent, PopupAddProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PagerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    TextBoxModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [PopupAddProductComponent]
})
export class ProductsModule { }
