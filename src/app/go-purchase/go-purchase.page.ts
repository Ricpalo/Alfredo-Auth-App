import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-go-purchase',
  templateUrl: './go-purchase.page.html',
  styleUrls: ['./go-purchase.page.scss'],
})
export class GoPurchasePage implements OnInit {

  tipo = "";
  productos = []

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.tipo = this.router.getCurrentNavigation().extras.state.tipo;
      } else {
        this.router.navigate(['home-usuario']);
      }
    });

    this.cargarDatos();
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('productos/api/productos', {"tipo_producto" : this.tipo}).subscribe(res => {
      this.productos = res.datos.data;
      console.log(this.productos)

    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  showProduct(producto:any) {
    let parametros: NavigationExtras = {
      state: {
        producto: producto
      }
    };

    this.router.navigate(['show-product'], parametros);
  }
}
