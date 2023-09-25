import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions } from 'chart.js';
import { ModelState } from 'src/app/commons/enums/model-state.enum';
import { StorageFile } from 'src/app/models/storage-file';
import { BrandService } from 'src/app/services/brands/brand.service';
import { StorageFileService } from 'src/app/services/storage-file/storage-file.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { environment } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends BaseComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['FileName', 'FullPath', 'Options'];

  listBanner: [] = [];

  dataSource = new MatTableDataSource(this.listBanner);

  selectedFile: StorageFile = new StorageFile();


  constructor(
    public tostSV: ToastService,
    public dialog: MatDialog,
    private brandSV: BrandService,
    private fileSV: StorageFileService
  ) {
    super(tostSV);
  }

  ngOnInit(): void {
    this.getAllBannder();
  }


  
  async getAllBannder() {
    try {
      const result = await this.fileSV.getAll().toPromise();
      if (result && result.Success) {
        this.listBanner = result.Data;
        this.listBanner.forEach((item: StorageFile) =>   {
          item.FullPath = environment.staticPath + item.FilePath;
        })
        this.dataSource = new MatTableDataSource(this.listBanner);
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
    this.selectedFile = new StorageFile();
    this.openDialog();
  }

  openDialog() {
    // const dialogRef = this.dialog.open(PopupAddBrandComponent, {
    //   width: '640px', disableClose: true,
    //   data: this.selectedFile
    // });

    // const submitBrand = dialogRef.componentInstance.submitBrand.subscribe((data: StorageFile) => {
    //   this.submitBrand(data);
    //   submitBrand.unsubscribe();
    // });


    // const hideSub = dialogRef.componentInstance.cancelPopup.subscribe((data: StorageFile) => {
    //   this.hidePopup();
    //   hideSub.unsubscribe();
    // });

  }

  async submitBrand(brand: StorageFile) {
    try {
      // const result = await this.brandSV.save(brand).toPromise();
      // if (result.Success) {
      //   this.hidePopup();
      //   this.getAllBrand();
      // }
    } catch (e) {
      console.error(e);
      this.showDanger("Opps err");
    }
  }


  hidePopup() {
    const dialogRef = this.dialog.closeAll();
  }

  onEditItem(brand: StorageFile) {
    // brand.EditMode = ModelState.Update;
    // this.selectedFile = brand;
    // this.openDialog();
  }



  async onDeleteItem(banner: StorageFile) {
    banner.EditMode = ModelState.Delete;
    const result = await this.fileSV.deleteBanner(banner).toPromise();
    if (result && result.Success) {
      this.getAllBannder();
      this.showSuccess("Xóa thành công");
    }
  }

  onUploadFinished(event: any) {
    this.getAllBannder();
  }

}
