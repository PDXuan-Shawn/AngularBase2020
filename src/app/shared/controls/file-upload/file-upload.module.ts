import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
