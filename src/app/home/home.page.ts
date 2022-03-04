import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private servicio: RestService
  ) {
    this.obtenerDatos();
  }

  async obtenerDatos() {
    let session = await this.servicio._session();
    console.log(session);
  }

  cerrar_sesion() {
    this.servicio.cerrarSesion();
  }

}
