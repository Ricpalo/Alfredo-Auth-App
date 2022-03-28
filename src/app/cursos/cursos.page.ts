import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos = [];

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

    this.restService.ejecutar_get('cursos/api/cursos', {}).subscribe(res => {
      this.cursos = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  deleteCurso(curso:any) {
    this.restService.ejecutar_delete('cursos/api/cursos', {"id": curso}).subscribe(res => {
      console.log(res);
      console.log(curso);
      this.router.navigate(['cursos']);
    })
  }

  selectCurso (curso:any) {
    let parametros: NavigationExtras = {
      state: {
        curso: curso
      }
    };

    this.router.navigate(['update-curso'], parametros);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarDatos();
    }, 1000);
  }
}
