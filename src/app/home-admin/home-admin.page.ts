import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  mensajes = []

  constructor(
    private restService: RestService,
    private loadingController: LoadingController
  ) { 
    this.cargarDatos();
   }

  ngOnInit() {
  }

  signOut () {
    this.restService.cerrarSesion();
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('contacto/api/contacto', {}).subscribe(res => {
      this.mensajes = res.datos.data;
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

}
