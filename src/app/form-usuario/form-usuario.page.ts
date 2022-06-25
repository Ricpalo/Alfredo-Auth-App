import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {
  usuario = {
    email : "",
    nombres : "",
    apellidos : "",
    rol : "",
    password : "",
    password_confirm : ""
  }

  carrito = {
    id_usuario: ""
  }

  errores = {
    email : "",
    nombres: "",
    apellidos: "",
    rol: "",
    password: "",
    password_confirm: ""
  }

  constructor(
    private restService : RestService,
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {}

  registrarUsuario () {
    let formulario = new FormData();
    formulario.append('email',this.usuario.email);
    formulario.append('nombres',this.usuario.nombres);
    formulario.append('apellidos',this.usuario.apellidos);
    formulario.append('rol',this.usuario.rol);
    formulario.append('password',this.usuario.password);

    if ( this.usuario.password != this.usuario.password_confirm ) {
      this.showToast('Passwords do not match');
    } else {
        this.restService.subida_ficheros_y_datos('usuarios/api/usuario', formulario).subscribe(result => {
          if(result.status == "0") {
            if (result.errores.email == 'The E-mail field must contain a unique value.') {
              this.showToast('This E-mail was used in another account');
            } else if (result.errores.email != null) {
              this.errores.email = "E-mail is missing";
            } else this.errores.email = ""
            
            if (result.errores.nombres != null) {
              this.errores.nombres = "Name is missing";
            } else this.errores.nombres = ""
            
            if (result.errores.apellidos != null) {
              this.errores.apellidos = "Last Name is missing";
            }  else this.errores.apellidos = ""
            
            if (result.errores.rol != null) {
              this.errores.rol = "Role is missing";
            }  else this.errores.rol = ""
            
            if (result.errores.password != null) {
              this.errores.password = "Password is missing";
            } else this.errores.password = ""
    
            if (this.usuario.password_confirm == "") {
              this.errores.password_confirm = "Please, repeat password";
            } else this.errores.password_confirm = ""
          } else {
              if (this.usuario.rol == "Usuario") {
                this.restService.ejecutar_get('usuarios/api/last', {}).subscribe(result => {
                  let last = result.datos.m;
                  console.log(last);
                  this.carrito.id_usuario = last;

                  let formulario = new FormData();
                  formulario.append('id_usuario',this.carrito.id_usuario);

                  this.restService.subida_ficheros_y_datos('carritos/api/carritos', formulario).subscribe(result => {
                    this.showToast('User and Shopping Cart correctly registered');
                  });
                })
              } else {
                  this.showToast('User correctly registered');
              }

            this.closeModal();
          }
        });
    }
  }

  closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    }
    );
  }

  async showToast(msg) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}

