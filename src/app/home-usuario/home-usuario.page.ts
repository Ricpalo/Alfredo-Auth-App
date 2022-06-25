import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.page.html',
  styleUrls: ['./home-usuario.page.scss'],
})
export class HomeUsuarioPage implements OnInit {

  productos = [];
  new_productos = [];


  constructor(
    private restService: RestService,
    private loadingController: LoadingController,
    private router: Router
  ) { this.cargarDatos() }

  ngOnInit() {
  }

  signOut () {
    this.restService.cerrarSesion();
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('productos/api/productos', {}).subscribe(res => {
      this.productos = res.datos.data;

      for ( let i = this.productos.length - 1; i >= this.productos.length - 3; --i ) {
        this.new_productos.push(this.productos[i]);
      }

      console.log(this.new_productos)
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  goPurchase(tipo:string) {
    let parametros: NavigationExtras = {
      state: {
        tipo: tipo
      }
    };

    this.router.navigate(['go-purchase'], parametros);
  }

  carritoUser() {
    this.router.navigate(['carrito-user']);
  }

  userPage(tipo:string) {
    let parametros: NavigationExtras = {
      state: {
        tipo: tipo
      }
    };

    this.router.navigate(['profile'], parametros);
  }

  contact() {
    this.router.navigate(['formulario']);
  }

}
