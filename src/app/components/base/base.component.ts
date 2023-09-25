import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(
    protected toastSV: ToastService
  ) { }

  ngOnInit(): void {
  }


  showSuccess(text: string = "Success") {
    this.toastSV.show(text, { classname: 'bg-success text-light', delay: 2000 });
  }

  showDanger(dangerTpl: string = "Opps, error occurred!") {
    this.toastSV.show(dangerTpl, { classname: 'bg-danger text-light', delay: 2000 });
  }

}
