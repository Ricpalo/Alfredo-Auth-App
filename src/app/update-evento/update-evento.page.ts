import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update-evento',
  templateUrl: './update-evento.page.html',
  styleUrls: ['./update-evento.page.scss'],
})
export class UpdateEventoPage implements OnInit {
  instructores = [];
  cursos = [];
  ubicaciones = [];

  evento_recibido = {
    id: "",
    fecha_inicio: "",
    fecha_fin: "",
    id_instructor: "",
    id_curso: "",
    id_ubicacion: ""
  }

  evento = {
    id: "",
    fecha_inicio: "",
    fecha_fin: "",
    id_instructor: "",
    id_curso: "",
    id_ubicacion: ""
  }

  errores = {
    id: "",
    fecha_inicio: "",
    fecha_fin: "",
    id_instructor: "",
    id_curso: "",
    id_ubicacion: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.evento_recibido = this.router.getCurrentNavigation().extras.state.evento;
        this.evento = this.evento_recibido;
      } else {
        this.router.navigate(['eventos']);
      }
    });

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('instructores/api/instructores', {}).subscribe(res => {
      this.instructores = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });

    this.restService.ejecutar_get('cursos/api/cursos', {}).subscribe(res => {
      this.cursos = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });

    this.restService.ejecutar_get('ubicaciones/api/ubicaciones', {}).subscribe(res => {
      this.ubicaciones = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  updateEvento () {
    console.log(this.evento);

    this.restService.ejecutar_put('eventos/api/eventos', this.evento).subscribe(res => {
      if ( this.evento.fecha_inicio == "" ) {
        this.errores.fecha_inicio = "El campo fecha inicio no puede ir vacío";
      }

      if ( this.evento.fecha_fin == "" ) {
        this.errores.fecha_fin = "El campo fecha fin no puede ir vacío";
      }

      if ( this.evento.id_instructor == "" ) {
        this.errores.id_instructor = "El campo instructor no puede ir vacío";
      }

      if ( this.evento.id_curso == "" ) {
        this.errores.id_curso = "El campo curso no puede ir vacío";
      }

      if ( this.evento.id_ubicacion == "" ) {
        this.errores.id_ubicacion = "El campo ubicacion no puede ir vacío";
      }

      if ( this.evento.fecha_inicio != "" 
          && this.evento.fecha_fin != "" 
          && this.evento.id_instructor != "" 
          && this.evento.id_curso != "" 
          && this.evento.id_ubicacion != "") {
        this.router.navigate(['eventos']);
      }

    })
  }
}
