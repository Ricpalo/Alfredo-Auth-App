import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  tipo = ""

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.tipo = this.router.getCurrentNavigation().extras.state.tipo;
      } else {
        // this.router.navigate(['productos-vendedor']);
      }
    });
  }

  compras() {
    this.router.navigate(['compras']);
  }

  signOut () {
    this.restService.cerrarSesion();
  }

}
