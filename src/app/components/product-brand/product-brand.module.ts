import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBrandComponent } from './product-brand.component';
import { Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ProductBrandRoutingModule } from './product-brand-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopupAddBrandComponent } from './popup-add-brand/popup-add-brand.component';
import { TextBoxModule } from 'src/app/shared/controls/text-box/text-box.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    ProductBrandComponent,
    PopupAddBrandComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ProductBrandRoutingModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    TextBoxModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [ProductBrandComponent]
})
export class ProductBrandModule { }
