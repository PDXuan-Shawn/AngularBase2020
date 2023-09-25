import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { ServerErrComponent } from './core/components/server-err/server-err.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'account', pathMatch: "full"},
  { path: 'server-error', component: ServerErrComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/account/account.module')
      .then(mod => mod.AccountModule)
  },
  {
    path: 'brands',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/product-brand/product-brand.module')
      .then(mod => mod.ProductBrandModule)
  },
  {
    path: 'overview',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/overview/overview.module')
      .then(mod => mod.OverviewModule)
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/products/products.module')
      .then(mod => mod.ProductsModule)
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
