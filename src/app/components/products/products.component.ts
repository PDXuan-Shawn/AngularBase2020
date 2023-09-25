import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse } from 'src/app/models/api-response';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { BaseComponent } from '../base/base.component';
import { PopupAddProductComponent } from './popup-add-product/popup-add-product.component';
import { ModelState } from 'src/app/commons/enums/model-state.enum'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  @ViewChild('search', { static: false }) searchTerm: ElementRef;

  listProduct: Product[] = new Array<Product>();

  totalCount: number = 100;
  isLoaded = false;
  pagerParam = {
    pageSize: 10,
    pageNumber: 1,
    search: "",
    sort: "ProductName"
  }

  selectedProduct: Product = new Product();


  constructor(
    protected toastSV: ToastService,
    private productSV: ProductService,
    public dialog: MatDialog
  ) {
    super(toastSV)
  }

  ngOnInit(): void {
    this.getAllProduct();
  }


  /**
   * Lấy danh sách sản phẩm 
   */
  async getAllProduct() {
    try {
      const result = await this.productSV.getAll().toPromise();
      if (result && result.Success) {
        this.listProduct = result.Data;
        this.isLoaded = true;
      }
    } catch (e) {
      this.showDanger();
    }
  }


  // Nhấn thay đổi trang
  onPageChanged(event: any) {
    if (this.pagerParam.pageNumber !== event) {
      this.pagerParam.pageNumber = event;
      this.getAllProduct();
    }
  }



  /**
   * Tìm kiếm sản phẩm 
   */
  onSearch() {
    this.pagerParam.search = this.searchTerm.nativeElement.value;
    this.pagerParam.pageNumber = 1;
    this.getAllProduct();
  }


  /**
   * Hiển thị popup 
   */
  showAddPopup() {
    // this.isShowPopup = true;
    this.selectedProduct = new Product();
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupAddProductComponent, {
      width: '640px', disableClose: true,
      data: this.selectedProduct
    });

    const submitProdcut = dialogRef.componentInstance.submitProduct.subscribe((data: Product) => {
      this.submitProductHandle(data);
      submitProdcut.unsubscribe();
    });


    const hideSub = dialogRef.componentInstance.cancelPopup.subscribe((data: Product) => {
      this.hidePopup();
      hideSub.unsubscribe();
    });

  }


  // Đóng popup
  hidePopup() {
    const dialogRef = this.dialog.closeAll();
  }

  /**
   * gọi service lưu sản phẩm 
   * @param product 
   */
  async submitProductHandle(product: any) {
    try {
      const result = await this.productSV.save(product).toPromise();
      if (result.Success) {
        this.hidePopup();
        this.getAllProduct();
      }
    } catch (e) {
      console.error(e);
      this.showDanger("Opps err");
    }
  }


  onEditItem(product: Product) {
    product.EditMode = ModelState.Update;
    this.selectedProduct = product;
    this.openDialog();
  }



  async onDeleteItem(product: Product) {
    product.EditMode = ModelState.Delete;
    const result = await this.productSV.save(product).toPromise();
    if (result && result.Success) {
      this.listProduct = this.listProduct.filter(item => item.ProductID !== product.ProductID);
      this.showSuccess("Xóa thành công");
    }
  }

}
