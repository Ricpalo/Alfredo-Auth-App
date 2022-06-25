import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage implements OnInit {

  carrito = []
  productosCarrito = []
  productos = []

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    private loadingController: LoadingController
  ) {
    this.cargarDatos()
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.carrito = this.router.getCurrentNavigation().extras.state.compra;
      } else {
        this.router.navigate(['compras']);
      }
    });
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('carrito_productos/api/carrito_productos', {"id_carrito" : this.carrito}).subscribe(res => {
      this.productosCarrito = res.datos.data;

      for ( let i = 0; i < this.productosCarrito.length; i++ ) {
        this.restService.ejecutar_get('productos/api/productos', {"id_producto": this.productosCarrito[i]['id_producto']}).subscribe(res => {
          this.productos.push(res.datos.data);
        });
      }
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

}
