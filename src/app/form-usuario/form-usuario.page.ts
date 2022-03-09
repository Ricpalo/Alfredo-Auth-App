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
    genero : "",
    password : "",
    password_confirm : ""
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
    formulario.append('genero',this.usuario.genero);
    formulario.append('password',this.usuario.password);

    if ( this.usuario.password != this.usuario.password_confirm ) {
      this.showToast('Passwords no coinciden');
    } else {
      this.restService.subida_ficheros_y_datos('usuarios/api/usuario', formulario).subscribe(result => {
        console.log(result);
        if(result.status == "0") {
          if (result.errores.email == 'The E-mail field must contain a unique value.') {
            this.showToast('Este correo ya fue ingresado, por favor utiliza otro');
          }
        } else {
          this.showToast('Usuario registrado Correctamente');
        }
        this.router.navigate(['/login']);
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

