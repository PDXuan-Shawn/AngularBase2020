import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { StorageFileService } from 'src/app/services/storage-file/storage-file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {


  public progress: number;
  public message: string;
  
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private fileSV: StorageFileService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.fileSV.uploadBanner( formData)
      .subscribe((event: ApiResponse) => {
        if (event.Success)
        this.onUploadFinished.emit(event.Data);
      });
  }


}
