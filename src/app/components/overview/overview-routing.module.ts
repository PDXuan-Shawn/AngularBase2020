import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: OverviewComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
