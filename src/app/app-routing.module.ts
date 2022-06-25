import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
      loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
      canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'form-usuario',
    loadChildren: () => import('./form-usuario/form-usuario.module').then( m => m.FormUsuarioPageModule)
  },
  {
    path: 'home-vendedor',
    loadChildren: () => import('./home-vendedor/home-vendedor.module').then( m => m.HomeVendedorPageModule),
  },
  {
    path: 'home-usuario',
    loadChildren: () => import('./home-usuario/home-usuario.module').then( m => m.HomeUsuarioPageModule),
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'add-producto',
    loadChildren: () => import('./add-producto/add-producto.module').then( m => m.AddProductoPageModule)
  },
  {
    path: 'productos-vendedor',
    loadChildren: () => import('./productos-vendedor/productos-vendedor.module').then( m => m.ProductosVendedorPageModule)
  },
  {
    path: 'update-producto',
    loadChildren: () => import('./update-producto/update-producto.module').then( m => m.UpdateProductoPageModule)
  },
  {
    path: 'go-purchase',
    loadChildren: () => import('./go-purchase/go-purchase.module').then( m => m.GoPurchasePageModule)
  },
  {
    path: 'show-product',
    loadChildren: () => import('./show-product/show-product.module').then( m => m.ShowProductPageModule)
  },
  {
    path: 'carrito-user',
    loadChildren: () => import('./carrito-user/carrito-user.module').then( m => m.CarritoUserPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'compras',
    loadChildren: () => import('./compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'compra',
    loadChildren: () => import('./compra/compra.module').then( m => m.CompraPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
