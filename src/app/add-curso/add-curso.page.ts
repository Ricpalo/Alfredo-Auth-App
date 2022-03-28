import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.page.html',
  styleUrls: ['./add-curso.page.scss'],
})
export class AddCursoPage implements OnInit {
  curso = {
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  errores = {
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  constructor(
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addCurso() {
    let formulario = new FormData();

    formulario.append("titulo", this.curso.titulo);
    formulario.append("duracion", this.curso.duracion);
    formulario.append("precio", this.curso.precio);
    formulario.append("descripcion", this.curso.descripcion);

    this.restService.subida_ficheros_y_datos('cursos/api/cursos', formulario).subscribe(res => {
      if (res.status == "0") {
        if (res.errores.titulo != null) {
          this.errores.titulo = "El campo titulo es requerido";
        }

        if (res.errores.duracion != null) {
          this.errores.duracion = "El campo duracion es requerido";
        }

        if (res.errores.precio != null) {
          this.errores.precio = "El campo precio es requerido";
        }

        if (res.errores.descripcion != null) {
          this.errores.descripcion = "El campo descripcion es requerido";
        }
      } else {
        this.router.navigate(['cursos']);
      }
    });
  }
}
