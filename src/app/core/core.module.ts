import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServerErrComponent } from './components/server-err/server-err.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [ NotFoundComponent, ServerErrComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NotFoundComponent,
    ServerErrComponent
  ]
})
export class CoreModule { }
