import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  alumnos = [];

  constructor(
    private restService: RestService,
    private loadingController: LoadingController,
    private router: Router
  ) { 
    this.cargarDatos();
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.cargarDatos();
  }
 
  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('alumnos/api/alumnos', {}).subscribe(res => {
      this.alumnos = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  deleteAlumno(alumno:any) {
    this.restService.ejecutar_delete('alumnos/api/alumnos', {"id": alumno}).subscribe(res => {
      console.log(res);
      console.log(alumno);
      this.router.navigate(['alumnos']);
    })
  }

  selectAlumno (alumno:any) {
    let parametros: NavigationExtras = {
      state: {
        alumno: alumno
      }
    };

    this.router.navigate(['update-alumno'], parametros);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarDatos();
    }, 1000);
  }
}
 