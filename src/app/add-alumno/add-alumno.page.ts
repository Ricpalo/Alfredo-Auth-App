import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.page.html',
  styleUrls: ['./add-alumno.page.scss'],
})
export class AddAlumnoPage implements OnInit {
  alumno = {
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

  async addAlumno() {
    let formulario = new FormData();

    formulario.append("nombre", this.alumno.nombre);
    formulario.append("direccion", this.alumno.direccion);

    this.restService.subida_ficheros_y_datos('alumnos/api/alumnos', formulario).subscribe(res => {
      if (res.status == "0") {
        if (res.errores.nombre != null) {
          this.errores.nombre = "El campo nombre es requerido";
        }

        if (res.errores.direccion != null) {
          this.errores.direccion = "El campo direccion es requerido";
        }
      } else {
        this.router.navigate(['alumnos']);
      }
    });
  }
}