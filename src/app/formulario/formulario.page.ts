import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  contacto = {
    id_usuario: "",
    mensaje: ""
  }

  key = ""

  constructor(
    private restService: RestService,
    private router: Router
  ) {
    this.obtenerDatos();
  }

  ngOnInit() {
  }

  async obtenerDatos() {
    let session = await this.restService._session();
    this.key = session.key;
  }

  async enviarMensaje() {
    let formulario = new FormData();

    formulario.append("id_usuario", this.key);
    formulario.append("mensaje", this.contacto.mensaje);

    this.restService.subida_ficheros_y_datos('contacto/api/contacto', formulario).subscribe(result => {
      console.log(result);

      let parametros: NavigationExtras = {
        state: {
          reload: true
        }
      }

      this.router.navigate(['home-usuario'], parametros);

    });
  }
}
