import { Component } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private servicio: RestService,
    private router: Router
  ) {
    this.obtenerDatos();
  }

  async obtenerDatos() {
    let session = await this.servicio._session();
    console.log(session);

    if (session.rol == "Admin") this.router.navigate(['home-admin'])
    else if (session.rol == "Vendedor") this.router.navigate(['home-vendedor'])
    else if (session.rol == "Usuario") this.router.navigate(['home-usuario'])
  }

  cerrar_sesion() {
    this.servicio.cerrarSesion();
  }

}
