import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-productos-vendedor',
  templateUrl: './productos-vendedor.page.html',
  styleUrls: ['./productos-vendedor.page.scss'],
})
export class ProductosVendedorPage implements OnInit {

  session = {
    key: ""
  }

  productos = []
  sake = []
  tea = []
  cupsets = []
  chopsticks = []
  lifestyle = []

  constructor(
     private restService: RestService,
     private loadingController: LoadingController,
     private router: Router
  ) { this.obtenerDatos()
    this.cargarDatos() }

  ngOnInit() {
  }

  async obtenerDatos() {
    this.session = await this.restService._session();
    console.log(this.session)
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('productos/api/productos', {"id_usuario" : this.session.key}).subscribe(res => {
      this.productos = res.datos.data;
      
      for (let i = 0; i < this.productos.length; ++i) {
        if (this.productos[i]['tipo_producto'] == "Sake") {
          this.sake.push(this.productos[i])
        } else if (this.productos[i]['tipo_producto'] == "Tea") {
          this.tea.push(this.productos[i])
        } else if (this.productos[i]['tipo_producto'] == "Cupset") {
          this.cupsets.push(this.productos[i])
        } else if (this.productos[i]['tipo_producto'] == "Chopsticks") {
          this.chopsticks.push(this.productos[i])
        } else if (this.productos[i]['tipo_producto'] == "Lifestyle") {
          this.lifestyle.push(this.productos[i])
        }
      }

    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  selectProducto (producto:any) {
    let parametros: NavigationExtras = {
      state: {
        producto: producto
      }
    };

    this.router.navigate(['update-producto'], parametros);
  }

  deleteProducto(producto:any) {
    this.restService.ejecutar_delete('productos/api/productos', {"id_producto": producto}).subscribe(res => {
      console.log(res);
      console.log(producto);
      this.router.navigate(['home-vendedor']);
    });
  }
}
