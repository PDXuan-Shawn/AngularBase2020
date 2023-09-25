import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PagerComponent],
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  exports: [PagerComponent]
})
export class PagerModule { }
