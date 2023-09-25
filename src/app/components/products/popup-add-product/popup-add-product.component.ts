import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextBoxType } from 'src/app/commons/enums/text-box-type.enum';
import { Product } from 'src/app/models/product';
import { ProductBrand } from 'src/app/models/product-brand';
import { BrandService } from 'src/app/services/brands/brand.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-popup-add-product',
  templateUrl: './popup-add-product.component.html',
  styleUrls: ['./popup-add-product.component.scss']
})
export class PopupAddProductComponent implements OnInit, OnChanges {

  addForm: FormGroup
  textBoxtype = TextBoxType;
  listBrand :ProductBrand[] = [];
  @Input() visible: boolean = false;
  @Output() submitProduct = new EventEmitter<any>();
  @Output() cancelPopup = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public productSelected: Product,
    private brandSV: BrandService
  ) { }

  ngOnInit(): void {
    this.getAllBrand();
    const {ProductName, ProductLink, Price, ImageUrl, DisCount,BrandID, Description} = this.productSelected;
    this.addForm = new FormGroup({
      ProductName: new FormControl(ProductName, [Validators.required]),
      ProductLink: new FormControl(ProductLink, [Validators.required]),
      Price: new FormControl(Price, [Validators.required]),
      ImageUrl: new FormControl(ImageUrl, [Validators.required]),
      DisCount: new FormControl(DisCount, [Validators.required]),
      BrandID: new FormControl(BrandID),
      Description: new FormControl(Description)
    });
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  /**
   * Emit sản phẩm ra màn cha 
   * @returns 
   */
  onSaveProduct() {
    if (this.addForm.invalid) {
      return;
    }

    this.productSelected.ProductName = this.addForm.value.ProductName;
    this.productSelected.ProductLink = this.addForm.value.ProductLink;
    this.productSelected.Price = this.addForm.value.Price;
    this.productSelected.ImageUrl = this.addForm.value.ImageUrl;
    this.productSelected.DisCount = this.addForm.value.DisCount;
    this.productSelected.BrandID = this.addForm.value.BrandID;
    this.productSelected.Description = this.addForm.value.Description;
    this.submitProduct.emit(this.productSelected);
  }


  /**
   * Đóng popup 
   */
  onCancel() {
    this.cancelPopup.emit(true);
    
  }


  async getAllBrand() {
    try {
      const result = await this.brandSV.getAll().toPromise();
      if (result && result.Success) {
        this.listBrand = result.Data;
        const none = new ProductBrand();
        none.BrandID = 0;
        none.BrandName = "None";
        this.listBrand.unshift(none);
      }
    } catch (e) {
      console.error(e);
    }
  }
  
}
