import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-add-ubicacion',
  templateUrl: './add-ubicacion.page.html',
  styleUrls: ['./add-ubicacion.page.scss'],
})
export class AddUbicacionPage implements OnInit {
  ubicacion = {
    nombre: "",
    direccion: ""
  }

  errores = {
    nombre: "",
    direccion: ""
  }

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addUbicacion() {
    let formulario = new FormData();

    formulario.append("nombre", this.ubicacion.nombre);
    formulario.append("direccion", this.ubicacion.direccion);

    this.restService.subida_ficheros_y_datos('ubicaciones/api/ubicaciones', formulario).subscribe(res => {
      if ( res.status == "0" ) {
        if ( res.errores.nombre != null ) {
          this.errores.nombre = "El campo nombre es requerido";
        }

        if ( res.errores.direccion != null ) {
          this.errores.direccion = "El campo direccion es requerido";
        }
      } else {
        this.router.navigate(['ubicaciones']);
      }
    });
  }
}
