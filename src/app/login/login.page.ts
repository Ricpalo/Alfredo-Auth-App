import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: string;
  usuario = {
    pEmail : "",
    pPassword : ""
  };
  constructor(
    private servicio: RestService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async iniciar_sesion(){

    const loading = await this.loadingController.create({
      message: 'Autenticando'
    })

    this.servicio.ejecutar_post('usuarios/api/login', this.usuario).subscribe(res => {
      loading.dismiss();
      if (res.status == '1') {
        this.servicio.mostrar_toast(
          "Almacen UP",
          "success",
          "Bienvenido " + res.datos.nombre_completo,
          "top",
          4000
        );

        this.servicio.iniciarSesion(res.datos);
      } else if (res.status == '0') {
        this.servicio.mostrar_toast(
          "Almacen UP",
          "danger",
          res.mensaje,
          "top",
          4000
        );
      } else {
        this.servicio.mostrar_toast(
          "Almacen UP",
          "danger",
          "Ocurrio un error de comunicacion",
          "top",
          4000
        );
      }
    }, error => {
      loading.dismiss();
      this.servicio.mostrar_toast(
        "Almacen UP",
        "danger",
        "Ocurrio un error interno",
        "top",
        4000
      );
    });

    // this.servicio.iniciarSesion(this.usuario);
  }
}
