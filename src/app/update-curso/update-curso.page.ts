import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-update-curso',
  templateUrl: './update-curso.page.html',
  styleUrls: ['./update-curso.page.scss'],
})
export class UpdateCursoPage implements OnInit {
  curso_recibido = {
    id: "",
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  curso = {
    id: "",
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  errores = {
    id: "",
    titulo: "",
    duracion: "",
    precio: "",
    descripcion: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.curso_recibido = this.router.getCurrentNavigation().extras.state.curso;
        this.curso = this.curso_recibido;
      } else {
        this.router.navigate(['cursos']);
      }
    });
  }

  updateCurso () {
    this.restService.ejecutar_put('cursos/api/cursos', this.curso).subscribe(res => {
      if ( this.curso.titulo == "" ) {
        this.errores.titulo = "El campo titulo no puede ir vacío";
      }

      if ( this.curso.duracion == "" ) {
        this.errores.duracion = "El campo duracion no puede ir vacío";
      }

      if ( this.curso.precio == "" ) {
        this.errores.precio = "El campo precio no puede ir vacío";
      }

      if ( this.curso.descripcion == "" ) {
        this.errores.descripcion = "El campo descripcion no puede ir vacío";
      }

      if ( this.curso.titulo != "" && this.curso.duracion != "" && this.curso.precio != "" && this.curso.descripcion != "" ) {
        this.router.navigate(['cursos']);
      }
    })
  }
}
