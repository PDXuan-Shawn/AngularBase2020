import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModelState } from 'src/app/commons/enums/model-state.enum';
import { ProductBrand } from 'src/app/models/product-brand';
import { BrandService } from 'src/app/services/brands/brand.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { BaseComponent } from '../base/base.component';
import { PopupAddBrandComponent } from './popup-add-brand/popup-add-brand.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['BrandID', 'BrandName', 'ImageUrl', 'Options'];

  listBrand: ProductBrand[] = [];

  dataSource = new MatTableDataSource(this.listBrand);

  selectedBrand: ProductBrand = new ProductBrand();


  constructor(
    public tostSV: ToastService,
    private brandSV: BrandService,
    public dialog: MatDialog
  ) {
    super(tostSV);
  }

  ngOnInit(): void {
    this.getAllBrand();
  }

  ngAfterViewInit(): void {
  }


  async getAllBrand() {
    try {
      const result = await this.brandSV.getAll().toPromise();
      if (result && result.Success) {
        this.listBrand = result.Data;
        this.dataSource = new MatTableDataSource(this.listBrand);
        this.dataSource.sort = this.sort;
      }
    } catch (e) {
      this.showDanger();
    }
  }

  /**
   * Hiển thị popup 
   */
  showAddPopup() {
    // this.isShowPopup = true;
    this.selectedBrand = new ProductBrand();
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupAddBrandComponent, {
      width: '640px', disableClose: true,
      data: this.selectedBrand
    });

    const submitBrand = dialogRef.componentInstance.submitBrand.subscribe((data: ProductBrand) => {
      this.submitBrand(data);
      submitBrand.unsubscribe();
    });


    const hideSub = dialogRef.componentInstance.cancelPopup.subscribe((data: ProductBrand) => {
      this.hidePopup();
      hideSub.unsubscribe();
    });

  }

  async submitBrand(brand: ProductBrand) {
    try {
      const result = await this.brandSV.save(brand).toPromise();
      if (result.Success) {
        this.hidePopup();
        this.getAllBrand();
      }
    } catch (e) {
      console.error(e);
      this.showDanger("Opps err");
    }
  }


  hidePopup() {
    const dialogRef = this.dialog.closeAll();
  }

  onEditItem(brand: ProductBrand) {
    brand.EditMode = ModelState.Update;
    this.selectedBrand = brand;
    this.openDialog();
  }



  async onDeleteItem(brand: ProductBrand) {
    brand.EditMode = ModelState.Delete;
    const result = await this.brandSV.save(brand).toPromise();
    if (result && result.Success) {
      this.getAllBrand();
      this.showSuccess("Xóa thành công");
    }
  }

}
