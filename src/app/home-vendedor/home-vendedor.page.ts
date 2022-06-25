import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home-vendedor',
  templateUrl: './home-vendedor.page.html',
  styleUrls: ['./home-vendedor.page.scss'],
})
export class HomeVendedorPage implements OnInit {

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut () {
    this.rest.cerrarSesion();
  }

  productPage (tipo:string) {
    let parametros: NavigationExtras = {
      state: {
        tipo: tipo
      }
    };

    this.router.navigate(['add-producto'], parametros);
  }

  productsVendedor() {
    this.router.navigate(['productos-vendedor']);
  }

}
