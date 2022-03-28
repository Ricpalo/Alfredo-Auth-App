import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {
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

    this.restService.ejecutar_get('ubicaciones/api/ubicaciones', {}).subscribe(res => {
      this.ubicaciones = res.datos;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  deleteUbicacion(ubicacion:any) {
    this.restService.ejecutar_delete('ubicaciones/api/ubicaciones', {"id": ubicacion}).subscribe(res => {
      console.log(res);
      this.router.navigate(['ubicaciones']);
    })
  }

  selectUbicacion (ubicacion) {
    let parametros: NavigationExtras = {
      state: {
        ubicacion: ubicacion
      }
    };

    this.router.navigate(['update-ubicacion'], parametros);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.cargarDatos();
    }, 1000);
  }
}
