import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';


@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.page.html',
  styleUrls: ['./update-producto.page.scss'],
})
export class UpdateProductoPage implements OnInit {

  producto_recibido = {
    id_producto: "",
    nombre_producto: "",
    precio_producto: ""
  }

  producto = {
    id_producto: "",
    nombre_producto: "",
    precio_producto: ""
  }

  errores = {
    id_producto: "",
    nombre_producto: "",
    precio_producto: ""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      if ( this.router.getCurrentNavigation().extras.state ) {
        this.producto_recibido = this.router.getCurrentNavigation().extras.state.producto;
        this.producto = this.producto_recibido;
      } else {
        this.router.navigate(['productos-vendedor']);
      }
    });
  }

  updateProduct () {
    this.restService.ejecutar_put('productos/api/productos', this.producto).subscribe(res => {
      if ( this.producto.nombre_producto == "" ) {
        this.errores.nombre_producto = "El campo titulo no puede ir vacío";
      }

      if ( this.producto.precio_producto == "" ) {
        this.errores.precio_producto = "El campo precio no puede ir vacío";
      }

      if ( this.producto.nombre_producto != "" && this.producto.precio_producto != "" ) {
        this.router.navigate(['productos-vendedor']);
      }
    })
  }

}
