import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.page.html',
  styleUrls: ['./instructores.page.scss'],
})
export class InstructoresPage implements OnInit {
  instructores = [];

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

    this.restService.ejecutar_get('instructores/api/instructores', {}).subscribe(res => {
      this.instructores = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  deleteInstructor(instructor:any) {
    this.restService.ejecutar_delete('instructores/api/instructores', {"id": instructor}).subscribe(res => {
      console.log(res);
      console.log(instructor);
      this.router.navigate(['instructores']);
    })
  }

  selectInstructor (instructor:any) {
    let parametros: NavigationExtras = {
      state: {
        instructor: instructor
      }
    };

    this.router.navigate(['update-instructor'], parametros);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarDatos();
    }, 1000);
  }
}
 