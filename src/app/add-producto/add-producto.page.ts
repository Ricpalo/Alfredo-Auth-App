import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {

  producto = {
    nombre : "",
    precio : "",
  };

  session = {
    key: ""
  }

  errores = {
    nombre_producto : "",
    precio_producto : "",
    id_usuario : "",
  }

  icono = null;
  formato = null;
  tipo = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) { this.obtenerDatos() }

  async obtenerDatos() {
    this.session = await this.restService._session();
    console.log(this.session)
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.tipo = this.router.getCurrentNavigation().extras.state.tipo;
        console.log(this.tipo)
      } else {
        this.router.navigate(['home-vendedor']);
      }
    });
  }

  async seleccionar_icono () {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64
    });
    console.log(image);
    this.icono = "data:image/" + image.format + ";base64," + image.base64String;
    this.formato = image.format
  }

  async addProduct() {
    if ( this.icono != null ) {
      let leerBase64 = await fetch(this.icono);
      let binario = await leerBase64.blob();
      let nombre = new Date() + "." + this.formato;

      let formulario = new FormData();

      formulario.append("nombre", this.producto.nombre);
      formulario.append("precio", this.producto.precio);
      formulario.append("imagen", binario, nombre);
      formulario.append("tipo", this.tipo);
      formulario.append("usuario", this.session.key);

      this.restService.subida_ficheros_y_datos('productos/api/productos', formulario).subscribe(result => {
        console.log(result);

        let parametros : NavigationExtras = {
          state : {
            reload : true
          }
        }

        this.router.navigate(['home-vendedor'],parametros);

      });
    } else {
      this.restService.mostrar_toast("Error", "danger", "No se ha seleccionado foto", "top", 4000);
    }

  }

}
