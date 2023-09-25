import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'src/app/shared/controls/file-upload/file-upload.module';
import { PopupUploadFileComponent } from './popup-upload-file/popup-upload-file.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OverviewComponent,
    PopupUploadFileComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ChartsModule,
    FileUploadModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ]
})


export class OverviewModule { }
