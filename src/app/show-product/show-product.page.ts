import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.page.html',
  styleUrls: ['./show-product.page.scss'],
})
export class ShowProductPage implements OnInit {

  key = ""

  producto = []
  carritos = []
  carrito = []
  carritoUpdate = {
    id_carrito: "",
    status: "",
    precio: ""
  }

  nombre = ""
  precio = ""

  carritoCompras = {
    id_carrito: "",
    id_producto: "",
    cantidad_producto: "",
    precio_producto: ""
  }

  errores = {
    cantidad_producto: ""
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    private loadingController: LoadingController
  ) { 
    this.obtenerDatos();
    this.obtenerCarrito();
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.producto = this.router.getCurrentNavigation().extras.state.producto;
        this.nombre = this.producto['nombre_producto']
        this.precio = this.producto['precio_producto']
        this.carritoCompras.id_producto = this.producto['id_producto'];
      } else {
        this.router.navigate(['go-purchase']);
      }
    });
  }

  async obtenerDatos () {
    let session = await this.restService._session();
    this.key = session.key
    
  }

  async obtenerCarrito() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('carritos/api/carritos', {"id_usuario" : this.key}).subscribe(res => {
      this.carritos = res.datos.data;

      for ( let i = 0; i < this.carritos.length ; i++ ) {
        if ( this.carritos[i]['status_carrito'] == "Vacio" || this.carritos[i]['status_carrito'] == "Lleno" ) {
          this.carrito.push(this.carritos[i]);
        }
      }
      console.log(this.carrito);

      this.carritoCompras.id_carrito = this.carrito[0]['id_carrito'];

      this.restService.ejecutar_get('productos/api/productos', {"id_producto" : this.carritoCompras.id_producto}).subscribe(res => {
        this.producto = res.datos.data;
  
        this.carritoCompras.precio_producto = this.producto[0]['precio_producto'];
        console.log(this.carritoCompras)
      }, error => {
        loading.dismiss();
        console.log(error);
      });

    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  goBack(tipo: string) {
    let parametros: NavigationExtras = {
      state: {
        tipo: tipo
      }
    };

    this.router.navigate(['go-purchase'], parametros);
  }

  async addCarrito() {
    let formulario = new FormData();

    let total = parseFloat(this.carritoCompras.cantidad_producto) * parseFloat(this.carritoCompras.precio_producto);

    formulario.append("carrito", this.carritoCompras.id_carrito);
    formulario.append("producto", this.carritoCompras.id_producto);
    formulario.append("cantidad", this.carritoCompras.cantidad_producto);
    formulario.append("precio", this.carritoCompras.precio_producto);
    formulario.append("total", total.toString())

    if ( this.carritoCompras.cantidad_producto == "" ) {
      this.errores.cantidad_producto = "Por favor ingresa una cantidad";
    } else {
      this.restService.subida_ficheros_y_datos('carrito_productos/api/carrito_productos', formulario).subscribe(result => {
        console.log(result);

        this.carritoUpdate.id_carrito = this.carritoCompras.id_carrito;
        this.carritoUpdate.status = "Lleno";

        let sumador = parseFloat(this.carrito[0]['precio_carrito']);
        let suma = sumador + total;

        this.carritoUpdate.precio = suma.toString();

        this.restService.ejecutar_put('carritos/api/carritos', this.carritoUpdate).subscribe(result => {
          console.log(result);
    
          let parametros: NavigationExtras = {
            state: {
              reload: true
            }
          }
    
          this.router.navigate(['carrito-user'], parametros);
    
        });
      });
    }
  }
}
