import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { InventarioComponent } from './inventario/inventario.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    VentasComponent,
    InventarioComponent,
    CategoriasComponent,
    ProveedoresComponent,
    ProductosComponent,
    ClientesComponent,
    EmpleadosComponent,
    CarritoComponent,
    PagesComponent,
  ],
  exports: [PagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    // ComponentsModule
  ],
})
export class PagesModule {}
