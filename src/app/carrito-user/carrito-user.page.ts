import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-carrito-user',
  templateUrl: './carrito-user.page.html',
  styleUrls: ['./carrito-user.page.scss'],
})
export class CarritoUserPage implements OnInit {

  session = {
    key: ""
  }

  key = ""

  carrito = []
  carritos = []
  productosCarrito = []
  productos = []

  mensaje = ""
  vacio = false

  constructor(
    private restService: RestService,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.obtenerDatos();
    this.cargarDatos();
  }

  ngOnInit() {
  }

  async obtenerDatos() {
    let session = await this.restService._session();
    console.log(session.key);
    this.key = session.key;
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('carritos/api/carritos', { "id_usuario": this.key }).subscribe(res => {
      this.carritos = res.datos.data;
      let flag = false;
      this.vacio = true;

      for (let i = 0; i < this.carritos.length; i++) {
        if (this.carritos[i]['status_carrito'] == "Vacio") {
          this.carrito.push(this.carritos[i]);

          this.mensaje = "Tu Carrito Está Vacío, Agrega Productos Para Que Los Puedas Visualizar Aquí";
          flag = true;    
        }
      }

      if (!flag) {
        this.vacio = false;

        for (let i = 0; i < this.carritos.length; i++) {
          if ( this.carritos[i]['status_carrito'] == "Lleno" ) {
            this.carrito.push(this.carritos[i]);
            this.mensaje = "Tu Carrito"; 
          }
        }

        this.restService.ejecutar_get('carrito_productos/api/carrito_productos', { "id_carrito": this.carrito[0]['id_carrito'] }).subscribe(res => {
          this.productosCarrito = res.datos.data;
  
          let longitud = this.productosCarrito.length;
          let idProductos = []
  
          for (let i = 0; i < longitud; i++) {
            idProductos.push(this.productosCarrito[i]['id_producto']);
          }
  
          for (let i = 0; i < idProductos.length; i++) {
            this.restService.ejecutar_get('productos/api/productos', { "id_producto": idProductos[i] }).subscribe(res => {
              this.productos.push(res.datos.data);
            }, error => {
              loading.dismiss();
              console.log(error);
            });
          }
        }, error => {
          loading.dismiss();
          console.log(error);
        });
      }
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  deleteProduct(producto: any) {
    this.restService.ejecutar_get('carrito_productos/api/carrito_productos', { "id_carrito": this.carrito[0]['id_carrito'] }).subscribe(res => {
      let carritos = []
      carritos = res.datos.data

      this.restService.ejecutar_delete('carrito_productos/api/carrito_productos', { "id_producto": producto.id_producto }).subscribe(res => {

        let carritoUpdate = {
          id_carrito: this.carrito[0]['id_carrito'],
          precio: this.carrito[0]['precio_carrito'],
          status: "Lleno"
        }

        let resta1 = parseFloat(carritoUpdate.precio);
        console.log(resta1)
        let resta2 = parseFloat(producto.precio_producto);
        let resta = resta1 - resta2;

        carritoUpdate.precio = resta.toString();

        this.restService.ejecutar_put('carritos/api/carritos', carritoUpdate).subscribe(result => {
          console.log(result);

          let parametros: NavigationExtras = {
            state: {
              reload: true
            }
          }

          this.router.navigate(['carrito-user'], parametros);

        });
      }, error => {
        console.log('F')
      });
    });
  }

  comprarCarrito() {
    let carritoUpdate = {
      id_carrito: this.carrito[0]['id_carrito'],
      precio: this.carrito[0]['precio_carrito'],
      status: "Pagado"
    }

    this.restService.ejecutar_put('carritos/api/carritos', carritoUpdate).subscribe(res => {
      console.log('Carrito Actualizado a Pagado')
      
      let formulario = new FormData();
      formulario.append('id_usuario', this.carrito[0]['id_usuario']);

      this.restService.subida_ficheros_y_datos('carritos/api/carritos', formulario).subscribe(result => {
        console.log('Nuevo Carrito Registrado')
        this.router.navigate(['home-usuario']);
      });
    });
  }
}
