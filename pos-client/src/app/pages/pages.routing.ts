import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { VentasComponent } from './ventas/ventas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventarioComponent } from './inventario/inventario.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CarritoComponent } from './carrito/carrito.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { authGuard } from '../guards/auth.guard';



const routes: Routes = [
    {
        path: 'pos',
        component: PagesComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }  },
            { path: 'ventas', component: VentasComponent, data: { titulo: 'Ventas' }   },
            { path: 'inventario', component: InventarioComponent, data: { titulo: 'Inventario' } },
            { path: 'categorias', component: CategoriasComponent, data: { titulo: 'Categorias' }  },
            { path: 'proveedores', component: ProveedoresComponent, data: { titulo: 'Proveedores' }  },
            { path: 'carrito', component: CarritoComponent, data: { titulo: 'Carrito' }  },
            { path: 'empleados', component: EmpleadosComponent, data: { titulo: 'Empleados' }  },
            { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' } },
            { path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes' }  },
           
            // Mantenimientos

            // { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación' } },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {

   
 }
