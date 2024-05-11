import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { MenuNavComponent } from './global/layout/menu-nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { VentasComponent } from './pages/ventas/ventas.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    DashboardComponent,
    VentasComponent,
    InventarioComponent,
    CategoriasComponent,
    ProveedoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
