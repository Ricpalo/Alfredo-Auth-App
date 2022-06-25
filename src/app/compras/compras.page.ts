import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  datos = []
  compras = []
  key = ""

  constructor(
    private router: Router,
    private restService: RestService,
    private loadingController: LoadingController
  ) { 
      this.obtenerDatos()
      this.cargarDatos() 
    }

  ngOnInit() {
  }

  profile(tipo:string) {
    let parametros: NavigationExtras = {
      state: {
        tipo: tipo
      }
    };

    this.router.navigate(['profile'], parametros);
  }

  async obtenerDatos() {
    let session = await this.restService._session();
    this.key = session.key;
    
  }

  async cargarDatos() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });

    await loading.present();

    this.restService.ejecutar_get('carritos/api/carritos', {"id_usuario" : this.key}).subscribe(res => {
      this.datos = res.datos.data;
      
      for ( let i = 0; i < this.datos.length; i++ ) {
        if ( this.datos[i]['status_carrito'] == "Pagado" ) this.compras.push(this.datos[i]);
      }

      console.log(this.compras)

    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

  selectCompra(compra:any) {
    let parametros: NavigationExtras = {
      state: {
        compra: compra
      }
    };

    this.router.navigate(['compra'], parametros);
  }

}
