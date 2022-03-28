import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos = [];
  instructores = [];
  cursos = [];
  ubicaciones = [];

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

    this.restService.ejecutar_get('eventos/api/eventos', {}).subscribe(res => {
      this.eventos = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });

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

  deleteEvento(evento:any) {
    this.restService.ejecutar_delete('eventos/api/eventos', {"id": evento}).subscribe(res => {
      console.log(res);
      console.log(evento);
      this.router.navigate(['eventos']);
    })
  }

  selectEvento (evento:any) {
    let parametros: NavigationExtras = {
      state: {
        evento: evento
      }
    };

    this.router.navigate(['update-evento'], parametros);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarDatos();
    }, 1000);
  }
}
