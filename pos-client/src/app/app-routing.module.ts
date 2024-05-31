import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: 'pos', pathMatch: 'full' },
  { path: '**',  redirectTo: 'pos'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
