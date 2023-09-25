import { Component, EventEmitter, Inject, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductBrand } from 'src/app/models/product-brand';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextBoxType } from 'src/app/commons/enums/text-box-type.enum';

@Component({
  selector: 'app-popup-add-brand',
  templateUrl: './popup-add-brand.component.html',
  styleUrls: ['./popup-add-brand.component.scss']
})
export class PopupAddBrandComponent implements OnInit {

  addForm: FormGroup
  textBoxtype = TextBoxType;
  @Input() visible: boolean = false;
  @Output() submitBrand = new EventEmitter<any>();
  @Output() cancelPopup = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public brandSelected: ProductBrand
  ) { }

  ngOnInit(): void {
    const { BrandName, ImageUrl } = this.brandSelected;
    this.addForm = new FormGroup({
      BrandName: new FormControl(BrandName, [Validators.required]),
      ImageUrl: new FormControl(ImageUrl, [Validators.required])
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
    this.brandSelected.BrandName = this.addForm.value.BrandName;
    this.brandSelected.ImageUrl = this.addForm.value.ImageUrl;
    this.submitBrand.emit(this.brandSelected);
  }

  /**
   * Đóng popup 
   */
  onCancel() {
    this.cancelPopup.emit(true);
  }

  
}
